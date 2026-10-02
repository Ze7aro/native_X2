# react-X2-native

A personal library of reusable React Native components, inspired by modern visual patterns and designed for touch interaction on Android and iOS.

## Project Structure

```
react-X2-native/
├── apps/
│   └── showcase/           # Expo app for interactive component catalog
├── packages/
│   ├── tokens/            # Design tokens (colors, spacing, typography)
│   ├── core/              # Core utilities and accessibility hooks
│   └── ui/                # React Native components
├── pnpm-workspace.yaml
└── README.md
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
Core utilities and accessibility helpers.

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

## Phase 0 Progress

- [x] Initialize workspace and pnpm configuration
- [x] Create base TypeScript configuration
- [x] Implement design tokens package
- [x] Implement core utilities package
- [x] Create UI package with primitives
- [x] Create Expo showcase app
- [x] Configure ESLint and Prettier
- [x] Theme provider with light/dark modes

## Phase 1 Progress

- [x] Enhanced design tokens with motion/easing
- [x] Refined primitive APIs:
  - [x] testID support on all primitives
  - [x] Improved X2Text with weight & font scaling
  - [x] Enhanced X2Surface with borders & custom radius
  - [x] Better X2Pressable with activeOpacity & hints
  - [x] Flexible X2Stack with numeric gap support
  - [x] Enhanced X2Icon with accessibility
  - [x] Improved X2Divider with custom color
- [x] Core utilities:
  - [x] useSpacing hook
  - [x] useThemeColors hook
  - [x] Improved useReducedMotion
  - [x] useSafeAreaPadding
- [x] Expanded showcase with section navigation:
  - [x] Typography showcase
  - [x] Surfaces & elevation showcase
  - [x] Buttons showcase
  - [x] Color palette showcase
- [x] Comprehensive primitives documentation

See [PRIMITIVES.md](PRIMITIVES.md) for detailed API documentation.

## Phase 2 Progress (MVP Components — 10 of 10) ✅ PRODUCTION READY

All 10 components implemented and thoroughly reviewed. All critical issues fixed, code optimized.

- [x] **SpotlightCard**: Interactive glow following touch, spring animations
- [x] **TiltedCard**: 3D perspective tilt effect, customizable intensity
- [x] **ProfileCard**: Composable profile with avatar, metadata, actions
- [x] **ExpandableCard**: Expandable content with smooth height transitions
- [x] **Dock**: Navigation dock with active indicator & safe areas
- [x] **AnimatedTabs**: Tabbed navigation with animated indicator
- [x] **SegmentedControl**: Compact multi-option selector
- [x] **Carousel**: Touch-paginated carousel with indicators & animated indicators
- [x] **AnimatedList**: List with staggered entry/exit animations, motion reduction support
- [x] **Accordion**: Expandable sections with smooth transitions

**Review Status:** 7 issues identified and fixed:
- ✅ SpotlightCard CSS filter removed
- ✅ Carousel indicators now properly animated with Reanimated
- ✅ AnimatedList respects motion reduction preferences
- ✅ Dead code removed, performance optimized

See [COMPONENTS.md](COMPONENTS.md) for detailed component documentation and [PHASE2_REVIEW.md](PHASE2_REVIEW.md) for review findings.

## Phase 3 Progress (Extended Families — 19 of 19) ✅ COMPLETE

Extended component families across 4 categories:

**Extended Cards (6):**
- FeatureCard, StatsCard, ReviewCard, ProductCard, EventCard, GalleryCard

**Extended Navigation (5):**
- Breadcrumbs, Stepper, BottomSheet, SideMenu, TabsVariants

**Extended Collections (4):**
- Grid, Stack, Timeline, InfiniteList

**Overlays (4):**
- Modal, ContextMenu, Tooltip, Popover

See [PHASE3_PLAN.md](PHASE3_PLAN.md) for complete Phase 3 specification.

## Roadmap

- **Phase 4:** Animations and advanced interactions
- **Phase 5:** Comprehensive documentation and release 1.0.0

## Contributing

Contributions are welcome! Please follow the style guide defined by ESLint and Prettier configurations.

## License

Private library — Internal use only.
