# Plan de adaptación visual y funcional inspirado en React Bits

## 1. Objetivo

Evolucionar `react-X2-native` desde una colección de componentes React Native funcionales hacia una librería visual coherente, configurable y documentada, inspirada en el modelo de React Bits y React Bits Pro.

El resultado debe combinar:

- Componentes visuales con animaciones y presets.
- Funcionalidad completa para aplicaciones reales.
- APIs consistentes y accesibles.
- Showcase interactivo.
- Componentes reutilizables sin duplicar variantes innecesariamente.

Referencias analizadas:

- [React Bits](https://reactbits.dev/)
- [Instalación de React Bits](https://reactbits.dev/get-started/installation)
- [React Bits Pro](https://pro.reactbits.dev/docs)
- [Application UI](https://pro.reactbits.dev/docs/app-ui)
- [Animated List](https://pro.reactbits.dev/docs/components/animated-list)
- [Dock](https://reactbits.dev/components/dock)

## 2. Estado actual

La app es un monorepo React Native/Expo organizado en:

- `packages/tokens`: colores, tipografías, spacing, radius, elevation y motion.
- `packages/core`: accesibilidad, safe area y reduced motion.
- `packages/ui`: primitivas y componentes.
- `apps/showcase`: catálogo interactivo.

Actualmente existen 29 componentes base y 19 pantallas de showcase. La implementación de la adaptación ya incorporó componentes de Application UI reutilizables sin crear variantes duplicadas.

Componentes existentes:

- Primitivas: `X2Text`, `X2Surface`, `X2Stack`, `X2Pressable`, `X2Icon`, `X2Divider`.
- Cards y efectos: `SpotlightCard`, `TiltedCard`, `ProfileCard`, `ExpandableCard`, `FeatureCard`, `StatsCard`, `ReviewCard`, `ProductCard`, `EventCard`, `GalleryCard`.
- Navegación: `Dock`, `Tabs`, `AnimatedTabs`, `SegmentedControl`, `Breadcrumbs`, `Stepper`, `BottomSheet`, `SideMenu`, `TabsVariants`.
- Colecciones: `Grid`, `Stack`, `Timeline`, `InfiniteList`.
- Overlays: `Modal`, `ContextMenu`, `Tooltip`, `Popover`, `OverlayBackdrop` interno compartido.
- Otros: `Carousel`, `AnimatedList`, `Accordion`.

La primera vertical slice de Application UI ya incluye `DataTable<T>`, `SearchField`, `FilterBar`, `EmptyState`, `Pagination`, `Toast`, `NotificationCenter`, `FormField`, `CommandMenu`, `DashboardCard` y `ChartCard`.

`DataTable<T>` integra ordenamiento, filtrado, selección, paginación, loading, empty state, acciones de fila, renderizado personalizado y variantes visuales.

La auditoría interna indica que los problemas P0/P1 principales fueron corregidos y que permanecen tareas P2/P3 relacionadas con calidad, arquitectura, testing, accesibilidad, tokens, overlays y showcase. Ver [MEJORAS_Y_CORRECCIONES.md](./MEJORAS_Y_CORRECCIONES.md).

## 3. Qué tomar de React Bits

React Bits separa tres niveles de producto:

1. Componentes visuales y animados.
2. Bloques completos de aplicación o marketing.
3. Plantillas y composiciones completas.

Cada componente se presenta con:

- Preview interactivo.
- Código editable.
- Controles de personalización.
- Tabla de props.
- Variantes.
- Dependencias explícitas.
- Ejemplos de uso.

La idea principal que se debe adoptar es que el código sea claro, copiable, editable y propiedad del proyecto consumidor. No se debe crear una capa opaca que obligue a depender de una implementación cerrada.

## 4. Decisión arquitectónica

No se recomienda crear un componente distinto para cada variante visual:

```text
Table1
Table2
TableWithFilters
TableWithSelection
```

Tampoco se recomienda construir un componente monolítico que intente resolver todos los tipos de UI.

La estrategia recomendada es:

```text
Primitivas
  ↓
Infraestructura de comportamiento
  ↓
Componente público por tipo
  ↓
Variantes, presets y composiciones
```

### Regla general

Debe existir un componente público por responsabilidad o tipo de interacción. Las diferencias visuales y las capacidades opcionales deben resolverse mediante props, slots, render props y presets.

### Ejemplo: DataTable

La API pública recomendada es un único componente genérico:

```tsx
<DataTable<User>
  data={users}
  columns={columns}
  variant="glass"
  density="comfortable"
  selectable
  sortable
  filterable
  pagination
  onRowPress={handleRowPress}
/>
```

Internamente puede dividirse en piezas como:

```text
DataTable
├── DataTableToolbar
├── DataTableHeader
├── DataTableRow
├── DataTableCell
├── DataTablePagination
└── DataTableEmptyState
```

Al principio estas piezas pueden permanecer internas. Solo deben exponerse si aparecen casos reales de composición.

## 5. Organización de componentes

### Primitivas

Mantener las primitivas como base de toda la librería:

- `X2Text`
- `X2Surface`
- `X2Stack`
- `X2Pressable`
- `X2Icon`
- `X2Divider`

Crear además bases internas o públicas cuando sean necesarias:

- `X2Card`
- `X2Interactive`
- `X2Overlay`
- `X2LoadingState`
- `X2EmptyState`

### Cards y efectos

Mantener separados los componentes con comportamientos distintos, pero compartir infraestructura interna:

- `SpotlightCard` y `TiltedCard` deben compartir un `InteractiveCardFrame` interno.
- `ProfileCard`, `ProductCard`, `StatsCard`, `ReviewCard`, `EventCard` y `GalleryCard` deben apoyarse en una base visual común.
- Los efectos visuales deben seguir siendo componentes independientes: un componente por efecto, con props claras y presets.

### Navegación

- Unificar gradualmente `AnimatedTabs` y `TabsVariants` en una API `Tabs` con variantes.
- Mantener `Dock` separado porque representa navegación persistente y tiene otra semántica.
- Mantener `Breadcrumbs` y `Stepper` separados.
- Mantener `BottomSheet` y `SideMenu` separados por sus distintos gestos y posicionamiento.

### Colecciones

Mantener componentes separados porque resuelven problemas diferentes:

- `Stack`: composición lineal.
- `Grid`: colección en columnas.
- `InfiniteList`: virtualización y paginación.
- `Timeline`: representación semántica de eventos.

Todos deben ser genéricos, aceptar `keyExtractor` y evitar `any`.

### Overlays

Mantener APIs públicas separadas:

- `Modal`
- `BottomSheet`
- `Popover`
- `Tooltip`
- `ContextMenu`
- `SideMenu`

Pero compartir internamente:

- Portal o host de overlays.
- Backdrop.
- Safe area.
- Medición del anchor.
- Cálculo de posición.
- Animación de entrada y salida.
- Manejo de `onRequestClose`.

## 6. Dirección visual

La adaptación debe tomar el lenguaje visual de React Bits y traducirlo a interacción mobile:

- Fondo oscuro como primera clase.
- Superficies tipo glass.
- Bordes sutiles y radios amplios.
- Gradientes y acentos luminosos.
- Tipografía de alto contraste.
- Spacing generoso.
- Animaciones de presión, selección, entrada y transición.
- Presets visuales reutilizables.
- Reduced motion siempre soportado.
- Tema claro, oscuro y preferencia del sistema.

Los efectos basados en cursor o hover deben convertirse en:

- Presión.
- Pulsación prolongada.
- Drag.
- Swipe.
- Movimiento del dedo.
- Reacción al scroll.

No conviene copiar literalmente efectos web que no tengan una buena traducción a touch o que generen problemas de rendimiento en dispositivos móviles.

## 7. Funcionalidad mínima por componente

Cada componente público debe definir explícitamente:

- Props controladas y no controladas.
- Estado `disabled`.
- Estados `loading`, `empty` y `error` cuando corresponda.
- Callbacks y eventos.
- `testID`.
- Labels y hints de accesibilidad configurables.
- Soporte de reduced motion.
- Soporte de tema.
- Safe area cuando corresponda.
- Manejo correcto de Android back button.
- Comportamiento ante cambios de tamaño y rotación.
- Soporte para contenido personalizado mediante `children`, slots o render props.

## 8. Plan de implementación

### Fase 0 — Estabilización

- Resolver definitivamente TypeScript, dependencias y build.
- Eliminar artefactos compilados dentro de `src`.
- Migrar estilos estáticos a `StyleSheet`.
- Actualizar ESLint y configurar reglas de hooks.
- [x] Incorporar Jest y Testing Library con una smoke suite ejecutable desde `native`.
- Cubrir primero overlays, tabs, accordion, `X2Text` y `X2Pressable`.

### Fase 1 — Sistema visual

- [ ] Rediseñar tokens para el nuevo lenguaje visual.
- [x] Añadir tokens `onPrimary`, `onSurface`, `onError` y equivalentes.
- [ ] Centralizar springs, duraciones y easings.
- [x] Añadir `theme="system"`.
- [ ] Crear una base visual común para cards y superficies interactivas.
- [x] Reducir colores fijos repartidos por los componentes principales.
- [x] Hacer configurables los textos de accesibilidad de overlays.

### Fase 2 — Infraestructura de comportamiento

- [x] Consolidar `useSelectionIndicator`.
- [x] Crear infraestructura común de overlays con `OverlayBackdrop`.
- Mejorar medición y posicionamiento de Popover, Tooltip y ContextMenu.
- [x] Centralizar backdrop, safe area y animación de presencia.
- Usar gestos de forma consistente en cards, bottom sheets y componentes dragables.
- Definir contratos comunes de estados y eventos.

### Fase 3 — Componentes funcionales nuevos

Prioridad recomendada:

1. `DataTable<T>` ✅
2. `FilterBar` ✅
3. `SearchField` ✅
4. `Pagination` ✅
5. `EmptyState` ✅
6. `Toast` o `NotificationCenter` ✅
7. `FormField` ✅
8. `CommandMenu` ✅
9. `DashboardCard` ✅
10. `ChartCard` ✅

### Fase 4 — Reorganización de APIs

- [x] Crear API unificada `Tabs`.
- [x] Mantener aliases para las APIs existentes durante una transición.
- [x] Unificar variantes mediante tipos reutilizables, incluyendo `archivero`.
- Reemplazar `any` por genéricos.
- Revisar claves, render props y callbacks.
- Evitar duplicación de lógica entre componentes relacionados.

### Fase 5 — Showcase estilo React Bits

Reemplazar el showcase actual basado en un único `ScrollView` por un catálogo más realista:

- [x] Una navegación agrupada por familia.
- Preview aislado por componente.
- [x] Controles de props en las nuevas pantallas y componentes.
- Selector de tema.
- Selector de variante y densidad.
- Ejemplos controlados y no controlados.
- Ejemplos de accesibilidad.
- Ejemplos de reduced motion.
- Dependencias y requisitos de plataforma.
- Documentación de props.
- Presets visuales.

Las pantallas basadas en `FlatList` no deben vivir dentro de un `ScrollView` padre para conservar la virtualización.

### Fase 6 — Documentación y distribución

- Crear documentación por componente.
- Incluir preview, API, props, estados, dependencias y ejemplos.
- Documentar limitaciones de Android, iOS y web.
- Documentar gestos y accesibilidad.
- Mantener código fuente editable y fácil de copiar.
- Preparar exportaciones estables desde `packages/ui`.

## 9. Criterios de aceptación

La adaptación se considera completa cuando:

- La librería tiene un lenguaje visual consistente.
- Cada componente tiene una API documentada.
- Las variantes visuales no generan duplicación de componentes.
- `DataTable<T>` soporta ordenamiento, filtros, selección, paginación, estados vacíos y loading.
- Todos los overlays gestionan correctamente cierre, medición, safe area y Android back.
- Los componentes respetan reduced motion.
- Los componentes importantes tienen una primera cobertura de tests: `FormField`, `CommandMenu`, `DataTable`, `Toast`, `Tabs` y cierre de overlays.
- El showcase permite probar las principales props sin editar código.
- El showcase no produce warnings de listas virtualizadas anidadas.
- El sistema soporta tema claro, oscuro y del sistema.
- No hay `any` en las APIs públicas.
- No hay textos de accesibilidad rígidos que impidan internacionalización.

## 10. Decisión final

La estrategia elegida es:

> Un componente público por tipo o responsabilidad, con variantes configurables, presets visuales y piezas internas reutilizables.

No se crearán componentes como `Table1`, `Table2` o `Table3`. Se creará un `DataTable<T>` completo, con una arquitectura interna modular y una API pública clara.
