import { USER_DATA_SUCCESS, USER_DATA_UNSYNC, USER_PUSH_ID, USER_ALL_MATCHES, USER_SET_NAME, USER_SET_PURCHASE } from '../../constants/action-types';

export const userDataSuccess = (user) => (
  {
    type: USER_DATA_SUCCESS,
    payload: user,
  }
);

export const userPushId = (pushId) => (
  {
    type: USER_PUSH_ID,
    payload: pushId,
  }
);

export const userSetName = (name) => (
  {
    type: USER_SET_NAME,
    payload: name,
  }
);

export const userSetPurchase = (purchase) => (
  {
    type: USER_SET_PURCHASE,
    payload: purchase,
  }
);

export const userAllMatches = (matches) => (
  {
    type: USER_ALL_MATCHES,
    payload: matches,
  }
);

export const userDataUnsync = () => (
  {
    type: USER_DATA_UNSYNC,
  }
);
