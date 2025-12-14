import type { Metadata } from "next";
import { Md5GeneratorTool } from "@/components/tools/md5-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "MD5 Hash Generator Online - Free MD5 Tool",
    description:
      "Free online MD5 hash generator. Generate MD5 checksums from text instantly. Support 32-bit and 16-bit output. Secure and works offline.",
    keywords: [
      "MD5 generator",
      "MD5 hash",
      "MD5 checksum",
      "hash generator",
      "MD5 online",
    ],
  },
  zh: {
    title: "MD5 哈希生成器 - 在线 MD5 工具",
    description:
      "免费的在线 MD5 哈希生成器。即时从文本生成 MD5 校验和。支持 32 位和 16 位输出。安全且离线工作。",
    keywords: ["MD5 生成器", "MD5 哈希", "MD5 校验和", "哈希生成器", "MD5 在线"],
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
  const hreflangLinks = generateHreflangLinks("/tools/md5-generator");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    alternates: {
      canonical: "https://devtools.app/tools/md5-generator",
      languages: hreflangLinks,
    },
  };
}

export default async function Md5GeneratorPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return <Md5GeneratorTool lang={lang as LanguageType} />;
}
