import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface GalleryImage {
  id: string;
  content: ReactNode;
  title?: string;
}

export interface GalleryCardProps extends ViewProps {
  images: GalleryImage[];
  title?: string;
  maxVisible?: number;
  onImagePress?: (index: number, id: string) => void;
  onViewAll?: () => void;
  disabled?: boolean;
  testID?: string;
}
