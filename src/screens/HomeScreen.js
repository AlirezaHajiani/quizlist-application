import React,{useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
  Linking
} from 'react-native';
import {COLORS} from '../config/colors.js'

import { useDispatch,useSelector } from 'react-redux'
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { soundPlay,soundPlayMusic, soundStopMusic } from '../actions/sound/sound.js';
import { useFocusEffect } from '@react-navigation/native';
import { pushSetScreen } from '../actions/push/push_data';
import { profileId } from '../actions/profile/profile_data';
import { keychainhGetUser , keychainhGetMatch , keychainhGetPurchase } from '../actions/keychain-data/keychain-data';

import HomeItem from './HomeItem.js';
import HomeScreenAd from './HomeScreenAd.js';
import AnimButton from "../components/AnimButton.js";
import Header from "../components/Header.js";
import {Loader} from "../components/Loader.js"
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import YesNoDialoge from "../components/dialoge/YesNoDialoge.js";

function HomeScreen(props) {
  const user=useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [dialogeUpdateShow,setDialogeUpdateShow] = useState(false);

  const [userMatches, setUserMatches] = useState();
  const [oppoMatches, setOppoMatches] = useState();
  const [finishMatches, setFinishMatches] = useState();

  const dispatch = useDispatch()

  function toggleModalUpdate(){
      setDialogeUpdateShow(!dialogeUpdateShow);
  }

  const onRefresh = React.useCallback(() => {
      dispatch(fetchData(fetchType.GetUser));
    }, []);

  useEffect(() => {
    setUserMatches(!isEmpty(user.allmatches)?user.allmatches.filter(userTurn):{});
    setOppoMatches(!isEmpty(user.allmatches)?user.allmatches.filter(opponentTurn):{});
    setFinishMatches(!isEmpty(user.allmatches)?user.allmatches.filter(finishCheck):{});
  },[user]);

  useEffect(() => {
    if(user.User.message && user.User.message.length>0)
      toggleModalUpdate();
  },[user.User.message]);

  const allMatches=React.useCallback(() => {
    // console.log('focus');
    // console.log(user.User._id);
    dispatch(pushSetScreen(2));

    if(user.User._id)
      dispatch(fetchData(fetchType.GetUser));
  }, [user.User._id]);

  useFocusEffect(
    allMatches
  );

  useEffect(() => {
    if(user.sync)
      dispatch(fetchData(fetchType.GetAllMatches));
  },[user.sync]);

  useEffect(() => {
    //console.log(user);

    if(user.sync)
    {
        dispatch(fetchData(fetchType.GetUser));
    }
    else {
      if(user.User)
      {
        dispatch(fetchData(fetchType.UpdateUser));
      }
      else {
        dispatch(fetchData(fetchType.GetUser));
      }
    }
  //   dispatch(keychainhGetUser())
  //   .then(()=>{
  //     console.log(user);
  //     // if(user.sync)
  //     // {
  //     //     dispatch(fetchData(fetchType.GetUser));
  //     // }
  //     // else {
  //     //   if(user.User)
  //     //   {
  //     //     dispatch(fetchData(fetchType.UpdateUser));
  //     //   }
  //     //   else {
  //     //     dispatch(fetchData(fetchType.GetUser));
  //     //   }
  //     // }
  //   });
  //   // if(user.sync)
  //     // dispatch(fetchData(fetchType.GetUser));
  //     //  console.log(user);
  //     // console.log(typeof user.allmatches);
  },[]);

  function isEven(n) {
     return n % 2 == 0;
  }

  function isEmpty(obj) {
     for (var x in obj) { return false; }
     return true;
  }

  function userTurn(match)
  {
      if(match.finished==false)
      {
        if(match.round==0)
        {
          if(match.user1._id==user.User._id)
          {
            if(match.turn!=2)
            {
              return true;
            }
            else {
              return false;
            }
          }
          else {
            if(match.turn!=1)
            {
              return true;
            }
            else {
              return false;
            }
          }
        }
        else {
          if(match.user1._id==user.User._id)
          {
            if(match.turn==1)
              return true;
            else {
              return false;
            }
          }
          else {
            if(match.turn==2)
              return true;
            else {
              return false;
            }
          }
        }
      }
      return false ;
  }

  function opponentTurn(match)
  {
      if(match.finished==false)
      {

        if(match.round==0)
        {
          if(match.user1._id==user.User._id)
          {
            if(match.turn!=2)
            {
              return false;
            }
            else {
              return true;
            }
          }
          else {
            if(match.turn!=1)
            {
              return false;
            }
            else {
              return true;
            }
          }
        }
        else {
          if(match.user1._id==user.User._id)
          {
            if(match.turn==2)
              return true;
            else {
              return false;
            }
          }
          else {
            if(match.turn==1)
              return true;
            else {
              return false;
            }
          }
        }
      }

      return false ;
  }

  function finishCheck(match)
  {
    return match.finished;
  }


  return(
    <>
    <Header/>
    <YesNoDialoge
      isVisible={dialogeUpdateShow}
      toggleModal={toggleModalUpdate}
      onOK={()=> {Linking.openURL('https://cafebazaar.ir/app/com.lotusgames.quizlist/?l=fa');}}
      // onCancel={()=> {dispatch(fetchDataCancel());if(props.onCancel)props.onCancel();}}
      yesTitle={"بروز رسانی"}
      noTitle={"انصراف"}
      title={""}
      message={user.User.message? user.User.message:""}/>
    <View style={styles.body}>
      <View style={{height: 65, marginLeft:10,marginRight: 10,marginTop: 10, flexDirection: 'row'}}>
        <AnimButton
          color={COLORS.blue}
          backColor={COLORS.textShadow}
          style={styles.buttons}
          onPress={()=>{
            dispatch(profileId(user.User._id));
            dispatch(fetchData(fetchType.UserProfile));
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.texts1}>پروفایل</Text>
            <Icon style={{...styles.texts1,paddingTop: 5}} name={"person"} size={25} color={COLORS.white} />
          </View>
        </AnimButton>
        <HomeScreenAd/>
      </View>
      {user.sync?
        <Animatable.View animation="pulse" duration={300} iterationDelay={1000} iterationCount={((userMatches && userMatches.length>0) || (oppoMatches && oppoMatches.length)>0)?1:"infinite"} style={{height: 60,margin: 10}}>
        <AnimButton
          color={COLORS.green}
          backColor={COLORS.greenShadow}
          style={styles.buttons}
          disabled = {!user.sync}
          onPress={() => dispatch(fetchData(fetchType.CreateMatch))}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.texts1}>شروع بازی جدید</Text>
            <Icon style={{...styles.texts1,paddingTop: 10}} name={"ios-add-circle"} size={25} color={COLORS.white} />
          </View>
        </AnimButton>
      </Animatable.View>:
      <View style={{height: 60,margin: 10}}>
      <AnimButton
        color={COLORS.orange}
        backColor={COLORS.orangelight}
        style={styles.buttons}
        disabled = {user.sync}
        onPress={() => dispatch(fetchData(fetchType.UpdateUser))}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.texts1}>همگام سازی</Text>
          <Icon style={{...styles.texts1,paddingTop: 10}} name={"refresh-circle"} size={25} color={COLORS.white} />
        </View>
      </AnimButton>
    </View>
      }

      <View style={{flex : 1,}}>
      <ScrollView style={{marginTop: 10}}
          refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>

        {!isEmpty(userMatches)?<View style={{flexDirection: 'row',alignItems: 'center'}}>
          <View style={{backgroundColor: COLORS.green, width: 15, height: 15,margin: 10,marginLeft: 20, borderRadius: 20,elevation: 5}}/>
          <Text style={styles.texts1}> نوبت توئه</Text>
        </View>:<></>}

        {!isEmpty(userMatches)?<View style={{ }}>
                      {userMatches.map((match,i) => {
                       return (<HomeItem key={i} match={match} userowner={user.User._id==match.user1._id}/>)
                     })}
        </View>:<></>}

        {!isEmpty(oppoMatches)?<View style={{flexDirection: 'row',alignItems: 'center', marginTop: 10}}>
          <View style={{backgroundColor: COLORS.orange, width: 15, height: 15,margin: 10,marginLeft: 20, borderRadius: 20,elevation: 5}}/>
          <Text style={styles.texts1}> نوبت حریفه</Text>
        </View>:<></>}

          {!isEmpty(oppoMatches)?<View style={{ }}>
                      {oppoMatches.map((match,i) => {
                         return (<HomeItem key={i} match={match} userowner={user.User._id==match.user1._id}/>)
                       })}
          </View>:<></>}

          {!isEmpty(finishMatches)?<View style={{flexDirection: 'row',alignItems: 'center',marginTop: 10}}>
            <View style={{backgroundColor: COLORS.red, width: 15, height: 15,margin: 10,marginLeft: 20,borderRadius: 20,elevation: 5}}/>
            <Text style={styles.texts1}> تموم شده</Text>
          </View>:<></>}

            {!isEmpty(finishMatches)?<View style={{ }}>
                        {finishMatches.map((match,i) => {
                           return (<HomeItem key={i} match={match} userowner={user.User._id==match.user1._id}/>)
                         })}
            </View>:<></>}
      </ScrollView>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex:1,
    backgroundColor: COLORS.bluemed
  },
  buttons: {
    flex:1,
    marginLeft:5,
    marginRight: 5,
    marginTop: 8,
  },
  texts1: {
    fontFamily: "Estedad",
    fontSize: 18,
    paddingRight: 5,
    marginBottom: 10,
    textAlignVertical: 'center',
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:5,
  },

})
export default HomeScreen;
