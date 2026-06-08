import { combineReducers, type Action, type ThunkDispatch } from '@reduxjs/toolkit';

import { postApi } from '@/entities/post';
import { favoritesReducer } from '@/features/favorites';

export const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;
