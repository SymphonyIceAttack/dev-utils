import {
  CheckCircle,
  Copy,
  Search,
  Shield,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface EmailToolSeoContentProps {
  lang: LanguageType;
}

export function EmailToolSeoContent({ lang }: EmailToolSeoContentProps) {
  const { t } = useTranslation(lang);

  const features = [
    {
      title: t("emailTool.feature.extraction.title"),
      desc: t("emailTool.feature.extraction.desc"),
      icon: Search,
    },
    {
      title: t("emailTool.feature.verification.title"),
      desc: t("emailTool.feature.verification.desc"),
      icon: CheckCircle,
    },
    {
      title: t("emailTool.feature.privacy.title"),
      desc: t("emailTool.feature.privacy.desc"),
      icon: Shield,
    },
    {
      title: t("emailTool.feature.bulk.title"),
      desc: t("emailTool.feature.bulk.desc"),
      icon: Copy,
    },
  ];

  const useCases = [
    t("emailTool.useCase.marketing"),
    t("emailTool.useCase.recruitment"),
    t("emailTool.useCase.research"),
    t("emailTool.useCase.cleanup"),
    t("emailTool.useCase.validation"),
  ];

  const extractionSteps = [
    {
      step: "1",
      title: t("emailTool.guide.extract.step1.title"),
      desc: t("emailTool.guide.extract.step1.desc"),
    },
    {
      step: "2",
      title: t("emailTool.guide.extract.step2.title"),
      desc: t("emailTool.guide.extract.step2.desc"),
    },
    {
      step: "3",
      title: t("emailTool.guide.extract.step3.title"),
      desc: t("emailTool.guide.extract.step3.desc"),
    },
    {
      step: "4",
      title: t("emailTool.guide.extract.step4.title"),
      desc: t("emailTool.guide.extract.step4.desc"),
    },
  ];

  const verificationSteps = [
    {
      step: "1",
      title: t("emailTool.guide.verify.step1.title"),
      desc: t("emailTool.guide.verify.step1.desc"),
    },
    {
      step: "2",
      title: t("emailTool.guide.verify.step2.title"),
      desc: t("emailTool.guide.verify.step2.desc"),
    },
    {
      step: "3",
      title: t("emailTool.guide.verify.step3.title"),
      desc: t("emailTool.guide.verify.step3.desc"),
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">{t("emailTool.seoTitle")}</h2>
      <div
        className="text-muted-foreground leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: t("emailTool.seo.description"),
        }}
      />

      <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
        <h3 className="font-semibold mb-2">
          {t("emailTool.techDetailsTitle")}
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p
            dangerouslySetInnerHTML={{
              __html: t("emailTool.tech.rfc"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("emailTool.tech.regex"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("emailTool.tech.local"),
            }}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("emailTool.featuresTitle")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {features.map((feature) => (
          <div key={feature.title} className="pixel-card p-4">
            <feature.icon className="h-6 w-6 mb-2 text-primary" />
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">
        {t("emailTool.useCasesTitle")}
      </h3>
      <ul className="text-muted-foreground space-y-2 mb-8">
        {useCases.map((item, index) => (
          <li key={index} className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          {t("emailTool.limitationsTitle")}
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p
            dangerouslySetInnerHTML={{
              __html: t("emailTool.limitations.format"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("emailTool.limitations.existence"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("emailTool.limitations.deliverability"),
            }}
          />
        </div>
      </div>

      {/* How to Use - Extraction */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">
          {t("emailTool.guide.extract.title")}
        </h3>

        <div className="space-y-4">
          {extractionSteps.map((item) => (
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

      {/* How to Use - Verification */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">
          {t("emailTool.guide.verify.title")}
        </h3>

        <div className="space-y-4">
          {verificationSteps.map((item) => (
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

      {/* Real-World Scenarios */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">
          {t("emailTool.scenarios.title")}
        </h3>

        {/* Scenario 1 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            {t("emailTool.scenarios.newsletter.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("emailTool.scenarios.newsletter.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border">
            <div className="text-sm">
              <div className="text-muted-foreground mb-2">
                {t("emailTool.scenarios.newsletter.input")}
              </div>
              <div className="font-mono text-xs mb-3 bg-muted/30 p-2 rounded">
                {`Weekly Newsletter Subscribers:
alice@techstart.io
bob@webdev.com
charlie@designstudio.org
david@marketingpro.com`}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs">
                  <CheckCircle className="h-3 w-3" />
                  alice@techstart.io
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs">
                  <CheckCircle className="h-3 w-3" />
                  bob@webdev.com
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs">
                  <CheckCircle className="h-3 w-3" />
                  charlie@designstudio.org
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs">
                  <CheckCircle className="h-3 w-3" />
                  david@marketingpro.com
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("emailTool.scenarios.newsletter.result")}</strong>
          </p>
        </div>

        {/* Scenario 2 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            {t("emailTool.scenarios.contact.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("emailTool.scenarios.contact.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border">
            <div className="text-sm">
              <div className="text-muted-foreground mb-2">
                {t("emailTool.scenarios.contact.input")}
              </div>
              <div className="font-mono text-xs mb-3 bg-muted/30 p-2 rounded">
                {`Contact Form Submission:
Name: John Doe
Email: john.doe@example.com
Phone: +1-555-123-4567
Message: Hello!

Follow-up:
Email: notanemail
Name: Jane Smith`}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-mono text-sm">
                    john.doe@example.com
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (Valid format)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="font-mono text-sm">notanemail</span>
                  <span className="text-xs text-muted-foreground">
                    (Invalid format)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("emailTool.scenarios.contact.result")}</strong>
          </p>
        </div>

        {/* Scenario 3 */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            {t("emailTool.scenarios.dedupe.title")}
          </h4>
          <p className="text-muted-foreground mb-4">
            {t("emailTool.scenarios.dedupe.desc")}
          </p>
          <div className="bg-background p-4 rounded-lg border">
            <div className="text-sm">
              <div className="text-muted-foreground mb-2">
                {t("emailTool.scenarios.dedupe.input")}
              </div>
              <div className="font-mono text-xs mb-3 bg-muted/30 p-2 rounded">
                {`info@company.com
Sales@company.com
SUPPORT@company.com
contact@company.com
INFO@COMPANY.COM`}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={true}
                    readOnly
                    className="rounded border-foreground/30"
                  />
                  {t("emailTool.options.deduplicate")}
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    className="rounded border-foreground/30"
                  />
                  {t("emailTool.options.caseSensitive")}
                </label>
              </div>
              <div className="text-green-600 text-xs">
                {`→ Found 2 unique emails from 5 entries`}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>{t("emailTool.scenarios.dedupe.result")}</strong>
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">{t("emailTool.tipsTitle")}</h3>
        <ul className="text-muted-foreground space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              1
            </span>
            <span className="text-sm">{t("emailTool.tip.extraction")}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              2
            </span>
            <span className="text-sm">{t("emailTool.tip.verification")}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              3
            </span>
            <span className="text-sm">{t("emailTool.tip.privacy")}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              4
            </span>
            <span className="text-sm">{t("emailTool.tip.validation")}</span>
          </li>
        </ul>
      </section>
    </section>
  );
}
