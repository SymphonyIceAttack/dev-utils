import type { Metadata } from "next";
import { UuidGeneratorStructuredData } from "@/components/structured-data/uuid-generator";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks, supportedLocales } from "@/lib/translations";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

const metadataConfig = {
  en: {
    title: "UUID Generator Online - Free Universal Unique Identifier Tool",
    description:
      "Free online UUID generator. Generate RFC4122 compliant UUID v4, v7, and v1 identifiers. Bulk generation, multiple formats, works offline.",
    openGraph: {
      title: "UUID Generator - Free Online Tool",
      description:
        "Generate RFC4122 compliant UUID v4, v7, and v1 identifiers. Free, secure, and works offline.",
      url: `${baseUrl}/en/tools/uuid-generator`,
      type: "website",
    },
  },
  zh: {
    title: "UUID 生成器 - 在线通用唯一标识符工具",
    description:
      "免费的在线 UUID 生成器。生成符合 RFC4122 标准的 UUID v4、v7 和 v1 标识符。批量生成，多种格式，离线工作。",
    openGraph: {
      title: "UUID 生成器 - 免费在线工具",
      description:
        "生成符合 RFC4122 标准的 UUID v4、v7 和 v1 标识符。免费、安全、离线工作。",
      url: `${baseUrl}/zh/tools/uuid-generator`,
      type: "website",
    },
  },
  ja: {
    title: "UUID ジェネレーター - 無料オンライン汎用一意識別子ツール",
    description:
      " 無料のオンラインUUIDジェネレーター。RFC4122準拠のUUID v4、v7、v1識別子を生成。バッチ生成、複数のフォーマット、オフラインで動作。",
    openGraph: {
      title: "UUID ジェネレーター - 無料オンライン ツール",
      description:
        "RFC4122準拠のUUID v4、v7、v1識別子を生成。安全でオフライン動作。",
      url: `${baseUrl}/ja/tools/uuid-generator`,
      type: "website",
    },
  },
  fr: {
    title:
      "Générateur UUID en Ligne - Outil d'Identifiant Unique Universel Gratuit",
    description:
      "Générateur UUID en ligne gratuit. Générez des identifiants UUID v4, v7 et v1 conformes RFC4122. Génération en lot, multiples formats, fonctionne hors ligne.",
    openGraph: {
      title: "Générateur UUID - Outil en Ligne Gratuit",
      description:
        "Générez des identifiants UUID v4, v7 et v1 conformes RFC4122. Gratuit et sécurisé.",
      url: `${baseUrl}/fr/tools/uuid-generator`,
      type: "website",
    },
  },
  es: {
    title:
      "Generador UUID en Línea - Herramienta de Identificador Único Universal Gratuita",
    description:
      "Generador UUID en línea gratuito. Genera identificadores UUID v4, v7 y v1 compatibles con RFC4122. Generación en lote, múltiples formatos, funciona sin conexión.",
    openGraph: {
      title: "Generador UUID - Herramienta en Línea Gratuita",
      description:
        "Genera identificadores UUID v4, v7 y v1 compatibles con RFC4122. Gratis y seguro.",
      url: `${baseUrl}/es/tools/uuid-generator`,
      type: "website",
    },
  },
  ru: {
    title:
      "Генератор UUID Онлайн - Бесплатный Инструмент Универсального Уникального Идентификатора",
    description:
      "Бесплатный онлайн генератор UUID. Генерируйте идентификаторы UUID v4, v7 и v1, соответствующие RFC4122. Массовая генерация, множественные форматы, работает офлайн.",
    openGraph: {
      title: "Генератор UUID - Бесплатный Онлайн Инструмент",
      description:
        "Генерируйте идентификаторы UUID v4, v7 и v1, соответствующие RFC4122. Бесплатно и безопасно.",
      url: `${baseUrl}/ru/tools/uuid-generator`,
      type: "website",
    },
  },
  de: {
    title:
      "UUID Generator Online - Kostenloses Universelles Eindeutiges Identifikations-Tool",
    description:
      "Kostenloser Online-UUID-Generator. Generieren Sie RFC4122-konforme UUID v4-, v7- und v1-Identifikatoren. Stapel-Generierung, mehrere Formate, funktioniert offline.",
    openGraph: {
      title: "UUID Generator - Kostenloses Online Tool",
      description:
        "Generieren Sie RFC4122-konforme UUID v4-, v7- und v1-Identifikatoren. Kostenlos und sicher.",
      url: `${baseUrl}/de/tools/uuid-generator`,
      type: "website",
    },
  },
};

// Generate static params for all supported languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;
  const hreflangLinks = generateHreflangLinks("/tools/uuid-generator");
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/tools/uuid-generator`,
      languages: hreflangLinks,
    },
  };
}

export default async function UuidGeneratorPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <UuidGeneratorStructuredData />
      <UuidGeneratorTool lang={lang as LanguageType} />
    </>
  );
}
