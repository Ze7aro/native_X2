import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'react-x2-native';

export function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme="light">{ui}</ThemeProvider>);
}
