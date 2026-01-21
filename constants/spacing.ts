/**
 * Consistent spacing system for the app
 * Use these values instead of magic numbers throughout the app
 */

export const SPACING = {
  /** 4px - Extra small spacing */
  xs: 4,
  /** 8px - Small spacing */
  sm: 8,
  /** 12px - Medium-small spacing */
  ms: 12,
  /** 16px - Medium spacing (default) */
  md: 16,
  /** 20px - Medium-large spacing */
  ml: 20,
  /** 24px - Large spacing */
  lg: 24,
  /** 32px - Extra large spacing */
  xl: 32,
  /** 40px - 2x extra large spacing */
  xxl: 40,
  /** 48px - 3x extra large spacing */
  xxxl: 48,
} as const;

/**
 * Common border radius values
 */
export const RADIUS = {
  /** 4px - Small radius */
  sm: 4,
  /** 8px - Medium radius */
  md: 8,
  /** 12px - Large radius */
  lg: 12,
  /** 16px - Extra large radius */
  xl: 16,
  /** 24px - 2x extra large radius */
  xxl: 24,
  /** 9999px - Full/pill radius */
  full: 9999,
} as const;

/**
 * Common sizes for interactive elements
 */
export const HIT_SLOP = {
  /** Standard hit slop for small buttons */
  standard: { top: 10, bottom: 10, left: 10, right: 10 },
  /** Large hit slop for important actions */
  large: { top: 20, bottom: 20, left: 20, right: 20 },
} as const;

/**
 * Icon sizes
 */
export const ICON_SIZE = {
  /** 16px - Small icons */
  sm: 16,
  /** 20px - Medium-small icons */
  ms: 20,
  /** 24px - Medium icons (default) */
  md: 24,
  /** 28px - Medium-large icons */
  ml: 28,
  /** 32px - Large icons */
  lg: 32,
  /** 40px - Extra large icons */
  xl: 40,
  /** 48px - 2x extra large icons */
  xxl: 48,
} as const;

/**
 * Common button heights
 */
export const BUTTON_HEIGHT = {
  /** 36px - Small button */
  sm: 36,
  /** 44px - Medium button */
  md: 44,
  /** 52px - Large button */
  lg: 52,
  /** 56px - Extra large button */
  xl: 56,
} as const;

/**
 * Input field heights
 */
export const INPUT_HEIGHT = {
  /** 44px - Dense input */
  dense: 44,
  /** 56px - Standard input */
  standard: 56,
  /** 72px - Large input */
  large: 72,
} as const;

export type SpacingKey = keyof typeof SPACING;
export type RadiusKey = keyof typeof RADIUS;
export type IconSizeKey = keyof typeof ICON_SIZE;
