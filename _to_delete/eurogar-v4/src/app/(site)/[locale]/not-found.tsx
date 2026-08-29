import { useTranslations } from "next-intl";
import { Home, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ButtonShell } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tn = useTranslations("nav");

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-bone-100 text-graphite">
      <div className="grid-texture-light pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 size-[34rem] -translate-x-1/2 rounded-full opacity-70 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-100), transparent 70%)",
        }}
      />

      <div className="container-x relative text-center">
        <div className="font-display text-[clamp(5rem,18vw,12rem)] leading-none font-black text-metal">
          404
        </div>
        <h1 className="font-display mt-4 text-[clamp(1.4rem,3.5vw,2.2rem)] font-extrabold">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          {t("text")}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="group/btn">
            <ButtonShell
              variant="primary"
              size="lg"
              icon={<Home className="size-[18px]" strokeWidth={2.3} />}
              className="w-full sm:w-auto"
            >
              {t("home")}
            </ButtonShell>
          </Link>
          <Link href="/catalog" className="group/btn">
            <ButtonShell
              variant="light"
              size="lg"
              icon={<Search className="size-[18px]" strokeWidth={2.3} />}
              className="w-full sm:w-auto"
            >
              {tn("catalog")}
            </ButtonShell>
          </Link>
        </div>
      </div>
    </section>
  );
}
