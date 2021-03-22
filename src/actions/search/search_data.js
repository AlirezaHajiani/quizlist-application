import { SEARCH_DATA_SUCCESS, SEARCH_SET_NAME } from '../../constants/action-types';

export const searchDataSuccess = (users) => (
  {
    type: SEARCH_DATA_SUCCESS,
    payload: users,
  }
);

export const searchName = (name) => (
  {
    type: SEARCH_SET_NAME,
    payload: name,
  }
);
