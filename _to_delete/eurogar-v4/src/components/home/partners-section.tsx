"use client";

import { useTranslations } from "next-intl";
import { partners } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";

/**
 * Hamkor brendlar — AKFA, ENGELBERG, ALUTECH, DOORHAN.
 * Rasmiy logotiplar litsenziyasiz ishlatilmaydi, shuning uchun
 * brendlar tipografik belgilar sifatida ko'rsatiladi.
 */
export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section className="border-y border-bone-300 bg-white py-12 md:py-16">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display mt-3.5 text-[clamp(1.5rem,3.4vw,2.2rem)] leading-tight font-extrabold text-graphite">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted">
                {t("text")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} dir="left">
            <div className="grid grid-cols-2 gap-3">
              {partners.map((p) => (
                <div
                  key={p.id}
                  className="group flex h-20 items-center justify-center rounded-2xl border border-bone-300 bg-bone-100 px-7 transition-all duration-400 hover:-translate-y-1 hover:border-brand-400 hover:bg-white hover:shadow-[0_18px_40px_-22px_rgba(11,74,99,.4)]"
                >
                  <span className="font-display text-[17px] font-extrabold tracking-[0.08em] text-muted transition-colors duration-400 group-hover:text-navy-800 md:text-[19px]">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
