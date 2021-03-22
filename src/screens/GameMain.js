import React,{useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  FlatList,
  BackHandler,
} from 'react-native';
import {COLORS} from '../config/colors.js';
import config from '../config/Config';
import { useNavigation } from '@react-navigation/native';

import { useDispatch,useSelector } from 'react-redux'
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { matchData } from '../actions/match/match-data';
import { userData } from '../actions/user/user-data';
import { soundPlay , soundPlayMusic, soundStopMusic } from '../actions/sound/sound.js';
import {findIndexInAnswers1,findAnswer,answersFilter} from '../gamescript/checkAnswer.js';

import AnimButton from "../components/AnimButton.js";
import TextInputBorder from "../components/TextInputBorder.js";
import BackgroundTimer from 'react-native-background-timer';
import * as Animatable from 'react-native-animatable';

function GameMain(props) {
  const match = useSelector(state => state.match);
  const user_id  = useSelector(state => state.user.User._id);
  const userdata = useSelector(state => state.user);

  const [matchProto,setMatchProto] = useState({});
  const [userProto,setUserProto] = useState({});

  const [userNumber,setUserNumber] = useState(0);
  const [answer,setAnswer] = useState("");
  const [timeValue,setTimeValue] = useState(1.0);
  const [animList,setAnimList] = useState(-1);
  const [allAnswered,setAllAnswered] = useState(false);
  const [timeEnd,setTimeEnd] = useState(false);
  const [disableAll,setDisableAll] = useState(false);

  const savedCallback = useRef();
  const answerListRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  var time=1.0;
  let bgTimer;

  function checkAnswer1()
  {
    if(answer.length>0)
    {
      let checked = findAnswer(answer,
                   matchProto.questions[matchProto.round].answer1,
                   matchProto.questions[matchProto.round].answer2,
                   matchProto.questions[matchProto.round].answer3);
      let ind = userNumber==1?findIndexInAnswers1(checked[0],matchProto.answer1[matchProto.round]):
                              findIndexInAnswers1(checked[0],matchProto.answer2[matchProto.round]);
      if(ind<0)
      {
        userNumber==1?matchProto.answer1[matchProto.round].push(checked):matchProto.answer2[matchProto.round].push(checked);
        setMatchProto({...matchProto});
        // dispatch(matchData(match.Match));
        if(checked[1]==1)
          dispatch(soundPlay("resultsonepoint"));
        else if(checked[1]==2)
          dispatch(soundPlay("resultstwopoint"));
        else if(checked[1]==3)
          dispatch(soundPlay("resultsthreepoint"));
        else if(checked[1]==0)
          dispatch(soundPlay("answerwrong"));
        // myscrollToIndex(userNumber==0?match.Match.answer1.length:match.Match.answer2.length);
      }
      else
      {
        myscrollToIndex(ind);
        dispatch(soundPlay("answerwrong"));
      }
      setAnimList(ind);
      setAnswer("");
    }
  }

  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

   function randomAnswer(){
      let filter1=answersFilter(userNumber==1?matchProto.answer1[matchProto.round]:matchProto.answer2[matchProto.round],matchProto.questions[matchProto.round].answer1);
      let filter2=answersFilter(userNumber==1?matchProto.answer1[matchProto.round]:matchProto.answer2[matchProto.round],matchProto.questions[matchProto.round].answer2);
      let filter3=answersFilter(userNumber==1?matchProto.answer1[matchProto.round]:matchProto.answer2[matchProto.round],matchProto.questions[matchProto.round].answer3);

      let randType=getRandomInt(1,3);

      if(filter1.length==0 && randType==1)
          randType=2;
      if(filter2.length==0 && randType==2)
          randType=1;
      if(filter3.length==0 && randType==3)
          randType=1;
      let answer="";
      if(filter1.length==0 && filter2.length==0 && filter3.length==0)
      {
        setAllAnswered(true);
      }
      else {
        if(randType==1)
        {
          answer = filter1[getRandomInt(0,filter1.length-1)];
          if(answer !== undefined)
          {
            userNumber==1?matchProto.answer1[matchProto.round].push([answer,1]):matchProto.answer2[matchProto.round].push([answer,1]);
            setMatchProto({...matchProto});
            userProto.coins-=config.JOKER_COIN;
            userProto.coinsAdd-=config.JOKER_COIN;
            setUserProto({...userProto});
            // dispatch(userData(userdata.User));
            // dispatch(matchData(match.Match));
            dispatch(soundPlay("jokeranswer"));
          }
        }
        else if(randType==2)
        {
          answer = filter2[getRandomInt(0,filter2.length-1)];
          if(answer !== undefined){
            userNumber==1?matchProto.answer1[matchProto.round].push([answer,2]):matchProto.answer2[matchProto.round].push([answer,2]);
            setMatchProto({...matchProto});
            userProto.coins-=config.JOKER_COIN;
            userProto.coinsAdd-=config.JOKER_COIN;
            setUserProto({...userProto});
            // dispatch(userData(userdata.User));
            // dispatch(matchData(match.Match));
            dispatch(soundPlay("jokeranswer"));
          }
        }
        else if (randType==3)
        {
          answer = filter3[getRandomInt(0,filter3.length-1)];
          if(answer !== undefined)
          {
          userNumber==1?matchProto.answer1[matchProto.round].push([answer,3]):matchProto.answer2[matchProto.round].push([answer,3]);
          setMatchProto({...matchProto});
          userProto.coins-=config.JOKER_COIN;
          userProto.coinsAdd-=config.JOKER_COIN;
          setUserProto({...userProto});
          // dispatch(userData(userdata.User));
          // dispatch(matchData(match.Match));
          dispatch(soundPlay("jokeranswer"));
          }
        }
      }
   }

   function myscrollToIndex(ind){
     answerListRef.current.scrollToIndex({animated: false,index: ind});
   };

  function setTimer()
  {
    if(!timeEnd)
    {
      if(timeValue>1/config.MAX_TIME)
      {
        // timeValue=timeValue-1/config.MAX_TIME;
        setTimeValue(lastTime=>lastTime-1/config.MAX_TIME);
      }
      else {
        setTimeEnd(true);
        // dispatch(soundPlay("timerend"));
      }
   }
  }

  useEffect(() => {
    const finishGame = async ()=>{
      await dispatch(matchData(matchProto));
      await dispatch(userData(userProto));
      await dispatch(fetchData(fetchType.UpdateUserBeforeMatch));
      navigation.goBack();
    }
    if(timeEnd)
    {
      finishGame();
    }
  },[timeEnd]);

  useEffect(() => {
    savedCallback.current = setTimer;
  });

  const handleValidateClose = () => {
    /* Here is empty */
    return true;
  };

  useEffect(() => {
   BackHandler.addEventListener('hardwareBackPress', handleValidateClose);

   return () => {
     BackHandler.removeEventListener('hardwareBackPress', handleValidateClose);
   };
 });

  useEffect(() => {
    if(user_id==match.Match.user1._id)
    {
      setUserNumber(1);
      if(typeof match.Match.answer1[match.Match.round]==='undefined')
      {
        match.Match.answer1.push([]);
        dispatch(matchData(match.Match));
      }
    }
    else {
      setUserNumber(2);
      if(typeof match.Match.answer2[match.Match.round]==='undefined')
      {
        match.Match.answer2.push([]);
        dispatch(matchData(match.Match));
      }
    }
    setMatchProto(match.Match);
    setUserProto(userdata.User);
    bgTimer=BackgroundTimer.runBackgroundTimer(() => {
      savedCallback.current();
    },
    1000);
    dispatch(soundPlayMusic("ingamemusic"));
    return () => {
      BackgroundTimer.stopBackgroundTimer();
      BackgroundTimer.clearInterval(bgTimer);
      dispatch(soundPlayMusic("music"));
    }
  },[])

    return(
      <>
      <View style={{height: 40,backgroundColor: COLORS.blue, flexDirection: 'row'}}>
        <View style={{width:40,justifyContent: 'flex-end',flexDirection: 'row'}}>
            <Text style={[styles.questiontext,{fontSize: 25,marginRight: 5,marginTop: 3,color: COLORS.text}]}>{(config.MAX_TIME*timeValue).toFixed()}</Text>
        </View>
        <View style={{flex:1,justifyContent: 'flex-end',alignItems: 'center',flexDirection: 'row'}}>
          <View style={{flex:timeValue ,elevation: 8, backgroundColor: `rgb(255,${timeValue*150},${timeValue*150})`,height: 25,borderRadius: 8}}/>
        </View>
        <View style={{width:70,justifyContent: 'flex-end',flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={()=>{
              bgTimer=BackgroundTimer.runBackgroundTimer(() => {
                savedCallback.current();
              },
              10);
              setDisableAll(true);
              // setTimeout(()=>navigation.goBack(),timeValue*1200);
            }}>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../assets/images/back.png')}
                       style={{height: 25,width: 18,marginTop: 10,marginRight: 20}}/>
              </View>
            </TouchableWithoutFeedback>
        </View>
      </View>
        <View style={{flex:1, backgroundColor: COLORS.bluemed}}>
          <View style={styles.answers}>

            <View style={styles.question}>
              <Text style={styles.questiontext}>
                {match.Match.questions[match.Match.round].question}
              </Text>
            </View>

            <View style={{flex:1}}>
              <FlatList
                ref={(ref) => { answerListRef.current = ref; }}
                onContentSizeChange={() => answerListRef.current.scrollToEnd({animated: true})}
                style={{flex:1,margin: 10}}
                data={userNumber==0?[]:(userNumber==1?matchProto.answer1 && matchProto.answer1[matchProto.round] || []:matchProto.answer2 && matchProto.answer2[matchProto.round] || [])}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item,index }) => {
                              var ans=item[1]==0?<Text style={[styles.answerstext,{textDecorationLine: 'line-through'}]}>{item[0]}</Text>:
                                                  <Text style={styles.answerstext}>{item[0]}</Text>;
                              var value;
                              if(item[1]==0)
                                value=<View style={{...styles.scoreround ,backgroundColor: COLORS.grey}}>
                                        <Text style={{...styles.answerstext,color: '#FFFFFF'}}>{item[1]}</Text>
                                      </View>;
                              else if(item[1]==1)
                                value=<View style={{...styles.scoreround , backgroundColor: COLORS.green}}>
                                        <Text style={{...styles.answerstext,color: '#FFFFFF'}}>+{item[1]}</Text>
                                      </View>;
                              else if(item[1]==2)
                                value=<View style={{...styles.scoreround,backgroundColor: COLORS.orange}}>
                                        <Text style={{...styles.answerstext,color: '#FFFFFF'}}>+{item[1]}</Text>
                                      </View>;
                              else if(item[1]==3)
                                value=<View style={{...styles.scoreround ,backgroundColor: COLORS.violet}}>
                                        <Text style={{...styles.answerstext,color: '#FFFFFF'}}>+{item[1]}</Text>
                                      </View>;

                              if(animList==index){
                                // setAnimList(-1);
                                return(
                                <Animatable.View animation="bounceIn"
                                                 style={{flexDirection: 'row',marginLeft: 40,marginRight: 40}}
                                                 onAnimationEnd={()=>setAnimList(-1)}>
                                  {ans}
                                  {value}
                                </Animatable.View>
                                );
                              }
                              else {
                                return(
                                <View style={{flexDirection: 'row',marginLeft: 40,marginRight: 40}}>
                                  {ans}
                                  {value}
                                </View>
                                );
                              }
                            }}
              />
            </View>
          </View>

          <View style={{height: 100}}>

            <View style={styles.textInputContainer}>
                <AnimButton
                  color={COLORS.green}
                  backColor={COLORS.greenShadow}
                  style={styles.buttons}
                  onPress={() =>checkAnswer1()}>

                  <Text style={[styles.questiontext,{marginLeft: 10,marginRight:10,color: COLORS.text}]}>ارسال</Text>
                </AnimButton>
                <TextInputBorder
                  style={styles.TextInputStyleClass}
                  placeholder="جواب ..."
                  onChangeText= {(value)=>setAnswer(value)}
                  value={answer}/>
            </View>
            <View style={styles.textInputContainer}>
              <View style={{flex:.5,flexDirection: 'row',alignItems:'center',justifyContent:'flex-end'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: COLORS.text, fontFamily: "Koodak",fontWeight: '600',fontSize: 18,}}>{userProto.coins && userProto.coins}</Text>

                  <Image source={require('../../assets/images/coin.png')}
                         style={styles.coinimage}/>
                  </View>
              </View>
              <View style={{flex:1,flexDirection: 'row'}}>
                <AnimButton
                  color={COLORS.orange}
                  backColor={COLORS.orangelight}
                  style={{flex:1,marginLeft: 5,marginRight: 5}}
                  disabled={userProto.coins<config.JOKER_COIN && !allAnswered}
                  onPress={() =>{
                                randomAnswer();
                                }}>

                                <View style={{flexDirection: 'row',alignItems:'center',marginTop: 0,marginRight: 2}}>
                                   <Text style={[styles.questiontext,{marginTop: 1, marginLeft: 5,marginRight: 5,color: COLORS.text,textAlign: 'center'}]}>جوکر</Text>
                                   <Text style={[styles.questiontext,{flex:.4,marginTop: 2, marginLeft: 0,marginRight: 0,color: COLORS.text}]}>{config.JOKER_COIN}</Text>
                                   <Image source={require('../../assets/images/coin.png')}
                                          style={styles.coinimage}/>
                                </View>
                </AnimButton>
              </View>
              <View style={{flex:1,flexDirection: 'row'}}>
                <AnimButton
                  color={COLORS.violet}
                  backColor={COLORS.violetlight}
                  style={{flex:1,marginLeft: 5,marginRight: 5}}
                  disabled={userProto.coins<config.TIME_COIN}
                  onPress={() =>{
                                  // time=1;
                                  userProto.coins-=config.TIME_COIN;
                                  userProto.coinsAdd-=config.TIME_COIN;
                                  setUserProto({...userProto});

                                  if((timeValue+15/config.MAX_TIME)<1.0)
                                    setTimeValue(lastTime=>lastTime+15/config.MAX_TIME);
                                  else
                                    setTimeValue(1.0);
                                   // dispatch(userData(userdata.User));
                                   dispatch(soundPlay("jokertime"));
                                }}>

                                <View style={{flexDirection: 'row',alignItems:'center',marginTop: 0,marginRight: 2}}>
                                   <Text style={[styles.questiontext,{marginTop: 1, marginLeft: 5,marginRight: 5,color: COLORS.text,textAlign: 'center'}]}>زمان</Text>
                                   <Text style={[styles.questiontext,{flex:.4,marginTop: 2, marginLeft: 0,marginRight: 0,color: COLORS.text}]}>{config.TIME_COIN}</Text>
                                   <Image source={require('../../assets/images/coin.png')}
                                          style={styles.coinimage}/>
                                </View>
                </AnimButton>
              </View>

            </View>
            {timeEnd||disableAll?<View style={{flex:1, position: 'absolute',top:0,left:0,bottom: 0,right: 0,backgroundColor: COLORS.disableover}}>
            </View>:<></>}
          </View>

        </View>
      </>
    );
}

