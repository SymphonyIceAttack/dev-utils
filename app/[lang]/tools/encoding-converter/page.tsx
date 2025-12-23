import type { Metadata } from "next";
import { EncodingConverterStructuredData } from "@/components/structured-data/encoding-converter";
import { EncodingConverterTool } from "@/components/tools/encoding-converter";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks, supportedLocales } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "Character Encoding Converter - UTF-8, GBK, Hex Online Tool",
    description:
      "Free online character encoding converter. Convert text between UTF-8, GBK, Hex, Binary, and Unicode. Fix garbled text and encoding issues instantly.",
    openGraph: {
      title: "Character Encoding Converter - Free Online Tool",
      description:
        "Convert text between UTF-8, GBK, Hex, Binary, and Unicode. Free, fast, and works offline.",
      url: `${siteUrl}/en/tools/encoding-converter`,
      type: "website",
    },
  },
  zh: {
    title: "字符编码转换器 - UTF-8, GBK, 十六进制在线工具",
    description:
      "免费的在线字符编码转换器。在 UTF-8、GBK、十六进制、二进制和 Unicode 之间转换文本。即时修复乱码和编码问题。",
    openGraph: {
      title: "字符编码转换器 - 免费在线工具",
      description:
        "在 UTF-8、GBK、十六进制、二进制和 Unicode 之间转换文本。免费、快速、离线工作。",
      url: `${siteUrl}/zh/tools/encoding-converter`,
      type: "website",
    },
  },
  ja: {
    title:
      "文字エンコーディングコンバーター - UTF-8、GBK、十六進数オンライン ツール",
    description:
      " 無料のオンライン文字エンコーディングコンバーター。UTF-8、GBK、十六進数、バイナリ、Unicode間でテキストを変換。文字化けとエンコーディング問題を即座に修正。",
    openGraph: {
      title: "文字エンコーディングコンバーター - 無料オンライン ツール",
      description:
        "UTF-8、GBK、十六進数、バイナリ、Unicode間でテキストを変換。安全でオフライン動作。",
      url: `${siteUrl}/ja/tools/encoding-converter`,
      type: "website",
    },
  },
  fr: {
    title:
      "Convertisseur d'Encodage de Caractères - Outil UTF-8, GBK, Hex en Ligne",
    description:
      "Convertisseur d'encodage de caractères en ligne gratuit. Convertissez le texte entre UTF-8, GBK, Hex, binaire et Unicode. Corrigez instantanément le texte corrompu et les problèmes d'encodage.",
    openGraph: {
      title: "Convertisseur d'Encodage de Caractères - Outil en Ligne Gratuit",
      description:
        "Convertissez le texte entre UTF-8, GBK, Hex, binaire et Unicode. Gratuit et sécurisé.",
      url: `${siteUrl}/fr/tools/encoding-converter`,
      type: "website",
    },
  },
  es: {
    title:
      "Convertidor de Codificación de Caracteres - Herramienta UTF-8, GBK, Hex en Línea",
    description:
      "Convertidor de codificación de caracteres en línea gratuito. Convierte texto entre UTF-8, GBK, Hex, binario y Unicode. Corrige texto corrupto y problemas de codificación al instante.",
    openGraph: {
      title:
        "Convertidor de Codificación de Caracteres - Herramienta en Línea Gratuita",
      description:
        "Convierte texto entre UTF-8, GBK, Hex, binario y Unicode. Gratis y seguro.",
      url: `${siteUrl}/es/tools/encoding-converter`,
      type: "website",
    },
  },
  ru: {
    title: "Конвертер Кодировки Символов - Онлайн Инструмент UTF-8, GBK, Hex",
    description:
      "Бесплатный онлайн конвертер кодировки символов. Преобразуйте текст между UTF-8, GBK, Hex, Binary и Unicode. Мгновенно исправляйте искаженный текст и проблемы кодировки.",
    openGraph: {
      title: "Конвертер Кодировки Символов - Бесплатный Онлайн Инструмент",
      description:
        "Преобразуйте текст между UTF-8, GBK, Hex, Binary и Unicode. Бесплатно и безопасно.",
      url: `${siteUrl}/ru/tools/encoding-converter`,
      type: "website",
    },
  },
  de: {
    title: "Zeichencodierungskonverter - UTF-8, GBK, Hex Online Tool",
    description:
      "Kostenloser Online-Zeichencodierungskonverter. Konvertieren Sie Text zwischen UTF-8, GBK, Hex, Binär und Unicode. Beheben Sie sofort verstümmelten Text und Kodierungsprobleme.",
    openGraph: {
      title: "Zeichencodierungskonverter - Kostenloses Online Tool",
      description:
        "Konvertieren Sie Text zwischen UTF-8, GBK, Hex, Binär und Unicode. Kostenlos und sicher.",
      url: `${siteUrl}/de/tools/encoding-converter`,
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
  const hreflangLinks = generateHreflangLinks("/tools/encoding-converter");
  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/tools/encoding-converter`,
      languages: hreflangLinks,
    },
  };
}

export default async function EncodingConverterPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <EncodingConverterStructuredData lang={lang} />
      <EncodingConverterTool lang={lang} />
    </>
  );
}
