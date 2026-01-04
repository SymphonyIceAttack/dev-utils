import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface EmailToolFaqProps {
  lang: LanguageType;
}

export function EmailToolFaq({ lang }: EmailToolFaqProps) {
  const { t } = useTranslation(lang);

  const faqs = [
    { q: t("emailTool.faq.q1"), a: t("emailTool.faq.a1") },
    { q: t("emailTool.faq.q2"), a: t("emailTool.faq.a2") },
    { q: t("emailTool.faq.q3"), a: t("emailTool.faq.a3") },
    { q: t("emailTool.faq.q4"), a: t("emailTool.faq.a4") },
    { q: t("emailTool.faq.q5"), a: t("emailTool.faq.a5") },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25">
        {t("emailTool.faqTitle")}
      </h2>
      <section className="space-y-4 pt-6">
        {faqs.map((faq, index) => (
          <div key={index} className="pixel-card p-4">
            <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
            <p className="text-sm text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
