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
  title: "Character Encoding: The UTF-8 Engineering Guide - KittyEncode",
  description:
    "A deep dive into Unicode, UTF-8 bit layouts, Byte Order Marks (BOM), and debugging encoding corruption (mojibake) in distributed systems.",
  keywords:
    "utf-8, unicode, character encoding, mojibake, byte order mark, engineering guide, text serialization, utf-16",
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
