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
  title: "UUID Generation: A Developer's Complete Guide - KittyEncode",
  description:
    "Master UUID generation with this complete guide. Understand UUID versions (v1, v4, v7), best practices for database primary keys, and distributed systems.",
  keywords:
    "uuid, universal unique identifier, rfc4122, database primary key, distributed systems, uuid v1, uuid v4, uuid v7, identifier generation",
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
