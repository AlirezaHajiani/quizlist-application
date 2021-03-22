import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet,Image} from 'react-native';
import Dialoge from "./Dialoge.js";
import AnimButton from "../AnimButton.js";
import TextInputBorder from "../TextInputBorder.js";
import config from '../../config/Config';

function VideoGiftDialoge(props) {
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
        <View style={{alignItems: 'center',backgroundColor: "#00a4d4",margin: -10}}>
        <Image source={require('../../../assets/images/video.png')} style={{height: 180, resizeMode: 'contain',}}/>
        <Text style={styles.dialogeTitle}>
              45 سکه جایزه تماشای ویدئو
        </Text>
        <View style={{flexDirection: 'row', height: 60,justifyContent: 'center'}}>
            <View style={{flex:1}}>
              <AnimButton color="rgba(0, 255, 0, 1)" backColor="rgba(0, 255, 0, 0.4)" onPress={()=>toggleModal()}>
                    <Text style={styles.buttonTitle}>متوجه شدم!</Text>
              </AnimButton>
            </View>

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
    color: "#fff",
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
  TextInputStyleClass:{

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
});

export default VideoGiftDialoge;
