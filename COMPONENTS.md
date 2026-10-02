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

The current smoke suite runs with Jest and React Native Testing Library:

```bash
cd native
pnpm test
```

It covers `FormField`, `CommandMenu`, `DataTable`, `Toast`/`ToastProvider`, the `Tabs` variant `archivero`, dialogs (`ConfirmDialog`, `StepDialog`), overlays (`OverlayProvider`, async `Modal` actions, `dismissible`, Android back button), localization and a guard against hard-coded hex colors. The suite is intentionally focused on public behavior and can be expanded as new interaction contracts are added.

## DataTable

Generic data table for application UI with sorting, selection, pagination, loading and empty states.

```tsx
import { DataTable, DataTableColumn } from 'react-x2-native';

const columns: DataTableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
  { id: 'role', header: 'Role', accessor: (user) => user.role },
];

<DataTable
  data={users}
  columns={columns}
  selectionMode="multiple"
  pageSize={10}
  variant="glass"
  onRowPress={(user) => openUser(user.id)}
/>
```

### Features

- Generic `DataTable<T>` API with typed columns.
- Custom cell renderers with `renderCell`.
- Ascending, descending and reset sorting.
- Single or multiple row selection.
- Client-side pagination.
- Loading and empty states.
- Row actions and row press callbacks.
- `plain`, `outlined` and `glass` variants.
- Compact and comfortable densities.

## SearchField and FilterBar

Reusable search and filtering controls for application UI components.

```tsx
<FilterBar
  searchValue={query}
  onSearchChange={setQuery}
  searchPlaceholder="Search users"
>
  <SegmentedControl options={filters} selectedId={activeFilter} onSelect={setActiveFilter} />
</FilterBar>
```

`DataTable` can render a built-in `FilterBar` with `filterable`, or consumers can compose the controls externally for custom filtering.

## EmptyState

Reusable empty content for tables, lists, searches and first-run screens.

```tsx
<EmptyState
  icon={<X2Icon name="◇" size={32} />}
  title="No projects found"
  description="Try changing the search or create a new project."
  action={<X2Pressable onPress={createProject}>Create project</X2Pressable>}
/>
```

## Pagination

Reusable page navigation for tables, lists and search results.

```tsx
<Pagination
  page={page}
  pageCount={totalPages}
  onPageChange={setPage}
  testID="users-pagination"
/>
```

`DataTable` uses this component internally when `pageSize` is enabled, while standalone consumers can use it with any paginated data source.

## App setup (providers)

Mount the providers once, near the root. Order matters:

```tsx
<GestureHandlerRootView style={{ flex: 1 }}>
  <SafeAreaProvider>
    <ThemeProvider theme="light">
      <X2StringsProvider strings={esStrings}>   {/* optional: texts */}
        <ToastProvider>                          {/* optional: global toasts */}
          <OverlayProvider>                      {/* optional: overlays without native <Modal> */}
            <App />
          </OverlayProvider>
        </ToastProvider>
      </X2StringsProvider>
    </ThemeProvider>
  </SafeAreaProvider>
</GestureHandlerRootView>
```

All three are optional. Without them every component keeps working (English texts, native `<Modal>`, local `Toast`).
`ToastProvider` is placed outside `OverlayProvider` so toasts render above modals and sheets.

## Overlays: OverlayProvider

`Modal`, `BottomSheet`, `Popover`, `Tooltip`, `ContextMenu`, `SideMenu` and `CommandMenu` draw through `OverlayLayer`:

- **With `OverlayProvider`:** content is portaled to a host view in the app tree. No native `<Modal>`, so overlays stack predictably, share the app's context and can be tested like normal views.
- **Without it:** falls back to React Native's `<Modal>` (previous behavior).
- **Android back button:** handled by the provider. Only the topmost overlay receives it, and a blocked overlay (`dismissible={false}`) still consumes it. When no overlay is open it is not intercepted, so navigation works as usual.

Notes:

- Mount it inside `ThemeProvider` and the safe-area provider so portaled content keeps its context.
- Its root should fill the screen: `Popover`, `Tooltip` and `ContextMenu` position themselves from window coordinates.
- `OverlayLayer` is exported for custom overlays: `<OverlayLayer visible={open} onRequestClose={close}>…</OverlayLayer>`.

## Modal

```tsx
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Save changes"
  actions={[
    { label: 'Cancel', variant: 'outline', onPress: () => setOpen(false) },
    { label: 'Save', onPress: async () => { await api.save(); } },
  ]}
  onActionError={(error) => toast.error(String(error))}
/>
```

