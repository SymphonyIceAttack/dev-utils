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
    keywords: [
      "encoding converter",
      "UTF-8 converter",
      "GBK converter",
      "hex converter",
      "character encoding",
    ],
  },
  zh: {
    title: "字符编码转换器 - UTF-8, GBK, 十六进制在线工具",
    description:
      "免费的在线字符编码转换器。在 UTF-8、GBK、十六进制、二进制和 Unicode 之间转换文本。即时修复乱码和编码问题。",
    keywords: [
      "编码转换器",
      "UTF-8 转换器",
      "GBK 转换器",
      "十六进制转换器",
      "字符编码",
    ],
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
    description: langData.description,
    keywords: langData.keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/tools/encoding-converter`,
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
