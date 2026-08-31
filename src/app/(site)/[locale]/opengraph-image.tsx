import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

/**
 * Ijtimoiy tarmoqlarda ulashilganda ko'rinadigan rasm (Telegram, Facebook,
 * WhatsApp). Har til uchun alohida — matn o'sha tilda chiqadi.
 * Shrift maxsus yuklanmaydi: ImageResponse tizim shriftidan foydalanadi,
 * bu rasm generatsiyasini tez va yengil qiladi.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "EUROGAR";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  /* Matnni so'z chegarasida kesamiz — "1–5 yil k" kabi qoldiq bo'lmasin */
  const clip = (text: string, max: number) =>
    text.length <= max ? text : text.slice(0, text.lastIndexOf(" ", max)) + "…";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #04222f 0%, #0b4a63 55%, #146f99 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#29abe2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#04222f",
            }}
          >
            E
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            {t("title")}
          </div>
          <div style={{ fontSize: 28, color: "#9fd8e8", maxWidth: 900, lineHeight: 1.4 }}>
            {clip(t("description"), 118)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 24,
            color: "#c9eafa",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>{site.phones[0]}</div>
          <div style={{ display: "flex" }}>
            {locale === "uz" ? "Toshkent · Jizzax · Samarqand" : "Ташкент · Джизак · Самарканд"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
