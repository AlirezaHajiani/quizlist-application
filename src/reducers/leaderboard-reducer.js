
import {
  LEADER_DATA_TOTAL,
  LEADER_DATA_WEEKLY,
  LEADER_DATA_USER,
  LEADER_DATA_EMPTY,
} from '../constants/action-types';

const initialState = {
  total: [],
  weekly: [],
  user: [],
};

const leaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEADER_DATA_TOTAL: {
      return {
        ...state,
        total:  action.payload,
      };
    }
    case LEADER_DATA_WEEKLY: {
      return {
        ...state,
        weekly:  action.payload,
      };
    }
    case LEADER_DATA_USER: {
      return {
        ...state,
        user:  action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default leaderReducer;
