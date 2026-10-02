import { Pressable, StyleSheet } from 'react-native';

export interface OverlayBackdropProps {
  onPress?: () => void;
  enabled?: boolean;
  accessibilityLabel: string;
  backgroundColor?: string;
  testID?: string;
}

/** Shared hit target and accessibility contract for modal overlay backdrops. */
export function OverlayBackdrop({
  onPress,
  enabled = true,
  accessibilityLabel,
  backgroundColor = 'transparent',
  testID,
}: OverlayBackdropProps) {
  return (
    <Pressable
      style={[StyleSheet.absoluteFill, { backgroundColor }]}
      onPress={enabled ? onPress : undefined}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    />
  );
}
