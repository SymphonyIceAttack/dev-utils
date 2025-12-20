"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

const footerLinks = {
  tools: [
    { labelKey: "footer.tool.urlEncoder", href: "/" },
    { labelKey: "footer.tool.base64Encoder", href: "/tools/base64-encoder" },
    { labelKey: "footer.tool.md5Generator", href: "/tools/md5-generator" },
    { labelKey: "footer.tool.uuidGenerator", href: "/tools/uuid-generator" },
    {
      labelKey: "footer.tool.passwordGenerator",
      href: "/tools/password-generator",
    },
    {
      labelKey: "footer.tool.encodingConverter",
      href: "/tools/encoding-converter",
    },
  ],
  company: [
    { labelKey: "footer.aboutUs", href: "/about" },
    { labelKey: "footer.contact", href: "/contact" },
  ],
  resources: [
    { labelKey: "footer.blog", href: "/blog" },
    {
      labelKey: "footer.githubProfile",
      href: "https://github.com/SymphonyIceAttack/kitty-encode",
    },
  ],
  legal: [
    { labelKey: "footer.privacyPolicy", href: "/privacy" },
    { labelKey: "footer.termsOfService", href: "/terms" },
    { labelKey: "footer.disclaimer", href: "/disclaimer" },
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

function KittyEncodeLogo() {
  return (
    <Image
      src="/base-logo.png"
      alt="KittyEncode logo"
      width={32}
      height={32}
      className="rounded-lg"
      style={{ imageRendering: "pixelated" }}
    />
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

interface FooterProps {
  lang: LanguageType;
}

export function Footer({ lang }: FooterProps) {
  const { t } = useTranslation(lang);

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
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <motion.div
                className="pixel-icon-box p-1.5"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                <KittyEncodeLogo />
              </motion.div>
              <span className="text-xl font-bold tracking-tight">
                KittyEncode
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            {/* 社交图标 */}
            <div className="mt-4 flex gap-2">
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://github.com/SymphonyIceAttack/kitty-encode"
                  className="p-2 rounded-xl border-2 border-foreground/40 dark:border-primary/40 hover:bg-accent transition-colors block"
                  style={{ boxShadow: "2px 2px 0 0 var(--foreground)" }}
                  aria-label="GitHub repository"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b-2 border-dashed border-foreground/25 dark:border-primary/25 pb-2">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={
                      link.href.startsWith("http")
                        ? link.href
                        : `/${lang}${link.href}`
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b-2 border-dashed border-foreground/25 dark:border-primary/25 pb-2">
              {t("footer.tools")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={
                      link.href.startsWith("http")
                        ? link.href
                        : `/${lang}${link.href}`
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b-2 border-dashed border-foreground/25 dark:border-primary/25 pb-2">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={
                      link.href.startsWith("http")
                        ? link.href
                        : `/${lang}${link.href}`
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b-2 border-dashed border-foreground/25 dark:border-primary/25 pb-2">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={
                      link.href.startsWith("http")
                        ? link.href
                        : `/${lang}${link.href}`
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
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
            © {new Date().getFullYear()} KittyEncode. {t("footer.madeWithLove")}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
