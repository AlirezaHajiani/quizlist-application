import React, { useState } from "react";
import {TextInput} from 'react-native';

function TextInputBorder(props) {
  const [isFocus, setBackgroundColor] = useState(false);
  return (
    <TextInput placeholder={props.placeholder}
             //contextMenuHidden={true}
             //selectTextOnFocus={false}
             underlineColorAndroid='transparent'
             style={{...props.style, borderColor: isFocus ? '#ff5722':'#ededed'}}
             onFocus={()=>setBackgroundColor(true)}
             onBlur={()=>setBackgroundColor(false)}
             autofocus={props.autofocus}
             onChangeText={(value)=>{if(props.onChangeText)props.onChangeText(value);}}
             maxLength={props.maxLength}
             secureTextEntry={props.secureTextEntry}
             placeholderTextColor={props.placeholderTextColor}
             value={props.value}/>

           );
};

export default TextInputBorder;
