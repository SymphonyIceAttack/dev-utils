import { KeyRound } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface UuidGeneratorHeroProps {
  lang: LanguageType;
}

export function UuidGeneratorHero({ lang }: UuidGeneratorHeroProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 pixel-icon-box">
        <KeyRound className="h-8 w-8 text-primary" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        {t("uuidGenerator.pageTitle") || "UUID Generator"}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t("uuidGenerator.pageSubtitle") ||
          "Generate universally unique identifiers instantly"}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          t("badge.free"),
          t("badge.noSignup"),
          t("badge.offline"),
          t("badge.rfcCompliant"),
        ].map((tag) => (
          <span key={tag} className="pixel-badge">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
