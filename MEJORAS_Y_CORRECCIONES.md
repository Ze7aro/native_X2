# Mejoras y correcciones — react-X2-native

Análisis del monorepo (`packages/tokens`, `packages/core`, `packages/ui`, `apps/showcase`) tras la actualización a Expo SDK 57 / React 19.2 / React Native 0.86 / Reanimated 4.5.

> **Estado (2026-09-30):** P0 y P1 corregidos. `pnpm type-check` pasa en los 4 paquetes, `expo-doctor` 18/18, y `expo export` empaqueta Android e iOS. Pendiente: P2 y P3, y probar en dispositivo.
>
> Cambios de API derivados de P1: `Carousel` pierde `loop` (no estaba implementado) y gana `showCounter`; `Grid` aplica `style` a la lista y acepta `contentContainerStyle`; `Grid`/`InfiniteList` son genéricos y aceptan `keyExtractor` (por defecto `item.id`); `Tooltip` se abre con pulsación larga y se oculta solo; `BottomSheet` usa el mayor `snapPoint` como altura máxima y se cierra arrastrando el handle.

Prioridades:
- **P0 – Crítico**: rompe la app o impide compilar.
- **P1 – Alto**: bug visible para el usuario / componente que no funciona como se anuncia.
- **P2 – Medio**: calidad, accesibilidad, mantenibilidad.
- **P3 – Bajo**: limpieza y pulido.

---

## P0 — Crítico

### 1. Dependencias duplicadas de React / React Native / Reanimated en `packages/ui`
`packages/ui/package.json` declara como **dependencies** y **devDependencies** versiones antiguas:

| Paquete | App (`apps/showcase`) | Instalado en `packages/ui/node_modules` |
|---|---|---|
| react | 19.2.3 | **18.3.1** |
| react-native | 0.86.3 | **0.72.17** |
| react-native-reanimated | 4.5.1 | **3.19.5** |
| react-native-safe-area-context | 5.7.0 | **4.14.1** |

Consecuencias: dos copias de React → error *"Invalid hook call"*; dos copias de módulos nativos → *"Reanimated/SafeArea already registered"* o crashes; y `tsc` en `packages/ui` da **167 errores** (`'View' cannot be used as a JSX component`) por mezclar `@types/react` 18 con RN 0.86.

**Solución** — en una librería, lo nativo y React deben ser `peerDependencies`:
```jsonc
// packages/ui/package.json
"peerDependencies": {
  "react": ">=19",
  "react-native": ">=0.80",
  "react-native-reanimated": ">=4",
  "react-native-worklets": "*",
  "react-native-safe-area-context": ">=5"
},
"dependencies": {
  "@react-x2-native/tokens": "workspace:*",
  "@react-x2-native/core": "workspace:*"
},
"devDependencies": {
  "@types/react": "~19.2.4",
  "react": "19.2.3",
  "react-native": "0.86.3",
  "react-native-reanimated": "4.5.1",
  "react-native-worklets": "*",           // misma versión que instale expo
  "react-native-safe-area-context": "~5.7.0",
  "typescript": "~6.0.3"
}
```
Lo mismo aplica a `packages/core` (usa `react`, `react-native` y `react-native-safe-area-context` pero **no declara ninguna**; hoy funciona solo por `shamefully-hoist=true`).

Después: borrar `node_modules` de todos los paquetes y `pnpm install`.

### 2. Falta `SafeAreaProvider` en la app
`Dock`, `BottomSheet` y `SideMenu` usan `useSafeAreaInsets()`. Sin `<SafeAreaProvider>` en la raíz, `react-native-safe-area-context` v5 **lanza un error** al abrir esas pantallas.
Además `SafeAreaView` de `react-native` ([App.tsx:2](apps/showcase/src/App.tsx:2)) está deprecado en RN 0.8x.

**Solución** ([App.tsx:199](apps/showcase/src/App.tsx:199)):
```tsx
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// ...
<SafeAreaProvider>
  <ThemeProvider theme={theme}>...</ThemeProvider>
</SafeAreaProvider>
```

