/**
 * Responsive utility functions for React Native
 * Provides screen-aware sizing and responsive scaling
 */

import { useEffect, useState } from 'react';
import { Dimensions, PixelRatio, Platform, ScaledSize } from 'react-native';

// Base dimensions (iPhone 14 Pro as reference)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Get initial dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Breakpoints for different device categories
 */
export const BREAKPOINTS = {
  /** Small phones (iPhone SE, older Android) */
  SMALL_PHONE: 375,
  /** Regular phones */
  PHONE: 428,
  /** Large phones / small tablets */
  LARGE_PHONE: 480,
  /** Tablets */
  TABLET: 768,
  /** Large tablets / desktop */
  DESKTOP: 1024,
} as const;

/**
 * Hook to get current screen dimensions with orientation support
 */
export function useScreenDimensions(): ScaledSize {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription.remove();
  }, []);

  return dimensions;
}

/**
 * Hook to detect if current device is a tablet
 */
export function useIsTablet(): boolean {
  const { width, height } = useScreenDimensions();
  const minDimension = Math.min(width, height);
  return minDimension >= BREAKPOINTS.TABLET;
}

/**
 * Hook to detect if device is in landscape orientation
 */
export function useIsLandscape(): boolean {
  const { width, height } = useScreenDimensions();
  return width > height;
}

/**
 * Device category based on screen width
 */
export type DeviceCategory =
  | 'small_phone'
  | 'phone'
  | 'large_phone'
  | 'tablet'
  | 'desktop';

/**
 * Hook to get current device category
 */
export function useDeviceCategory(): DeviceCategory {
  const { width } = useScreenDimensions();

  if (width < BREAKPOINTS.SMALL_PHONE) return 'small_phone';
  if (width < BREAKPOINTS.PHONE) return 'phone';
  if (width < BREAKPOINTS.LARGE_PHONE) return 'large_phone';
  if (width < BREAKPOINTS.TABLET) return 'tablet';
  return 'desktop';
}

/**
 * Width percentage - Convert percentage to screen width pixels
 * @param percentage - Percentage of screen width (0-100)
 */
export function wp(percentage: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * percentage) / 100);
}

/**
 * Height percentage - Convert percentage to screen height pixels
 * @param percentage - Percentage of screen height (0-100)
 */
export function hp(percentage: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * percentage) / 100);
}

/**
 * Responsive width - Scale value based on screen width relative to base design
 * @param size - Size in base design pixels
 */
export function rw(size: number): number {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scale);
}

/**
 * Responsive height - Scale value based on screen height relative to base design
 * @param size - Size in base design pixels
 */
export function rh(size: number): number {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return PixelRatio.roundToNearestPixel(size * scale);
}

/**
 * Moderate scale - Scale with a factor to prevent extreme scaling
 * Good for fonts and icons that shouldn't scale too aggressively
 * @param size - Size in base design pixels
 * @param factor - Scaling factor (0-1, default 0.5)
 */
export function moderateScale(size: number, factor: number = 0.5): number {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size + (scale - 1) * size * factor;
  return PixelRatio.roundToNearestPixel(newSize);
}

/**
 * Font scale - Scale font size with moderate scaling for readability
 * Accounts for user's font scale preferences
 * @param size - Font size in base design
 */
export function fontScale(size: number): number {
  const scaledSize = moderateScale(size, 0.3);
  // Respect user font scale settings on Android
  if (Platform.OS === 'android') {
    return scaledSize / PixelRatio.getFontScale();
  }
  return scaledSize;
}

/**
 * Icon scale - Scale icon size moderately
 * @param size - Icon size in base design
 */
export function iconScale(size: number): number {
  return moderateScale(size, 0.4);
}

/**
 * Check if screen is considered "small"
 */
export function isSmallScreen(): boolean {
  return SCREEN_WIDTH < BREAKPOINTS.SMALL_PHONE;
}

/**
 * Check if device is a tablet
 */
export function isTablet(): boolean {
  const { width, height } = Dimensions.get('window');
  const minDimension = Math.min(width, height);
  return minDimension >= BREAKPOINTS.TABLET;
}

/**
 * Get responsive value based on device category
 * @param values - Object with values for different device categories
 */
export function responsiveValue<T>(values: {
  small?: T;
  phone?: T;
  large?: T;
  tablet?: T;
  desktop?: T;
  default: T;
}): T {
  const { width } = Dimensions.get('window');

  if (width >= BREAKPOINTS.DESKTOP && values.desktop !== undefined) {
    return values.desktop;
  }
  if (width >= BREAKPOINTS.TABLET && values.tablet !== undefined) {
    return values.tablet;
  }
  if (width >= BREAKPOINTS.LARGE_PHONE && values.large !== undefined) {
    return values.large;
  }
  if (width >= BREAKPOINTS.SMALL_PHONE && values.phone !== undefined) {
    return values.phone;
  }
  if (values.small !== undefined) {
    return values.small;
  }
  return values.default;
}
