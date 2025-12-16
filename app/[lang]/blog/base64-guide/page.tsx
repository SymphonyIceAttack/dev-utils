import type { Metadata } from "next";
import { Base64GuideContent } from "@/components/blog/guides/base64-guide-content";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Master Base64 Encoding: From Basics to Advanced - KittyEncode",
  description:
    "Explore how Base64 encoding works and its practical applications in image embedding, data transmission, and API authentication.",
  keywords: [
    "Base64 encoding",
    "Base64 decode",
    "Base64 online",
    "Base64 guide",
    "data encoding",
  ],
  alternates: {
    canonical: `${siteUrl}/en/blog/base64-guide`,
    languages: {
      en: `${siteUrl}/en/blog/base64-guide`,
    },
  },
};

export default function Base64GuidePage() {
  return <Base64GuideContent />;
}
