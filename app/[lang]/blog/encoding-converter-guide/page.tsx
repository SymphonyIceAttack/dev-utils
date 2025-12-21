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
  title:
    "A Low-Level Guide to Text Encodings: Hex, Binary, and Base Encodings - KittyEncode",
  description:
    "Understanding the byte-level mechanics of text representation: how ASCII, Hex, Binary, and Base64 function as different views of the same underlying data.",
  keywords:
    "hex encoding, binary representation, base64, transfer encoding, serialization, byte-level, engineering guide",
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
