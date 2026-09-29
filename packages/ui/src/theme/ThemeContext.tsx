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
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors }}>
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
