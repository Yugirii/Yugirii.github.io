"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

// Palette
const GOLD = { r: 232, g: 197, b: 71  }; // #E8C547 — Tech Stack (gold)
const BLUE = { r: 49,  g: 117, b: 250 }; // #3175FA — Projects + Contact (blue)

// Lerp speeds
const LERP_POS   = 0.12; // position smoothing
const LERP_COLOR = 0.06; // color crossfade — slower = dreamier

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const glow = el as HTMLDivElement;

    let targetX  = window.innerWidth  / 2;
    let targetY  = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    let curR = GOLD.r, curG = GOLD.g, curB = GOLD.b;
    let tgtR = GOLD.r, tgtG = GOLD.g, tgtB = GOLD.b;

    let isVisible = false;
    let rafId: number | null = null;

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

    function inRect(elem: HTMLElement, x: number, y: number): boolean {
      const r = elem.getBoundingClientRect();
      return y >= r.top && y <= r.bottom && x >= r.left && x <= r.right;
    }

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;

      const techEl     = document.getElementById("tech-stack");
      const projectsEl = document.getElementById("work");
      const contactEl  = document.getElementById("contact");

      const inTechStack = techEl     ? inRect(techEl,     e.clientX, e.clientY) : false;
      const inProjects  = projectsEl ? inRect(projectsEl, e.clientX, e.clientY) : false;
      const inContact   = contactEl  ? inRect(contactEl,  e.clientX, e.clientY) : false;

      const inActiveZone = inTechStack || inProjects || inContact;

      if (inActiveZone && !isVisible) {
        isVisible = true;
        glow.style.opacity = "1";
        ensureLoop();
      } else if (!inActiveZone && isVisible) {
        isVisible = false;
        glow.style.opacity = "0";
      }

      if (inActiveZone) {
        ensureLoop();
      }

      // Set color target — color lerp in tick() creates smooth crossfade
      if (inTechStack) {
        tgtR = GOLD.r; tgtG = GOLD.g; tgtB = GOLD.b;
      } else if (inProjects || inContact) {
        tgtR = BLUE.r; tgtG = BLUE.g; tgtB = BLUE.b;
      }
      // Outside active zones: keep last target so fade-out does not snap color
    }

    function onMouseLeave() {
      isVisible = false;
      glow.style.opacity = "0";
      rafId = null;
    }

    function onMouseEnter() { /* no-op — next mousemove handles zone detection */ }

    window.addEventListener("mousemove",    onMouseMove,  { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove",    onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />;
}
