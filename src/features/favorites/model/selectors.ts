import { createSelector } from '@reduxjs/toolkit';

import { selectAllPosts } from '@/entities/post';
import type { Post } from '@/entities/post';

import type { FavoritesRootState } from './state';

export const selectFavoriteIds = (state: FavoritesRootState): number[] =>
  state.favorites.ids;

export const selectIsFavorite =
  (postId: number) =>
  (state: FavoritesRootState): boolean =>
    state.favorites.ids.includes(postId);

export const selectSortedPosts = createSelector(
  [selectAllPosts, selectFavoriteIds],
  (posts, favoriteIds): Post[] => {
    if (!posts) {
      return [];
    }

    const favoriteIdSet = new Set(favoriteIds);
    const favoritePosts = favoriteIds
      .map(id => posts.find(post => post.id === id))
      .filter((post): post is Post => post !== undefined);
    const regularPosts = posts.filter(post => !favoriteIdSet.has(post.id));

    return [...favoritePosts, ...regularPosts];
  },
);
