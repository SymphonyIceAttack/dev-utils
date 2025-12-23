import { ArrowRight, Heart, Mail, Shield, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AboutPageStructuredData } from "@/components/structured-data/about-page";
import { Button } from "@/components/ui/button";
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
    title: "About Us - Free Online Developer Tools",
    description:
      "Learn about our mission to provide free, fast, and reliable online developer tools for developers worldwide.",
    openGraph: {
      title: "About Us - Free Online Developer Tools",
      description:
        "Learn about our mission to provide free, fast, and reliable online developer tools for developers worldwide.",
      url: `${siteUrl}/en/about`,
      type: "website",
    },
  },
  zh: {
    title: "关于我们 - 免费在线开发者工具",
    description:
      "了解我们的使命：为全球开发者提供免费、快速、可靠的在线开发者工具。",
    openGraph: {
      title: "关于我们 - 免费在线开发者工具",
      description:
        "了解我们的使命：为全球开发者提供免费、快速、可靠的在线开发者工具。",
      url: `${siteUrl}/zh/about`,
      type: "website",
    },
  },
  ja: {
    title: "私たちについて - 無料オンライン開発者ツール",
    description:
      "世界中の開発者に無料、高速、信頼できるオンライン開発者ツールを提供するミッションについて解説する。",
    openGraph: {
      title: "私たちについて - 無料オンライン開発者ツール",
      description:
        "世界中の開発者に無料、高速、信頼できるオンライン開発者ツールを提供するミッションについて解説する。",
      url: `${siteUrl}/ja/about`,
      type: "website",
    },
  },
  fr: {
    title: "À propos de nous - Outils de développeur en ligne gratuits",
    description:
      "Découvrez notre mission de fournir des outils de développeur en ligne gratuits, rapides et fiables pour les développeurs du monde entier.",
    openGraph: {
      title: "À propos de nous - Outils de développeur en ligne gratuits",
      description:
        "Découvrez notre mission de fournir des outils de développeur en ligne gratuits, rapides et fiables pour les développeurs du monde entier.",
      url: `${siteUrl}/fr/about`,
      type: "website",
    },
  },
  es: {
    title:
      "Acerca de Nosotros - Herramientas de Desarrollador Gratuitas en Línea",
    description:
      "Conoce nuestra misión de proporcionar herramientas de desarrollador gratuitas, rápidas y confiables para desarrolladores de todo el mundo.",
    openGraph: {
      title:
        "Acerca de Nosotros - Herramientas de Desarrollador Gratuitas en Línea",
      description:
        "Conoce nuestra misión de proporcionar herramientas de desarrollador gratuitas, rápidas y confiables para desarrolladores de todo el mundo.",
      url: `${siteUrl}/es/about`,
      type: "website",
    },
  },
  ru: {
    title: "О нас - Бесплатные онлайн инструменты для разработчиков",
    description:
      "Узнайте о нашей миссии по предоставлению бесплатных, быстрых и надежных онлайн инструментов для разработчиков по всему миру.",
    openGraph: {
      title: "О нас - Бесплатные онлайн инструменты для разработчиков",
      description:
        "Узнайте о нашей миссии по предоставлению бесплатных, быстрых и надежных онлайн инструментов для разработчиков по всему миру.",
      url: `${siteUrl}/ru/about`,
      type: "website",
    },
  },
  de: {
    title: "Über Uns - Kostenlose Online Entwicklertools",
    description:
      "Erfahren Sie mehr über unsere Mission, kostenlose, schnelle und zuverlässige Online-Entwicklertools für Entwickler weltweit bereitzustellen.",
    openGraph: {
      title: "Über Uns - Kostenlose Online Entwicklertools",
      description:
        "Erfahren Sie mehr über unsere Mission, kostenlose, schnelle und zuverlässige Online-Entwicklertools für Entwickler weltweit bereitzustellen.",
      url: `${siteUrl}/de/about`,
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

  const hreflangLinks = generateHreflangLinks("/about");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/about`,
      languages: hreflangLinks,
    },
  };
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const langTyped = lang as LanguageType;

  const values = [
    {
      icon: Heart,
      titleKey: "about.values.freedom.title",
      contentKey: "about.values.freedom.content",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: Zap,
      titleKey: "about.values.quality.title",
      contentKey: "about.values.quality.content",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Shield,
      titleKey: "about.values.privacy.title",
      contentKey: "about.values.privacy.content",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Users,
      titleKey: "about.values.openness.title",
      contentKey: "about.values.openness.content",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <>
      <AboutPageStructuredData lang={lang as LanguageType} />
      <main
        className="container mx-auto max-w-4xl px-4 py-12"
        aria-labelledby="about-title"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h1
            id="about-title"
            className="text-4xl font-bold tracking-tight mb-4"
          >
            {t("about.heading", langTyped)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("about.subheading", langTyped)}
          </p>
        </div>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-center">
                  {t("about.intro", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-500" />
                  </div>
                  {t("about.mission.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("about.mission.content", langTyped)}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("about.vision.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("about.vision.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Values */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {t("about.values.title", langTyped)}
              </h2>
              <p className="text-muted-foreground">
                {t("about.values.subtitle", langTyped)}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value) => (
                <Card
                  key={value.titleKey}
                  className="h-full hover:shadow-lg transition-all"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${value.bgColor} mx-auto mb-2`}
                    >
                      <value.icon className={`w-6 h-6 ${value.color}`} />
                    </div>
                    <CardTitle className="text-lg">
                      {t(value.titleKey, langTyped)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {t(value.contentKey, langTyped)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Our Story */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {t("about.team.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-center">
                  {t("about.team.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-purple-500/10">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  {t("about.cta.title", langTyped)}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t("about.cta.content", langTyped)}
                </p>
                <Link href={`/${lang}/contact`}>
                  <Button size="lg" className="gap-2">
                    <Mail className="w-4 h-4" />
                    {t("about.cta.button", langTyped)}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
