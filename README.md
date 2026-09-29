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
import { ThemeProvider, X2Surface, X2Text, X2Pressable } from 'react-x2-native';

export function MyApp() {
  return (
    <ThemeProvider theme="light">
      <X2Surface>
        <X2Text variant="headingM">Hello</X2Text>
        <X2Pressable onPress={() => console.log('pressed')}>
          <X2Text color="#FFF">Press me</X2Text>
        </X2Pressable>
      </X2Surface>
    </ThemeProvider>
  );
}
```

## Phase 0 Progress

- [x] Initialize workspace and pnpm configuration
- [x] Create base TypeScript configuration
- [x] Implement design tokens package
- [x] Implement core utilities package
- [x] Create UI package with primitives:
  - [x] X2Text (typography)
  - [x] X2Surface (surfaces with elevation)
  - [x] X2Pressable (button base)
  - [x] X2Stack (layout)
  - [x] X2Divider (divider)
  - [x] X2Icon (icon adapter)
- [x] Create Expo showcase app
- [x] Configure ESLint and Prettier
- [x] Theme provider with light/dark modes

## Roadmap

- **Phase 1:** Tokens refinement and additional primitives
- **Phase 2:** MVP components (SpotlightCard, TiltedCard, ProfileCard, etc.)
- **Phase 3:** Extended families (cards, navigation, collections, overlays)
- **Phase 4:** Animations and advanced interactions
- **Phase 5:** Comprehensive documentation and release 1.0.0

## Contributing

Contributions are welcome! Please follow the style guide defined by ESLint and Prettier configurations.

## License

Private library — Internal use only.
