import type { Metadata } from "next";
import { UuidGuideContent } from "@/components/blog/guides/uuid-guide-content";
import { UuidGuideStructuredData } from "@/components/structured-data/blog-post";
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
  title: "UUIDs in Distributed Systems: The Engineering Guide - KittyEncode",
  description:
    "A deep technical comparison of UUID v4, v7 (RFC 9562), and ULIDs. Analysis of database indexing performance, collision probabilities, and entropy requirements.",
  keywords:
    "uuid v7, rfc 9562, ulid, distributed system identifiers, database indexing, b-tree fragmentation, uuid v4 collision",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/uuid-guide`,
    languages: {
      en: `${siteUrl}/en/blog/uuid-guide`,
    },
  },
};

export default function UuidGuidePage() {
  return (
    <>
      <UuidGuideStructuredData />
      <UuidGuideContent />
    </>
  );
}
