"use client";

// No live visitors, adapted from Illos.dev (https://illos.dev/library/interface/no-live-visitors).
// License: https://illos.dev/license
// One SVG, zero external runtime dependencies. Customized with User, WhatsApp, LinkedIn, and Behance icons.

import { useEffect, useRef, type CSSProperties } from "react";

const SVG = `<svg class="if-no-live-visitors" xmlns="http://www.w3.org/2000/svg" width="568" height="356" viewBox="76 52 568 356" fill="none" stroke="#d6d6d9" role="img" aria-labelledby="if-no-live-visitors-t" aria-describedby="if-no-live-visitors-d" data-illos="flat/no-live-visitors" data-illos-id="ab2c35b8a4cd"><!-- Illos.dev illustration "No live visitors" (flat/no-live-visitors), ID ab2c35b8a4cd. License: https://illos.dev/license -->
<title id="if-no-live-visitors-t">Canales de contacto directo: WhatsApp, LinkedIn y Behance</title>
<desc id="if-no-live-visitors-d">Panel animado de contacto con indicador de disponibilidad activo y tarjetas deslizantes de WhatsApp, LinkedIn y Behance.</desc>
<style>@scope (svg.if-no-live-visitors) {
:scope{--_ground:#ffffff;--_ink:#2a2a2a;--_accent:#1daf9c;--_if-surface:#f7f7f8;--_if-raised:#ffffff;--_if-line:#d6d6d9;--_if-muted:#9a9aa0;--_if-bar:#e6e6e8;--_if-accent-fill:#e4fbf8;--_if-accent-mid:#84ebdd;--_if-cursor:#ffffff;--_if-cursor-edge:#2a2a2a;--_if-shadow:#2a2a2a}
@media (prefers-color-scheme: dark){:scope{--_ground:#101112;--_ink:#dadadc;--_accent:#3fdec9;--_if-surface:#1a1b1d;--_if-raised:#1f2023;--_if-line:#34363b;--_if-muted:#7c7d84;--_if-bar:#2a2b2f;--_if-accent-fill:#0f2e2a;--_if-accent-mid:#178c7d;--_if-cursor:#e9e9ea;--_if-cursor-edge:#101112;--_if-shadow:#101112}}
:scope{--_if-accent-auto-fill:color-mix(in oklab, var(--illos-accent) 12%, var(--illos-ground, var(--_ground)));--_if-accent-auto-mid:color-mix(in oklab, var(--illos-accent) 55%, var(--illos-ground, var(--_ground)))}
:scope{stroke:none}
@keyframes if-no-live-visitors_pulse{0%{opacity:0;transform:scale(1)}14.286%{opacity:0;transform:scale(1)}15.714%{opacity:1;transform:scale(1);animation-timing-function:cubic-bezier(0.23,1,0.32,1)}57.143%{opacity:0;transform:scale(2.6)}100%{opacity:0;transform:scale(1)}}
.pulse{transform-box:fill-box;transform-origin:50% 50%;opacity:0;transform:scale(1);animation:if-no-live-visitors_pulse 1.4s linear}
@keyframes if-no-live-visitors_r0{0%{transform:translate(0px,0.0px);opacity:1}7.143%{transform:translate(0px,0.0px);opacity:1;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}15.476%{transform:translate(0px,76.0px);opacity:1}40.476%{transform:translate(0px,76.0px);opacity:1;animation-timing-function:cubic-bezier(0.23,1,0.32,1)}47.619%{transform:translate(0px,102.6px);opacity:0}48.81%{transform:translate(-24px,0.0px);opacity:0}73.095%{transform:translate(-24px,0.0px);opacity:0}73.81%{transform:translate(-24px,0.0px);opacity:0}79.762%{transform:translate(-24px,0.0px);opacity:0;animation-timing-function:cubic-bezier(0.23,1,0.32,1)}86.905%{transform:translate(0px,0.0px);opacity:1}100%{transform:translate(0px,0.0px);opacity:1}}
.r0{transform:translate(0px,0.0px);opacity:1;animation:if-no-live-visitors_r0 4.199999999999999s linear}
@keyframes if-no-live-visitors_d0{0%{opacity:1;transform:scale(1)}7.143%{opacity:1;transform:scale(1);animation-timing-function:cubic-bezier(0.23,1,0.32,1)}14.286%{opacity:0;transform:scale(1)}73.095%{opacity:0;transform:scale(0.6)}73.81%{opacity:0;transform:scale(0.6)}86.905%{opacity:0;transform:scale(0.6);animation-timing-function:cubic-bezier(0.23,1,0.32,1)}91.667%{opacity:1;transform:scale(1)}100%{opacity:1;transform:scale(1)}}
.d0{transform-box:fill-box;transform-origin:50% 50%;opacity:1;transform:scale(1);animation:if-no-live-visitors_d0 4.199999999999999s linear}
@keyframes if-no-live-visitors_r1{0%{transform:translate(0px,76.0px);opacity:1}7.143%{transform:translate(0px,76.0px);opacity:1;animation-timing-function:cubic-bezier(0.23,1,0.32,1)}14.286%{transform:translate(0px,102.6px);opacity:0}15.476%{transform:translate(-24px,0.0px);opacity:0}39.762%{transform:translate(-24px,0.0px);opacity:0}40.476%{transform:translate(-24px,0.0px);opacity:0}46.429%{transform:translate(-24px,0.0px);opacity:0;animation-timing-function:cubic-bezier(0.23,1,0.32,1)}53.571%{transform:translate(0px,0.0px);opacity:1}73.81%{transform:translate(0px,0.0px);opacity:1;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}82.143%{transform:translate(0px,76.0px);opacity:1}100%{transform:translate(0px,76.0px);opacity:1}}
.r1{transform:translate(0px,76.0px);opacity:1;animation:if-no-live-visitors_r1 4.199999999999999s linear}
@keyframes if-no-live-visitors_d1{0%{opacity:0;transform:scale(1)}39.762%{opacity:0;transform:scale(0.6)}40.476%{opacity:0;transform:scale(0.6)}53.571%{opacity:0;transform:scale(0.6);animation-timing-function:cubic-bezier(0.23,1,0.32,1)}58.333%{opacity:1;transform:scale(1)}73.81%{opacity:1;transform:scale(1);animation-timing-function:cubic-bezier(0.23,1,0.32,1)}80.952%{opacity:0;transform:scale(1)}100%{opacity:0;transform:scale(1)}}
.d1{transform-box:fill-box;transform-origin:50% 50%;opacity:0;transform:scale(1);animation:if-no-live-visitors_d1 4.199999999999999s linear}
@keyframes if-no-live-visitors_r2{0%{transform:translate(-24px,0.0px);opacity:0}6.429%{transform:translate(-24px,0.0px);opacity:0}7.143%{transform:translate(-24px,0.0px);opacity:0}13.095%{transform:translate(-24px,0.0px);opacity:0;animation-timing-function:cubic-bezier(0.23,1,0.32,1)}20.238%{transform:translate(0px,0.0px);opacity:1}40.476%{transform:translate(0px,0.0px);opacity:1;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}48.81%{transform:translate(0px,76.0px);opacity:1}73.81%{transform:translate(0px,76.0px);opacity:1;animation-timing-function:cubic-bezier(0.23,1,0.32,1)}80.952%{transform:translate(0px,102.6px);opacity:0}82.143%{transform:translate(-24px,0.0px);opacity:0}100%{transform:translate(-24px,0.0px);opacity:0}}
.r2{transform:translate(-24px,0.0px);opacity:0;animation:if-no-live-visitors_r2 4.199999999999999s linear}
@keyframes if-no-live-visitors_d2{0%{opacity:0;transform:scale(1)}6.429%{opacity:0;transform:scale(0.6)}7.143%{opacity:0;transform:scale(0.6)}20.238%{opacity:0;transform:scale(0.6);animation-timing-function:cubic-bezier(0.23,1,0.32,1)}25%{opacity:1;transform:scale(1)}40.476%{opacity:1;transform:scale(1);animation-timing-function:cubic-bezier(0.23,1,0.32,1)}47.619%{opacity:0;transform:scale(1)}100%{opacity:0;transform:scale(1)}}
.d2{transform-box:fill-box;transform-origin:50% 50%;opacity:0;transform:scale(1);animation:if-no-live-visitors_d2 4.199999999999999s linear}
*{animation-iteration-count:var(--illos-iterations,1)!important;animation-fill-mode:both!important;animation-play-state:var(--illos-play,running)!important}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}
}
</style>
<path d="M138.4,60 H581.6 C626.75,60 636,69.25 636,114.4 V345.6 C636,390.75 626.75,400 581.6,400 H138.4 C93.25,400 84,390.75 84,345.6 V114.4 C84,69.25 93.25,60 138.4,60 Z" fill="var(--illos-if-raised,var(--_if-raised))" stroke="var(--illos-if-line,var(--_if-line))" stroke-width="2"/><circle class="pulse" cx="142" cy="131" r="9" fill="none" stroke="var(--illos-accent,var(--_accent))" stroke-width="2"/><circle cx="142" cy="131" r="9" fill="var(--illos-accent,var(--_accent))" stroke="none"/><rect data-pill="" x="168" y="112" width="140" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><rect data-pill="" x="168" y="138" width="220" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><path d="M561.2,100 H568.8 C591.38,100 596,104.62 596,127.2 V134.8 C596,157.38 591.38,162 568.8,162 H561.2 C538.62,162 534,157.38 534,134.8 V127.2 C534,104.62 538.62,100 561.2,100 Z" fill="var(--illos-if-surface,var(--_if-surface))" stroke="var(--illos-if-bar,var(--_if-bar))" stroke-width="2"/><g data-icon="User" transform="translate(545,111) scale(1.6667)" fill="none"><path d="M20 21C19.713 17.269 16.729 14.315 12.995 14.066L12 14C11.645 14.01 11.313 14.023 11.001 14.038C7.3 14.219 4.284 17.306 4 21" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"/><circle cx="12" cy="7" r="4" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"/></g><path d="M124 186H596" fill="none" stroke="var(--illos-if-line,var(--_if-line))" stroke-width="2"/><g class="r0"><path d="M156,210 H564 C590.56,210 596,215.44 596,242 V242 C596,268.56 590.56,274 564,274 H156 C129.44,274 124,268.56 124,242 V242 C124,215.44 129.44,210 156,210 Z" fill="var(--illos-if-raised,var(--_if-raised))" stroke="var(--illos-if-line,var(--_if-line))" stroke-width="2"/><circle cx="156" cy="242" r="22" fill="var(--illos-if-surface,var(--_if-surface))" stroke="var(--illos-if-bar,var(--_if-bar))" stroke-width="2"/><g data-icon="WhatsApp" transform="translate(142,228) scale(1.1667)" fill="none"><path d="M3.5 20.5L4.9 15.8A8.5 8.5 0 1 1 8.2 19.1L3.5 20.5Z" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"/><path d="M9.4 8.6C9.1 8.6 8.6 9.0 8.5 9.6C8.3 10.6 9.0 12.2 10.4 13.6C11.8 15.0 13.4 15.7 14.4 15.5C15.0 15.4 15.4 14.9 15.4 14.6C15.4 14.3 15.2 14.1 14.8 13.9L13.7 13.4C13.4 13.2 13.1 13.3 12.9 13.6L12.5 14.0C11.7 13.6 10.4 12.3 10.0 11.5L10.4 11.1C10.7 10.9 10.8 10.6 10.6 10.3L10.1 9.2C9.9 8.8 9.7 8.6 9.4 8.6Z" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35"/></g><rect data-pill="" x="194" y="225" width="150" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><rect data-pill="" x="194" y="247" width="72" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><rect data-pill="" x="460" y="235" width="64" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><circle cx="566" cy="242" r="8" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><circle class="d0" cx="566" cy="242" r="8" fill="var(--illos-accent,var(--_accent))" stroke="none"/></g><g class="r1"><path d="M156,210 H564 C590.56,210 596,215.44 596,242 V242 C596,268.56 590.56,274 564,274 H156 C129.44,274 124,268.56 124,242 V242 C124,215.44 129.44,210 156,210 Z" fill="var(--illos-if-raised,var(--_if-raised))" stroke="var(--illos-if-line,var(--_if-line))" stroke-width="2"/><circle cx="156" cy="242" r="22" fill="var(--illos-if-surface,var(--_if-surface))" stroke="var(--illos-if-bar,var(--_if-bar))" stroke-width="2"/><g data-icon="LinkedIn" transform="translate(142,228) scale(1.1667)" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="3.5" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"/><path d="M8 11V16.5" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"/><circle cx="8" cy="7.8" r="0.95" fill="var(--illos-ink,var(--_ink))" stroke="none"/><path d="M12 16.5V11" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"/><path d="M16.5 16.5V13.2A2.25 2.25 0 0 0 12 13.2" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"/></g><rect data-pill="" x="194" y="225" width="150" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><rect data-pill="" x="194" y="247" width="72" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><rect data-pill="" x="460" y="235" width="64" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><circle cx="566" cy="242" r="8" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><circle class="d1" cx="566" cy="242" r="8" fill="var(--illos-accent,var(--_accent))" stroke="none"/></g><g class="r2"><path d="M156,210 H564 C590.56,210 596,215.44 596,242 V242 C596,268.56 590.56,274 564,274 H156 C129.44,274 124,268.56 124,242 V242 C124,215.44 129.44,210 156,210 Z" fill="var(--illos-if-raised,var(--_if-raised))" stroke="var(--illos-if-line,var(--_if-line))" stroke-width="2"/><circle cx="156" cy="242" r="22" fill="var(--illos-if-surface,var(--_if-surface))" stroke="var(--illos-if-bar,var(--_if-bar))" stroke-width="2"/><g data-icon="Behance" transform="translate(142,228) scale(1.1667)" fill="none"><path d="M3.5 7.2H8.1A2.3 2.3 0 0 1 8.1 11.8H3.5V7.2Z" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.55"/><path d="M3.5 11.8H8.6A2.6 2.6 0 0 1 8.6 17H3.5V11.8Z" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.55"/><path d="M14.4 8H19.4" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.55"/><path d="M13.6 13.8H20.4C20.4 11.8 18.9 10.6 17 10.6C15.1 10.6 13.6 12 13.6 13.8C13.6 15.7 15.1 17 17.2 17C18.5 17 19.4 16.5 20 15.8" stroke="var(--illos-ink,var(--_ink))" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.55"/></g><rect data-pill="" x="194" y="225" width="150" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><rect data-pill="" x="194" y="247" width="72" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><rect data-pill="" x="460" y="235" width="64" height="14" rx="7" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><circle cx="566" cy="242" r="8" fill="var(--illos-if-bar,var(--_if-bar))" stroke="none"/><circle class="d2" cx="566" cy="242" r="8" fill="var(--illos-accent,var(--_accent))" stroke="none"/></g>
</svg>`;

