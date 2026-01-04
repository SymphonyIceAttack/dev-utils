import type { Metadata } from "next";
import { EmailGuideContent } from "@/components/blog/guides/email-guide-content";
import { EmailGuideStructuredData } from "@/components/structured-data/blog-post";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "Email Address Validation: The Complete Technical Guide - KittyEncode",
  description:
    "Master email validation with our comprehensive engineering guide. Learn RFC 5322 standards, regex patterns, format verification vs existence checking, and build robust email validation in any programming language.",
  keywords:
    "email validation, email verification, RFC 5322, email regex, email format validation, data quality, web development, SMTP verification",
  authors: [{ name: "Engineering Research", url: `${siteUrl}/about` }],
  creator: "Engineering Research",
  publisher: "KittyEncode",
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
    canonical: `${siteUrl}/en/blog/email-guide`,
    languages: {
      en: `${siteUrl}/en/blog/email-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/email-guide`,
    title:
      "Email Address Validation: The Complete Technical Guide - KittyEncode",
    description:
      "Master email validation with our comprehensive engineering guide. Learn RFC 5322 standards and implementation best practices.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/email-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "Email Address Validation Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "Email Address Validation: The Complete Technical Guide",
    description:
      "Master email validation with our comprehensive engineering guide. Learn RFC 5322 standards and implementation best practices.",
    images: [`${siteUrl}/images/blog/email-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function EmailGuidePage() {
  return (
    <>
      <EmailGuideStructuredData />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="Email Validation Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <EmailGuideContent />
      </div>
    </>
  );
}
