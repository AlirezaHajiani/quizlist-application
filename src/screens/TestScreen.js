import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import { useDispatch,useSelector } from 'react-redux'

import { fetchData } from '../actions/fetch-data/fetch-data.js';
import { keychainGetData } from '../actions/keychain-data/keychain-data.js';

import YesNoDialoge from "../components/dialoge/YesNoDialoge.js";
import AnimButton from "../components/AnimButton.js";
import TextInputBorder from "../components/TextInputBorder.js";
import * as Animatable from 'react-native-animatable';
import AnimatedLoader from "react-native-animated-loader";

function StartScreen(props) {
  const [isDialogeVisible, setDialogeVisible] = useState(false);
  const isLoading = useSelector(state => state.keychain.isLoading);
  const dispatch = useDispatch()

  const toggleDialoge = () => {
    setDialogeVisible(!isDialogeVisible);
  };

  return(
              <View style={styles.body}>
              <AnimatedLoader
                visible={isLoading}
                overlayColor="rgba(0,0,0,0.5)"
                source={require("../../dots-load.json")}
                animationStyle={{width: 300,height: 300}}
                speed={1.2}/>
              <YesNoDialoge
                isVisible={isDialogeVisible}
                toggleModal={toggleDialoge}
                yesTitle="باشه"
                noTitle="نه!"
                title={"خروج"}
                message={"آیا می خواهید از برنامه خارج شوید؟"}/>

                    <Image source={require('../../assets/images/icon.png')}
                           style={{resizeMode: 'stretch',}}/>
                    <Animatable.View animation="bounceIn" style={styles.sectionContainer}>
                      <Text style={styles.buttonNew}>شروع بازی جدید</Text>
                      <TextInputBorder style={styles.TextInputStyleClass} placeholder="نام را وارد کنید"/>

                      <View style={{height: 160}}>
                          <AnimButton color="rgba(0, 255, 0, 1)" backColor="rgba(0, 255, 0, 0.4)" onPress={toggleDialoge}>
                              <Text style={styles.buttonNew}>شروع بازی جدید</Text>
                          </AnimButton>

                          <AnimButton
                            color="rgba(0, 255, 0, 1)"
                            backColor="rgba(0, 255, 0, 0.4)"
                            onPress={() => dispatch(keychainGetData())}>
                                <Text style={styles.buttonNew}>کاربر جدید</Text>
                          </AnimButton>
                      </View>
                    </Animatable.View>
                </View>
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
    paddingHorizontal: 24,
  },
  buttonNew: {
    fontFamily: "Koodak",
    fontSize: 26,
    fontWeight: '600',
    color: "#ffffff",
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
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

export default StartScreen;
