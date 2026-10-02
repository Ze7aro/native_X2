# Phase 3: Extended Component Families

Expanding react-X2-native with 19 new components organized into 4 families: Cards, Navigation, Collections, and Overlays.

## Overview

**Objective:** Provide a comprehensive set of specialized components for common UI patterns
**Components:** 19 new components
**Duration Estimate:** 4-5 hours
**Total Library Components After Phase 3:** 29 (10 MVP + 19 Extended)

---

## Family 1: Extended Cards (6 components)

### 1. FeatureCard
**Description:** Showcase features with icon, title, description  
**Props:**
- `icon`: ReactNode - Feature icon
- `title`: string - Feature title  
- `description`: string - Feature description
- `onPress`: callback
- `backgroundColor`: string
- `variant`: 'default' | 'compact' | 'highlighted'

**Specs:**
- Icon: 48x48 or 64x64 depending on variant
- Vertical layout: icon → title → description
- Optional press handler
- Spring animations on press (damping: 15)

---

### 2. StatsCard
**Description:** Display metrics/statistics with animated counters  
**Props:**
- `label`: string - Stat label
- `value`: number - Stat value
- `unit`: string - Optional unit (%, €, etc.)
- `trend`: 'up' | 'down' | 'neutral' - Visual indicator
- `trendValue`: string - "12% increase"

**Specs:**
- Horizontal layout: value prominent + label below
- Animated value changes with counter animation
- Trend indicator with icon + color
- Monospace font for numbers

---

### 3. ReviewCard
**Description:** Display user reviews with rating and text  
**Props:**
- `author`: string - Reviewer name
- `avatar`: ReactNode
- `rating`: 1-5 - Star rating
- `text`: string - Review text
- `date`: string - Review date
- `onPress`: callback

**Specs:**
- Avatar + author name + date in header
- Star rating display (5-star system)
- Review text with truncation option
- Optional press handler

---

### 4. ProductCard
**Description:** E-commerce product display  
**Props:**
- `image`: ReactNode - Product image
- `title`: string - Product name
- `price`: string - Product price
- `originalPrice`: string - Strike-through price
- `rating`: number - Star rating
- `inStock`: boolean
- `onAddToCart`: callback
- `onPress`: callback

**Specs:**
- Image with overlay on press
- Price with discount indicator
- Stock status
- Action button (Add to Cart)

---

### 5. EventCard
**Description:** Display upcoming events with date/time  
**Props:**
- `title`: string - Event name
- `date`: string - Event date
- `time`: string - Event time
- `location`: string - Event location
- `attendees`: number - Attendee count
- `image`: ReactNode - Event cover
- `onPress`: callback
- `onRegister`: callback

**Specs:**
- Cover image at top
- Event info overlay
- Date/time/location in grid
- Register button

---

### 6. GalleryCard
**Description:** Display multiple images in grid/carousel  
**Props:**
- `images`: Array<{ id, uri, title }>
- `title`: string
- `onImagePress`: callback
- `onViewAll`: callback
- `maxVisible`: number (default: 4)

**Specs:**
- Grid layout for images
- "+X more" indicator if > maxVisible
- Tap to expand full gallery
- Light gallery with zoom capability

---

## Family 2: Extended Navigation (5 components)

### 7. Breadcrumbs
**Description:** Navigation breadcrumbs for hierarchy  
**Props:**
- `items`: Array<{ id, label, onPress }>
- `separator`: string (default: '/')
- `maxItems`: number - Ellipsis if exceeded
- `onNavigate`: callback

**Specs:**
- Horizontal scroll if too long
- Separator between items
- Last item not clickable (current page)
- Ellipsis for hidden items

---

### 8. Stepper
**Description:** Step-by-step progress indicator  
**Props:**
- `steps`: Array<{ id, label, description? }>
- `currentStep`: number
- `onStepPress`: callback
- `variant`: 'horizontal' | 'vertical'
- `showLabels`: boolean

**Specs:**
- Circle with step number
- Connection lines between steps
- Color coding: completed/current/pending
- Optional descriptions
- Completed steps show checkmark

---

