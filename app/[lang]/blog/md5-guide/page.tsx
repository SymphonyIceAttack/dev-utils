import type { Metadata } from "next";
import { Md5GuideContent } from "@/components/blog/guides/md5-guide-content";
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
  alternates: {
    canonical: `${siteUrl}/en/blog/md5-guide`,
    languages: {
      en: `${siteUrl}/en/blog/md5-guide`,
    },
  },
};

export default function Md5GuidePage() {
  return <Md5GuideContent />;
}
