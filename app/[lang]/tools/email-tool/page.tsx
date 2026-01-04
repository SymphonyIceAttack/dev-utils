import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { EmailToolStructuredData } from "@/components/structured-data/email-tool";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks, supportedLocales } from "@/lib/translations";

const EmailTool = dynamic(
  () => import("@/components/tools/email-tool").then((mod) => mod.EmailTool),
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
    title: "Email Tool - Extract & Verify Email Addresses Online",
    description:
      "Free online email tool. Extract email addresses from text and verify email validity. Secure, fast, and works offline in your browser.",
    openGraph: {
      title: "Email Tool - Free Online Tool",
      description:
        "Extract and verify email addresses instantly. Free, secure, and works offline.",
      url: `${siteUrl}/en/tools/email-tool`,
      type: "website",
    },
  },
  zh: {
    title: "邮箱工具 - 在线提取和验证邮箱地址",
    description:
      "免费的在线邮箱工具。从文本中提取邮箱地址并验证邮箱有效性。安全、快速，浏览器离线工作。",
    openGraph: {
      title: "邮箱工具 - 免费在线工具",
      description: "立即提取和验证邮箱地址。免费、安全、离线工作。",
      url: `${siteUrl}/zh/tools/email-tool`,
      type: "website",
    },
  },
  ja: {
    title: "メールツール - メールアドレスを抽出・検証",
    description:
      " 無料のオンラインメールツール。テキストからメールアドレスを抽出し、メールアドレスの有効性を検証。安全でブラウザオフライン動作。",
    openGraph: {
      title: "メールツール - 無料オンライン ツール",
      description: "メールアドレスを抽出・検証。安全で無料、オフライン動作。",
      url: `${siteUrl}/ja/tools/email-tool`,
      type: "website",
    },
  },
  fr: {
    title: "Outil Email - Extraire et Vérifier les Adresses Email",
    description:
      "Outil email en ligne gratuit. Extraire les adresses email du texte et vérifier la validité des emails. Sécurisé, rapide et fonctionne hors ligne.",
    openGraph: {
      title: "Outil Email - Outil en Ligne Gratuit",
      description:
        "Extraire et vérifier les adresses email instantanément. Gratuit et sécurisé.",
      url: `${siteUrl}/fr/tools/email-tool`,
      type: "website",
    },
  },
  es: {
    title: "Herramienta de Email - Extraer y Verificar Direcciones de Email",
    description:
      "Herramienta de email en línea gratis. Extraer direcciones de email del texto y verificar la validez de los emails. Seguro, rápido y funciona sin conexión.",
    openGraph: {
      title: "Herramienta de Email - Herramienta en Línea Gratuita",
      description:
        "Extraer y verificar direcciones de email instantáneamente. Gratis y seguro.",
      url: `${siteUrl}/es/tools/email-tool`,
      type: "website",
    },
  },
  ru: {
    title: "Инструмент Email - Извлечение и Проверка Адресов",
    description:
      "Бесплатный онлайн инструмент для работы с email. Извлекайте адреса электронной почты из текста и проверяйте их действительность. Безопасно, быстро, работает офлайн.",
    openGraph: {
      title: "Инструмент Email - Бесплатный Онлайн Инструмент",
      description:
        "Мгновенно извлекайте и проверяйте адреса электронной почты. Бесплатно и безопасно.",
      url: `${siteUrl}/ru/tools/email-tool`,
      type: "website",
    },
  },
  de: {
    title: "E-Mail-Tool - E-Mail-Adressen Extrahieren und Prüfen",
    description:
      "Kostenloses Online-E-Mail-Tool. Extrahieren Sie E-Mail-Adressen aus Text und überprüfen Sie die Gültigkeit von E-Mails. Sicher, schnell und funktioniert offline in Ihrem Browser.",
    openGraph: {
      title: "E-Mail-Tool - Kostenloses Online Tool",
      description:
        "E-Mail-Adressen extrahieren und überprüfen. Kostenlos und sicher.",
      url: `${siteUrl}/de/tools/email-tool`,
      type: "website",
    },
  },
};

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;
  const hreflangLinks = generateHreflangLinks("/tools/email-tool");
  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteUrl}/${lang}/tools/email-tool`,
      languages: hreflangLinks,
    },
  };
}

export default async function EmailToolPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <EmailToolStructuredData lang={lang} />
      <EmailTool lang={lang} />
    </>
  );
}
