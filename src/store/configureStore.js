import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggingMiddleware from './middleware/logging';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'user','keychain','match',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'Network','push','sound','profile','leader','search'
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState: Object) => {
  // const middleware = applyMiddleware(thunk, loggingMiddleware);
  const middleware = applyMiddleware(thunk);
  return createStore(persistedReducer, initialState, middleware);
};

export default configureStore;
