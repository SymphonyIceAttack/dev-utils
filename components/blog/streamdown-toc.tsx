"use client";

import { AnimatePresence, motion } from "framer-motion";
import { List } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TOCItem {
  id: string;
  title?: string;
  text?: string; // 新增 text 属性以保持兼容性
  level: number;
  elementRef?: React.RefObject<HTMLButtonElement>; // 添加 ref 支持
}

type Heading = TOCItem; // 使用 TOCItem 作为 Heading 的别名

interface StreamdownTOCProps {
  content?: string; // Optional: pass raw markdown content for auto-extraction
  items?: Heading[]; // Optional: pass pre-extracted TOC items
  className?: string;
  enableAutoExtract?: boolean;
  stickyOffset?: number;
  showProgress?: boolean; // 是否显示阅读进度条
}

export function StreamdownTOC({
  items,
  content,
  className = "",
  enableAutoExtract = false,
  stickyOffset = 80,
  showProgress = true,
}: StreamdownTOCProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Refs for scroll containers
  const desktopTocRef = useRef<HTMLDivElement>(null);
  const mobileTocRef = useRef<HTMLDivElement>(null);

  // Auto-extract TOC from markdown content if enabled
  useEffect(() => {
    if (enableAutoExtract && content) {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      const extractedHeadings: Heading[] = [];
      let match: RegExpExecArray | null;

      while (true) {
        match = headingRegex.exec(content);
        if (match === null) {
          break;
        }

        const level = match[1].length;
        const text = match[2].trim();
        let id = text
          .toLowerCase()
          .replace(/[^\w\s-]/gu, "") // 使用 unicode 标志支持中文，与 Streamdown 组件保持一致
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

        // 处理重复的ID
        const existingIds = new Set(extractedHeadings.map((h) => h.id));
        if (existingIds.has(id)) {
          let counter = 1;
          let newId = `${id}-${counter}`;
          while (existingIds.has(newId)) {
            counter++;
            newId = `${id}-${counter}`;
          }
          id = newId;
        }

        extractedHeadings.push({ id, text, level });
      }

      setHeadings(extractedHeadings);
    }
  }, [content, enableAutoExtract]);

  // Use provided items or extracted items
  const tocItems = items || headings;

  // Create refs for each TOC item
  const tocItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Initialize refs array when items change
  useEffect(() => {
    if (tocItems.length > 0) {
      tocItemRefs.current = new Array(tocItems.length).fill(null);
    }
  }, [tocItems]);

  // Scroll tracking with Intersection Observer
  useEffect(() => {
    if (tocItems.length === 0) return;

    // First, try to observe existing elements
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most recently intersected heading
        let currentActive = "";
        let maxIntersectionRatio = 0;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersectionRatio
          ) {
            maxIntersectionRatio = entry.intersectionRatio;
            currentActive = entry.target.id;
          }
        });

        if (currentActive && currentActive !== activeId) {
          setActiveId(currentActive);
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: `-20% 0px -70% 0px`, // More generous margins
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    // Observe all headings
    const headingElements = tocItems
      .map((h) => {
        const element = document.getElementById(h.id);
        return element;
      })
      .filter(Boolean);

    headingElements.forEach((el) => {
      el && observer.observe(el);
    });

    // If no elements were found initially, retry after component is fully rendered
    if (headingElements.length === 0) {
      const retryObserver = new MutationObserver(() => {
        const retryElements = tocItems
          .map((h) => document.getElementById(h.id))
          .filter(Boolean);

        if (retryElements.length > 0) {
          retryElements.forEach((el) => {
            el && observer.observe(el);
          });
          retryObserver.disconnect();
        }
      });

      retryObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Also try after a timeout
      const timeout = setTimeout(() => {
        const retryElements = tocItems
          .map((h) => document.getElementById(h.id))
          .filter(Boolean);

        retryElements.forEach((el) => {
          el && observer.observe(el);
        });
        retryObserver.disconnect();
      }, 500);

      return () => {
        clearTimeout(timeout);
        retryObserver.disconnect();
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, [tocItems, stickyOffset, activeId]);

  // Enhanced fallback scroll tracking
  useEffect(() => {
    if (tocItems.length === 0) return;

    let ticking = false;

    const updateActiveHeading = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll position relative to viewport center
      const viewportCenter = scrollTop + windowHeight / 2;

      let closestHeading = "";
      let smallestDistance = Infinity;

      tocItems.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const elementCenter = elementTop + elementHeight / 2;

          // Calculate distance from viewport center to element center
          const distance = Math.abs(viewportCenter - elementCenter);

          // Only consider headings that are above the current scroll position
          if (
            elementTop <= scrollTop + windowHeight &&
            distance < smallestDistance
          ) {
            smallestDistance = distance;
            closestHeading = heading.id;
          }
        }
      });

      if (closestHeading && closestHeading !== activeId) {
        setActiveId(closestHeading);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveHeading);
        ticking = true;
      }
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call to set active heading
    updateActiveHeading();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tocItems, activeId]);

  // Auto-scroll to active heading when it changes
  useEffect(() => {
    if (!activeId || tocItems.length === 0) return;

    const scrollToActiveHeading = () => {
      const activeIndex = tocItems.findIndex((item) => item.id === activeId);
      if (activeIndex === -1) return;

      const activeElement = tocItemRefs.current[activeIndex];
      if (!activeElement) return;

      // Get the parent scroll container
      const scrollContainer = activeElement.closest(".overflow-y-auto");
      if (scrollContainer) {
        // Calculate the position relative to the container
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();

        // Check if element is visible in the container
        const isVisible =
          elementRect.top >= containerRect.top &&
          elementRect.bottom <= containerRect.bottom;

        if (!isVisible) {
          // Scroll the element into view within the container
          activeElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToActiveHeading, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId, tocItems]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHeading = (id: string) => {
    console.log("Scrolling to:", id); // 调试信息
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.offsetTop - stickyOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    } else {
      console.log("Element not found:", id); // 调试信息
    }
    setIsOpen(false);
  };

  const getIndentStyle = (level: number) => {
    const indent = (level - 1) * 12;
    return { paddingLeft: `${indent}px` };
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
                <div className="space-y-1" ref={mobileTocRef}>
                  {tocItems.map((heading, index) => {
                    const isActive = activeId === heading.id;
                    return (
                      <button
                        key={heading.id}
                        ref={(el) => {
                          tocItemRefs.current[index] = el;
                        }}
                        type="button"
                        className={`block w-full text-left py-2 px-4 text-sm rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg font-semibold border-l-4 border-blue-800"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                        }`}
                        style={getIndentStyle(heading.level)}
                        onClick={() => scrollToHeading(heading.id)}
                      >
                        {heading.text || heading.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop TOC */}
      <motion.aside
        className={`hidden lg:block w-64 flex-shrink-0 sticky top-6 self-start h-[80vh] ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-muted/30 rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 sticky top-0 bg-muted/30 py-2 z-10 flex-shrink-0">
            Table of Contents
          </h3>

          <div className="space-y-1 flex-1 overflow-y-auto" ref={desktopTocRef}>
            {tocItems.map((heading, index) => {
              const isActive = activeId === heading.id;
              return (
                <button
                  key={heading.id}
                  ref={(el) => {
                    tocItemRefs.current[index] = el;
                  }}
                  type="button"
                  className={`block w-full text-left py-2 px-4 text-sm rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg font-semibold border-l-4 border-blue-800 transform scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:shadow-md"
                  }`}
                  style={getIndentStyle(heading.level)}
                  onClick={() => scrollToHeading(heading.id)}
                >
                  {heading.text || heading.title}
                </button>
              );
            })}
          </div>

          {/* Progress indicator */}
          {showProgress && (
            <div className="pt-4 border-t border-border flex-shrink-0 mt-4">
              <div className="text-xs text-muted-foreground mb-2">
                Reading Progress
              </div>
              <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${scrollProgress}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round(scrollProgress)}% complete
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
