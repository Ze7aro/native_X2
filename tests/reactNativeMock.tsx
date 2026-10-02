import React, { forwardRef, useImperativeHandle } from 'react';

type MockProps = React.PropsWithChildren<Record<string, unknown>>;

type MockHostHandle = {
  measureInWindow: (
    callback: (x: number, y: number, width: number, height: number) => void
  ) => void;
};

const createHost = (name: string) =>
  forwardRef<MockHostHandle, MockProps>(({ children, ...props }, ref) => {
    useImperativeHandle(ref, () => ({
      measureInWindow: (callback) => callback(24, 24, 120, 40),
    }));

    return React.createElement(name, props, children);
  });

function flattenStyle(style: unknown): Record<string, unknown> {
  if (!Array.isArray(style)) {
    return (style ?? {}) as Record<string, unknown>;
  }

  return style.reduce<Record<string, unknown>>(
    (result, item) => Object.assign(result, flattenStyle(item)),
    {}
  );
}

export const View = createHost('View');
export const Text = createHost('Text');
export const Pressable = createHost('Pressable');
export const ScrollView = createHost('ScrollView');
export const KeyboardAvoidingView = createHost('KeyboardAvoidingView');
export const ActivityIndicator = createHost('ActivityIndicator');
export const Modal = createHost('Modal');
export const TextInput = createHost('TextInput');

export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T) => styles,
  flatten: flattenStyle,
  hairlineWidth: 1,
  absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
};

export const BackHandler = (() => {
  const handlers: Array<() => boolean> = [];
  return {
    addEventListener: (_event: string, handler: () => boolean) => {
      handlers.push(handler);
      return {
        remove: () => {
          handlers.splice(handlers.indexOf(handler), 1);
        },
      };
    },
    __press: () => [...handlers].reverse().some((handler) => handler()),
  };
})();
export const Platform = {
  OS: 'ios',
  select: <T,>(options: { ios?: T; android?: T; default?: T }) => options.ios ?? options.default,
};
export const AccessibilityInfo = {
  isReduceMotionEnabled: () => Promise.resolve(false),
  addEventListener: () => ({ remove: () => undefined }),
};
export const useColorScheme = () => 'light';
export const useWindowDimensions = () => ({ width: 390, height: 844, scale: 1, fontScale: 1 });
export const Dimensions = { get: () => ({ width: 390, height: 844, scale: 1, fontScale: 1 }) };
export const I18nManager = { isRTL: false };
