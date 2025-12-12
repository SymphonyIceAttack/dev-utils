"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, List } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -60% 0%" },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="sticky top-24"
    >
      <div className="bg-card border-2 border-foreground/10 rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2 text-sm font-bold mb-4 text-foreground">
          <List className="h-4 w-4 text-accent" />
          Table of Contents
        </div>

        <ul className="space-y-1">
          {headings.map((heading, index) => (
            <motion.li
              key={heading.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <button
                type="button"
                onClick={() => handleClick(heading.id)}
                className={cn(
                  "block w-full text-left text-sm py-2 px-3 rounded-xl transition-all duration-200",
                  heading.level === 3 && "pl-5 text-xs",
                  activeId === heading.id
                    ? "text-accent font-semibold bg-accent/15 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <span className="line-clamp-2">{heading.text}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}

// Mobile TOC dropdown
export function MobileTableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="lg:hidden mb-8">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full bg-card border-2 border-foreground/10 rounded-xl p-4 text-sm font-bold hover:border-accent transition-colors shadow-[3px_3px_0_0_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.05)]"
        whileTap={{ scale: 0.98 }}
      >
        <List className="h-4 w-4 text-accent" />
        Table of Contents
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border-2 border-t-0 border-foreground/10 rounded-b-xl overflow-hidden -mt-1"
          >
            <ul className="p-4 space-y-1">
              {headings.map((heading, index) => (
                <motion.li
                  key={heading.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => handleClick(heading.id)}
                    className={cn(
                      "block w-full text-left text-sm py-2.5 px-3 rounded-lg transition-colors hover:bg-accent/10 hover:text-accent",
                      heading.level === 3 &&
                        "pl-6 text-xs text-muted-foreground",
                    )}
                  >
                    {heading.text}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
