import { ItemStack } from './ItemStack';

export { ItemStack } from './ItemStack';
export type { ItemStackProps } from './ItemStack.types';

/** @deprecated Renamed to `ItemStack` to avoid confusion with the `X2Stack` primitive. */
export const Stack = ItemStack;
/** @deprecated Renamed to `ItemStackProps`. */
export type { ItemStackProps as StackProps } from './ItemStack.types';
