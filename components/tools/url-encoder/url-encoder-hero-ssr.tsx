import { Link2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface UrlEncoderHeroProps {
  lang: LanguageType;
}

export function UrlEncoderHero({ lang }: UrlEncoderHeroProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-10 text-center" aria-labelledby="hero-title">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 pixel-icon-box">
        <Link2 className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
        id="hero-title"
      >
        {t("urlEncoder.pageTitle")}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t("urlEncoder.pageSubtitle")}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          t("badge.free"),
          t("badge.noSignup"),
          t("badge.offline"),
          t("badge.privacy"),
        ].map((tag) => (
          <span key={tag} className="pixel-badge">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
