"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { type CatItemType, useCat } from "@/context/cat-context";

const GhibliIcons: Record<CatItemType, React.ReactNode> = {
  fish: (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <ellipse cx="16" cy="16" rx="10" ry="6" fill="hsl(180, 45%, 55%)" />
      <path d="M26 16 L32 10 L32 22 Z" fill="hsl(180, 45%, 55%)" />
      <circle cx="10" cy="14" r="2" fill="hsl(180, 50%, 25%)" />
      <circle cx="11" cy="13" r="0.8" fill="white" />
      <path
        d="M14 18 Q16 20 18 18"
        stroke="hsl(180, 50%, 35%)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  yarn: (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="12" fill="hsl(155, 40%, 50%)" />
      <path
        d="M8 12 Q16 8 24 12"
        stroke="hsl(155, 45%, 35%)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M6 18 Q16 14 26 18"
        stroke="hsl(155, 45%, 35%)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10 24 Q16 20 22 24"
        stroke="hsl(155, 45%, 35%)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M26 16 Q30 12 28 8"
        stroke="hsl(155, 40%, 50%)"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  ),
  book: (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <rect
        x="4"
        y="6"
        width="24"
        height="20"
        rx="2"
        fill="hsl(35, 50%, 55%)"
      />
      <rect
        x="6"
        y="8"
        width="20"
        height="16"
        rx="1"
        fill="hsl(45, 60%, 92%)"
      />
      <path d="M16 8 L16 24" stroke="hsl(35, 40%, 45%)" strokeWidth="1" />
      <path d="M10 12 L14 12" stroke="hsl(155, 40%, 45%)" strokeWidth="1.5" />
      <path d="M10 15 L14 15" stroke="hsl(155, 40%, 45%)" strokeWidth="1.5" />
      <path d="M18 12 L22 12" stroke="hsl(155, 40%, 45%)" strokeWidth="1.5" />
      <path d="M18 15 L22 15" stroke="hsl(155, 40%, 45%)" strokeWidth="1.5" />
    </svg>
  ),
  keyboard: (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <rect
        x="2"
        y="10"
        width="28"
        height="14"
        rx="3"
        fill="hsl(155, 25%, 40%)"
      />
      <rect
        x="4"
        y="12"
        width="24"
        height="10"
        rx="2"
        fill="hsl(155, 20%, 85%)"
      />
      <rect
        x="6"
        y="14"
        width="4"
        height="2"
        rx="0.5"
        fill="hsl(155, 30%, 50%)"
      />
      <rect
        x="12"
        y="14"
        width="4"
        height="2"
        rx="0.5"
        fill="hsl(155, 30%, 50%)"
      />
      <rect
        x="18"
        y="14"
        width="4"
        height="2"
        rx="0.5"
        fill="hsl(155, 30%, 50%)"
      />
      <rect
        x="24"
        y="14"
        width="2"
        height="2"
        rx="0.5"
        fill="hsl(155, 30%, 50%)"
      />
      <rect
        x="8"
        y="18"
        width="14"
        height="2"
        rx="0.5"
        fill="hsl(155, 30%, 50%)"
      />
    </svg>
  ),
  coffee: (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <path
        d="M6 12 L8 26 Q8 28 10 28 L20 28 Q22 28 22 26 L24 12 Z"
        fill="hsl(155, 35%, 50%)"
      />
      <ellipse cx="15" cy="12" rx="9" ry="3" fill="hsl(30, 40%, 45%)" />
      <ellipse cx="15" cy="12" rx="7" ry="2" fill="hsl(30, 35%, 55%)" />
      <path
        d="M24 15 Q28 15 28 19 Q28 23 24 23"
        stroke="hsl(155, 35%, 45%)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M12 6 Q11 3 13 3"
        stroke="hsl(155, 20%, 70%)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M15 5 Q14 2 16 2"
        stroke="hsl(155, 20%, 70%)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M18 6 Q17 3 19 3"
        stroke="hsl(155, 20%, 70%)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
    </svg>
  ),
  sparkles: (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <path
        d="M16 2 L18 12 L28 14 L18 16 L16 26 L14 16 L4 14 L14 12 Z"
        fill="hsl(50, 80%, 55%)"
        stroke="hsl(45, 70%, 45%)"
        strokeWidth="1"
      />
      <circle cx="16" cy="14" r="2" fill="hsl(50, 90%, 75%)" />
    </svg>
  ),
  binary: (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <rect
        x="6"
        y="6"
        width="20"
        height="20"
        rx="4"
        fill="hsl(200, 60%, 45%)"
      />
      <rect
        x="10"
        y="10"
        width="12"
        height="12"
        rx="2"
        fill="hsl(200, 50%, 30%)"
      />
      <text
        x="11"
        y="17"
        fontSize="6"
        fontFamily="monospace"
        fill="hsl(150, 70%, 70%)"
      >
        01
      </text>
      <text
        x="11"
        y="23"
        fontSize="6"
        fontFamily="monospace"
        fill="hsl(150, 70%, 70%)"
      >
        10
      </text>
    </svg>
  ),
};

const itemConfig: Record<CatItemType, { name: string; description: string }> = {
  fish: {
    name: "Forest Fish",
    description: "Earned from URL encoding",
  },
  yarn: {
    name: "Leaf Yarn",
    description: "Earned from JSON formatting",
  },
  book: {
    name: "Wisdom Book",
    description: "Earned from Base64 encoding",
  },
  keyboard: {
    name: "Nature Keys",
    description: "Earned from Hash generation",
  },
  coffee: {
    name: "Herb Tea",
    description: "Earned from UUID generation",
  },
  sparkles: {
    name: "Magic Sparkles",
    description: "Earned from Password generation",
  },
  binary: {
    name: "Binary Crystal",
    description: "Earned from Binary code translation",
  },
};

