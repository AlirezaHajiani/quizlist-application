import {
  FETCH_DATA_ERROR,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_CANCEL,
  FETCH_DATA_TYPE,
} from '../constants/action-types';

const initialState = {
  Type: 0,
  isSucces: false,
  isLoading: false,
  error: false,
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_SUCCESS: {
        return {
          ...state,
          isSucces: true,
          isLoading: false,
          error: false,
        };
      }
      case FETCH_DATA_REQUEST: {
        return {
          ...state,
          isSucces: false,
          isLoading: true,
          error: false,
        };
      }
      case FETCH_DATA_ERROR: {
        return {
          ...state,
          isSucces: false,
          isLoading: false,
          error: true,};
      }
      case FETCH_DATA_CANCEL: {
        return {
          ...state,
          isSucces: false,
          isLoading: false,
          error: false,};
      }
      case FETCH_DATA_TYPE: {
        return {
          ...state,
          Type: action.payload};
        }
      default: {
        return {...state};
      }
    }
};

export default loadingReducer;
