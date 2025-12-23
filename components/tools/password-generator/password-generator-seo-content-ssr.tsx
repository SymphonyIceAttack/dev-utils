import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface PasswordGeneratorSeoContentProps {
  lang: LanguageType;
}

export function PasswordGeneratorSeoContent({
  lang,
}: PasswordGeneratorSeoContentProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">
        {t("passwordGenerator.seo.title")}
      </h2>
      <p
        className="text-muted-foreground leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: t("passwordGenerator.seo.desc") }}
      />

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("passwordGenerator.tech.title")}
      </h3>
      <div className="bg-muted/30 rounded-xl p-4 mb-6">
        <div className="grid gap-4 text-sm">
          <div>
            <strong>{t("passwordGenerator.tech.randomTitle")}</strong>
            <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
              <li>{t("passwordGenerator.tech.randomList1")}</li>
              <li>{t("passwordGenerator.tech.randomList2")}</li>
              <li>{t("passwordGenerator.tech.randomList3")}</li>
              <li>{t("passwordGenerator.tech.randomList4")}</li>
              <li>{t("passwordGenerator.tech.randomList5")}</li>
            </ul>
          </div>
          <div>
            <strong>{t("passwordGenerator.tech.passphraseTitle")}</strong>
            <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
              <li>{t("passwordGenerator.tech.passphraseList1")}</li>
              <li>{t("passwordGenerator.tech.passphraseList2")}</li>
              <li>{t("passwordGenerator.tech.passphraseList3")}</li>
              <li>{t("passwordGenerator.tech.passphraseList4")}</li>
              <li>{t("passwordGenerator.tech.passphraseList5")}</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("passwordGenerator.features.title")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("passwordGenerator.feature.secure.title"),
            desc: t("passwordGenerator.feature.secure.desc"),
          },
          {
            title: t("passwordGenerator.feature.modes.title"),
            desc: t("passwordGenerator.feature.modes.desc"),
          },
          {
            title: t("passwordGenerator.feature.passphrase.title"),
            desc: t("passwordGenerator.feature.passphrase.desc"),
          },
          {
            title: t("passwordGenerator.feature.bulk.title"),
            desc: t("passwordGenerator.feature.bulk.desc"),
          },
        ].map((feature) => (
          <div key={feature.title} className="pixel-card p-4">
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("passwordGenerator.bestPractices.title")}
      </h3>
      <ul className="text-muted-foreground space-y-2">
        {[
          {
            case: t("passwordGenerator.bestPractices.item1"),
            boundary: t("passwordGenerator.bestPractices.boundary1"),
          },
          {
            case: t("passwordGenerator.bestPractices.item2"),
            boundary: t("passwordGenerator.bestPractices.boundary2"),
          },
          {
            case: t("passwordGenerator.bestPractices.item3"),
            boundary: t("passwordGenerator.bestPractices.boundary3"),
          },
          {
            case: t("passwordGenerator.bestPractices.item4"),
            boundary: t("passwordGenerator.bestPractices.boundary4"),
          },
          {
            case: t("passwordGenerator.bestPractices.item5"),
            boundary: t("passwordGenerator.bestPractices.boundary5"),
          },
        ].map((item) => (
          <li key={item.case} className="flex items-start gap-3 text-sm">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <div>
              <div className="font-medium">{item.case}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.boundary}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
