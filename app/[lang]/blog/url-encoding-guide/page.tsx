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
  title: "URL Encoding: The RFC 3986 Engineering Reference - KittyEncode",
  description:
    "A comprehensive analysis of Percent-Encoding (RFC 3986), reserved character sets, UTF-8 byte sequences, and common security pitfalls in URL construction.",
  keywords:
    "rfc 3986, url encoding, percent encoding, http security, query parameters, web engineering, uri syntax",
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
