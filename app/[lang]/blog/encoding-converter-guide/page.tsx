import type { Metadata } from "next";
import { EncodingConverterGuideContent } from "@/components/blog/guides/encoding-converter-guide-content";
import { EncodingConverterGuideStructuredData } from "@/components/structured-data/blog-post";
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
  title: "Text Encoding Conversion: Complete Guide - KittyEncode",
  description:
    "Master text encoding conversion between UTF-8, UTF-16, ASCII, Hex, Binary, and Unicode Escape formats. Essential guide for handling international text and data encoding.",
  keywords:
    "text encoding conversion, UTF-8, UTF-16, ASCII, hex encoding, binary encoding, Unicode escape, data transformation, character conversion",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/encoding-converter-guide`,
    languages: {
      en: `${siteUrl}/en/blog/encoding-converter-guide`,
    },
  },
};

export default function EncodingConverterGuidePage() {
  return (
    <>
      <EncodingConverterGuideStructuredData />
      <EncodingConverterGuideContent />
    </>
  );
}
