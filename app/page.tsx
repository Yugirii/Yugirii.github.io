import Image from "next/image";
import styles from "./page.module.css";

const navItems = ["Home", "Work", "About", "Contact"];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  return (
    <main className={styles.pageShell}>
      <header className={styles.navbar}>
        <nav className={styles.navLinks} aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={index === 0 ? styles.navActive : styles.navLink}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section className={styles.hero} id="home">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.rolePill}>
              Web Developer | Software QA Analyst | Project Manager
            </p>

            <h1 className={styles.heroTitle}>Hi, I&apos;m Marcus</h1>

            <p className={styles.heroIntro}>
              A Bachelor of Science in Information Technology graduate aspiring
              to build, explore, and enhance systems. With hands-on experience
              in software quality assurance, having led ISO/IEC 25010-based
              testing on a capstone system that achieved 95% overall
              conformance.
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#work">
                Explore Work
              </a>
              <a className={styles.secondaryAction} href="#about">
                Read Profile
              </a>
            </div>
          </div>

          <div className={styles.portraitStage}>
            <div className={styles.portraitGlow} aria-hidden="true" />
            <div className={styles.portraitFrame}>
              <Image
                className={styles.portraitImage}
                src={`${basePath}/Images/DeveloperImage.jpg`}
                alt="Portrait of Marcus"
                width={2400}
                height={3000}
                sizes="(max-width: 768px) 72vw, 360px"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

