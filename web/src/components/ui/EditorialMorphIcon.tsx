"use client";

import { MorphIcon, type MorphIconProps } from "morphicons/react";

export function EditorialMorphIcon({
  spring = "smooth",
  reducedMotion = "user",
  color = "currentColor",
  strokeWidth = 1.6,
  className = "shrink-0",
  ...props
}: MorphIconProps) {
  return (
    <MorphIcon
      spring={spring}
      reducedMotion={reducedMotion}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
