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
  ActivityIndicator
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

function SettingScreen(props) {
  const userdata = useSelector(state => state.user);
  const token = useSelector(state => state.keychain.token);
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [password2,setPassword2]=useState("");
  const [hasUserName,setHasUserName]=useState(false);

  const [validate,setValidate]=useState(true);
  const [onCheck,setOnCheck]=useState(false);
  const [notCheck,setNotCheck]=useState(false);
  const [duplicate,setDuplicate]=useState(false);

  // const [validate2,setValidate2]=useState(true);
  // const [validate3,setValidate3]=useState(true);
  // const [validate4,setValidate4]=useState(true);
  // const [validate5,setValidate5]=useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(()=>{
    setName(userdata.User.name);
  },[userdata]);

  const checkDuplicate = async () => {
    setOnCheck(true);
    await fetch(config.API_URL[0]+'check/'+name, {
       method: 'GET',
       headers: {
         "Authorization" : "Bearer "+token
       }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson.length);
      setNotCheck(false);
       if(responseJson.length>0)
        setDuplicate(true);
      else {
        setDuplicate(false);
      }
      setOnCheck(false);
    })
    .catch((error) => {
      setOnCheck(false);
       // console.error(error);
    });
  };

  useEffect(()=>{
    setValidate(true);
    if(name==userdata.User.name)
    {
      // setDuplicate(false);
      setNotCheck(false);
    }
    else {
      setNotCheck(true);
      setDuplicate(false);
    }

    if(name.length==0 || name=="" || name.length<3 || name.substring(0,5).toLowerCase()=="guest")
    {
      setValidate(false);
    }
    if(password.length!=0 && password.length<6)
    {
      setValidate(false);
    }
    if(password.length!=0 && password.length>5 && password!=password2)
    {
      setValidate(false);
    }

  },[name,password,password2]);

  return(
    <>
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
          <View style={{height: 50,marginTop: 5,margin: 15, flexDirection: 'row'}}>
              <Text style={styles.textsitem}>حساب کاربری</Text>
          </View>

          <View style={{backgroundColor: COLORS.white}}>
            <View>
                <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>

                  <Text style={styles.textsitem1}>نام کاربر:</Text>
                </View>

                <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
                  <TextInputBorder
                    style={styles.TextInputStyleClass}
                    placeholderTextColor={validate?null:"#FF0000"}
                    placeholder="نام کاربر رو وارد کن"
                    value={name}
                    onChangeText= {(value)=>{setName(value.replace(" ",""));}}
                    maxLength={10}
                    />

                    <View style={{flex: .8, height: 40, marginTop: -15, alignItems: 'center'}}>
                      <AnimButton
                        color={COLORS.green}
                        backColor={COLORS.greenShadow}
                        style={styles.buttons}
                        disabled={name==userdata.User.name || name=="" || name.length<3 || onCheck || name.substring(0,5).toLowerCase()=="guest"}
                        onPress={()=>checkDuplicate()}
                        >
                        <View style={{flexDirection: 'row',margin: 30}}>
                          {onCheck?
                          <ActivityIndicator size="small" color="#ffffff" />
                          :<Text style={{...styles.texts1,fontSize: 14}}>بررسی</Text>}
                        </View>
                      </AnimButton>
                    </View>

                  </View>
              </View>
              <Text style={{...styles.textsitemerror,color: COLORS.green}}>{name!=userdata.User.name && !duplicate && !notCheck ?"● نام کاربر آزاد است":" "}</Text>
              <Text style={styles.textsitemerror}>{duplicate ?"● نام کاربر تکراریست":" "}</Text>
              <Text style={styles.textsitemerror}>{name.length<3 ?"● نام کاربر حداقل 3 حرف":" "}</Text>

              <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>
                <Text style={styles.textsitem1}> رمز ورود:</Text>
              </View>
              <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
                  <TextInputBorder
                    style={styles.TextInputStyleClass}
                    placeholder="رمز ورود (حداقل 6 کاراکتر)"
                    value={password}
                    secureTextEntry={true}
                    onChangeText= {(value)=>{setPassword(value);}}
                    maxLength={10}
                    />
              </View>
              <Text style={styles.textsitemerror}>{password.length<5 && password.length!=0?"● رمز عبور حداقل 6 حرف":" "}</Text>

              <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row'}}>
                <Text style={styles.textsitem1}>تکرار رمز ورود:</Text>
              </View>
              <View style={{height: 50, marginTop: 0, alignItems: 'center', flexDirection: 'row',marginLeft: 20,marginRight: 20}}>
                  <TextInputBorder
                    style={styles.TextInputStyleClass}
                    placeholder="تکرار رمز ورود"
                    value={password2}
                    secureTextEntry={true}
                    onChangeText= {(value)=>{setPassword2(value);}}
                    maxLength={10}
                    />
              </View>
              <Text style={styles.textsitemerror}>{password!=password2 && password.length!=0?"*تکرار رمز عبور نادرست":" "}</Text>
              <Text style={{...styles.textsitem1,fontSize: 15}}>● برای ورود به سیستم، حداقل یکبار رمز عبور ثبت کنید</Text>
            </View>


          <View style={{flex: 1, height: 70, marginTop: 0, alignItems: 'center'}}>
            <AnimButton
              color={COLORS.green}
              backColor={COLORS.greenShadow}
              style={styles.buttons}
              disabled={!validate || duplicate || notCheck}
              onPress={async ()=>{
                                  userdata.User.name=name;
                                  if(password.length>5)
                                    userdata.User.password=password;
                                  await dispatch(userData(userdata.User));
                                  await dispatch(fetchData(fetchType.UpdateUser));
                                  navigation.goBack();
                                }}
              >
              <View style={{flexDirection: 'row',margin: 30}}>
                <Text style={styles.texts1}>ذخیره</Text>
                <Icon style={{...styles.texts1,marginLeft: 10}} name={"save"} size={25} color={COLORS.white} />
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
    fontFamily: "Estedad",
    fontSize: 15,
    fontWeight: '300',
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF",
  },
  textsitem: {
    fontFamily: "Estedad",
    fontSize: 18,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  textsitem1: {
    fontFamily: "Estedad",
    fontSize: 17,
    textAlignVertical: 'center',
    paddingTop: 1,
    paddingRight: 20,
    color: COLORS.textblack,
  },
  textsitemerror: {
    fontFamily: "Estedad",
    fontSize: 12,
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
    fontFamily: "Estedad",
    fontSize: 18,
    paddingRight: 5,
    textAlignVertical: 'center',
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:5,
  },
});

export default SettingScreen;
