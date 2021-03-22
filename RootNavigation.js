// RootNavigation.js

import * as React from 'react';
import { StackActions, NavigationActions,CommonActions  } from '@react-navigation/native';
export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    if(typeof navigationRef.current.getRootState() !== 'undefined')
      navigationRef.current.navigate(name, params);
  }
}

export function reset(name, params) {
    if (isReadyRef.current && navigationRef.current) {
      if(typeof navigationRef.current.getRootState() !== 'undefined')
        navigationRef.current.dispatch(CommonActions.reset({
                                                            index: 1,
                                                            routes: [
                                                              {
                                                                name: name,
                                                                params: params,
                                                              },
                                                            ],
                                                          }));
      }
}
// add other navigation functions that you need and export them
