import { FileText } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface EncodingConverterHeroProps {
  lang: LanguageType;
}

export function EncodingConverterHero({ lang }: EncodingConverterHeroProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-10 text-center">
      <div className="pixel-icon-box inline-flex items-center justify-center w-16 h-16 mb-6">
        <FileText className="h-8 w-8 text-primary" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        {t("encodingConverter.pageTitle")}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t("encodingConverter.pageSubtitle")}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          t("badge.multiEncoding"),
          t("badge.realtimeConversion"),
          t("badge.formatSupport"),
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
