import { CheckCircle, Database, Eye, Lock, Shield, Users } from "lucide-react";
import type { Metadata } from "next";
import { PrivacyPageStructuredData } from "@/components/structured-data/privacy-page";
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
    title: "Privacy Policy - Free Online Developer Tools",
    description:
      "Our privacy policy explains how we protect your privacy. We don't collect, store, or track any personal information.",
    openGraph: {
      title: "Privacy Policy - Free Online Developer Tools",
      description:
        "Our privacy policy explains how we protect your privacy. We don't collect, store, or track any personal information.",
      url: `${siteUrl}/en/privacy`,
      type: "website",
    },
  },
  zh: {
    title: "隐私政策 - 免费在线开发者工具",
    description:
      "我们的隐私政策说明我们如何保护您的隐私。我们不收集、存储或跟踪任何个人信息。",
    openGraph: {
      title: "隐私政策 - 免费在线开发者工具",
      description:
        "我们的隐私政策说明我们如何保护您的隐私。我们不收集、存储或跟踪任何个人信息。",
      url: `${siteUrl}/zh/privacy`,
      type: "website",
    },
  },
  ja: {
    title: "プライバシーポリシー - 無料オンライン開発者ツール",
    description:
      "プライバシーレースポリシーは、プライバシーをどのように保護するかについて説明します。個人情報一切を収集、保存、追跡しません。",
    openGraph: {
      title: "プライバシーポリシー - 無料オンライン開発者ツール",
      description:
        "プライバシーレースポリシーは、プライバシーをどのように保護するかについて説明します。個人情報一切を収集、保存、追跡しません。",
      url: `${siteUrl}/ja/privacy`,
      type: "website",
    },
  },
  fr: {
    title:
      "Politique de Confidentialité - Outils de Développeur en Ligne Gratuits",
    description:
      "Notre politique de confidentialité explique comment nous protégeons votre vie privée. Nous ne collectons, ne stockons ou ne suivons aucune information personnelle.",
    openGraph: {
      title:
        "Politique de Confidentialité - Outils de Développeur en Ligne Gratuits",
      description:
        "Notre politique de confidentialité explique comment nous protégeons votre vie privée. Nous ne collectons, ne stockons ou ne suivons aucune information personnelle.",
      url: `${siteUrl}/fr/privacy`,
      type: "website",
    },
  },
  es: {
    title:
      "Política de Privacidad - Herramientas de Desarrollador Gratuitas en Línea",
    description:
      "Nuestra política de privacidad explica cómo protegemos tu privacidad. No recopilamos, almacenamos ni rastreamos información personal.",
    openGraph: {
      title:
        "Política de Privacidad - Herramientas de Desarrollador Gratuitas en Línea",
      description:
        "Nuestra política de privacidad explica cómo protegemos tu privacidad. No recopilamos, almacenamos ni rastreamos información personal.",
      url: `${siteUrl}/es/privacy`,
      type: "website",
    },
  },
  ru: {
    title:
      "Политика Конфиденциальности - Бесплатные Онлайн Инструменты для Разработчиков",
    description:
      "Наша политика конфиденциальности объясняет, как мы защищаем вашу конфиденциальность. Мы не собираем, не храним и не отслеживаем личную информацию.",
    openGraph: {
      title:
        "Политика Конфиденциальности - Бесплатные Онлайн Инструменты для Разработчиков",
      description:
        "Наша политика конфиденциальности объясняет, как мы защищаем вашу конфиденциальность. Мы не собираем, не храним и не отслеживаем личную информацию.",
      url: `${siteUrl}/ru/privacy`,
      type: "website",
    },
  },
  de: {
    title: "Datenschutzrichtlinie - Kostenlose Online Entwicklertools",
    description:
      "Unsere Datenschutzrichtlinie erklärt, wie wir Ihre Privatsphäre schützen. Wir sammeln, speichern oder verfolgen keine persönlichen Informationen.",
    openGraph: {
      title: "Datenschutzrichtlinie - Kostenlose Online Entwicklertools",
      description:
        "Unsere Datenschutzrichtlinie erklärt, wie wir Ihre Privatsphäre schützen. Wir sammeln, speichern oder verfolgen keine persönlichen Informationen.",
      url: `${siteUrl}/de/privacy`,
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

  const hreflangLinks = generateHreflangLinks("/privacy");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/privacy`,
      languages: hreflangLinks,
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const langTyped = lang as LanguageType;

  return (
    <>
      <PrivacyPageStructuredData lang={lang as LanguageType} />
      <main
        className="container mx-auto max-w-4xl px-4 py-12"
        aria-labelledby="privacy-title"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1
            id="privacy-title"
            className="text-4xl font-bold tracking-tight mb-4"
          >
            {t("privacy.heading", langTyped)}
          </h1>
          <p className="text-sm text-muted-foreground mb-2">
            {t("privacy.lastUpdated", langTyped)}
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("privacy.intro", langTyped)}
          </p>
        </div>

        <div className="space-y-8">
          {/* What We Collect */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  {t("privacy.dataCollection.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("privacy.dataCollection.content", langTyped)}
                </p>
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    {t("privacy.dataCollection.none", langTyped)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* How We Use Info */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-500" />
                  </div>
                  {t("privacy.dataUsage.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("privacy.dataUsage.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Data Sharing */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("privacy.dataSharing.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("privacy.dataSharing.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Cookies */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-yellow-500" />
                  </div>
                  {t("privacy.cookies.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("privacy.cookies.content", langTyped)}
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {t("privacy.cookies.optional", langTyped)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* AdSense Cookie Statement */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-orange-500" />
                  </div>
                  Google AdSense
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("privacy.cookies.adsense", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* CMP Statement */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-indigo-500" />
                  </div>
                  {t("privacy.cmp.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("privacy.cmp.content", langTyped)}
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm text-indigo-800 dark:text-indigo-200 italic">
                    {t("privacy.cmp.consent", langTyped)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Third Party */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-red-500" />
                  </div>
                  {t("privacy.thirdParty.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("privacy.thirdParty.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Security */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-500" />
                  </div>
                  {t("privacy.security.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("privacy.security.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Your Rights */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("privacy.yourRights.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("privacy.yourRights.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Changes */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-500" />
                  </div>
                  {t("privacy.changes.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("privacy.changes.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-green-500/10">
              <CardHeader>
                <CardTitle>{t("privacy.contact.title", langTyped)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("privacy.contact.content", langTyped)}
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {t("privacy.contact.email", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Commitment */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">
                  {t("privacy.commitment.title", langTyped)}
                </h3>
                <p className="text-muted-foreground">
                  {t("privacy.commitment.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
