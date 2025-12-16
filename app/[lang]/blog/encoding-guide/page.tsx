import type { Metadata } from "next";
import { EncodingGuideContent } from "@/components/blog/guides/encoding-guide-content";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Character Encoding Guide: UTF-8, GBK & Beyond - KittyEncode",
  description:
    "Understand character encoding systems, fix garbled text issues, and convert between different encodings like UTF-8, GBK, and Unicode.",
  keywords: [
    "character encoding",
    "UTF-8",
    "GBK",
    "Unicode",
    "text encoding",
    "garbled text",
  ],
  alternates: {
    canonical: `${siteUrl}/en/blog/encoding-guide`,
    languages: {
      en: `${siteUrl}/en/blog/encoding-guide`,
    },
  },
};

export default function EncodingGuidePage() {
  return <EncodingGuideContent />;
}
