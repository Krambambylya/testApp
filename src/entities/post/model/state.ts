import type { postApi } from '../api/post-api';

export type PostRootState = {
  [postApi.reducerPath]: ReturnType<typeof postApi.reducer>;
  favorites: {
    ids: number[];
  };
};
