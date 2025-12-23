import { KeyRound } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface PasswordGeneratorHeroProps {
  lang: LanguageType;
}

export function PasswordGeneratorHero({ lang }: PasswordGeneratorHeroProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-10 text-center" aria-labelledby="hero-title">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 pixel-icon-box">
        <KeyRound className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
        id="hero-title"
      >
        {t("passwordGenerator.pageTitle")}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t("passwordGenerator.pageSubtitle")}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          t("badge.cryptographicallySecure"),
          t("badge.multipleModes"),
          t("badge.passphraseSupport"),
          t("badge.bulkGeneration"),
        ].map((tag) => (
          <span key={tag} className="pixel-badge">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
