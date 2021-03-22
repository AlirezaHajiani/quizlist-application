import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabScreens from './TabScreens.js'
import GameStart from "./GameStart.js"
import GameMain from "./GameMain.js"
import GameMainTutorial from "./GameMainTutorial.js"
import ProfileScreen from "./ProfileScreen.js"
import UserSettingScreen from "./UserSettingScreen.js"
import UserGiftScreen from "./UserGiftScreen.js"
import {COLORS} from '../config/colors.js'
import {Loader} from "../components/Loader.js"
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

function GameScreens(props) {

  return(
    <>
    <StatusBar barStyle="default" backgroundColor={COLORS.blue} />
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TabScreens" component={TabScreens} />
      <Stack.Screen name="GameStart" component={GameStart} />
      <Stack.Screen name="GameMain" component={GameMain} />
      <Stack.Screen name="GameMainTutorial" component={GameMainTutorial} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserSettingScreen" component={UserSettingScreen} />
      <Stack.Screen name="UserGiftScreen" component={UserGiftScreen} />
    </Stack.Navigator>
    </>
  );
};

export default GameScreens;
