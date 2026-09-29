import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface CarouselPage {
  id: string;
  content: ReactNode;
}

export interface CarouselProps extends ViewProps {
  pages: CarouselPage[];
  initialPage?: number;
  height?: number;
  showIndicators?: boolean;
  indicatorColor?: string;
  activeIndicatorColor?: string;
  onPageChange?: (pageIndex: number, pageId: string) => void;
  loop?: boolean;
  disabled?: boolean;
  testID?: string;
}
