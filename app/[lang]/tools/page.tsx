import type { Metadata } from "next";
import { ToolsPageStructuredData } from "@/components/structured-data/tools-page";
import { ToolsPageClient } from "@/components/tools/tools-page-client";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "Free Online Developer Tools - Encoding, Hashing & More",
    description:
      "Collection of free online developer tools. URL encoder, Base64, MD5, UUID generator, password generator, and encoding converter. Fast, secure, works offline.",
    openGraph: {
      title: "Free Online Developer Tools - Encoding, Hashing & More",
      description:
        "Collection of free online developer tools. URL encoder, Base64, MD5, UUID generator, password generator, and encoding converter. Fast, secure, works offline.",
      url: `${siteUrl}/en/tools`,
      type: "website",
    },
  },
  zh: {
    title: "免费在线开发者工具 - 编码、哈希等",
    description:
      "免费在线开发者工具集合。URL编码器、Base64、MD5、UUID生成器、密码生成器和编码转换器。快速、安全、离线工作。",
    openGraph: {
      title: "免费在线开发者工具 - 编码、哈希等",
      description:
        "免费在线开发者工具集合。URL编码器、Base64、MD5、UUID生成器、密码生成器和编码转换器。快速、安全、离线工作。",
      url: `${siteUrl}/zh/tools`,
      type: "website",
    },
  },
  ja: {
    title: "無料オンライン開発者ツール - エンコーディング、ハッシュなど",
    description:
      "無料のオンライン開発者ツールのコレクション。URLエンコーダー、Base64、MD5、UUIDジェネレーター、パスワードジェネレーター、エンコーディングコンバーター。高速、安全、オフラインで動作。",
    openGraph: {
      title: "無料オンライン開発者ツール - エンコーディング、ハッシュなど",
      description:
        "無料のオンライン開発者ツールのコレクション。URLエンコーダー、Base64、MD5、UUIDジェネレーター、パスワードジェネレーター、エンコーディングコンバーター。高速、安全、オフラインで動作。",
      url: `${siteUrl}/ja/tools`,
      type: "website",
    },
  },
  fr: {
    title:
      "Outils de Développeur en Ligne Gratuits - Encodage, Hachage et Plus",
    description:
      "Collection d'outils de développeur en ligne gratuits. Encodeur URL, Base64, MD5, générateur UUID, générateur de mot de passe et convertisseur d'encodage. Rapide, sécurisé, fonctionne hors ligne.",
    openGraph: {
      title:
        "Outils de Développeur en Ligne Gratuits - Encodage, Hachage et Plus",
      description:
        "Collection d'outils de développeur en ligne gratuits. Encodeur URL, Base64, MD5, générateur UUID, générateur de mot de passe et convertisseur d'encodage. Rapide, sécurisé, fonctionne hors ligne.",
      url: `${siteUrl}/fr/tools`,
      type: "website",
    },
  },
  es: {
    title:
      "Herramientas de Desarrollador Gratuitas en Línea - Codificación, Hashing y Más",
    description:
      "Colección de herramientas de desarrollador en línea gratuitas. Codificador URL, Base64, MD5, generador UUID, generador de contraseñas y convertidor de codificación. Rápido, seguro, funciona sin conexión.",
    openGraph: {
      title:
        "Herramientas de Desarrollador Gratuitas en Línea - Codificación, Hashing y Más",
      description:
        "Colección de herramientas de desarrollador en línea gratuitas. Codificador URL, Base64, MD5, generador UUID, generador de contraseñas y convertidor de codificación. Rápido, seguro, funciona sin conexión.",
      url: `${siteUrl}/es/tools`,
      type: "website",
    },
  },
  ru: {
    title:
      "Бесплатные Онлайн Инструменты для Разработчиков - Кодирование, Хеширование и Больше",
    description:
      "Коллекция бесплатных онлайн инструментов для разработчиков. Кодировщик URL, Base64, MD5, генератор UUID, генератор паролей и конвертер кодировок. Быстро, безопасно, работает офлайн.",
    openGraph: {
      title:
        "Бесплатные Онлайн Инструменты для Разработчиков - Кодирование, Хеширование и Больше",
      description:
        "Коллекция бесплатных онлайн инструментов для разработчиков. Кодировщик URL, Base64, MD5, генератор UUID, генератор паролей и конвертер кодировок. Быстро, безопасно, работает офлайн.",
      url: `${siteUrl}/ru/tools`,
      type: "website",
    },
  },
  de: {
    title: "Kostenlose Online Entwicklertools - Kodierung, Hashing und Mehr",
    description:
      "Sammlung kostenloser Online-Entwicklertools. URL-Encoder, Base64, MD5, UUID-Generator, Passwort-Generator und Encoding-Konverter. Schnell, sicher, funktioniert offline.",
    openGraph: {
      title: "Kostenlose Online Entwicklertools - Kodierung, Hashing und Mehr",
      description:
        "Sammlung kostenloser Online-Entwicklertools. URL-Encoder, Base64, MD5, UUID-Generator, Passwort-Generator und Encoding-Konverter. Schnell, sicher, funktioniert offline.",
      url: `${siteUrl}/de/tools`,
      type: "website",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;
  const hreflangLinks = generateHreflangLinks("/tools");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/tools`,
      languages: hreflangLinks,
    },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <ToolsPageStructuredData lang={lang as LanguageType} />
      <ToolsPageClient lang={lang as LanguageType} />
    </>
  );
}