### 3. El cambio de tema (Light/Dark) no funciona
[App.tsx:35](apps/showcase/src/App.tsx:35) — `AppContent` tiene su propio `useState` de `theme`, y el `App` padre ([App.tsx:200](apps/showcase/src/App.tsx:200)) tiene otro que nunca se modifica. Los botones cambian el estado local y el `ThemeProvider` sigue siempre en `'light'`.

**Solución**: mantener un solo estado en `App` y pasar `theme`/`setTheme` a `AppContent` por props (o exponer `setTheme` desde el contexto del tema).

### 4. TypeScript inconsistente: los paquetes no compilan
- La raíz declara `typescript ^5.3` (instalado 5.9.3) y la app `~6.0.3`.
- [tsconfig.json:3](tsconfig.json:3) usa `"ignoreDeprecations": "6.0"`, que **TS 5.9 rechaza** → `tsc` falla en `tokens`, `core` y `ui` (error TS5103).
- Con TS 6, `packages/ui` además da errores `TS6059 ... is not under 'rootDir'` porque los `paths` apuntan al `src` de otros paquetes.

**Solución**:
- Unificar `typescript: "~6.0.3"` en la raíz y en todos los paquetes.
- En [tsconfig.json](tsconfig.json): cambiar `"moduleResolution": "node"` → `"bundler"`, quitar `baseUrl` y `ignoreDeprecations` (ambos deprecados en TS 6), quitar `"DOM"` de `lib`.
- Usar **project references** (`composite: true` + `references`) o eliminar los `paths` y resolver los paquetes vía `workspace:*` + su `dist`/`types`.
- Añadir `"react-x2-native"` a los `paths` si se mantienen (hoy falta).

### 5. `react-native-worklets` no está declarado
Reanimated 4 requiere `react-native-worklets` como peer. Hoy está en `node_modules` (0.10.4) solo por instalación automática de peers.

```bash
npx expo install react-native-worklets
```
No hace falta `babel.config.js`: `babel-preset-expo` ya configura el plugin de worklets. Si se crea uno a mano, el plugin es `react-native-worklets/plugin` (ya no `react-native-reanimated/plugin`).

---

## P1 — Alto (bugs de componentes)

### AnimatedTabs — el indicador no se mueve al cambiar de pestaña
[AnimatedTabs.tsx:46-71](packages/ui/src/components/AnimatedTabs/AnimatedTabs.tsx:46) — la posición del indicador solo se calcula en `onLayout` de la pestaña activa. Al cambiar `activeTabId`, el layout no cambia y `onLayout` **no vuelve a dispararse** → el indicador se queda en la primera pestaña. El auto-scroll tiene el mismo problema.
**Solución**: guardar `{x, width}` de cada pestaña en un `useRef` desde `onLayout`, y en un `useEffect([activeTabId])` animar `indicatorX`/`indicatorWidth` y hacer `scrollTo`.
Limpieza: `activeIndex`, `tabRefs` y `runOnJS` no se usan.

### SegmentedControl — mismo bug + indicador desalineado
- [SegmentedControl.tsx:42-59](packages/ui/src/components/SegmentedControl/SegmentedControl.tsx:42): mismo problema de `onLayout` que AnimatedTabs.
- [SegmentedControl.tsx:97-99](packages/ui/src/components/SegmentedControl/SegmentedControl.tsx:97): `left: 4` + `translateX: x` suma dos veces el padding (el `x` del layout ya incluye el padding de 4) → desplazado 4 px a la derecha. `top: 4` + `height: '100%'` se sale 8 px por abajo. Usar `left: 0, top: 4, bottom: 4` sin `height`.
- Texto seleccionado con color fijo `'#FFF'` (línea 138) → usar un token (p. ej. `onPrimary`).
- `accessibilityRole="radio"` debería usar `accessibilityState={{ checked }}`, no `selected`.

### TabsVariants — el indicador "underline" nunca aparece
[TabsVariants.tsx:39-65](packages/ui/src/components/TabsVariants/TabsVariants.tsx:39) — `indicatorX` e `indicatorWidth` **nunca se asignan** → el indicador tiene ancho 0. Además está fuera del `ScrollView`, así que no seguiría el scroll. Guardar también la `x` en `handleTabLayout` y animar en un `useEffect([activeTabId])`; mover el indicador dentro del contenido del `ScrollView`.

