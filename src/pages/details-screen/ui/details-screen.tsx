import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../../app/navigation/types';
import { selectPostById } from '../../../entities/post';
import { FavoriteToggleButton } from '../../../features/toggle-favorite';
import { useAppSelector } from '../../../app/hooks';
import { ErrorView } from '../../../shared/ui/error-view';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = React.memo(function DetailsScreen({
  route,
}: DetailsScreenProps) {
  const { postId } = route.params;
  const insets = useSafeAreaInsets();
  const selectPost = useMemoizedSelectPost(postId);
  const post = useAppSelector(selectPost);

  if (!post) {
    return <ErrorView message="Post not found." />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}>
      <FastImage
        source={{ uri: post.imageUrl, priority: FastImage.priority.high }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
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
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingHorizontal: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
});
