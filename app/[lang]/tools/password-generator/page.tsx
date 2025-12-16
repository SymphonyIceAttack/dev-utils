import type { Metadata } from "next";
import { PasswordGeneratorStructuredData } from "@/components/structured-data/password-generator";
import { PasswordGeneratorTool } from "@/components/tools/password-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "Password Generator Online - Free Secure Password Tool",
    description:
      "Free online password generator. Create strong, secure random passwords and API keys. Customizable options, cryptographically secure, works offline.",
    keywords: [
      "password generator",
      "random password",
      "secure password",
      "API key generator",
      "strong password",
    ],
  },
  zh: {
    title: "密码生成器 - 在线安全密码工具",
    description:
      "免费的在线密码生成器。创建强大、安全的随机密码和 API 密钥。可自定义选项，加密安全，离线工作。",
    keywords: [
      "密码生成器",
      "随机密码",
      "安全密码",
      "API 密钥生成器",
      "强密码",
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
  const hreflangLinks = generateHreflangLinks("/tools/password-generator");
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
      canonical: `${baseUrl}/tools/password-generator`,
      languages: hreflangLinks,
    },
  };
}

export default async function PasswordGeneratorPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <PasswordGeneratorStructuredData />
      <PasswordGeneratorTool lang={lang as LanguageType} />
    </>
  );
}
