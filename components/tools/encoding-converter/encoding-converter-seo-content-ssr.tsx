import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface EncodingConverterSeoContentProps {
  lang: LanguageType;
}

export function EncodingConverterSeoContent({
  lang,
}: EncodingConverterSeoContentProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">
        {t("encodingConverter.seo.title")}
      </h2>
      <p
        className="text-muted-foreground leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: t("encodingConverter.seo.description"),
        }}
      />

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("encodingConverter.techTitle")}
      </h3>
      <div className="bg-muted/30 rounded-xl p-4 mb-6">
        <div className="grid gap-4 text-sm">
          <div>
            <strong>{t("encodingConverter.tech.coreLogic")}</strong>
            <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
              <li>{t("encodingConverter.tech.logic1")}</li>
              <li>{t("encodingConverter.tech.logic2")}</li>
              <li>{t("encodingConverter.tech.logic3")}</li>
              <li>{t("encodingConverter.tech.logic4")}</li>
              <li>{t("encodingConverter.tech.logic5")}</li>
            </ul>
          </div>
          <div>
            <strong>{t("encodingConverter.tech.supported")}</strong>
            <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
              <li>{t("encodingConverter.tech.utf8")}</li>
              <li>{t("encodingConverter.tech.utf16")}</li>
              <li>{t("encodingConverter.tech.ascii")}</li>
              <li>{t("encodingConverter.tech.iso")}</li>
              <li>{t("encodingConverter.tech.hex")}</li>
              <li>{t("encodingConverter.tech.binary")}</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("encodingConverter.featuresTitle")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("encodingConverter.feature.multi.title"),
            desc: t("encodingConverter.feature.multi.desc"),
          },
          {
            title: t("encodingConverter.feature.realtime.title"),
            desc: t("encodingConverter.feature.realtime.desc"),
          },
          {
            title: t("encodingConverter.feature.format.title"),
            desc: t("encodingConverter.feature.format.desc"),
          },
          {
            title: t("encodingConverter.feature.privacy.title"),
            desc: t("encodingConverter.feature.privacy.desc"),
          },
        ].map((feature) => (
          <div key={feature.title} className="pixel-card p-4">
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("encodingConverter.useCasesTitle")}
      </h3>
      <ul className="text-muted-foreground space-y-2">
        {[
          {
            case: t("encodingConverter.useCase.garbled"),
            boundary: t("encodingConverter.useCase.garbledDesc"),
          },
          {
            case: t("encodingConverter.useCase.gbk"),
            boundary: t("encodingConverter.useCase.gbkDesc"),
          },
          {
            case: t("encodingConverter.useCase.debug"),
            boundary: t("encodingConverter.useCase.debugDesc"),
          },
          {
            case: t("encodingConverter.useCase.hex"),
            boundary: t("encodingConverter.useCase.hexDesc"),
          },
          {
            case: t("encodingConverter.useCase.unicode"),
            boundary: t("encodingConverter.useCase.unicodeDesc"),
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