### Carousel — hooks dentro de `.map()` y estado inicial incorrecto
- [Carousel.tsx:141-149](packages/ui/src/components/Carousel/Carousel.tsx:141): `useAnimatedStyle` dentro de `pages.map` **viola las reglas de los hooks** (el `eslint-disable` lo oculta; además ese plugin ni está instalado). Si cambia el número de páginas → crash. Extraer un componente `<Indicator active={...} />` con su propio hook.
- `initialPage` (línea 38) solo inicializa el estado; el `ScrollView` siempre arranca en la página 0. Usar `contentOffset={{ x: initialPage * width }}` o `scrollTo` tras el primer layout.
- `loop` (línea 30) se recibe pero no hace nada: implementarlo o quitarlo del tipo.
- `onScroll` + `setState` cada 16 ms (línea 46): al pulsar un indicador lejano dispara `onPageChange` en cada página intermedia. Usar `onMomentumScrollEnd`.
- Contador "1 / N" siempre visible: hacerlo opcional (`showCounter`).
- `Extrapolate`, `interpolate`, `withSpring`, `useSharedValue` importados y sin uso.

### ExpandableCard / Accordion — el modo controlado no anima
[ExpandableCard.tsx:64-98](packages/ui/src/components/ExpandableCard/ExpandableCard.tsx:64) — la altura solo se anima dentro de `handleHeaderPress`. Si `expanded` cambia **desde fuera** (modo controlado), no pasa nada.
Efecto visible: en `Accordion` con `allowMultiple={false}` ([Accordion.tsx:33](packages/ui/src/components/Accordion/Accordion.tsx:33)), al abrir una sección la anterior **se queda abierta visualmente** aunque su estado sea `false`.
**Solución**: animar en un `useEffect([isExpanded, contentHeight])` en lugar de en el handler. Simplificar la medición: usar `event.nativeEvent.layout.height` de `onLayout` en vez de `runOnUI(measure)`. `containerRef` no se usa.
Además `restSpeedThreshold` / `restDisplacementThreshold` **no hacen nada en Reanimated 4** (reemplazados por `energyThreshold`); lo mismo en SpotlightCard.

### Dock — indicador en posición incorrecta
[Dock.tsx:33-39](packages/ui/src/components/Dock/Dock.tsx:33) y [Dock.tsx:70-78](packages/ui/src/components/Dock/Dock.tsx:70) — la posición es `index * 60` desde `left: 0 + marginLeft: 16`, pero los ítems están centrados (`justifyContent: 'center'`) y con `gap` cuando `showLabels`. En cualquier pantalla más ancha que los ítems, el punto queda lejos del ítem activo. Medir la `x` de cada ítem con `onLayout` y centrar el punto (`x + itemWidth/2 - 2`).
- [Dock.tsx:92-97](packages/ui/src/components/Dock/Dock.tsx:92): `runOnJS(item.onPress)()` desde el hilo JS es innecesario; llamar `item.onPress()` directamente. La animación también se duplica con el `useEffect`.

### BottomSheet y SideMenu — cierre roto
[BottomSheet.tsx:37-52](packages/ui/src/components/BottomSheet/BottomSheet.tsx:37), [SideMenu.tsx:37-52](packages/ui/src/components/SideMenu/SideMenu.tsx:37):
1. **`onClose` se llama al montar** (el `useEffect` ejecuta `handleClose` cuando `isOpen` es `false`).
2. Al cerrar desde el backdrop, `onClose` se llama **dos veces** (una por el backdrop y otra por el effect cuando `isOpen` pasa a `false`).
3. La animación de salida **nunca se ve**: `<Modal visible={isOpen}>` se oculta inmediatamente.
4. `setTimeout` sin limpiar al desmontar.
5. **Tocar dentro del panel lo cierra**: `pointerEvents="box-none"` en el panel deja pasar los toques al `Pressable` del backdrop.
6. Sin `onRequestClose` → el botón "atrás" de Android no cierra.

