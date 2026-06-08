import { createSelector } from '@reduxjs/toolkit';

import { postApi } from '../api/post-api';
import type { PostRootState } from './state';
import type { Post } from './types';

const selectPostsQueryResult = postApi.endpoints.getPosts.select();

export const selectAllPosts = (state: PostRootState): Post[] | undefined =>
  selectPostsQueryResult(state).data;

export const selectFavoriteIds = (state: PostRootState): number[] =>
  state.favorites.ids;

export const selectIsFavorite =
  (postId: number) =>
  (state: PostRootState): boolean =>
    state.favorites.ids.includes(postId);

export const selectPostById = (postId: number) =>
  createSelector(selectAllPosts, posts => posts?.find(post => post.id === postId));

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
