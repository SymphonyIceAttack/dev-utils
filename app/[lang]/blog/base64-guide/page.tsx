import type { Metadata } from "next";
import { Base64GuideContent } from "@/components/blog/guides/base64-guide-content";
import { Base64GuideStructuredData } from "@/components/structured-data/blog-post";
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
  title: "Base64 Encoding: The Definitive Engineering Guide - KittyEncode",
  description:
    "A deep technical analysis of Base64 encoding algorithms, memory implications, RFC 4648 standards, and implementation best practices for engineers.",
  keywords:
    "base64, rfc 4648, base64url, encoding algorithm, performance, engineering guide, nodejs buffer",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/base64-guide`,
    languages: {
      en: `${siteUrl}/en/blog/base64-guide`,
    },
  },
};

export default function Base64GuidePage() {
  return (
    <>
      <Base64GuideStructuredData />
      <Base64GuideContent />
    </>
  );
}
