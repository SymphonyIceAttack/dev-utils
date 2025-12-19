import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
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
  title: "Developer Guides & Tutorials - KittyEncode Blog",
  description:
    "Learn encoding, hashing, and security best practices with our comprehensive developer guides. Tutorials on URL encoding, Base64, MD5, UUID, and more.",
  keywords:
    "developer guides, tutorials, encoding, base64, md5, uuid, password generation, security",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/en/blog`,
    languages: {
      en: `${siteUrl}/en/blog`,
    },
  },
};

export default function BlogPage() {
  return <BlogList />;
}
