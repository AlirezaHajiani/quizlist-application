import React, {useState, useEffect, useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import { AppState } from 'react-native'

function SoundController(props) {
  const soundState = useSelector(state => state.sound);
  const sound = useSelector(state => state.sound.sound);
  const music = useSelector(state => state.sound.music);
  const soundMute = useSelector(state => state.sound.soundMute);
  const musicMute = useSelector(state => state.sound.musicMute);
  const dispatch = useDispatch();
  const soundCallbacks = useRef([]);
  const musicCallbacks = useRef([]);

  const muteRef = React.useRef(musicMute);
  const musiRef = React.useRef(music);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
      AppState.addEventListener("change", _handleAppStateChange);

      return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
      };
    }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if(musicCallbacks.current[musiRef.current])
      if(muteRef.current)
        musicCallbacks.current[musiRef.current].play();
      // console.log("App has come to the foreground!");
    }

    if (
      appState.current.match(/active/) &&
      nextAppState.match(/inactive|background/)
    ) {
      if(musicCallbacks.current[musiRef.current])
        musicCallbacks.current[musiRef.current].pause();
      // console.log("App has come to the background!");
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // console.log("AppState", appState.current);
  };

  function handlePress()
  {
      soundCallbacks.current["resultsthreepoint"].stop(() => {
              soundCallbacks.current["resultsthreepoint"].play();
          });
  }

  useEffect(() => {
    soundCallbacks.current["answerwrong"]= new Sound('answerwrong.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["resultsonepoint"]= new Sound('resultsonepoint.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["resultstwopoint"]= new Sound('resultstwopoint.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["resultsthreepoint"]= new Sound('resultsthreepoint.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["jokeranswer"]= new Sound('jokeranswer.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["jokertime"]= new Sound('jokertime.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["timerend"]= new Sound('timerend.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });

    soundCallbacks.current["incrementationcoin"]= new Sound('incrementationcoin.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["incrementationrevelation"]= new Sound('incrementationrevelation.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });
    soundCallbacks.current["resultsvictory"]= new Sound('resultsvictory.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
        });

    musicCallbacks.current["music"]= new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed /to load the sound', error);
            return;
          }
        });
    musicCallbacks.current["ingamemusic"]= new Sound('ingamemusic.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log('failed /to load the sound', error);
            return;
          }
        });
  },[]);

  useEffect(() => {
    if(soundMute){
      if(sound!='')
        soundCallbacks.current[sound].stop(() => {
              soundCallbacks.current[sound].play();
          });
    }
  },[sound]);

  useEffect(() => {
    muteRef.current = musicMute;
    if(!musicMute)
    for (let key in musicCallbacks.current) {
      musicCallbacks.current[key].stop();
    }
    else {
      if(music!='')
        musicCallbacks.current[music].stop(() => {
              musicCallbacks.current[music].setNumberOfLoops(-1);
              // if(appState.current.match(/inactive|background/))
              //   musicCallbacks.current[music].pause();
              // else
                musicCallbacks.current[music].play();
          });
    }
  },[musicMute]);

  useEffect(() => {
    musiRef.current=music;
    if(!musicMute)
    {
      for (let key in musicCallbacks.current) {
        musicCallbacks.current[key].stop();
      }
    }
    else {
      if(music!='')
        musicCallbacks.current[music].stop(() => {
              musicCallbacks.current[music].setNumberOfLoops(-1);
              // if(appState.current.match(/inactive|background/))
              //   musicCallbacks.current[music].pause();
              // else
                musicCallbacks.current[music].play();
          });
      else {
        for (let key in musicCallbacks.current) {
          musicCallbacks.current[key].stop();
        }
    }


    }
    return () => {
      for (let key in musicCallbacks.current) {
        musicCallbacks.current[key].stop();
      }
    }
  },[music]);

  return(
    <></>
  );
}

export default SoundController;
