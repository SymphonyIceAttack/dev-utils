import {
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Scale,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";
import { DisclaimerPageStructuredData } from "@/components/structured-data/disclaimer-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteUrl } from "@/lib/config";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
  t,
} from "@/lib/translations";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Disclaimer - Free Online Developer Tools",
    description:
      "Important disclaimer and limitations of liability for our free online developer tools and services.",
    openGraph: {
      title: "Disclaimer - Free Online Developer Tools",
      description:
        "Important disclaimer and limitations of liability for our free online developer tools and services.",
      url: `${siteUrl}/en/disclaimer`,
      type: "website",
    },
  },
  zh: {
    title: "免责声明 - 免费在线开发者工具",
    description: "我们免费在线开发者工具和服务的重要免责声明和责任限制。",
    openGraph: {
      title: "免责声明 - 免费在线开发者工具",
      description: "我们免费在线开发者工具和服务的重要免责声明和责任限制。",
      url: `${siteUrl}/zh/disclaimer`,
      type: "website",
    },
  },
  ja: {
    title: "免責事項 - 無料オンライン開発者ツール",
    description:
      "無料のオンライン開発者ツールおよびサービスに関する重要な免責事項と責任の制限。",
    openGraph: {
      title: "免責事項 - 無料オンライン開発者ツール",
      description:
        "無料のオンライン開発者ツールおよびサービスに関する重要な免責事項と責任の制限。",
      url: `${siteUrl}/ja/disclaimer`,
      type: "website",
    },
  },
  fr: {
    title: "Avertissement - Outils de Développeur en Ligne Gratuits",
    description:
      "Avertissement important et limitations de responsabilité pour nos outils et services de développeur en ligne gratuits.",
    openGraph: {
      title: "Avertissement - Outils de Développeur en Ligne Gratuits",
      description:
        "Avertissement important et limitations de responsabilité pour nos outils et services de développeur en ligne gratuits.",
      url: `${siteUrl}/fr/disclaimer`,
      type: "website",
    },
  },
  es: {
    title:
      "Descargo de Responsabilidad - Herramientas de Desarrollador Gratuitas en Línea",
    description:
      "Descargo de responsabilidad importante y limitaciones de responsabilidad para nuestras herramientas y servicios de desarrollador gratuitos en línea.",
    openGraph: {
      title:
        "Descargo de Responsabilidad - Herramientas de Desarrollador Gratuitas en Línea",
      description:
        "Descargo de responsabilidad importante y limitaciones de responsabilidad para nuestras herramientas y servicios de desarrollador gratuitos en línea.",
      url: `${siteUrl}/es/disclaimer`,
      type: "website",
    },
  },
  ru: {
    title:
      "Отказ от Ответственности - Бесплатные Онлайн Инструменты для Разработчиков",
    description:
      "Важный отказ от ответственности и ограничения ответственности для наших бесплатных онлайн инструментов и услуг для разработчиков.",
    openGraph: {
      title:
        "Отказ от Ответственности - Бесплатные Онлайн Инструменты для Разработчиков",
      description:
        "Важный отказ от ответственности и ограничения ответственности для наших бесплатных онлайн инструментов и услуг для разработчиков.",
      url: `${siteUrl}/ru/disclaimer`,
      type: "website",
    },
  },
  de: {
    title: "Haftungsausschluss - Kostenlose Online Entwicklertools",
    description:
      "Wichtiger Haftungsausschluss und Haftungsbeschränkungen für unsere kostenlosen Online-Entwicklertools und -dienste.",
    openGraph: {
      title: "Haftungsausschluss - Kostenlose Online Entwicklertools",
      description:
        "Wichtiger Haftungsausschluss und Haftungsbeschränkungen für unsere kostenlosen Online-Entwicklertools und -dienste.",
      url: `${siteUrl}/de/disclaimer`,
      type: "website",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;

  const hreflangLinks = generateHreflangLinks("/disclaimer");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/disclaimer`,
      languages: hreflangLinks,
    },
  };
}

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const langTyped = lang as LanguageType;

  const responsibilities = t(
    "disclaimer.userResponsibility.content",
    langTyped,
  ).split(";");

  return (
    <>
      <DisclaimerPageStructuredData lang={lang as LanguageType} />
      <main
        className="container mx-auto max-w-4xl px-4 py-12"
        aria-labelledby="disclaimer-title"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1
            id="disclaimer-title"
            className="text-4xl font-bold tracking-tight mb-4"
          >
            {t("disclaimer.heading", langTyped)}
          </h1>
          <p className="text-sm text-muted-foreground mb-2">
            {t("disclaimer.lastUpdated", langTyped)}
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("disclaimer.intro", langTyped)}
          </p>
        </div>

        <div className="space-y-8">
          {/* General Disclaimer */}
          <section>
            <Card className="border-0 shadow-lg border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  </div>
                  {t("disclaimer.general.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.general.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Accuracy */}
          <section>
            <Card className="border-0 shadow-lg border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  </div>
                  {t("disclaimer.accuracy.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.accuracy.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Tool Limitations */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  {t("disclaimer.toolLimitations.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.toolLimitations.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* No Warranty */}
          <section>
            <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  {t("disclaimer.noWarranty.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.noWarranty.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* External Links */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("disclaimer.externalLinks.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.externalLinks.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* User Responsibility */}
          <section>
            <Card className="border-0 shadow-lg border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  {t("disclaimer.userResponsibility.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        {responsibility.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Limitation of Liability */}
          <section>
            <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  {t("disclaimer.liability.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.liability.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Professional Advice */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-green-500" />
                  </div>
                  {t("disclaimer.professionalAdvice.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.professionalAdvice.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Updates and Changes */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-indigo-500" />
                  </div>
                  {t("disclaimer.updates.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.updates.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Severability */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-gray-500" />
                  </div>
                  {t("disclaimer.severability.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.severability.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Applicable Law */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("disclaimer.applicableLaw.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("disclaimer.applicableLaw.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-blue-500/10">
              <CardHeader>
                <CardTitle>
                  {t("disclaimer.contact.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("disclaimer.contact.content", langTyped)}
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {t("disclaimer.contact.email", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Commitment */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">
                  {t("disclaimer.commitment.title", langTyped)}
                </h3>
                <p className="text-muted-foreground">
                  {t("disclaimer.commitment.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
