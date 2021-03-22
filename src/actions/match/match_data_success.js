import { MATCH_DATA_SUCCESS, MATCH_SET_ID, MATCH_DATA_UNSYNC } from '../../constants/action-types';

export const matchDataSuccess = (match) => (
  {
    type: MATCH_DATA_SUCCESS,
    payload: match,
  }
);

export const matchDataUnsync = () => (
  {
    type: MATCH_DATA_UNSYNC,
  }
);

export const matchSetID = (id) => (
  {
    type: MATCH_SET_ID,
    payload: id,
  }
)
