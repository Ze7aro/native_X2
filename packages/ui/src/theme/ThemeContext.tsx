import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import type { ColorScheme } from '@react-x2-native/tokens';
import { lightColors, darkColors } from '@react-x2-native/tokens';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Exclude<Theme, 'system'>;
  colors: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  theme = 'light',
  colors: customColors,
}: {
  children: React.ReactNode;
  theme?: Theme;
  colors?: Partial<ColorScheme>;
}) {
  const systemColorScheme = useColorScheme();
  const resolvedTheme: Exclude<Theme, 'system'> =
    theme === 'system' ? (systemColorScheme === 'dark' ? 'dark' : 'light') : theme;
  const baseColors = resolvedTheme === 'dark' ? darkColors : lightColors;
  const mergedColors = useMemo(
    () => (customColors ? { ...baseColors, ...customColors } : baseColors),
    [baseColors, customColors]
  );
  const value = useMemo(
    () => ({ theme, resolvedTheme, colors: mergedColors }),
    [theme, resolvedTheme, mergedColors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light',
      resolvedTheme: 'light',
      colors: lightColors,
    };
  }
  return context;
}

export function useThemeColors(): ColorScheme {
  return useTheme().colors;
}
