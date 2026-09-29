# Components Documentation

## Phase 2: MVP Components (3 of 10)

Interactive components with animations, gestures, and accessibility support.

### SpotlightCard

Interactive card with a glow effect that follows the user's touch.

```tsx
import { SpotlightCard } from 'react-x2-native';

<SpotlightCard
  intensity={0.8}
  radius={220}
  onPress={() => console.log('pressed')}
  onGlowMove={(x, y) => console.log(x, y)}
>
  <Text>Interactive Content</Text>
</SpotlightCard>
```

#### Props

- `intensity`: number (0-1) - Glow brightness (default: 0.8)
- `radius`: number - Glow blur radius in pixels (default: 220)
- `disabled`: boolean - Disable interactions (default: false)
- `onPress`: callback - Called when card is pressed
- `onGlowMove`: callback - Called when glow moves, returns (x, y)
- `accessibilityLabel`: string
- `accessibilityHint`: string
- `testID`: string

#### Behavior

- Glow follows finger movement with spring animation
- Scale slightly on press for feedback
- Automatically disables animations when reduce motion is enabled
- Spring damping: 20 for smooth, natural motion

#### Accessibility

- Fully accessible with screen reader support
- `accessibilityRole: 'button'`
- Supports accessibility hints and labels
- Proper disabled state broadcasting

### TiltedCard

Card with 3D perspective tilt that responds to touch position.

```tsx
import { TiltedCard } from 'react-x2-native';

<TiltedCard
  maxTilt={15}
  intensity={0.8}
  onPress={() => console.log('pressed')}
  onTilt={(x, y) => console.log(x, y)}
>
  <Text>Tilted Content</Text>
</TiltedCard>
```

#### Props

- `maxTilt`: number - Maximum rotation in degrees (default: 15)
- `intensity`: number (0-1) - How much the touch affects tilt (default: 0.8)
- `disabled`: boolean - Disable interactions (default: false)
- `onPress`: callback - Called when card is pressed
- `onTilt`: callback - Called when tilted, returns (rotateX, rotateY)
- `accessibilityLabel`: string
- `accessibilityHint`: string
- `testID`: string

#### Behavior

- Calculates tilt based on touch position relative to card center
- Uses perspective transform for 3D effect
- Automatically returns to center with spring animation on release
- Respects reduce motion preferences

#### Accessibility

- Fully accessible with screen reader support
- `accessibilityRole: 'button'`
- Proper state broadcasting

### ProfileCard

Composable card for displaying profile information with avatar, metadata, and actions.

```tsx
import { ProfileCard, X2Icon, X2Surface } from 'react-x2-native';

<ProfileCard
  avatar={
    <X2Surface backgroundColor={colors.primary}>
      <X2Icon name="👤" size={40} />
    </X2Surface>
  }
  title="John Developer"
  subtitle="Senior Engineer"
  description="Passionate about React Native"
  actions={[
    { label: 'Follow', onPress: () => {} },
    { label: 'Message', onPress: () => {}, variant: 'secondary' },
  ]}
>
  {/* Custom content between info and actions */}
</ProfileCard>
```

#### Props

- `avatar`: ReactNode - Avatar element (usually a surface with icon)
- `title`: string - Profile title (required)
- `subtitle`: string - Profile subtitle
- `description`: string - Profile description
- `actions`: Array of { label, onPress, variant? } - Action buttons
- `children`: ReactNode - Custom content area
- `testID`: string

#### Behavior

- Avatar displayed as 80x80 circle
- Title and metadata stacked on top
- Optional custom content with dividers
- Actions displayed horizontally at bottom
- Automatic dividers between sections

#### Accessibility

- Proper semantic structure
- Buttons accessible with labels
- Custom content inherits theme colors

## Upcoming Components

### ExpandableCard (Phase 2 - #4)
Expandable/collapsible content card with smooth height animations.

### Dock (Phase 2 - #5)
Horizontal navigation dock with active indicator and safe area support.

### AnimatedTabs (Phase 2 - #6)
Tabbed navigation with animated indicator underline.

### SegmentedControl (Phase 2 - #7)
Compact multi-option selector with smooth animations.

### Carousel (Phase 2 - #8)
Touch-paginated carousel with indicators and gesture support.

### AnimatedList (Phase 2 - #9)
List with entry/exit animations and virtualization support.

### Accordion (Phase 2 - #10)
Expandable sections with keyboard navigation and dynamic heights.

## Common Patterns

### Motion Respect

All components respect `useReducedMotion()`:

```tsx
import { useReducedMotion } from '@react-x2-native/core';

const reducedMotion = useReducedMotion();
if (reducedMotion) {
  // Disable animations, use instant state changes
}
```

### Accessibility

Components follow these patterns:

- Proper `accessibilityRole` for semantic meaning
- `accessibilityLabel` for screen readers
- `accessibilityHint` for interaction guidance
- `accessibilityState` for disabled/checked states
- `testID` for test automation

### Animation Performance

- Use Reanimated for 60 FPS animations
- Spring physics for natural motion
- Damping tuned for platform feel (iOS/Android)
- GPU-accelerated transforms only

### Theme Integration

All components use `useTheme()` for colors:

```tsx
const { colors } = useTheme();
```

Colors available:
- Primary (and variants)
- Surface variants
- Text (primary, secondary, tertiary)
- Semantic (success, warning, error, info)
- Divider, border

## Testing

All components support `testID` for finding elements:

```tsx
<SpotlightCard testID="spotlight-card-1">
  <Text>Content</Text>
</SpotlightCard>

// In tests:
const card = screen.getByTestId('spotlight-card-1');
```
