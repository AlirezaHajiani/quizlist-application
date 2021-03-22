import React, {useState, useEffect} from 'react';
import { BackHandler } from 'react-native';
import { useDispatch,useSelector } from 'react-redux'
import { keychainGetData, keychainhGetUser , keychainhGetMatch , keychainhGetPurchase } from '../actions/keychain-data/keychain-data';
import AnimatedLoader from "react-native-animated-loader";
import PushPole from 'pushpole-react-native';

import {COLORS} from '../config/colors.js'

import LoadingScreen from "./LoadingScreen.js"
import StartStack from "./StartStack.js"
import TabScreens from './TabScreens.js'
import GameScreen from './GameScreen.js'
import PushController from '../gamescript/pushController.js'
import SoundController from '../gamescript/soundController.js'
import {Loader} from "../components/Loader.js"

function Screens(props) {
  const [hasToken, setHasToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user=useSelector(state => state.user);
  // const isLoading = useSelector(state => state.keychain.isLoading);
  // const keychainReady = useSelector(state => state.keychain.isSucces);
  const token = useSelector(state => state.keychain.token);
  const dispatch = useDispatch()

  // useEffect(() => {
  //     keychainLoad();
  //     // dispatch(keychainGetData());
  //     // dispatch(keychainhGetMatch());
  //     // dispatch(keychainhGetPurchase());
  // },[]);

  // const keychainLoad = async () => {
  //   await dispatch(keychainhGetMatch());
  //   await dispatch(keychainhGetUser());
  //   await dispatch(keychainGetData());
  //   setIsLoading(false);
  // };

  useEffect(() => {
      if(token!="")
        setHasToken(true);
    // console.log("Token Effect");
  },[token]);

    return(
      <>
        <PushController/>
        <SoundController/>
        {user.User && user.User._id?<Loader/>:<Loader noTitle="خروج" onCancel={()=>BackHandler.exitApp()}/>}
        <AnimatedLoader
          //visible={isLoading}
          overlayColor={COLORS.overlay}
          source={require("../../dots-load.json")}
          animationStyle={{width: 300,height: 300}}
          speed={1.2}/>

          {isLoading?<LoadingScreen/>:(hasToken ? <GameScreen/> : <StartStack/>)}
      </>
    );
};

export default Screens;
