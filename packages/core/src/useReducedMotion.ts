import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      if (isMounted) {
        setReducedMotion(enabled);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return reducedMotion;
}
