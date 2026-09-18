"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Projects.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface Tag {
  label: string;
}

interface Project {
  index: string;           // "01", "02"
  category: string;        // "On-the-job Training", "Capstone"
  title: string;
  description: string;
  tags: Tag[];
  imageSrc: string;
  imageAlt: string;
  href: string;
  ariaLabel: string;
  linkLabel: string;
  /** If true, the screenshot is a white-background UI → render browser chrome */
  hasBrowserChrome: boolean;
}

const PROJECTS: Project[] = [
  {
    index: "01",
    category: "On-the-job Training",
    title: "Advocate Tours and Travel Website",
    description:
      "A website built for a travel agency to streamline customer inquiries for destinations, visa assistance, and FAQs. Developed using Next.js, React, and TypeScript with Tailwind CSS for styling, the site improved the business's Google visibility and gave clients a straightforward way to reach out, reducing back-and-forth communication during the inquiry process.",
    tags: [
      { label: "NEXT.JS" },
      { label: "WEB" },
      { label: "SYSTEM DESIGN" },
      { label: "TYPESCRIPT" },
      { label: "REACT" },
      { label: "TAILWIND CSS" },
      { label: "RESEND SDK" },
    ],
    imageSrc: `${basePath}/Images/AdvocateWebsite.png`,
    imageAlt: "Screenshot of the Advocate Tours and Travel website hero section",
    href: "https://www.advocatetoursandtravel.com/",
    ariaLabel: "View the Advocate Tours and Travel website (opens in new tab)",
    linkLabel: "View Live Site ↗",
    hasBrowserChrome: true,
  },
  {
    index: "02",
    category: "Capstone",
    title: "Android-based Inventory Management System for Tita Doc Pediatric and Dental Clinic",
    description:
      "A capstone project developed for Tita Doc Pediatric and FamiLee Dental Clinic to modernize real-time inventory tracking, replacing manual stock management. Built with Flutter and Supabase, the system underwent rigorous quality testing against the ISO/IEC 25010 standard, achieving 95% overall conformance across functionality, reliability, usability, performance, and security. A beta test with clinic staff further confirmed the system's real-world value, yielding a 3.83 weighted mean rating.",
    tags: [
      { label: "PROJECT MANAGER" },
      { label: "SYSTEM DESIGN AND ARCHITECTURE" },
      { label: "FULL DOCUMENTATION" },
      { label: "MANUAL TESTING" },
    ],
    imageSrc: `${basePath}/Images/InventoryImage.jpg`,
    imageAlt: "Screenshot of the Tita Doc inventory management system dashboard",
    href: `${basePath}/capstone-inventory-management-system.pdf`,
    ariaLabel: "View capstone project documentation PDF (opens in new tab)",
    linkLabel: "View Documentation ↗",
    hasBrowserChrome: true,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Projects() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <section className={styles.section} id="work">
      {/* ── Header row: title left, counter right ── */}
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Projects</h2>
          <span className={styles.counter} aria-hidden="true">
            [ 01 — 02 ]
          </span>
        </div>

        {/* ── Project cards ── */}
        <div className={styles.cardGrid}>
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.index}
              className={`${styles.cardMotion} ${reducedMotion ? styles.reduceMotion : ""}`}
              custom={index}
              variants={cardVariants}
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.25 }}
            >
            <a
              className={styles.card}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={project.ariaLabel}
            >

              {/* ── Screenshot area ── */}
              <div className={styles.screenshotWrap}>
                {project.hasBrowserChrome ? (
                  /* Browser-chrome treatment for white-bg UI screenshots */
                  <div className={styles.browserChrome}>
                    <div className={styles.chromeTitleBar} aria-hidden="true">
                      <span className={styles.chromeDot} data-color="red" />
                      <span className={styles.chromeDot} data-color="yellow" />
                      <span className={styles.chromeDot} data-color="green" />
                    </div>
                    <div className={styles.chromeViewport}>
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 900px) 90vw, 45vw"
                        className={styles.screenshotImg}
                      />
                      {/* Bottom gradient fade to card bg */}
                      <div className={styles.screenshotFade} aria-hidden="true" />
                    </div>
                  </div>
                ) : (
                  /* Full-bleed treatment for color-graded photos */
                  <div className={styles.fullBleedWrap}>
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 900px) 90vw, 45vw"
                      className={styles.screenshotImg}
                    />
                    {/* Bottom gradient fade to card bg */}
                    <div className={styles.screenshotFade} aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* ── Card body ── */}
              <div className={styles.cardBody}>
                {/* Category label */}
                <p className={styles.categoryLabel}>
                  <span className={styles.categoryIndex}>{project.index} /</span>
                  {" "}
                  <span className={styles.categoryName}>{project.category}</span>
                </p>

                {/* Project title */}
                <h3 className={styles.projectTitle}>{project.title}</h3>

                {/* Description */}
                <p className={styles.projectDesc}>{project.description}</p>

                {/* Tag pills — gold accent, consistent with category labels */}
                <ul className={styles.tagList} aria-label="Technologies and roles">
                  {project.tags.map((tag) => (
                    <li key={tag.label} className={styles.tagPill}>
                      {tag.label}
                    </li>
                  ))}
                </ul>
                <span className={styles.linkAffordance} aria-hidden="true">
                  {project.linkLabel}
                </span>
              </div>

            </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
