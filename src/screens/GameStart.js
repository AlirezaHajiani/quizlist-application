import React,{useState, useEffect, createRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import SliderEntry from './SlideEntry.js';
import { sliderWidth, itemWidth } from './styles/SliderEntry.js';

import {COLORS} from '../config/colors.js'

import { useDispatch,useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';
import { matchDataSuccess } from '../actions/match/match_data_success';
import { userDataSuccess } from '../actions/user/user_data_success';
import { pushSetScreen } from '../actions/push/push_data';
import { profileId } from '../actions/profile/profile_data';
import { soundPlay , soundPlayMusic, soundStopMusic } from '../actions/sound/sound.js';

import AnimButton from "../components/AnimButton.js";
import Header from "../components/HeaderGameMenu.js";
import * as Animatable from 'react-native-animatable';
import FinishDialoge from "../components/dialoge/FinishDialoge.js";

function GameStart(props) {
    const match = useSelector(state => state.match);
    const user_id  = useSelector(state => state.user.User._id);
    const userdata = useSelector(state => state.user);
    const token = useSelector(state => state.keychain.token);

    const [screenHeight, setScreenHeight] = useState(0);

    const [userName2,setUserName2] = useState("");
    const [hasUser2,setHasUser2] = useState(false);
    const [profileIdvalue,setProfileId] = useState("");
    const [userName1,setUserName1] = useState("");
    const [userType,setUserType] = useState("");
    const [slideItems,setSlideItems] = useState([]);
    const [round,setRound] = useState(0);
    const [finish,setFinish] = useState(false);
    const [avatar1,setAvatar1] = useState();
    const [avatar2,setAvatar2] = useState();
    const [user2Online,setUser2Online] = useState(false);
    const [imageTime,setImageTime] = useState(new Date());
    const answerCarousel = createRef();

  const dispatch = useDispatch();

  function snapToNext()
  {
      // console.log("Next ");
      // console.log(answerCarousel.current.currentIndex);
      answerCarousel.current._onLayout();
      // answerCarousel.current.snapToItem(0);
      answerCarousel.current.snapToPrev();
      setRound(match.Match.round-answerCarousel.current.currentIndex);
  }

  // console.log(userdata);
  function _renderItem ({item, index}) {
      return (
          <SliderEntry
            data={item}
            height={screenHeight}
            snapToNext={snapToNext}
            firstTime={userdata.User.firstTime}
            resync={()=>dispatch(fetchData(fetchType.UpdateMatch))}
          />
      );
  }

  function isEven(n) {
     return n % 2 == 0;
  }

  function createSlideItems()
  {
      let user_opponent = user_id==match.Match.user1._id? 'user2':'user1';
      let user = user_id==match.Match.user1._id? 'user1':'user2';
      setUserType(user);
      let slideItemsTemp=[];
      let turn = isEven(match.Match.round);

      // Finished Rounds
      // Types: 1: User Round, 2: Opponent Roud, 3: Finished Round, 4: unsync, 5: finished Game
      for(let i=0;i<match.Match.round;i++)
      {
        slideItemsTemp.push([]);
        slideItemsTemp[i].question=match.Match.questions[i];
        slideItemsTemp[i].type=3;
        slideItemsTemp[i].match=match.Id;
        slideItemsTemp[i].token=token;
        if(user=='user1')
        {
          slideItemsTemp[i].relevation=match.Match.relevation1[i];
          slideItemsTemp[i].answers1=match.Match.answer1[i];
          slideItemsTemp[i].answers2=match.Match.answer2[i];
        }
        else
        {
          slideItemsTemp[i].relevation=match.Match.relevation2[i];
          slideItemsTemp[i].answers2=match.Match.answer1[i];
          slideItemsTemp[i].answers1=match.Match.answer2[i];
        }
      }


      // Current Round Set
      slideItemsTemp.push([]);
      slideItemsTemp[match.Match.round].question=match.Match.questions[match.Match.round];
      slideItemsTemp[match.Match.round].match=match.Id;
      slideItemsTemp[match.Match.round].token=token;
      if(user=='user1')
      {
        slideItemsTemp[match.Match.round].relevation=match.Match.relevation1[match.Match.round];

        typeof match.Match.answer1[match.Match.round]==='undefined'?slideItemsTemp[match.Match.round].answers1=[]:
        slideItemsTemp[match.Match.round].answers1=match.Match.answer1[match.Match.round];

        typeof match.Match.answer2[match.Match.round]==='undefined'?slideItemsTemp[match.Match.round].answers2=[]:
        slideItemsTemp[match.Match.round].answers2=match.Match.answer2[match.Match.round];

        if(match.Match.turn!=2)
        {
          slideItemsTemp[match.Match.round].type=1;
        }
        else {
          // if(typeof match.Match.answer2[match.Match.round]==='undefined')
            slideItemsTemp[match.Match.round].type=2;
        }
        // match.Match.turn?slideItemsTemp[match.Match.round].type=1:slideItemsTemp[match.Match.round].type=2;
        // Round 1 set
        // if(match.Match.round==0)
        //   typeof match.Match.answer1[0]==='undefined'?slideItemsTemp[match.Match.round].type=1:
        //   slideItemsTemp[match.Match.round].type=2;
      }
      if(user=='user2')
      {
        slideItemsTemp[match.Match.round].relevation=match.Match.relevation2[match.Match.round];
        typeof match.Match.answer2[match.Match.round]==='undefined'?slideItemsTemp[match.Match.round].answers1=[]:
        slideItemsTemp[match.Match.round].answers1=match.Match.answer2[match.Match.round];

        typeof match.Match.answer1[match.Match.round]==='undefined'?slideItemsTemp[match.Match.round].answers2=[]:
        slideItemsTemp[match.Match.round].answers2=match.Match.answer1[match.Match.round];

        if(match.Match.turn!=1)
        {
          slideItemsTemp[match.Match.round].type=1;
        }
        else {
          // if(typeof match.Match.answer1[match.Match.round]==='undefined')
            slideItemsTemp[match.Match.round].type=2;
        }
        // match.Match.turn?slideItemsTemp[match.Match.round].type=1:slideItemsTemp[match.Match.round].type=2;
        // Round 1 set
        // if(match.Match.round==0)
        //   typeof match.Match.answer2[0]==='undefined'?slideItemsTemp[match.Match.round].type=1:
        //   slideItemsTemp[match.Match.round].type=2;
      }

            // console.log(user=='user2');

      if(!match.sync)
        slideItemsTemp[match.Match.round].type=4;
      if(match.Match.finished)
        {
          slideItemsTemp[match.Match.round].type=5;
          setTimeout(()=>{
                          setFinish(true);
                          if((user=='user1' && match.Match.winner==1) || (user=='user2' && match.Match.winner==2))
                            dispatch(soundPlay("resultsvictory"));
                          },1500);
        }

      // slideItemsTemp.push([]);
      setSlideItems([...slideItemsTemp]);
  }

  useFocusEffect(
    React.useCallback(() => {
      // console.log('focus');
      dispatch(pushSetScreen(1));
      return () => {dispatch(pushSetScreen(0));}
    }, [])
  );

  useEffect(() => {
    let user_opponent = user_id==match.Match.user1._id? 'user2':'user1';
    let user = user_id==match.Match.user1._id? 'user1':'user2';
    setUserName1(match.Match[user].name);
    if(match.Match[user].avatar && match.Match[user].avatar.length>0)
      setAvatar1(match.Match[user].avatar);
    setUserName2(typeof match.Match[user_opponent]!=='undefined'?
                        match.Match[user_opponent].name:'حریف شانسی');
    setHasUser2(typeof match.Match[user_opponent]!=='undefined');
    if(typeof match.Match[user_opponent]!=='undefined')
    {
      setProfileId(match.Match[user_opponent]._id);
      if(match.Match[user_opponent].avatar && match.Match[user_opponent].avatar.length>0)
        setAvatar2(match.Match[user_opponent].avatar);
      setUser2Online(match.Match[user_opponent].online)
    }

    createSlideItems();

    // let lastIndex=answerCarousel.current.currentIndex;
    // console.log(lastIndex);
    // answerCarousel.current.triggerRenderingHack ();
    //
    // answerCarousel.current.snapToItem(lastIndex+1,false);
    // setRound(match.Match.round-answerCarousel.current.currentIndex);

      // dispatch(fetchData(fetchType.GetUser))
  },[match]);

  useEffect(() => {
    setRound(match.Match.round);
  },[]);

  const toggleDialoge = () => {
    setFinish(!finish);
  };

  return(
    <>
    <Header round={round} finished={match.Match.finished} coins={userdata.User.coins} hasUser2={hasUser2}/>
    <View style={styles.body}>
      {match.Match.finished?<FinishDialoge isVisible={finish}
                     toggleModal={toggleDialoge}
                     owner={userType=='user1'}
                     match={match.Match}
                     avatar1={avatar1}
                     avatar2={avatar2}/>:<></>}

      <View style={{height: 70, flexDirection: 'row',marginTop: 5}}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{flex:1}}>
            <Image source={avatar1?{uri: "https://www.quizlist.ir/avatars/"+avatar1}:require('../../assets/images/user.png')}
                   style={{flex:.8,resizeMode: 'contain',
                       height: undefined,
                       width: undefined,
                       borderRadius: 200,}}/>
            <Text style={styles.username}>{userName1}</Text>
          </View>
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={styles.scoretext}>{userType=='user1'? match.Match.score1total:match.Match.score2total}</Text>
          </View>
        </View>
        <View style={{flex:.05, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
            <Text style={styles.scoretext}>-</Text>
        </View>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{flex:1,alignItems:'flex-start',justifyContent: 'center'}}>
            <Text style={styles.scoretext}>{userType=='user1'?match.Match.score2total:match.Match.score1total}</Text>
          </View>
          <TouchableWithoutFeedback onPress={()=> {if(profileIdvalue!=''){dispatch(profileId(profileIdvalue));dispatch(fetchData(fetchType.UserProfile));}}}>
            <View style={{flex:1}}>
              <View style={{flex:1}}>
                <Image source={avatar2?{uri: "https://www.quizlist.ir/avatars/"+avatar2}:require('../../assets/images/user.png')}
                       style={{flex:1,resizeMode: 'contain',
                           height: undefined,
                           width: undefined,
                           borderRadius: 200,}}/>
                 {user2Online? <View style={{height: 15,width: 15,position: 'absolute',bottom: 0,alignSelf: 'center',backgroundColor: "#0f0",borderRadius: 10,borderColor: "#fff",borderWidth: 2}}/>:<></>}
              </View>
            <Text style={styles.username}>{userName2}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Animatable.View animation="fadeIn" delay={500} style={{flex:1}}
              onLayout={(event) => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                  setScreenHeight(height);
                  //console.log(height);
                  }}>
        <Carousel
          ref={(c) => {answerCarousel.current  = c;}}
          shouldOptimizeUpdates={false}
          useScrollView={true}
          data={slideItems || []}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={0}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loopClonesPerSide={2}
          onSnapToItem= {(slideIndex)=>setRound(match.Match.round-slideIndex)}
          //onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
      </Animatable.View>
    </View>
    </>
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
    flex:.4,
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 15,
   fontFamily: "Koodak",
 },
 scoretext:{
   color: COLORS.text,
   fontSize: 30,
   fontFamily: "Koodak",
 },
})
export default GameStart;
