import React,{useEffect,useState} from 'react';
import { View, Text, Image,ActivityIndicator, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {COLORS} from '../config/colors.js';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialoge from "../components/dialoge/Dialoge.js";
import AnimButton from "../components/AnimButton.js";
import config from '../config/Config';

export default function ProfileImageUploader(props) {
    const [dialoge,setDialoge]=useState(false);
    const [userImage,setUserImage]=useState();
    const [onCheck,setOnCheck]=useState(false);
    const [imageTime,setImageTime] = useState(new Date());
    const [hasImage,setHasImage] = useState(props.hasImage);
    const options = {
      title: 'Select Avatar',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const sendAvatar = async (imageData) => {
      setOnCheck(true);
      await fetch(config.API_URL[0]+"avatar/", {
         method: 'POST',
         headers: {
           "Content-Type"  : "application/json",
           "Authorization" : "Bearer "+props.token
         },
         body: JSON.stringify({image: imageData})
      })
      .then((response) => {
        // console.log(response);
        setOnCheck(false);
        setImageTime(new Date());
      })
      .catch((error) => {
        setOnCheck(false);
         console.error(error);
      });
    };

    const removeAvatar = async () => {
      setOnCheck(true);
      await fetch(config.API_URL[0]+"avatarRM/", {
         method: 'POST',
         headers: {
           "Content-Type"  : "application/json",
           "Authorization" : "Bearer "+props.token
         },
      })
      .then((response) => {
        // console.log(response);
        setOnCheck(false);
        setImageTime(new Date());
      })
      .catch((error) => {
        setOnCheck(false);
         console.error(error);
      });
    };

    useEffect(()=>{
      // console.log(userImage);
      if(userImage)
        sendAvatar(userImage.data);
    },[userImage]);

    function pickFromCamera()
    {
        ImagePicker.openCamera({
          width: 200,
          height: 200,
          cropping: true,
          includeBase64: true,
        }).then(image => {
          setUserImage(image);
          toggleModal();
        })
        .catch((e)=>console.log(""));
    }

    function pickFromGallery()
    {
        ImagePicker.openPicker({
          width: 200,
          height: 200,
          cropping: true,
          includeBase64: true,
        }).then(image => {
          setUserImage(image);
          toggleModal();
        })
        .catch((e)=>console.log(""));
    }

    function removeImage()
    {
      setHasImage(false);
      setUserImage();
      toggleModal();
      removeAvatar();
    }

    function toggleModal()
    {
      setDialoge(!dialoge);
    }

    return(
      <>
         <Dialoge
          isVisible={dialoge}
          toggleModal={toggleModal}
          title={props.title}>
              <View style={{justifyContent: 'center'}}>
                  <View style={{height: 50,marginTop: 10}}>
                  <AnimButton color={COLORS.green} backColor={COLORS.greenShadow} onPress={pickFromCamera}>
                    <Text style={styles.buttonTitle}>عکس با دوربین</Text>
                  </AnimButton>
                </View>
                <View style={{height: 50,marginTop: 10}}>
                <AnimButton color={COLORS.green} backColor={COLORS.greenShadow} onPress={pickFromGallery}>
                  <Text style={styles.buttonTitle}>انتخاب از گالری</Text>
                </AnimButton>
              </View>
              {hasImage || userImage?
                <View style={{height: 50,marginTop: 10}}>
                <AnimButton color={COLORS.green} backColor={COLORS.greenShadow} onPress={removeImage}>
                  <Text style={styles.buttonTitle}>حذف تصویر</Text>
                </AnimButton>
              </View>
              :<></>}
              <View style={{height: 50,marginTop: 10}}>
              <AnimButton color="rgba(255, 0, 0, 1)" backColor="rgba(255, 0, 0, 0.4)" onPress={toggleModal}>
                <Text style={styles.buttonTitle}>انصراف</Text>
              </AnimButton>
            </View>
              </View>
          </Dialoge>

        <TouchableWithoutFeedback onPress={()=>{toggleModal();}}>
          <View style={{flex:1,justifyContent: 'center',flexDirection: 'row'}}>
              <Image source={userImage?
                                      {uri: userImage.path}:
                                      (hasImage?{uri: "https://www.quizlist.ir/avatars/"+props.userAvatar}:require('../../assets/images/user.png'))}
               style={{flex:1,resizeMode: 'contain',
                   height: undefined,
                   width: undefined,
                   borderRadius: 200,
                   }}/>
                {onCheck?<View style={{position: 'absolute',alignSelf: 'center'}}>
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>:<></>}
              <View style={{ position: 'absolute',bottom: 0}}>
                 <View style={{padding: 6,marginRight: 70,backgroundColor: COLORS.green,borderRadius: 50,alignItems: 'center',justifyContent: 'center'}}>
                    <Icon style={{...styles.texts1,fontSize: 22}} name={"md-camera"} size={40} color={COLORS.white} />
                 </View>
              </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    )

};


const styles = StyleSheet.create({
  texts1: {
    fontFamily: "Koodak",
    fontSize: 20,
    color: COLORS.text,
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
});
