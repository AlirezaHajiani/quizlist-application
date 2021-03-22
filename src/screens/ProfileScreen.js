import React,{ useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Animated,
} from 'react-native';

import {COLORS} from '../config/colors.js';
import { useDispatch,useSelector } from 'react-redux';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import AnimButton from "../components/AnimButton.js";
import Header from "../components/HeaderProfile.js";
import ProfileImageUploader from './ProfileImageUploader.js'
import * as RootNavigation from '../../RootNavigation.js';

function ProfileScreen(props) {
  const profile = useSelector(state => state.profile.Profile);
  const allmatches=useSelector(state => state.user.allmatches);
  const user=useSelector(state => state.user.User);
  const token = useSelector(state => state.keychain.token);
  const [percent,setPercent]=useState(0);
  const [games,setGames]=useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const percentAnim = useRef(new Animated.Value(0)).current;
  const gamesAnim = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch()
  const lineWidth = 230;

  useEffect(() => {
    Animated.timing(
      progressAnim,
      {
        toValue: lineWidth*(1-((profile.rank-1)/profile.total)),
        duration: 1000,
        useNativeDriver: false,
      }
    ).start();

    percentAnim.addListener(({value}) => setPercent(value));
    Animated.timing(
      percentAnim,
      {
        toValue: Math.floor(((profile.wons*100)/(profile.matches?profile.matches:1))),
        duration: 1000,
        useNativeDriver: false,
      }
    ).start();

    gamesAnim.addListener(({value}) => setGames(value));
    Animated.timing(
      gamesAnim,
      {
        toValue: profile.wons,
        duration: 1000,
        useNativeDriver: false,
      }
    ).start();
  }, [profile])

  // function checkMatch()
  // {
  //     var profileMatch=allmatches.filter((match)=>{
  //       return match.user1._id==profile._id || (match.user2?match.user2._id==profile._id:false);
  //     })
  //     if(profileMatch.length)
  //       return true;
  //     else {
  //       return true;
  //     }
  //
  // }

  function circleDraw(value,color)
  {
      return(
        <View style={{...styles.circle,backgroundColor: color?color:COLORS.bluemed}}>
          <View style={styles.circleinner}>
                <Text style={styles.texts}>{value}</Text>
          </View>
        </View>
      );
  }
  return(
    <>
    <Header name={profile.name}/>

    <View style={styles.body}>

      <View style={{height: 100,marginTop: 10}}>
          {user._id==profile._id?
                <ProfileImageUploader userId={user._id} hasImage={user.avatar && user.avatar.length>0} userAvatar={user.avatar && user.avatar} token={token}/>:
                <Image source={profile.avatar && profile.avatar.length>0?{uri: "https://www.quizlist.ir/avatars/"+profile.avatar}:require('../../assets/images/user.png')}
                 style={{flex:1,resizeMode: 'contain',
                     height: undefined,
                     width: undefined,
                      borderRadius: 200,}}/>}
      </View>
      <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'center',marginTop: 10}}>
        {profile.online?<View style={{flexDirection: 'row'}}>
                          <View style={{height: 15,width: 15, marginRight: 10,backgroundColor: "#0f0",alignSelf: 'flex-end',borderRadius: 10,borderColor: "#fff",borderWidth: 2}}/>
                          <Text style={styles.statusText}>آنلاین</Text>
                        </View>
                        :
                        <View style={{flexDirection: 'row'}}>
                          <View style={{height: 15,width: 15, marginRight: 10,backgroundColor: "#aaa",alignSelf: 'flex-end',borderRadius: 10,borderColor: "#fff",borderWidth: 2}}/>
                          <Text style={styles.statusText}>{profile.Updated_date}</Text>
                        </View>
                        }
      </View>
      <View style={{height: user._id!=profile._id?55:0,alignItems: 'center'}}>
      {user._id!=profile._id?
          <AnimButton
          color={COLORS.green}
          backColor={COLORS.greenShadow}
          style={{...styles.buttons,width: 200}}
          onPress={async () =>{
                          await RootNavigation.reset('TabScreens',{ screen: 'HomeScreen' });
                          dispatch(fetchData(fetchType.CreateMatchProfile));
                          // navigation.navigate('GameMain');
                         }}>

          <Text style={styles.texts1}> بازی کن</Text>
        </AnimButton>
        :<></>}
      </View>

      <ScrollView style={{marginTop: 1}}>
        <View style={styles.area}>

          <View style={styles.titlearea}>
            <Text style={styles.titletext}>عملکرد</Text>
          </View>

          <View style={{flex: 1,backgroundColor: COLORS.white,flexDirection: 'row'}}>
            <View style={{flex: 1,paddingTop: 10,alignItems: 'center',justifyContent: 'center'}}>
              {circleDraw(Math.floor(games))}
                <Text style={styles.texts}>بازی برنده</Text>
            </View>
            <View style={{flex: 1,paddingTop: 10,alignItems: 'center',justifyContent: 'center'}}>
                {circleDraw("%"+Math.floor(percent),COLORS.greenShadow)}
                <Text style={styles.texts}>درصد برد</Text>
            </View>
          </View>

        </View>

        <View style={styles.area}>

          <View style={styles.titlearea}>
            <Text style={styles.titletext}>پاسخ ها</Text>
          </View>

          <View style={{flex: 1,backgroundColor: COLORS.white,flexDirection: 'row'}}>
            <View style={{flex: 1,paddingTop: 10,alignItems: 'center',justifyContent: 'center'}}>
              {circleDraw((profile.meancorrect/10).toFixed(1),COLORS.green)}
                <Text style={styles.texts}>پاسخ درست</Text>
            </View>
            <View style={{flex: 1,paddingTop: 10,alignItems: 'center',justifyContent: 'center'}}>
                {circleDraw((profile.meantwo/10).toFixed(1),COLORS.orange)}
                <Text style={styles.texts}>پاسخ 2 امتیاز</Text>
            </View>
            <View style={{flex: 1,paddingTop: 10,alignItems: 'center',justifyContent: 'center'}}>
                {circleDraw((profile.meanthree/10).toFixed(1),COLORS.violet)}
                <Text style={styles.texts}>پاسخ 3 امتیاز</Text>
            </View>
          </View>

        </View>

        <View style={{height: 180}}>
          <View style={{height: 60}}>
            <Text style={styles.titletext}>رتبه و امتیاز</Text>
          </View>

          <View style={{flex: 1,backgroundColor: COLORS.white,alignItems: 'center'}}>
            <View style={{flex:.5,width: lineWidth+50 ,alignItems: 'flex-end'}}>
              <Animated.Text style={{...styles.texts,marginRight: progressAnim, marginBottom: -40,paddingTop: 5}}>
                ▼{profile.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Animated.Text>
            </View>
            <View style={{flex: 1,flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{...styles.texts,marginRight: 10}}>1</Text>
                <View style={{height: 5,width: lineWidth,backgroundColor: COLORS.grey,flexDirection: 'row',justifyContent:'flex-end'}}>
                <Animated.View style={{height: 5,width: progressAnim ,backgroundColor: COLORS.green}}/>
              </View>
              <Text style={{...styles.texts,marginLeft: 10}}>{profile.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>
            <View style={{flex:.5,width: lineWidth+50 ,alignItems: 'flex-start',marginBottom: 4}}>
            <Text style={{...styles.texts}}>
              امتیاز: {" "+ profile.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
    </>

  );
}

const styles = StyleSheet.create({
  body: {
    flex:1,
    backgroundColor: COLORS.bluemed
  },
  buttons: {
    flex:1,
    marginLeft:5,
    marginRight: 5,
    marginTop: 10,
  },
  texts: {
    fontFamily: "Estedad",
    fontSize: 12,
    textAlignVertical: 'center',
    color: "#000000"
  },
  texts1: {
    fontFamily: "Estedad",
    fontSize: 16,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  titletext: {
    fontFamily: "Estedad",
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 18,
    textAlignVertical: 'center',
    color: COLORS.text,
  },
  statusText:{fontFamily: "Estedad",fontSize: 15,marginBottom: -5,color: COLORS.text},
  area: {height: 180},
  titlearea: {height: 60},
  circle: {height: 55,width: 55, borderRadius: 55, backgroundColor: COLORS.bluemed,alignItems: 'center',justifyContent:'center'},
  circleinner: {height: 40,width: 40, borderRadius: 40, backgroundColor: COLORS.white,alignItems: 'center',justifyContent:'center'},
})

export default ProfileScreen;
