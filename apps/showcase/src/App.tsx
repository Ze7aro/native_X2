import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  ThemeProvider,
  X2Surface,
  X2Text,
  X2Stack,
  X2Pressable,
  X2Divider,
  darkColors,
  lightColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';
import { PrimitivesShowcase } from './screens/PrimitivesShowcase';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? lightColors.background : darkColors.background }}>
        <ScrollView>
          {/* Header */}
          <X2Surface
            style={{
              padding: spacing.lg,
              marginBottom: spacing.md,
            }}
          >
            <X2Text
              variant="headingL"
              style={{ marginBottom: spacing.sm }}
            >
              react-X2-native Showcase
            </X2Text>
            <X2Text
              variant="bodyM"
              color={theme === 'light' ? lightColors.textSecondary : darkColors.textSecondary}
            >
              Modern React Native components with TypeScript
            </X2Text>
          </X2Surface>

          {/* Theme Toggle */}
          <X2Stack
            direction="row"
            gap="md"
            align="center"
            justify="center"
            style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}
          >
            <X2Pressable
              backgroundColor={theme === 'light' ? (theme === 'light' ? lightColors.primary : darkColors.primary) : darkColors.surfaceVariant}
              onPress={() => setTheme('light')}
              style={{
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
                borderRadius: 8,
              }}
            >
              <X2Text color={theme === 'light' ? '#FFF' : (theme === 'light' ? lightColors.text : darkColors.text)}>
                Light
              </X2Text>
            </X2Pressable>
            <X2Pressable
              backgroundColor={theme === 'dark' ? (theme === 'light' ? lightColors.primary : darkColors.primary) : (theme === 'light' ? lightColors.surfaceVariant : darkColors.surfaceVariant)}
              onPress={() => setTheme('dark')}
              style={{
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
                borderRadius: 8,
              }}
            >
              <X2Text color={theme === 'dark' ? '#FFF' : (theme === 'light' ? lightColors.text : darkColors.text)}>
                Dark
              </X2Text>
            </X2Pressable>
          </X2Stack>

          <X2Divider style={{ marginVertical: spacing.lg }} />

          {/* Primitives Showcase */}
          <PrimitivesShowcase />
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
