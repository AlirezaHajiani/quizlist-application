import React,{useEffect,useState} from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {COLORS} from '../config/colors.js';

import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { matchSetID} from '../actions/match/match_data_success';
import { useDispatch,useSelector } from 'react-redux';

export default function HomeItem(props) {
  const dispatch = useDispatch();
  const [score1value, setScore1] = useState(0);
  const [score2value, setScore2] = useState(0);
  const match = useSelector(state => state.match);

  useEffect(() => {
    setScore1(props.match.score1total);
    setScore2(props.match.score2total);
  },[props]);

  function round()
  {
    let roundvalue="";
    switch (props.match.round) {
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
  // function score1()
  // {
  //   let user1round=0;
  //   for(let i=0;i<=props.match.round;i++)
  //   {
  //     if(typeof props.match.answer1 !== 'undefined')
  //     if(typeof props.match.answer1[i] !== 'undefined' && typeof props.match.answer2[i]==='undefined')
  //     {
  //       if(props.match.answer1[i].length>0)
  //         user1round+=1;
  //       continue;
  //     }
  //
  //     if(props.match.score1[i]>=props.match.score2[i])
  //     {
  //       user1round+=1;
  //     }
  //   }
  //   return user1round;
  // }

  // function score2()
  // {
  //   let user2round=0;
  //   for(let i=0;i<=props.match.round;i++)
  //   {
  //     if(typeof props.match.answer2 !== 'undefined')
  //     if(typeof props.match.answer2[i] !== 'undefined' && typeof props.match.answer1[i]==='undefined')
  //     {
  //       if(props.match.answer2[i].length>0)
  //         user2round+=1;
  //       continue;
  //     }
  //
  //     if(props.match.score2[i]>=props.match.score1[i])
  //     {
  //       user2round+=1;
  //     }
  //   }
  //   return user2round;
  // }

  function notfinish()
  {
    if(!props.match.finished)
    {
      if(props.userowner)
      {
        if(score1value>score2value)
          return <Text style={{...styles.textsresul}}>تو جلویی</Text>;
        else if(score1value<score2value)
          return <Text style={{...styles.textsresul}}>حریف جلوتره</Text>
      }
      else {
        if(score1value<score2value)
          return <Text style={{...styles.textsresul}}>تو جلویی</Text>;
        else if(score1value>score2value)
          return <Text style={{...styles.textsresul}}>حریف جلوتره</Text>
      }
    }
    else {
      return <></>;
    }
  }

  function finish()
  {
    if(props.match.finished)
    {
      if(props.userowner)
      {
        if(props.match.winner==1)
          // if(props.match.flag)
            return <Text style={{...styles.textsresultFinish,color: COLORS.green}}>بردی</Text>
          // else if(props.match.timeUp)
            // return <Text style={{...styles.textsresultFinish,color: COLORS.green}}>وقت تمام - تو بردی</Text>;
          // else
            // return <Text style={{...styles.textsresultFinish,color: COLORS.green}}>تو بردی</Text>;
        else if(props.match.winner==2)
          // if(props.match.flag)
            // return <Text style={{...styles.textsresultFinish,color: COLORS.red}}>تسلیم</Text>
          // else if(props.match.timeUp)
            // return <Text style={{...styles.textsresultFinish,color: COLORS.red}}>وقت تمام</Text>
          // else
            return <Text style={{...styles.textsresultFinish,color: COLORS.red}}>باختی</Text>
        else
          return <Text style={{...styles.textsresultFinish}}>برابر شد</Text>;
      }
      else {
        if(props.match.winner==2)
          // if(props.match.flag)
          //   return <Text style={{...styles.textsresultFinish,color: COLORS.green}}>تسلیم - تو </Text>
          // else if(props.match.timeUp)
          //   return <Text style={{...styles.textsresultFinish,color: COLORS.green}}>وقت تمام - تو بردی</Text>;
          // else
            return <Text style={{...styles.textsresultFinish,color: COLORS.green}}>بردی</Text>;

        else if(props.match.winner==1)
          // if(props.match.flag)
          //   return <Text style={{...styles.textsresultFinish,color: COLORS.red}}>تسلیم</Text>
          // else if(props.match.timeUp)
          //   return <Text style={{...styles.textsresultFinish,color: COLORS.red}}>وقت تمام</Text>
          // else
            return <Text style={{...styles.textsresultFinish,color: COLORS.red}}>باختی</Text>
        else
          return <Text style={{...styles.textsresultFinish}}>برابر شد</Text>;
      }
    }
    else {
      return <></>;
    }
  }

  function finishType()
  {
    if(props.match.finished)
    {
      if(props.userowner)
      {
        if(props.match.winner==1)
          if(props.match.flag)
            return <Text style={{...styles.textsresul}}>حریف تسلیم شد</Text>
          else if(props.match.timeUp)
            return <Text style={{...styles.textsresul}}>وقت تمام</Text>;
          else
            return <Text style={{...styles.textsresul}}> </Text>;
        else if(props.match.winner==2)
          if(props.match.flag)
            return <Text style={{...styles.textsresul}}>تسلیم شدی</Text>
          else if(props.match.timeUp)
            return <Text style={{...styles.textsresul}}>وقت تمام</Text>
          else
            return <Text style={{...styles.textsresul}}> </Text>
        else
          return <Text style={{...styles.textsresul}}> </Text>;
      }
      else {
        if(props.match.winner==2)
          if(props.match.flag)
            return <Text style={{...styles.textsresul}}>حریف تسلیم شد</Text>
          else if(props.match.timeUp)
            return <Text style={{...styles.textsresul}}>وقت تمام</Text>;
          else
            return <Text style={{...styles.textsresul}}> </Text>;

        else if(props.match.winner==1)
          if(props.match.flag)
            return <Text style={{...styles.textsresul}}>تسلیم</Text>
          else if(props.match.timeUp)
            return <Text style={{...styles.textsresul}}>وقت تمام</Text>
          else
            return <Text style={{...styles.textsresul}}> </Text>
        else
          return <Text style={{...styles.textsresul}}> </Text>;
      }
    }
    else {
      return <></>;
    }
  }

  function onlineState()
  {
    if(!props.userowner)
    {
      if(props.match.user1.online)
        return(<View style={{height: 17,width: 17,position: 'absolute',right: 5,bottom: 5,backgroundColor: "#0f0",alignSelf: 'flex-end',borderRadius: 10,borderColor: "#fff",borderWidth: 2}}/>);
      else
        return(<></>)
    }
    else {
      if(props.match.user2)
      {
        if(props.match.user2.online)
          return(<View style={{height: 17,width: 17,position: 'absolute',right: 5,bottom: 5,backgroundColor: "#0f0",alignSelf: 'flex-end',borderRadius: 10,borderColor: "#fff",borderWidth: 2}}/>);
        else
          return(<></>)
      }
      else
        return(<></>)
    }
  }

  const onPress = async () =>
  {
    // console.log("Press");
    if(match.sync)
    {
      dispatch(matchSetID(props.match._id));
      dispatch(fetchData(fetchType.GetMatch));
    }
    else {
      // console.log(match);
      //console.log(match);
      await dispatch(fetchData(fetchType.UpdateMatch));
      // .then(()=>{
      dispatch(matchSetID(props.match._id));
      dispatch(fetchData(fetchType.GetMatch));
      // })
    }
  }

  return(
    <TouchableWithoutFeedback onPress ={onPress}>

      <View style={{flex:1,marginTop: 3,flexDirection: 'row',justifyContent:'flex-start',backgroundColor:COLORS.white,borderRadius: 15,marginLeft: 10,marginRight: 10, elevation: 5}}>

        <View style={{flexDirection: 'row'}}>

          <Image source={!props.userowner? ( props.match.user1.avatar && props.match.user1.avatar.length>0?{uri: "https://www.quizlist.ir/avatars/"+props.match.user1.avatar}:require('../../assets/images/user.png')):
                                          ( props.match.user2? (props.match.user2.avatar && props.match.user2.avatar.length>0?{uri: "https://www.quizlist.ir/avatars/"+props.match.user2.avatar}:require('../../assets/images/user.png')):require('../../assets/images/user.png'))}
               style={{resizeMode: 'contain',
                   height: 50,
                   width: 50,
                   borderRadius: 200,
                   alignSelf: 'center',
                   margin: 5}}/>
          {onlineState()}

        </View>

        <View style={{flex:.8,alignItems: 'flex-start',marginLeft: 10}}>

          <Text style={styles.textsuser}>{!props.userowner?props.match.user1.name:props.match.user2?props.match.user2.name:"حریف شانسی"}</Text>
          <View style={{flexDirection: 'row'}}>
            {!props.match.finished?<Text style={styles.textsresul}>{round()}: شما {props.userowner?score1value:score2value}-{props.userowner?score2value:score1value} حریف{" "}
            </Text>:
            finishType()
            }


          </View>

        </View>
        {props.match.finished?<View style={{flex: 1,justifyContent: 'center',marginLeft: 40}}>
            {finish()}
        </View>
        :<></>}

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textsuser: {
    fontFamily: "Estedad",
    fontSize: 15,
    textAlignVertical: 'center',
    color: COLORS.textblack,
    padding: 2,
  },
  textsresul: {
    fontFamily: "Estedad",
    fontSize: 12,
    textAlignVertical: 'center',
    color: COLORS.textgrey,
    padding: 2,
  },
  textsresultFinish: {
    fontFamily: "Estedad",
    fontSize: 18,
    textAlignVertical: 'center',
    color: COLORS.textgrey,
    padding: 2,
  },
})
