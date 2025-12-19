"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";
import { languageNames, supportedLocales } from "@/lib/translations";

const navLinks = [
  { href: "", labelKey: "nav.home" },
  { href: "/tools", labelKey: "nav.tools" },
  { href: "/blog", labelKey: "nav.blog" },
];

function KittyEncodeLogo() {
  return (
    <img
      src="/base-logo.png"
      alt="KittyEncode"
      width={32}
      height={32}
      className="rounded-lg"
      style={{ imageRendering: "pixelated" }}
      loading="eager"
      fetchPriority="high"
    />
  );
}

interface NavbarProps {
  lang: LanguageType;
}

export function Navbar({ lang }: NavbarProps) {
  const { setTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isCatDragging } = useCat();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(lang);

  const handleLanguageChange = (newLang: string) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground/40 dark:border-primary/30 bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo - with drag hint animation */}
        <Link
          href="/"
          id="site-logo"
          className="flex items-center gap-3 group"
          aria-label="返回首页"
        >
          <motion.div
            className={`pixel-icon-box p-1.5 transition-colors relative ${
              isCatDragging ? "bg-primary/30" : "group-hover:bg-primary/20"
            }`}
            animate={
              isCatDragging
                ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(var(--primary-rgb), 0)",
                      "0 0 0 12px rgba(var(--primary-rgb), 0.3)",
                      "0 0 0 0 rgba(var(--primary-rgb), 0)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isCatDragging ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            aria-describedby={isCatDragging ? "drag-hint" : undefined}
          >
            <motion.div
              animate={
                isCatDragging
                  ? {
                      y: [0, -3, 0],
                      rotate: [0, -5, 5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                repeat: isCatDragging ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            >
              <KittyEncodeLogo />
            </motion.div>

            <AnimatePresence>
              {isCatDragging && (
                <>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                      y: [0, -8, 0],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0,
                    }}
                    className="absolute -top-1 -left-1 text-primary text-xs"
                  >
                    ✦
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                      y: [0, -8, 0],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.3,
                    }}
                    className="absolute -top-1 -right-1 text-emerald-400 text-xs"
                  >
                    ✦
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.6,
                    }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-teal-300 text-xs"
                  >
                    ✦
                  </motion.span>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">
              KittyEncode
            </span>
            <AnimatePresence>
              {isCatDragging && (
                <motion.span
                  initial={{ opacity: 0, height: 0, y: -5 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -5 }}
                  className="text-xs text-primary font-medium"
                >
                  {t("cat.dropHint")}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* Desktop Navigation - 交错动画 */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={`/${lang}${link.href}`}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent/50 rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(link.labelKey)}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t("button.switchLanguage")}</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-2 border-foreground/50 dark:border-primary/40"
              style={{ boxShadow: "3px 3px 0 0 var(--foreground)" }}
            >
              {supportedLocales.map((locale, index) => (
                <motion.div
                  key={locale}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DropdownMenuItem
                    onClick={() => handleLanguageChange(locale)}
                    className={`rounded-lg ${lang === locale ? "bg-accent" : ""}`}
                  >
                    {languageNames[locale]}
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle - 渐入渐出动画 */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30 relative"
            >
              <motion.div
                className="relative w-5 h-5"
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  suppressHydrationWarning
                  animate={{
                    opacity: theme === "dark" ? 0 : 1,
                    scale: theme === "dark" ? 0 : 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  suppressHydrationWarning
                  animate={{
                    opacity: theme === "dark" ? 1 : 0,
                    scale: theme === "dark" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              </motion.div>
              <span className="sr-only">{t("button.switchTheme")}</span>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu - 展开动画 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border-t-2 border-foreground/30 dark:border-primary/30 md:hidden bg-card/95 backdrop-blur-sm overflow-hidden"
          >
            <nav className="container mx-auto flex flex-col gap-1 p-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${lang}${link.href}`}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground rounded-xl border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30 transition-colors hover:bg-accent hover:text-foreground block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
