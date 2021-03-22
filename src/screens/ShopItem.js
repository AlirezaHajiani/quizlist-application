import React,{useEffect,useState} from 'react';
import { View, Text,Alert, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {COLORS} from '../config/colors.js';
import CafeBazaar from 'react-native-cafe-bazaar';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { useDispatch,useSelector } from 'react-redux';

export default function ShopItem(props) {
  const dispatch = useDispatch();

  function onPress(sku)
  {
    Alert.alert(sku);
    // console.log("Press");
    // dispatch(matchSetID(props.match._id));
    // dispatch(fetchData(fetchType.GetMatch));
  }
  // console.log(props.item);
  return(
    <TouchableWithoutFeedback
      onPress={()=>props.onPress(props.item.sku)}
    >
      <View style={{flex:1,flexDirection: 'row',justifyContent:'flex-start',backgroundColor: props.item.color || "#FFF",borderRadius: 10,elevation: 5,marginTop: 5,marginLeft: 10,marginRight: 10}}>
        <Image source={{uri: props.item.image}}
             style={{resizeMode: 'contain',
                 height: 100,
                 width: 100,
               margin: 2}}/>
        <View style={{flex:1,alignItems:'center',justifyContent: 'center',marginLeft: 20}}>
          {props.item.coin>0? <View style={{flexDirection: 'row'}}><Text style={styles.textsitem}>{props.item.coin}</Text><Image source={require('../..//assets/images/coin.png')} style={{height: 35,width: 35,marginTop: 8,resizeMode: 'contain',}}/></View>:<></>}
          {props.item.relev>0 && props.item.coin>0? <Text style={styles.textsitem}> + </Text>:<></>}
          {props.item.relev>0? <Text style={styles.textsitem}> {props.item.relev} افشاگر </Text>:<></>}
        </View>

        <View style={{flex:1,marginLeft: 10,marginRight: 10,justifyContent: 'center'}}>
          <View style={{backgroundColor: COLORS.green ,height: 50,borderRadius: 10,alignItems: 'center',justifyContent: 'center'}}>
            <Text style={styles.textsprice}> {props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textsitem: {
    fontFamily: "Estedad",
    fontSize: 20,
    textAlignVertical: 'center',
    color: "#ffb700",
    padding: 2,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:2,
  },
  textsprice: {
    fontFamily: "Estedad",
    fontSize: 15,
    textAlignVertical: 'center',
    color: COLORS.white,
    padding: 2,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:2,
  },
})
