import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/shared/theme';

type EmptyViewProps = {
  message: string;
};

export function EmptyView({ message }: EmptyViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.background,
  },
  message: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
