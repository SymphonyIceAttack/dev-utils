"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { type CatItemType, useCat } from "@/context/cat-context";

const GhibliIcons: Record<CatItemType, React.ReactNode> = {
  fish: (
    <svg width="32" height="32" viewBox="0 0 32 32">
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
    <svg width="32" height="32" viewBox="0 0 32 32">
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
    <svg width="32" height="32" viewBox="0 0 32 32">
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
    <svg width="32" height="32" viewBox="0 0 32 32">
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
    <svg width="32" height="32" viewBox="0 0 32 32">
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
    <svg width="32" height="32" viewBox="0 0 32 32">
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
    <svg width="32" height="32" viewBox="0 0 32 32">
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

const itemNames: Record<CatItemType, string> = {
  fish: "Forest Fish",
  yarn: "Leaf Yarn",
  book: "Wisdom Book",
  keyboard: "Nature Keys",
  coffee: "Herb Tea",
  sparkles: "Magic Sparkles",
  binary: "Binary Crystal",
};

interface FallingItemProps {
  id: string;
  type: CatItemType;
  initialX: number;
}

export function FallingItem({ id, type, initialX }: FallingItemProps) {
  const { feedCat } = useCat();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const flyToLogo = useCallback(() => {
    if (isFlying) return;

    const logoElement = document.querySelector("#site-logo");
    if (logoElement && typeof window !== "undefined") {
      const logoRect = logoElement.getBoundingClientRect();
      const itemRect = itemRef.current?.getBoundingClientRect();
      if (itemRect) {
        const targetX = logoRect.left + logoRect.width / 2 - itemRect.width / 2;
        const targetY =
          logoRect.top + logoRect.height / 2 - itemRect.height / 2;
        setTargetPosition({ x: targetX, y: targetY });
        setIsFlying(true);
      }
    }
  }, [isFlying]);

  // Auto fly to logo after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isFlying) {
        flyToLogo();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, isFlying, flyToLogo]);

  const handleClick = () => {
    if (!isFlying) {
      flyToLogo();
    }
  };

  const handleAnimationComplete = () => {
    if (isFlying) {
      feedCat(id);
    }
  };

  return (
    <motion.div
      ref={itemRef}
      initial={{ x: `${initialX}vw`, y: -100, opacity: 0, rotate: -20 }}
      animate={{
        y:
          isFlying && targetPosition
            ? targetPosition.y
            : typeof window !== "undefined"
              ? window.innerHeight - 150
              : 500,
        x: isFlying && targetPosition ? targetPosition.x : undefined,
        scale: isFlying ? 0.3 : 1,
        opacity: isFlying ? 0 : 1,
        rotate: 0,
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: isFlying ? 0.5 : 1.5,
      }}
      onAnimationComplete={handleAnimationComplete}
      onClick={handleClick}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: isFlying ? 0.3 : 1.1 }}
      className="fixed z-40 cursor-pointer pointer-events-auto"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="relative bg-card border-2 border-primary/40 rounded-2xl p-3 shadow-lg"
          style={{ boxShadow: "3px 3px 0 0 var(--primary)" }}
        >
          {GhibliIcons[type]}

          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {itemNames[type]}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
          </div>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-1 -right-1 text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <ellipse
              cx="8"
              cy="8"
              rx="3"
              ry="6"
              fill="currentColor"
              transform="rotate(-30 8 8)"
            />
            <path
              d="M8 2 Q10 8 8 14"
              stroke="hsl(155, 50%, 30%)"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
