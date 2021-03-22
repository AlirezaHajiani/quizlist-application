import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../../config/colors.js'

function FinishDialoge(props) {
  function toggleModal(){
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

        <View style={{ flex:1,backgroundColor: "#29434f",borderRadius: 10, margin: 0}}>
          <ImageBackground source={(props.owner && props.match.winner==1) ||
                                   (!props.owner && props.match.winner==2)  ?require('../../../assets/images/winbackground.png'):undefined}
                           //source={undefined}
                           style={{flex: 1,resizeMode: "cover",borderRadius: 10}}
                           imageStyle={{ borderRadius: 10}}>
           <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingLeft: 10,paddingTop:5}}>

                <Image source={require('../../../assets/images/close.png')}
                       style={{resizeMode: 'stretch',height:20,width:20,margin: 5}}/>

            </View>

            <View style={{flex:1}}>
              <Text style={{textAlign: 'center', fontFamily: "Koodak", fontSize: 22, color: "#ffffff",paddingBottom: 5, marginTop: 1,marginRight: 30}}>
                {(props.owner && props.match.winner==1) ||
                  (!props.owner && props.match.winner==2)?"بردی":""}
                {(props.owner && props.match.winner==2) ||
                  (!props.owner && props.match.winner==1)?(props.match.flag?"تسلیم": "باختی"):""}
                {(props.match.winner==0)?"مساوی":""}
              </Text>
            </View>
          </View>
          </TouchableWithoutFeedback>
          <View style={{height: 60, flexDirection: 'row',marginTop: 5}}>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Image source={props.avatar1?{uri: "https://www.quizlist.ir/avatars/"+props.avatar1}:require('../../../assets/images/user.png')}
                       style={{flex:.8,resizeMode: 'contain',
                           height: undefined,
                           width: undefined,
                           borderRadius: 200}}/>
                <Text style={styles.username}>{props.owner?props.match.user1.name:props.match.user2.name}</Text>
              </View>
              <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={styles.scoretext}>{props.owner? props.match.score1total:props.match.score2total}</Text>
              </View>
            </View>
            <View style={{flex:.05, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                <Text style={styles.scoretext}>-</Text>
            </View>
            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1,alignItems:'flex-start',justifyContent: 'center'}}>
                <Text style={styles.scoretext}>{props.owner? props.match.score2total:props.match.score1total}</Text>
              </View>
              <View style={{flex:1}}>
                <Image source={props.avatar2?{uri: "https://www.quizlist.ir/avatars/"+props.avatar2}:require('../../../assets/images/user.png')}
                       style={{flex:.8,resizeMode: 'contain',
                           height: undefined,
                           width: undefined,
                           borderRadius: 200}}/>
                <Text style={styles.username}>{props.owner?props.match.user2.name:props.match.user1.name}</Text>
              </View>
            </View>
          </View>

          <View style={{flex:1,backgroundColor: "#FFFFFF",borderRadius: 8,marginTop: 10, marginLeft: 20,marginRight: 20, marginBottom: 20}}>
            <View style={styles.question}>
              <Text style={styles.questiontext}>
                امتیاز ها
              </Text>
            </View>

            <View style={{flex:1,flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: "#AAAAAA"}}>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score1[0]:props.match.score2[0]}
              </Text>
              <View style={{flex:1}}>
                <Text style={{...styles.scorestext,color: COLORS.textblack,fontSize: 16,textAlignVertical: 'bottom'}}>راند 1</Text>
                <Text style={{...styles.scorestext,fontSize: 16, textAlignVertical: 'top'}}>{props.match.questions[0].question}</Text>
              </View>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score2[0]:props.match.score1[0]}
              </Text>
            </View>

            <View style={{flex:1,flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: "#AAAAAA"}}>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score1[1]:props.match.score2[1]}
              </Text>
              <View style={{flex:1}}>
                <Text style={{...styles.scorestext,color: COLORS.textblack,fontSize: 16,textAlignVertical: 'bottom'}}>راند 2</Text>
                <Text style={{...styles.scorestext,fontSize: 16, textAlignVertical: 'top'}}>{props.match.questions[1].question}</Text>
              </View>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score2[1]:props.match.score1[1]}
              </Text>
            </View>

            <View style={{flex:1,flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: "#AAAAAA"}}>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score1[2]:props.match.score2[2]}
              </Text>
              <View style={{flex:1}}>
                <Text style={{...styles.scorestext,color: COLORS.textblack,fontSize: 16,textAlignVertical: 'bottom'}}>راند 3</Text>
                <Text style={{...styles.scorestext,fontSize: 16, textAlignVertical: 'top'}}>{props.match.questions[2].question}</Text>
              </View>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score2[2]:props.match.score1[2]}
              </Text>
            </View>

            <View style={{flex:1,flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: "#AAAAAA"}}>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score1[3]:props.match.score2[3]}
              </Text>
              <View style={{flex:1}}>
                <Text style={{...styles.scorestext,color: COLORS.textblack,fontSize: 16,textAlignVertical: 'bottom'}}>راند 4</Text>
                <Text style={{...styles.scorestext,fontSize: 16, textAlignVertical: 'top'}}>{props.match.questions[3].question}</Text>
              </View>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score2[3]:props.match.score1[3]}
              </Text>
            </View>

            <View style={{flex:1,flexDirection: 'row'}}>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score1[4]:props.match.score2[4]}
              </Text>
              <View style={{flex:1}}>
                <Text style={{...styles.scorestext,color: COLORS.textblack,fontSize: 16,textAlignVertical: 'bottom'}}>راند 5</Text>
                <Text style={{...styles.scorestext,fontSize: 16, textAlignVertical: 'top'}}>{props.match.questions[4].question}</Text>
              </View>
              <Text style={styles.scorestext}>
                {props.owner?props.match.score2[4]:props.match.score1[4]}
              </Text>
            </View>

          </View>
          </ImageBackground>
        </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    flex:1,
    backgroundColor: COLORS.bluemed
  },
  buttons: {
    flex:1,
    marginLeft:5,
    marginRight: 5,
    marginTop: 8,
  },
  username: {
    flex:.5,
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 15,
   fontFamily: "Koodak",
   textShadowColor: COLORS.textShadow,
   textShadowOffset:{width: -1, height: 2},
   textShadowRadius:5,
 },
 scoretext:{
   color: COLORS.text,
   fontSize: 30,
   fontFamily: "Koodak",
   textShadowColor: COLORS.textShadow,
   textShadowOffset:{width: 1, height: 1},
   textShadowRadius:10,
 },
 question: {
   backgroundColor: "#CCCCCC",
   height: 30,
   borderTopLeftRadius: 8,
   borderTopRightRadius: 8,
   alignItems: 'center',

 },
 questiontext: {
   flex:1,
   fontFamily: "Koodak",
   fontSize: 15,
   textAlignVertical: 'center',
   color: "#444444"
 },
 scorestext: {
   flex: 1,
   fontFamily: "Koodak",
   fontSize: 30,
   textAlign: 'center',
   textAlignVertical: 'center',
   color: "#444444",
 },
})
export default FinishDialoge;
