import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/shared/config/env';

import { enrichPost } from '../lib/enrich-post';
import type { ApiPost, Post } from '../model/types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_BASE_URL,
    timeout: env.API_TIMEOUT_MS,
  }),
  keepUnusedDataFor: env.POSTS_CACHE_SECONDS,
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      transformResponse: (response: ApiPost[]) => response.map(enrichPost),
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
