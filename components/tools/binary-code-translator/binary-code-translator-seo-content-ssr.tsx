import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface BinaryCodeTranslatorSeoContentProps {
  lang: LanguageType;
}

export function BinaryCodeTranslatorSeoContent({
  lang,
}: BinaryCodeTranslatorSeoContentProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-12">
      <article className="prose prose-sm dark:prose-invert max-w-none">
        <h2 className="text-xl font-semibold mb-4">
          {t("binaryCodeTranslator.seoTitle")}
        </h2>
        <div
          className="text-muted-foreground space-y-4"
          dangerouslySetInnerHTML={{
            __html: t("binaryCodeTranslator.seoContent"),
          }}
        />
      </article>
    </section>
  );
}
