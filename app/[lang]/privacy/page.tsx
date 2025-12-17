import type { Metadata } from "next";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
} from "@/lib/translations";
import { PrivacyPage } from "./client-page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

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
      url: `${baseUrl}/en/privacy`,
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
      url: `${baseUrl}/zh/privacy`,
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
      url: `${baseUrl}/ja/privacy`,
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
      url: `${baseUrl}/fr/privacy`,
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
      url: `${baseUrl}/es/privacy`,
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
      url: `${baseUrl}/ru/privacy`,
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
      url: `${baseUrl}/de/privacy`,
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
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/privacy`,
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
  return <PrivacyPage lang={lang as LanguageType} />;
}
