export const typography = {
  headingXL: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
  },
  headingL: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
  },
  headingM: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
  },
  headingS: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700' as const,
  },
  bodyL: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyM: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  bodyS: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  labelL: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
  labelM: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
  },
  labelS: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600' as const,
  },
} as const;

export type Typography = typeof typography;
