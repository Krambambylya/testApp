import { env } from '@/shared/config/env';

import type { ApiPost, Post } from '../model/types';

function buildPlacebeardUrl(width: number, height: number, seed: number): string {
  return `${env.IMAGE_BASE_URL}/${width}/${height + seed}/notag`;
}

export function enrichPost(post: ApiPost): Post {
  return {
    ...post,
    thumbnailUrl: buildPlacebeardUrl(32, 32, post.id),
    imageUrl: buildPlacebeardUrl(300, 300, post.id),
  };
}
