export { postApi, useGetPostsQuery } from './api/post-api';
export { toggleFavorite, favoritesReducer } from './model/favorites-slice';
export {
  selectAllPosts,
  selectFavoriteIds,
  selectIsFavorite,
  selectPostById,
  selectSortedPosts,
} from './model/selectors';
export type { ApiPost, Post } from './model/types';
