/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppMetrica from 'react-native-appmetrica';

AppMetrica.activate({
    apiKey: 'd1b16299-7c4b-40ce-9ddb-19a393d8abba',
    sessionTimeout: 120,
    firstActivationAsUpdate: false,
  });

AppRegistry.registerComponent(appName, () => App);
