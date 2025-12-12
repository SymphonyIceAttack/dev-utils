import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Nunito, VT323 } from "next/font/google";
import type React from "react";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const nunitoFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const jetbrainsFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

const pixelFont = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devtools.app"),
  title: {
    default: "URL Encoder / Decoder Online - Free URL Encoding Tool | DevTools",
    template: "%s | DevTools - Free Developer Utilities",
  },
  description:
    "Free online URL encoder and decoder tool. Encode or decode URLs, query parameters, and special characters instantly. No signup required, works offline in your browser. 100% private and secure.",
  keywords: [
    "URL encoder",
    "URL decoder",
    "percent encoding",
    "URL encoding online",
    "encode URL",
    "decode URL",
    "query parameter encoder",
    "encodeURIComponent",
    "URL escape",
    "developer tools",
    "free online tools",
  ],
  authors: [{ name: "DevTools Team" }],
  creator: "DevTools",
  publisher: "DevTools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devtools.app",
    siteName: "DevTools",
    title: "URL Encoder / Decoder - Free Online Tool",
    description:
      "Encode or decode URLs and query parameters instantly. Free, fast, no signup required. 100% private - all processing in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "URL Encoder / Decoder - Free Online Developer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder / Decoder - Free Online Tool",
    description:
      "Encode or decode URLs instantly. Free, fast, works offline in your browser.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://devtools.app",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  navbar,
  footer,
}: Readonly<{
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nunitoFont.variable} ${jetbrainsFont.variable} ${pixelFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevTools",
              description:
                "Free online developer tools for JSON, Base64, Hash, UUID and more",
              url: "https://devtools.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://devtools.app/tools?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col relative">
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-ghibli-sky/5 via-transparent to-ghibli-forest/5" />
              <svg
                className="absolute top-20 left-[10%] w-32 h-16 text-ghibli-sky/20"
                viewBox="0 0 120 50"
              >
                <ellipse cx="35" cy="30" rx="25" ry="15" fill="currentColor" />
                <ellipse cx="60" cy="25" rx="30" ry="18" fill="currentColor" />
                <ellipse cx="85" cy="30" rx="25" ry="15" fill="currentColor" />
              </svg>
              <svg
                className="absolute top-40 right-[15%] w-24 h-12 text-ghibli-sky/15"
                viewBox="0 0 120 50"
              >
                <ellipse cx="35" cy="30" rx="25" ry="15" fill="currentColor" />
                <ellipse cx="60" cy="25" rx="30" ry="18" fill="currentColor" />
                <ellipse cx="85" cy="30" rx="25" ry="15" fill="currentColor" />
              </svg>
              <svg
                className="absolute bottom-0 left-0 right-0 h-32 text-ghibli-forest/10"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,100 Q200,40 400,70 T800,50 T1200,80 L1200,100 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {navbar}
            <main className="flex-1">{children}</main>
            {footer}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
