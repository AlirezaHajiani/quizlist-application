import React,{useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import {COLORS} from '../config/colors.js'
import { useDispatch,useSelector } from 'react-redux'
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';

import AsyncStorage from '@react-native-community/async-storage';
import AnimButton from "../components/AnimButton.js";
import TapsellPlus from 'react-native-tapsell-plus';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoGiftDialoge from '../components/dialoge/VideoGiftDialoge.js';
import { ZONE_IDS } from "../config/Tplus.js";

function HomeScreenAd(props) {
    const [loadAd,setLoadAd] = useState(false);
    const [adTimeDiff,setAdTimeDiff] = useState(0);
    const [diffNow,setDiffNow] = useState(1);
    const [dialogeShow,setDialogeShow] = useState(false);

    const savedCallback = useRef();
    const intervalRef = useRef();

    const dispatch = useDispatch();
    // var timer;
    function toggleModal(){
        setDialogeShow(!dialogeShow);
    }

    useEffect(() => {
     const asyncGetAdTime = async () => {
       try {
         const storageData = await AsyncStorage.getItem('AD_TIME');
         setAdTimeDiff(storageData?parseInt(storageData):0);
         // console.log(storageData?parseInt(storageData):0);
       } catch (e) {console.log("AD TIME ERROR");}
     }
     asyncGetAdTime();
    }, []);

    function setTimer()
    {
        // console.log(diffNow);
        if((adTimeDiff-Date.now())>0)
        {
          setDiffNow(adTimeDiff-Date.now());
        }
        else {
          clearInterval(intervalRef.current);
          setDiffNow(0);
        }

    }

    useEffect(() => {
      savedCallback.current = setTimer;
    });

    useEffect(() => {
        if(adTimeDiff-Date.now()>0)
        {
          setDiffNow(1);
          // console.log("Set Timer");
          const timer = setInterval(() => savedCallback.current(), 1000);
          intervalRef.current = timer;
          return () => clearInterval(intervalRef.current);
        }
        else {
          clearInterval(intervalRef.current);
          setDiffNow(0);
        }
    }, [adTimeDiff]);

    const asyncSetAdTime = async (time) => {
      try {
        const storageData = await AsyncStorage.setItem('AD_TIME',time.toString());
        setAdTimeDiff(time);
      } catch (e) {console.log("AD TIME SAVE ERROR");}
    }

    function showAd() {
      TapsellPlus.showAd(
        ZONE_IDS.REWARDEDMAIN,
        () => {
          // console.log('open ad');
        },
        () => {
          // console.log('close ad');
          // asyncSetAdTime(Date.now()+60*60*1000);
          // asyncSetAdTime(Date.now()+20*1000);
          setLoadAd(false);
        },
        () => {
          // console.log('rewarded');
          asyncSetAdTime(Date.now()+60*60*1000);
          dispatch(fetchData(fetchType.AddAdCoin));
          toggleModal();

        },
        error => {
          console.log('ERROR\n' + error);
          setLoadAd(false);
        },
      );
    };

      return(
        <>
        <VideoGiftDialoge isVisible={dialogeShow} toggleModal={toggleModal}/>
        <AnimButton
          color={COLORS.orange}
          backColor={COLORS.orangelight}
          style={styles.buttons}
          disabled= {loadAd || diffNow}
          onPress={()=>{
                        // dispatch(soundPlay("resultsonepoint"));
                        setLoadAd(true);
                        TapsellPlus.requestRewarded(
                          ZONE_IDS.REWARDEDMAIN,
                          () => {
                            // console.log("Ad Ready");
                            showAd();
                          },
                          error => {
                            setLoadAd(false);
                            console.log('ERROR\n' + error);
                          },
                        );
                       }}>
                       <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',width: 95}}>
                           {diffNow?<Text style={{...styles.texts1,fontSize: 15}}>{Math.floor((diffNow/3600000)).toString().padStart(1, "0")}:{Math.floor((diffNow/60000)%60).toString().padStart(2, "0")}:{Math.floor((diffNow/1000)%60).toString().padStart(2, "0")}</Text>:
                                    <Text style={{...styles.texts1,fontSize: 14}}>{loadAd?"بارگذاری":"سکه رایگان"}</Text>
                           }
                           <View style={{flexDirection: 'row',alignItems:'center',marginTop: -5}}>
                              <Text style={{...styles.texts1,fontFamily: "Koodak",fontSize: 15,textAlign: 'center'}}>     45</Text>
                              <Image source={require('../../assets/images/coin.png')}
                                     style={styles.coinimage}/>
                           </View>
                        </View>
                          <Icon style={{...styles.texts1,fontSize: 40}} name={"film-outline"} size={40} color={COLORS.white} />
                       </View>
        </AnimButton>
        </>
      );
}

const styles = StyleSheet.create({
  buttons: {
    flex:1,
    marginLeft:5,
    marginRight: 5,
    marginTop: 8,
  },
  texts1: {
    fontFamily: "Estedad",
    fontSize: 20,
    paddingRight: 5,
    textAlignVertical: 'center',
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:5,
  },
  coinimage:{
    resizeMode: 'stretch',
    height: 20,
    width: 20,
  },
});

export default HomeScreenAd;
