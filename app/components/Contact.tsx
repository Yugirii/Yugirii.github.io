"use client";

import { motion, type Variants } from "framer-motion";
import { type FormEvent, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone, FiSend } from "react-icons/fi";
import styles from "./Contact.module.css";

const columnVariants: Variants = {
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Contact() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");
    setFormMessage("");

    try {
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setFormStatus("error");
      setFormMessage(result.error ?? "Unable to send your message right now.");
      return;
    }

    form.reset();
    setFormStatus("success");
    setFormMessage("Thanks — your message has been sent.");
    } catch {
      setFormStatus("error");
      setFormMessage("Unable to reach the mail service. Please try again.");
    }
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        {/* ── Left column — heading + contact info + availability pills ── */}
        <motion.div
          className={styles.infoCol}
          variants={columnVariants}
          initial={reducedMotion ? false : "left"}
          whileInView={reducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className={styles.label}>FOR INQUIRIES</p>
          <h2 className={styles.heading}>
            Want to collaborate?
            <br />
            Contact me at your leisure
          </h2>

          {/* Contact rows */}
          <div className={styles.contactRows}>
            <a
              className={styles.contactRow}
              href="mailto:almendares.johnmarcus@gmail.com"
              aria-label="Email Marcus Almendares"
            >
              <span className={styles.contactIcon} aria-hidden="true">
                <HiOutlineMail size={22} />
              </span>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>EMAIL</span>
                <span className={styles.contactValue}>
                  almendares.johnmarcus@gmail.com
                </span>
              </div>
            </a>

            <a
              className={styles.contactRow}
              href="tel:+639672743834"
              aria-label="Call Marcus Almendares"
            >
              <span className={styles.contactIcon} aria-hidden="true">
                <FiPhone size={20} />
              </span>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>PHONE</span>
                <span className={styles.contactValue}>+63 9672743834</span>
              </div>
            </a>
          </div>

          {/* Availability pills — horizontal row, matching Hero pill rhythm */}
          <div className={styles.pillRow}>
            <span className={styles.pill}>
              <span className={styles.pillDot} />
              Available for Freelance Projects
            </span>
            <span className={styles.pill}>
              <span className={styles.pillDot} />
              Available for Developer Roles
            </span>
          </div>
        </motion.div>

        {/* ── Right column — contact form card ── */}
        <motion.div
          className={styles.formCol}
          variants={columnVariants}
          initial={reducedMotion ? false : "right"}
          whileInView={reducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.card}>
            {/* Card header */}
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>SEND A MESSAGE</span>
              <FiSend size={14} className={styles.cardTitleIcon} />
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Email + Phone row */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="contact-email">
                    EMAIL
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    className={styles.fieldInput}
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="contact-phone">
                    PHONE
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    className={styles.fieldInput}
                    type="tel"
                    placeholder="+63 (000) 000-0000"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="contact-message">
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={styles.fieldTextarea}
                  placeholder="How can I help?"
                  rows={5}
                  required
                />
              </div>

              {/* Footer row */}
              <div className={styles.formFooter}>
                <p className={styles.footerNote} aria-live="polite">
                  {formMessage || "I'll get back as soon as possible."}
                </p>
                <button type="submit" className={styles.sendBtn} disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "Sending..." : "Send"}
                  <FiSend size={14} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
