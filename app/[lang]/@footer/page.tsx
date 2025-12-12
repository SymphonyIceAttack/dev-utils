"use client";

import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  tools: [
    { label: "JSON Formatter", href: "/tools/json-formatter" },
    { label: "Base64 Encoder", href: "/tools/base64" },
    { label: "Hash Generator", href: "/tools/hash" },
    { label: "UUID Generator", href: "/tools/uuid" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "GitHub", href: "https://github.com" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

function PixelCloud({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      width="40"
      height="20"
      viewBox="0 0 20 10"
      className={className}
      style={{ imageRendering: "pixelated" }}
      animate={{
        x: [0, 10, 0],
        y: [0, -3, 0],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      <rect x="4" y="4" width="12" height="4" fill="currentColor" />
      <rect x="2" y="5" width="2" height="3" fill="currentColor" />
      <rect x="16" y="5" width="2" height="3" fill="currentColor" />
      <rect x="6" y="2" width="4" height="2" fill="currentColor" />
      <rect x="10" y="3" width="4" height="1" fill="currentColor" />
    </motion.svg>
  );
}

function PixelTree({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      width="24"
      height="32"
      viewBox="0 0 12 16"
      className={className}
      style={{ imageRendering: "pixelated", transformOrigin: "bottom center" }}
      animate={{
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      <rect x="5" y="12" width="2" height="4" fill="var(--ghibli-earth)" />
      <rect x="3" y="8" width="6" height="4" fill="currentColor" />
      <rect x="2" y="5" width="8" height="3" fill="currentColor" />
      <rect x="4" y="2" width="4" height="3" fill="currentColor" />
      <rect x="5" y="0" width="2" height="2" fill="currentColor" />
    </motion.svg>
  );
}

function PixelHouseLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      className="text-primary"
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="7" y="1" width="2" height="1" fill="currentColor" />
      <rect x="5" y="2" width="6" height="1" fill="currentColor" />
      <rect x="3" y="3" width="10" height="1" fill="currentColor" />
      <rect x="2" y="4" width="12" height="1" fill="currentColor" />
      <rect
        x="3"
        y="5"
        width="10"
        height="8"
        fill="currentColor"
        opacity="0.8"
      />
      <rect x="7" y="9" width="2" height="4" fill="var(--ghibli-earth)" />
      <rect x="4" y="7" width="2" height="2" fill="var(--ghibli-sky)" />
      <rect x="10" y="7" width="2" height="2" fill="var(--ghibli-sky)" />
      <rect x="11" y="2" width="2" height="3" fill="var(--ghibli-earth)" />
      <rect
        x="12"
        y="0"
        width="1"
        height="1"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground/40 dark:border-primary/30 bg-card/50 relative overflow-hidden">
      {/* 像素风背景装饰 - 添加动画 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <PixelTree
          className="absolute bottom-0 left-[5%] text-ghibli-forest"
          delay={0}
        />
        <PixelTree
          className="absolute bottom-0 left-[15%] text-ghibli-forest scale-75"
          delay={0.5}
        />
        <PixelTree
          className="absolute bottom-0 right-[10%] text-ghibli-forest"
          delay={1}
        />
        <PixelTree
          className="absolute bottom-0 right-[20%] text-ghibli-forest scale-90"
          delay={1.5}
        />
        <PixelCloud
          className="absolute top-4 left-[20%] text-ghibli-sky"
          delay={0}
        />
        <PixelCloud
          className="absolute top-8 right-[25%] text-ghibli-sky scale-75"
          delay={2}
        />
      </div>

      <motion.div
        className="container mx-auto max-w-6xl px-4 py-12 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                className="pixel-icon-box p-1.5"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                <PixelHouseLogo />
              </motion.div>
              <span className="text-xl font-bold tracking-tight">DevTools</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Free, fast, and privacy-focused developer utilities.
            </p>
            {/* 社交图标 */}
            <div className="mt-4 flex gap-2">
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://github.com"
                  className="p-2 rounded-xl border-2 border-foreground/40 dark:border-primary/40 hover:bg-accent transition-colors block"
                  style={{ boxShadow: "2px 2px 0 0 var(--foreground)" }}
                >
                  <Github className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://twitter.com"
                  className="p-2 rounded-xl border-2 border-foreground/40 dark:border-primary/40 hover:bg-accent transition-colors block"
                  style={{ boxShadow: "2px 2px 0 0 var(--foreground)" }}
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b-2 border-dashed border-foreground/25 dark:border-primary/25 pb-2">
              Tools
            </h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((link, _index) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b-2 border-dashed border-foreground/25 dark:border-primary/25 pb-2">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b-2 border-dashed border-foreground/25 dark:border-primary/25 pb-2">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 border-t-2 border-dashed border-foreground/25 dark:border-primary/25 pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevTools. Made with ♥ for developers.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
