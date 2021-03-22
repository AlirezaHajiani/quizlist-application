// @flow
import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import matchReducer from './match-reducer';
import networkState from './network-reducer';
import keychainReducer from './keychain-reducer';
import pushReducer from './push-reducer';
import soundReducer from './sound-reducer';
import profileReducer from './profile-reducer';
import leaderReducer from './leaderboard-reducer';
import searchReducer from './search-reducer';
// Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  Network: networkState,
  keychain: keychainReducer,
  match: matchReducer,
  push: pushReducer,
  sound: soundReducer,
  profile: profileReducer,
  leader: leaderReducer,
  search: searchReducer,
});

export default rootReducer;
