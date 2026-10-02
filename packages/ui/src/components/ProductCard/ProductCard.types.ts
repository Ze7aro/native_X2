import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface ProductCardProps extends ViewProps {
  image: ReactNode;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  inStock: boolean;
  onAddToCart?: () => void;
  addToCartLabel?: string;
  unavailableLabel?: string;
  outOfStockLabel?: string;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
}
