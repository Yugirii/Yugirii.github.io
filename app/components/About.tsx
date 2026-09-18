import { FiArrowRight, FiCheckCircle, FiCode, FiUsers } from "react-icons/fi";
import styles from "./About.module.css";

const proofCards = [
  {
    title: "Web Developer",
    detail: "Advocate Tours site — 2026 · Next.js, React, TypeScript",
    icon: FiCode,
  },
  {
    title: "QA Analyst / System Architecture",
    detail: "ISO/IEC 25010 testing — 2025 · 95% overall conformance",
    icon: FiCheckCircle,
  },
  {
    title: "Project Manager",
    detail: "Led capstone team — 2025 · 3.83 weighted beta rating",
    icon: FiUsers,
  },
];

const experience = [
  { role: "Web developer, Advocate Tours", date: "Feb 2026 – Apr 2026", accent: "gold" },
  { role: "Project manager, Capstone", date: "Jan 2025 – Nov 2025", accent: "gold" },
  { role: "Documentations officer, ALPHA", date: "Jan 2024 – Jun 2024", accent: "blue" },
];

const softSkills = [
  "Time Management",
  "Team Collaboration",
  "Communication Skills",
  "Research-Oriented Skills",
  "Test Documentation & Reporting",
  "Attention to Detail",
  "Able to Work Under Pressure",
];

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.topBand}>
        <div className={styles.bandContent}>
          <p className={styles.label}>About Me</p>
          <h2 className={styles.heading}>About</h2>
          <p className={styles.statement}>
            BS Information Technology graduate who found the QA side of building
            software just as compelling as the building itself. Started pursuing
            STEM, transitioned to IT, and developed hands-on experience across
            development, testing, and project management, leading a small team
            throughout a real capstone deployment.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.proofGrid}>
          {proofCards.map(({ title, detail, icon: Icon }) => (
            <article key={title} className={styles.proofCard}>
              <Icon className={styles.proofIcon} size={23} aria-hidden="true" />
              <h3 className={styles.proofTitle}>{title}</h3>
              <p className={styles.proofDetail}>{detail}</p>
            </article>
          ))}
        </div>

        <div className={styles.detailGrid}>
          <div>
            <p className={styles.subLabel}>Experience</p>
            <ol className={styles.timeline}>
              {experience.map((item) => (
                <li key={item.role} className={styles.timelineItem}>
                  <span
                    className={`${styles.timelineDot} ${
                      item.accent === "gold" ? styles.dotGold : styles.dotBlue
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className={styles.timelineRole}>{item.role}</p>
                    <p className={styles.timelineDate}>{item.date}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.rightColumn}>
            <div>
              <p className={styles.subLabel}>Education</p>
              <p className={styles.educationTitle}>BS Information Technology</p>
              <p className={styles.educationDetail}>
                STI College Ortigas-Cainta · 2022–2026
              </p>
            </div>

            <div>
              <p className={styles.subLabel}>Soft Skills</p>
              <ul className={styles.skillList}>
                {softSkills.map((skill) => (
                  <li key={skill} className={styles.skillPill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <a className={styles.cta} href="#work">
          View My Work
          <FiArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
