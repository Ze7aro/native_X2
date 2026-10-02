import React from 'react';
import { TabsVariants } from '../TabsVariants';
import type { TabsProps } from './Tabs.types';

/** Unified tabs API. Existing AnimatedTabs and TabsVariants remain compatible aliases. */
export function Tabs(props: TabsProps) {
  return <TabsVariants {...props} />;
}
