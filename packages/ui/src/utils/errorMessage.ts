/** Human-readable message of a thrown value, or `fallback` when it carries none. */
export function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}
