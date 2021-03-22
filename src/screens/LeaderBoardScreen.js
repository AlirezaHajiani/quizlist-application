import React,{ useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import {COLORS} from '../config/colors.js';
import { useDispatch,useSelector } from 'react-redux';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { useFocusEffect } from '@react-navigation/native';
import { profileId } from '../actions/profile/profile_data';

function LeaderBoardScreen(props) {
  const leaders=useSelector(state => state.leader);
  const user=useSelector(state => state.user);
  const [leaderBoard,setLeaderBoard]=useState(0);
  const [userTotal,setUserTotal]=useState(0);
  const [userWeek,setUserWeek]=useState(-1);
  const [userIndex,setUserIndex]=useState(-1);

  const leaderListRef = useRef();

  const dispatch = useDispatch();

  const leaderFetch=React.useCallback(() => {
    if(leaderBoard==0)
      dispatch(fetchData(fetchType.GetLeaderTotal));
    if(leaderBoard==1)
      dispatch(fetchData(fetchType.GetLeaderWeekly));
    if(leaderBoard==2)
      dispatch(fetchData(fetchType.GetLeaderUser));
  }, [leaderBoard]);

  useFocusEffect(
    leaderFetch
  );

  useEffect(()=>{
    var userIndex=leaders.total.findIndex((item)=>item._id==user.User._id);
    setUserTotal(userIndex);
    if(leaderBoard==2)
      if(userIndex>0){
        setTimeout(() => { leaderListRef.current.scrollToIndex({animated: false,index: userIndex});}, 100);

    }
    // console.log(userIndex);
    // setUserWeek(leaders.weekly.findIndex((item)=>item._id==user.User._id));
    // setUserIndex(leaders.user.findIndex((item)=>item._id==user.User._id));
    // console.log(leaders.total.findIndex((item)=>item._id==user.User._id));
  },[leaders]);

  // useEffect(()=>{
  //   if(userTotal>0){
  //     leaderListRef.current.scrollToIndex({animated: false,index: userTotal});
  //   }
  // },[userTotal]);
  // useEffect(()=>{
  //   leaderFetch();
  // },[leaderBoard]);

  return(
    <View style={styles.body}>
      <View style={{height: 50, flexDirection: 'row'}}>
        <TouchableWithoutFeedback onPress={()=>setLeaderBoard(0)} tyle={{flex:1}}>
          <View style={{...styles.botton1,backgroundColor: (leaderBoard==0)?COLORS.bluelight:COLORS.blue}}>
            <Text style={styles.textstitle}>برترین ها</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>setLeaderBoard(1)} style={{flex:1}}>
          <View style={{...styles.botton2,backgroundColor: (leaderBoard==1)?COLORS.bluelight:COLORS.blue}}>
            <Text style={styles.textstitle}>برترین هفتگی</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>setLeaderBoard(2)} style={{flex:1}}>
          <View style={{...styles.botton3,backgroundColor: (leaderBoard==2)?COLORS.bluelight:COLORS.blue}}>
            <Text style={styles.textstitle}>رتبه شما</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{flex:1}}>
        <View style={{flexDirection: 'row'}}>

            <View
                 style={{
                     height: 40,
                     width: 40,
                     borderRadius: 200,
                     margin: 5,
                   marginLeft: 25,}}/>
          <View style={{flex: 1,alignItems:'flex-start',justifyContent: 'center'}}>
            <Text style={styles.textsitem}>نام کاربر</Text>
          </View>
          <View style={{flex: .6,alignItems:'flex-end',justifyContent: 'center',marginRight: 10}}>
            <Text style={styles.textsitem}>امتیاز</Text>
          </View>
          <View style={{flex: .6,alignItems:'flex-end',justifyContent:'center',marginRight: 10}}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textsitem}>رتبه</Text>
          </View>
        </View>

        <FlatList
          ref={(ref) => { leaderListRef.current = ref; }}
          data={leaders.total || []}
          keyExtractor={(item) => item.key.toString()}
          onScrollToIndexFailed={(error) => {}}
          renderItem={({item,index})=>{
                return(
                      <View style={{backgroundColor: (index==userTotal)?COLORS.green: "#FFFFFF00",marginRight: 10,marginTop: 5}}>
                        <TouchableWithoutFeedback onPress={()=> {dispatch(profileId(item._id));dispatch(fetchData(fetchType.UserProfile));}}>
                          <View style={{flex: 1,flexDirection: 'row'}}>
                              <View style={{flexDirection: 'row'}}>
                                <Image source={item.avatar && item.avatar.length>0?{uri: "https://www.quizlist.ir/avatars/"+item.avatar}:require('../../assets/images/user.png')}
                                     style={{resizeMode: 'contain',
                                         height: 40,
                                         width: 40,
                                         borderRadius: 200,
                                         margin: 5,
                                       marginLeft: 10,}}/>
                                {item.online? <View style={{height: 15,width: 15,position: 'absolute',right: 5,bottom: 5,backgroundColor: "#0f0",alignSelf: 'flex-end',borderRadius: 10,borderColor: "#fff",borderWidth: 2}}/>:<></>}
                            </View>
                            <View style={{flex: 1,alignItems:'flex-start',justifyContent: 'center'}}>
                              <Text style={styles.textsitem}>{item.name}</Text>
                            </View>
                            <View style={{flex: .6,alignItems:'flex-end',justifyContent: 'center',marginRight: 10}}>
                              <Text style={styles.textsitem}>{leaderBoard==1?item.weekscore:item.score}</Text>
                            </View>
                            <View style={{flex: .6,alignItems:'flex-end',justifyContent:'center',marginRight: 5}}>
                              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textsitem}>{item.key}</Text>
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
  );
}

const styles = StyleSheet.create({
  body: {
    flex:1,
    backgroundColor: COLORS.bluemed
  },
  botton1:{
    flex:1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightColor: COLORS.bluemed,
    borderRightWidth: .5,
    elevation: 3,
  },
  botton2:{
    flex:1,
    backgroundColor: COLORS.blue,
    marginTop: 5,
    marginBottom: 5,
    elevation: 3,
  },
  botton3:{
    flex:1,
    backgroundColor: COLORS.blue,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftColor: COLORS.bluemed,
    borderLeftWidth: .5,
    elevation: 3,
  },
  textstitle: {
    flex:1,
    fontFamily: "Koodak",
    fontSize: 17,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  textsitem: {
    fontFamily: "Estedad",
    fontSize: 17,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
})
export default LeaderBoardScreen;
