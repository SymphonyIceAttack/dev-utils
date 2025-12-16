import type { Metadata } from "next";
import { Md5GuideContent } from "@/components/blog/guides/md5-guide-content";
import { Md5GuideStructuredData } from "@/components/structured-data/blog-post";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "MD5 Hashing Tutorial: Complete Implementation Guide - KittyEncode",
  description:
    "A comprehensive guide to MD5 hashing algorithm, including how it works, security considerations, and practical use cases like file verification and checksums.",
  keywords: [
    "MD5 hashing",
    "MD5 algorithm",
    "MD5 generator",
    "hash function",
    "data integrity",
  ],
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/md5-guide`,
    languages: {
      en: `${siteUrl}/en/blog/md5-guide`,
    },
  },
};

export default function Md5GuidePage() {
  return (
    <>
      <Md5GuideStructuredData />
      <Md5GuideContent />
    </>
  );
}
