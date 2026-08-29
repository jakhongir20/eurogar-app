"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal primitivlari.
 *
 * MUHIM: bu yerda `useReducedMotion()` bo'yicha shartli render QILINMAYDI —
 * aks holda server va brauzer boshlang'ich uslublari farq qilib, gidratsiya
 * xatosi (React #418) chiqadi. "Harakatni kamaytirish" rejimi `Providers`
 * ichidagi <MotionConfig reducedMotion="user"> orqali global boshqariladi.
 */

type Dir = "up" | "down" | "left" | "right" | "none";

const offset: Record<Dir, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  dir = "up",
  duration = 0.75,
  once = true,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  dir?: Dir;
  duration?: number;
  once?: boolean;
  blur?: boolean;
}) {
  const o = offset[dir];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: o.x,
        y: o.y,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -60px 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Bolalarni ketma-ket ochib boradi */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  dir = "up",
}: {
  children: ReactNode;
  className?: string;
  dir?: Dir;
}) {
  const o = offset[dir];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: o.x, y: o.y, filter: "blur(6px)" },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Har bir so'zni alohida ko'taradigan sarlavha animatsiyasi */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
