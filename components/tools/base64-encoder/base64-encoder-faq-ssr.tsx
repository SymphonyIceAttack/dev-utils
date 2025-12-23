import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface Base64EncoderFaqProps {
  lang: LanguageType;
}

export function Base64EncoderFaq({ lang }: Base64EncoderFaqProps) {
  const { t } = useTranslation(lang);

  const faqItems = [
    {
      q: t("base64Encoder.faq.q1"),
      a: t("base64Encoder.faq.a1"),
    },
    {
      q: t("base64Encoder.faq.q2"),
      a: t("base64Encoder.faq.a2"),
    },
    {
      q: t("base64Encoder.faq.q3"),
      a: t("base64Encoder.faq.a3"),
    },
    {
      q: t("base64Encoder.faq.q4"),
      a: t("base64Encoder.faq.a4"),
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25">
        {t("base64Encoder.faqTitle")}
      </h2>

      <section className="space-y-4 pt-6">
        {faqItems.map((faq) => (
          <div key={faq.q} className="pixel-card p-4">
            <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
            <p className="text-sm text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </section>

      {/* Usage Limits & Best Practices */}
      <section className="mt-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {t("base64Encoder.limitsTitle")}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 text-amber-700">
                  {t("base64Encoder.limits.limitations")}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.sizeIncrease")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.largeFiles")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.notEncryption")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.browserMemory")}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">
                  {t("base64Encoder.limits.bestPractices")}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.smallBinary")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.compression")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.urlSafe")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.validation")}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
                {t("base64Encoder.security.title")}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t("base64Encoder.security.desc")}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
