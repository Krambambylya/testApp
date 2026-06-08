import { createMigrate, type MigrationManifest, type PersistedState } from 'redux-persist';

import { postApi } from '@/entities/post';

import { reduxStorage } from './persist-storage';

type PersistedAppState = PersistedState & {
  favorites?: { ids: number[] };
  postApi?: unknown;
};

const migrations: MigrationManifest = {
  0: state => state,
  1: state => {
    if (!state) {
      return state;
    }

    const persistedState = state as PersistedAppState;

    return {
      ...persistedState,
      favorites: persistedState.favorites ?? { ids: [] },
      [postApi.reducerPath]:
        persistedState[postApi.reducerPath as keyof PersistedAppState],
    };
  },
};

export const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  whitelist: [postApi.reducerPath, 'favorites'],
  migrate: createMigrate(migrations, { debug: __DEV__ }),
};