**Solución**: separar backdrop y panel como hermanos (backdrop `Pressable` con `StyleSheet.absoluteFill`, panel encima); mantener un estado interno `mounted` que se pone a `false` cuando termina la animación de salida (callback de `withSpring`/`withTiming` + `runOnJS`/`scheduleOnRN`); el effect solo debe animar, nunca llamar `onClose`.
Otros: `snapPoints` se ignora; el "drag handle" no se puede arrastrar (usar `Gesture.Pan()` de gesture-handler, que hoy está instalado pero **sin usar en ningún archivo**); `-300` fijo vs ancho `280`; `rgba(0,0,0,0.5)` fijo en vez de `colors.overlay`.

### Modal — tocar el contenido lo cierra y no cabe en móvil
[Modal.tsx:63-66](packages/ui/src/components/Modal/Modal.tsx:63): el `Pressable` interno con `pointerEvents="box-none"` deja pasar los toques al backdrop → tocar un área vacía del modal lo cierra. Quitar `pointerEvents` y usar `onPress={() => {}}` (o hermanos como en BottomSheet).
- [Modal.tsx:25-29](packages/ui/src/components/Modal/Modal.tsx:25): anchos fijos de 340/450 px se salen de la pantalla en la mayoría de teléfonos. Usar `width: '90%'` + `maxWidth`.
- [Modal.tsx:119](packages/ui/src/components/Modal/Modal.tsx:119): texto de acciones `'#FFF'` → invisible en variantes `outline`/`ghost` en tema claro. Destructivo `'#EF4444'` → usar `colors.error`.
- Falta `onRequestClose`. `key={index}` en acciones. El `useMemo` depende de `config`, un objeto nuevo en cada render.

### SpotlightCard — el brillo sale desplazado
[SpotlightCard.tsx:126-137](packages/ui/src/components/SpotlightCard/SpotlightCard.tsx:126) aplica `top/left: -spotRadius` **y** el `interpolate` de las líneas 106-121 vuelve a restar `spotRadius` → el centro del brillo queda `spotRadius` px arriba-izquierda del dedo. Quitar `top/left` de `glowStyle`. (`interpolate` sobre `[0,w]→[-R,w-R]` equivale a `glowX - R`; se puede simplificar a eso.)
El efecto solo reacciona a `onPressIn`; para seguir el dedo hace falta un `Gesture.Pan()`.

### TiltedCard — no se inclina al mover el dedo
[TiltedCard.tsx:50-79](packages/ui/src/components/TiltedCard/TiltedCard.tsx:50): la inclinación se calcula solo en `onPressIn`. El hint de accesibilidad dice *"move to tilt"* pero no hay seguimiento del movimiento. Usar `Gesture.Pan()`.
Si se toca antes del primer layout, `dimensions` es 0 → división por cero (`NaN`). `{...props}` va después de `style`/`accessibility*`, así que un `props` puede pisarlos. `RNAnimated`, `viewRef`, `isPressed` sin uso.

### `useReducedMotion` usa la API equivocada
[useReducedMotion.ts:10](packages/core/src/useReducedMotion.ts:10) llama a `isScreenReaderEnabled()`. Los usuarios de lector de pantalla pierden todas las animaciones, y los que activaron "Reducir movimiento" no. Tampoco escucha cambios.
```ts
AccessibilityInfo.isReduceMotionEnabled().then(...);
const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReducedMotion);
return () => sub.remove();
```
Alternativa: `useReducedMotion` que exporta `react-native-reanimated`.

### `X2Text` quita la negrita a los títulos
[X2Text.tsx:34](packages/ui/src/primitives/X2Text.tsx:34): `fontWeight: weight` se aplica siempre; cuando `weight` es `undefined`, **pisa** el `fontWeight: '700'` de `headingXL`…`headingS` y el `'600'` de los `label*`. Solo añadirlo si está definido: `weight && { fontWeight: weight }`.
[X2Text.tsx:38](packages/ui/src/primitives/X2Text.tsx:38): `allowFontScaling={false}` desactiva el texto dinámico del sistema (accesibilidad) y deja sin efecto `maxFontSizeMultiplier`. Quitarlo y conservar `maxFontSizeMultiplier`; además, al ir después de `{...props}`, el consumidor no puede sobreescribirlo.

