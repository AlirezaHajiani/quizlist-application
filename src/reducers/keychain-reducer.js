import {
  KEYCHAIN_DATA_ERROR,
  KEYCHAIN_DATA_REQUEST,
  KEYCHAIN_DATA_SUCCESS,
  KEYCHAIN_DATA_SAVE,
} from '../constants/action-types';

const initialState = {
  token: "",
  isSucces: false,
  isLoading: false,
  error: false,
}

const keychainReducer = (state = initialState, action) => {
    switch (action.type) {
      case KEYCHAIN_DATA_SUCCESS: {
        return {
          ...state,
          token: action.payload,
          isSucces: true,
          isLoading: false,
          error: false,
        };
      }
      case KEYCHAIN_DATA_REQUEST: {
        return {
          ...state,
          isSucces: false,
          isLoading: true,
          error: false,
        };
      }
      case KEYCHAIN_DATA_ERROR: {
        return {
          ...state,
          isSucces: false,
          isLoading: false,
          error: true,};
      }
      case KEYCHAIN_DATA_SAVE: {
        return {
          ...state,
          token: action.payload.token,
          isSucces: true,
          isLoading: false,
          error: false,};
      }
      default: {
        return state;
      }
    }
};

export default keychainReducer;
