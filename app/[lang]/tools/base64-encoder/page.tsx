import type { Metadata } from "next";
import { Base64EncoderStructuredData } from "@/components/structured-data/base64-encoder";
import { Base64EncoderTool } from "@/components/tools/base64-encoder-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "Base64 Encoder & Decoder Online - Free Base64 Tool",
    description:
      "Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 to text instantly. Secure, fast, and works offline in your browser.",
    keywords: [
      "Base64 encoder",
      "Base64 decoder",
      "Base64 converter",
      "encode Base64",
      "decode Base64",
      "Base64 online",
      "Base64 tool",
      "text to Base64",
      "Base64 encode online",
      "Base64 decode online",
    ],
    openGraph: {
      title: "Base64 Encoder & Decoder - Free Online Tool",
      description:
        "Encode text to Base64 or decode Base64 to text instantly. Free, secure, and works offline.",
      url: `${baseUrl}/tools/base64-encoder`,
      type: "website",
    },
  },
  zh: {
    title: "Base64 编码解码器 - 在线 Base64 工具",
    description:
      "免费的在线 Base64 编码解码器。将文本编码为 Base64 或将 Base64 解码为文本。安全、快速，浏览器离线工作。",
    keywords: [
      "Base64 编码器",
      "Base64 解码器",
      "Base64 转换器",
      "Base64 编码",
      "Base64 解码",
      "Base64 在线",
      "Base64 工具",
      "文本转 Base64",
      "Base64 编码在线",
      "Base64 解码在线",
    ],
    openGraph: {
      title: "Base64 编码解码器 - 免费在线工具",
      description:
        "将文本编码为 Base64 或将 Base64 解码为文本。免费、安全、离线工作。",
      url: `${baseUrl}/tools/base64-encoder`,
      type: "website",
    },
  },
  ja: {
    title: "Base64 エンコーダー - 無料オンライン Base64 ツール",
    description:
      "無料のオンライン Base64 エンコーダーおよびデコーダー。テキストを Base64 にエンコードまたは Base64 をテキストにデコード。即座に動作し、ブラウザでオフライン動作。",
    keywords: [
      "Base64 エンコーダー",
      "Base64 デコーダー",
      "Base64 コンバーター",
      "Base64 エンコード",
      "Base64 デコード",
      "Base64 オンライン",
      "Base64 ツール",
      "テキストを Base64 に",
      "Base64 エンコード オンライン",
      "Base64 デコード オンライン",
    ],
    openGraph: {
      title: "Base64 エンコーダー - 無料オンライン ツール",
      description:
        "テキストを Base64 にエンコードまたは Base64 をテキストにデコード。即座に動作します。",
      url: `${baseUrl}/tools/base64-encoder`,
      type: "website",
    },
  },
  fr: {
    title: "Encodeur Base64 - Outil Base64 en ligne gratuit",
    description:
      "Encodeur et décodeur Base64 en ligne gratuit. Encodez du texte en Base64 ou décodez Base64 en texte instantanément. Sécurisé, rapide, fonctionne hors ligne dans votre navigateur.",
    keywords: [
      "encodeur Base64",
      "décodeur Base64",
      "convertisseur Base64",
      "encoder Base64",
      "décoder Base64",
      "Base64 en ligne",
      "outil Base64",
      "texte vers Base64",
      "encoder Base64 en ligne",
      "décoder Base64 en ligne",
    ],
    openGraph: {
      title: "Encodeur Base64 - Outil en ligne gratuit",
      description:
        "Encodez du texte en Base64 ou décodez Base64 en texte instantanément. Gratuit et sécurisé.",
      url: `${baseUrl}/tools/base64-encoder`,
      type: "website",
    },
  },
  es: {
    title: "Codificador Base64 - Herramienta Base64 en línea gratis",
    description:
      "Codificador y decodificador Base64 en línea gratis. Codifica texto a Base64 o decodifica Base64 a texto al instante. Seguro, rápido, funciona sin conexión en tu navegador.",
    keywords: [
      "codificador Base64",
      "decodificador Base64",
      "convertidor Base64",
      "codificar Base64",
      "decodificar Base64",
      "Base64 en línea",
      "herramienta Base64",
      "texto a Base64",
      "codificar Base64 en línea",
      "decodificar Base64 en línea",
    ],
    openGraph: {
      title: "Codificador Base64 - Herramienta en línea gratis",
      description:
        "Codifica texto a Base64 o decodifica Base64 a texto al instante. Gratis y seguro.",
      url: `${baseUrl}/tools/base64-encoder`,
      type: "website",
    },
  },
  ru: {
    title: "Base64 Кодировщик - Онлайн Base64 инструмент бесплатно",
    description:
      "Бесплатный онлайн кодировщик и декодировщик Base64. Кодируйте текст в Base64 или декодируйте Base64 в текст мгновенно. Безопасно, быстро, работает офлайн в браузере.",
    keywords: [
      "Base64 кодировщик",
      "Base64 декодировщик",
      "Base64 конвертер",
      "кодировать Base64",
      "декодировать Base64",
      "Base64 онлайн",
      "Base64 инструмент",
      "текст в Base64",
      "кодировать Base64 онлайн",
      "декодировать Base64 онлайн",
    ],
    openGraph: {
      title: "Base64 Кодировщик - Бесплатный онлайн инструмент",
      description:
        "Кодируйте текст в Base64 или декодируйте Base64 в текст мгновенно. Бесплатно и безопасно.",
      url: `${baseUrl}/tools/base64-encoder`,
      type: "website",
    },
  },
  de: {
    title: "Base64 Encoder - Kostenloser Online Base64 Tool",
    description:
      "Kostenloser Online Base64 Encoder und Decoder. Text zu Base64 kodieren oder Base64 zu Text dekodieren sofort. Sicher, schnell, funktioniert offline in Ihrem Browser.",
    keywords: [
      "Base64 Encoder",
      "Base64 Decoder",
      "Base64 Konverter",
      "Base64 kodieren",
      "Base64 dekodieren",
      "Base64 online",
      "Base64 Tool",
      "Text zu Base64",
      "Base64 online kodieren",
      "Base64 online dekodieren",
    ],
    openGraph: {
      title: "Base64 Encoder - Kostenloses Online Tool",
      description:
        "Text zu Base64 kodieren oder Base64 zu Text dekodieren sofort. Kostenlos und sicher.",
      url: `${baseUrl}/tools/base64-encoder`,
      type: "website",
    },
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

  const hreflangLinks = generateHreflangLinks("/tools/base64-encoder");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/tools/base64-encoder`,
      languages: hreflangLinks,
    },
  };
}

export default async function Base64EncoderPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <Base64EncoderStructuredData />
      <Base64EncoderTool lang={lang as LanguageType} />
    </>
  );
}
