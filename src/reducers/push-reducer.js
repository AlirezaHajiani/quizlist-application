// @flow

import {
  PUSH_SET_SCREEN,
} from '../constants/action-types';

const initialState = {
  screen: 0,
};

const pushReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_SET_SCREEN: {
      return {
        ...state,
        screen:  action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default pushReducer;
