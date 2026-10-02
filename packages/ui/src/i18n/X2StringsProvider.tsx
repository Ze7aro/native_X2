import React, { createContext, useContext, useMemo } from 'react';
import { enStrings } from './strings';
import type { X2Strings } from './strings';

const StringsContext = createContext<X2Strings>(enStrings);

/** Replaces the library's fixed texts. Pass a partial object; missing keys fall back to English. */
export function X2StringsProvider({
  strings,
  children,
}: {
  strings: Partial<X2Strings>;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ ...enStrings, ...strings }), [strings]);
  return <StringsContext.Provider value={value}>{children}</StringsContext.Provider>;
}

export function useX2Strings(): X2Strings {
  return useContext(StringsContext);
}
