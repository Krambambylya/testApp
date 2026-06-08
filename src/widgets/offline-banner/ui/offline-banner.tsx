import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/shared/theme';

type OfflineBannerProps = {
  message: string;
};

export const OfflineBanner = React.memo(function OfflineBanner({
  message,
}: OfflineBannerProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offlineBanner,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  text: {
    color: colors.offlineText,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
