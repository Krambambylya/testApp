import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FavoritesState = {
  ids: number[];
};

const initialState: FavoritesState = {
  ids: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const index = state.ids.indexOf(postId);

      if (index >= 0) {
        state.ids.splice(index, 1);
        return;
      }

      state.ids.unshift(postId);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
