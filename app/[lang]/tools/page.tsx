import type { Metadata } from "next";
import { ToolsPageStructuredData } from "@/components/structured-data/tools-page";
import { ToolsPageClient } from "@/components/tools/tools-page-client";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

const metadataConfig = {
  en: {
    title: "Free Online Developer Tools - Encoding, Hashing & More",
    description:
      "Collection of free online developer tools. URL encoder, Base64, MD5, UUID generator, password generator, and encoding converter. Fast, secure, works offline.",
  },
  zh: {
    title: "免费在线开发者工具 - 编码、哈希等",
    description:
      "免费在线开发者工具集合。URL编码器、Base64、MD5、UUID生成器、密码生成器和编码转换器。快速、安全、离线工作。",
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
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/tools`,
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
      <ToolsPageStructuredData />
      <ToolsPageClient lang={lang as LanguageType} />
    </>
  );
}
