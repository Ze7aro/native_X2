import type { ReactNode } from 'react';

jest.mock('react-native-gesture-handler', () => {
  const passthrough = ({ children }: { children?: ReactNode }) => children;
  const gesture = () => ({
    enabled: () => gesture(),
    onUpdate: () => gesture(),
    onEnd: () => gesture(),
  });
  return {
    Gesture: { Pan: gesture },
    GestureDetector: passthrough,
    GestureHandlerRootView: passthrough,
  };
});

jest.mock('react-native-reanimated', () => {
  const React = jest.requireActual('react');
  const AnimatedView = React.forwardRef((props: Record<string, unknown>, ref: unknown) =>
    React.createElement('Animated.View', { ...props, ref }, props.children),
  );
  return {
    __esModule: true,
    default: {
      View: AnimatedView,
      createAnimatedComponent: (Component: unknown) => Component,
    },
    View: AnimatedView,
    createAnimatedComponent: (Component: unknown) => Component,
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: (factory: () => unknown) => factory(),
    withTiming: (value: unknown, _config?: unknown, callback?: (finished: boolean) => void) => {
      callback?.(true);
      return value;
    },
    withSpring: (value: unknown) => value,
    cancelAnimation: jest.fn(),
  };
});

jest.mock('react-native-worklets', () => ({
  scheduleOnRN: (callback: (...args: unknown[]) => void, ...args: unknown[]) => callback(...args),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: ReactNode }) => children,
  SafeAreaView: ({ children }: { children: ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));
