import type { Metadata } from "next";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
} from "@/lib/translations";
import { TermsPage } from "./client-page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

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
      url: `${baseUrl}/en/terms`,
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
      url: `${baseUrl}/zh/terms`,
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
      url: `${baseUrl}/ja/terms`,
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
      url: `${baseUrl}/fr/terms`,
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
      url: `${baseUrl}/es/terms`,
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
      url: `${baseUrl}/ru/terms`,
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
      url: `${baseUrl}/de/terms`,
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
      canonical: `${baseUrl}/${lang}/terms`,
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
  return <TermsPage lang={lang as LanguageType} />;
}
