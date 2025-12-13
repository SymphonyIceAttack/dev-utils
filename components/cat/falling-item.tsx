"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useRef, useState } from "react";
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
  cookie: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="12" fill="hsl(35, 55%, 60%)" />
      <circle cx="12" cy="12" r="2" fill="hsl(155, 40%, 35%)" />
      <circle cx="20" cy="14" r="2" fill="hsl(155, 40%, 35%)" />
      <circle cx="14" cy="20" r="2" fill="hsl(155, 40%, 35%)" />
      <circle cx="20" cy="20" r="1.5" fill="hsl(155, 40%, 35%)" />
      <circle cx="10" cy="17" r="1.5" fill="hsl(155, 40%, 35%)" />
    </svg>
  ),
  star: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path
        d="M16 2 L19 12 L30 12 L21 18 L24 28 L16 22 L8 28 L11 18 L2 12 L13 12 Z"
        fill="hsl(50, 80%, 55%)"
        stroke="hsl(45, 70%, 45%)"
        strokeWidth="1"
      />
      <circle cx="16" cy="14" r="3" fill="hsl(50, 90%, 75%)" />
    </svg>
  ),
};

interface FallingItemProps {
  id: string;
  type: CatItemType;
  initialX: number;
}

export function FallingItem({ id, type, initialX }: FallingItemProps) {
  const { feedCat, setMood } = useCat();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleItemClick = () => {
    if (!isFlying) {
      triggerFlyToHome();
    }
  };

  const triggerFlyToHome = () => {
    if (isFlying) return;

    setIsFlying(true);

    // 让小猫开心，表示收到物品了
    setMood("happy");

    // 找到网站图标位置
    const logoElement = document.querySelector("#site-logo");
    if (logoElement && typeof window !== "undefined") {
      const logoRect = logoElement.getBoundingClientRect();
      const itemRect = itemRef.current?.getBoundingClientRect();
      if (itemRect) {
        const targetX = logoRect.left + logoRect.width / 2 - itemRect.width / 2;
        const targetY =
          logoRect.top + logoRect.height / 2 - itemRect.height / 2;
        setTargetPosition({ x: targetX, y: targetY });
      }
    }

    // 在飞行动画完成后添加物品到库存
    setTimeout(() => {
      // 只添加物品到库存，不触发表情变化
      feedCat(id);
    }, 5500); // 动画完成后执行

    // 让小猫恢复原样
    setTimeout(() => {
      setMood("idle");
    }, 4500);
  };

  useEffect(() => {
    // 10秒后自动飞入小猫的家里
    const timer = setTimeout(() => {
      if (!isFlying) {
        triggerFlyToHome();
      }
    }, 10000); // 掉落时间

    return () => {
      clearTimeout(timer);
    };
  }, [id, isFlying]);

  return (
    <motion.div
      ref={itemRef}
      onClick={handleItemClick}
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
        opacity: isFlying ? 0.8 : 1,
        rotate: 0, // 不旋转
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: isFlying ? 5 : 1.5, // 飞行动画时长
      }}
      whileHover={{ scale: 1.0 }} // 保持原大小，不放大
      whileTap={{ scale: 0.9 }}
      className="fixed z-40 cursor-pointer pointer-events-auto"
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
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

          {/* Flying effect particles */}
          {isFlying && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: [-10, -20] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -left-2 top-1/2 -translate-y-1/2 text-primary/60"
            >
              ✦
            </motion.div>
          )}

          {/* Flying effect particles 2 */}
          {isFlying && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: [10, 20] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.2,
              }}
              className="absolute -right-2 top-1/2 -translate-y-1/2 text-primary/60"
            >
              ✦
            </motion.div>
          )}

          {/* Tooltip */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-lg transition-opacity whitespace-nowrap"
            style={{ opacity: showTooltip ? 1 : 0 }}
          >
            点击物品飞入小猫的家里！
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
