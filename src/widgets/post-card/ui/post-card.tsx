import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import type { Post } from '@/entities/post';
import { colors, spacing } from '@/shared/theme';

type PostCardProps = {
  post: Post;
  isFavorite: boolean;
  onPress: (postId: number) => void;
};

export function PostCard({ post, isFavorite, onPress }: PostCardProps) {
  const handlePress = useCallback(() => {
    onPress(post.id);
  }, [onPress, post.id]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.card, isFavorite && styles.cardFavorite]}
      accessibilityRole="button"
      accessibilityLabel={`Open post ${post.title}`}
      accessibilityState={{ selected: isFavorite }}>
      <FastImage
        source={{ uri: post.thumbnailUrl, priority: FastImage.priority.normal }}
        style={styles.thumbnail}
        resizeMode={FastImage.resizeMode.cover}
        accessibilityLabel={`Thumbnail for ${post.title}`}
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
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardFavorite: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.borderActive,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  body: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  badge: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
});
