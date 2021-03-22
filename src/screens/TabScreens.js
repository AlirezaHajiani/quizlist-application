import React,{ useEffect, useState , useRef } from 'react';
import { Button, Text, View ,Animated } from 'react-native';
import HomeScreen from "./HomeScreen.js"
import LeaderBoardScreen from "./LeaderBoardScreen.js"
import SearchScreen from "./SearchScreen.js"
import SettingScreen from "./SettingScreen.js"
import ShopScreen from "./ShopScreen.js"

import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from "@react-navigation/native";
import {COLORS} from '../config/colors.js';
import { soundPlay , soundPlayMusic, soundStopMusic } from '../actions/sound/sound.js';
import { useDispatch,useSelector } from 'react-redux'

const Tab = createBottomTabNavigator();

function TabScreens(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("Tab");
    setTimeout(() => {dispatch(soundPlayMusic("music"))}, 1000)

    return () => {
      // console.log("UnmountTab");
      dispatch(soundPlayMusic(""));
    }
  },[]);

  function labeling(value,focus,color)
  {
    const textAnim = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused();
    useEffect(()=>{
      if(focus)
        Animated.timing(
          textAnim,
          {
            toValue: 12,
            duration: 1000,
            useNativeDriver: false,
          }
        ).start();
      else {
        Animated.timing(
          textAnim,
          {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }
        ).start();
      }
    }
    ,[isFocused]);

    return(
      <View>
      <Animated.Text style={{fontFamily: "Koodak",fontSize: textAnim}}>{value}</Animated.Text>
      </View>
    );
  };

  function setIcon(icon,focus)
  {
    const fontAnim = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
          Animated.timing(
            fontAnim,
            {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }
          ).start();
        }
        else {
          Animated.timing(
            fontAnim,
            {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }
          ).start();
        }
      }
    ,[focus,isFocused]);

    return (
      <Animated.View style={{transform: [
          { scaleX: fontAnim },
          { scaleY: fontAnim }
        ]}}>
        <Icon name={icon} size={35} color={focus?COLORS.white:COLORS.whiteopacity} />
      </Animated.View>
    );
  }

  return(
    <>
    <Tab.Navigator lazy={false} initialRouteName="HomeScreen" tabBarOptions={{
                                    showLabel: false,
                                    tabStyle:{
                                                backgroundColor: COLORS.tabbackground
                                             }
                                  }}>
      <Tab.Screen name="SettingScreen" component={SettingScreen}
          options={{
          // tabBarLabel: ({ focused, color }) => (labeling('خانه',focused,color)),
          tabBarIcon: ({focused})=>(setIcon("settings",focused))}}/>
      <Tab.Screen name="ShopScreen" component={ShopScreen}
          options={{
          // tabBarLabel: ({ focused, color }) => (labeling('خانه',focused,color)),
          tabBarIcon: ({focused})=>(setIcon("cart",focused))}}/>
      <Tab.Screen name="HomeScreen" component={HomeScreen}
          options={{
          // tabBarLabel: ({ focused, color }) => (labeling('خانه',focused,color)),
          tabBarIcon: ({focused})=>(setIcon("ios-home",focused))}}/>
      <Tab.Screen name="SearchScreen" component={SearchScreen}
          options={{
          // tabBarLabel: ({ focused, color }) => (labeling('خانه',focused,color)),
          tabBarIcon: ({focused})=>(setIcon("search",focused))}}/>
      <Tab.Screen name="LeaderBoardScreen" component={LeaderBoardScreen}
          options={{
          // tabBarLabel: ({ focused, color }) => (labeling('رتبه ها',focused,color)),
          tabBarIcon: ({ focused})=>(setIcon("stats-chart",focused))}}/>
    </Tab.Navigator>
    </>
  );
};

export default TabScreens;
