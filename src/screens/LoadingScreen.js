import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StatusBar,
} from 'react-native';
import {COLORS} from '../config/colors.js'

import Background from "../components/Background.js"

export default function LoadingScreen(){
  return(
              <Background>
              <StatusBar barStyle="default" backgroundColor={COLORS.bluelight} />

              <View style={{
                flex: 1,
                backgroundColor: "#FFFFFF00",
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={require('../../assets/images/icon.png')}
                     style={{resizeMode: 'stretch',height: 300,width: 300}}/>
              </View>
              </Background>
      );
}
