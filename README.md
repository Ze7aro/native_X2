# react-X2-native

A personal library of reusable React Native components, inspired by modern visual patterns and designed for touch interaction on Android and iOS.

## Project Structure

```
react-X2-native/
├── apps/
│   └── showcase/           # Expo app for interactive component catalog
├── packages/
│   ├── tokens/            # Design tokens (colors, spacing, typography, motion)
│   ├── core/              # Core utilities and accessibility hooks
│   └── ui/                # React Native components
├── tests/                 # Jest + React Native Testing Library
├── docs/archive/          # Historical plans and review reports
├── COMPONENTS.md          # Component and provider reference
├── PRIMITIVES.md          # Primitive components reference
└── pnpm-workspace.yaml
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Expo CLI
- iOS Simulator / Android Emulator (or physical device)

## Installation & Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Type checking
pnpm type-check

# Tests
pnpm test
```

## Development

### Start the Expo Showcase App

```bash
# Start Metro bundler
cd apps/showcase
pnpm start

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Run on web
pnpm web
```

The showcase app demonstrates all available components and serves as the reference implementation.

### Watch Mode for Packages

```bash
# In root directory, watch all packages
pnpm dev

# Or watch a specific package
cd packages/ui
pnpm dev
```

## Available Packages

### @react-x2-native/tokens
Design tokens for the entire library.

```bash
npm install @react-x2-native/tokens
```

### @react-x2-native/core
Core utilities and accessibility helpers (`useReducedMotion`, `useSafeAreaPadding`, `useSpacing`).

```bash
npm install @react-x2-native/core
```

### react-x2-native
Main component library.

```bash
npm install react-x2-native
```

## Usage

### Basic Example

```tsx
import { ThemeProvider, X2Surface, X2Text, X2Pressable, useThemeColors } from 'react-x2-native';

function Screen() {
  const colors = useThemeColors();
  return (
    <X2Surface>
      <X2Text variant="headingM">Hello</X2Text>
      <X2Pressable onPress={() => console.log('pressed')}>
        <X2Text color={colors.onPrimary}>Press me</X2Text>
      </X2Pressable>
    </X2Surface>
  );
}

export function MyApp() {
  return (
    <ThemeProvider theme="light">
      <Screen />
    </ThemeProvider>
  );
}
```

### Optional providers (overlays, toasts, texts)

```tsx
<SafeAreaProvider>
  <ThemeProvider theme="light">
    <X2StringsProvider strings={esStrings}>
      <ToastProvider>
        <OverlayProvider>
          <App />
        </OverlayProvider>
      </ToastProvider>
    </X2StringsProvider>
  </ThemeProvider>
</SafeAreaProvider>
```

- `OverlayProvider`: `Modal`, `BottomSheet`, `Popover`, `Tooltip`, `ContextMenu`, `SideMenu` and `CommandMenu` render in the app tree instead of RN's native `<Modal>`, with Android back-button handling.
- `ToastProvider`: `useToast().success('Saved')` from any screen, stacked, with longer duration for errors.
- `X2StringsProvider`: replaces every fixed text (`enStrings` by default, `esStrings` included).

See [COMPONENTS.md](COMPONENTS.md#app-setup-providers) for details.

## Components

Primitives (`X2Text`, `X2Surface`, `X2Pressable`, `X2Stack`, `X2Icon`, `X2Divider`) are documented in [PRIMITIVES.md](PRIMITIVES.md). Everything else is documented in [COMPONENTS.md](COMPONENTS.md).

| Family | Components |
| --- | --- |
| Cards | `SpotlightCard`, `TiltedCard`, `ProfileCard`, `ExpandableCard`, `FeatureCard`, `StatsCard`, `ReviewCard`, `ProductCard`, `EventCard`, `GalleryCard`, `DashboardCard`, `ChartCard` |
| Navigation | `Dock`, `Tabs` (`AnimatedTabs`, `TabsVariants`), `SegmentedControl`, `Breadcrumbs`, `Stepper`, `SideMenu`, `Pagination` |
| Collections | `Carousel`, `AnimatedList`, `Accordion`, `Grid`, `ItemStack`, `Timeline`, `InfiniteList`, `DataTable` |
| Overlays and feedback | `Modal`, `ConfirmDialog`, `StepDialog`, `BottomSheet`, `ContextMenu`, `Tooltip`, `Popover`, `CommandMenu`, `Toast`, `NotificationCenter`, `EmptyState` |
| Forms and search | `FormField`, `SearchField`, `FilterBar` |

## Roadmap

- Advanced animations and interactions.
- More test coverage for components that only have showcase screens today.
- Comprehensive documentation and a 1.0.0 release.

Past plans and review reports are kept in [docs/archive](docs/archive).

## Contributing

Contributions are welcome! Please follow the style guide defined by ESLint and Prettier configurations.

## License

Private library — Internal use only.
