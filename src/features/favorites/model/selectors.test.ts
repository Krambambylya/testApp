import { selectAllPosts } from '@/entities/post';

import { selectSortedPosts } from './selectors';

jest.mock('@/entities/post', () => ({
  selectAllPosts: jest.fn(),
}));

const mockedSelectAllPosts = selectAllPosts as jest.MockedFunction<typeof selectAllPosts>;

describe('selectSortedPosts', () => {
  const posts = [
    {
      userId: 1,
      id: 1,
      title: 'First',
      body: 'Body 1',
      thumbnailUrl: 'https://placebeard.it/32/33/notag',
      imageUrl: 'https://placebeard.it/300/301/notag',
    },
    {
      userId: 1,
      id: 2,
      title: 'Second',
      body: 'Body 2',
      thumbnailUrl: 'https://placebeard.it/32/34/notag',
      imageUrl: 'https://placebeard.it/300/302/notag',
    },
    {
      userId: 1,
      id: 3,
      title: 'Third',
      body: 'Body 3',
      thumbnailUrl: 'https://placebeard.it/32/35/notag',
      imageUrl: 'https://placebeard.it/300/303/notag',
    },
  ];

  it('places favorites first in favorites order', () => {
    mockedSelectAllPosts.mockReturnValue(posts);

    const sorted = selectSortedPosts({
      favorites: { ids: [3, 1] },
    } as never);

    expect(sorted.map(post => post.id)).toEqual([3, 1, 2]);
  });
});
