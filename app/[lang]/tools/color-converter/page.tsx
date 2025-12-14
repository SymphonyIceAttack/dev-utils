import type { Metadata } from "next";
import { ColorConverterStructuredData } from "@/components/structured-data/color-converter";
import { ColorConverterTool } from "@/components/tools/color-converter-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "Color Converter Online - HEX RGB HSL Color Format Converter",
    description:
      "Convert between color formats online. Transform HEX, RGB, HSL, and more. Visual color picker with real-time preview. Free and works offline.",
    keywords: [
      "color converter",
      "hex to rgb",
      "rgb to hex",
      "color format converter",
      "color picker",
      "color online",
      "hex converter",
      "rgb converter",
      "hsl converter",
      "color format",
    ],
    openGraph: {
      title: "Color Converter - Free Online Color Format Tool",
      description:
        "Convert between color formats online. Transform HEX, RGB, HSL, and more. Free and works offline.",
      url: "https://devtools.app/tools/color-converter",
      type: "website",
    },
  },
  zh: {
    title: "颜色转换器 - 在线HEX RGB HSL颜色格式转换工具",
    description:
      "在线转换颜色格式。在HEX、RGB、HSL等格式间转换。带实时预览的可视化颜色选择器。免费且离线工作。",
    keywords: [
      "颜色转换器",
      "hex转rgb",
      "rgb转hex",
      "颜色格式转换器",
      "颜色选择器",
      "颜色在线",
      "hex转换器",
      "rgb转换器",
      "hsl转换器",
      "颜色格式",
    ],
    openGraph: {
      title: "颜色转换器 - 免费在线颜色格式工具",
      description:
        "在线转换颜色格式。在HEX、RGB、HSL等格式间转换。免费且离线工作。",
      url: "https://devtools.app/tools/color-converter",
      type: "website",
    },
  },
  ja: {
    title: "カラーコンバーター - オンラインHEX RGB HSLカラー形式変換ツール",
    description:
      "オンラインでカラー形式を変換。HEX、RGB、HSLなどの形式間で変換。リアルタイムプレビュー付きビジュアルカラーピッカー。無料でオフライン動作。",
    keywords: [
      "カラーコンバーター",
      "hexからrgb",
      "rgbからhex",
      "カラー形式コンバーター",
      "カラーピッカー",
      "カラーオンライン",
      "hexコンバーター",
      "rgbコンバーター",
      "hslコンバーター",
      "カラー形式",
    ],
    openGraph: {
      title: "カラーコンバーター - 無料オンラインカラー形式ツール",
      description:
        "オンラインでカラー形式を変換。HEX、RGB、HSLなどの形式間で変換。無料でオフライン動作。",
      url: "https://devtools.app/tools/color-converter",
      type: "website",
    },
  },
  fr: {
    title:
      "Convertisseur de Couleur - Outil de Conversion de Format de Couleur en Ligne",
    description:
      "Convertissez entre les formats de couleur en ligne. Transformez HEX, RGB, HSL, et plus. Sélecteur de couleur visuel avec aperçu en temps réel. Gratuit et fonctionne hors ligne.",
    keywords: [
      "convertisseur de couleur",
      "hex vers rgb",
      "rgb vers hex",
      "convertisseur de format de couleur",
      "sélecteur de couleur",
      "couleur en ligne",
      "convertisseur hex",
      "convertisseur rgb",
      "convertisseur hsl",
      "format de couleur",
    ],
    openGraph: {
      title:
        "Convertisseur de Couleur - Outil de Format de Couleur Gratuit en Ligne",
      description:
        "Convertissez entre les formats de couleur en ligne. Transformez HEX, RGB, HSL, et plus. Gratuit et fonctionne hors ligne.",
      url: "https://devtools.app/tools/color-converter",
      type: "website",
    },
  },
  es: {
    title: "Convertidor de Color - Herramienta de Formato de Color en Línea",
    description:
      "Convierte entre formatos de color en línea. Transforma HEX, RGB, HSL, y más. Selector de color visual con vista previa en tiempo real. Gratis y funciona sin conexión.",
    keywords: [
      "convertidor de color",
      "hex a rgb",
      "rgb a hex",
      "convertidor de formato de color",
      "selector de color",
      "color en línea",
      "convertidor hex",
      "convertidor rgb",
      "convertidor hsl",
      "formato de color",
    ],
    openGraph: {
      title:
        "Convertidor de Color - Herramienta de Formato de Color Gratis en Línea",
      description:
        "Convierte entre formatos de color en línea. Transforma HEX, RGB, HSL, y más. Gratis y funciona sin conexión.",
      url: "https://devtools.app/tools/color-converter",
      type: "website",
    },
  },
  ru: {
    title: "Конвертер Цветов - Онлайн Конвертер Форматов Цветов HEX RGB HSL",
    description:
      "Конвертируйте между форматами цветов онлайн. Преобразуйте HEX, RGB, HSL и многое другое. Визуальный выбор цветов с предварительным просмотром в реальном времени. Бесплатно и работает офлайн.",
    keywords: [
      "конвертер цветов",
      "hex в rgb",
      "rgb в hex",
      "конвертер форматов цветов",
      "выбор цветов",
      "цвета онлайн",
      "конвертер hex",
      "конвертер rgb",
      "конвертер hsl",
      "формат цветов",
    ],
    openGraph: {
      title: "Конвертер Цветов - Бесплатный Онлайн Инструмент Форматов Цветов",
      description:
        "Конвертируйте между форматами цветов онлайн. Преобразуйте HEX, RGB, HSL и многое другое. Бесплатно и работает офлайн.",
      url: "https://devtools.app/tools/color-converter",
      type: "website",
    },
  },
  de: {
    title: "Farbkonverter - Kostenloser Online Farbformat-Konverter",
    description:
      "Konvertieren Sie zwischen Farbformaten online. Transformieren Sie HEX, RGB, HSL und mehr. Visueller Farbwähler mit Echtzeit-Vorschau. Kostenlos und funktioniert offline.",
    keywords: [
      "Farbkonverter",
      "hex zu rgb",
      "rgb zu hex",
      "Farbformat-Konverter",
      "Farbwähler",
      "Farben online",
      "hex Konverter",
      "rgb Konverter",
      "hsl Konverter",
      "Farbformat",
    ],
    openGraph: {
      title: "Farbkonverter - Kostenloses Online Farbformat-Tool",
      description:
        "Konvertieren Sie zwischen Farbformaten online. Transformieren Sie HEX, RGB, HSL und mehr. Kostenlos und funktioniert offline.",
      url: "https://devtools.app/tools/color-converter",
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

  const hreflangLinks = generateHreflangLinks("/tools/color-converter");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    alternates: {
      canonical: "https://devtools.app/tools/color-converter",
      languages: hreflangLinks,
    },
  };
}

export default async function ColorConverterPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <ColorConverterStructuredData />
      <ColorConverterTool lang={lang as LanguageType} />
    </>
  );
}
