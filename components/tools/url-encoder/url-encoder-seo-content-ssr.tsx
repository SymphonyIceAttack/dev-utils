import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface UrlEncoderSeoContentProps {
  lang: LanguageType;
}

export function UrlEncoderSeoContent({ lang }: UrlEncoderSeoContentProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">{t("urlEncoder.seo.title")}</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        <strong className="text-foreground">{t("urlEncoder.seo.title")}</strong>
        {t("urlEncoder.seo.description")}
      </p>

      {/* Technical Implementation Details */}
      <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
            ⚡
          </span>
          {t("urlEncoder.techDetailsTitle")}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-semibold mb-2 text-sm">
              {t("urlEncoder.techDetails.jsFunctions")}
            </h4>
            <div className="bg-background p-3 rounded border font-mono text-xs space-y-2">
              <div className="text-muted-foreground">
                {"/* Encode URL components */"}
              </div>
              <div>encodeURIComponent(input)</div>
              <div className="text-muted-foreground mt-3">
                {"/* Decode URL components */"}
              </div>
              <div>decodeURIComponent(input)</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm">
              {t("urlEncoder.techDetails.algoDetails")}
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• {t("urlEncoder.techDetails.algoList1")}</li>
              <li>• {t("urlEncoder.techDetails.algoList2")}</li>
              <li>• {t("urlEncoder.techDetails.algoList3")}</li>
              <li>• {t("urlEncoder.techDetails.algoList4")}</li>
            </ul>
          </div>
        </div>
      </div>

      <h4 className="text-lg font-semibold mt-8 mb-4">
        {t("urlEncoder.seo.featuresTitle")}
      </h4>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("urlEncoder.seo.feature1.title"),
            desc: t("urlEncoder.seo.feature1.desc"),
          },
          {
            title: t("urlEncoder.seo.feature2.title"),
            desc: t("urlEncoder.seo.feature2.desc"),
          },
          {
            title: t("urlEncoder.seo.feature3.title"),
            desc: t("urlEncoder.seo.feature3.desc"),
          },
          {
            title: t("urlEncoder.seo.feature4.title"),
            desc: t("urlEncoder.seo.feature4.desc"),
          },
        ].map((feature) => (
          <div key={feature.title} className="pixel-card p-4">
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <h4 className="text-lg font-semibold mt-8 mb-4">
        {t("urlEncoder.seo.useCasesTitle")}
      </h4>
      <ul className="text-muted-foreground space-y-2">
        {[
          t("urlEncoder.seo.useCase1"),
          t("urlEncoder.seo.useCase2"),
          t("urlEncoder.seo.useCase3"),
          t("urlEncoder.seo.useCase4"),
          t("urlEncoder.seo.useCase5"),
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 bg-primary rounded-full" />
            {item}
          </li>
        ))}
      </ul>

      {/* Usage Boundaries */}
      <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <h4 className="text-sm font-semibold mb-3 text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <span className="w-5 h-5 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full flex items-center justify-center text-xs font-bold">
            !
          </span>
          {t("urlEncoder.limitationsTitle")}
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h5 className="font-medium text-amber-700 dark:text-amber-300 text-xs mb-2">
              ✅ {t("urlEncoder.limitations.appropriate")}
            </h5>
            <ul className="text-xs text-amber-700 dark:text-amber-500 space-y-1">
              <li>• {t("urlEncoder.limitations.appropriateList1")}</li>
              <li>• {t("urlEncoder.limitations.appropriateList2")}</li>
              <li>• {t("urlEncoder.limitations.appropriateList3")}</li>
              <li>• {t("urlEncoder.limitations.appropriateList4")}</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-amber-700 dark:text-amber-300 text-xs mb-2">
              ⚠️ {t("urlEncoder.limitations.notSuitable")}
            </h5>
            <ul className="text-xs text-amber-700 dark:text-amber-500 space-y-1">
              <li>• {t("urlEncoder.limitations.notSuitableList1")}</li>
              <li>• {t("urlEncoder.limitations.notSuitableList2")}</li>
              <li>• {t("urlEncoder.limitations.notSuitableList3")}</li>
              <li>• {t("urlEncoder.limitations.notSuitableList4")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-World Scenarios */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">
          {t("urlEncoder.scenarios.title")}
        </h3>

        {/* Scenario 1 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            {t("urlEncoder.scenarios.scenario1.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("urlEncoder.scenarios.scenario1.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
            <div className="text-muted-foreground mb-2">
              ❌ {t("urlEncoder.scenarios.scenario1.problem")}
            </div>
            <div className="mb-3 text-destructive">
              https://shop.com/search?query=men&apos;s shoes &amp;
              category=athletic
            </div>
            <div className="text-muted-foreground mb-2">
              ✅ {t("urlEncoder.scenarios.scenario1.solution")}
            </div>
            <div className="text-green-700">
              https://shop.com/search?query=men%27s%20shoes%20%26%20category%3Dathletic
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("urlEncoder.scenarios.scenario1.solutionLabel")}</strong>{" "}
            {t("urlEncoder.scenarios.scenario1.result")}
          </p>
        </div>

        {/* Scenario 2 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            {t("urlEncoder.scenarios.scenario2.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("urlEncoder.scenarios.scenario2.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
            <div className="text-muted-foreground mb-2">
              {t("urlEncoder.scenarios.scenario2.original")}
            </div>
            <div className="mb-3">开发ツール + 在线服务</div>
            <div className="text-muted-foreground mb-2">
              {t("urlEncoder.scenarios.scenario2.encoded")}
            </div>
            <div className="text-green-700">
              %E5%BC%80%E5%8F%91%E3%83%84%E3%83%BC%E3%83%AB%20%2B%20%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("urlEncoder.scenarios.scenario1.solutionLabel")}</strong>{" "}
            {t("urlEncoder.scenarios.scenario2.result")}
          </p>
        </div>

        {/* Scenario 3 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            {t("urlEncoder.scenarios.scenario3.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("urlEncoder.scenarios.scenario3.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
            <div className="text-muted-foreground mb-2">
              {t("urlEncoder.scenarios.scenario3.dynamic")}
            </div>
            <div className="mb-3">
              https://app.com/share?title=Check this out!&amp;text=Amazing
              article about web development
            </div>
            <div className="text-muted-foreground mb-2">
              {t("urlEncoder.scenarios.scenario3.ready")}
            </div>
            <div className="text-green-700">
              https://app.com/share?title=Check%20this%20out%21&amp;text=Amazing%20article%20about%20web%20development
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("urlEncoder.scenarios.scenario1.solutionLabel")}</strong>{" "}
            {t("urlEncoder.scenarios.scenario3.result")}
          </p>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">
          {t("urlEncoder.guide.title")}
        </h3>

        <div className="space-y-4">
          {[
            {
              step: "1",
              title: t("urlEncoder.guide.step1.title"),
              desc: t("urlEncoder.guide.step1.desc"),
            },
            {
              step: "2",
              title: t("urlEncoder.guide.step2.title"),
              desc: t("urlEncoder.guide.step2.desc"),
            },
            {
              step: "3",
              title: t("urlEncoder.guide.step3.title"),
              desc: t("urlEncoder.guide.step3.desc"),
            },
            {
              step: "4",
              title: t("urlEncoder.guide.step4.title"),
              desc: t("urlEncoder.guide.step4.desc"),
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-4 p-4 bg-muted/10 rounded-lg"
            >
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.step}
              </span>
              <div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
