import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS} from '../config/colors.js'

import { useSelector } from 'react-redux'

function Header(props) {
  const user=useSelector(state => state.user.User);

  return(
    <View style={{height: 70,backgroundColor: COLORS.blue, flexDirection: 'row'}}>

      <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>

      </View>
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
        <Text style={{fontSize: 20}}>{props.round}</Text>
      </View>
      <View style={{flex:1,justifyContent: 'flex-end',flexDirection: 'row'}}>
        <TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/images/back.png')}
                     style={{height: 50,width: 30,margin: 10,marginRight: 20}}/>
            </View>
          </TouchableWithoutFeedback>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roundbox: {
    backgroundColor: COLORS.bluemed,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    marginBottom:20,
  },
  coinimage:{
    resizeMode: 'stretch',
    height: 40,
    width: 40,
    marginLeft: -35,
    marginTop:15,
  },
  plusicon:{
    resizeMode: 'stretch',
    height: 20,
    width: 20,
    marginLeft: -45,
    marginTop:40,
  },
  roundbox2: {
    backgroundColor: COLORS.bluemed,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    marginBottom:20,
  },
  starimage:{
    resizeMode: 'stretch',
    height: 40,
    width: 40,
    marginRight: -35,
    marginTop:12,
  },
  plusicon2:{
    resizeMode: 'stretch',
    height: 20,
    width: 20,
    marginRight: -45,
    marginTop:40,
  },
});
export default Header;
