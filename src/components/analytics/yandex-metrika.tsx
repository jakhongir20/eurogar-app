"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { GOALS, metrikaId, trackGoal } from "@/lib/analytics";

/**
 * Yandex Metrika.
 *
 * - Skript `afterInteractive` bilan yuklanadi: sahifa chizilishiga va
 *   gidratsiyaga xalaqit bermaydi.
 * - Next.js sahifalar orasida to'liq qayta yuklanmaydi, shuning uchun
 *   yo'l o'zgarganda `hit` qo'lda yuboriladi — aks holda faqat birinchi
 *   sahifa hisoblanardi.
 * - Telefon va ijtimoiy tarmoq bosishlari bitta umumiy tinglovchi orqali
 *   qayd etiladi (har bir havolani alohida o'zgartirish shart emas).
 */
export function YandexMetrika() {
  const id = metrikaId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ── Sahifa ko'rishlarini qayd etish ──
     `defer: true` bo'lgani uchun birinchi ko'rish ham shu yerdan yuboriladi.
     Skript `afterInteractive` bilan yuklanadi, effekt esa undan oldin
     ishga tushishi mumkin — shuning uchun `ym` paydo bo'lguncha qisqa
     kutish bor, aks holda birinchi ko'rish yo'qolardi. */
  useEffect(() => {
    if (!id) return;
    const qs = searchParams.toString();
    const url = pathname + (qs ? `?${qs}` : "");

    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const send = () => {
      if (window.ym) {
        window.ym(id, "hit", url, { referer: document.referrer });
      } else if (tries++ < 20) {
        timer = setTimeout(send, 250);
      }
    };
    send();
    return () => clearTimeout(timer);
  }, [id, pathname, searchParams]);

  /* ── Telefon / messenjer bosishlari ── */
  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!href) return;

      if (href.startsWith("tel:")) {
        trackGoal(GOALS.phone, { raqam: href.replace("tel:", "") });
      } else if (/(^https?:\/\/)?(t\.me|telegram\.me)\//.test(href)) {
        trackGoal(GOALS.telegram);
      } else if (/instagram\.com|facebook\.com|youtube\.com/.test(href)) {
        trackGoal(GOALS.social, { tarmoq: new URL(href, location.href).hostname });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [id]);

  if (!id) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${id}, "init", {
          defer: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
      `}
    </Script>
  );
}
