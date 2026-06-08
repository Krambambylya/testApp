export type ApiPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = ApiPost & {
  thumbnailUrl: string;
  imageUrl: string;
};
