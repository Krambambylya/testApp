import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../../app/navigation/types';
import {
  selectFavoriteIds,
  selectSortedPosts,
  useGetPostsQuery,
  type Post,
} from '../../../entities/post';
import { useAppSelector } from '../../../app/hooks';
import { ErrorView } from '../../../shared/ui/error-view';
import { Loader } from '../../../shared/ui/loader';
import { PostCard } from '../../../widgets/post-card';

const ITEM_HEIGHT = 108;

type PostsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Posts'>;

export const PostsScreen = React.memo(function PostsScreen() {
  const navigation = useNavigation<PostsNavigationProp>();
  const insets = useSafeAreaInsets();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const sortedPosts = useAppSelector(selectSortedPosts);

  const { isLoading, isError, refetch } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

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

  const getItemLayout = useCallback(
    (_data: ArrayLike<Post> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  if (isLoading && sortedPosts.length === 0) {
    return <Loader />;
  }

  if (isError && sortedPosts.length === 0) {
    return (
      <ErrorView message="Failed to load posts. Please try again." onRetry={handleRetry} />
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.header}>Posts</Text>
      <FlatList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={12}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
});
