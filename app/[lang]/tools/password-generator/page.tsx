import type { Metadata } from "next";
import { PasswordGeneratorStructuredData } from "@/components/structured-data/password-generator";
import { PasswordGeneratorTool } from "@/components/tools/password-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks, supportedLocales } from "@/lib/translations";

const metadataConfig = {
  en: {
    title: "Password Generator Online - Free Secure Password Tool",
    description:
      "Free online password generator. Create strong, secure random passwords and API keys. Customizable options, cryptographically secure, works offline.",
  },
  zh: {
    title: "密码生成器 - 在线安全密码工具",
    description:
      "免费的在线密码生成器。创建强大、安全的随机密码和 API 密钥。可自定义选项，加密安全，离线工作。",
  },
  ja: {
    title: "パスワードジェネレーター - 無料オンラインセキュアパスワードツール",
    description:
      " 無料のオンラインパスワードジェネレーター。强大でセキュアなランダムパスワードとAPIキーを作成。カスタマイズ可能オプション、暗号学的にセキュア、オフラインで動作。",
  },
  fr: {
    title:
      "Générateur de Mot de Passe en Ligne - Outil de Mot de Passe Sécurisé Gratuit",
    description:
      "Générateur de mot de passe en ligne gratuit. Créez des mots de passe aléatoires forts et sécurisés et des clés API. Options personnalisables, cryptographiquement sécurisé, fonctionne hors ligne.",
  },
  es: {
    title:
      "Generador de Contraseñas en Línea - Herramienta de Contraseña Segura Gratuita",
    description:
      "Generador de contraseñas en línea gratuito. Crea contraseñas aleatorias fuertes y seguras y claves API. Opciones personalizables, criptográficamente seguro, funciona sin conexión.",
  },
  ru: {
    title:
      "Генератор Паролей Онлайн - Бесплатный Инструмент Безопасного Пароля",
    description:
      "Бесплатный онлайн генератор паролей. Создавайте сильные, безопасные случайные пароли и ключи API. Настраиваемые опции, криптографически безопасно, работает офлайн.",
  },
  de: {
    title: "Passwort Generator Online - Kostenloses Sicheres Passwort Tool",
    description:
      "Kostenloser Online-Passwort-Generator. Erstellen Sie starke, sichere zufällige Passwörter und API-Schlüssel. Anpassbare Optionen, kryptographisch sicher, funktioniert offline.",
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
  const hreflangLinks = generateHreflangLinks("/tools/password-generator");
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
      canonical: `${baseUrl}/${lang}/tools/password-generator`,
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
