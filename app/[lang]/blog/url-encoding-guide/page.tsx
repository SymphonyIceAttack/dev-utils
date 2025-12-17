import type { Metadata } from "next";
import { UrlEncodingGuideContent } from "@/components/blog/guides/url-encoding-guide-content";
import { UrlEncodingGuideStructuredData } from "@/components/structured-data/blog-post";
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
  title: "Complete Guide to URL Encoding: Best Practices - KittyEncode",
  description:
    "Master URL encoding principles, use cases, and best practices. Learn why URL encoding is essential and how to use it correctly across different programming languages.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/url-encoding-guide`,
    languages: {
      en: `${siteUrl}/en/blog/url-encoding-guide`,
    },
  },
};

export default function UrlEncodingGuidePage() {
  return (
    <>
      <UrlEncodingGuideStructuredData />
      <UrlEncodingGuideContent />
    </>
  );
}
