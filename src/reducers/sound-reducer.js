
import {
  SOUND_PLAY,
  SOUND_MUTE,
  SOUND_PLAY_MUSIC,
  MUSIC_MUTE,
  SOUND_STOP_MUSIC,
  SOUND_STOP_ALL,
} from '../constants/action-types';

const initialState = {
  sound: '',
  soundMute: true,
  music: '',
  musicMute: true,
  stop: false,
};

const soundReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOUND_PLAY: {
      return {
        ...state,
        sound:  action.payload,
      };
    }
    case SOUND_PLAY_MUSIC: {
      return {
        ...state,
        music:  action.payload,
        stop: false,
      };
    }
    case SOUND_STOP_MUSIC: {
      return {
        ...state,
        music:  '',
        stop: true,
      };
    }
    case SOUND_STOP_ALL: {
      return {
        ...state,
        sound: '',
        stop: true,
      };
    }
    case SOUND_MUTE: {
      return {
        ...state,
        soundMute:  action.payload,
      };
    }
    case MUSIC_MUTE: {
      return {
        ...state,
        musicMute:  action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default soundReducer;
