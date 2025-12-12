"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
];

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
      <rect
        x="13"
        y="1"
        width="1"
        height="1"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full border-b-2 border-foreground/40 dark:border-primary/30 bg-card/95 backdrop-blur-sm"
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo - 悬停动画 */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="pixel-icon-box p-1.5 group-hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <PixelHouseLogo />
          </motion.div>
          <span className="text-xl font-bold tracking-tight">DevTools</span>
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
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent/50 rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
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
                  <span className="sr-only">Change language</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-2 border-foreground/50 dark:border-primary/40"
              style={{ boxShadow: "3px 3px 0 0 var(--foreground)" }}
            >
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DropdownMenuItem
                    onClick={() => setCurrentLang(lang.code)}
                    className={`rounded-lg ${currentLang === lang.code ? "bg-accent" : ""}`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle - 旋转动画 */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
            >
              <motion.div
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </motion.div>
              <span className="sr-only">Toggle theme</span>
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
                    href={link.href}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground rounded-xl border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30 transition-colors hover:bg-accent hover:text-foreground block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
