// @flow

import { KEYCHAIN_DATA_SAVE } from '../../constants/action-types';

export const keychainDataSave = (token) => (
  {
    type: KEYCHAIN_DATA_SAVE,
    payload: token,
  }
);
