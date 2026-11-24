import React from "react";

interface StatusBadgeProps {
  label?: string;
}

export function StatusBadge({ label = "DISPONIBLE PARA PROYECTOS" }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-ink">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-green opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-status-green" />
      </span>
      <span className="hidden xl:inline">{label}</span>
    </div>
  );
}
