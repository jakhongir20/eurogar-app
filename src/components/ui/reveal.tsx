"use client";

import { motion } from "motion/react";
import { Fragment, type CSSProperties, type ReactNode } from "react";
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

/**
 * Har bir so'zni alohida ko'taradigan sarlavha animatsiyasi.
 *
 * MUHIM: bu komponent motion ISHLATMAYDI. Sarlavha — sahifaning LCP
 * elementi; uni JS bilan animatsiya qilganda matn gidratsiyagacha
 * ko'rinmay turadi va mobil ulanishda LCP bir necha soniyaga cho'ziladi.
 * Animatsiya globals.css dagi `word-rise` keyframe orqali beriladi —
 * u stil o'qilishi bilan darhol boshlanadi.
 */
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
    <span
      className={cn("word-rise inline-block", className)}
      style={{ "--eg-d": `${delay}s` } as CSSProperties}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em]">
            <span
              className={wordClassName}
              style={{ "--eg-i": i } as CSSProperties}
            >
              {w}
            </span>
          </span>
          {/* bo'sh joy inline-block TAShQARISIDA — aks holda kesiladi */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
