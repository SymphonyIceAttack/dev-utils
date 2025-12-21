"use client";

import { AnimatePresence, motion } from "framer-motion";
import { List } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TOCItem {
  id: string;
  text?: string;
  title?: string;
  level: number;
}

interface StreamdownTOCProps {
  content?: string;
  items?: TOCItem[];
  className?: string;
  enableAutoExtract?: boolean;
  stickyOffset?: number;
  showProgress?: boolean;
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function StreamdownTOC({
  items,
  content,
  className = "",
  enableAutoExtract = false,
  stickyOffset = 80,
}: StreamdownTOCProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const tocItems = items || headings;

  // Auto-extract TOC from markdown content if enabled and no items provided
  useEffect(() => {
    if (enableAutoExtract && content && !items) {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      const extractedHeadings: TOCItem[] = [];
      let match = headingRegex.exec(content);

      const idCounts = new Map<string, number>();

      while (match !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        let id = generateId(text);

        const count = idCounts.get(id) || 0;
        if (count > 0) {
          id = `${id}-${count + 1}`;
        }
        idCounts.set(id, count + 1);

        extractedHeadings.push({ id, text, level });
        match = headingRegex.exec(content);
      }

      setHeadings(extractedHeadings);
    }
  }, [content, enableAutoExtract, items]);

  // Setup IDs and intersection observer
  useEffect(() => {
    let mounted = true;
    let mutationTimeout: NodeJS.Timeout;

    const addIdsAndObserve = () => {
      if (!mounted) return;

      const headingElements = document.querySelectorAll(
        ".streamdown-content h1, .streamdown-content h2, .streamdown-content h3, .streamdown-content h4, .streamdown-content h5, .streamdown-content h6",
      );

      // Add IDs to headings
      headingElements.forEach((heading) => {
        if (!heading.id) {
          const text = heading.textContent || "";
          heading.id = generateId(text);
        }
      });

      // Find first heading that's in view for initial highlight
      const findInitialActive = (): string => {
        const viewportHeight = window.innerHeight;
        for (const heading of headingElements) {
          const rect = heading.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= viewportHeight * 0.4) {
            return heading.id;
          }
        }
        // If no heading in view, use first one
        if (headingElements.length > 0) {
          return headingElements[0].id;
        }
        return "";
      };

      // Set initial active ID
      const initialId = findInitialActive();
      if (initialId) {
        setActiveId(initialId);
      }

      // Setup intersection observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-15% 0px -80% 0px",
          threshold: 0,
        },
      );

      headingElements.forEach((el) => {
        observer.observe(el);
      });
      observerRef.current = observer;
    };

    // Execute after a delay to ensure DOM is ready
    const timer = setTimeout(() => {
      addIdsAndObserve();
    }, 200);

    // Setup mutation observer
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(() => {
        if (mounted) {
          addIdsAndObserve();
        }
      }, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mounted = false;
      clearTimeout(timer);
      clearTimeout(mutationTimeout);
      mutationObserver.disconnect();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.offsetTop - stickyOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  if (tocItems.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Button */}
      <motion.button
        type="button"
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <List className="w-6 h-6" />
      </motion.button>

      {/* Mobile TOC Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed right-0 top-0 h-full w-80 bg-background border-l shadow-xl z-50 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Table of Contents</h3>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1">
                  {tocItems.map((heading) => (
                    <button
                      key={heading.id}
                      type="button"
                      className={`block w-full text-left py-2 px-4 text-sm rounded-lg transition-colors ${
                        activeId === heading.id
                          ? "bg-muted text-foreground font-medium"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                      style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                      onClick={() => scrollToHeading(heading.id)}
                    >
                      {heading.text || heading.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop TOC */}
      <Card
        className={`hidden lg:block sticky top-6 bg-card border-border max-h-[calc(100dvh-8rem)] overflow-y-auto self-start ${className}`}
      >
        <CardHeader className="pb-3 pt-6">
          <CardTitle className="text-lg">Table of Contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 pb-6">
          {tocItems.map((heading) => (
            <button
              key={heading.id}
              type="button"
              className={`block w-full text-left py-1.5 text-sm transition-colors ${
                activeId === heading.id
                  ? "text-foreground font-medium border-l-2 border-primary pl-2 -ml-2.5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{
                paddingLeft:
                  activeId !== heading.id
                    ? `${(heading.level - 1) * 12 + 8}px`
                    : `${(heading.level - 1) * 12 + 16}px`,
              }}
              onClick={() => scrollToHeading(heading.id)}
            >
              {heading.text || heading.title}
            </button>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
