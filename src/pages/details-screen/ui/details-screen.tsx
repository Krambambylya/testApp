import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { selectPostById, useGetPostsQuery } from '@/entities/post';
import { FavoriteToggleButton } from '@/features/toggle-favorite';
import type { RootStackParamList } from '@/shared/config/navigation/types';
import { useAppSelector } from '@/shared/lib/redux';
import { colors, spacing } from '@/shared/theme';
import { ErrorView } from '@/shared/ui/error-view';
import { Loader } from '@/shared/ui/loader';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = React.memo(function DetailsScreen({
  route,
}: DetailsScreenProps) {
  const { postId } = route.params;
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const selectPost = useMemoizedSelectPost(postId);
  const post = useAppSelector(selectPost);
  const { isLoading: isPostsLoading } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const imageSize = Math.min(width - spacing.lg * 2, 300);

  if (isPostsLoading && !post) {
    return <Loader />;
  }

  if (!post) {
    return <ErrorView message="Post not found." />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl },
      ]}>
      <FastImage
        source={{ uri: post.imageUrl, priority: FastImage.priority.high }}
        style={[styles.image, { width: imageSize, height: imageSize }]}
        resizeMode={FastImage.resizeMode.cover}
        accessibilityLabel={`Image for post ${post.title}`}
      />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <FavoriteToggleButton postId={post.id} />
    </ScrollView>
  );
});

function useMemoizedSelectPost(postId: number) {
  return React.useMemo(() => selectPostById(postId), [postId]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  image: {
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
});
