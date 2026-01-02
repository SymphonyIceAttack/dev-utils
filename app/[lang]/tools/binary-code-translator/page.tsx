import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { BinaryCodeTranslatorStructuredData } from "@/components/structured-data/binary-code-translator";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks, supportedLocales } from "@/lib/translations";

const BinaryCodeTranslatorTool = dynamic(
  () =>
    import("@/components/tools/binary-code-translator").then(
      (mod) => mod.BinaryCodeTranslatorTool,
    ),
  {
    ssr: true,
    loading: () => (
      <div className="container mx-auto max-w-6xl px-4 py-8" aria-busy="true">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto" />
          <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
      </div>
    ),
  },
);

const metadataConfig = {
  en: {
    title: "Binary Code Translator - Convert Text to Binary Online",
    description:
      "Free online binary code translator. Convert text to binary and binary to text instantly. Secure, fast, and works offline.",
    openGraph: {
      title: "Binary Code Translator - Free Online Tool",
      description:
        "Convert text to binary and binary to text instantly. Free, secure, and works offline.",
      url: `${siteUrl}/en/tools/binary-code-translator`,
      type: "website",
    },
  },
  zh: {
    title: "二进制代码转换器 - 在线文本与二进制互转工具",
    description:
      "免费的在线二进制代码转换器。立即将文本转换为二进制或将二进制转换为文本。安全、快速、离线工作。",
    openGraph: {
      title: "二进制代码转换器 - 免费在线工具",
      description:
        "立即将文本转换为二进制或将二进制转换为文本。免费、安全、离线工作。",
      url: `${siteUrl}/zh/tools/binary-code-translator`,
      type: "website",
    },
  },
  ja: {
    title: "バイナリコード翻訳者 - テキストからバイナリへの変換オンライン",
    description:
      " 無料のオンラインバイナリコード翻訳者。テキストからバイナリへ、バイナリからテキストへ即座に変換。安全で高速、オフライン動作。",
    openGraph: {
      title: "バイナリコード翻訳者 - 無料オンライン ツール",
      description:
        "テキストからバイナリへ、バイナリからテキストへ即座に変換。安全で無料、オフライン動作。",
      url: `${siteUrl}/ja/tools/binary-code-translator`,
      type: "website",
    },
  },
  fr: {
    title: "Traducteur de Code Binaire - Convertir Texte en Binaire en Ligne",
    description:
      "Traducteur de code binaire en ligne gratuit. Convertissez texte en binaire et binaire en texte instantanément. Sécurisé, rapide et fonctionne hors ligne.",
    openGraph: {
      title: "Traducteur de Code Binaire - Outil en Ligne Gratuit",
      description:
        "Convertissez texte en binaire et binaire en texte instantanément. Gratuit et sécurisé.",
      url: `${siteUrl}/fr/tools/binary-code-translator`,
      type: "website",
    },
  },
  es: {
    title: "Traductor de Código Binario - Convertir Texto a Binario en Línea",
    description:
      "Traductor de código binario en línea gratis. Convierte texto a binario y binario a texto instantáneamente. Seguro, rápido y funciona sin conexión.",
    openGraph: {
      title: "Traductor de Código Binario - Herramienta en Línea Gratuita",
      description:
        "Convierte texto a binario y binario a texto instantáneamente. Gratis y seguro.",
      url: `${siteUrl}/es/tools/binary-code-translator`,
      type: "website",
    },
  },
  ru: {
    title: "Переводчик Двоичного Кода - Конвертер Текста в Двоичный Код",
    description:
      "Бесплатный онлайн переводчик двоичного кода. Мгновенно конвертируйте текст в двоичный код и наоборот. Безопасно, быстро, работает офлайн.",
    openGraph: {
      title: "Переводчик Двоичного Кода - Бесплатный Онлайн Инструмент",
      description:
        "Мгновенно конвертируйте текст в двоичный код и наоборот. Бесплатно и безопасно.",
      url: `${siteUrl}/ru/tools/binary-code-translator`,
      type: "website",
    },
  },
  de: {
    title: "Binärcode-Übersetzer - Text zu Binär Konverter Online",
    description:
      "Kostenloser Online-Binärcode-Übersetzer. Konvertieren Sie Text in Binär und Binär in Text sofort. Sicher, schnell und funktioniert offline.",
    openGraph: {
      title: "Binärcode-Übersetzer - Kostenloses Online Tool",
      description:
        "Konvertieren Sie Text in Binär und Binär in Text sofort. Kostenlos und sicher.",
      url: `${siteUrl}/de/tools/binary-code-translator`,
      type: "website",
    },
  },
};

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
  const hreflangLinks = generateHreflangLinks("/tools/binary-code-translator");
  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/tools/binary-code-translator`,
      languages: hreflangLinks,
    },
  };
}

export default async function BinaryCodeTranslatorPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <BinaryCodeTranslatorStructuredData lang={lang} />
      <BinaryCodeTranslatorTool lang={lang} />
    </>
  );
}
