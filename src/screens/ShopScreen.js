import React,{useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import {COLORS} from '../config/colors.js';
import Header from "../components/Header.js";
import TextInputBorder from "../components/TextInputBorder.js";
import AnimButton from "../components/AnimButton.js";
import Icon from 'react-native-vector-icons/Ionicons';
import ShopItem from './ShopItem.js';

import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { purchaseData } from '../actions/user/user-data.js';
import CafeBazaar from 'react-native-cafe-bazaar'
import { soundPlay ,soundPlayMusic, soundStopMusic } from '../actions/sound/sound.js';
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

function ShopScreen(props) {
  const users=useSelector(state => state.search);
  const [onPurchase,setOnPurchase]=useState(false);
  const [shopItems,setShopItems]=useState([])
  const dispatch = useDispatch();

  const fetchItems = async () => {
    await fetch('https://quizlist.ir/iap/coins', {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
       setShopItems(responseJson);
    })
    .catch((error) => {
       // console.error(error);
    });
  };

  const shopData=React.useCallback(() => {
    if(!shopItems.length)
      fetchItems();
  }, []);

  useFocusEffect(
    shopData
  );

  useEffect(() => {
    if(!shopItems.length)
      fetchItems();
  },[]);
  // useEffect(()=>{
  //   CafeBazaar.open()
  //                   .then(() => CafeBazaar.loadInventory(['coin0']))
  //                   .then((details) => {
  //                     console.log(details);
  //                     setOnPurchase(false);
  //                     CafeBazaar.consume('coin0')
  //                                                 .then(()=>{})
  //                                                 .catch(err => console.log('CafeBazaar Consume err:', err))
  //                     return CafeBazaar.close();
  //                   })
  //                   .catch(err => {console.log('CafeBazaar err:', err); setOnPurchase(false)});
  // }
  // ,[])

  // useEffect(()=>{
  //   CafeBazaar.open()
  //                   .then(() => CafeBazaar.loadOwnedItems())
  //                   .then((details) => {
  //                     console.log(details)
  //                     CafeBazaar.loadInventory(['coin0.test'])
  //                                               .then(()=>{
  //                                                 CafeBazaar.consume('coin0.test')
  //                                                                             .then(()=>{})
  //                                                                             .catch(err => console.log('CafeBazaar Consume err:', err))
  //                                               })
  //                                               .catch(err => console.log('CafeBazaar Consume err:', err))
  //
  //                   })
  //                   .catch(err => {console.log('CafeBazaar err:', err); setOnPurchase(false)});
  // }
  // ,[])
  function onItemPress(sku)
  {
      setOnPurchase(true);
      if(!onPurchase)
        CafeBazaar.open()
                        .then(() => CafeBazaar.purchaseAndConsume(sku,'',10002))
                        .then((details)=> {
                          // console.log(details);
                          // Alert.alert(details);
                          setOnPurchase(false);
                          // console.log(details);
                          dispatch(purchaseData(JSON.parse(details)));
                          dispatch(fetchData(fetchType.AddShopCoin));
                          return CafeBazaar.close();
                        })
                        .catch(err => {console.log('CafeBazaar err:', err); setOnPurchase(false);});
  }

  return(
    <>
      <Header/>
      <View style={styles.body}>
        <View style={{height: 40,marginLeft: 20,marginTop: 10,margin: 15, flexDirection: 'row'}}>
            <Text style={styles.textsitem}>فروشگاه</Text>
        </View>
        <ScrollView style={{marginTop: 0}} numColumns={2}>
          {shopItems.length?<View style={{ }}>
                        {shopItems.map((item,i) => {
                          if(item!=null)
                         return (<ShopItem key={i} item={item} onPress={onItemPress}/>)
                       })}
          </View>:<></>}
        </ScrollView>
      </View>
    </>
  );
}



// <View style={{backgroundColor:COLORS.white }}>
//   <FlatList
//     data={shopItems}
//     keyExtractor={(item, index) => index.toString()}
//     numColumns={3}
//     renderItem={({ item }) => {
//       return(
//         <ShopItem item={item} onPress={onItemPress}/>
//       )
//     }}
//   />
// </View>
const styles = StyleSheet.create({
  body: {
    flex:1,
    backgroundColor: COLORS.bluemed
  },
  TextInputStyleClass:{
    flex: 1,
    marginTop: 0,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 3,
    fontFamily: "Estedad",
    fontSize: 20,
    fontWeight: '600',
    textAlign:'center',
    borderWidth: 2,
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF",
  },
  textsitem: {
    fontFamily: "Estedad",
    fontSize: 21,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  buttons: {
    flex:1,
    marginLeft:5,
    marginRight: 5,
    marginTop: 8,
  },
});

export default ShopScreen;
