// @flow

import { KEYCHAIN_DATA_ERROR } from '../../constants/action-types';

export const keychainDataError = () => (
  {
    type: KEYCHAIN_DATA_ERROR,
    payload: { error: true },
  }
);
