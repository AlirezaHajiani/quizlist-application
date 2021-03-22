import React,{useState,useEffect} from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import AnimButton from "../components/AnimButton.js";
import SlideEntryAd from "./SlideEntryAd.js";
import styles from './styles/SliderEntry.js';
import {COLORS} from '../config/colors.js'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import SuggestionDialog from "../components/dialoge/SuggestionDialog.js";
import Icon from 'react-native-vector-icons/Ionicons';

export default function GameStart(props) {
        const [finish,setFinish] = useState(false);

        const dispatch = useDispatch();
        const navigation = useNavigation();


        function click ()
        {
          if(props.snapToNext)
            props.snapToNext();
        }

        function resync ()
        {
          if(props.resync)
            props.resync();
        }
      // console.log(props.firstTime);
      function buttons()
        {
          // console.log(props.data.question._id+','+props.data.match);
          if(props.data.type==1)
          return(
            <View style={{height: 50}}>
              <AnimButton
                color={COLORS.green}
                backColor={COLORS.greenShadow}
                style={styles1.buttons}
                onPress={() =>{
                                if(props.firstTime) navigation.navigate('GameMainTutorial');
                                else navigation.navigate('GameMain');
                               }}>

                <Text style={styles1.texts1}>بازی کن</Text>
              </AnimButton>
            </View>
          );
          else if(props.data.type==2)
          return(
            <View style={{height: 50,flexDirection: 'row'}}>
              <View style={{flexWrap: 'wrap'}}>
                <AnimButton
                  color={COLORS.whiteDisabled}
                  backColor={COLORS.grey}
                  style={styles1.buttons}
                  onPress={()=>setFinish(true)}>
                  <View style={{justifyContent: 'center'}}>
                    <Icon style={{...styles.texts1,marginLeft: 5, marginRight: 5,color: COLORS.green}} name={"ios-bulb"} size={25} color={COLORS.white} />
                  </View>
                </AnimButton>
              </View>
              <View style={{flex:1}}>
                <AnimButton
                  color={COLORS.whiteDisabled}
                  backColor={COLORS.whiteDisabled}
                  style={styles1.buttons}
                  disabled={true}>

                  <Text style={{...styles1.texts1,color: "#555555"}}>نوبت حریفه</Text>
                </AnimButton>
              </View>
            </View>
          );
          else if(props.data.type==3)
          return(
            <View style={{height: 50,flexDirection:'row'}}>
              <View style={{flexWrap: 'wrap'}}>
                <AnimButton
                  color={COLORS.whiteDisabled}
                  backColor={COLORS.grey}
                  style={styles1.buttons}
                  onPress={()=>setFinish(true)}>
                  <View style={{justifyContent: 'center'}}>
                    <Icon style={{...styles.texts1,marginLeft: 5, marginRight: 5,color: COLORS.green}} name={"ios-bulb"} size={25} color={COLORS.white} />
                  </View>
                </AnimButton>
              </View>
              <View style={{flex:1}}>
                <AnimButton
                  color={COLORS.orange}
                  backColor={COLORS.orangelight}
                  style={styles1.buttons}
                  onPress={() =>{
                                  click();
                                 }}>

                  <Text style={styles1.texts1}>بعدی</Text>
                </AnimButton>
              </View>

            </View>
          );
          else if(props.data.type==4)
          return(
            <View style={{height: 50}}>
              <AnimButton
                color={COLORS.orange}
                backColor={COLORS.orangelight}
                style={styles1.buttons}
                onPress={() =>{
                                resync();
                               }}>

                <Text style={styles1.texts1}>همگام سازی</Text>
              </AnimButton>
            </View>
          );
          else if(props.data.type==5)
          return(
            <View style={{height: 50,alignItems: 'center'}}>
                <Text style={{...styles1.texts1, color: COLORS.green,fontSize: 30}}>تمام شد</Text>
            </View>
          );
        }

        function score1()
        {
          let score1=0;
          props.data.answers1.forEach((item, i) => {
            score1+=item[1];
          });
          return (<Text style={{...styles1.texts,color: COLORS.blue, fontSize: 26}}>{score1}</Text>);
        }

        function score2()
        {
          let score1=0;
          if(props.data.answers2)
          props.data.answers2.forEach((item, i) => {
            score1+=item[1];
          });
          // console.log(props.data.type);
          return (<Text style={{...styles1.texts,color: COLORS.blue, fontSize: 26}}>{props.data.type==3 || props.data.type==5?score1:"-"}</Text>);
        }

        const toggleDialoge = () => {
          setFinish(!finish);
        };

        return (
            <View
              style={{...styles.slideInnerContainer, height: props.height}}>
              <SuggestionDialog isVisible={finish}
                             toggleModal={toggleDialoge}
                             yesTitle={"ثبت"}
                             noTitle={"انصراف"}
                             token={props.data.token}
                             question={props.data.question._id}
                             match={props.data.match}/>
              <View style={styles.answers}>

                {props.data.type!=1?<View style={styles1.question}>
                  <Text style={styles1.questiontext}>
                    {props.data.question.question}
                  </Text>
                </View>:<></>}

                {props.data.type==1?  <View style={{flex:20,alignItems:'center',justifyContent: 'center',margin: 10}}><SlideEntryAd/></View>:<></>}

                <View style={{flex:1,flexDirection: 'row'}}>
                  <View style={{flex:1}}>
                    {props.data.type!=1 ?<FlatList
                      style={{flex:1,margin: 10}}
                      data={props.data && props.data.answers1 || []}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item,index }) => {
                                var ans=item[1]==0?<Text style={[styles1.answerstext2,{textDecorationLine: 'line-through'}]}>{item[0]}</Text>:
                                                    <Text style={styles1.answerstext2}>{item[0]}</Text>;
                                var value;
                                if(item[1]==0)
                                  value=<View style={{...styles1.scoreround,backgroundColor: COLORS.grey}}>
                                          <Text style={{...styles1.answerstext2,color: '#FFFFFF'}}>{item[1]}</Text>
                                        </View>;
                                else if(item[1]==1)
                                  value=<View style={{...styles1.scoreround,backgroundColor: COLORS.green}}>
                                          <Text style={{...styles1.answerstext2,color: '#FFFFFF'}}>+{item[1]}</Text>
                                        </View>;
                                else if(item[1]==2)
                                  value=<View style={{...styles1.scoreround,backgroundColor: COLORS.orange }}>
                                          <Text style={{...styles1.answerstext2,color: '#FFFFFF'}}>+{item[1]}</Text>
                                        </View>;
                                else if(item[1]==3)
                                  value=<View style={{...styles1.scoreround,backgroundColor: COLORS.violet }}>
                                          <Text style={{...styles1.answerstext2,color: '#FFFFFF'}}>+{item[1]}</Text>
                                        </View>;
                                return(
                                <View style={{flexDirection: 'row',marginLeft: 10,marginRight: 10}}>
                                  {ans}
                                  {value}
                                </View>
                                );
                                      }
                                    }
                                />:<></>}
                  </View>
                  <View style={{flex:1}}>
                    {props.data.type==3 || props.data.type==5?<FlatList
                      style={{flex:1,margin: 10}}
                      data={props.data && props.data.answers2 || []}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item,index }) => {
                                  var ans=item[1]==0?<Text style={[styles1.answerstext,{textDecorationLine: 'line-through'}]}>{item[0]}</Text>:
                                                      <Text style={styles1.answerstext}>{item[0]}</Text>;
                                  var value;
                                  if(item[1]==0)
                                    value=<View style={{...styles1.scoreround, backgroundColor: COLORS.grey}}>
                                            <Text style={{...styles1.answerstext,color: '#FFFFFF'}}>{item[1]}</Text>
                                          </View>;
                                  else if(item[1]==1)
                                    value=<View style={{...styles1.scoreround,backgroundColor: COLORS.green}}>
                                            <Text style={{...styles1.answerstext,color: '#FFFFFF'}}>+{item[1]}</Text>
                                          </View>;
                                  else if(item[1]==2)
                                    value=<View style={{...styles1.scoreround,backgroundColor: COLORS.orange }}>
                                            <Text style={{...styles1.answerstext,color: '#FFFFFF'}}>+{item[1]}</Text>
                                          </View>;
                                  else if(item[1]==3)
                                    value=<View style={{...styles1.scoreround,backgroundColor: COLORS.violet}}>
                                            <Text style={{...styles1.answerstext,color: '#FFFFFF'}}>+{item[1]}</Text>
                                          </View>;
                                  return(
                                  <View style={{flexDirection: 'row',marginLeft: 10,marginRight: 10}}>
                                    {value}
                                    {ans}
                                  </View>
                                  );
                                        }
                                      }
                                  />:<></>}
                  </View>
                </View>

                {(props.data.type!=1)?<View style={{...styles1.bottompart,backgroundColor: "#eeeeee"}} >

                  <View style={{flex:1,flexDirection: 'row',justifyContent:'flex-end'}}>
                    {score1()}
                  </View>
                  <View style={{flex:.3,flexDirection: 'row', justifyContent:'center'}}>
                    <Text style={styles1.texts}>جمع</Text>
                  </View>
                  <View style={{flex:1,flexDirection: 'row',justifyContent:'flex-start'}}>
                    {score2()}
                  </View>

                </View>:<></>}
                <View style={styles1.bottompart}>

                </View>
              </View>
              {buttons()}
            </View>
        );
}

const styles1 = StyleSheet.create({
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
  question: {
    backgroundColor: "#CCCCCC",
    height: 30,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',

  },
  bottompart: {
    height: 40,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  questiontext: {
    flex:1,
    fontFamily: "Koodak",
    fontSize: 15,
    textAlignVertical: 'center',
    color: "#444444"
  },
  texts: {
    fontFamily: "Koodak",
    fontSize: 18,
    textAlignVertical: 'center',
    color: "#000000"
  },
  texts1: {
    fontFamily: "Koodak",
    fontSize: 20,
    textAlignVertical: 'center',
    paddingRight: 4,
    color: COLORS.text,
    textShadowColor: COLORS.textShadow,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  answerstext: {
    textAlign: 'right',
    flex:1,
    fontFamily: "Koodak",
    fontSize: 15,
    textAlignVertical: 'center',
    color: "#000000"
  },
  answerstext2: {
    textAlign: 'left',
    flex:1,
    fontFamily: "Koodak",
    fontSize: 15,
    textAlignVertical: 'center',
    color: "#000000"
  },
  scoreround:{
    width: 30,
    height: 28,
    alignItems:'center',
    borderRadius: 15,
  },
})
