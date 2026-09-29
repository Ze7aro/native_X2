# Components Documentation

## Phase 2: MVP Components (10 of 10) ✅ COMPLETE

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

### ExpandableCard

Expandable/collapsible content card with smooth height animations.

```tsx
import { ExpandableCard } from 'react-x2-native';

<ExpandableCard
  defaultExpanded={false}
  onToggle={(expanded) => console.log(expanded)}
  header={<X2Text>Click to expand</X2Text>}
>
  <X2Text>Content shown when expanded</X2Text>
</ExpandableCard>
```

#### Props

- `header`: ReactNode - Header element (always visible)
- `children`: ReactNode - Content to expand/collapse
- `expanded`: boolean - Controlled expansion state
- `defaultExpanded`: boolean - Initial state for uncontrolled (default: false)
- `onToggle`: callback - Called when toggling, returns boolean
- `disabled`: boolean - Disable interactions (default: false)
- `testID`: string

#### Behavior

- Smooth height animation with spring physics (damping: 15)
- Automatic height measurement via layout events
- Supports both controlled and uncontrolled modes
- Respects reduce motion preferences (instant state change)
- Divider between header and content
- Automatic content measurement on layout

#### Accessibility

- `accessibilityRole: 'button'` for header
- `accessibilityState: { expanded }` broadcasts state
- Screen reader announces expanded/collapsed status
- Proper semantic structure

### Dock

Horizontal navigation dock with animated active indicator and safe area support.

```tsx
import { Dock } from 'react-x2-native';

const items = [
  { id: 'home', label: 'Home', icon: <X2Icon name="🏠" /> },
  { id: 'search', label: 'Search', icon: <X2Icon name="🔍" /> },
  { id: 'add', label: 'Add', icon: <X2Icon name="➕" /> },
];

<Dock
  items={items.map(item => ({
    ...item,
    onPress: () => navigate(item.id)
  }))}
  activeId={activeId}
  showLabels={true}
/>
```

#### Props

- `items`: Array<{ id, label, icon, onPress }> - Navigation items
- `activeId`: string - Currently active item ID
- `backgroundColor`: string - Dock background color
- `indicatorColor`: string - Active indicator color
- `showLabels`: boolean - Show item labels (default: false)
- `testID`: string

#### Behavior

- Horizontal flex layout centered
- Animated indicator follows active item (spring, damping: 15)
- Respects safe area bottom inset
- Optional labels displayed below icons
- Touch feedback via opacity change
- 48px height without labels, 70px with labels

#### Accessibility

- Each item is a tab with `accessibilityRole: 'tab'`
- `accessibilityState: { selected }` for active item
- Item labels used as accessibility labels
- Proper semantic tab group structure

### AnimatedTabs

Tabbed navigation with animated indicator underline.

```tsx
import { AnimatedTabs } from 'react-x2-native';

const tabs = [
  { id: 'home', label: 'Home', icon: <X2Icon name="🏠" /> },
  { id: 'search', label: 'Search', icon: <X2Icon name="🔍" /> },
  { id: 'profile', label: 'Profile', icon: <X2Icon name="👤" /> },
];

<AnimatedTabs
  tabs={tabs}
  activeTabId={activeTab}
  onTabPress={setActiveTab}
  showIcons={true}
  indicatorColor={colors.primary}
  indicatorHeight={3}
>
  {/* Tab content here */}
</AnimatedTabs>
```

#### Props

- `tabs`: Array<{ id, label, icon? }> - Tab items
- `activeTabId`: string - Currently active tab
- `onTabPress`: callback - Called on tab selection
- `indicatorColor`: string - Indicator underline color
- `indicatorHeight`: number - Indicator height in pixels (default: 3)
- `showIcons`: boolean - Show tab icons (default: false)
- `disabled`: boolean - Disable interactions (default: false)
- `children`: ReactNode - Tab content area
- `testID`: string

#### Behavior

- Animated underline indicator (spring, damping: 15)
- Horizontal scrolling for many tabs
- Auto-scrolls active tab into view
- Optional icon support with labels
- Spring physics for smooth motion
- Respects reduce motion (instant state change)

#### Accessibility

- Tab role with proper semantics
- `accessibilityState: { selected }` for active tab
- Labels used for accessibility
- Proper focus management
- Screen reader support

