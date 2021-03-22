import React,{useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {COLORS} from '../config/colors.js';
import Header from "../components/Header.js";
import TextInputBorder from "../components/TextInputBorder.js";
import AnimButton from "../components/AnimButton.js";
import Icon from 'react-native-vector-icons/Ionicons';
import { searchName } from '../actions/search/search_data';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { profileId } from '../actions/profile/profile_data';

import { useDispatch,useSelector } from 'react-redux';

function SearchScreen(props) {
  const users=useSelector(state => state.search);
  const dispatch = useDispatch();

  return(
    <>
      <Header/>
      <View style={styles.body}>
        <View style={{height: 60,marginTop: 10,margin: 15, flexDirection: 'row'}}>
          <TextInputBorder
            style={styles.TextInputStyleClass}
            placeholder="نام کاربر رو بنویس"
            onChangeText= {(value)=>dispatch(searchName(value))}
            maxLength={10}
            />
            <View style={{height: 50,width: 50, marginLeft: 10, marginTop: 2,alignItems: 'center'}}>
                <AnimButton
                  color={COLORS.green}
                  backColor={COLORS.greenShadow}
                  onPress={() => {if(users.name.length>0)dispatch(fetchData(fetchType.SearchUsers));}}>
                      <Icon style={{margin: 10}} name={"search"} size={25} color={COLORS.white} />
                </AnimButton>
            </View>
        </View>
        <View style={{flex:1}}>

          <FlatList
            data={users.users || []}
            keyExtractor={(item,index) => index.toString()}
            onScrollToIndexFailed={(error) => {}}
            renderItem={({item,index})=>{
                  return(
                        <View style={{marginRight: 10}}>
                          <TouchableWithoutFeedback onPress={()=> {dispatch(profileId(item._id));dispatch(fetchData(fetchType.UserProfile));}}>
                            <View style={{flex: 1,flexDirection: 'row'}}>
                              <View style={{flexDirection: 'row'}}>
                                <Image source={item.avatar && item.avatar.length>0?{uri: "https://www.quizlist.ir/avatars/"+item.avatar}:require('../../assets/images/user.png')}
                                     style={{resizeMode: 'contain',
                                         height: 40,
                                         width: 40,
                                         borderRadius: 200,
                                         margin: 5,
                                       marginLeft: 25,}}/>
                                 <View style={{height: 15,width: 15,position: 'absolute',right: 5,bottom: 5,backgroundColor: item.online?"#0f0":"#aaa",alignSelf: 'flex-end',borderRadius: 10,borderColor: "#fff",borderWidth: 2}}/>
                                </View>
                              <View style={{flex: 1,alignItems:'flex-start',justifyContent: 'center'}}>
                                <Text style={styles.textsitem}>{item.name}</Text>
                              </View>
                              <View style={{flex: 1,alignItems:'flex-end',justifyContent: 'center',marginRight: 20}}>
                                <Text style={styles.textsitem}>{item.score}</Text>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      );
              }
            }
            style={{flex:1,margin: 5,marginLeft: 10}}/>

        </View>
      </View>
    </>
  );
}


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
    fontFamily: "Koodak",
    fontSize: 20,
    fontWeight: '600',
    textAlign:'center',
    borderWidth: 2,
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF",
  },
  textsitem: {
    fontFamily: "Koodak",
    fontSize: 17,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
});

export default SearchScreen;