### `X2Pressable` variante `outline`
[X2Pressable.tsx:57-66](packages/ui/src/primitives/X2Pressable.tsx:57): `outline` usa el mismo fondo sólido que `solid` y el borde por defecto es `transparent` → no se distingue de `solid`. Para `outline`: fondo `transparent` y `borderColor ?? colors.primary`. `accessibilityState={{ disabled }}` sobrescribe el `accessibilityState` del consumidor (hacer merge).

### Overlays posicionados (Popover, Tooltip, ContextMenu)
- **Popover** [Popover.tsx:44-61](packages/ui/src/components/Popover/Popover.tsx:44): tamaños fijos (200×150) para posicionar y sin límite a los bordes de la pantalla; el primer frame aparece en `(0,0)` porque la medición es asíncrona; la animación de salida nunca se ve porque `{isOpen && <Modal>}` desmonta al instante (línea 104).
- **Tooltip** [Tooltip.tsx:107-112](packages/ui/src/components/Tooltip/Tooltip.tsx:107): abrir un `Modal` mientras el dedo está presionado cancela el toque en Android → `onPressOut` se dispara y el tooltip parpadea/cierra. `pointerEvents` no es una prop de `Modal`. Usar un overlay `View` absoluto con `pointerEvents="none"` (o un portal). `NodeJS.Timeout` (línea 30) → `ReturnType<typeof setTimeout>`; limpiar el timer al desmontar. Offsets fijos `-50`/`-100`.
- **ContextMenu** [ContextMenu.tsx:30-32](packages/ui/src/components/ContextMenu/ContextMenu.tsx:30): no se ajusta al borde inferior/derecho → en elementos al final de la pantalla el menú queda fuera. `'#EF4444'` → `colors.error`. Añadir `accessibilityActions` para que el menú sea accesible sin long-press.

### Colecciones
- **InfiniteList** [InfiniteList.tsx:58](packages/ui/src/components/InfiniteList/InfiniteList.tsx:58) y **Grid** [Grid.tsx:49](packages/ui/src/components/Grid/Grid.tsx:49): `keyExtractor` por índice → re-render y estado perdido al insertar/eliminar. Aceptar `keyExtractor` como prop o usar `item.id`.
- **InfiniteList** línea 63: `onEndReached` se dispara varias veces mientras `isLoading` es `true`; protegerlo.
- **Grid** [Grid.tsx:33-38](packages/ui/src/components/Grid/Grid.tsx:33) + 51-53: `marginHorizontal: gap/2` **y** `columnWrapperStyle.gap` → espaciado doble. `style` se aplica a `contentContainerStyle` (línea 54), confuso para el consumidor; exponer `contentContainerStyle` aparte.
- `renderItem` tipado como `any` en ambos: hacer los componentes genéricos (`Grid<T>`, `InfiniteList<T>`).

---

## P2 — Medio

### Configuración y build
- **Artefactos compilados dentro de `src/`**: hay 128 archivos `.js/.d.ts/.map` en `apps/showcase/src` y `packages/core/src`. El script `"build": "tsc"` de la app no tiene `outDir` y escribe junto a los `.tsx`. Cambiarlo a `"type-check": "tsc --noEmit"` (una app Expo no necesita `tsc` para compilar), borrar esos archivos y añadir al `.gitignore`:
  ```
  apps/showcase/src/**/*.js
  apps/showcase/src/**/*.d.ts
  apps/showcase/src/**/*.map
  packages/*/src/**/*.js
  packages/*/src/**/*.d.ts
  packages/*/src/**/*.map
  ```
