import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet,Image} from 'react-native';
import Dialoge from "./Dialoge.js";
import AnimButton from "../AnimButton.js";
import TextInputBorder from "../TextInputBorder.js";
import config from '../../config/Config';

function HelpDialoge(props) {
  const [isModalVisible, setModalVisible] = useState(props.isVisible);

  function toggleModal(){
      if(props.toggleModal) props.toggleModal()
      if(props.onCancel) props.onCancel()
  }

  function yesAction()
  {
      if(props.toggleModal) props.toggleModal()
      if(props.onOK) props.onOK()
  }
  useEffect(()=>{
      setModalVisible(props.isVisible);
  }, [props.isVisible]);
  return (
    <Dialoge
      isVisible={isModalVisible}
      toggleModal={toggleModal}
      title={props.title}>
        <View style={{height: 350}}>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}}>

            <Text style={{...styles.text,flex:1,textAlign:'center',marginLeft: 20,color: "#00ee00"}}>
                  بردی
            </Text>
            <Image source={require('../../../assets/images/coin.png')} style={{height: 40,width: 40,resizeMode: 'contain',}}/>
            <Text style={{...styles.text,flex:.6,textAlign:'left',marginLeft: 10,color: "#00aa00",}}>
                  +50
            </Text>

          </View>

          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop: 8}}>

            <Text style={{...styles.text,flex:1,textAlign:'center',marginLeft: 20,color: "#00eeee"}}>
                  مساوی
            </Text>
            <Image source={require('../../../assets/images/coin.png')} style={{height: 40,width: 40,resizeMode: 'contain',}}/>
            <Text style={{...styles.text,flex:.6,textAlign:'left',marginLeft: 10,color: "#00aa00",}}>
                  +20
            </Text>

          </View>

          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop: 8}}>

            <Text style={{...styles.text,flex:1,textAlign:'center',marginLeft: 20,color: "#ee5500"}}>
                  باختی
            </Text>
            <Image source={require('../../../assets/images/coin.png')} style={{height: 40,width: 40,resizeMode: 'contain',}}/>
            <Text style={{...styles.text,flex:.6,textAlign:'left',marginLeft: 10,color: "#777777",}}>
                  0
            </Text>

          </View>

          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop: 8}}>

            <Text style={{...styles.text,flex:1,textAlign:'center',marginLeft: 20,color: "#ee5500"}}>
                  وقت تمام
            </Text>
            <Image source={require('../../../assets/images/coin.png')} style={{height: 40,width: 40,resizeMode: 'contain',}}/>
            <Text style={{...styles.text,flex:.6,textAlign:'left',marginLeft: 10,color: "#aa0000",}}>
                  -50
            </Text>

          </View>

          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop: 8}}>

            <Text style={{...styles.text,flex:1,textAlign:'center',marginLeft: 20,color: "#ee1100"}}>
                تسلیم
            </Text>
            <Image source={require('../../../assets/images/coin.png')} style={{height: 40,width: 40,resizeMode: 'contain',}}/>
            <Text style={{...styles.text,flex:.6,textAlign:'left',marginLeft: 10,color: "#aa0000",}}>
                  -50
            </Text>

          </View>

          <Text style={{...styles.text,flex:1,textAlign:'center',marginTop: 20,color: "#777777"}}>
                اگه نوبتت بشه و بعد 24 ساعت بازی نکنی، می بازی
          </Text>
        </View>


        <View style={{flexDirection: 'row', height: 50,justifyContent: 'center'}}>
            <View style={{flex:1}}>
              <AnimButton color="rgba(0, 255, 0, 1)" backColor="rgba(0, 255, 0, 0.4)" onPress={()=>toggleModal()}>
                    <Text style={styles.buttonTitle}>متوجه شدم!</Text>
              </AnimButton>
            </View>

        </View>
    </Dialoge>
  );
};

const styles = StyleSheet.create({
  dialogeTitle: {
    textAlign: 'center',
    fontFamily: "Koodak",
    fontSize: 22,
    color: "#444444",
    paddingBottom: 5,
    marginTop: -5,
    paddingLeft:20,
    paddingRight:20
  },
  buttonTitle: {
    fontFamily: "Koodak",
    fontSize: 20,
    fontWeight: '600',
    color: "#ffffff",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    textShadowColor:'#585858',
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: "Koodak",
    fontSize: 22,
    color: "#444444",

  },
});

export default HelpDialoge;
