import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { postApi } from '../entities/post/api/post-api';
import { favoritesReducer } from '../entities/post/model/favorites-slice';
import { reduxStorage } from './persist-storage';

const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  favorites: favoritesReducer,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [postApi.reducerPath, 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(postApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
