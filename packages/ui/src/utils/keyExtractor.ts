export function defaultKeyExtractor(item: unknown, index: number): string {
  if (item !== null && typeof item === 'object' && 'id' in item) {
    const id = (item as { id: unknown }).id;
    if (typeof id === 'string' || typeof id === 'number') return String(id);
  }
  return String(index);
}