function ItemSlot({
  type,
  unlocked,
}: {
  type: CatItemType;
  unlocked: boolean;
}) {
  const config = itemConfig[type];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      whileHover={unlocked ? { scale: 1.1, y: -5 } : undefined}
      className={`
        relative p-4 rounded-2xl border-2 transition-all
        ${
          unlocked
            ? "bg-card border-primary/50 shadow-lg cursor-pointer"
            : "bg-muted/50 border-dashed border-muted-foreground/30 cursor-not-allowed"
        }
      `}
      style={unlocked ? { boxShadow: "3px 3px 0 0 var(--primary)" } : undefined}
    >
      <div
        className={`flex flex-col items-center gap-2 ${unlocked ? "" : "opacity-30 grayscale"}`}
      >
        <div className={unlocked ? "text-primary" : "text-muted-foreground"}>
          {GhibliIcons[type]}
        </div>
        <span className="text-sm font-medium text-center">{config.name}</span>
      </div>

      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-muted-foreground"
          >
            <rect
              x="6"
              y="11"
              width="12"
              height="10"
              rx="2"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M8 11 V8 A4 4 0 0 1 16 8 V11"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      )}

      {/* Tooltip for unlocked items */}
      {unlocked && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          {config.description}
        </div>
      )}
    </motion.div>
  );
}

function GhibliHomeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {/* Roof */}
      <path
        d="M16 4 L4 14 L8 14 L8 26 L24 26 L24 14 L28 14 Z"
        fill="hsl(155, 35%, 45%)"
      />
      {/* Wall */}
      <rect x="10" y="14" width="12" height="12" fill="hsl(45, 50%, 85%)" />
      {/* Door */}
      <rect
        x="14"
        y="18"
        width="4"
        height="8"
        rx="1"
        fill="hsl(35, 45%, 50%)"
      />
      {/* Window */}
      <rect
        x="11"
        y="16"
        width="4"
        height="4"
        rx="0.5"
        fill="hsl(200, 60%, 70%)"
      />
      <path
        d="M13 16 L13 20 M11 18 L15 18"
        stroke="hsl(45, 40%, 75%)"
        strokeWidth="0.5"
      />
      {/* Chimney */}
      <rect x="20" y="8" width="3" height="6" fill="hsl(20, 40%, 50%)" />
    </svg>
  );
}

export function CatHomeModal() {
  const { isHomeOpen, closeHome, inventory, getUnlockedCount, getTotalItems } =
    useCat();

  return (
    <AnimatePresence>
      {isHomeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeHome}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-gradient-to-b from-card to-muted rounded-3xl border-2 border-primary/40 shadow-2xl overflow-hidden"
            style={{ boxShadow: "6px 6px 0 0 var(--primary)" }}
          >
            <div className="relative h-36 bg-gradient-to-b from-primary/20 to-transparent overflow-hidden">
              {/* Decorative Ghibli clouds */}
              <svg
                className="absolute top-4 left-8 w-24 h-12 text-primary/20"
                viewBox="0 0 80 40"
              >
                <ellipse cx="20" cy="25" rx="15" ry="10" fill="currentColor" />
                <ellipse cx="40" cy="20" rx="20" ry="12" fill="currentColor" />
                <ellipse cx="60" cy="25" rx="15" ry="10" fill="currentColor" />
              </svg>
              <svg
                className="absolute top-6 right-16 w-20 h-10 text-primary/15"
                viewBox="0 0 80 40"
              >
                <ellipse cx="20" cy="25" rx="15" ry="10" fill="currentColor" />
                <ellipse cx="40" cy="20" rx="20" ry="12" fill="currentColor" />
                <ellipse cx="60" cy="25" rx="15" ry="10" fill="currentColor" />
              </svg>

              {/* Decorative leaves */}
              <motion.div
                animate={{ rotate: [0, 10, 0], y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-8 left-[45%] text-primary"
              >
                <svg width="20" height="20" viewBox="0 0 16 16">
                  <ellipse
                    cx="8"
                    cy="8"
                    rx="3"
                    ry="7"
                    fill="currentColor"
                    transform="rotate(-20 8 8)"
                  />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -15, 0], y: [0, -2, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
                className="absolute top-12 right-[30%] text-primary/70"
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <ellipse
                    cx="8"
                    cy="8"
                    rx="2.5"
                    ry="6"
                    fill="currentColor"
                    transform="rotate(15 8 8)"
                  />
                </svg>
              </motion.div>

              {/* Title */}
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <GhibliHomeIcon />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Forest Cat's Home
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {getUnlockedCount()} / {getTotalItems()} treasures collected
                  </p>
                </div>
              </div>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeHome}
                className="absolute top-4 right-4 rounded-full hover:bg-destructive/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items grid */}
            <div className="p-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {(Object.keys(inventory) as CatItemType[]).map(
                  (type, index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ItemSlot type={type} unlocked={inventory[type]} />
                    </motion.div>
                  ),
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-primary/20">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Collection Progress
                  </span>
                  <span className="font-medium text-primary">
                    {Math.round((getUnlockedCount() / getTotalItems()) * 100)}%
                  </span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden border border-primary/20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(getUnlockedCount() / getTotalItems()) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative"
                  >
                    {/* Leaf decoration on progress */}
                    <motion.div
                      animate={{ x: [0, 2, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        className="text-primary-foreground"
                      >
                        <ellipse
                          cx="8"
                          cy="8"
                          rx="3"
                          ry="6"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Hint */}
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Use the dev tools to earn treasures for your forest cat!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
