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
  title: "Master Base64 Encoding: From Basics to Advanced - KittyEncode",
  description:
    "Explore how Base64 encoding works and its practical applications in image embedding, data transmission, and API authentication.",
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
