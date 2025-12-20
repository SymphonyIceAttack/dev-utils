"use client";

import type { Organization, WebPage, WithContext } from "schema-dts";

export function PrivacyPageStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KittyEncode",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Free online developer tools for JSON, Base64, Hash, UUID and more. Privacy-first, offline-capable tools for developers worldwide.",
  };

  const privacyPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - KittyEncode",
    description:
      "Our privacy policy explains how we protect your privacy. We don't collect, store, or track any personal information.",
    url: `${baseUrl}/privacy`,
    about: organizationSchema,
    datePublished: "2024-01-01",
    dateModified: "2024-12-01",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyPageSchema),
        }}
      />
    </>
  );
}
