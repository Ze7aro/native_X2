import type { ViewProps } from 'react-native';
import type { ReactNode } from 'react';

export interface TiltedCardProps extends ViewProps {
  children: ReactNode;
  maxTilt?: number;
  intensity?: number;
  disabled?: boolean;
  onPress?: () => void;
  onTilt?: (x: number, y: number) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}
