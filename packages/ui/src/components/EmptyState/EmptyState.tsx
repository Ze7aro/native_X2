import { StyleSheet, View } from 'react-native';
import { spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives/X2Text';
import type { EmptyStateProps } from './EmptyState.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function EmptyState({
  icon,
  title: titleProp,
  description,
  action,
  compact = false,
  testID,
  style,
  ...props
}: EmptyStateProps) {
  const strings = useX2Strings();
  const title = titleProp ?? strings.nothingHere;
  const { colors } = useTheme();

  return (
    <View
      {...props}
      style={[styles.container, compact ? styles.compact : styles.default, style]}
      testID={testID}
      accessibilityRole="summary"
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <X2Text variant={compact ? 'labelL' : 'headingS'} style={styles.title}>
        {title}
      </X2Text>
      {description && (
        <X2Text variant="bodyS" color={colors.textSecondary} style={styles.description}>
          {description}
        </X2Text>
      )}
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  default: {
    minHeight: 120,
    paddingVertical: spacing.xl,
  },
  compact: {
    minHeight: 72,
    paddingVertical: spacing.md,
  },
  icon: {
    marginBottom: spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    maxWidth: 280,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.md,
  },
});
