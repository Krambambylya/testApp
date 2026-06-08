import { createSelector } from '@reduxjs/toolkit';

import { postApi } from '../api/post-api';
import type { PostRootState } from './state';
import type { Post } from './types';

const selectPostsQueryResult = postApi.endpoints.getPosts.select();

export const selectAllPosts = (state: PostRootState): Post[] | undefined =>
  selectPostsQueryResult(state).data;

export const selectPostById = (postId: number) =>
  createSelector(selectAllPosts, posts => posts?.find(post => post.id === postId));
