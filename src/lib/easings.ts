/**
 * Revora Healthcare — Official Easing Curves
 * From: Official Design System & Animation Guide
 */

/** Expo Out — all scroll reveals, card lifts, hero text */
export const expoOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Bounce Out — button press, icon pop, counter ping */
export const bounceOut = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

/** Ease In-Out — carousel slide, gradient shift, counters */
export const easeInOut = [0.45, 0, 0.55, 1] as [number, number, number, number];

export const easings = {
  expoOut,
  bounceOut,
  easeInOut,
} as const;

export type EasingName = keyof typeof easings;

