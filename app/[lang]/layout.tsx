import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Nunito, VT323 } from "next/font/google";
import "../globals.css";
import { redirect } from "next/navigation";
import { CatSystem } from "@/components/cat/cat-system";
import { BackgroundDecorations } from "@/components/layout/background-decorations";
import { Footer } from "@/components/layout/footer-client";
import { Navbar } from "@/components/layout/navbar-client";
import { ThemeProvider } from "@/components/theme-provider";
import { CatProvider } from "@/context/cat-context";
import { LanguageProvider } from "@/context/language-context";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales } from "@/lib/translations";

const nunitoFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
});

const pixelFont = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
  preload: false, // 减少预加载，像素字体使用频率较低
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top",
  ),
  icons: {
    icon: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
      { url: "/apple-icon.png" },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "preload-image": "/base-logo.png",
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Validate that the incoming `lang` parameter is valid
  if (!supportedLocales.includes(lang as LanguageType)) {
    redirect("/");
  }

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${nunitoFont.variable} ${jetbrainsFont.variable} ${pixelFont.variable}`}
    >
      <head>
        {/* Performance optimizations */}
        <link rel="preload" href="/base-logo.png" as="image" />

        {/* Theme color for better UX */}
        <meta
          name="theme-color"
          content="#f5f0e6"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1a2e"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CatProvider>
            <LanguageProvider lang={lang as LanguageType}>
              <div className="flex min-h-screen flex-col relative">
                <BackgroundDecorations />
                <Navbar lang={lang as LanguageType} />
                <main className="flex-1">{children}</main>
                <Footer lang={lang as LanguageType} />
                <CatSystem />
              </div>
            </LanguageProvider>
          </CatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
