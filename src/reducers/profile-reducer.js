// @flow

import {
  PROFILE_DATA_SUCCESS,
  PROFILE_SET_ID,
} from '../constants/action-types';

const initialState = {
  Profile: {},
  id: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_DATA_SUCCESS: {
      return {
        ...state,
        Profile:  action.payload,
      };
    }
    case PROFILE_SET_ID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