### 9. BottomSheet
**Description:** Modal bottom sheet with drag handle  
**Props:**
- `isOpen`: boolean
- `onClose`: callback
- `children`: ReactNode
- `snapPoints`: number[] - Snap positions
- `header`: ReactNode
- `enableBackdropPress`: boolean

**Specs:**
- Drag handle at top
- Smooth pan gesture with spring physics
- Backdrop with opacity
- Safe area bottom support
- Half-screen to full-screen snap points

---

### 10. SideMenu
**Description:** Collapsible side navigation drawer  
**Props:**
- `isOpen`: boolean
- `onClose`: callback
- `items`: Array<{ id, label, icon, onPress }>
- `header`: ReactNode
- `footer`: ReactNode

**Specs:**
- Slide-in animation from left
- Backdrop to close
- Section dividers support
- Safe area inset support

---

### 11. TabsVariants
**Description:** Additional tab styles (pill, segmented variants)  
**Variants:**
- Pill tabs with background
- Underline tabs (current AnimatedTabs)
- Background fill tabs
- Icon-only tabs

**Props:** Same as AnimatedTabs + variant selection

---

## Family 3: Extended Collections (4 components)

### 12. Grid
**Description:** Multi-column grid layout  
**Props:**
- `items`: Array<any>
- `renderItem`: (item, index) => ReactNode
- `numColumns`: number (default: 2)
- `gap`: number
- `onEndReached`: callback
- `scrollEnabled`: boolean

**Specs:**
- FlatList-based implementation
- Dynamic column count
- Equal-width columns
- Separator support
- Pull-to-refresh support

---

### 13. Stack
**Description:** Vertical/horizontal stack with customization  
**Props:**
- `items`: Array<any>
- `renderItem`: (item) => ReactNode
- `direction`: 'vertical' | 'horizontal'
- `spacing`: number
- `dividers`: boolean
- `scrollEnabled`: boolean

**Specs:**
- Simple wrapper around items
- Automatic dividers between items
- Scroll support for overflow
- Consistent spacing

---

### 14. Timeline
**Description:** Vertical timeline for events/milestones  
**Props:**
- `items`: Array<{ id, title, description, timestamp, icon?, status }>
- `renderItem`: callback
- `onItemPress`: callback

**Specs:**
- Vertical line connecting items
- Timeline markers (circle/diamond)
- Alternating layout (L/R)
- Color coded by status
- Timestamps on each item

---

### 15. InfiniteList
**Description:** Virtualized infinite scroll list  
**Props:**
- `items`: Array<any>
- `renderItem`: (item) => ReactNode
- `onEndReached`: callback
- `gap`: number
- `loadMoreThreshold`: number
- `isLoading`: boolean

**Specs:**
- Virtual list (only visible items rendered)
- Loading indicator at bottom
- Pull-to-refresh support
- Empty state support

---

## Family 4: Overlays (4 components)

### 16. Modal
**Description:** Centered modal dialog  
**Props:**
- `isOpen`: boolean
- `onClose`: callback
- `title`: string
- `children`: ReactNode
- `actions`: Array<{ label, onPress, variant }>
- `size`: 'small' | 'medium' | 'large'

**Specs:**
- Centered on screen
- Backdrop with opacity
- Smooth fade-in/out
- Action buttons at bottom
- Close button (X)

---

### 17. ContextMenu
**Description:** Long-press context menu  
**Props:**
- `actions`: Array<{ id, label, icon, onPress, color? }>
- `children`: ReactNode
- `onOpen`: callback
- `onClose`: callback

**Specs:**
- Long-press activation
- Popover-style menu
- Icon support per action
- Color-coded destructive actions
- Haptic feedback on long-press

---

### 18. Tooltip
**Description:** Information tooltip on hover/press  
**Props:**
- `text`: string - Tooltip text
- `children`: ReactNode
- `position`: 'top' | 'bottom' | 'left' | 'right'
- `backgroundColor`: string
- `delay`: number - Delay before show

**Specs:**
- Position relative to trigger
- Arrow pointing to trigger
- Auto-hide after 5s
- Press to show/hide
- Smooth fade animation

---

### 19. Popover
**Description:** Floating content popover  
**Props:**
- `isOpen`: boolean
- `onClose`: callback
- `anchor`: ReactNode - Trigger element
- `children`: ReactNode - Popover content
- `position`: 'top' | 'bottom' | 'left' | 'right'
- `offset`: number

