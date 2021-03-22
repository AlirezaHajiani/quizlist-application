import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from '../actions/fetch-data/fetch-data.js';
import { fetchDataCancel } from '../actions/fetch-data/fetch-data-cancel.js';

import AnimatedLoader from "react-native-animated-loader";
import YesNoDialoge from "../components/dialoge/YesNoDialoge.js";

export const Loader=(props) => {
  const isLoading = useSelector(state => state.Network.isLoading);
  const error = useSelector(state => state.Network.error);
  const dispatch = useDispatch()

  return(
    <>
    <AnimatedLoader
      visible={isLoading}
      overlayColor="rgba(0,0,0,0.5)"
      source={require("../../dots-load.json")}
      animationStyle={{width: 300,height: 300}}
      speed={1.2}/>

      <YesNoDialoge
        isVisible={error}
        onOK={()=> {dispatch(fetchData());if(props.onOK)props.onOK();}}
        onCancel={()=> {dispatch(fetchDataCancel());if(props.onCancel)props.onCancel();}}
        yesTitle={props.yesTitle?props.yesTitle:"تلاش دوباره"}
        noTitle={props.noTitle?props.noTitle:"انصراف"}
        title={"خطا"}
        message={"عدم ارتباط با سرور"}/>
      </>

    );
  };
