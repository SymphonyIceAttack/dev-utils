export function RegexTesterStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Regex Tester",
    description:
      "Test regular expressions online with real-time results. Supports multiple regex flavors and syntax highlighting.",
    url: "https://devtools.app/tools/regex-tester",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Test regular expressions in real-time",
      "JavaScript regex syntax support",
      "Match, search, and replace functionality",
      "Capture group support",
      "Regex flags configuration",
      "Syntax highlighting",
      "Copy results to clipboard",
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
