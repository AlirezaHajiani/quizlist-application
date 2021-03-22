import React,{useState,useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {COLORS} from '../config/colors.js'
import AnimButton from "./AnimButton.js";
import Icon from 'react-native-vector-icons/Ionicons';
import HelpDialoge from './dialoge/HelpDialoge.js';
import YesNoDialoge from "../components/dialoge/YesNoDialoge.js";
import OKDialoge from "../components/dialoge/OKDialoge.js";
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { useDispatch } from 'react-redux'


function Header(props) {
  const [dialogeShow,setDialogeShow] = useState(false);
  const [dialogeFlagShow,setDialogeFlagShow] = useState(false);
  const [dialogeCoinShow,setDialogeCoinShow] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function toggleModal(){
      setDialogeShow(!dialogeShow);
  }

  function toggleModalFlag(){
      setDialogeFlagShow(!dialogeFlagShow);
  }

  function toggleModalCoin(){
      setDialogeCoinShow(!dialogeCoinShow);
  }

  function round()
  {
    let roundvalue="";
    switch (props.round) {
      case 0:
        roundvalue = "راند اول";
        break;
      case 1:
        roundvalue = "راند دوم";
        break;
      case 2:
        roundvalue = "راند سوم";
        break;
      case 3:
        roundvalue = "راند چهارم";
        break;
      case 4:
        roundvalue = "راند پنجم";
        break;
    }
    return roundvalue ;
  }

  return(
    <View style={{height: 40,backgroundColor: COLORS.blue, flexDirection: 'row'}}>
      <HelpDialoge title={"قوانین بازی"} isVisible={dialogeShow} toggleModal={toggleModal}/>
      <YesNoDialoge
        isVisible={dialogeFlagShow}
        toggleModal={toggleModalFlag}
        onOK={()=> {dispatch(fetchData(fetchType.FlagMatch))}}
        // onCancel={()=> {dispatch(fetchDataCancel());if(props.onCancel)props.onCancel();}}
        yesTitle={"تسلیم!"}
        noTitle={"انصراف"}
        title={""}
        message={"واقعا میخوای تسلیم بشی؟!"}/>
        <OKDialoge
          isVisible={dialogeCoinShow}
          toggleModal={toggleModalCoin}
          // onOK={()=> {dispatch(fetchData());if(props.onOK)props.onOK();}}
          // onCancel={()=> {dispatch(fetchDataCancel());if(props.onCancel)props.onCancel();}}
          yesTitle={"خب"}
          title={""}
          message={"برای تسلیم شدن حداقل باید 90 سکه داشته باشی"}/>

      <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>
        <View style={{marginLeft: 20,height: 35,marginTop: 2, flexDirection: 'row'}}>
          <AnimButton color={COLORS.bluemed}
          backColor={COLORS.blue}
          onPress={()=>toggleModal()}>
              <Icon name={"ios-help-circle"} size={22} style={{marginLeft: 5, marginRight: 5}} color={COLORS.white} />
          </AnimButton>

          {!props.finished && props.hasUser2?
          <AnimButton color={COLORS.bluemed}
          style={{marginLeft: 10}}
          backColor={COLORS.blue}
          onPress={()=>{
                        if(props.coins>90)
                          toggleModalFlag();
                        else {
                          toggleModalCoin();
                        }
                      }}>
              <Icon name={"md-flag"} size={22} style={{marginLeft: 5, marginRight: 5}} color={COLORS.white} />
          </AnimButton>:<></>}
        </View>
      </View>
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
        <Text style={styles.texts1}>{round()}</Text>
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
  );
};

const styles = StyleSheet.create({
  texts1: {
    fontFamily: "Koodak",
    fontSize: 24,
    textAlignVertical: 'center',
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
});

export default Header;
