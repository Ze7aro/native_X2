import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';

export interface OverlayEntry {
  id: string;
  node: ReactNode;
  onRequestClose?: () => void;
  testID?: string;
}

export interface OverlayStore {
  set: (entry: OverlayEntry) => void;
  remove: (id: string) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => readonly OverlayEntry[];
}

function createOverlayStore(): OverlayStore {
  let entries: readonly OverlayEntry[] = [];
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());

  return {
    set(entry) {
      const index = entries.findIndex((item) => item.id === entry.id);
      entries =
        index < 0 ? [...entries, entry] : entries.map((item, i) => (i === index ? entry : item));
      emit();
    },
    remove(id) {
      if (!entries.some((item) => item.id === id)) return;
      entries = entries.filter((item) => item.id !== id);
      emit();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => entries,
  };
}

const OverlayContext = createContext<OverlayStore | null>(null);

/** Returns the active overlay store, or null when no `OverlayProvider` is mounted. */
export function useOverlayStore(): OverlayStore | null {
  return useContext(OverlayContext);
}

function OverlayHost({ store }: { store: OverlayStore }) {
  const entries = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const hasOverlay = entries.length > 0;

  // Registered only while an overlay is open so it runs before navigation's own back handler.
  useEffect(() => {
    if (!hasOverlay) return undefined;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const top = store.getSnapshot().at(-1);
      if (!top) return false;
      top.onRequestClose?.();
      return true;
    });
    return () => subscription.remove();
  }, [hasOverlay, store]);

  if (!hasOverlay) return null;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {entries.map((entry, index) => (
        <View
          key={entry.id}
          pointerEvents="box-none"
          accessibilityViewIsModal
          testID={entry.testID}
          style={[StyleSheet.absoluteFill, { zIndex: index + 1 }]}
        >
          {entry.node}
        </View>
      ))}
    </View>
  );
}

/**
 * Draws overlays (Modal, BottomSheet, Popover, ...) in the app tree instead of RN's native `<Modal>`.
 * Mount it inside `ThemeProvider` (and the safe-area provider) so portaled content keeps its context.
 * Also owns the Android back button: only the topmost overlay receives it.
 */
export function OverlayProvider({ children }: { children: ReactNode }) {
  const store = useMemo(createOverlayStore, []);

  return (
    <OverlayContext.Provider value={store}>
      <View style={styles.root}>
        {children}
        <OverlayHost store={store} />
      </View>
    </OverlayContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