**Specs:**
- Arrow pointing to anchor
- Positioned relative to anchor
- Backdrop to close
- Smooth animations
- Auto-close on outside press

---

## Implementation Order

### Wave 1 (Cards - ~1.5 hours)
1. FeatureCard
2. StatsCard
3. ReviewCard
4. ProductCard
5. EventCard
6. GalleryCard

### Wave 2 (Navigation - ~1.5 hours)
7. Breadcrumbs
8. Stepper
9. BottomSheet
10. SideMenu
11. TabsVariants

### Wave 3 (Collections - ~1 hour)
12. Grid
13. Stack
14. Timeline
15. InfiniteList

### Wave 4 (Overlays - ~1 hour)
16. Modal
17. ContextMenu
18. Tooltip
19. Popover

---

## File Structure

```
packages/ui/src/components/
├── FeatureCard/
│   ├── FeatureCard.tsx
│   ├── FeatureCard.types.ts
│   └── FeatureCard.showcase.tsx
├── StatsCard/
├── ReviewCard/
├── ProductCard/
├── EventCard/
├── GalleryCard/
├── Breadcrumbs/
├── Stepper/
├── BottomSheet/
├── SideMenu/
├── TabsVariants/
├── Grid/
├── Stack/
├── Timeline/
├── InfiniteList/
├── Modal/
├── ContextMenu/
├── Tooltip/
└── Popover/
```

---

## Export Updates

Update `packages/ui/src/index.ts` to export all new components.

---

## Documentation

- Update COMPONENTS.md with all 19 new components
- Update README.md Phase 3 progress
- Create showcase screens for each component family

---

## Testing Checklist

- [ ] All components compile without errors
- [ ] TypeScript strict mode passes
- [ ] All components have proper accessibility attributes
- [ ] Motion reduction respected in all animated components
- [ ] Theme colors applied correctly
- [ ] testID support added to all components
- [ ] Showcase app displays all new components

---

## Success Criteria

- ✅ 19 new components implemented
- ✅ Full accessibility support
- ✅ Motion reduction respect
- ✅ TypeScript strict mode
- ✅ Comprehensive showcase
- ✅ Production-ready code quality

---

## Implementation Status ✅ COMPLETE

**Wave 1: Extended Cards (6/6 Complete)**
- ✅ FeatureCard - 3 variants (default, compact, highlighted)
- ✅ StatsCard - With trend indicators
- ✅ ReviewCard - With star ratings
- ✅ ProductCard - E-commerce pattern
- ✅ EventCard - With registration
- ✅ GalleryCard - With lazy loading

**Wave 2: Extended Navigation (5/5 Complete)**
- ✅ Breadcrumbs - With ellipsis support
- ✅ Stepper - Horizontal/vertical layouts
- ✅ BottomSheet - Snap points & animations
- ✅ SideMenu - Slide-in drawer
- ✅ TabsVariants - 4 visual styles (underline, pill, background, icon-only)

**Wave 3: Extended Collections (4/4 Complete)**
- ✅ Grid - Multi-column FlatList
- ✅ Stack - Vertical/horizontal with dividers
- ✅ Timeline - Status indicators & milestones
- ✅ InfiniteList - Virtual scrolling with pagination

**Wave 4: Overlays (4/4 Complete)**
- ✅ Modal - Customizable dialog
- ✅ ContextMenu - Long-press menu
- ✅ Tooltip - Delayed tooltips
- ✅ Popover - Floating content

**Total: 29 Components in Library (10 MVP + 19 Extended)**

### Code Quality
- ✅ TypeScript strict mode
- ✅ Accessibility WCAG compliant
- ✅ Motion reduction support
- ✅ Theme integration
- ✅ testID on all components
- ✅ Spring animations (damping: 15)

### Documentation
- ✅ COMPONENTS.md updated
- ✅ Showcase screens (4 new)
- ✅ Type definitions
- ✅ API documentation

### Testing
- ✅ All components compile
- ✅ No TypeScript errors
- ✅ Showcase app demonstrates all
- ✅ Accessibility tested

**Phase 3 Ready for Production** 🎉

