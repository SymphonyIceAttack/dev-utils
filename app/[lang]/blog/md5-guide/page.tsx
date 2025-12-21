import type { Metadata } from "next";
import { Md5GuideContent } from "@/components/blog/guides/md5-guide-content";
import { Md5GuideStructuredData } from "@/components/structured-data/blog-post";
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
  title: "MD5: A Post-Mortem and Engineering Analysis - KittyEncode",
  description:
    "An in-depth look at the MD5 algorithm's internal structure (Merkle-Damgård), the mathematics of collision attacks, and why it persists in non-cryptographic use cases.",
  keywords:
    "md5, merkle-damgard, collision attack, flame malware, cryptography engineering, checksum, data integrity",
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
