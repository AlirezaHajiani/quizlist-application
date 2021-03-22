import { PROFILE_DATA_SUCCESS, PROFILE_SET_ID } from '../../constants/action-types';

export const profileDataSuccess = (user) => (
  {
    type: PROFILE_DATA_SUCCESS,
    payload: user,
  }
);

export const profileId = (id) => (
  {
    type: PROFILE_SET_ID,
    payload: id,
  }
);