export interface IllosNoLiveVisitorsProps {
  className?: string;
  style?: CSSProperties;
  /** When true, runs in a continuous smooth loop while visible in the viewport. */
  loop?: boolean;
  /** Accessible SVG title synced with active locale. */
  title?: string;
  /** Accessible SVG description synced with active locale. */
  description?: string;
}

export function IllosNoLiveVisitors({
  className,
  style,
  loop = false,
  title,
  description,
}: IllosNoLiveVisitorsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    return loop ? playContinuous(host) : playOnce(host);
  }, [loop]);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    if (title) {
      const titleNode = host.querySelector("#if-no-live-visitors-t");
      if (titleNode && titleNode.textContent !== title) {
        titleNode.textContent = title;
      }
    }

    if (description) {
      const descNode = host.querySelector("#if-no-live-visitors-d");
      if (descNode && descNode.textContent !== description) {
        descNode.textContent = description;
      }
    }
  }, [title, description]);

  return (
    <div
      ref={ref}
      className={`[&_svg]:block [&_svg]:h-auto [&_svg]:w-full ${className ?? ""}`.trim()}
      style={
        {
          "--illos-play": "paused",
          "--illos-iterations": loop ? "infinite" : "1",
          ...style,
        } as CSSProperties
      }
      dangerouslySetInnerHTML={{ __html: SVG }}
    />
  );
}

