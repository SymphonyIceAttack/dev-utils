import type { Metadata } from "next";
import { AboutPageStructuredData } from "@/components/structured-data/about-page";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
} from "@/lib/translations";
import { AboutPage } from "./client-page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

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
      url: `${baseUrl}/en/about`,
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
      url: `${baseUrl}/zh/about`,
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
      url: `${baseUrl}/ja/about`,
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
      url: `${baseUrl}/fr/about`,
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
      url: `${baseUrl}/es/about`,
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
      url: `${baseUrl}/ru/about`,
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
      url: `${baseUrl}/de/about`,
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
      canonical: `${baseUrl}/${lang}/about`,
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
  return (
    <>
      <AboutPageStructuredData />
      <AboutPage lang={lang as LanguageType} />
    </>
  );
}
