"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function Counter({
  to,
  from = 0,
  duration = 1900,
  suffix = "",
  prefix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Chetlanish faqat vertikal: "-60px" barcha tomonlarga qo'llansa,
  // tor ekranda chap chetdagi element hech qachon ko'rinish zonasiga tushmaydi.
  const inView = useInView(ref, { once: true, margin: "0px 0px -70px 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    /* "harakatni kamaytirish" yoqilgan bo'lsa — bitta kadrda yakuniy qiymat */
    const dur = reduce ? 0 : duration;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = dur <= 0 ? 1 : Math.min((now - start) / dur, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {new Intl.NumberFormat("ru-RU").format(value)}
      {suffix}
    </span>
  );
}
