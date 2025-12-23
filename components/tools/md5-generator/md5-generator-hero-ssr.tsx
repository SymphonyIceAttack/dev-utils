import { Hash } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface Md5GeneratorHeroProps {
  lang: LanguageType;
}

export function Md5GeneratorHero({ lang }: Md5GeneratorHeroProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-10 text-center" aria-labelledby="hero-title">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 pixel-icon-box">
        <Hash className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
        id="hero-title"
      >
        {t("md5Generator.pageTitle")}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t("md5Generator.pageSubtitle")}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          t("badge.fileChecksums"),
          t("badge.batchProcessing"),
          t("badge.fileUpload"),
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
