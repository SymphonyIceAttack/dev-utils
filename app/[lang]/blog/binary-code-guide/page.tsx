import type { Metadata } from "next";
import { BinaryCodeGuideContent } from "@/components/blog/guides/binary-code-guide-content";
import { BinaryCodeGuideStructuredData } from "@/components/structured-data/blog-post";
import { BinaryCodeGuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "Binary Code: The Foundation of Digital Computing - KittyEncode",
  description:
    "Master binary code with our comprehensive engineering guide. Learn binary representation, bitwise operations, two's complement, floating-point formats, and practical applications in computing systems.",
  keywords:
    "binary code, binary representation, bitwise operations, two's complement, floating point, computer science, digital systems, binary arithmetic, bit manipulation",
  authors: [{ name: "Engineering Team", url: `${siteUrl}/about` }],
  creator: "Engineering Team",
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
    canonical: `${siteUrl}/en/blog/binary-code-guide`,
    languages: {
      en: `${siteUrl}/en/blog/binary-code-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/binary-code-guide`,
    title: "Binary Code: The Foundation of Digital Computing - KittyEncode",
    description:
      "Master binary code with our comprehensive engineering guide. Learn binary representation, bitwise operations, and floating-point formats.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/binary-code-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "Binary Code Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "Binary Code: The Foundation of Digital Computing",
    description:
      "Master binary code with our comprehensive engineering guide. Learn bitwise operations and floating-point formats.",
    images: [`${siteUrl}/images/blog/binary-code-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function BinaryCodeGuidePage() {
  return (
    <>
      <BinaryCodeGuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BinaryCodeGuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="Binary Code Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <BinaryCodeGuideContent />
      </div>
    </>
  );
}
