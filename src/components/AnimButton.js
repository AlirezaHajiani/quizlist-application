import React, { useState } from "react";
import {View,Text,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import {COLORS} from '../config/colors.js'
function Button(props) {
  const [isPressed, setPressButton] = useState(false);

  return (
        <TouchableWithoutFeedback
          onPressIn={()=>setPressButton(true)}
          onPressOut={()=>setPressButton(false)}
          onPress={()=> {if(props.onPress )props.onPress();}}
          disabled={props.disabled}>
            <View style={{...props.style,padding: 0,borderRadius: 16}}>
                <View style={{backgroundColor: props.backColor , borderRadius: 10, marginTop:isPressed ? 5:0 , paddingBottom:isPressed? 0:5}}>
                    <View style={{height: "100%",  backgroundColor:props.color ,borderRadius:10, alignItems: "center", justifyContent: 'center'}}>
                        {props.children}
                    </View>
                </View>
                 {props.disabled? <View style={{...StyleSheet.absoluteFillObject,padding: 0,borderRadius: 10, backgroundColor: COLORS.disableover}} />:<></>}
            </View>
        </TouchableWithoutFeedback>
  );
};

export default Button;
