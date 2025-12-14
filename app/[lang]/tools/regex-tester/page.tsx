import type { Metadata } from "next";
import { RegexTesterStructuredData } from "@/components/structured-data/regex-tester";
import { RegexTesterTool } from "@/components/tools/regex-tester-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "Regex Tester Online - Free Regular Expression Testing Tool",
    description:
      "Test regular expressions online instantly. Supports JavaScript, Python, PCRE and other flavors. Match, search, replace and validate patterns with real-time results.",
    keywords: [
      "regex tester",
      "regular expression tester",
      "online regex",
      "regex online",
      "regular expression tool",
      "regex pattern tester",
      "regex validator",
      "regex matcher",
      "regex debugger",
      "regex checker",
    ],
    openGraph: {
      title: "Regex Tester - Free Online Regular Expression Tool",
      description:
        "Test regular expressions online with real-time results. Supports multiple regex flavors and syntax highlighting.",
      url: "https://devtools.app/tools/regex-tester",
      type: "website",
    },
  },
  zh: {
    title: "正则表达式测试器 - 在线正则表达式测试工具",
    description:
      "在线即时测试正则表达式。支持JavaScript、Python、PCRE等多种引擎。实时匹配、搜索、替换和验证模式。",
    keywords: [
      "正则表达式测试器",
      "正则表达式工具",
      "在线正则",
      "regex测试",
      "正则验证器",
      "正则匹配器",
      "regex调试器",
      "正则检查器",
      "regex模式测试",
    ],
    openGraph: {
      title: "正则表达式测试器 - 免费在线工具",
      description:
        "使用实时结果在线测试正则表达式。支持多种regex引擎和语法高亮。",
      url: "https://devtools.app/tools/regex-tester",
      type: "website",
    },
  },
  ja: {
    title: "正規表現テスター - 無料オンライン 正規表現 テストツール",
    description:
      "正規表現をオンラインで即座にテスト。JavaScript、Python、PCREなどのフレーバーをサポート。リアルタイムでマッチ、検索、置換、検証。",
    keywords: [
      "正規表現テスター",
      "正規表現ツール",
      "オンライン正規表現",
      "regexテスト",
      "正規表現バリデーター",
      "正規表現.matcher",
      "regexデバッガー",
      "正規表現チェッカー",
    ],
    openGraph: {
      title: "正規表現テスター - 無料オンライン ツール",
      description:
        "リアルタイム結果で正規表現をオンラインでテスト。複数のregexフレーバーと構文ハイライトをサポート。",
      url: "https://devtools.app/tools/regex-tester",
      type: "website",
    },
  },
  fr: {
    title:
      "Testeur Regex - Outil de Test d'Expression Régulière en Ligne Gratuit",
    description:
      "Testez les expressions régulières en ligne instantanément. Supporte JavaScript, Python, PCRE et autres saveurs. Correspondance, recherche, remplacement et validation en temps réel.",
    keywords: [
      "testeur regex",
      "outil expression régulière",
      "regex en ligne",
      "test regex",
      "validateur regex",
      "matcher regex",
      "débogueur regex",
      "vérificateur regex",
    ],
    openGraph: {
      title: "Testeur Regex - Outil d'Expression Régulière en Ligne Gratuit",
      description:
        "Testez les expressions régulières en ligne avec des résultats en temps réel. Supporte plusieurs saveurs regex et coloration syntaxique.",
      url: "https://devtools.app/tools/regex-tester",
      type: "website",
    },
  },
  es: {
    title:
      "Probador Regex - Herramienta Probadora de Expresión Regular en Línea Gratis",
    description:
      "Prueba expresiones regulares en línea instantáneamente. Soporta JavaScript, Python, PCRE y otros sabores. Coincidencia, búsqueda, reemplazo y validación en tiempo real.",
    keywords: [
      "probador regex",
      "herramienta expresión regular",
      "regex en línea",
      "test regex",
      "validador regex",
      "matcher regex",
      "depurador regex",
      "verificador regex",
    ],
    openGraph: {
      title:
        "Probador Regex - Herramienta de Expresión Regular en Línea Gratis",
      description:
        "Prueba expresiones regulares en línea con resultados en tiempo real. Soporta múltiples sabores regex y resaltado de sintaxis.",
      url: "https://devtools.app/tools/regex-tester",
      type: "website",
    },
  },
  ru: {
    title: "Тестер Регулярных Выражений - Бесплатный Онлайн Инструмент",
    description:
      "Тестируйте регулярные выражения онлайн мгновенно. Поддерживает JavaScript, Python, PCRE и другие варианты. Сопоставление, поиск, замена и валидация в реальном времени.",
    keywords: [
      "тестер regex",
      "инструмент регулярных выражений",
      "regex онлайн",
      "тест regex",
      "валидатор regex",
      "matcher regex",
      "отладчик regex",
      "проверщик regex",
    ],
    openGraph: {
      title: "Тестер Регулярных Выражений - Бесплатный Онлайн Инструмент",
      description:
        "Тестируйте регулярные выражения онлайн с результатами в реальном времени. Поддерживает несколько вариантов regex и подсветку синтаксиса.",
      url: "https://devtools.app/tools/regex-tester",
      type: "website",
    },
  },
  de: {
    title: "Regex Tester - Kostenloser Online Regulärer Ausdruck Tester",
    description:
      "Testen Sie reguläre Ausdrücke online sofort. Unterstützt JavaScript, Python, PCRE und andere Varianten. Abgleichen, Suchen, Ersetzen und Validierung in Echtzeit.",
    keywords: [
      "regex tester",
      "regulärer ausdruck werkzeug",
      "regex online",
      "regex test",
      "regex validator",
      "regex matcher",
      "regex debugger",
      "regex checker",
    ],
    openGraph: {
      title: "Regex Tester - Kostenloses Online Regulärer Ausdruck Tool",
      description:
        "Testen Sie reguläre Ausdrücke online mit Echtzeitergebnissen. Unterstützt mehrere regex Varianten und Syntax-Highlighting.",
      url: "https://devtools.app/tools/regex-tester",
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

  const hreflangLinks = generateHreflangLinks("/tools/regex-tester");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    alternates: {
      canonical: "https://devtools.app/tools/regex-tester",
      languages: hreflangLinks,
    },
  };
}

export default async function RegexTesterPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <RegexTesterStructuredData />
      <RegexTesterTool lang={lang as LanguageType} />
    </>
  );
}
