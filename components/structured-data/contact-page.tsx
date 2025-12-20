"use client";

import type { ContactPage, Organization, WithContext } from "schema-dts";

export function ContactPageStructuredData() {
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${baseUrl}/contact`,
    },
  };

  const contactPageSchema: WithContext<ContactPage> = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact KittyEncode",
    description:
      "Get in touch with KittyEncode. We love hearing from developers and are here to help with any questions or suggestions.",
    url: `${baseUrl}/contact`,
    mainEntity: organizationSchema,
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
          __html: JSON.stringify(contactPageSchema),
        }}
      />
    </>
  );
}
