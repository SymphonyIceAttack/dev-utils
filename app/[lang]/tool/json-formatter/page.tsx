import type { Metadata } from "next";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator Online - Free JSON Beautifier Tool",
  description:
    "Free online JSON formatter, validator and beautifier. Format, validate, minify and beautify JSON data instantly. No signup required, works offline in your browser.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON beautifier",
    "JSON parser",
    "format JSON online",
    "validate JSON",
    "pretty print JSON",
    "JSON minifier",
    "JSON tool",
  ],
  openGraph: {
    title: "JSON Formatter & Validator - Free Online Tool",
    description:
      "Format, validate and beautify JSON data instantly. Free, fast, no signup required.",
    url: "https://devtools.app/tools/json-formatter",
    type: "website",
  },
  alternates: {
    canonical: "https://devtools.app/tools/json-formatter",
  },
};

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON Formatter & Validator",
            description:
              "Free online JSON formatter, validator and beautifier tool",
            url: "https://devtools.app/tools/json-formatter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Format JSON",
              "Validate JSON",
              "Minify JSON",
              "Beautify JSON",
              "Syntax highlighting",
              "Error detection",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a JSON formatter?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A JSON formatter is a tool that takes raw JSON data and formats it with proper indentation and syntax highlighting, making it easier to read and debug.",
                },
              },
              {
                "@type": "Question",
                name: "Is this JSON formatter free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, this JSON formatter is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy.",
                },
              },
              {
                "@type": "Question",
                name: "Does this tool validate JSON?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our JSON formatter automatically validates your JSON and highlights any syntax errors with detailed error messages to help you fix issues quickly.",
                },
              },
            ],
          }),
        }}
      />
      <JsonFormatterTool />
    </>
  );
}
