import React, { createContext, useContext } from 'react';
import type { ColorScheme } from '@react-x2-native/tokens';
import { lightColors, darkColors } from '@react-x2-native/tokens';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
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
  const baseColors = theme === 'dark' ? darkColors : lightColors;
  const mergedColors = customColors ? { ...baseColors, ...customColors } : baseColors;

  return (
    <ThemeContext.Provider value={{ theme, colors: mergedColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light',
      colors: lightColors,
    };
  }
  return context;
}

export function useThemeColors(): ColorScheme {
  return useTheme().colors;
}
