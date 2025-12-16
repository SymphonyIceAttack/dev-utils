import type { Metadata } from "next";
import { PasswordGuideContent } from "@/components/blog/guides/password-guide-content";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Secure Password Generation: Best Practices Guide - KittyEncode",
  description:
    "Create strong, secure passwords with our comprehensive guide. Learn about password entropy, generation algorithms, and security recommendations.",
  keywords: [
    "password generator",
    "secure passwords",
    "password strength",
    "password entropy",
    "security best practices",
  ],
  alternates: {
    canonical: `${siteUrl}/en/blog/password-guide`,
    languages: {
      en: `${siteUrl}/en/blog/password-guide`,
    },
  },
};

export default function PasswordGuidePage() {
  return <PasswordGuideContent />;
}
