import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface PasswordGeneratorFaqProps {
  lang: LanguageType;
}

export function PasswordGeneratorFaq({ lang }: PasswordGeneratorFaqProps) {
  const { t } = useTranslation(lang);

  const faqItems = [
    {
      q: t("passwordGenerator.faq.q1"),
      a: t("passwordGenerator.faq.a1"),
    },
    {
      q: t("passwordGenerator.faq.q2"),
      a: t("passwordGenerator.faq.a2"),
    },
    {
      q: t("passwordGenerator.faq.q3"),
      a: t("passwordGenerator.faq.a3"),
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25">
        {t("passwordGenerator.faq.title")}
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
