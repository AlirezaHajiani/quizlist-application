import React,{useState,useEffect} from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {COLORS} from '../config/colors.js'
import TapsellPlus from 'react-native-tapsell-plus';
import { ZONE_IDS } from "../config/Tplus.js";

export default function SlideEntryAd(){
  const [ad,setAd]=useState({ ad_id: '',
                              zone_id: '',
                              title: '',
                              description: '',
                              call_to_action_text: '',
                              icon_url: '',
                              portrait_static_image_url: '',
                              landscape_static_image_url: '',
                              error_message: '',});
  const [adClick,setAdClick]=useState(undefined);

  useEffect(()=>{
    TapsellPlus.requestNative(
      ZONE_IDS.NATIVE,
      (adData, onAdClicked) => {
        setAd(adData);
        setAdClick(onAdClicked);
        // console.log('ad is ready');
      },
      error => {
        console.log('ERROR\n' + error);
      },
    );
  },[]);

  const clickFunc = () => {
    TapsellPlus.nativeAdClicked(ZONE_IDS.NATIVE, ad.ad_id);
  };

  return(
    <>
          {ad.landscape_static_image_url!==''?

          <TouchableWithoutFeedback
          onPress={()=>clickFunc()}>
          <Image
          resizeMode="contain"
          style= {{
                    width: '100%',
                    aspectRatio: 1.777777778,
                    marginTop: 6,
                  }}
          source={{
            uri: ad.landscape_static_image_url,
          }}
        />
        </TouchableWithoutFeedback>
        :<></>}
    </>
  );
}
