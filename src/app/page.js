"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronUp,
  Code2,
  Download,
  ExternalLink,
  Loader2,
  Mail,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";

import {
  NAV_LINKS,
  HERO_DATA,
  SKILL_CATEGORIES,
  PROJECTS,
  EXPERIENCES,
  CONTACT_METHODS,
} from "@/data/portfolioData";

import {
  FinEasePreview,
  StyleDecorPreview,
  EdTechPreview,
} from "@/components/ProjectPreviews";

import { IconGithub, IconLinkedin } from "@/components/TechIcons";
import { GadgetHubPreview } from "../components/ProjectPreviews";

/* ===================================================================
   ANIMATION VARIANTS
=================================================================== */

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay }}
      className={className}
      style={reducedMotion ? { opacity: 1, transform: "none" } : undefined}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ number, category, title, description }) {
  return (
    <Reveal className="mb-14 sm:mb-18">
      <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
        <span className="font-bold">{number}</span>
        <span className="h-px w-8 bg-[var(--accent)]/50" />
        <span className="text-[var(--text-muted)] tracking-[0.2em]">
          {category}
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-main)] font-display">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed lg:justify-self-end max-w-md">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ===================================================================
   CONTACT FORM COMPONENT
=================================================================== */

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name must be at least 2 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErrors = validate();
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(
          data.message || "Thank you! Your message has been received.",
        );
        setFormData({ name: "", email: "", message: "" });
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
        setStatusMessage(
          data.message ||
            "Failed to deliver message. Please contact directly via email.",
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network connection error. Please try again or email rupombadhan111@gmail.com.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
        >
          Full Name <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Rupom Prosad Badhan"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          className={`w-full rounded-xl border bg-[var(--surface-base)]/60 px-4 py-3 text-sm text-[var(--text-main)] placeholder-[var(--text-faint)] outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] ${
            errors.name ? "border-rose-500/60" : "border-[var(--border-subtle)]"
          }`}
        />
        {errors.name && (
          <p className="mt-1 font-mono text-xs text-rose-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
        >
          Email Address <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e.g. rupombadhan111@gmail.com"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          className={`w-full rounded-xl border bg-[var(--surface-base)]/60 px-4 py-3 text-sm text-[var(--text-main)] placeholder-[var(--text-faint)] outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] ${
            errors.email
              ? "border-rose-500/60"
              : "border-[var(--border-subtle)]"
          }`}
        />
        {errors.email && (
          <p className="mt-1 font-mono text-xs text-rose-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
        >
          Message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Detail your project, contract role, or architectural idea..."
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          className={`w-full rounded-xl border bg-[var(--surface-base)]/60 px-4 py-3 text-sm text-[var(--text-main)] placeholder-[var(--text-faint)] outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] resize-none ${
            errors.message
              ? "border-rose-500/60"
              : "border-[var(--border-subtle)]"
          }`}
        />
        {errors.message && (
          <p className="mt-1 font-mono text-xs text-rose-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full btn-primary py-3.5 text-sm font-semibold tracking-wide disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Transmitting
            Message...
          </span>
        ) : status === "success" ? (
          <span className="flex items-center gap-2">
            <Check size={16} /> Delivered Successfully
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={15} /> Send Message Directly
          </span>
        )}
      </button>

      <AnimatePresence>
        {(status === "success" || status === "error") && statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
              status === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-rose-500/30 bg-rose-500/10 text-rose-400"
            }`}
          >
            {status === "success" ? (
              <Check size={16} className="shrink-0 mt-0.5" />
            ) : (
              <X size={16} className="shrink-0 mt-0.5" />
            )}
            <span>{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

/* ===================================================================
   MAIN PORTFOLIO APPLICATION
=================================================================== */

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  /* Theme Initializer with No Hydration Mismatch */
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = initial;
    const timer = setTimeout(() => {
      setTheme(initial);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  /* Theme Switcher */
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  };

  /* Scroll spy for navbar compression & active section */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleNavClick = useCallback((href) => {
    const sectionId = href.replace("#", "");

    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-main)] selection:bg-[var(--accent)] selection:text-black">
      {/* ── BACKGROUND SYSTEM ── */}
      <div className="bg-system" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-topo" />
        <div className="bg-noise" />
        <div className="ambient-light-hero" />
        <div className="ambient-light-accent" />
      </div>

      {/* ── STICKY GLASS NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[var(--surface-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-lg shadow-black/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="group flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-[var(--text-main)]">
                RUPOM<span className="text-[var(--accent)]">.</span>
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Frontend Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-md px-3 shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative isolate px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                    isActive
                      ? "text-[var(--accent)] font-semibold border-[var(--accent)]/30"
                      : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-main)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 z-0 rounded-full bg-[var(--accent-soft)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & Contact CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="btn-icon"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex btn-primary text-xs py-2.5 px-4 font-semibold"
            >
              Let&apos;s Talk <ArrowUpRight size={14} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation drawer"
              className="btn-icon lg:hidden"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-2xl px-6 py-4"
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        isActive
                          ? "text-[var(--accent)] bg-[var(--accent-soft)] border-[var(--accent)]/30"
                          : "text-[var(--text-muted)] border-transparent hover:text-[var(--accent)] hover:bg-[var(--accent-soft)]"
                      }`}
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight
                        size={14}
                        className={
                          isActive ? "text-[var(--accent)]" : "opacity-60"
                        }
                      />
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24">
        {/* ================================================================
            01. HERO SECTION — PORTRAIT LEFT, INTRODUCTION RIGHT
        ================================================================ */}
        <section
          id="home"
          className="min-h-[85vh] flex items-center py-12 lg:py-20 scroll-mt-24"
        >
          <div className="grid w-full items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
            {/* ── LEFT: PORTRAIT FRAME COMPOSITION ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-[420px]"
            >
              {/* Outer Decorative Technical Rings */}
              <div
                className="absolute -inset-6 rounded-full border border-[var(--accent)]/15 pointer-events-none animate-spin"
                style={{ animationDuration: "50s" }}
              />
              <div
                className="absolute -inset-12 rounded-full border border-dashed border-[var(--border-subtle)] pointer-events-none animate-spin"
                style={{
                  animationDuration: "75s",
                  animationDirection: "reverse",
                }}
              />

              {/* Multi-Layer Portrait Container */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-br from-[var(--border-mid)] via-[var(--surface-card)] to-[var(--accent-soft)] shadow-2xl border border-[var(--border-subtle)] overflow-hidden">
                {/* Corner Technical Brackets */}
                <span className="corner-bracket corner-tl" />
                <span className="corner-bracket corner-tr" />
                <span className="corner-bracket corner-bl" />
                <span className="corner-bracket corner-br" />

                {/* Inner Window Chrome Header */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2 text-[10px] font-mono text-[var(--text-faint)]">
                  <span>RPB // PORTRAIT_MATRIX</span>
                  <span className="text-[var(--accent)] font-semibold">
                    {HERO_DATA.coordinates}
                  </span>
                </div>

                {/* Portrait Canvas */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--bg-mid)] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://res.cloudinary.com/rbbaon9j/image/upload/f_auto,q_auto/Rupom-panjabi"
                    alt="Rupom"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div
                    style={{ display: "none" }}
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface-base)]"
                  >
                    <span className="font-display text-7xl font-bold tracking-tight text-[var(--accent)]">
                      RPB
                    </span>
                    <span className="mt-3 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      Frontend Developer
                    </span>
                  </div>
                </div>

                {/* Bottom Frame Status Strip */}
                <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] px-2 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[var(--text-muted)]">
                    IDENTITY: VERIFIED
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    ACTIVE ROLE
                  </span>
                </div>
              </div>

              {/* Floating Technical Badges */}
              <motion.div
                animate={reducedMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-4 rounded-xl border border-[var(--border-mid)] bg-[var(--surface-glass)] backdrop-blur-xl p-2.5 px-3.5 shadow-xl flex items-center gap-2.5"
              >
                <span className="size-7 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                  <Code2 size={16} />
                </span>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Specialization
                  </span>
                  <span className="block text-xs font-bold text-[var(--text-main)]">
                    React & Next.js
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={reducedMotion ? {} : { y: [0, 8, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 rounded-xl border border-[var(--border-mid)] bg-[var(--surface-glass)] backdrop-blur-xl p-2.5 px-3.5 shadow-xl flex items-center gap-2.5"
              >
                <span className="size-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Zap size={15} />
                </span>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Internship
                  </span>
                  <span className="block text-xs font-bold text-[var(--text-main)]">
                    EVU Ventures
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: INTRODUCTION COMPOSITION ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start"
            >
              {/* Status Pill Indicator */}
              <motion.div
                variants={fadeUpVariant}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-1 text-xs font-mono text-[var(--accent)] mb-6"
              >
                <span className="size-2 rounded-full bg-[var(--accent)] animate-ping" />
                <span className="font-semibold">{HERO_DATA.internship}</span>
              </motion.div>

              {/* Name & Identity */}
              <motion.div
                variants={fadeUpVariant}
                className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] mb-3"
              >
                HELLO, I AM {HERO_DATA.name.toUpperCase()}
              </motion.div>

              {/* High-Impact Editorial Heading */}
              <motion.h1
                variants={fadeUpVariant}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-main)] font-display leading-[1.08] mb-6"
              >
                Building{" "}
                <span className="text-[var(--accent)]">thoughtful</span> digital
                experiences with modern web technologies.
              </motion.h1>

              {/* Concise Narrative */}
              <motion.p
                variants={fadeUpVariant}
                className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl mb-8 font-body"
              >
                {HERO_DATA.subheadline}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={fadeUpVariant}
                className="flex flex-wrap items-center gap-3.5 mb-10"
              >
                <a href="#projects" className="btn-primary text-sm py-3 px-6">
                  Explore My Work <ArrowUpRight size={16} />
                </a>
                <a href="#contact" className="btn-secondary text-sm py-3 px-6">
                  Contact Me <ArrowRight size={15} />
                </a>
                <a
                  href="/resume.pdf"
                  download="Rupom-Prosad-Badhan-Resume.pdf"
                  className="btn-secondary text-sm py-3 px-6 border-[var(--accent)]/40 hover:border-[var(--accent)]"
                  aria-label="Download Rupom Prosad Badhan Resume PDF"
                >
                  <Download size={15} className="text-[var(--accent)]" />{" "}
                  Download Resume
                </a>
              </motion.div>

              {/* Social Channels & Online Presence */}
              <motion.div
                variants={fadeUpVariant}
                className="flex items-center gap-3 pt-6 border-t border-[var(--border-subtle)] w-full"
              >
                <a
                  href="https://github.com/RupomPB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="GitHub Profile"
                >
                  <IconGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/rupom-pb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="LinkedIn Profile"
                >
                  <IconLinkedin size={18} />
                </a>
                <a
                  href="mailto:rupombadhan111@gmail.com"
                  className="btn-icon"
                  aria-label="Direct Email"
                >
                  <Mail size={18} />
                </a>
                <span className="h-px w-8 bg-[var(--border-mid)] ml-2" />
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Verified Developer Channels
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            02. ABOUT ME SECTION — EDITORIAL EXCELLENCE
        ================================================================ */}
        <section
          id="about"
          className="py-20 lg:py-28 scroll-mt-24 border-t border-[var(--border-subtle)]"
        >
          <SectionHeading
            number="01"
            category="The Person Behind The Pixels"
            title="Design-engineered interfaces built for real humans."
            description="Bridging visual elegance with robust component architecture, full-stack database integrations, and clean code principles."
          />

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Main Editorial Narrative Card */}
            <Reveal className="obscura-card p-6 sm:p-10 space-y-6">
              <div className="size-12 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-border)]">
                <Sparkles size={22} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-main)] font-display leading-snug">
                Not just assembling layouts. Creating digital products that feel
                intuitive, responsive, and purposeful.
              </h3>

              <p className="text-base text-[var(--text-muted)] leading-relaxed">
                I am a frontend developer specializing in React and Next.js,
                with practical full-stack project experience spanning Node.js,
                Express, and MongoDB. I focus on creating responsive interfaces
                that balance visual clarity with underlying performance.
              </p>

              <p className="text-base text-[var(--text-muted)] leading-relaxed">
                My approach combines thoughtful component hierarchy, design
                token systems, and practical database/API integrations. Whether
                refining interaction details or implementing secure
                authentication pipelines, I am dedicated to continuous learning,
                engineering discipline, and creating products that matter.
              </p>

              {/* Quick Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className="p-3 rounded-xl bg-[var(--surface-base)]/50 border border-[var(--border-subtle)]">
                  <span className="block font-mono text-[10px] text-[var(--accent)] font-bold">
                    100% MODERN
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-main)]">
                    React & Next.js
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-base)]/50 border border-[var(--border-subtle)]">
                  <span className="block font-mono text-[10px] text-[var(--accent)] font-bold">
                    FULL-STACK
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-main)]">
                    Express & MongoDB
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-base)]/50 border border-[var(--border-subtle)]">
                  <span className="block font-mono text-[10px] text-[var(--accent)] font-bold">
                    MOTION
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-main)]">
                    Framer Motion
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Asymmetric Side Pillars */}
            <div className="space-y-4">
              <Reveal
                delay={0.1}
                className="obscura-card p-6 border-l-4 border-l-[var(--accent)]"
              >
                <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                  01 / PHILOSOPHY
                </span>
                <h4 className="text-lg font-bold text-[var(--text-main)] mt-2 font-display">
                  Design with Purpose
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                  Clear typography hierarchy, intentional spacing, accessibility
                  standards, and responsive adaptability across every device
                  viewport.
                </p>
              </Reveal>

              <Reveal
                delay={0.16}
                className="obscura-card p-6 border-l-4 border-l-emerald-400"
              >
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  02 / CRAFT
                </span>
                <h4 className="text-lg font-bold text-[var(--text-main)] mt-2 font-display">
                  Continuous Development
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                  Actively learning through production work at EVU Ventures,
                  rigorous personal projects, and modern frontend architecture
                  patterns.
                </p>
              </Reveal>

              <Reveal
                delay={0.22}
                className="obscura-card p-6 border-l-4 border-l-teal-400"
              >
                <span className="font-mono text-xs text-teal-400 font-semibold">
                  03 / COLLABORATION
                </span>
                <h4 className="text-lg font-bold text-[var(--text-main)] mt-2 font-display">
                  Engineering Precision
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                  Writing clean, self-documenting code, structuring modular
                  reusable components, and maintaining rigorous Git workflows.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            03. TECHNICAL SKILLS — AUTHENTIC LOGOS & INTERACTIVE CARDS
        ================================================================ */}
        <section
          id="skills"
          className="py-20 lg:py-28 scroll-mt-24 border-t border-[var(--border-subtle)]"
        >
          <SectionHeading
            number="02"
            category="Technical Stack & Capabilities"
            title="Authentic tools powering modern web applications."
            description="Organized into specialized engineering categories, each represented with authentic technology logos and interactive mechanics."
          />

          <div className="space-y-12">
            {SKILL_CATEGORIES.map((category, catIdx) => (
              <Reveal
                key={category.id}
                delay={catIdx * 0.08}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--accent)] font-bold">
                      [{category.number}]
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)]">
                      {category.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {category.tier} ({category.skills.length} Tools)
                  </span>
                </div>

                {/* Skills Grid with Authentic Vector Logos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.Icon;
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={
                          reducedMotion ? {} : { y: -5, scale: 1.015 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="group relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-xl hover:shadow-[var(--accent-glow)]/10"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Authentic Tech SVG Icon Container */}
                          <div className="size-11 rounded-xl bg-[var(--surface-base)] border border-[var(--border-subtle)] flex items-center justify-center p-2 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                            <SkillIcon size={24} />
                          </div>

                          {/* Skill Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-sm font-bold text-[var(--text-main)] font-display truncate">
                                {skill.name}
                              </h4>
                              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-faint)] bg-[var(--surface-base)] px-2 py-0.5 rounded border border-[var(--border-subtle)] shrink-0">
                                {skill.tag}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-1 font-body">
                              {skill.desc}
                            </p>
                          </div>
                        </div>

                        {/* Subtle Bottom Accent Indicator */}
                        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </motion.div>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================================================================
            04. FEATURED PROJECTS — ADVANCED VISUAL SHOWCASES
        ================================================================ */}
        <section
          id="projects"
          className="py-20 lg:py-28 scroll-mt-24 border-t border-[var(--border-subtle)]"
        >
          <SectionHeading
            number="03"
            category="Selected Digital Products"
            title="Applications engineered for scale, utility, and design."
            description="Deep-dive into production web applications highlighting client routing, authentication, payment processing, and database engineering."
          />

          <div className="space-y-14">
            {PROJECTS.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 0.06}>
                <article className="group relative rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden shadow-2xl transition-all duration-500 hover:border-[var(--border-mid)]">
                  {/* Card Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-base)]/40 px-6 py-3.5 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--accent)] font-bold">
                        PROJECT {project.number}
                      </span>
                      <span className="text-[var(--border-mid)]">/</span>
                      <span className="text-[var(--text-muted)] uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    {project.wip ? (
                      <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                        <span className="size-2 rounded-full bg-amber-400 animate-ping" />{" "}
                        {project.badge}
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                        <Check size={13} /> {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Two Column Grid: Visual Preview vs Content */}
                  <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-10 items-center">
                    {/* Visual Preview Interface */}
                    <div className="order-2 lg:order-1">
                      {project.id === "finease" && <FinEasePreview />}
                      {project.id === "styledecor" && <StyleDecorPreview />}
                      {project.id === "gadgethub" && <GadgetHubPreview />}
                      {project.id === "edtech" && <EdTechPreview />}
                    </div>

                    {/* Content & Tech Stack */}
                    <div className="order-1 lg:order-2 space-y-6">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold block mb-2">
                          {project.type}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] font-display tracking-tight">
                          {project.name}
                        </h3>
                        <p className="mt-2 font-mono text-xs text-[var(--text-muted)] italic">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-body">
                        {project.description}
                      </p>

                      {/* Key Features List */}
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] block mb-2.5">
                          Architectural Highlights
                        </span>
                        <div className="space-y-1.5">
                          {project.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-main)]"
                            >
                              <Check
                                size={14}
                                className="text-[var(--accent)] shrink-0 mt-0.5"
                              />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills with Authentic Mini Icons */}
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] block mb-2.5">
                          Core Technology Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((item, sIdx) => {
                            const StackIcon = item.Icon;
                            return (
                              <span key={sIdx} className="tech-badge">
                                <StackIcon size={14} />
                                <span>{item.name}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                        {project.live ? (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-2.5 px-4 font-semibold"
                            aria-label={`Open ${project.name} live application preview`}
                          >
                            Live Preview <ExternalLink size={13} />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                            <Zap size={13} /> Active Development
                          </span>
                        )}

                        {project.clientRepo && (
                          <a
                            href={project.clientRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-xs py-2 px-3.5"
                            aria-label={`View ${project.name} client repository`}
                          >
                            <IconGithub size={14} /> Client Repo
                          </a>
                        )}

                        {project.serverRepo && (
                          <a
                            href={project.serverRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-xs py-2 px-3.5"
                            aria-label={`View ${project.name} server repository`}
                          >
                            <IconGithub size={14} /> Server Repo
                          </a>
                        )}

                        {project.source && (
                          <a
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-xs py-2 px-3.5"
                            aria-label={`View ${project.name} repository`}
                          >
                            <IconGithub size={14} /> Source Repository
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================================================================
            05. EXPERIENCE & LEARNING — TIMELINE SYSTEM
        ================================================================ */}
        <section
          id="experience"
          className="py-20 lg:py-28 scroll-mt-24 border-t border-[var(--border-subtle)]"
        >
          <SectionHeading
            number="04"
            category="Career & Education"
            title="Professional journey & hands-on development."
            description="Active frontend engineering internship experience combined with comprehensive full-stack training."
          />

          <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--border-mid)] before:to-transparent">
            {EXPERIENCES.map((exp, expIdx) => (
              <Reveal key={exp.id} delay={expIdx * 0.1} className="relative">
                {/* Timeline Pulsing Node */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-1.5 size-7 rounded-full bg-[var(--surface-card)] border-2 border-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent-glow)]">
                  <span className="size-2 rounded-full bg-[var(--accent)]" />
                </div>

                {/* Experience Card */}
                <div className="obscura-card p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                        {exp.organization}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                          CURRENT ROLE
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {exp.timeline} · {exp.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--text-main)] font-display">
                    {exp.role}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-body">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {exp.highlights.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-main)]"
                      >
                        <Check
                          size={14}
                          className="text-[var(--accent)] shrink-0 mt-0.5"
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3">
                    {exp.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[10px] text-[var(--text-muted)] bg-[var(--surface-base)] px-2.5 py-1 rounded-md border border-[var(--border-subtle)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================================================================
            06. CONTACT LOUNGE & SECURE RESEND INTEGRATION
        ================================================================ */}
        <section
          id="contact"
          className="py-20 lg:py-28 scroll-mt-24 border-t border-[var(--border-subtle)]"
        >
          <SectionHeading
            number="05"
            category="Get in Touch"
            title="Let's build something extraordinary together."
            description="Open for frontend development roles, modern full-stack projects, and technical collaborations."
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Contact Channels */}
            <Reveal className="space-y-4">
              <div className="obscura-card p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-display text-[var(--text-main)]">
                    Available for Immediate Opportunities
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                    Have an interesting project, a frontend engineering role, or
                    a contract collaboration? Reach out through any of these
                    verified direct channels.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {CONTACT_METHODS.map((method) => {
                    const MethodIcon = method.Icon;
                    return (
                      <a
                        key={method.id}
                        href={method.href}
                        target={
                          method.href.startsWith("mailto")
                            ? undefined
                            : "_blank"
                        }
                        rel={
                          method.href.startsWith("mailto")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-base)]/50 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/20"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="size-10 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                            <MethodIcon size={18} />
                          </span>
                          <div>
                            <span className="block text-xs font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                              {method.platform}
                            </span>
                            <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                              {method.value}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                          {method.actionLabel} <ArrowUpRight size={12} />
                        </span>
                      </a>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-[var(--border-subtle)] font-mono text-xs text-[var(--text-muted)] flex items-center justify-between">
                  <span>Based in Dhaka, Bangladesh</span>
                  <span className="text-emerald-400">
                    Response: &lt; 24 Hours
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Right: Contact Form */}
            <Reveal delay={0.08}>
              <div className="obscura-card p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold font-display text-[var(--text-main)]">
                    Send a Direct Message
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Validated server-side and securely transmitted via Resend.
                  </p>
                </div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ================================================================
          07. PREMIUM FOOTER
      ================================================================ */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-xl py-10 mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-display font-bold text-lg text-[var(--text-main)] tracking-wider">
              RUPOM PROSAD BADHAN<span className="text-[var(--accent)]">.</span>
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)] mt-1">
              Frontend Engineer · React & Next.js Ecosystem
            </span>
          </div>

          <div className="font-mono text-xs text-[var(--text-muted)] text-center">
            © {new Date().getFullYear()} Rupom Prosad Badhan. Built with Next.js
            & Tailwind CSS.
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RupomPB"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon size-9"
              aria-label="GitHub"
            >
              <IconGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/rupom-pb/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon size-9"
              aria-label="LinkedIn"
            >
              <IconLinkedin size={16} />
            </a>
            <a
              href="#home"
              className="btn-icon size-9"
              aria-label="Back to Top"
            >
              <ChevronUp size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
