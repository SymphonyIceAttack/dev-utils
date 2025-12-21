import type { Metadata } from "next";
import { PasswordGuideContent } from "@/components/blog/guides/password-guide-content";
import { PasswordGuideStructuredData } from "@/components/structured-data/blog-post";
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
  title: "Password Security: Entropy, Salting, and KDFs - KittyEncode",
  description:
    "An engineering analysis of password security mechanics: calculating entropy, preventing rainbow table attacks with salts, and slowing down GPUs with Argon2 and bcrypt.",
  keywords:
    "argon2, bcrypt, password entropy, kdf, salt, rainbow table, nist sp 800-63b, credential stuffing",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/password-guide`,
    languages: {
      en: `${siteUrl}/en/blog/password-guide`,
    },
  },
};

export default function PasswordGuidePage() {
  return (
    <>
      <PasswordGuideStructuredData />
      <PasswordGuideContent />
    </>
  );
}
