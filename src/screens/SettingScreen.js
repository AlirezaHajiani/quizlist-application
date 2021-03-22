import React,{useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Switch,
  Share,
  Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {COLORS} from '../config/colors.js';
import Header from "../components/Header.js";
import TextInputBorder from "../components/TextInputBorder.js";
import AnimButton from "../components/AnimButton.js";
import Icon from 'react-native-vector-icons/Ionicons';
import { soundMuteState , musicMuteState } from '../actions/sound/sound.js';
import PushPole from 'pushpole-react-native';
import CafeBazaarIntents from 'react-native-cafebazaar-intents';
import { useDispatch,useSelector } from 'react-redux';
import * as RootNavigation from '../../RootNavigation.js';

function SettingScreen(props) {
  const userdata = useSelector(state => state.user);
  const [soundState,setSoundState]=useState(true);
  const [musicState,setMusicState]=useState(true);
  const [notifState,setNotifState]=useState(true);
  const [firstTime,setFirstTime]=useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
   const asyncGetSettings = async () => {
     try {
       const storageData = await AsyncStorage.getItem('SETTING');
       if(storageData)
       {
         var sttings=JSON.parse(storageData);

         setSoundState(sttings.soundState);
         dispatch(soundMuteState(sttings.soundState));
         setMusicState(sttings.musicState);
         dispatch(musicMuteState(sttings.musicState));
         setNotifState(sttings.notifState);
         if(sttings.notifState){
           PushPole.setNotificationOn();
         }
         else {
           PushPole.setNotificationOff();
         }
       }
       setFirstTime(true);
       // console.log(storageData?parseInt(storageData):0);
     } catch (e) {console.log("Settings ERROR");}
   }
   asyncGetSettings();
  }, []);

  useEffect(() => {
    if(firstTime)
    {
       const asyncSaveSettings = async () => {
         try {
           const storageData = await AsyncStorage.setItem('SETTING',JSON.stringify({ soundState: soundState,
                                                                                     musicState:musicState,
                                                                                     notifState:notifState}));
           // console.log(storageData?parseInt(storageData):0);
         } catch (e) {console.log("Settings Save ERROR");}
       }
       asyncSaveSettings();
       dispatch(soundMuteState(soundState));
       dispatch(musicMuteState(musicState));
       if(notifState){
         PushPole.setNotificationOn();
       }
       else {
         PushPole.setNotificationOff();
       }
     }
 }, [soundState,musicState,notifState]);

  const onShare = async () => {
     try {
       const result = await Share.share({
         title: `بازی QuizList`,
         message:
           `من تو بازی QuizList با اسم ${userdata.User.name} بازی میکنم. همین حالا با کد دعوت ${Date.parse(userdata.User.Created_date).toString(36)} بیا تا با هم رقابت کنیم! اگه بازی رو نداری از اینجا نصبش کن: https://quizlist.ir/dl`,
           //`من تو بازی QuizList با اسم ${userdata.User.name} بازی میکنم. همین حالا بیا تا با هم رقابت کنیم! اگه بازی رو نداری از اینجا نصبش کن: https://quizlist.ir/dl`,
       });
     } catch (error) {

     }
   };

  // console.log(Date.parse(userdata.User.Created_date).toString(36));
  return(
    <>
      <Header/>
      <View style={styles.body}>
        <ScrollView>
          <View style={{height: 40,marginTop: 10,margin: 15, flexDirection: 'row'}}>
              <Text style={styles.textsitem}>تنظیمات</Text>
          </View>

          <View style={{backgroundColor: COLORS.white}}>
            <TouchableWithoutFeedback onPress={()=>RootNavigation.navigate('UserSettingScreen')}>
                <View style={styles.places}>
                  <Icon name={"person"} size={30} style={styles.icons} color={COLORS.bluemed} />
                  <Text style={styles.textsitem1}>حساب کاربری</Text>
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.places}>
              <Icon name={"ios-volume-high"} size={30} style={styles.icons} color={COLORS.bluemed} />
              <Text style={styles.textsitem1}>صدای افکت</Text>
              <View style={{flex: 1,alignItems:'flex-end',paddingRight: 30}}>
                <Switch value={soundState}
                        onValueChange={(value)=>setSoundState(value)}
                        trackColor={{ true: COLORS.bluelight }}
                        thumbColor={soundState ? COLORS.bluemed : "#f4f3f4"}/>
              </View>
            </View>

            <View style={styles.places}>
              <Icon name={"musical-notes"} size={30} style={styles.icons} color={COLORS.bluemed} />
              <Text style={styles.textsitem1}>موزیک</Text>
              <View style={{flex: 1,alignItems:'flex-end',paddingRight: 30}}>
                <Switch value={musicState}
                        onValueChange={(value)=>setMusicState(value)}
                        trackColor={{ true: COLORS.bluelight }}
                        thumbColor={musicState ? COLORS.bluemed : "#f4f3f4"}/>
              </View>
            </View>

            <View style={styles.places}>
              <Icon name={"notifications"} size={30} style={styles.icons} color={COLORS.bluemed} />
              <Text style={styles.textsitem1}>نوتیفیکیشن</Text>
              <View style={{flex: 1,alignItems:'flex-end',paddingRight: 30}}>
                <Switch value={notifState}
                        onValueChange={(value)=>setNotifState(value)}
                        trackColor={{ true: COLORS.bluelight }}
                        thumbColor={notifState ? COLORS.bluemed : "#f4f3f4"}/>
              </View>
            </View>

          </View>

          <View style={{height: 40,marginTop: 10,margin: 15, flexDirection: 'row'}}>
              <Text style={styles.textsitem}>اشتراک گذاری</Text>
          </View>

          <View style={{backgroundColor: COLORS.white}}>
            <TouchableWithoutFeedback onPress={()=>
                                                      CafeBazaarIntents.showRatePackage('com.lotusgames.quizlist')
                                                    .catch(() => {
                                                      Linking.openURL('https://cafebazaar.ir/app/com.lotusgames.quizlist/?l=fa');
                                                    })
                                                  }>
                <View style={styles.places}>
                  <Icon name={"star"} size={30} style={styles.icons} color={COLORS.bluemed} />
                  <Text style={styles.textsitem1}>ثبت نظر</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback  onPress={()=>{
                                                      onShare();
                                                    }}>
              <View style={styles.places}>
                <Icon name={"mail"} size={30} style={styles.icons} color={COLORS.bluemed} />
                <Text style={styles.textsitem1}>دعوت دوستان
                (20 نفر)
                </Text>
                <View style={{flex: 1,alignItems: 'flex-end'}}>
                  <Image source={require('../..//assets/images/coin.png')} style={{height: 35,width: 35,marginTop: 8,resizeMode: 'contain',}}/>
                </View>
                <Text style={{...styles.textscoin,marginRight: 50}}>200</Text>

              </View>

            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback  onPress={()=>{RootNavigation.navigate('UserGiftScreen');}}>
              <View style={styles.places}>
                <Icon name={"gift"} size={30} style={styles.icons} color={COLORS.bluemed} />
                <Text style={styles.textsitem1}>دریافت جایزه</Text>
                <View style={{flex: 1,alignItems: 'flex-end'}}>
                  <Image source={require('../..//assets/images/coin.png')} style={{height: 35,width: 35,marginTop: 8,resizeMode: 'contain',}}/>
                </View>
                <Text style={{...styles.textscoin,marginRight: 50}}>200</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.instagram.com/quizlist/')}>
              <View style={styles.places}>
                <Icon name={"ios-logo-instagram"} size={30} style={styles.icons} color={COLORS.bluemed} />
                <Text style={styles.textsitem1}>صفحه اینستاگرام</Text>
              </View>
            </TouchableWithoutFeedback>
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
  TextInputStyleClass:{
    flex: 1,
    marginTop: 0,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 3,
    fontFamily: "Estedad",
    fontSize: 17,
    fontWeight: '600',
    textAlign:'center',
    borderWidth: 2,
    borderRadius: 10 ,
    backgroundColor : "#aaa",
  },
  textsitem: {
    fontFamily: "Estedad",
    fontSize: 19,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  textsitem1: {
    fontFamily: "Estedad",
    fontSize: 16,
    textAlignVertical: 'center',
    paddingTop: 1,
    paddingRight: 4,
    color: COLORS.textblack,
  },
  textscoin: {
    fontFamily: "Estedad",
    fontSize: 20,
    textAlignVertical: 'center',
    color: "#ffb700",
    padding: 2,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:2,
  },
  icons: {marginLeft: 20, marginRight: 20},
  places: {height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}
});

export default SettingScreen;
