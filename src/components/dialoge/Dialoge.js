import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';

function Dialoge(props) {
  function toggleModal(){
    //console.log("Toggle");
      if(props.toggleModal) props.toggleModal()
      if(props.close) props.close()
  }

  return(
    <Modal isVisible={props.isVisible}
           //onBackdropPress={() => toggleModal()}
           onBackButtonPress={() => toggleModal()}
           animationIn="zoomInDown"
           animationOut="zoomOutUp"
           animationInTiming={600}
           animationOutTiming={600}
           backdropTransitionInTiming={600}
           backdropTransitionOutTiming={600}>

        <View style={{ backgroundColor: "#00a4d4",borderRadius: 10, padding:10, margin: 15}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingLeft: 10,paddingTop:5}}>
              <TouchableWithoutFeedback onPress={toggleModal}>
                <Image source={require('../../../assets/images/close.png')}
                       style={{resizeMode: 'stretch',height:20,width:20}}/>
              </TouchableWithoutFeedback>
            </View>
            <View style={{flex:1}}>
              <Text style={{textAlign: 'center', fontFamily: "Koodak", fontSize: 22, color: "#ffffff",paddingBottom: 5, marginTop: -6}}>{props.title}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#FFFFFF",borderRadius: 8,padding: 10}}>
              {props.children}
          </View>
        </View>
    </Modal>
  );
};

export default Dialoge;