/** Runs continuously in a smooth loop while visible in the viewport, pausing when scrolled out of view. */
function playContinuous(host: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    host.style.setProperty("--illos-play", "paused");
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      const inView = entries.some((entry) => entry.isIntersecting);
      host.style.setProperty("--illos-play", inView ? "running" : "paused");
    },
    { threshold: 0.1 },
  );

  io.observe(host);

  return () => {
    io.disconnect();
  };
}

/** Default Illos behavior: plays once on scroll into view, holds final frame, loops while hovered. */
function playOnce(host: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  let started = false;
  const animations = () => host.getAnimations({ subtree: true });

  const play = () => {
    if (!started) {
      started = true;
      host.style.setProperty("--illos-play", "running");
      return;
    }
    if (animations().some((a) => a.playState === "running")) return;
    for (const a of animations()) {
      a.currentTime = 0;
    }
  };

  let wasOut = true;
  const io = new IntersectionObserver(
    (entries) => {
      const inView = entries.some((e) => e.isIntersecting);
      if (inView && wasOut) play();
      wasOut = !inView;
    },
    { threshold: 0.5 },
  );
  io.observe(host);

  const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let hovering = false;
  let waiting = false;

  const loopOnHover = () => {
    if (waiting) return;
    const list = animations();
    if (!list.length) return;
    waiting = true;
    Promise.all(list.map((a) => a.finished)).then(
      () =>
        requestAnimationFrame(() => {
          waiting = false;
          if (!hovering) return;
          for (const a of animations()) {
            a.currentTime = 0;
          }
          loopOnHover();
        }),
      () =>
        requestAnimationFrame(() => {
          waiting = false;
          if (hovering) loopOnHover();
        }),
    );
  };

  const onEnter = () => {
    hovering = true;
    play();
    loopOnHover();
  };

  const onLeave = () => {
    hovering = false;
  };

  if (hover) {
    host.addEventListener("mouseenter", onEnter);
    host.addEventListener("mouseleave", onLeave);
  }

  return () => {
    hovering = false;
    io.disconnect();
    if (hover) {
      host.removeEventListener("mouseenter", onEnter);
      host.removeEventListener("mouseleave", onLeave);
    }
  };
}
