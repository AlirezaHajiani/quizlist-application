import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Dialoge from "./Dialoge.js";
import AnimButton from "../AnimButton.js";

function YesNoDialoge(props) {
  const [isModalVisible, setModalVisible] = useState(props.isVisible);

  useEffect(()=>{
      setModalVisible(props.isVisible);
  }, [props.isVisible]);

  function toggleModal(){
      if(props.toggleModal) props.toggleModal()
      if(props.onCancel) props.onCancel()
  }

  function yesAction()
  {
      if(props.toggleModal) props.toggleModal()
      if(props.onOK) props.onOK()
  }

  return (
    <Dialoge
      isVisible={isModalVisible}
      toggleModal={toggleModal}
      title={props.title}>
        <Text style={{...styles.dialogeTitle,fontSize: 20,lineHeight: 35,}}>
              {props.message}
        </Text>
        <View style={{flexDirection: 'row', height: 50,justifyContent: 'center'}}>
            <View style={{flex:1}}>
              <AnimButton color="rgba(0, 255, 0, 1)" backColor="rgba(0, 255, 0, 0.4)" onPress={yesAction}>
                  <Text style={styles.buttonTitle}>{props.yesTitle}</Text>
              </AnimButton>
            </View>
            <View style={{flex:.1}}>
            </View>
            <View style={{flex:1}}>
              <AnimButton color="rgba(255, 0, 0, 1)" backColor="rgba(255, 0, 0, 0.4)" onPress={toggleModal}>
                  <Text style={styles.buttonTitle}>{props.noTitle}</Text>
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
    color: "#777777",
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
});

export default YesNoDialoge;
