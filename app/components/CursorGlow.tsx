"use client";

/**
 * CursorGlow — singleton page-level spotlight that follows the mouse.
 *
 * Key decisions:
 * • Mounted ONCE at root — never destroyed between sections, so the glow
 *   is always alive. No disappear/reappear when crossing section boundaries.
 * • Global `window` mousemove keeps the lerp loop running everywhere.
 * • Color zone detection keeps the glow within the Tech Stack and Contact sections.
 * • `prefers-reduced-motion` and coarse-pointer guards remain.
 */

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

// ── Palette ───────────────────────────────────────────────────────────────────
const GOLD = { r: 232, g: 197, b:  71 }; // #E8C547 — TechStack / default

// ── Lerp speeds ───────────────────────────────────────────────────────────────
const LERP_POS   = 0.12; // position smoothing
const LERP_COLOR = 0.06; // color crossfade (slower = smoother transition)

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Abort early — these guards ensure glow is non-null for every closure
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Cast once — el is confirmed non-null above; closures below can use it safely
    const glow = el as HTMLDivElement;

    // ── State ─────────────────────────────────────────────────────────────────
    let targetX  = window.innerWidth  / 2;
    let targetY  = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    let curR = GOLD.r, curG = GOLD.g, curB = GOLD.b; // lerped color
    let tgtR = GOLD.r, tgtG = GOLD.g, tgtB = GOLD.b; // target color

    let isVisible = false;
    let rafId: number | null = null;

    // ── rAF loop ──────────────────────────────────────────────────────────────
    function tick() {
      currentX += (targetX - currentX) * LERP_POS;
      currentY += (targetY - currentY) * LERP_POS;

      curR += (tgtR - curR) * LERP_COLOR;
      curG += (tgtG - curG) * LERP_COLOR;
      curB += (tgtB - curB) * LERP_COLOR;

      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      glow.style.setProperty("--glow-r", String(Math.round(curR)));
      glow.style.setProperty("--glow-g", String(Math.round(curG)));
      glow.style.setProperty("--glow-b", String(Math.round(curB)));

      rafId = isVisible ? requestAnimationFrame(tick) : null;
    }

    function ensureLoop() {
      if (isVisible && rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    }

    // ── Mouse tracking — global ───────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;

      // Determine which zone the cursor is in
      const techEl = document.getElementById("tech-stack");

      let inTechStack = false;

      if (techEl) {
        const r = techEl.getBoundingClientRect();
        inTechStack =
          e.clientY >= r.top  && e.clientY <= r.bottom &&
          e.clientX >= r.left && e.clientX <= r.right;
      }

      const inActiveZone = inTechStack;

      if (inActiveZone && !isVisible) {
        // Entering an active zone — show glow and start loop
        isVisible = true;
        glow.style.opacity = "1";
        ensureLoop();
      } else if (!inActiveZone && isVisible) {
        // Leaving active zones (e.g. entering Hero) — hide glow
        isVisible = false;
        glow.style.opacity = "0";
      }

      if (inActiveZone) {
        ensureLoop();
      }

      tgtR = GOLD.r;
      tgtG = GOLD.g;
      tgtB = GOLD.b;
    }

    function onMouseLeave() {
      isVisible = false;
      glow.style.opacity = "0";
      rafId = null;
    }

    // onMouseEnter intentionally does NOT restore visibility here.
    // The next mousemove will fire immediately after re-entry and the
    // zone check in onMouseMove will decide whether to show the glow.
    function onMouseEnter() {
      // no-op — let onMouseMove handle zone-based visibility
    }

    window.addEventListener("mousemove",   onMouseMove,  { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("mousemove",   onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />;
}
