export { toggleFavorite, favoritesReducer } from './model/favorites-slice';
export type { FavoritesState } from './model/favorites-slice';
export {
  selectFavoriteIds,
  selectIsFavorite,
  selectSortedPosts,
} from './model/selectors';
