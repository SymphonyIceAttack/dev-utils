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
  title: "Secure Password Generation: Best Practices Guide - KittyEncode",
  description:
    "Create strong, secure passwords with our comprehensive guide. Learn about password entropy, generation algorithms, and security recommendations.",
  keywords:
    "password security, secure passwords, password generation, password entropy, password strength, security best practices, cryptography, authentication",
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
