// @flow

import { KEYCHAIN_DATA_SUCCESS } from '../../constants/action-types';

export const keychainDataSuccess = (token) => (
  {
    type: KEYCHAIN_DATA_SUCCESS,
    payload: token,
  }
);
