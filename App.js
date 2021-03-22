/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import RNTapsellPlus from 'react-native-tapsell-plus';
import { APP_KEY } from "./src/config/Tplus.js";

import PushPole from 'pushpole-react-native'
import SplashScreen from 'react-native-splash-screen'
import {COLORS} from './src/config/colors.js'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import configureStore from './src/store/configureStore';
import Screens from "./src/screens"
import { navigationRef, isReadyRef  } from './RootNavigation';
import AppMetrica from 'react-native-appmetrica';

const store = configureStore({});
// Middleware: Redux Persist Persister
const persistor = persistStore(store);

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      AppMetrica.reportError('Fatal Error: '+e.toString());
      Alert.alert(
          'متاسفانه خطایی رخ داد',
          // `
          // Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
          `
          بازی دوباره راه اندازی خواهد شد
          `,
        [{
          text: 'شروع دوباره',
          onPress: () => {
            RNRestart.Restart();
          }
        }]
      );
    } else {
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
      AppMetrica.reportError('Error: '+e.toString());
    }


  };

  setJSExceptionHandler(errorHandler);

const App: () => React$Node = () => {
  const [hideSplash, setHideSplash] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 1000);

    PushPole.initialize(false);
    RNTapsellPlus.initialize(APP_KEY);
  }, []);

  React.useEffect(() => {
    hideSplash && SplashScreen.hide();
  }, [hideSplash]);

  React.useEffect(() => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={navigationRef} onReady={() => {
              isReadyRef.current = true;
            }}>
            {hideSplash?<Screens/>:<></>}

          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
