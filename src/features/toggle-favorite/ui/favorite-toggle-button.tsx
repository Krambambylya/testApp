import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { toggleFavorite, selectIsFavorite } from '../../../entities/post';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

type FavoriteToggleButtonProps = {
  postId: number;
};

export const FavoriteToggleButton = React.memo(function FavoriteToggleButton({
  postId,
}: FavoriteToggleButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(postId));

  const handlePress = useCallback(() => {
    dispatch(toggleFavorite(postId));
  }, [dispatch, postId]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, isFavorite && styles.buttonActive]}>
      <Text style={[styles.text, isFavorite && styles.textActive]}>
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    backgroundColor: '#e2e8f0',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#2563eb',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  textActive: {
    color: '#ffffff',
  },
});
