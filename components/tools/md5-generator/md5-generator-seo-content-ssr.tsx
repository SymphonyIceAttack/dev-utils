import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface Md5GeneratorSeoContentProps {
  lang: LanguageType;
}

export function Md5GeneratorSeoContent({ lang }: Md5GeneratorSeoContentProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">{t("md5Generator.seo.title")}</h2>
      <p
        className="text-muted-foreground leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: t("md5Generator.seo.desc") }}
      />

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("md5Generator.tech.title")}
      </h3>
      <div className="bg-muted/30 rounded-xl p-4 mb-6">
        <div className="grid gap-4 text-sm">
          <div>
            <strong>{t("md5Generator.tech.coreTitle")}</strong>
            <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
              <li>{t("md5Generator.tech.coreList1")}</li>
              <li>{t("md5Generator.tech.coreList2")}</li>
              <li>{t("md5Generator.tech.coreList3")}</li>
              <li>{t("md5Generator.tech.coreList4")}</li>
            </ul>
          </div>
          <div>
            <strong>{t("md5Generator.tech.stepsTitle")}</strong>
            <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
              <li>{t("md5Generator.tech.stepsList1")}</li>
              <li>{t("md5Generator.tech.stepsList2")}</li>
              <li>{t("md5Generator.tech.stepsList3")}</li>
              <li>{t("md5Generator.tech.stepsList4")}</li>
              <li>{t("md5Generator.tech.stepsList5")}</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("md5Generator.features.title")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("md5Generator.feature.checksums.title"),
            desc: t("md5Generator.feature.checksums.desc"),
          },
          {
            title: t("md5Generator.feature.batch.title"),
            desc: t("md5Generator.feature.batch.desc"),
          },
          {
            title: t("md5Generator.feature.upload.title"),
            desc: t("md5Generator.feature.upload.desc"),
          },
          {
            title: t("md5Generator.feature.privacy.title"),
            desc: t("md5Generator.feature.privacy.desc"),
          },
        ].map((feature) => (
          <div key={feature.title} className="pixel-card p-4">
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("md5Generator.useCases.title")}
      </h3>
      <ul className="text-muted-foreground space-y-2">
        {[
          {
            case: t("md5Generator.useCases.item1"),
            boundary: t("md5Generator.useCases.boundary1"),
          },
          {
            case: t("md5Generator.useCases.item2"),
            boundary: t("md5Generator.useCases.boundary2"),
          },
          {
            case: t("md5Generator.useCases.item3"),
            boundary: t("md5Generator.useCases.boundary3"),
          },
          {
            case: t("md5Generator.useCases.item4"),
            boundary: t("md5Generator.useCases.boundary4"),
          },
          {
            case: t("md5Generator.useCases.item5"),
            boundary: t("md5Generator.useCases.boundary5"),
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
