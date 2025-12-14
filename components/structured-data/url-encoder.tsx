"use client";

import type { FAQPage, WebApplication, WebSite, WithContext } from "schema-dts";

export function StructuredDataScripts() {
  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KittyEncode",
    description:
      "Free online developer tools for JSON, Base64, Hash, UUID and more",
    url: "https://devtools.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://devtools.app/tools?q={search_term_string}",
    },
  };

  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "URL Encoder / Decoder",
    description:
      "Free online URL encoder and decoder tool. Encode or decode URLs and query parameters instantly.",
    url: "https://devtools.app",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "URL Encoding",
      "URL Decoding",
      "Percent Encoding",
      "Query Parameter Encoding",
      "Works Offline",
      "Privacy First",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is URL encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL encoding converts characters into a format that can be transmitted over the Internet. Special characters are replaced with a '%' followed by two hexadecimal digits representing the character's ASCII code.",
        },
      },
      {
        "@type": "Question",
        name: "When should I use URL encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use URL encoding when your URL contains special characters like spaces, ampersands (&), question marks (?), or non-ASCII characters like Chinese or Japanese text.",
        },
      },
      {
        "@type": "Question",
        name: "Is this URL encoder free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this URL encoder/decoder is completely free to use. No signup required. All processing happens locally in your browser for maximum privacy.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
