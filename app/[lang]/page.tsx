import type { Metadata } from "next";
import { StructuredDataScripts } from "@/components/structured-data/url-encoder";
import { UrlEncoderTool } from "@/components/tools/url-encoder-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "URL Encoder / Decoder Online - Free URL Encode Tool",
    description:
      "Free online URL encoder and decoder. Encode or decode URLs and query parameters instantly. No signup required, works offline in your browser.",
    keywords: [
      "URL encoder",
      "URL decoder",
      "percent encoding",
      "URL encode online",
      "decode URL",
      "URL encoding tool",
      "query parameter encoder",
      "URL formatter",
    ],
    openGraph: {
      title: "URL Encoder / Decoder - Free Online Tool",
      description:
        "Encode or decode URLs instantly. Free, fast, no signup required.",
      url: `${baseUrl}/en`,
      type: "website",
    },
  },
  zh: {
    title: "URL 编码/解码工具 - 在线 URL 编码器",
    description:
      "免费的在线URL编码和解码工具。立即编码或解码URL和查询参数。无需注册，浏览器离线工作。",
    keywords: [
      "URL编码",
      "URL解码",
      "百分号编码",
      "URL编码工具",
      "解码URL",
      "URL编码器",
      "查询参数编码",
      "URL格式化",
    ],
    openGraph: {
      title: "URL 编码/解码工具 - 免费在线工具",
      description: "立即编码或解码URL。免费、快速、无需注册。",
      url: `${baseUrl}/zh`,
      type: "website",
    },
  },
  ja: {
    title: "URL エンコーダー/デコーダー - 無料オンラインURLエンコーダー",
    description:
      "無料のオンラインURLエンコーダーおよびデコーダー。URLおよびクエリーパラメーターを即座にエンコードまたはデコード。サインアップ不要、ブラウザでオフライン動作。",
    keywords: [
      "URLエンコーダー",
      "URLデコーダー",
      "百分率エンコーディング",
      "オンラインURLエンコード",
      "URLデコード",
      "URLエンコーディングツール",
      "クエリーパラメーターエンコーダー",
      "URLフォーマッター",
    ],
    openGraph: {
      title: "URL エンコーダー/デコーダー - 無料オンライン ツール",
      description:
        "URLを即座にエンコードまたはデコード。無料、高速、サインアップ不要。",
      url: `${baseUrl}/ja`,
      type: "website",
    },
  },
  fr: {
    title: "Encodeur/Décodeur URL - Encodeur URL en ligne gratuit",
    description:
      "Encodeur et décodeur URL en ligne gratuit. Encodez ou décodez instantanément les URL et paramètres de requête. Aucune inscription requise, fonctionne hors ligne dans votre navigateur.",
    keywords: [
      "encodeur URL",
      "décodeur URL",
      "encodage pourcentage",
      "encoder URL en ligne",
      "décoder URL",
      "outil encodage URL",
      "encodeur paramètre requête",
      "formateur URL",
    ],
    openGraph: {
      title: "Encodeur/Décodeur URL - Outil en ligne gratuit",
      description:
        "Encodez ou décodez les URL instantanément. Gratuit, rapide, aucune inscription requise.",
      url: `${baseUrl}/fr`,
      type: "website",
    },
  },
  es: {
    title: "Codificador/Decodificador URL - Codificador URL en línea gratis",
    description:
      "Codificador y decodificador URL en línea gratis. Codifica o decodifica instantáneamente URLs y parámetros de consulta. Sin registro requerido, funciona sin conexión en tu navegador.",
    keywords: [
      "codificador URL",
      "decodificador URL",
      "codificación porcentual",
      "codificar URL en línea",
      "decodificar URL",
      "herramienta codificación URL",
      "codificador parámetro consulta",
      "formateador URL",
    ],
    openGraph: {
      title: "Codificador/Decodificador URL - Herramienta en línea gratis",
      description:
        "Codifica o decodifica URLs instantáneamente. Gratis, rápido, sin registro requerido.",
      url: `${baseUrl}/es`,
      type: "website",
    },
  },
  ru: {
    title: "URL Кодер/Декодер - Онлайн URL кодер бесплатно",
    description:
      "Бесплатный онлайн URL кодер и декодер. Мгновенно кодируйте или декодируйте URL и параметры запроса. Регистрация не требуется, работает офлайн в браузере.",
    keywords: [
      "URL кодер",
      "URL декодер",
      "процентное кодирование",
      "кодировать URL онлайн",
      "декодировать URL",
      "инструмент кодирования URL",
      "кодер параметров запроса",
      "форматер URL",
    ],
    openGraph: {
      title: "URL Кодер/Декодер - Бесплатный онлайн инструмент",
      description:
        "Кодируйте или декодируйте URL мгновенно. Бесплатно, быстро, без регистрации.",
      url: `${baseUrl}/ru`,
      type: "website",
    },
  },
  de: {
    title: "URL Encoder/Decoder - Kostenloser Online URL Encoder",
    description:
      "Kostenloser Online URL Encoder und Decoder. Kodieren oder dekodieren Sie sofort URLs und Abfrageparameter. Keine Registrierung erforderlich, funktioniert offline in Ihrem Browser.",
    keywords: [
      "URL Encoder",
      "URL Decoder",
      "Prozent-Kodierung",
      "URL online kodieren",
      "URL dekodieren",
      "URL Kodierungs-Tool",
      "Abfrageparameter-Encoder",
      "URL Formatierer",
    ],
    openGraph: {
      title: "URL Encoder/Decoder - Kostenloses Online Tool",
      description:
        "Kodieren oder dekodieren Sie URLs sofort. Kostenlos, schnell, keine Registrierung erforderlich.",
      url: `${baseUrl}/de`,
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

  const hreflangLinks = generateHreflangLinks("/");

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
      canonical: `${baseUrl}/${lang}`,
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
  return (
    <>
      <StructuredDataScripts />
      <UrlEncoderTool lang={lang as LanguageType} />
    </>
  );
}
