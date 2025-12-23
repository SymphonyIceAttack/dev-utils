import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Scale,
  Shield,
  XCircle,
} from "lucide-react";
import type { Metadata } from "next";
import { TermsPageStructuredData } from "@/components/structured-data/terms-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteUrl } from "@/lib/config";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
  t,
} from "@/lib/translations";

// Generate static params for all supported languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Terms of Service - Free Online Developer Tools",
    description:
      "Terms of service for our free online developer tools. Simple, fair terms for using our developer utilities.",
    openGraph: {
      title: "Terms of Service - Free Online Developer Tools",
      description:
        "Terms of service for our free online developer tools. Simple, fair terms for using our developer utilities.",
      url: `${siteUrl}/en/terms`,
      type: "website",
    },
  },
  zh: {
    title: "服务条款 - 免费在线开发者工具",
    description:
      "我们免费在线开发者工具的服务条款。使用我们的开发者实用工具的简单、公平条款。",
    openGraph: {
      title: "服务条款 - 免费在线开发者工具",
      description:
        "我们免费在线开发者工具的服务条款。使用我们的开发者实用工具的简单、公平条款。",
      url: `${siteUrl}/zh/terms`,
      type: "website",
    },
  },
  ja: {
    title: "利用規約 - 無料オンライン開発者ツール",
    description:
      "無料のオンライン開発者ツールの利用規約。開発者ユーティリティを使用するためのシンプルで公正な条件。",
    openGraph: {
      title: "利用規約 - 無料オンライン開発者ツール",
      description:
        "無料のオンライン開発者ツールの利用規約。開発者ユーティリティを使用するためのシンプルで公正な条件。",
      url: `${siteUrl}/ja/terms`,
      type: "website",
    },
  },
  fr: {
    title: "Conditions de Service - Outils de Développeur en Ligne Gratuits",
    description:
      "Conditions de service pour nos outils de développeur en ligne gratuits. Conditions simples et équitables pour utiliser nos utilitaires de développeur.",
    openGraph: {
      title: "Conditions de Service - Outils de Développeur en Ligne Gratuits",
      description:
        "Conditions de service pour nos outils de développeur en ligne gratuits. Conditions simples et équitables pour utiliser nos utilitaires de développeur.",
      url: `${siteUrl}/fr/terms`,
      type: "website",
    },
  },
  es: {
    title:
      "Términos de Servicio - Herramientas de Desarrollador Gratuitas en Línea",
    description:
      "Términos de servicio para nuestras herramientas de desarrollador gratuitas en línea. Términos simples y justos para usar nuestras utilidades de desarrollador.",
    openGraph: {
      title:
        "Términos de Servicio - Herramientas de Desarrollador Gratuitas en Línea",
      description:
        "Términos de servicio para nuestras herramientas de desarrollador gratuitas en línea. Términos simples y justos para usar nuestras utilidades de desarrollador.",
      url: `${siteUrl}/es/terms`,
      type: "website",
    },
  },
  ru: {
    title:
      "Условия Обслуживания - Бесплатные Онлайн Инструменты для Разработчиков",
    description:
      "Условия обслуживания для наших бесплатных онлайн инструментов для разработчиков. Простые, справедливые условия для использования наших утилит для разработчиков.",
    openGraph: {
      title:
        "Условия Обслуживания - Бесплатные Онлайн Инструменты для Разработчиков",
      description:
        "Условия обслуживания для наших бесплатных онлайн инструментов для разработчиков. Простые, справедливые условия для использования наших утилит для разработчиков.",
      url: `${siteUrl}/ru/terms`,
      type: "website",
    },
  },
  de: {
    title: "Nutzungsbedingungen - Kostenlose Online Entwicklertools",
    description:
      "Nutzungsbedingungen für unsere kostenlosen Online-Entwicklertools. Einfache, faire Bedingungen für die Nutzung unserer Entwickler-Utilities.",
    openGraph: {
      title: "Nutzungsbedingungen - Kostenlose Online Entwicklertools",
      description:
        "Nutzungsbedingungen für unsere kostenlosen Online-Entwicklertools. Einfache, faire Bedingungen für die Nutzung unserer Entwickler-Utilities.",
      url: `${siteUrl}/de/terms`,
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

  const hreflangLinks = generateHreflangLinks("/terms");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/terms`,
      languages: hreflangLinks,
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const langTyped = lang as LanguageType;
  const prohibitedItems = t("terms.prohibited.list", langTyped).split(";");

  return (
    <>
      <TermsPageStructuredData lang={lang as LanguageType} />
      <main
        className="container mx-auto max-w-4xl px-4 py-12"
        aria-labelledby="terms-title"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
            <Scale className="w-8 h-8" />
          </div>
          <h1
            id="terms-title"
            className="text-4xl font-bold tracking-tight mb-4"
          >
            {t("terms.heading", langTyped)}
          </h1>
          <p className="text-sm text-muted-foreground mb-2">
            {t("terms.lastUpdated", langTyped)}
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("terms.intro", langTyped)}
          </p>
        </div>

        <div className="space-y-8">
          {/* Acceptance */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  {t("terms.acceptance.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.acceptance.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Description */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-500" />
                  </div>
                  {t("terms.description.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.description.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Usage */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("terms.usage.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.usage.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Prohibited */}
          <section>
            <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  {t("terms.prohibited.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("terms.prohibited.content", langTyped)}
                </p>
                <div className="space-y-2">
                  {prohibitedItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-red-700 dark:text-red-400">
                        {item.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Disclaimer */}
          <section>
            <Card className="border-0 shadow-lg border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  </div>
                  {t("terms.disclaimer.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.disclaimer.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Liability */}
          <section>
            <Card className="border-0 shadow-lg border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-500" />
                  </div>
                  {t("terms.limitation.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.limitation.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Accuracy */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-blue-500" />
                  </div>
                  {t("terms.accuracy.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.accuracy.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Availability */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  {t("terms.availability.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.availability.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Modifications */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("terms.modifications.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.modifications.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Termination */}
          <section>
            <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  {t("terms.termination.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.termination.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Governing Law */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-gray-500" />
                  </div>
                  {t("terms.governingLaw.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.governingLaw.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Severability */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-indigo-500" />
                  </div>
                  {t("terms.severability.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("terms.severability.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-blue-500/10">
              <CardHeader>
                <CardTitle>{t("terms.contact.title", langTyped)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("terms.contact.content", langTyped)}
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {t("terms.contact.email", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Commitment */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">
                  {t("terms.commitment.title", langTyped)}
                </h3>
                <p className="text-muted-foreground">
                  {t("terms.commitment.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
