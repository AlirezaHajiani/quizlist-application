// @flow

import {
  USER_DATA_SUCCESS,
  USER_PUSH_ID,
  USER_SET_NAME,
  USER_SET_PURCHASE,
  USER_ALL_MATCHES,
  USER_DATA_UNSYNC,
} from '../constants/action-types';

const initialState = {
  User: {},
  allmatches: {},
  pushId: '',
  name: '',
  purchase: {},
  sync: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_SUCCESS: {
      return {
        ...state,
        User:  action.payload,
        purchase: {},
        sync: true,
      };
    }
    case USER_PUSH_ID: {
      return {
        ...state,
        pushId: action.payload,
      };
    }
    case USER_SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case USER_SET_PURCHASE: {
      return {
        ...state,
        purchase: action.payload,
      };
    }
    case USER_ALL_MATCHES: {
      return {
        ...state,
        allmatches: action.payload,
        sync: true,
      };
    }
    case USER_DATA_UNSYNC: {
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

export default userReducer;
