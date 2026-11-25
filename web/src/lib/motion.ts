export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export const SPLIT_LINE_DURATION = 0.7;
export const SPLIT_LINE_STAGGER = 0.08;

export const STACK_SCALE_RANGE = [1, 0.96] as const;
export const STACK_VEIL_RANGE = [0, 0.52] as const;
export const PARALLAX_OFFSET_RANGE = [-25, 25] as const;

export const ACCORDION_TRANSITION = {
  duration: 0.4,
  ease: EASE_EDITORIAL,
} as const;

export const TAB_TRANSITION = {
  duration: 0.25,
  ease: EASE_EDITORIAL,
} as const;
