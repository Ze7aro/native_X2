import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@react-x2-native/tokens';
import { Toast } from './Toast';
import type { NotificationCenterProps } from './NotificationCenter.types';

export function NotificationCenter({
  notifications,
  onDismiss,
  position = 'top',
  maxVisible = 3,
  gap = spacing.sm,
  style,
  testID,
}: NotificationCenterProps) {
  const insets = useSafeAreaInsets();
  const visibleNotifications = notifications.slice(-Math.max(1, maxVisible));
  const orderedNotifications =
    position === 'bottom' ? [...visibleNotifications].reverse() : visibleNotifications;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill} testID={testID}>
      <View
        pointerEvents="box-none"
        style={[
          styles.stack,
          position === 'top'
            ? { paddingTop: insets.top + spacing.md }
            : { paddingBottom: insets.bottom + spacing.md },
          { gap, justifyContent: position === 'bottom' ? 'flex-end' : 'flex-start' },
          style,
        ]}
      >
        {orderedNotifications.map((notification) => (
          <Toast
            key={notification.id}
            {...notification}
            defaultVisible
            onDismissComplete={() => onDismiss?.(notification.id)}
            testID={testID ? `${testID}-${notification.id}` : undefined}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-start',
  },
});
