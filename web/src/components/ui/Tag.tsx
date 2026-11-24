import React from "react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[11px] leading-none tracking-wider text-muted ${className}`}
    >
      {children}
    </span>
  );
}
