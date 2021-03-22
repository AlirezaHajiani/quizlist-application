// @flow

import { FETCH_DATA_TYPE } from '../../constants/action-types';

export const fetchDataType = (Type) => (
  {
    type: FETCH_DATA_TYPE,
    payload:  Type,
  }
);
