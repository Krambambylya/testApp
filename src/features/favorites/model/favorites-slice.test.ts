import { favoritesReducer, toggleFavorite } from './favorites-slice';

describe('favoritesReducer', () => {
  it('adds a favorite to the top', () => {
    const state = favoritesReducer({ ids: [2] }, toggleFavorite(5));

    expect(state.ids).toEqual([5, 2]);
  });

  it('removes an existing favorite', () => {
    const state = favoritesReducer({ ids: [5, 2] }, toggleFavorite(5));

    expect(state.ids).toEqual([2]);
  });
});
