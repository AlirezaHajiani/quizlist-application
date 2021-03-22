import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet,ActivityIndicator} from 'react-native';
import Dialoge from "./Dialoge.js";
import AnimButton from "../AnimButton.js";
import TextInputBorder from "../TextInputBorder.js";
import config from '../../config/Config';

function YesNoDialoge(props) {
  const [isModalVisible, setModalVisible] = useState(props.isVisible);
  const [onCheck,setOnCheck]=useState(false);
  const [answer,setAnswer]=useState("");

  const sendSuggestion = async () => {
    setOnCheck(true);
    await fetch(config.API_URL[3]+"suggestion/"+props.match+'/'+props.question+'/'+answer, {
       method: 'POST',
       headers: {
         "Content-Type"  : "application/json",
         "Authorization" : "Bearer "+props.token
       },
    })
    .then((response) => {
                          console.log(response);
                          if(response.status==200)
                          {
                              toggleModal();
                          }
                          else
                            setinvalidData(true);throw new Error("HTTP status " + response.status);
                          })
    .catch((error) => {
      setOnCheck(false);
       // console.error(error);
    });
  };

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
        <Text style={styles.dialogeTitle}>
              پاسخ پیشنهادی:
        </Text>
        <TextInputBorder
          autofocus={true}
          style={styles.TextInputStyleClass}
          value={answer}
          onChangeText= {(value)=>{setAnswer(value);}}
          maxLength={30}
          />
        <View style={{flexDirection: 'row', height: 50,justifyContent: 'center'}}>
            <View style={{flex:1}}>
              <AnimButton color="rgba(0, 255, 0, 1)" backColor="rgba(0, 255, 0, 0.4)" onPress={()=>sendSuggestion()} disabled={answer.length==0}>
                  {onCheck?
                    <ActivityIndicator size="small" color="#ffffff" />
                    :<Text style={styles.buttonTitle}>{props.yesTitle}</Text>}

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

export default YesNoDialoge;
