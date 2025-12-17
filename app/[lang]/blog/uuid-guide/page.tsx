import type { Metadata } from "next";
import { UuidGuideContent } from "@/components/blog/guides/uuid-guide-content";
import { UuidGuideStructuredData } from "@/components/structured-data/blog-post";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "UUID Generation: A Developer's Complete Guide - KittyEncode",
  description:
    "Master UUID generation with this complete guide. Understand UUID versions (v1, v4, v7), best practices for database primary keys, and distributed systems.",  robots: {
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
