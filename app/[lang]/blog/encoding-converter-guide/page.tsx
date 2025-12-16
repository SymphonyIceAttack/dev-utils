import type { Metadata } from "next";
import { EncodingConverterGuideContent } from "@/components/blog/guides/encoding-converter-guide-content";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Text Encoding Conversion: Complete Guide - KittyEncode",
  description:
    "Master text encoding conversion between UTF-8, UTF-16, ASCII, Hex, Binary, and Unicode Escape formats. Essential guide for handling international text and data encoding.",
  keywords: [
    "encoding converter",
    "text encoding",
    "UTF-8 converter",
    "hex converter",
    "binary converter",
    "encoding guide",
    "unicode converter",
  ],
  alternates: {
    canonical: `${siteUrl}/en/blog/encoding-converter-guide`,
    languages: {
      en: `${siteUrl}/en/blog/encoding-converter-guide`,
    },
  },
};

export default function EncodingConverterGuidePage() {
  return <EncodingConverterGuideContent />;
}
