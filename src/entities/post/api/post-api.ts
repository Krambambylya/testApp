import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { enrichPost } from '../lib/enrich-post';
import type { ApiPost, Post } from '../model/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      transformResponse: (response: ApiPost[]) => response.map(enrichPost),
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
