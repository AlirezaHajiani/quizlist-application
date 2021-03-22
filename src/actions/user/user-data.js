//KeyChain Actions
import { keychainhGetUser, keychainSaveUser, keychainhGetPurchase, keychainSavePurchase  } from '../keychain-data/keychain-data';
//User Actions
import { userDataSuccess, userDataUnsync, userSetPurchase } from '../user/user_data_success';

export const userData = (user) => (
  (dispatch: Function) => {
      // dispatch(keychainSaveUser(user));
      dispatch(userDataSuccess(user));
      dispatch(userDataUnsync());
  }
);

export const purchaseData = (purchase) => (
  (dispatch: Function) => {
      // dispatch(keychainSavePurchase(purchase));
      dispatch(userSetPurchase(purchase));
      dispatch(userDataUnsync());
  }
);
