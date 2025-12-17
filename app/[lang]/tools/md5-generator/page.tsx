import type { Metadata } from "next";
import { Md5GeneratorStructuredData } from "@/components/structured-data/md5-generator";
import { Md5GeneratorTool } from "@/components/tools/md5-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks, supportedLocales } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "MD5 Hash Generator Online - Free MD5 Tool",
    description:
      "Free online MD5 hash generator. Generate MD5 checksums from text instantly. Support 32-bit and 16-bit output. Secure and works offline.",
  },
  zh: {
    title: "MD5 哈希生成器 - 在线 MD5 工具",
    description:
      "免费的在线 MD5 哈希生成器。即时从文本生成 MD5 校验和。支持 32 位和 16 位输出。安全且离线工作。",
  },
  ja: {
    title: "MD5 ハッシュジェネレーター - 無料オンライン MD5 ツール",
    description:
      " 無料のオンラインMD5ハッシュジェネレーター。テキストから即座にMD5チェックサムを生成。32ビットと16ビットの出力をサポート。安全でオフライン動作。",
  },
  fr: {
    title: "Générateur de Hachage MD5 en Ligne - Outil MD5 Gratuit",
    description:
      "Générateur de hachage MD5 en ligne gratuit. Générez des checksums MD5 à partir de texte instantanément. Support de sortie 32-bit et 16-bit. Sécurisé et fonctionne hors ligne.",
  },
  es: {
    title: "Generador de Hash MD5 en Línea - Herramienta MD5 Gratuita",
    description:
      "Generador de hash MD5 en línea gratuito. Genera checksums MD5 a partir de texto al instante. Soporte de salida de 32-bit y 16-bit. Seguro y funciona sin conexión.",
  },
  ru: {
    title: "Генератор MD5 Хеша Онлайн - Бесплатный MD5 Инструмент",
    description:
      "Бесплатный онлайн генератор MD5 хеша. Генерируйте MD5 контрольные суммы из текста мгновенно. Поддержка 32-битного и 16-битного вывода. Безопасно и работает офлайн.",
  },
  de: {
    title: "MD5 Hash Generator Online - Kostenloses MD5 Tool",
    description:
      "Kostenloser Online-MD5-Hash-Generator. Generieren Sie MD5-Checksummen aus Text sofort. Unterstützt 32-Bit- und 16-Bit-Ausgabe. Sicher und funktioniert offline.",
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
  const hreflangLinks = generateHreflangLinks("/tools/md5-generator");
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

  return {
    title: langData.title,
    description: langData.description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/tools/md5-generator`,
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
  return (
    <>
      <Md5GeneratorStructuredData />
      <Md5GeneratorTool lang={lang as LanguageType} />
    </>
  );
}
