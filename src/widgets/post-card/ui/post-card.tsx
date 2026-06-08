import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import type { Post } from '../../../entities/post';

type PostCardProps = {
  post: Post;
  isFavorite: boolean;
  onPress: (postId: number) => void;
};

export const PostCard = React.memo(function PostCard({
  post,
  isFavorite,
  onPress,
}: PostCardProps) {

  const handlePress = useCallback(() => {
    onPress(post.id);
  }, [onPress, post.id]);

  console.log('PostCard rendered', post.thumbnailUrl);
  return (
    <Pressable
      onPress={handlePress}
      style={[styles.card, isFavorite && styles.cardFavorite]}>
      <FastImage
        source={{ uri: post.thumbnailUrl, priority: FastImage.priority.normal }}
        style={styles.thumbnail}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
        <Text style={styles.body} numberOfLines={2}>
          {post.body}
        </Text>
        {isFavorite ? <Text style={styles.badge}>Favorite</Text> : null}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardFavorite: {
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb',
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  badge: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
});
