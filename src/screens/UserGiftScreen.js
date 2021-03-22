import React,{useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

import {COLORS} from '../config/colors.js';
import config from '../config/Config';

import TextInputBorder from "../components/TextInputBorder.js";
import AnimButton from "../components/AnimButton.js";
import Icon from 'react-native-vector-icons/Ionicons';
import OKDialoge from "../components/dialoge/OKDialoge.js";

import { useDispatch,useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userData } from '../actions/user/user-data';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';

function GiftScreen(props) {
  const userdata = useSelector(state => state.user);
  const token = useSelector(state => state.keychain.token);
  const [name,setName]=useState("");

  const [validate,setValidate]=useState(true);
  const [onCheck,setOnCheck]=useState(false);
  const [dialogeSameShow,setDialogeSameShow] = useState(false);
  const [dialogeMessage,setDialogeMessage] = useState('');

  function toggleModalSame(){
      setDialogeSameShow(!dialogeSameShow);
  }


  const navigation = useNavigation();
  const dispatch = useDispatch();

  const checkGift = async () => {
    setOnCheck(true);
    await fetch(config.API_URL[0]+'gift/'+name, {
       method: 'POST',
       headers: {
         "Authorization" : "Bearer "+token
       }
    })
    .then((response) => {
        if(response.status==404)
        {
          setDialogeMessage( "\n کدی که وارد کردی معتبر نیست \n");
          toggleModalSame();
        }
        else if(response.status==200)
        {
          dispatch(fetchData(fetchType.GetUser));
          setDialogeMessage( "\n 200 سکه جایزه گرفتی! \n");
          toggleModalSame();

        }
        else if(response.status==204)
        {
          setDialogeMessage( "\n کد دعوت رو قبلا وارد کردی \n\n و سکه جایزه گرفتی!\n");
          toggleModalSame();
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
    if(name.length==0 || name=="")
    {
      setValidate(false);
    }

  },[name]);

  return(
    <>
    <OKDialoge
      isVisible={dialogeSameShow}
      toggleModal={toggleModalSame}
      // onOK={()=> {dispatch(fetchData());if(props.onOK)props.onOK();}}
      // onCancel={()=> {dispatch(fetchDataCancel());if(props.onCancel)props.onCancel();}}
      yesTitle={"خب"}
      title={""}
      message={dialogeMessage}/>


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

          <View style={{height: 50,marginTop: 50,margin: 15, flexDirection: 'row'}}>
              <Text style={styles.textsitem}>کد دعوت رو اینجا وارد کن و جایزه بگیر</Text>
          </View>

          <View style={{backgroundColor: COLORS.violetlight,borderRadius: 10}}>
                <View style={{ width: 300, margin: 10, alignItems: 'center', flexDirection: 'row',marginLeft: 10,marginRight: 10}}>
                  <TextInputBorder
                    style={styles.TextInputStyleClass}
                    value={name}
                    onChangeText= {(value)=>{setName(value.replace(" ",""));}}
                    maxLength={10}
                    />
                </View>
            </View>



          <View style={{height: 80,width: 200, marginTop: 10, alignItems: 'center'}}>
            <AnimButton
              color={COLORS.green}
              backColor={COLORS.greenShadow}
              style={styles.buttons}
              disabled={!validate || onCheck}
              onPress={async ()=>{
                                  if(name!=Date.parse(userdata.User.Created_date).toString(36))
                                    checkGift();
                                  else
                                  {
                                    setDialogeMessage("\n کد دعوت خودت رو نمیتونی\n\n  استفاده کنی!\n");
                                    toggleModalSame();
                                  }

                                }}
              >
              <View style={{flexDirection: 'row',margin: 30}}>
                <Icon style={{...styles.texts1,fontSize: 25,marginRight: 10}} name={"send"} size={30} color={COLORS.white} />

                <View style={{width: 70,alignItems:'center',justifyContent: 'center'}}>
                  {onCheck?<ActivityIndicator size="small" color="#ffffff" />:<Text style={styles.texts1}>ارسال</Text>}
                </View>
              </View>
            </AnimButton>
          </View>

          <View style={{flex:1,marginTop: 40}}>
            <Image source={require('../../assets/images/gift.png')}
                   style={{height: 200,resizeMode: "contain"}}/>
          </View>

      </View>
    </>
  );
}


const styles = StyleSheet.create({
  body: {
    flex:1,
    alignItems: 'center',
    backgroundColor: COLORS.bluemed,
  },
  TextInputStyleClass:{
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,
    height: 60,
    fontFamily: "Estedad",
    fontSize: 15,
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF",
  },
  textsitem: {
    fontFamily: "Estedad",
    fontSize: 20,
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
    height: 60,
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

export default GiftScreen;
