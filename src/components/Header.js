import React,{useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {COLORS} from '../config/colors.js'

import { useDispatch,useSelector } from 'react-redux'
import { soundPlay } from '../actions/sound/sound.js';
import * as RootNavigation from '../../RootNavigation.js';

function Header(props) {
  const user=useSelector(state => state.user);
  const [userCoins,setUserCoins]=useState(0);
  const [userRelevation,setUserRelevation]=useState(0);
  const [firstLoad,setFirstLoad]=useState(false);
  const coinAnim = useRef(new Animated.Value(0)).current;
  const relAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user.User.coins>userCoins)
    {
      if(firstLoad)
      {
        dispatch(soundPlay("incrementationcoin"));
        coinAnim.addListener(({value}) => setUserCoins(value));
        coinAnim.setValue(userCoins);
        Animated.timing(
          coinAnim,
          {
            toValue: user.User.coins,
            duration: 2000,
            useNativeDriver: false,
          }
        ).start();
      }
      else {
        setUserCoins(user.User.coins);
        setFirstLoad(true);
      }
    }
    else {
      setUserCoins(user.User.coins);
    }

    if(user.User.relevation>userRelevation)
    {
      if(firstLoad)
      {
        dispatch(soundPlay("incrementationrevelation"));
        relAnim.addListener(({value}) => setUserRelevation(value));
        relAnim.setValue(userRelevation);
        Animated.timing(
          relAnim,
          {
            toValue: user.User.coins,
            duration: 2000,
            useNativeDriver: false,
          }
        ).start();
      }
      else {
        setUserRelevation(user.User.relevation);
        setFirstLoad(true);
      }
    }
    else {
      setUserRelevation(user.User.relevation);
    }
  },[user.User]);

  return(
    <View style={{height: 40,backgroundColor: COLORS.blue, flexDirection: 'row'}}>
      <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>
        <TouchableWithoutFeedback onPress={()=>RootNavigation.navigate('ShopScreen')}>
          <View style={{flexDirection: 'row'}}>
          <View style={{...styles.roundbox,width: 120}}>
            <Text style={{color: COLORS.text, fontFamily: "Estedad",fontWeight: '600',fontSize: 19,}}>{userCoins&&Math.floor(0||userCoins)}</Text>
          </View>

        <Image source={require('../../assets/images/coin.png')}
               style={styles.coinimage}/>
        <Image source={require('../../assets/images/plus.png')}
               style={styles.plusicon}/>
        </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{flex:1,justifyContent: 'flex-end',flexDirection: 'row'}}>

      </View>
    </View>
  );
};

// <TouchableWithoutFeedback onPress={()=>RootNavigation.navigate('ShopScreen')}>
//   <View style={{flexDirection: 'row-reverse'}}>
//   <View style={{...styles.roundbox2,width: 120}}>
//     <Text style={{color: COLORS.text, fontFamily: "Koodak",fontWeight: '600',fontSize: 20,}}>{userRelevation&&Math.floor(0||userRelevation)}</Text>
//   </View>
//   <Image source={require('../../assets/images/star.png')}
//          style={styles.starimage}/>
//   <Image source={require('../../assets/images/plus.png')}
//          style={styles.plusicon2}/>
//
// </View>
// </TouchableWithoutFeedback>

const styles = StyleSheet.create({
  roundbox: {
    backgroundColor: COLORS.bluemed,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop:8,
    marginBottom:8,
  },
  coinimage:{
    resizeMode: 'stretch',
    height: 32,
    width: 32,
    marginLeft: -35,
    marginTop:2,
  },
  plusicon:{
    resizeMode: 'stretch',
    height: 15,
    width: 15,
    marginLeft: -30,
    marginTop:22,
  },
  roundbox2: {
    backgroundColor: COLORS.bluemed,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop:8,
    marginBottom:8,
  },
  starimage:{
    resizeMode: 'stretch',
    height: 30,
    width: 30,
    marginRight: -35,
    marginTop:5,
  },
  plusicon2:{
    resizeMode: 'stretch',
    height: 15,
    width: 15,
    marginRight: -30,
    marginTop:22,
  },
});
export default Header;
