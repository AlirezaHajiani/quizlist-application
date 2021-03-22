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
  ActivityIndicator,
  StatusBar
} from 'react-native';

import {COLORS} from '../config/colors.js';
import config from '../config/Config';

import TextInputBorder from "../components/TextInputBorder.js";
import AnimButton from "../components/AnimButton.js";
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userData } from '../actions/user/user-data';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { keychainDataSuccess } from '../actions/keychain-data/keychain-data-success';

function SettingScreen(props) {
  const userdata = useSelector(state => state.user);
  const token = useSelector(state => state.keychain.token);
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");

  const [validate,setValidate]=useState(true);
  const [onCheck,setOnCheck]=useState(false);
  const [invalidData,setinvalidData]=useState(false);
  const [duplicate,setDuplicate]=useState(false);

  // const [validate2,setValidate2]=useState(true);
  // const [validate3,setValidate3]=useState(true);
  // const [validate4,setValidate4]=useState(true);
  // const [validate5,setValidate5]=useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const checkUserPass = async () => {
    setOnCheck(true);
    await fetch(config.API_URL[0]+'login', {
       method: 'POST',
       headers: {
         "Content-Type"  : "application/json"
       },
       body: JSON.stringify({username: name, password: password})
    })
    .then((response) => {
                          if(response.status==401)
                          {
                            setinvalidData(true);throw new Error("HTTP status " + response.status);
                          }
                          else
                            return response.json()
                          })
    .then((responseJson) => {
      setinvalidData(false);
      // setOnCheck(false);
      dispatch(keychainDataSuccess(responseJson.token));
    })
    .catch((error) => {
      setOnCheck(false);
       // console.error(error);
    });
  };

  useEffect(()=>{
    setValidate(true);
    setinvalidData(false);

    if(name.length==0 || name=="" || name.length<3)
    {
      setValidate(false);
    }
    if(password.length<6)
    {
      setValidate(false);
    }

  },[name,password]);

  return(
    <>
    <StatusBar barStyle="default" backgroundColor={COLORS.blue} />
    <View style={{height: 40,backgroundColor: COLORS.blue, flexDirection: 'row'}}>

      <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>

      </View>
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>

      </View>
      <View style={{flex:1,justifyContent: 'flex-end',flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={()=> navigation.goBack()}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/images/back.png')}
                     style={{height: 30,width: 20 ,marginTop: 3,marginRight: 20}}/>
            </View>
          </TouchableWithoutFeedback>
      </View>
    </View>
      <View style={styles.body}>
        <ScrollView>
          <View style={{height: 30,marginTop: 5,margin: 15, flexDirection: 'row'}}>
              <Text style={styles.textsitem}>ورود به حساب کاربری</Text>
          </View>

          <View style={{backgroundColor: COLORS.white}}>
            <View>
                <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>

                  <Text style={styles.textsitem1}>نام کاربر:</Text>
                </View>

                <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
                  <TextInputBorder
                    style={styles.TextInputStyleClass}
                    // placeholderTextColor={validate?null:"#FF0000"}
                    placeholder="نام کاربر رو وارد کن"
                    value={name}
                    onChangeText= {(value)=>{setName(value.replace(" ",""));}}
                    maxLength={10}
                    />
                  </View>
              </View>
              <Text style={styles.textsitemerror}>{name.length<3 ?"*نام کاربر حداقل 3 حرف":" "}</Text>

              <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>
                <Text style={styles.textsitem1}> رمز ورود:</Text>
              </View>
              <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
                  <TextInputBorder
                    style={styles.TextInputStyleClass}
                    placeholder="رمز ورود (حداقل 6 کاراکتر)"
                    // placeholderTextColor={validate?null:"#FF0000"}
                    value={password}
                    secureTextEntry={true}
                    onChangeText= {(value)=>{setPassword(value);}}
                    maxLength={10}
                    />
              </View>
              <Text style={styles.textsitemerror}>{password.length<6 && password.length!=0?"* رمز عبور حداقل 6 حرف":" "}</Text>
              <Text style={styles.textsitemerror}>{invalidData?"نام کاربر یا رمز ورود اشتباه است":" "}</Text>

            </View>


          <View style={{flex: 1, height: 60, marginTop: 0, alignItems: 'center'}}>
            <AnimButton
              color={COLORS.green}
              backColor={COLORS.greenShadow}
              style={styles.buttons}
              disabled={!validate || onCheck}
              onPress={async ()=>{
                                  checkUserPass();
                                }}
              >
              <View style={{flexDirection: 'row',width: 80,alignItems: 'center',justifyContent: 'center',margin: 30}}>
                {onCheck?
                  <ActivityIndicator size="small" color="#ffffff" />:
                  <>
                  <Text style={styles.texts1}>ورود</Text>
                  <Icon style={{...styles.texts1,marginLeft: 10}} name={"enter"} size={25} color={COLORS.white} /></>}
              </View>
            </AnimButton>
          </View>

        </ScrollView>

      </View>
    </>
  );
}

// <View>
//     <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>
//
//       <Text style={styles.textsitem1}>نام کاربر:</Text>
//     </View>
//     <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
//       <TextInputBorder
//         style={styles.TextInputStyleClass}
//         placeholder="نام کاربری را وارد کنید"
//         placeholderTextColor={!hasUserName && validate2?null:"#FF0000"}
//         value={userName}
//         onChangeText= {(value)=>{setUserName(value);}}
//         maxLength={10}
//         />
//       </View>
//       <Text style={styles.textsitemerror}>{!hasUserName && validate2?" ":"* نام کاربر را وارد کنید"}</Text>
// </View>
//
// <View>
//     <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>
//
//       <Text style={styles.textsitem1}>رمز عبور:</Text>
//     </View>
//     <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
//       <TextInputBorder
//         style={styles.TextInputStyleClass}
//         placeholder="رمز عبور (حداقل 6 کاراکتر)"
//         value={password}
//         onChangeText= {(value)=>{setPassword(value);}}
//         maxLength={10}
//         />
//       </View>
//       <Text style={styles.textsitemerror}>{validate3?" ":"* رمز عبور حداقل 6 حرف"}</Text>
// </View>
//
//
// <View>
//     <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>
//
//       <Text style={styles.textsitem1}>تکرار رمز عبور:</Text>
//     </View>
//     <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
//       <TextInputBorder
//         style={styles.TextInputStyleClass}
//         placeholder="تکرار رمز عبور"
//         value={password2}
//         onChangeText= {(value)=>{setPassword2(value);}}
//         maxLength={10}
//         />
//       </View>
// </View>
// </View>

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
    fontSize: 16,
    fontWeight: '300',
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF",
  },
  textsitem: {
    fontFamily: "Koodak",
    fontSize: 21,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  textsitem1: {
    fontFamily: "Koodak",
    fontSize: 19,
    textAlignVertical: 'center',
    paddingTop: 1,
    paddingRight: 20,
    color: COLORS.textblack,
  },
  textsitemerror: {
    fontFamily: "Koodak",
    fontSize: 14,
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingRight: 10,
    marginTop: -10,
    color: COLORS.texterror,
  },
  buttons: {
    flex:1,
    marginLeft:5,
    marginRight: 5,
    marginTop: 8,
  },
  texts1: {
    fontFamily: "Koodak",
    fontSize: 20,
    paddingRight: 5,
    textAlignVertical: 'center',
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:5,
  },
});

export default SettingScreen;
