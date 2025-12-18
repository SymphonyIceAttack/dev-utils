import type { Metadata } from "next";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
} from "@/lib/translations";
import { DisclaimerPage } from "./client-page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

// Generate static params for all supported languages
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
      url: `${baseUrl}/en/disclaimer`,
      type: "website",
    },
  },
  zh: {
    title: "免责声明 - 免费在线开发者工具",
    description: "我们免费在线开发者工具和服务的重要免责声明和责任限制。",
    openGraph: {
      title: "免责声明 - 免费在线开发者工具",
      description: "我们免费在线开发者工具和服务的重要免责声明和责任限制。",
      url: `${baseUrl}/zh/disclaimer`,
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
      url: `${baseUrl}/ja/disclaimer`,
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
      url: `${baseUrl}/fr/disclaimer`,
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
      url: `${baseUrl}/es/disclaimer`,
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
      url: `${baseUrl}/ru/disclaimer`,
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
      url: `${baseUrl}/de/disclaimer`,
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
      canonical: `${baseUrl}/${lang}/disclaimer`,
      languages: hreflangLinks,
    },
  };
}

export default async function DisclaimerPageWrapper({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <DisclaimerPage lang={lang as LanguageType} />;
}
