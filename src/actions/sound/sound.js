import { SOUND_PLAY, SOUND_PLAY_MUSIC, SOUND_STOP_MUSIC, SOUND_STOP_ALL, SOUND_MUTE, MUSIC_MUTE } from '../../constants/action-types';

export const soundPlay = (sound) => (
  (dispatch: Function)=>
  {
    return soundStopAllThis(dispatch).then(()=>dispatch(soundPlayThis(sound)));
  }
);

export const soundStopAllThis = (dispatch) => {
  return new Promise((resolve, reject) => {
     dispatch(soundStopAll());
     resolve();
  });
}
export const soundPlayThis = (sound) => (
  {
    type: SOUND_PLAY,
    payload: sound,
  }
);

export const soundPlayMusic = (music) => (
  {
    type: SOUND_PLAY_MUSIC,
    payload: music,
  }
);

export const soundStopMusic = () => (
  {
    type: SOUND_STOP_MUSIC,
    payload: '',
  }
);


export const soundStopAll = () => (
  {
    type: SOUND_STOP_ALL,
  }
);

export const soundMuteState = (mute) => (
  {
    type: SOUND_MUTE,
    payload: mute,
  }
);

export const musicMuteState = (mute) => (
  {
    type: MUSIC_MUTE,
    payload: mute,
  }
);
