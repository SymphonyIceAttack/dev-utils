import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface Base64EncoderSeoContentProps {
  lang: LanguageType;
}

export function Base64EncoderSeoContent({
  lang,
}: Base64EncoderSeoContentProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">{t("base64Encoder.seo.title")}</h2>
      <p
        className="text-muted-foreground leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: t("base64Encoder.seo.description"),
        }}
      />

      <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
        <h3 className="font-semibold mb-2">
          {t("base64Encoder.seo.techImplTitle")}
        </h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: t("base64Encoder.seo.techImplDesc"),
          }}
        />
      </div>

      <h4 className="text-lg font-semibold mt-8 mb-4">
        {t("base64Encoder.featuresTitle")}
      </h4>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("base64Encoder.feature.textBinary.title"),
            desc: t("base64Encoder.feature.textBinary.desc"),
          },
          {
            title: t("base64Encoder.feature.urlSafe.title"),
            desc: t("base64Encoder.feature.urlSafe.desc"),
          },
          {
            title: t("base64Encoder.feature.fileSupport.title"),
            desc: t("base64Encoder.feature.fileSupport.desc"),
          },
          {
            title: t("base64Encoder.feature.privacy.title"),
            desc: t("base64Encoder.feature.privacy.desc"),
          },
        ].map((feature) => (
          <div key={feature.title} className="pixel-card p-4">
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("base64Encoder.useCasesTitle")}
      </h3>
      <ul className="text-muted-foreground space-y-2">
        {[
          t("base64Encoder.useCase.images"),
          t("base64Encoder.useCase.email"),
          t("base64Encoder.useCase.db"),
          t("base64Encoder.useCase.auth"),
          t("base64Encoder.useCase.serialization"),
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 bg-primary rounded-full" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50">
        <h4 className="font-semibold mb-2">
          💻 {t("base64Encoder.techTitle")}
        </h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p
            dangerouslySetInnerHTML={{
              __html: t("base64Encoder.tech.dataUri"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("base64Encoder.tech.email"),
            }}
          />
          <p dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.db") }} />
          <p
            dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.jwt") }}
          />
          <p
            dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.api") }}
          />
        </div>
      </div>

      {/* Real-World Scenarios */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">
          {t("base64Encoder.scenarios.title")}
        </h3>

        {/* Scenario 1 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            {t("base64Encoder.scenarios.scenario1.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("base64Encoder.scenarios.scenario1.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border">
            <div className="text-sm">
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario1.problem")}
              </div>
              <div className="mb-3">
                {t("base64Encoder.scenarios.scenario1.problemDesc")}
              </div>
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario1.solution")}
              </div>
              <div className="mb-3">
                {t("base64Encoder.scenarios.scenario1.solutionDesc")}
              </div>
              <div className="text-green-600 text-xs">
                &lt;img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
                /&gt;
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("base64Encoder.scenarios.scenario1.result")}</strong>
          </p>
        </div>

        {/* Scenario 2 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            {t("base64Encoder.scenarios.scenario2.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("base64Encoder.scenarios.scenario2.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border">
            <div className="text-sm">
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario2.credentials")}
              </div>
              <div className="mb-3 font-mono">username: password123</div>
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario2.encoded")}
              </div>
              <div className="mb-3 font-mono text-green-700">
                dXNlcm5hbWU6cGFzc3dvcmQxMjM=
              </div>
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario2.header")}
              </div>
              <div className="text-xs text-muted-foreground">
                Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQxMjM=
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("base64Encoder.scenarios.scenario2.result")}</strong>
          </p>
        </div>

        {/* Scenario 3 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            {t("base64Encoder.scenarios.scenario3.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("base64Encoder.scenarios.scenario3.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border">
            <div className="text-sm">
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario3.binary")}
              </div>
              <div className="mb-3">
                {t("base64Encoder.scenarios.scenario3.binaryDesc")}
              </div>
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario3.encoding")}
              </div>
              <div className="mb-3 font-mono text-green-700">
                JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4K...
              </div>
              <div className="text-muted-foreground mb-2">
                {t("base64Encoder.scenarios.scenario3.storage")}
              </div>
              <div className="text-xs text-muted-foreground">
                {
                  '{id: 1, document: "JVBERi0xLjQK...", filename: "document.pdf"}'
                }
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("base64Encoder.scenarios.scenario3.result")}</strong>
          </p>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">
          {t("base64Encoder.guide.title")}
        </h3>

        <div className="space-y-4">
          {[
            {
              step: "1",
              title: t("base64Encoder.guide.step1.title"),
              desc: t("base64Encoder.guide.step1.desc"),
            },
            {
              step: "2",
              title: t("base64Encoder.guide.step2.title"),
              desc: t("base64Encoder.guide.step2.desc"),
            },
            {
              step: "3",
              title: t("base64Encoder.guide.step3.title"),
              desc: t("base64Encoder.guide.step3.desc"),
            },
            {
              step: "4",
              title: t("base64Encoder.guide.step4.title"),
              desc: t("base64Encoder.guide.step4.desc"),
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
