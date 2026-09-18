"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

type StackOffset = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

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

const cardVariants: Variants = {
  stacked: (offset: StackOffset & { index: number }) => ({
    x: offset.x,
    y: offset.y,
    rotate: offset.rotate,
    scale: offset.scale,
    zIndex: techs.length - offset.index,
  }),
  visible: (offset: StackOffset & { index: number }) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    zIndex: 1,
    transition: {
      delay: offset.index * 0.06,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// ── Spotlight removed — now handled by the global <CursorGlow /> in page.tsx ──

export default function TechStack() {
  const gridRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [offsets, setOffsets] = useState<StackOffset[]>([]);
  const [isMeasured, setIsMeasured] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    let resizeTimer: number | undefined;

    const measureStack = () => {
      const grid = gridRef.current;
      const cards = cardRefs.current;
      if (!grid || cards.length !== techs.length || cards.some((card) => !card)) {
        return;
      }

      const gridRect = grid.getBoundingClientRect();
      const anchorX = gridRect.left + gridRect.width / 2;
      const anchorY = gridRect.top + gridRect.height / 2;

      setOffsets(
        cards.map((card, index) => {
          const rect = card!.getBoundingClientRect();
          const deckOffsetX = ((index * 17) % 5 - 2) * 3;
          const deckOffsetY = (index - (techs.length - 1) / 2) * 1.5;

          return {
            x: anchorX - (rect.left + rect.width / 2) + deckOffsetX,
            y: anchorY - (rect.top + rect.height / 2) + deckOffsetY,
            rotate: (index % 5 - 2) * 2.2,
            scale: 1 - index * 0.012,
          };
        }),
      );
      setIsMeasured(true);
    };

    measureStack();

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measureStack, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className={styles.section} id="tech-stack">
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
          <ul
            ref={gridRef}
            className={styles.grid}
            aria-label="Technologies"
            style={{ visibility: isMeasured ? "visible" : "hidden" }}
          >
            {techs.map((tech, index) => (
              <motion.li
                key={`${tech.name}-${isMeasured ? "measured" : "measuring"}`}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={styles.card}
                custom={{
                  ...(offsets[index] ?? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                  }),
                  index,
                }}
                variants={cardVariants}
                initial={reducedMotion || !isMeasured ? false : "stacked"}
                whileInView={
                  reducedMotion || !isMeasured ? undefined : "visible"
                }
                whileHover={reducedMotion ? undefined : { y: -2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
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
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
