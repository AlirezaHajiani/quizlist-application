// @flow
import AsyncStorage from '@react-native-community/async-storage';

export const keychainhGetDataService = () => (
    AsyncStorage.getItem('TOKEN')
      .then((token)=>{if(token!==null) return {error:false, token};
                      else return{error:false, token: ""};})
      .catch((err) => {return {error:true, err}})
);

export const keychainhSaveDataService = (token) => (
    AsyncStorage.setItem('TOKEN', token)
      .then(()=>{return {error:false, token}})
      .catch((err) => {return {error:true, err}})
);

export const keychainhGetUserService = () => (
    AsyncStorage.getItem('USER')
      //.then((user)=> {if(user!==null) return JSON.parse(user)})
      .then((user)=>{ if(user!==null) return {error:false, user};
                      else return{error:false, user: ""};})
      .catch((err) => {return {error:true, err}})
);

export const keychainhSaveUserService = (user) => (
    AsyncStorage.setItem('USER', JSON.stringify(user))
      .then(()=>{return {error:false, user}})
      .catch((err) => {return {error:true, err}})
);

export const keychainhRemoveUserService = () => {
    return AsyncStorage.removeItem('USER')
    .then(()=>{return {error:false};})
    .catch((err) => {return {error:true, err}})
}

export const keychainhGetMatchService = () => (
    AsyncStorage.getItem('MATCH')
      //.then((match)=>match.json())
      .then((match)=>{if(match!==null) return {error:false, match};
                      else return{error:false, match: ""};})
      .catch((err) => {return {error:true, err}})
);

export const keychainhSaveMatchService = (match) => (
    AsyncStorage.setItem('MATCH',JSON.stringify(match))
      .then(()=>{return {error:false, match}})
      .catch((err) => {return {error:true, err}})
);

export const keychainhRemoveMatchService = () => {
  // console.log("REmove");
    return AsyncStorage.removeItem('MATCH')
    .then(()=>{return {error:false};})
    .catch((err) => {return {error:true, err}})
}

export const keychainhGetPurchaseService = () => (
    AsyncStorage.getItem('Purchase')
      //.then((purchase)=> purchase.json())
      .then((purchase)=>{if(purchase!==null) return {error:false, purchase};
                      else return{error:false, purchase: ""};})
      .catch((err) => {return {error:true, err}})
);

export const keychainhSavePurchaseService = (purchase) => (
    AsyncStorage.setItem('Purchase', JSON.stringify(purchase))
      .then(()=>{return {error:false, purchase}})
      .catch((err) => {return {error:true, err}})
);

export const keychainhRemovePurchaseService = () => {
    return AsyncStorage.removeItem('Purchase')
    .catch((err) => {return {error:true, err}})
}
