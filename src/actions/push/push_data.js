import { PUSH_SET_SCREEN } from '../../constants/action-types';

export const pushSetScreen = (screen) => (
  {
    type: PUSH_SET_SCREEN,
    payload: screen,
  }
);
