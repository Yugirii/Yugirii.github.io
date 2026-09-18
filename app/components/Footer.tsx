import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiFileText, FiMail } from "react-icons/fi";
import styles from "./Footer.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const resumePath = `${basePath}/Almendares, John Marcus L._Resume.pdf`;

const links = [
  {
    label: "GitHub",
    href: "https://github.com/Yugirii",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/john-marcus-almendares/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:almendares.johnmarcus@gmail.com",
    icon: FiMail,
    external: false,
  },
  {
    label: "Resume",
    href: resumePath,
    icon: FiFileText,
    external: true,
    ariaLabel: "Download John Marcus Almendares' resume (opens in new tab)",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.identity}>
            <p className={styles.name}>John Marcus L. Almendares</p>
            <p className={styles.tagline}>
              Web Developer | Software QA Analyst | Project Manager
            </p>
          </div>

          <div className={styles.links} aria-label="Contact and profile links">
            {links.map(({ label, href, icon: Icon, external, ariaLabel }) => (
              <a
                key={label}
                className={styles.link}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={ariaLabel}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© 2026 Marcus Almendares</span>
          <span>Built with Next.js, Tailwind CSS &amp; Resend</span>
        </div>
      </div>
    </footer>
  );
}
