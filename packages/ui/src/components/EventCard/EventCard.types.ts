import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface EventCardProps extends ViewProps {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: ReactNode;
  onPress?: () => void;
  onRegister?: () => void;
  dateLabel?: string;
  timeLabel?: string;
  locationLabel?: string;
  registerLabel?: string;
  disabled?: boolean;
  testID?: string;
}
