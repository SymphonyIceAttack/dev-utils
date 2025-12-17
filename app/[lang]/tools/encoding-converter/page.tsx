import type { Metadata } from "next";
import { EncodingConverterStructuredData } from "@/components/structured-data/encoding-converter";
import { EncodingConverterTool } from "@/components/tools/encoding-converter-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "Character Encoding Converter - UTF-8, GBK, Hex Online Tool",
    description:
      "Free online character encoding converter. Convert text between UTF-8, GBK, Hex, Binary, and Unicode. Fix garbled text and encoding issues instantly.",
  },
  zh: {
    title: "字符编码转换器 - UTF-8, GBK, 十六进制在线工具",
    description:
      "免费的在线字符编码转换器。在 UTF-8、GBK、十六进制、二进制和 Unicode 之间转换文本。即时修复乱码和编码问题。",
  },
  ja: {
    title: "文字エンコーディングコンバーター - UTF-8、GBK、十六進数オンライン ツール",
    description:
      " 無料のオンライン文字エンコーディングコンバーター。UTF-8、GBK、十六進数、バイナリ、Unicode間でテキストを変換。文字化けとエンコーディング問題を即座に修正。",
  },
  fr: {
    title: "Convertisseur d'Encodage de Caractères - Outil UTF-8, GBK, Hex en Ligne",
    description:
      "Convertisseur d'encodage de caractères en ligne gratuit. Convertissez le texte entre UTF-8, GBK, Hex, binaire et Unicode. Corrigez instantanément le texte corrompu et les problèmes d'encodage.",
  },
  es: {
    title: "Convertidor de Codificación de Caracteres - Herramienta UTF-8, GBK, Hex en Línea",
    description:
      "Convertidor de codificación de caracteres en línea gratuito. Convierte texto entre UTF-8, GBK, Hex, binario y Unicode. Corrige texto corrupto y problemas de codificación al instante.",
  },
  ru: {
    title: "Конвертер Кодировки Символов - Онлайн Инструмент UTF-8, GBK, Hex",
    description:
      "Бесплатный онлайн конвертер кодировки символов. Преобразуйте текст между UTF-8, GBK, Hex, Binary и Unicode. Мгновенно исправляйте искаженный текст и проблемы кодировки.",
  },
  de: {
    title: "Zeichencodierungskonverter - UTF-8, GBK, Hex Online Tool",
    description:
      "Kostenloser Online-Zeichencodierungskonverter. Konvertieren Sie Text zwischen UTF-8, GBK, Hex, Binär und Unicode. Beheben Sie sofort verstümmelten Text und Kodierungsprobleme.",
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
  const hreflangLinks = generateHreflangLinks("/tools/encoding-converter");
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

  return {
    title: langData.title,
    description: langData.description,    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/tools/encoding-converter`,
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
      <EncodingConverterStructuredData />
      <EncodingConverterTool lang={lang as LanguageType} />
    </>
  );
}
