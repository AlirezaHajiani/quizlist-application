/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppMetrica from 'react-native-appmetrica';

AppMetrica.activate({
    apiKey: '',
    sessionTimeout: 120,
    firstActivationAsUpdate: false,
  });

AppRegistry.registerComponent(appName, () => App);