const styles = StyleSheet.create({
    answers: {
        flex:1,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        backgroundColor: "#FFFFFF",
        shadowColor: "#EEEEEE",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: 8,
        elevation: 5
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
      fontSize: 18,
      textAlignVertical: 'center',
      color: "#444444"
    },
    textInputContainer: {
      height: 45,
      flexDirection:'row',
      marginTop: 2,
      marginBottom: 2,
      marginLeft: 20,
      marginRight: 20,
    },
    TextInputStyleClass:{
      flex:1,
      paddingHorizontal: 15,
      paddingVertical: 3,
      fontFamily: "Koodak",
      fontSize: 20,
      fontWeight: '600',
      textAlign:'right',
      borderWidth: 2,
      borderRadius: 10 ,
      backgroundColor : "#FFFFFF",
    },
    buttons: {
      marginLeft:0,
      marginRight: 5,
      marginTop: 0,
    },
    answerstext: {
      textAlign: 'left',
      flex:1,
      fontFamily: "Koodak",
      fontSize: 18,
      textAlignVertical: 'center',
      color: "#000000"
    },
    coinimage:{
      resizeMode: 'stretch',
      height: 20,
      width: 20,
      marginLeft: 5,
      marginRight: 2,
      marginTop:4,
    },
    scoreround:{
      width: 30,
      height: 28,
      alignItems:'center',
      borderRadius: 15,
    },
});
export default GameMain;
