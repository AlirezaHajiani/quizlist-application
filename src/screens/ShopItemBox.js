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
  // console.log(props.item);props.item.color
  return(
    <TouchableWithoutFeedback
      onPress={()=>props.onPress(props.item.sku)}
    >
      <View style={{margin: 3,flexDirection: 'row',justifyContent:'flex-start',backgroundColor: "#FF0000"}}>
        <Image source={{uri: props.item.image}}
             style={{resizeMode: 'contain',
                 height: 100,
                 width: 100,
               margin: 2}}/>
        <View style={{flex:1,alignItems:'center',justifyContent: 'center',marginLeft: 10}}>
          {props.item.coin>0? <Text style={styles.textsitem}> {props.item.coin} سکه </Text>:<></>}
          {props.item.relev>0 && props.item.coin>0? <Text style={styles.textsitem}> + </Text>:<></>}
          {props.item.relev>0? <Text style={styles.textsitem}> {props.item.relev} افشاگر </Text>:<></>}
        </View>

        <View style={{flex:1,marginLeft: 10,marginRight: 10,justifyContent: 'center'}}>
          <View style={{backgroundColor: COLORS.green ,height: 40,borderRadius: 10,alignItems: 'center',justifyContent: 'center'}}>
            <Text style={styles.textsprice}> {props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textsitem: {
    fontFamily: "Koodak",
    fontSize: 20,
    textAlignVertical: 'center',
    color: "#ffc700",
    padding: 2,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:2,
  },
  textsprice: {
    fontFamily: "Koodak",
    fontSize: 18,
    textAlignVertical: 'center',
    color: COLORS.white,
    padding: 2,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:2,
  },
})
