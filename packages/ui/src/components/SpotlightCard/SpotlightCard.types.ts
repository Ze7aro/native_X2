import type { ViewProps } from 'react-native';
import type { ReactNode } from 'react';

export interface SpotlightCardProps extends ViewProps {
  children: ReactNode;
  intensity?: number;
  radius?: number;
  disabled?: boolean;
  onPress?: () => void;
  onGlowMove?: (x: number, y: number) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}
