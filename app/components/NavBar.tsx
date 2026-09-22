"use client";

/**
 * NavBar — sticky navigation with IntersectionObserver-based active-link tracking.
 *
 * • Watches each section by id — whichever is most visible in the viewport wins.
 * • Active link: gold (#E8C547), bold.
 * • Hover: subtle lift + accent-blue color shift.
 * • Smooth scroll is handled globally in globals.css (scroll-behavior: smooth).
 */

import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";

const navItems = [
  { label: "Home",     href: "#home" },
  { label: "Stack",    href: "#tech-stack" },
  { label: "Projects", href: "#work" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

// Section ids in page order — used by IntersectionObserver
const SECTION_IDS = ["home", "tech-stack", "work", "about", "contact"];

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    // Ratio map — tracks the latest intersection ratio for each section
    const ratioMap = new Map<string, number>(SECTION_IDS.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        });

        // Pick the section with the highest visibility ratio
        let bestId = "home";
        let bestRatio = -1;
        ratioMap.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        setActiveId(bestId);
      },
      {
        // Fire callbacks at many thresholds for fine-grained tracking
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        // Negative top margin accounts for the sticky navbar height (~72px)
        rootMargin: "-72px 0px 0px 0px",
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.navbar}>
      <nav className={styles.navLinks} aria-label="Main navigation">
        {navItems.map((item) => {
          // Map the nav href (e.g. "#tech-stack") to its section id
          const sectionId = item.href.replace("#", "");
          const isActive = activeId === sectionId;

          return (
            <a
              key={item.label}
              href={item.href}
              className={isActive ? styles.navActive : styles.navLink}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
              <span className={styles.underline} aria-hidden="true" />
            </a>
          );
        })}
      </nav>
    </header>
  );
}
