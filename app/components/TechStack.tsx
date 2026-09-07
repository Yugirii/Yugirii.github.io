"use client";

import { useRef, useEffect } from "react";
import { DiJava } from "react-icons/di";
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiTailwindcss,
  SiFigma,
  SiNextdotjs,
  SiMysql,
  SiMongodb,
  SiGit,
  SiPython,
} from "react-icons/si";
import { FaCode } from "react-icons/fa";
import styles from "./TechStack.module.css";

type Category = "core" | "familiar";

interface Tech {
  name: string;
  category: Category;
  icon: React.ReactNode;
}

const ICON_SIZE = 26;
const ICON_COLOR = "#CCC9DC";

const techs: Tech[] = [
  {
    name: "Java",
    category: "core",
    icon: <DiJava size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "JavaScript",
    category: "core",
    icon: <SiJavascript size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "React",
    category: "core",
    icon: <SiReact size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "HTML / CSS",
    category: "core",
    icon: <SiHtml5 size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "Tailwind CSS",
    category: "core",
    icon: <SiTailwindcss size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "Figma",
    category: "core",
    icon: <SiFigma size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "Next.js",
    category: "core",
    icon: <SiNextdotjs size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "MySQL",
    category: "familiar",
    icon: <SiMysql size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "MongoDB",
    category: "familiar",
    icon: <SiMongodb size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "Git",
    category: "familiar",
    icon: <SiGit size={ICON_SIZE} color={ICON_COLOR} />,
  },
  {
    name: "Python",
    category: "familiar",
    icon: <SiPython size={ICON_SIZE} color={ICON_COLOR} />,
  },
  // PLACEHOLDER ICON — no react-icons match found for C#
  {
    name: "C#",
    category: "familiar",
    icon: <FaCode size={ICON_SIZE} color={ICON_COLOR} />,
  },
];

export default function TechStack() {
  // ── Refs ────────────────────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  // Stores the pending rAF id so we can cancel it on cleanup / when motion stops
  const rafRef     = useRef<number | null>(null);

  // ── Spotlight effect ────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const glow    = glowRef.current;
    if (!section || !glow) return;

    // 1. Skip entirely for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 2. Skip on touch / coarse-pointer devices (no cursor to follow)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Lerp state — kept outside listeners so updateGlow closes over them
    let targetX  = 0;
    let targetY  = 0;
    let currentX = 0;
    let currentY = 0;

    // rAF loop — lerps current position toward target, then reschedules itself
    // until the delta falls below 0.5 px (effectively at rest)
    function updateGlow() {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      glow!.style.transform =
        `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

      if (
        Math.abs(targetX - currentX) > 0.5 ||
        Math.abs(targetY - currentY) > 0.5
      ) {
        rafRef.current = requestAnimationFrame(updateGlow);
      } else {
        // Snap to final position and stop the loop
        glow!.style.transform =
          `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
        rafRef.current = null;
      }
    }

    // Mouse tracking — only starts a new rAF frame if one isn't already queued
    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateGlow);
      }
    }

    // Fade the glow out when the cursor leaves the section
    function onMouseLeave() {
      glow!.style.opacity = "0";
    }

    // Fade the glow in when the cursor enters the section
    function onMouseEnter() {
      glow!.style.opacity = "1";
    }

    section.addEventListener("mousemove",  onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    section.addEventListener("mouseenter", onMouseEnter);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    // Runs when the component unmounts OR before the effect re-runs.
    // Removes all three listeners and cancels any in-flight rAF to prevent
    // the updateGlow closure from touching a detached DOM node.
    return () => {
      section.removeEventListener("mousemove",  onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      section.removeEventListener("mouseenter", onMouseEnter);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []); // empty deps — runs once on mount, cleans up on unmount

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} className={styles.section} id="tech-stack">
      {/* Spotlight glow — sits at z-index 0, behind .inner (z-index 1) */}
      <div ref={glowRef} className={styles.spotlight} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left column — heading + legend */}
        <div className={styles.headingCol}>
          <h2 className={styles.heading}>Tech Stack</h2>
          <div className={styles.legend} aria-label="Legend">
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotGold}`} />
              <span className={styles.legendText}>Core stack</span>
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotBlue}`} />
              <span className={styles.legendText}>Also familiar with</span>
            </span>
          </div>
        </div>

        {/* Right column — card grid */}
        <div className={styles.gridCol}>
          <ul className={styles.grid} aria-label="Technologies">
            {techs.map((tech) => (
              <li key={tech.name} className={styles.card}>
                <span
                  className={`${styles.dot} ${
                    tech.category === "core" ? styles.dotGold : styles.dotBlue
                  }`}
                  aria-label={
                    tech.category === "core" ? "Core stack" : "Also familiar with"
                  }
                />
                <span className={styles.iconWrap} aria-hidden="true">
                  {tech.icon}
                </span>
                <span className={styles.label}>{tech.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
