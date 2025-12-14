import type { Metadata } from "next";

export function UuidGeneratorStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UUID Generator",
    description:
      "Generate UUID/GUID online instantly. Create version 1, 4, and 5 UUIDs.",
    url: "https://devtools.app/tools/uuid-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Generate UUID v1 (time-based)",
      "Generate UUID v4 (random)",
      "Generate UUID v5 (name-based)",
      "Copy to clipboard",
      "Batch generation",
      "Offline functionality",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
