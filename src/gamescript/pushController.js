import React, {useState, useEffect, useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { userPushId } from '../actions/user/user_data_success';
import { fetchData, fetchType } from '../actions/fetch-data/fetch-data.js';

// import {useNavigationState} from '@react-navigation/native';
import PushPole from 'pushpole-react-native';

function PushController(props) {
  const push = useSelector(state => state.push);
  const dispatch = useDispatch();
  const savedCallback = useRef();
  // const state = useNavigationState(state => state);
  // const route = useRoute();

  function notListener()
  {
      // console.log(push);
      if(push.screen==1)
      {
        dispatch(fetchData(fetchType.UpdateMatch));
      }
      if(push.screen==2)
      {
        dispatch(fetchData(fetchType.GetAllMatches));
      }
  }

  useEffect(() => {
    savedCallback.current = notListener;
  });

  useEffect(() => {
      PushPole.getId((pushpoleId) => {
          dispatch(userPushId(pushpoleId));
      });
      PushPole.addEventListener(PushPole.EVENTS.RECEIVED, (notification) => {
            // Notification was received
            savedCallback.current();
       });
  },[]);

  return(
    <></>
  );
}

export default PushController;
