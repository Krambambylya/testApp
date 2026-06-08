import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGetPostsQuery, type Post } from '@/entities/post';
import { selectFavoriteIds, selectSortedPosts } from '@/features/favorites';
import type { RootStackParamList } from '@/shared/config/navigation/types';
import { useAppSelector } from '@/shared/lib/redux';
import { colors, spacing } from '@/shared/theme';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { Loader } from '@/shared/ui/loader';
import { OfflineBanner } from '@/widgets/offline-banner';
import { PostCard } from '@/widgets/post-card';

type PostsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Posts'>;

export function PostsScreen() {
  const navigation = useNavigation<PostsNavigationProp>();
  const insets = useSafeAreaInsets();
  const netInfo = useNetInfo();
  const sortedPosts = useAppSelector(selectSortedPosts);

  const { isLoading, isError, refetch, isFetching } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const isOffline = netInfo.isConnected === false;
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const handlePostPress = useCallback(
    (postId: number) => {
      navigation.navigate('Details', { postId });
    },
    [navigation],
  );

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => (
      <PostCard
        post={item}
        isFavorite={favoriteIdSet.has(item.id)}
        onPress={handlePostPress}
      />
    ),
    [favoriteIdSet, handlePostPress],
  );

  const keyExtractor = useCallback((item: Post) => String(item.id), []);

  if (isLoading && sortedPosts.length === 0) {
    return <Loader />;
  }

  if (isError && sortedPosts.length === 0) {
    return (
      <ErrorView message="Failed to load posts. Please try again." onRetry={handleRetry} />
    );
  }

  if (!isLoading && !isFetching && sortedPosts.length === 0) {
    return <EmptyView message="No posts available." />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {isOffline ? (
        <OfflineBanner message="You are offline. Showing saved posts." />
      ) : null}
      {isError && sortedPosts.length > 0 ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>
            Could not refresh posts. Showing cached data.
          </Text>
        </View>
      ) : null}
      <Text style={styles.header} accessibilityRole="header">
        Posts
      </Text>
      <FlatList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={12}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  errorBanner: {
    backgroundColor: colors.errorBanner,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  errorBannerText: {
    color: colors.errorText,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