### SegmentedControl

Compact multi-option selector with animated background indicator.

```tsx
import { SegmentedControl } from 'react-x2-native';

const options = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

<SegmentedControl
  options={options}
  selectedId={selected}
  onSelect={setSelected}
  selectedBackgroundColor={colors.primary}
/>
```

#### Props

- `options`: Array<{ id, label }> - Segment options
- `selectedId`: string - Currently selected option ID
- `onSelect`: callback - Called on selection
- `backgroundColor`: string - Container background color
- `selectedBackgroundColor`: string - Indicator background color
- `tintColor`: string - Optional tint color
- `disabled`: boolean - Disable interactions (default: false)
- `testID`: string

#### Behavior

- Animated background indicator (spring, damping: 15)
- Equal-width segments
- Smooth motion transitions
- Respects reduce motion preferences
- Radio-button semantics (single selection)
- Touch feedback via opacity

#### Accessibility

- Radio group semantics
- `accessibilityRole: 'radio'` per segment
- `accessibilityState: { selected }` for active
- Labels used for accessibility
- Full keyboard navigation support

### Carousel

Touch-paginated carousel with indicators and page tracking.

```tsx
import { Carousel } from 'react-x2-native';

const pages = [
  { id: 'page1', content: <YourContent1 /> },
  { id: 'page2', content: <YourContent2 /> },
  { id: 'page3', content: <YourContent3 /> },
];

<Carousel
  pages={pages}
  height={300}
  showIndicators={true}
  onPageChange={(index, id) => console.log(index, id)}
/>
```

#### Props

- `pages`: Array<{ id, content }> - Carousel pages
- `initialPage`: number - Starting page (default: 0)
- `height`: number - Carousel height in pixels (default: 300)
- `showIndicators`: boolean - Show page indicators (default: true)
- `indicatorColor`: string - Inactive indicator color
- `activeIndicatorColor`: string - Active indicator color
- `onPageChange`: callback - Called on page change
- `loop`: boolean - Enable infinite loop (default: false)
- `disabled`: boolean - Disable interactions (default: false)
- `testID`: string

#### Behavior

- Horizontal swipe for page navigation
- Page snapping with paging enabled
- Animated indicator dots
- Page counter display (e.g., "1 / 5")
- Indicator tap to jump to page
- Smooth scroll animations
- Efficient rendering (no re-renders on swipe)

#### Accessibility

- Radio role for indicators
- Page labels and navigation hints
- Full screen reader support
- Keyboard accessible

### AnimatedList

List with animated entry/exit animations for items.

```tsx
import { AnimatedList } from 'react-x2-native';

const items = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
];

<AnimatedList
  items={items}
  gap={16}
  animationDuration={300}
  renderItem={(item) => <YourItemComponent item={item} />}
/>
```

#### Props

- `items`: Array<{ id, content }> - List items
- `renderItem`: function - Custom item renderer
- `gap`: number - Gap between items (default: 12)
- `animationDuration`: number - Animation duration in ms (default: 300)
- `onItemPress`: callback - Item press handler
- `testID`: string

#### Behavior

- Fade in/up animation on entry
- Fade out/down animation on exit
- Staggered animations (50ms delay per item)
- Spring layout transitions
- Efficient rendering with no extra re-renders

### Accordion

Expandable sections with smooth animations and keyboard support.

```tsx
import { Accordion } from 'react-x2-native';

const sections = [
  {
    id: 'section1',
    title: 'Section 1',
    icon: <X2Icon name="▶" />,
    content: <X2Text>Content here</X2Text>,
  },
];

<Accordion
  sections={sections}
  expandedIds={expanded}
  onExpandChange={setExpanded}
  allowMultiple={true}
/>
```

#### Props

- `sections`: Array<{ id, title, content, icon? }> - Accordion sections
- `expandedIds`: string[] - Currently expanded sections
- `onExpandChange`: callback - Called when expansion changes
- `allowMultiple`: boolean - Allow multiple open sections (default: true)
- `disabled`: boolean - Disable all interactions
- `testID`: string

#### Behavior

- Smooth height animations for expand/collapse
- Optional section icons with rotation
- Single or multiple open sections mode
- Keyboard accessible
- Built on ExpandableCard for smooth animations

## Phase 2 Complete ✅
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
