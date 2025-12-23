import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { BlogPageStructuredData } from "@/components/structured-data/blog-page";
import { BlogBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

const metadataConfig = {
  en: {
    title: "Developer Guides & Tutorials - KittyEncode Blog",
    description:
      "Learn encoding, hashing, and security best practices with our comprehensive developer guides. Tutorials on URL encoding, Base64, MD5, UUID, password generation, and character encoding.",
    keywords:
      "developer guides, tutorials, encoding, base64, md5, uuid, password generation, security, cryptography, url encoding, character encoding",
  },
  zh: {
    title: "开发者教程与指南 - KittyEncode 博客",
    description:
      "通过我们的综合开发者指南学习编码、哈希和安全最佳实践。关于 URL 编码、Base64、MD5、UUID、密码生成和字符编码的教程。",
    keywords:
      "开发者指南, 教程, 编码, Base64, MD5, UUID, 密码生成, 安全, 密码学, URL编码, 字符编码",
  },
  ja: {
    title: "開発者ガイドとチュートリアル - KittyEncode ブログ",
    description:
      "包括的な開発者ガイドでエンコーディング、ハッシュ、セキュリティのベストプラクティスを学びましょう。URL エンコーディング、Base64、MD5、UUID、パスワード生成、文字エンコーディングなどのチュートリアル。",
    keywords:
      "開発者ガイド, チュートリアル, エンコーディング, Base64, MD5, UUID, パスワード生成, セキュリティ, 暗号学, URLエンコーディング",
  },
  fr: {
    title: "Guides et Tutoriels pour Développeurs - Blog KittyEncode",
    description:
      "Apprenez l'encodage, le hachage et les meilleures pratiques de sécurité avec nos guides complets pour développeurs. Tutoriels sur l'encodage URL, Base64, MD5, UUID, la génération de mots de passe et l'encodage de caractères.",
    keywords:
      "guides développeurs, tutoriels, encodage, base64, md5, uuid, génération mots de passe, sécurité, cryptographie, encodage url",
  },
  es: {
    title: "Guías y Tutoriales para Desarrolladores - Blog KittyEncode",
    description:
      "Aprende codificación, hash y mejores prácticas de seguridad con nuestras completas guías para desarrolladores. Tutoriales sobre codificación URL, Base64, MD5, UUID, generación de contraseñas y codificación de caracteres.",
    keywords:
      "guías desarrolladores, tutoriales, codificación, base64, md5, uuid, generación contraseñas, seguridad, criptografía, codificación url",
  },
  ru: {
    title: "Руководства и Учебники для Разработчиков - Блог KittyEncode",
    description:
      "Изучайте кодирование, хеширование и лучшие практики безопасности с помощью подробных руководств для разработчиков. Учебники по URL-кодированию, Base64, MD5, UUID, генерации паролей и кодировке символов.",
    keywords:
      "руководства разработчиков, учебники, кодирование, base64, md5, uuid, генерация паролей, безопасность, криптография, url-кодировка",
  },
  de: {
    title: "Entwicklerhandbücher und Tutorials - KittyEncode Blog",
    description:
      "Lernen Sie Kodierung, Hashing und Best Practices für Sicherheit mit unseren umfassenden Entwicklerhandbüchern. Tutorials zu URL-Kodierung, Base64, MD5, UUID, Passwortgenerierung und Zeichencodierung.",
    keywords:
      "Entwicklerhandbücher, Tutorials, Kodierung, Base64, MD5, UUID, Passwortgenerierung, Sicherheit, Kryptographie, URL-Kodierung",
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

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: `${siteUrl}/${lang}/blog`,
      title: langData.title,
      description: langData.description,
      siteName: "KittyEncode",
      images: [
        {
          url: `${siteUrl}/og-blog.png`,
          width: 1200,
          height: 630,
          alt: "KittyEncode Developer Guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: langData.title,
      description: langData.description,
      images: [`${siteUrl}/og-blog.png`],
      creator: "@kittyencode",
    },
  };
}

export default async function BlogPage() {
  return (
    <>
      <BlogPageStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BlogBreadcrumbSchema()),
        }}
      />
      <BlogList />
    </>
  );
}
