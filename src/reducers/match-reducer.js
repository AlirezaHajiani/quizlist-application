// @flow

import {
  MATCH_SET_ID,
  MATCH_DATA_SUCCESS,
  MATCH_DATA_UNSYNC,
} from '../constants/action-types';

const initialState = {
  Id:    '',
  Match: {},
  sync: true,
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCH_SET_ID: {
      return {
        ...state,
        Id:  action.payload
      };
    }
    case MATCH_DATA_SUCCESS: {
      return {
        ...state,
        Match:  action.payload,
        sync: true,
      };
    }
    case MATCH_DATA_UNSYNC: {
      return {
        ...state,
        sync: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default matchReducer;
