import type { Metadata } from "next";
import { AboutPageStructuredData } from "@/components/structured-data/about-page";
import { generateHreflangLinks, type LanguageType } from "@/lib/translations";
import { AboutPage } from "./client-page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

const metadataConfig = {
  en: {
    title: "About Us - Free Online Developer Tools",
    description:
      "Learn about our mission to provide free, fast, and reliable online developer tools for developers worldwide.",
    keywords: [
      "about us",
      "developer tools",
      "online tools",
      "free tools",
      "developer utilities",
    ],
    openGraph: {
      title: "About Us - Free Online Developer Tools",
      description:
        "Learn about our mission to provide free, fast, and reliable online developer tools for developers worldwide.",
      url: `${baseUrl}/about`,
      type: "website",
    },
  },
  zh: {
    title: "关于我们 - 免费在线开发者工具",
    description:
      "了解我们的使命：为全球开发者提供免费、快速、可靠的在线开发者工具。",
    keywords: [
      "关于我们",
      "开发者工具",
      "在线工具",
      "免费工具",
      "开发者实用工具",
    ],
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
    keywords: [
      "私たちについて",
      "開発者ツール",
      "オンライン道具",
      "無料ツール",
      "開発者ユーティリティ",
    ],
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
    keywords: [
      "à propos de nous",
      "outils développeur",
      "outils en ligne",
      "outils gratuits",
      "utilitaires développeur",
    ],
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
    keywords: [
      "acerca de nosotros",
      "herramientas desarrollador",
      "herramientas en línea",
      "herramientas gratuitas",
      "utilidades desarrollador",
    ],
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
    keywords: [
      "о нас",
      "инструменты разработчика",
      "онлайн инструменты",
      "бесплатные инструменты",
      "утилиты разработчика",
    ],
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
    keywords: [
      "über uns",
      "entwicklertools",
      "online tools",
      "kostenlose tools",
      "entwickler utilitäten",
    ],
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
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    robots: {
      index: false,
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
