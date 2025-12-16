import type { Metadata } from "next";
import { UuidGeneratorStructuredData } from "@/components/structured-data/uuid-generator";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "UUID Generator Online - Free Universal Unique Identifier Tool",
    description:
      "Free online UUID generator. Generate RFC4122 compliant UUID v4, v7, and v1 identifiers. Bulk generation, multiple formats, works offline.",
    keywords: [
      "UUID generator",
      "universal unique identifier",
      "UUID v4",
      "UUID v7",
      "random ID generator",
      "GUID generator",
    ],
  },
  zh: {
    title: "UUID 生成器 - 在线通用唯一标识符工具",
    description:
      "免费的在线 UUID 生成器。生成符合 RFC4122 标准的 UUID v4、v7 和 v1 标识符。批量生成，多种格式，离线工作。",
    keywords: [
      "UUID 生成器",
      "通用唯一标识符",
      "UUID v4",
      "UUID v7",
      "随机 ID 生成器",
      "GUID 生成器",
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
  const hreflangLinks = generateHreflangLinks("/tools/uuid-generator");
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
      canonical: `${baseUrl}/tools/uuid`,
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
