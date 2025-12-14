export function ColorConverterStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Converter",
    description:
      "Convert between color formats online. Transform HEX, RGB, HSL, and more.",
    url: "https://devtools.app/tools/color-converter",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "HEX to RGB conversion",
      "RGB to HEX conversion",
      "HSL color support",
      "Visual color picker",
      "Real-time preview",
      "Color palette generator",
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
