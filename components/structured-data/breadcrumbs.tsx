import type { BreadcrumbList, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function BlogBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
  ]);
}

export function UrlEncodingGuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "URL Encoding Guide",
      url: `${siteUrl}/en/blog/url-encoding-guide`,
    },
  ]);
}

export function Base64GuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "Base64 Encoding Guide",
      url: `${siteUrl}/en/blog/base64-guide`,
    },
  ]);
}

export function Md5GuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "MD5 Hashing Guide",
      url: `${siteUrl}/en/blog/md5-guide`,
    },
  ]);
}

export function UuidGuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "UUID Generation Guide",
      url: `${siteUrl}/en/blog/uuid-guide`,
    },
  ]);
}

export function PasswordGuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "Password Security Guide",
      url: `${siteUrl}/en/blog/password-guide`,
    },
  ]);
}

export function EncodingGuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "Character Encoding Guide",
      url: `${siteUrl}/en/blog/encoding-guide`,
    },
  ]);
}

export function EncodingConverterGuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "Encoding Converter Guide",
      url: `${siteUrl}/en/blog/encoding-converter-guide`,
    },
  ]);
}

export function BinaryCodeGuideBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${siteUrl}/en`,
    },
    {
      name: "Developer Guides",
      url: `${siteUrl}/en/blog`,
    },
    {
      name: "Binary Code Guide",
      url: `${siteUrl}/en/blog/binary-code-guide`,
    },
  ]);
}