- **`packages/ui/dist` sucio**: contiene `dist/core`, `dist/tokens`, `dist/ui` además de `dist/components`, por los `paths` que arrastran código de otros paquetes a la compilación. Se resuelve con el punto P0-4.
- **Metro consume `dist`**: `packages/ui` tiene `"main": "dist/index.js"`, así que los cambios en `src` no se ven en la app sin recompilar. Añadir `"react-native": "src/index.ts"` (o `exports` con condición `react-native`) en los tres paquetes para que Metro use el código fuente en desarrollo.
- **`app.json`**: `"sdkVersion"` sobra (se deduce de `expo`); `"supportsTabletMode"` no existe → es `"supportsTablet"`; `com.example.*` no se puede publicar en las tiendas.
- **`@types/react-native`** (app y ui): obsoleto desde RN 0.71 (RN trae sus tipos) y puede chocar. Eliminarlo.
- **`.gitignore`**: la línea `*.pnpm-lock.yaml` no tiene sentido (el lockfile es `pnpm-lock.yaml` y **sí** debe versionarse). Añadir `ios/` y `android/` de la app si se usa CNG/prebuild.
- **`react-native-gesture-handler`** está instalado pero no se usa. O se usa (BottomSheet, TiltedCard, SpotlightCard) envolviendo la app en `<GestureHandlerRootView style={{ flex: 1 }}>`, o se elimina.
- **`packageManager: pnpm@8.15.0`**: pnpm 8 está fuera de soporte; actualizar a pnpm 10 (y revisar si `shamefully-hoist` sigue siendo necesario tras arreglar los peers; Expo SDK 5x soporta el layout aislado de pnpm).
- Verificar el estado general con:
  ```bash
  npx expo-doctor
  npx expo install --fix
  ```
  *Corrección a lo dicho antes*: `expo prebuild --clean` no es necesario si usas Expo Go; solo genera las carpetas nativas `ios/`/`android/`.

### Tooling
- **ESLint 8** está fuera de soporte; migrar a ESLint 9 con flat config (`eslint.config.js`) y `eslint-config-expo`, que incluye `react-hooks` (habría detectado el bug de Carousel).
- Script `lint` de la app: el glob `src/**/*.{ts,tsx}` sin comillas lo expande la shell; usar `eslint "src/**/*.{ts,tsx}"` o simplemente `eslint src`.
- **No hay tests**, aunque existe el script `test`. Añadir `jest-expo` + `@testing-library/react-native` y empezar por los bugs de esta lista (Accordion single-mode, BottomSheet `onClose`, X2Text `fontWeight`).
- `.prettierrc.json` existe pero ningún paquete tiene script `format`.

