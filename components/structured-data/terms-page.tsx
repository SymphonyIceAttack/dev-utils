"use client";

import type { Organization, WebPage, WithContext } from "schema-dts";

export function TermsPageStructuredData() {
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

  const termsPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service - KittyEncode",
    description:
      "Terms of service for our free online developer tools. Simple, fair terms for using our developer utilities.",
    url: `${baseUrl}/terms`,
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
          __html: JSON.stringify(termsPageSchema),
        }}
      />
    </>
  );
}
