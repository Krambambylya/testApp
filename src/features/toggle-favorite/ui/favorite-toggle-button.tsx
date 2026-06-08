import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { selectIsFavorite, toggleFavorite } from '@/features/favorites';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { colors, spacing } from '@/shared/theme';

type FavoriteToggleButtonProps = {
  postId: number;
};

export function FavoriteToggleButton({ postId }: FavoriteToggleButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(postId));

  const handlePress = useCallback(() => {
    dispatch(toggleFavorite(postId));
  }, [dispatch, postId]);

  const label = isFavorite ? 'Remove from favorites' : 'Add to favorites';

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, isFavorite && styles.buttonActive]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFavorite }}>
      <Text style={[styles.text, isFavorite && styles.textActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.xxl,
    backgroundColor: colors.buttonMuted,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  textActive: {
    color: colors.white,
  },
});
