// @flow

import {
  SEARCH_DATA_SUCCESS,
  SEARCH_SET_NAME,
} from '../constants/action-types';

const initialState = {
  users: [],
  name: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DATA_SUCCESS: {
      return {
        ...state,
        users:  action.payload,
      };
    }
    case SEARCH_SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default searchReducer;
