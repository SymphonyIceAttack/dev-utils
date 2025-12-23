import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface UuidGeneratorSeoContentProps {
  lang: LanguageType;
}

export function UuidGeneratorSeoContent({
  lang,
}: UuidGeneratorSeoContentProps) {
  const { t } = useTranslation(lang);

  const features = [
    {
      title: t("uuidGenerator.feature.rfc.title"),
      desc: t("uuidGenerator.feature.rfc.desc"),
      icon: "📋",
    },
    {
      title: t("uuidGenerator.feature.formats.title"),
      desc: t("uuidGenerator.feature.formats.desc"),
      icon: "🔤",
    },
    {
      title: t("uuidGenerator.feature.bulk.title"),
      desc: t("uuidGenerator.feature.bulk.desc"),
      icon: "⚡",
    },
    {
      title: t("uuidGenerator.feature.privacy.title"),
      desc: t("uuidGenerator.feature.privacy.desc"),
      icon: "🔒",
    },
  ];

  const useCases = [
    t("uuidGenerator.useCase.db"),
    t("uuidGenerator.useCase.session"),
    t("uuidGenerator.useCase.distributed"),
    t("uuidGenerator.useCase.files"),
    t("uuidGenerator.useCase.queue"),
  ];

  const versionComparison = [
    {
      version: "UUID v1",
      method: t("uuidGenerator.comparison.v1.method"),
      sortable: t("uuidGenerator.comparison.v1.sortable"),
      bestFor: t("uuidGenerator.comparison.v1.bestFor"),
    },
    {
      version: "UUID v4",
      method: t("uuidGenerator.comparison.v4.method"),
      sortable: t("uuidGenerator.comparison.v4.sortable"),
      bestFor: t("uuidGenerator.comparison.v4.bestFor"),
    },
    {
      version: "UUID v7",
      method: t("uuidGenerator.comparison.v7.method"),
      sortable: t("uuidGenerator.comparison.v7.sortable"),
      bestFor: t("uuidGenerator.comparison.v7.bestFor"),
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">
        {t("uuidGenerator.whatIsUuidTitle")}
      </h2>
      <p
        className="text-muted-foreground leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: t("uuidGenerator.description") || "",
        }}
      />

      <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
        <h3 className="font-semibold mb-2">
          {t("uuidGenerator.techDetailsTitle")}
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p
            dangerouslySetInnerHTML={{
              __html: t("uuidGenerator.tech.webCrypto"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("uuidGenerator.tech.v4Struct"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("uuidGenerator.tech.v7Struct"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("uuidGenerator.tech.collision"),
            }}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("uuidGenerator.featuresTitle")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {features.map((feature) => (
          <div key={feature.title} className="pixel-card p-4">
            <span className="text-2xl mb-2 block">{feature.icon}</span>
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("uuidGenerator.comparisonTitle")}
      </h3>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.version")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.method")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.sortable")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.bestFor")}
              </th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {versionComparison.map((row) => (
              <tr key={row.version} className="border-b border-border/50">
                <td className="p-3 font-medium text-foreground">
                  {row.version}
                </td>
                <td className="p-3">{row.method}</td>
                <td className="p-3">{row.sortable}</td>
                <td className="p-3">{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("uuidGenerator.useCasesTitle")}
      </h3>
      <ul className="text-muted-foreground space-y-2 mb-8">
        {useCases.map((item, index) => (
          <li key={index} className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