### Tema
- [ThemeContext.tsx:27](packages/ui/src/theme/ThemeContext.tsx:27): `value={{ theme, colors }}` crea un objeto nuevo en cada render → todos los consumidores se re-renderizan. Envolver en `useMemo`.
- Sin soporte de tema del sistema: aceptar `theme="system"` y usar `useColorScheme()`.
- `useTheme()` devuelve el tema claro en silencio si no hay provider; considerar un `console.warn` en `__DEV__`.
- Faltan tokens de color "sobre primario" (`onPrimary`, `onError`…). Hoy hay **21 colores fijos** (`'#FFF'`, `'#EF4444'`, `'#000'`) repartidos en 13 componentes que no responden al tema.
- [colors.ts:52](packages/tokens/src/colors.ts:52): `success` en oscuro es `#30B0C0` (turquesa) — probablemente debía ser verde (`#30D158`). En oscuro `primaryVariant` (#6BB6FF) es más claro que `primaryLight` (#5BA3FF): nombres invertidos.
- [motion.ts:14-25](packages/tokens/src/motion.ts:14): los `easing` son strings CSS, inutilizables con Reanimated. Exponerlos como tuplas `[x1, y1, x2, y2]` para `Easing.bezier(...)`, o eliminarlos. Los componentes tampoco usan `motion.duration`; los resortes `{ damping: 15, mass: 1 }` están repetidos en ~15 sitios → centralizarlos en `tokens/motion`.

### Accesibilidad
- `getAccessibilityRole` ([accessibility.ts:48](packages/core/src/accessibility.ts:48)) convierte cualquier rol desconocido en `'button'` en silencio. Como el tipo ya es `AccessibilityRole`, la función sobra.
- `Accordion` pasa el estado como `accessibilityHint="Expanded"` ([Accordion.tsx:108](packages/ui/src/components/Accordion/Accordion.tsx:108)); el estado ya va en `accessibilityState.expanded`. El hint debe describir la acción.
- Textos de accesibilidad en inglés fijos ("Close modal", "Page 1", "Double tap to…"): permitir sobreescribirlos por props para i18n.
- RN 0.8x recomienda las props `role`, `aria-*` sobre `accessibilityRole`/`accessibilityState`; migrar gradualmente.

### Showcase
- Todas las pantallas se renderizan dentro de un `ScrollView` ([App.tsx:62](apps/showcase/src/App.tsx:62)); `Grid` e `InfiniteList` (FlatList) dentro de él generan el warning *"VirtualizedLists should never be nested"* y pierden la virtualización. Usar `expo-router` o `@react-navigation` con una pantalla por componente.
- `SafeAreaView` + `ScrollView` + `Dock`/`BottomSheet` dentro del scroll no representan un uso real; en pantallas propias se verían mejor.
- Texto fijo "Phase 3 … (19 of 19 complete) ✅" en el footer.

---

## P3 — Bajo (limpieza)

- Imports sin uso: `X2Icon` y `radius` (BottomSheet), `radius` (SideMenu), `runOnJS` (AnimatedTabs, Dock), `Extrapolate`/`interpolate`/`withSpring`/`useSharedValue` (Carousel), `useEffect`, `NativeScrollEvent`, `NativeSyntheticEvent` (TabsVariants), `RNAnimated` (TiltedCard), `Pressable`, `AccordionSection` (Accordion).
- `Extrapolate` y `Layout` son alias **deprecados** en Reanimated 4: usar `Extrapolation` y `LinearTransition` ([AnimatedList.tsx:6](packages/ui/src/components/AnimatedList/AnimatedList.tsx:6), [SpotlightCard.tsx:12](packages/ui/src/components/SpotlightCard/SpotlightCard.tsx:12)).
- En Reanimated 4, `runOnJS`/`runOnUI` se sustituyen por `scheduleOnRN`/`scheduleOnUI` de `react-native-worklets`.
- `AnimatedList` ([AnimatedList.tsx:43](packages/ui/src/components/AnimatedList/AnimatedList.tsx:43)): `delay(index * 50)` sin tope → el elemento 100 tarda 5 s en aparecer. Limitar (p. ej. `Math.min(index, 10) * 50`).
- Tipos `any` en eventos (`TiltedCard:51`, `SpotlightCard:52`, `Carousel:42`): usar `GestureResponderEvent` / `LayoutChangeEvent`.
- `key={index}` en [ProfileCard.tsx:103](packages/ui/src/components/ProfileCard/ProfileCard.tsx:103) y Modal.
- `X2Stack` alinea al centro por defecto ([X2Stack.tsx:18](packages/ui/src/primitives/X2Stack.tsx:18)); en una columna eso encoge los hijos. `'stretch'` es el valor por defecto esperado en RN.
- `X2Icon` renderiza el `name` como texto (emojis/caracteres). Documentarlo o integrar `@expo/vector-icons`.
- Estilos inline creados en cada render en casi todos los componentes; mover los estáticos a `StyleSheet.create`.
- `marginRight: index === options.length - 1 ? 0 : 0` ([SegmentedControl.tsx:132](packages/ui/src/components/SegmentedControl/SegmentedControl.tsx:132)) no hace nada.
- Documentos sin versionar en la raíz (`PHASE2_REVIEW.md`, `PHASE3_PLAN.md`, `PHASE3_SUMMARY.md`): moverlos a `docs/` o decidir si se versionan.

---

## Orden de trabajo sugerido

1. **Dependencias** (P0-1, P0-5, quitar `@types/react-native`) → reinstalar limpio.
2. **TypeScript** (P0-4) → que `pnpm type-check` pase en los 4 paquetes.
3. **App** (P0-2, P0-3) → la app arranca y el tema cambia.
4. **Limpieza de artefactos** en `src/` y scripts de build.
5. **Bugs P1** empezando por primitivas (`X2Text`, `X2Pressable`, `useReducedMotion`), luego navegación (Tabs, SegmentedControl, Dock), luego overlays.
6. **ESLint 9 + react-hooks** y primeros tests para fijar los bugs corregidos.
7. P2/P3 de forma incremental.
