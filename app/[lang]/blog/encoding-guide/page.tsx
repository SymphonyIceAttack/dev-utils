import type { Metadata } from "next";
import { EncodingGuideContent } from "@/components/blog/guides/encoding-guide-content";
import { EncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { siteUrl } from "@/lib/config";

// Generate static params for English only
export async function generateStaticParams() {
  return [
    {
      lang: "en",
    },
  ];
}

export const metadata: Metadata = {
  title: "Character Encoding Guide: UTF-8, GBK & Beyond - KittyEncode",
  description:
    "Understand character encoding systems, fix garbled text issues, and convert between different encodings like UTF-8, GBK, and Unicode.",
  keywords:
    "character encoding, UTF-8, Unicode, GBK, text encoding, internationalization, i18n, character sets, encoding conversion, text corruption",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/encoding-guide`,
    languages: {
      en: `${siteUrl}/en/blog/encoding-guide`,
    },
  },
};

export default function EncodingGuidePage() {
  return (
    <>
      <EncodingGuideStructuredData />
      <EncodingGuideContent />
    </>
  );
}
