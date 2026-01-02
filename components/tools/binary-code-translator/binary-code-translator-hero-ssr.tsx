import { Binary } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface BinaryCodeTranslatorHeroProps {
  lang: LanguageType;
}

export function BinaryCodeTranslatorHero({
  lang,
}: BinaryCodeTranslatorHeroProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 pixel-icon-box">
        <Binary className="h-8 w-8 text-primary" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        {t("binaryCodeTranslator.pageTitle") || "Binary Code Translator"}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t("binaryCodeTranslator.pageSubtitle") ||
          "Convert text to binary and binary to text instantly"}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          t("badge.free"),
          t("badge.noSignup"),
          t("badge.offline"),
          t("badge.instant"),
        ].map((tag) => (
          <span key={tag} className="pixel-badge">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
