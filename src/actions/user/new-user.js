// @flow
import { fetchData } from '../fetch-data/fetch-data';
import { fetchDataType } from '../fetch-data/fetch-data-type';
import { keychainGetData, keychainSaveData } from '../keychain-data/keychain-data';

export const newUser = () => (
  (dispatch: Function, getState) => {
    // Type:0 , Request New User
    //const {Type} = getState().Network;
    //console.log(Type);
    dispatch(fetchDataType(0));
    return fetchDataService(Type)
      .then((data) => {
                        if(data.error)
                          dispatch(fetchDataError());
                        else
                        {
                          switch (Type) {
                            case 0: {
                              dispatch(fetchDataSuccess(data));
                            };

                          }
                        }
                      }
            )
      .catch(() => {dispatch(fetchDataError());});
  }
);
