//KeyChain Actions
import { keychainhGetMatch, keychainSaveMatch } from '../keychain-data/keychain-data';
//Match actions
import {matchDataSuccess, matchSetID, matchDataUnsync} from '../match/match_data_success';

export const matchData = (match) => (
  (dispatch: Function) => {
      // dispatch(keychainSaveMatch(match));
      dispatch(matchDataSuccess(match));
      dispatch(matchDataUnsync());
  }
);
