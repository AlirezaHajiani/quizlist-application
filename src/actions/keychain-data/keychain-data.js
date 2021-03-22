// @flow
import { keychainhGetDataService,
        keychainhSaveDataService,
        keychainhGetUserService,
        keychainhSaveUserService,
        keychainhRemoveUserService,
        keychainhGetMatchService,
        keychainhSaveMatchService,
        keychainhRemoveMatchService,
        keychainhGetPurchaseService,
        keychainhSavePurchaseService,
        keychainhRemovePurchaseService} from '../../services/keychain';
import { keychainDataError } from './keychain-data-error';
import { keychainhDataRequest } from './keychain-data-request';
import { keychainDataSuccess } from './keychain-data-success';
import { userDataSuccess, userDataUnsync, userSetPurchase } from '../user/user_data_success';
import {matchDataSuccess, matchSetID, matchDataUnsync} from '../match/match_data_success';


export const keychainGetData = () => (
  (dispatch: Function) => {
    dispatch(keychainhDataRequest());
    return keychainhGetDataService()
      .then((data) => {
                      // console.log(data);
                      if(data.error)
                        {
                          dispatch(keychainDataError());
                        }
                      else
                        dispatch(keychainDataSuccess(data.token));
                      }
            )
      .catch(() =>{dispatch(keychainDataError());});
  }
);

export const keychainSaveData = (token) => (
  (dispatch: Function) => {
    dispatch(keychainhDataRequest());
    return keychainhSaveDataService(token)
      .then((data) => {

                      if(data.error)
                        dispatch(keychainDataError());
                      else
                        dispatch(keychainDataSuccess(data.token));
                      }
            )
      .catch(() => dispatch(keychainDataError()));
  }
);

export const keychainhGetUser = () => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhGetUserService()
      .then((data) => {
                        // console.log(data);
                        if(data.error)
                          {
                            dispatch(keychainDataError());
                          }
                        else
                        {

                          if(data.user!=="")
                          {
                            dispatch(userDataSuccess(JSON.parse(data.user)));
                            dispatch(userDataUnsync());
                          }
                        }
                      }
            )
      .catch(() =>{dispatch(keychainDataError());});
  }
);

export const keychainSaveUser = (user) => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhSaveUserService(user)
      .then((data) => {

                      if(data.error)
                        dispatch(keychainDataError());
                      // else
                      //   dispatch(keychainDataSuccess(data.user));
                      }
            )
      .catch(() => dispatch(keychainDataError()));
  }
);

export const keychainRemoveUser = () => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhRemoveUserService()
      .then((data) => {
                      // console.log(data);
                      if(data.error)
                        dispatch(keychainDataError());
                      // else
                      //   dispatch(keychainDataSuccess(data.user));
                      }
            )
      .catch(() => {console.log("Error");dispatch(keychainDataError());});
  }
);

export const keychainhGetMatch = () => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhGetMatchService()
      .then((data) => {
        // console.log(data);
                        if(data.error)
                          {
                            dispatch(keychainDataError());
                          }
                        else{
                          if(data.match!=="")
                          {
                            dispatch(matchDataSuccess(JSON.parse(data.match)));
                            dispatch(matchDataUnsync());
                          }
                        }
                      }
            )
      .catch(() =>{dispatch(keychainDataError());});
  }
);

export const keychainSaveMatch = (match) => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhSaveMatchService(match)
      .then((data) => {

                      if(data.error)
                        dispatch(keychainDataError());
                      // else
                      //   dispatch(keychainDataSuccess(data.user));
                      }
            )
      .catch(() => dispatch(keychainDataError()));
  }
);

export const keychainRemoveMatch = () => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhRemoveMatchService()
      .then((data) => {
                      // console.log("return");
                      // console.log(data);
                      if(data.error)
                        dispatch(keychainDataError());
                      // else
                      //   dispatch(keychainDataSuccess(data.user));
                      }
            )
      .catch(() => dispatch(keychainDataError()));
  }
);

export const keychainhGetPurchase = () => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhGetPurchaseService()
      .then((data) => {

                        if(data.error)
                          {
                            dispatch(keychainDataError());
                          }
                          else {
                            if(data.purchase!=="")
                            {
                              dispatch(userSetPurchase( JSON.parse(data.purchase)));
                              dispatch(userDataUnsync());
                            }
                          }
                      }
            )
      .catch(() =>{dispatch(keychainDataError());});
  }
);

export const keychainSavePurchase = (purchase) => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhSavePurchaseService(purchase)
      .then((data) => {

                      if(data.error)
                        dispatch(keychainDataError());
                      // else
                      //   dispatch(keychainDataSuccess(data.user));
                      }
            )
      .catch(() => dispatch(keychainDataError()));
  }
);

export const keychainRemovePurchase = () => (
  (dispatch: Function) => {
    // dispatch(keychainhDataRequest());
    return keychainhRemovePurchaseService()
      .then((data) => {

                      if(data.error)
                        dispatch(keychainDataError());
                      // else
                      //   dispatch(keychainDataSuccess(data.user));
                      }
            )
      .catch(() => dispatch(keychainDataError()));
  }
);
