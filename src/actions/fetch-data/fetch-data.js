// @flow
// Handle servies
import { fetchDataService, fetchTypes } from '../../services/http-requests';
// Network Actions
import { fetchDataError } from './fetch-data-error';
import { fetchDataRequest } from './fetch-data-request';
import { fetchDataSuccess } from './fetch-data-success';
import { fetchDataType } from './fetch-data-type';
//KeyChain Actions
import { keychainGetData, keychainSaveData , keychainRemoveUser, keychainRemoveMatch, keychainRemovePurchase} from '../keychain-data/keychain-data';
import { keychainDataSuccess } from '../keychain-data/keychain-data-success';
//User Actions
import { userDataSuccess, userDataUnsync, userAllMatches } from '../user/user_data_success';
//Match actions
import {matchDataSuccess, matchSetID, matchDataUnsync} from '../match/match_data_success';

//profile Actions
import { profileDataSuccess, profileId } from '../profile/profile_data';

//LeaderBoard actions
import { leaderTotalSuccess, leaderWeeklySuccess, leaderUserSuccess } from '../leader/leader_data';

//Searct actions
import { searchDataSuccess } from '../search/search_data.js'

import * as RootNavigation from '../../../RootNavigation.js';
import AppMetrica from 'react-native-appmetrica';

export const fetchType=fetchTypes;

export const fetchData = (TypeIn) => (
  (dispatch: Function, getState) => {
    // Type:0 , Request New User
    if (TypeIn !== void 0)
        dispatch(fetchDataType(TypeIn));
    let Type = TypeIn || getState().Network.Type;
    let Token= getState().keychain.token;

    dispatch(fetchDataRequest());
    return fetchDataService(Type,Token,getState())
      .then((data) => {

                        if(data.error)
                        {
                          // console.log(data.err);
                          AppMetrica.reportError('Network Error: '+JSON.stringify(data.err));
                          dispatch(fetchDataError());
                          switch (Type) {
                            case fetchTypes.UpdateUser || fetchTypes.UpdateUserBeforeMatch: {
                              dispatch(userDataUnsync());
                              break;
                            };
                            case fetchTypes.UpdateMatch: {
                              dispatch(matchDataUnsync());
                              break;
                            };
                            case fetchTypes.AddShopCoin: {
                              dispatch(userDataUnsync());
                              break;
                            };
                          }
                        }
                        else
                        {

                          switch (Type) {
                            case fetchTypes.CreateUser: {
                              // dispatch(keychainSaveData(data.response.token));
                              dispatch(keychainDataSuccess(data.response.token));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.GetUser: {
                              dispatch(userDataSuccess(data.response));
                              dispatch(fetchData(fetchTypes.GetAllMatches));
                              // dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.UpdateUser: {
                              dispatch(userDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.CreateMatch: {
                              dispatch(matchSetID(data.response._id));
                              dispatch(matchDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              RootNavigation.navigate('GameStart');
                              break;
                            };
                            case fetchTypes.GetMatch: {
                              dispatch(matchSetID(data.response._id));
                              dispatch(matchDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              RootNavigation.navigate('GameStart');
                              break;
                            };
                            case fetchTypes.FlagMatch: {
                              dispatch(matchSetID(data.response._id));
                              dispatch(matchDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.UpdateUserBeforeMatch: {
                              dispatch(userDataSuccess(data.response));
                              dispatch(fetchData(fetchTypes.UpdateMatch));
                              break;
                            };
                            case fetchTypes.UpdateMatch: {
                              dispatch(matchSetID(data.response._id));
                              dispatch(matchDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.GetAllMatches: {
                              dispatch(userAllMatches(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.UserProfile: {
                              dispatch(profileId(data.response._id));
                              dispatch(profileDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              RootNavigation.navigate('ProfileScreen');
                              break;
                            };
                            case fetchTypes.CreateMatchProfile: {
                              dispatch(matchSetID(data.response._id));
                              dispatch(matchDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              RootNavigation.navigate('GameStart');
                              break;
                            };
                            case fetchTypes.GetLeaderTotal: {
                              dispatch(leaderTotalSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.GetLeaderWeekly: {
                              dispatch(leaderTotalSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.GetLeaderUser: {
                              dispatch(leaderTotalSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.SearchUsers: {
                              dispatch(searchDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.AddShopCoin: {
                              dispatch(userDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                            case fetchTypes.AddAdCoin: {
                              dispatch(userDataSuccess(data.response));
                              dispatch(fetchDataSuccess(data.response));
                              break;
                            };
                          }
                        }
                      }
            )
      .catch((e) => dispatch(()=>{fetchDataError();AppMetrica.reportError('Network Process Error: '+JSON.stringify(e));}));
  }
);
