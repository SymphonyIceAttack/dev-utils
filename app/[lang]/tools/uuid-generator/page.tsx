import type { Metadata } from "next";
import { UuidGeneratorStructuredData } from "@/components/structured-data/uuid-generator";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "UUID Generator Online - Free Unique Identifier Generator",
    description:
      "Generate UUID/GUID online instantly. Create version 1, 4, and 5 UUIDs. Secure, fast, and works offline in your browser.",
    keywords: [
      "UUID generator",
      "GUID generator",
      "unique identifier",
      "UUID online",
      "GUID online",
      "UUID tool",
      "generate UUID",
      "UUID generator online",
      "GUID generator online",
      "unique ID generator",
    ],
    openGraph: {
      title: "UUID Generator - Free Online Tool",
      description:
        "Generate UUID/GUID online instantly. Create version 1, 4, and 5 UUIDs. Free and secure.",
      url: "https://devtools.app/tools/uuid-generator",
      type: "website",
    },
  },
  zh: {
    title: "UUID 生成器 - 在线唯一标识符生成工具",
    description:
      "在线UUID/GUID生成器。立即生成版本1、4和5的UUID。安全、快速，浏览器离线工作。",
    keywords: [
      "UUID生成器",
      "GUID生成器",
      "唯一标识符",
      "UUID在线",
      "GUID在线",
      "UUID工具",
      "生成UUID",
      "UUID生成器在线",
      "GUID生成器在线",
      "唯一ID生成器",
    ],
    openGraph: {
      title: "UUID 生成器 - 免费在线工具",
      description: "立即生成UUID/GUID在线。创建版本1、4和5的UUID。免费且安全。",
      url: "https://devtools.app/tools/uuid-generator",
      type: "website",
    },
  },
  ja: {
    title: "UUID ジェネレーター - 無料オンライン 一意識別子 生成ツール",
    description:
      "UUID/GUID をオンラインで即座に生成。バージョン 1、4、5 の UUID を作成。安全、高速、ブラウザでオフライン動作。",
    keywords: [
      "UUID ジェネレーター",
      "GUID ジェネレーター",
      "一意識別子",
      "UUID オンライン",
      "GUID オンライン",
      "UUID ツール",
      "UUID 生成",
      "UUID ジェネレーター オンライン",
      "GUID ジェネレーター オンライン",
      "一意ID ジェネレーター",
    ],
    openGraph: {
      title: "UUID ジェネレーター - 無料オンライン ツール",
      description:
        "UUID/GUID をオンラインで即座に生成。バージョン 1、4、5 の UUID を作成。無料而且安全。",
      url: "https://devtools.app/tools/uuid-generator",
      type: "website",
    },
  },
  fr: {
    title:
      "Générateur UUID - Outil de Générateur d'Identifiant Unique en Ligne",
    description:
      "Générez UUID/GUID en ligne instantanément. Créez les versions 1, 4 et 5 d'UUID. Sécurisé, rapide, fonctionne hors ligne dans votre navigateur.",
    keywords: [
      "générateur UUID",
      "générateur GUID",
      "identifiant unique",
      "UUID en ligne",
      "GUID en ligne",
      "outil UUID",
      "générer UUID",
      "générateur UUID en ligne",
      "générateur GUID en ligne",
      "générateur ID unique",
    ],
    openGraph: {
      title: "Générateur UUID - Outil en Ligne Gratuit",
      description:
        "Générez UUID/GUID en ligne instantanément. Créez les versions 1, 4 et 5 d'UUID. Gratuit et sécurisé.",
      url: "https://devtools.app/tools/uuid-generator",
      type: "website",
    },
  },
  es: {
    title:
      "Generador UUID - Herramienta Generadora de Identificador Único en Línea",
    description:
      "Genera UUID/GUID en línea instantáneamente. Crea versiones 1, 4 y 5 de UUID. Seguro, rápido, funciona sin conexión en tu navegador.",
    keywords: [
      "generador UUID",
      "generador GUID",
      "identificador único",
      "UUID en línea",
      "GUID en línea",
      "herramienta UUID",
      "generar UUID",
      "generador UUID en línea",
      "generador GUID en línea",
      "generador ID único",
    ],
    openGraph: {
      title: "Generador UUID - Herramienta en Línea Gratis",
      description:
        "Genera UUID/GUID en línea instantáneamente. Crea versiones 1, 4 y 5 de UUID. Gratis y seguro.",
      url: "https://devtools.app/tools/uuid-generator",
      type: "website",
    },
  },
  ru: {
    title: "Генератор UUID - Онлайн Генератор Уникального Идентификатора",
    description:
      "Генерируйте UUID/GUID онлайн мгновенно. Создавайте версии 1, 4 и 5 UUID. Безопасно, быстро, работает офлайн в браузере.",
    keywords: [
      "генератор UUID",
      "генератор GUID",
      "уникальный идентификатор",
      "UUID онлайн",
      "GUID онлайн",
      "инструмент UUID",
      "генерировать UUID",
      "генератор UUID онлайн",
      "генератор GUID онлайн",
      "генератор уникального ID",
    ],
    openGraph: {
      title: "Генератор UUID - Бесплатный Онлайн Инструмент",
      description:
        "Генерируйте UUID/GUID онлайн мгновенно. Создавайте версии 1, 4 и 5 UUID. Бесплатно и безопасно.",
      url: "https://devtools.app/tools/uuid-generator",
      type: "website",
    },
  },
  de: {
    title:
      "UUID Generator - Kostenloser Online Eindeutiger Kennzeichner Generator",
    description:
      "Generieren Sie UUID/GUID online sofort. Erstellen Sie Version 1, 4 und 5 UUIDs. Sicher, schnell, funktioniert offline in Ihrem Browser.",
    keywords: [
      "UUID Generator",
      "GUID Generator",
      "eindeutiger Kennzeichner",
      "UUID online",
      "GUID online",
      "UUID Tool",
      "UUID generieren",
      "UUID Generator online",
      "GUID Generator online",
      "eindeutiger ID Generator",
    ],
    openGraph: {
      title: "UUID Generator - Kostenloses Online Tool",
      description:
        "Generieren Sie UUID/GUID online sofort. Erstellen Sie Version 1, 4 und 5 UUIDs. Kostenlos und sicher.",
      url: "https://devtools.app/tools/uuid-generator",
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

  const hreflangLinks = generateHreflangLinks("/tools/uuid-generator");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    alternates: {
      canonical: "https://devtools.app/tools/uuid-generator",
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
