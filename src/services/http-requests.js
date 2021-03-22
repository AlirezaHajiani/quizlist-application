// @flow

import config from '../config/Config';
import CryptoJS from "react-native-crypto-js";
export const fetchTypes=Object.freeze({"CreateUser":0 , "GetUser":1 , "UpdateUser" : 2,
                                       "CreateMatch":3, "GetMatch":4, "UpdateMatch": 5,
                                       "GetAllMatches": 6, "UserProfile": 7, "CreateMatchProfile": 8,
                                       "GetLeaderTotal": 9, "GetLeaderWeekly": 10, "GetLeaderUser": 11,
                                       "SearchUsers": 12, "AddShopCoin": 13, "AddAdCoin": 14,
                                       "UpdateUserBeforeMatch" : 15, "FlagMatch": 16});

export const fetchDataService = (Type,Token,State) => {
  // console.log(Type);
  if(Type==fetchTypes.CreateUser)
  {
      var fetchFunc= fetch(config.API_URL[Type] ,{
             method: 'POST',
             headers: {
               "Authorization" : "Bearer "+Token,
               "Content-Type"  : "application/json"
             },
             body: JSON.stringify({pushId: State.user.pushId, name: State.user.name})
          })
          .then((res) => res.json());
  }
  else if (Type==fetchTypes.GetUser) {
    var fetchFunc= fetch(config.API_URL[Type]+`?bundle=${config.BUNDLE}`,{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token,
           },
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.UpdateUser || Type==fetchTypes.UpdateUserBeforeMatch) {
    var fetchFunc= fetch(config.API_URL[fetchTypes.UpdateUser],{
           method: 'PUT',
           headers: {
             "Authorization" : "Bearer "+Token,
             "Content-Type"  : "application/json"
           },
           body: JSON.stringify({...State.user.User,...{pushId: State.user.pushId},...{purchase: State.user.purchase}})
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.CreateMatch) {
    var fetchFunc= fetch(config.API_URL[Type],{
           method: 'POST',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.text())
        .then((res)=>decryptObject(res));
  }
  else if (Type==fetchTypes.GetMatch) {
    var fetchFunc= fetch(config.API_URL[Type]+'/'+State.match.Id,{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.text())
        .then((res)=>decryptObject(res));
          // Decrypt
          // console.log();
          // let bytes  = CryptoJS.AES.decrypt(res.blob(), 'jWnZr4u7x!A%D*G-');
          // console.log(bytes);
          // let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          // return decryptedData;
  }
  else if (Type==fetchTypes.UpdateMatch) {
    let data = {data: encryptObject(State.match.Match)};
    // console.log(data);
    var fetchFunc= fetch(config.API_URL[Type]+'/'+State.match.Match._id,{
           method: 'PUT',
           headers: {
             "Authorization" : "Bearer "+Token,
             "Content-Type"  : "application/json",
           },
           body: JSON.stringify(data),
           //JSON.stringify(State.match.Match)
        })
        .then((res) => res.text())
        .then((res)=>{return decryptObject(res);});
  }
  else if (Type==fetchTypes.FlagMatch) {
    // console.log(config.API_URL[Type]+'/'+State.match.Id);
    var fetchFunc= fetch(config.API_URL[Type]+'/'+State.match.Id,{
           method: 'POST',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.text())
        .then((res)=>decryptObject(res));
          // Decrypt
          // console.log();
          // let bytes  = CryptoJS.AES.decrypt(res.blob(), 'jWnZr4u7x!A%D*G-');
          // console.log(bytes);
          // let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          // return decryptedData;
  }
  else if (Type==fetchTypes.GetAllMatches) {
    var fetchFunc= fetch(config.API_URL[Type],{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token,
           },
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.UserProfile) {
    var fetchFunc= fetch(config.API_URL[Type]+'/'+State.profile.id,{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token,
           },
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.CreateMatchProfile) {
    var fetchFunc= fetch(config.API_URL[Type]+'/'+State.profile.id,{
           method: 'POST',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.text())
        .then((res)=>{return decryptObject(res);});
  }
  else if (Type==fetchTypes.GetLeaderTotal) {
    var fetchFunc= fetch(config.API_URL[Type],{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.GetLeaderWeekly) {
    var fetchFunc= fetch(config.API_URL[Type],{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.GetLeaderUser) {
    var fetchFunc= fetch(config.API_URL[Type],{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.SearchUsers) {
    var fetchFunc= fetch(config.API_URL[Type]+State.search.name,{
           method: 'GET',
           headers: {
             "Authorization" : "Bearer "+Token
           }
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.AddShopCoin) {
    var fetchFunc= fetch(config.API_URL[Type],{
           method: 'POST',
           headers: {
             "Authorization" : "Bearer "+Token,
             "Content-Type"  : "application/json"
           },
           body: JSON.stringify(State.user.purchase)
        })
        .then((res) => res.json());
  }
  else if (Type==fetchTypes.AddAdCoin) {
    var fetchFunc= fetch(config.API_URL[Type],{
           method: 'POST',
           headers: {
             "Authorization" : "Bearer "+Token,
             "Content-Type"  : "application/json"
           },
        })
        .then((res) => res.json());
  }
  return fetchFunc
  .then((response) => {return {error:false, response}})
  .catch((err) => {return {error:true, err}})
};

export const fetchPOSTDataService = (Type) => {
  return fetch(config.API_URL[Type])
        .then((res) => res.json())
        .then((data) => {return {error:false, data}})
        .catch((err) => {return {error:true, err}})
};

const decryptObject = (data) =>{
  let key = CryptoJS.enc.Latin1.parse('jWnZr4u7x!A%D*G-');
  let iv = CryptoJS.enc.Latin1.parse('2s5v8y/B?E(H+MbQ');
  let rawData = CryptoJS.enc.Base64.parse(data);
  let bytes  = CryptoJS.AES.decrypt({ ciphertext: rawData }, key,{iv:iv,mode:CryptoJS.mode.CBC});
  // console.log(bytes.toString(CryptoJS.enc.Utf8));
  // console.log(bytes);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const encryptObject = (obj) =>{
  let rawData = JSON.stringify(obj);
  let key = CryptoJS.enc.Latin1.parse('jWnZr4u7x!A%D*G-');
  let iv = CryptoJS.enc.Latin1.parse('2s5v8y/B?E(H+MbQ');
  let bytes  = CryptoJS.AES.encrypt(rawData , key,{iv:iv,mode:CryptoJS.mode.CBC});
  // console.log(bytes.toString());
  return bytes.toString();
}
