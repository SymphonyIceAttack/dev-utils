import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { BlogPageStructuredData } from "@/components/structured-data/blog-page";
import { siteUrl } from "@/lib/config";
import { generateHreflangLinks, supportedLocales } from "@/lib/translations";

// Generate static params for all supported languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Developer Guides & Tutorials - KittyEncode Blog",
    description:
      "Learn encoding, hashing, and security best practices with our comprehensive developer guides. Tutorials on URL encoding, Base64, MD5, UUID, and more.",
    openGraph: {
      title: "Developer Guides & Tutorials - KittyEncode Blog",
      description:
        "Learn encoding, hashing, and security best practices with our comprehensive developer guides. Tutorials on URL encoding, Base64, MD5, UUID, and more.",
      url: `${siteUrl}/en/blog`,
      type: "website",
    },
  },
  zh: {
    title: "开发者教程与指南 - KittyEncode 博客",
    description:
      "通过我们的综合开发者指南学习编码、哈希和安全最佳实践。关于 URL 编码、Base64、MD5、UUID 等的教程。",
    openGraph: {
      title: "开发者教程与指南 - KittyEncode 博客",
      description:
        "通过我们的综合开发者指南学习编码、哈希和安全最佳实践。关于 URL 编码、Base64、MD5、UUID 等的教程。",
      url: `${siteUrl}/zh/blog`,
      type: "website",
    },
  },
  ja: {
    title: "開発者ガイドとチュートリアル - KittyEncode ブログ",
    description:
      "包括的な開発者ガイドでエンコーディング、ハッシュ、セキュリティのベストプラクティスを学びましょう。URL エンコーディング、Base64、MD5、UUID などのチュートリアル。",
    openGraph: {
      title: "開発者ガイドとチュートリアル - KittyEncode ブログ",
      description:
        "包括的な開発者ガイドでエンコーディング、ハッシュ、セキュリティのベストプラクティスを学びましょう。URL エンコーディング、Base64、MD5、UUID などのチュートリアル。",
      url: `${siteUrl}/ja/blog`,
      type: "website",
    },
  },
  fr: {
    title: "Guides et Tutoriels pour Développeurs - Blog KittyEncode",
    description:
      "Apprenez l'encodage, le hachage et les meilleures pratiques de sécurité avec nos guides complets pour développeurs. Tutoriels sur l'encodage URL, Base64, MD5, UUID et plus.",
    openGraph: {
      title: "Guides et Tutoriels pour Développeurs - Blog KittyEncode",
      description:
        "Apprenez l'encodage, le hachage et les meilleures pratiques de sécurité avec nos guides complets pour développeurs. Tutoriels sur l'encodage URL, Base64, MD5, UUID et plus.",
      url: `${siteUrl}/fr/blog`,
      type: "website",
    },
  },
  es: {
    title: "Guías y Tutoriales para Desarrolladores - Blog KittyEncode",
    description:
      "Aprende codificación, hash y mejores prácticas de seguridad con nuestras completas guías para desarrolladores. Tutoriales sobre codificación URL, Base64, MD5, UUID y más.",
    openGraph: {
      title: "Guías y Tutoriales para Desarrolladores - Blog KittyEncode",
      description:
        "Aprende codificación, hash y mejores prácticas de seguridad con nuestras completas guías para desarrolladores. Tutoriales sobre codificación URL, Base64, MD5, UUID y más.",
      url: `${siteUrl}/es/blog`,
      type: "website",
    },
  },
  ru: {
    title: "Руководства и Учебники для Разработчиков - Блог KittyEncode",
    description:
      "Изучайте кодирование, хеширование и лучшие практики безопасности с нашими полными руководствами для разработчиков. Учебники по URL-кодированию, Base64, MD5, UUID и многое другое.",
    openGraph: {
      title: "Руководства и Учебники для Разработчиков - Блог KittyEncode",
      description:
        "Изучайте кодирование, хеширование и лучшие практики безопасности с нашими полными руководствами для разработчиков. Учебники по URL-кодированию, Base64, MD5, UUID и многое другое.",
      url: `${siteUrl}/ru/blog`,
      type: "website",
    },
  },
  de: {
    title: "Entwicklerhandbücher und Tutorials - KittyEncode Blog",
    description:
      "Lernen Sie Kodierung, Hashing und Best Practices für Sicherheit mit unseren umfassenden Entwicklerhandbüchern. Tutorials zu URL-Kodierung, Base64, MD5, UUID und mehr.",
    openGraph: {
      title: "Entwicklerhandbücher und Tutorials - KittyEncode Blog",
      description:
        "Lernen Sie Kodierung, Hashing und Best Practices für Sicherheit mit unseren umfassenden Entwicklerhandbüchern. Tutorials zu URL-Kodierung, Base64, MD5, UUID und mehr.",
      url: `${siteUrl}/de/blog`,
      type: "website",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;
  const hreflangLinks = generateHreflangLinks("/blog");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    keywords:
      "developer guides, tutorials, encoding, base64, md5, uuid, password generation, security",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
      languages: hreflangLinks,
    },
  };
}

export default async function BlogPage() {
  return (
    <>
      <BlogPageStructuredData />
      <BlogList />
    </>
  );
}
