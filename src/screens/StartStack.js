import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './StartScreen.js'
import LoginScreen from "./LoginScreen.js"
import {COLORS} from '../config/colors.js'
import {Loader} from "../components/Loader.js"
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

function GameScreens(props) {

  return(
    <>
    <StatusBar barStyle="default" backgroundColor={COLORS.blue} />
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
    </>
  );
};

export default GameScreens;
