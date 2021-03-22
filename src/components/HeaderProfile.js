import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {COLORS} from '../config/colors.js'
import { useSelector } from 'react-redux'

function Header(props) {

  const navigation = useNavigation();

  return(
    <View style={{height: 40,backgroundColor: COLORS.blue, flexDirection: 'row'}}>

      <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>

      </View>
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
        <Text style={styles.texts1}>{props.name}</Text>
      </View>
      <View style={{flex:1,justifyContent: 'flex-end',flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={()=> navigation.goBack()}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/images/back.png')}
                     style={{height: 30,width: 20 ,marginTop: 3,marginRight: 20}}/>
            </View>
          </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  texts1: {
    fontFamily: "Estedad",
    fontSize: 20,
    textAlignVertical: 'center',
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
});
export default Header;