| Prop | Default | Description |
| --- | --- | --- |
| `actions[].onPress` | | May return a promise. |
| `actions[].autoClose` | `true` | Close after `onPress` succeeds. |
| `dismissible` | `true` | `false` blocks backdrop, back button and close button. |
| `keyboardAvoiding` | `true` | Lifts the card above the keyboard. |
| `onActionError` | rethrows | Called when an action throws or rejects. The modal stays open. |
| `actions[].disabled` | `false` | Greys the action out and ignores presses. |
| `closeLabel` | from strings | Accessible label of backdrop and close button. |

Async actions: while the promise is pending the action shows a spinner, the other actions are disabled and the modal cannot be dismissed. On success it closes (unless `autoClose={false}`); on failure it stays open and calls `onActionError`.

## ConfirmDialog

Confirmation built on `Modal`, for actions that are destructive or hard to undo.

```tsx
<ConfirmDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Delete project"
  description="You are about to delete Apollo."
  consequences={['All files are removed', 'Members lose access']}
  requireText="Apollo"
  destructive
  confirmLabel="Delete"
  onConfirm={async () => { await api.deleteProject(); }}
  onError={(error) => toast.error(String(error))}
/>
```

| Prop | Default | Description |
| --- | --- | --- |
| `onConfirm` | required | May be async. The dialog is busy (and cannot be dismissed) until it resolves, then closes. |
| `requireText` | | The user must type this exact text (case-sensitive, trimmed) to enable the confirm button. |
| `consequences` | | Bullet list of what will happen. |
| `destructive` | `false` | Styles the confirm button as destructive. |
| `onError` | | Called when `onConfirm` throws. The dialog stays open and shows the error so the user can retry. |
| `confirmLabel`, `cancelLabel`, `requireTextLabel` | from strings | Localized by default (`confirm`, `cancel`, `typeToConfirm`). |

The typed text and the error are cleared when the dialog closes.

## StepDialog

Multi-step dialog (wizard) built on `Modal`, with a progress bar and "Step N of M" label.

```tsx
<StepDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  title="New workspace"
  onFinish={async () => { await api.createWorkspace(); }}
  steps={[
    { id: 'welcome', title: 'Welcome', content: <Intro /> },
    {
      id: 'email',
      title: 'Owner email',
      canContinue: email.includes('@'),
      onNext: async () => { await api.checkEmail(email); },
      content: <FormField label="Email" value={email} onChangeText={setEmail} />,
    },
    { id: 'review', title: 'Review', content: <Summary /> },
  ]}
/>
```

- **Buttons:** the first step shows Cancel and Next, middle steps Back and Next, and the last step Back and Finish.
- **`canContinue: false`** disables Next/Finish until the step is valid.
- **`onNext`** runs before moving on (or before `onFinish` on the last step). It may be async; if it throws, the dialog stays on that step and shows the error.
- **`onFinish`** may be async. The dialog closes when it resolves and stays open if it throws.
- **Controlled step:** pass `step` and `onStepChange`. Without `step` the dialog manages it and returns to `initialStep` when closed.
- **Labels:** `backLabel`, `nextLabel`, `finishLabel`, `cancelLabel` default to the localized strings (`back`, `next`, `finish`, `cancel`, `stepOf`).

Both dialogs reuse `Modal` actions, so they also work with `OverlayProvider`, Android back button handling and `dismissible` locking while busy. `Modal` actions now accept `disabled`.

## BottomSheet

```tsx
<BottomSheet
  isOpen={open}
  onClose={() => setOpen(false)}
  snapPoints={[0.4, 0.9]}
  initialSnapIndex={0}
  onSnapChange={(index) => console.log(index)}
>
  <ScrollView>…</ScrollView>
</BottomSheet>
```

- **Without `snapPoints`:** the sheet is sized by its content (up to the screen height) and dragging down closes it.
- **With `snapPoints`:** fractions of the screen height. The sheet gets the largest height and can be dragged between the points (nearest point wins, using release velocity). Dragging below the lowest point closes it. Points are sorted ascending; `initialSnapIndex` and `onSnapChange` use that order. Put scrollable content in a `ScrollView`.
- `dismissible={false}` blocks backdrop, back button and closing by drag (snapping between points still works). `keyboardAvoiding` (default `true`) lifts the sheet above the keyboard.

## Texts (i18n)

Every fixed text in the library lives in `X2Strings` (`enStrings` is the default, `esStrings` is included).

```tsx
<X2StringsProvider strings={esStrings}>…</X2StringsProvider>
<X2StringsProvider strings={{ clearSearch: 'Reset' }}>…</X2StringsProvider>  {/* partial is fine */}
```

