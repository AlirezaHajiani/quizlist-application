import {
  LEADER_DATA_TOTAL,
  LEADER_DATA_WEEKLY,
  LEADER_DATA_USER,
  LEADER_DATA_EMPTY,
} from '../../constants/action-types';

export const leaderTotalSuccess = (data) => (
  {
    type: LEADER_DATA_TOTAL,
    payload: data,
  }
);

export const leaderWeeklySuccess = (data) => (
  {
    type: LEADER_DATA_WEEKLY,
    payload: data,
  }
);

export const leaderUserSuccess = (data) => (
  {
    type: LEADER_DATA_USER,
    payload: data,
  }
);
