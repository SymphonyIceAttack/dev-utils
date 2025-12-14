import type { Metadata } from "next";
import { UrlEncoderTool } from "@/components/tools/url-encoder-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "URL Encoder & Decoder Online - Free URL Tool",
    description:
      "Free online URL encoder and decoder. Encode special characters in URLs or decode percent-encoded URLs instantly. Secure, fast, and works offline.",
    keywords: [
      "URL encoder",
      "URL decoder",
      "percent encoding",
      "URL encode online",
      "URL decode online",
    ],
  },
  zh: {
    title: "URL 编码解码器 - 在线 URL 工具",
    description:
      "免费的在线 URL 编码解码器。即时编码 URL 中的特殊字符或解码百分号编码的 URL。安全、快速，浏览器离线工作。",
    keywords: ["URL 编码器", "URL 解码器", "百分号编码", "URL 编码在线", "URL 解码在线"],
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
  const hreflangLinks = generateHreflangLinks("/tools/url-encoder");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    alternates: {
      canonical: "https://devtools.app/tools/url-encoder",
      languages: hreflangLinks,
    },
  };
}

export default async function UrlEncoderPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return <UrlEncoderTool lang={lang as LanguageType} />;
}
