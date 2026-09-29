# Primitives Documentation

## Overview

Core primitives form the foundation of react-X2-native. Each primitive is lightweight, accessible, and theme-aware.

## X2Text

Typography component with built-in theme support and multiple variants.

```tsx
import { X2Text } from 'react-x2-native';

<X2Text variant="headingM">My Heading</X2Text>
<X2Text variant="bodyM" color="#FF0000">Custom color</X2Text>
```

### Props

- `variant`: `'headingXL' | 'headingL' | 'headingM' | 'headingS' | 'bodyL' | 'bodyM' | 'bodyS' | 'labelL' | 'labelM' | 'labelS'`
- `color`: string (default: theme text color)
- `weight`: `'normal' | 'bold'`
- `testID`: string (for testing)
- `allowFontScaling`: boolean (capped at 1.2x)

## X2Surface

Surfaces provide contained spaces for content with optional elevation and borders.

```tsx
import { X2Surface } from 'react-x2-native';

<X2Surface>
  <X2Text>Content</X2Text>
</X2Surface>

<X2Surface
  backgroundColor="#FF0000"
  borderRadius="lg"
  elevationLevel="md"
>
  Content
</X2Surface>
```

### Props

- `backgroundColor`: string (default: theme surface color)
- `borderRadius`: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'` or number
- `elevationLevel`: `'none' | 'sm' | 'md' | 'lg' | 'xl'`
- `borderColor`: string
- `borderWidth`: number
- `testID`: string

## X2Pressable

Accessible button base with multiple variants and states.

```tsx
import { X2Pressable, X2Text } from 'react-x2-native';

<X2Pressable onPress={() => console.log('pressed')}>
  <X2Text color="#FFF">Press Me</X2Text>
</X2Pressable>

<X2Pressable variant="outline" borderColor="#007AFF">
  <X2Text>Outlined</X2Text>
</X2Pressable>

<X2Pressable variant="ghost">
  <X2Text>Ghost</X2Text>
</X2Pressable>
```

### Props

- `variant`: `'solid' | 'outline' | 'ghost'`
- `backgroundColor`: string (default: theme primary)
- `borderColor`: string
- `disabled`: boolean
- `activeOpacity`: number (default: 0.8)
- `onPress`: callback
- `accessibilityLabel`: string
- `accessibilityHint`: string
- `testID`: string

## X2Stack

Flexbox layout helper for arranging children.

```tsx
import { X2Stack, X2Text } from 'react-x2-native';

<X2Stack direction="row" gap="md" justify="center">
  <X2Text>Item 1</X2Text>
  <X2Text>Item 2</X2Text>
</X2Stack>
```

### Props

- `direction`: `'row' | 'column'` (default: 'column')
- `gap`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'` or number
- `align`: `'flex-start' | 'center' | 'flex-end' | 'stretch'`
- `justify`: `'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'`
- `testID`: string

## X2Divider

Visual separator between content.

```tsx
import { X2Divider } from 'react-x2-native';

<X2Divider />
<X2Divider orientation="vertical" thickness={2} />
<X2Divider color="#FF0000" />
```

### Props

- `orientation`: `'horizontal' | 'vertical'` (default: 'horizontal')
- `thickness`: number (default: 1)
- `color`: string (default: theme divider color)
- `testID`: string

## X2Icon

Simple icon adapter (unicode symbols by default).

```tsx
import { X2Icon } from 'react-x2-native';

<X2Icon name="★" size={32} />
<X2Icon name="♥" size={24} color="#FF0000" accessibilityLabel="Heart" />
```

### Props

- `name`: string (unicode symbol)
- `size`: number (default: 24)
- `color`: string (default: theme text color)
- `accessible`: boolean (default: false)
- `accessibilityLabel`: string
- `testID`: string

## ThemeProvider & useTheme

Manage theme across the app.

```tsx
import { ThemeProvider, useTheme, useThemeColors } from 'react-x2-native';

export function App() {
  return (
    <ThemeProvider theme="light">
      <MyScreen />
    </ThemeProvider>
  );
}

function MyScreen() {
  const { theme, colors } = useTheme();
  const colors = useThemeColors(); // just colors
  
  return <X2Text color={colors.primary}>Hello</X2Text>;
}
```

### Props (ThemeProvider)

- `theme`: `'light' | 'dark'`
- `colors`: Partial<ColorScheme> (optional overrides)

### Customization

Override theme colors locally:

```tsx
<ThemeProvider
  theme="light"
  colors={{
    primary: '#FF5500',
    error: '#FF1111',
  }}
>
  <MyApp />
</ThemeProvider>
```

## Design Tokens

All primitives use tokens from `@react-x2-native/tokens`:

- **Colors**: light/dark themes with semantic colors
- **Spacing**: xs (4px) to xxxl (48px)
- **Typography**: 12 variants covering headings, body, labels
- **Radius**: 7 levels (0-9999px)
- **Elevation**: 5 levels with platform-specific shadows
- **Motion**: Duration and easing for animations

## Accessibility

All primitives support:

- ARIA-like attributes (accessible, accessibilityLabel, accessibilityHint)
- Focus management
- Screen reader support
- testID for automated testing

## Best Practices

1. Use token values instead of hardcoded numbers
2. Always provide `accessibilityLabel` for interactive elements
3. Test with screen readers on target platforms
4. Respect `useReducedMotion` for animations
5. Use `testID` consistently for testing
