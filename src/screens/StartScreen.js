import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {COLORS} from '../config/colors.js'
import * as Animatable from 'react-native-animatable';

import { useDispatch,useSelector } from 'react-redux'

import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
//User Actions
import { userSetName } from '../actions/user/user_data_success';

import YesNoDialoge from "../components/dialoge/YesNoDialoge.js";
import AnimButton from "../components/AnimButton.js";
import TextInputBorder from "../components/TextInputBorder.js";
import Background from "../components/Background.js"
import * as RootNavigation from '../../RootNavigation.js';

function StartScreen(props) {
  const [isDialogeVisible, setDialogeVisible] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch()

  const toggleDialoge = () => {
    setDialogeVisible(!isDialogeVisible);
  };

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
                           style={{resizeMode: 'stretch',height: 300,width: 300}}/>
                    <Animatable.View animation="bounceIn" style={{...styles.sectionContainer,marginBottom: 10}}>
                      <Text
                        adjustsFontSizeToFit={true}
                        minimumFontScale={1}
                        style={styles.titleNew}>اگر کاربر جدید هستید و تا به حال عضو بازی نشدید</Text>
                      <View style={{height: 50,marginTop: 5, alignItems: 'center'}}>
                          <AnimButton
                            color={COLORS.green}
                            backColor={COLORS.greenShadow}
                            onPress={() => {dispatch(fetchData(fetchType.CreateUser));}}>
                                <Text style={styles.buttonNew}>کاربر جدید</Text>
                          </AnimButton>
                      </View>
                      <View style={{marginTop: 20, alignItems: 'center'}}>
                        <Text
                          adjustsFontSizeToFit={true}
                          minimumFontScale={1}
                          style={{...styles.titleNew,fontSize: 14}}>اگر حساب کاربری دارید گزینه زیر را انتخاب کنید</Text>
                          <View style={{height: 40,marginTop: 5, alignItems: 'center'}}>
                            <AnimButton
                              color={COLORS.bluemed}
                              backColor={COLORS.blue}
                              onPress={() => {RootNavigation.navigate('LoginScreen');}}>
                                  <Text style={{...styles.buttonNew,fontSize:20}}>ورود</Text>
                            </AnimButton>
                          </View>
                      </View>
                    </Animatable.View>

                </View>
                </Background>
  );
};

// <Text
//   adjustsFontSizeToFit={true}
//   minimumFontScale={1}
//   style={{...styles.titleNew,fontSize: 14}}>اگر حساب کاربری دارید گزینه زیر را انتخاب کنید</Text>
// </View>
// <View style={{height: 40,marginTop: 5, alignItems: 'center'}}>
//     <AnimButton
//       color={COLORS.bluemed}
//       backColor={COLORS.blue}
//       onPress={() => {dispatch(fetchData(fetchType.CreateUser));}}>
//           <Text style={{...styles.buttonNew,fontSize:20}}>ورود</Text>
// </AnimButton>
// </View>
// <TextInputBorder
//   style={styles.TextInputStyleClass}
//   placeholder="نام تصادفی"
//   onChangeText= {(value)=>dispatch(userSetName(value))}
//   maxLength={10}
//   />
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFFFFF00",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  titleNew: {
    fontFamily: "Koodak",
    textAlign: 'center',
    fontSize: 17,
    color: COLORS.text,
    marginLeft: 10,
    marginRight: 10,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:4,
  },
  buttonNew: {
    fontFamily: "Koodak",
    fontSize: 23,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 30,
    marginRight: 30,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: -1, height: 2},
    textShadowRadius:5,
  },
  TextInputStyleClass:{
    width: 200,
    marginTop: 5,
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
});

export default StartScreen;
