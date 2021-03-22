import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  BackHandler
} from 'react-native';
import {COLORS} from '../config/colors.js'
import * as Animatable from 'react-native-animatable';

import { useDispatch,useSelector } from 'react-redux'

import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';

import YesNoDialoge from "../components/dialoge/YesNoDialoge.js";
import AnimButton from "../components/AnimButton.js";
import TextInputBorder from "../components/TextInputBorder.js";
import Background from "../components/Background.js"
import * as RootNavigation from '../../RootNavigation.js';

import {Loader} from "../components/Loader.js"

function LoadScreen(props) {
  const [isDialogeVisible, setDialogeVisible] = useState(false);
  const [screenChange,setScreenChange] = useState(false);

  const dispatch = useDispatch()

  const toggleDialoge = () => {
    setDialogeVisible(!isDialogeVisible);
  };

  useEffect(() => {
      dispatch(fetchData(fetchType.GetUser));
  },[]);

  useEffect(() => {

    if(network.isSucces && !screenChange)
    {
          // console.log("change");
      // RootNavigation.reset('TabScreens');
      setScreenChange(true);
      RootNavigation.reset('TabScreens');
    }
  },[network]);

  return(

              <Background>
              <StatusBar barStyle="default" backgroundColor={COLORS.bluelight} />

              <View style={styles.body}>

              <YesNoDialoge
                isVisible={isDialogeVisible}
                toggleModal={toggleDialoge}
                yesTitle="باشه"
                noTitle="نه!"
                title={"خروج"}
                message={"آیا می خواهید از برنامه خارج شوید؟"}/>

                    <Image source={require('../../assets/images/icon.png')}
                           style={{resizeMode: 'stretch',}}/>
                   <View animation="bounceIn" style={styles.sectionContainer}>
                     <View style={{height: 140,marginTop: 10, alignItems: 'center'}}>

                     </View>
                   </View>
                </View>
                </Background>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFFFFF00",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconImage:{
    marginBottom: 50,
  },
  sectionContainer: {
    marginTop: 32,
    marginBottom: 100,
  },
  titleNew: {
    fontFamily: "Koodak",
    fontSize: 24,
    width:500,
    color: COLORS.text,
    marginLeft: 30,
    marginRight: 30,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },
  buttonNew: {
    fontFamily: "Koodak",
    fontSize: 30,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 30,
    marginRight: 30,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 3, height: 3},
    textShadowRadius:5,
  },
  TextInputStyleClass:{
    fontFamily: "Koodak",
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF",
  },
});

export default LoadScreen;
