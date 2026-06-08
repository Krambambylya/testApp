import { enrichPost } from './enrich-post';

describe('enrichPost', () => {
  const apiPost = {
    userId: 1,
    id: 5,
    title: 'Test title',
    body: 'Test body',
  };

  it('adds deterministic placebeard urls', () => {
    const post = enrichPost(apiPost);

    expect(post.thumbnailUrl).toBe('https://placebeard.it/32/37/notag');
    expect(post.imageUrl).toBe('https://placebeard.it/300/305/notag');
  });

  it('returns the same urls for the same post id', () => {
    const first = enrichPost(apiPost);
    const second = enrichPost(apiPost);

    expect(first.thumbnailUrl).toBe(second.thumbnailUrl);
    expect(first.imageUrl).toBe(second.imageUrl);
  });
});