A component's own prop always wins over the provider (`closeLabel`, `clearLabel`, `placeholder`, `dateLabel`, `timeLabel`, `locationLabel`, `registerLabel`, `addToCartLabel`, `unavailableLabel`, `outOfStockLabel`, …). Read strings in your own components with `useX2Strings()`.

## Color tokens

No component hard-codes colors. Besides the base palette, the theme provides `scrim`, `scrimStrong` (dark layers over images) and `onScrim` (text on them). A test fails if a `#hex` literal is added under `packages/ui/src/components`.

## Toast and NotificationCenter

Notifications semánticas para confirmaciones, advertencias, errores y actualizaciones informativas.

```tsx
const { notifications, notify, dismiss } = useNotificationCenter();

notify({
  title: 'Saved',
  message: 'Your changes were saved successfully.',
  variant: 'success',
  action: { label: 'Undo', onPress: undoChanges },
});

<NotificationCenter
  notifications={notifications}
  onDismiss={dismiss}
  position="top"
  maxVisible={3}
/>
```

`Toast` también puede utilizarse de forma independiente, controlada mediante `isVisible` o no controlada mediante `defaultVisible`. Incluye auto-dismiss, acción opcional, cierre accesible, variantes semánticas, safe area y reduced motion.

### Global toasts: ToastProvider and useToast

```tsx
<ToastProvider position="top" maxVisible={3}>…</ToastProvider>

const { toast, success, error, warning, info, dismiss, clear } = useToast();
success('Saved');
error('Could not save', { action: { label: 'Retry', onPress: retry } });
toast({ title: 'Update', message: 'New version', variant: 'info' });
```

Works from any screen: no local state or manual `NotificationCenter` needed. It stacks up to `maxVisible` toasts (extra ones wait), respects the safe area and returns the toast id from every call. Duration is 4 s, or 7 s for `error` (override with `duration`); errors use an `assertive` live region. `useToast` throws outside `ToastProvider`.

## FormField

Campo de formulario basado en `TextInput` con una API consistente para label, ayuda, errores y validación.

```tsx
<FormField
  label="Email"
  value={email}
  onChangeText={setEmail}
  required
  validateOn="blur"
  validate={(value) => value.includes('@') ? undefined : 'Invalid email'}
  helperText="We will only use this for account notifications."
/>
```

Soporta valores controlados y no controlados, validación en `change`, `blur` o `submit`, estados `disabled` y `loading`, adornos `prefix`/`suffix`, mensajes accesibles y estilos semánticos para error.

## CommandMenu

Menú de comandos para acciones frecuentes, búsqueda rápida y navegación por teclado.

```tsx
<CommandMenu
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={[
    {
      id: 'navigation',
      label: 'Navigation',
      items: [
        {
          id: 'settings',
          label: 'Open settings',
          keywords: ['preferences'],
          shortcut: '⌘,',
          onPress: openSettings,
        },
      ],
    },
  ]}
/>
```

Incluye filtrado por label, descripción, grupo y keywords; items deshabilitados o destructivos; estado vacío; acciones accesibles; y navegación mediante flechas, Enter y Escape cuando existe teclado físico.

## DashboardCard

Tarjeta de aplicación para métricas, tendencias y contenido contextual.

```tsx
<DashboardCard
  title="Monthly revenue"
  subtitle="Compared with the previous month"
  metric="$48,240"
  metricLabel="Total revenue"
  trend={{ direction: 'up', value: '+12.4%', label: 'this month' }}
  status="ready"
  variant="glass"
  onRetry={reloadData}
>
  <RevenueSummary />
</DashboardCard>
```

Incluye estados `ready`, `loading`, `empty` y `error`, contenido de reemplazo, retry, footer, acciones de encabezado, variantes `plain`/`outlined`/`glass` y soporte opcional de interacción.

## ChartCard

Tarjeta de métricas con gráficos de barras o líneas sin depender de una librería externa.

```tsx
<ChartCard
  title="Monthly revenue"
  data={monthlyRevenue}
  chartType="line"
  valueFormatter={(value) => `$${value}k`}
  onPointPress={(point) => inspect(point)}
  trend={{ direction: 'up', value: '+18%', label: 'vs previous period' }}
/>
```

Soporta selección de puntos, labels, grid, límites de escala, formatter de valores, gráfico personalizado y todos los estados de `DashboardCard`.

## Tabs

API unificada para pestañas con variantes visuales configurables.

```tsx
<Tabs
  tabs={tabs}
  activeTabId={activeTabId}
  onTabPress={setActiveTabId}
  variant="archivero"
>
  <ScreenContent />
</Tabs>
```

Variantes disponibles: `underline`, `pill`, `background`, `icon-only` y `archivero`. `AnimatedTabs` y `TabsVariants` se mantienen disponibles para compatibilidad durante la transición.
