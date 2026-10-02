import { useEffect, useState } from 'react';
import { cancelAnimation, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// Keeps content mounted until the exit animation finishes; `progress` goes 0 (hidden) → 1 (shown).
export function useAnimatedPresence(
  isOpen: boolean,
  { duration = 250, reducedMotion = false }: { duration?: number; reducedMotion?: boolean } = {},
) {
  const [mounted, setMounted] = useState(isOpen);
  const progress = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(progress);
    if (isOpen) {
      setMounted(true);
    }
    const target = isOpen ? 1 : 0;
    if (reducedMotion) {
      progress.value = target;
      if (!isOpen) setMounted(false);
      return;
    }
    progress.value = withTiming(target, { duration }, (finished) => {
      if (finished && target === 0) {
        scheduleOnRN(setMounted, false);
      }
    });
  }, [isOpen, duration, reducedMotion, progress]);

  return { mounted, progress };
}
