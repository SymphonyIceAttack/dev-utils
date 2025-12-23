import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface EncodingConverterFaqProps {
  lang: LanguageType;
}

export function EncodingConverterFaq({ lang }: EncodingConverterFaqProps) {
  const { t } = useTranslation(lang);

  const faqItems = [
    {
      q: t("encodingConverter.faq.q1"),
      a: t("encodingConverter.faq.a1"),
    },
    {
      q: t("encodingConverter.faq.q2"),
      a: t("encodingConverter.faq.a2"),
    },
    {
      q: t("encodingConverter.faq.q3"),
      a: t("encodingConverter.faq.a3"),
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25">
        {t("encodingConverter.faqTitle")}
      </h2>

      <section className="space-y-4 pt-6">
        {faqItems.map((faq) => (
          <div key={faq.q} className="pixel-card p-4">
            <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
            <p className="text-sm text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
