import type { Metadata } from "next";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
} from "@/lib/translations";
import { ContactPage } from "./client-page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";

// Generate static params for all supported languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Contact Us - Free Online Developer Tools",
    description:
      "Get in touch with us. We love hearing from developers and are here to help with any questions or suggestions.",
    openGraph: {
      title: "Contact Us - Free Online Developer Tools",
      description:
        "Get in touch with us. We love hearing from developers and are here to help with any questions or suggestions.",
      url: `${baseUrl}/en/contact`,
      type: "website",
    },
  },
  zh: {
    title: "联系我们 - 免费在线开发者工具",
    description:
      "与我们取得联系。我们喜欢听到开发者的声音，随时准备帮助解决任何问题或建议。",
    openGraph: {
      title: "联系我们 - 免费在线开发者工具",
      description:
        "与我们取得联系。我们喜欢听到开发者的声音，随时准备帮助解决任何问题或建议。",
      url: `${baseUrl}/zh/contact`,
      type: "website",
    },
  },
  ja: {
    title: "お問い合わせ - 無料オンライン開発者ツール",
    description:
      "私たちのお問い合わせてください。開発者からの声を聞くことが大好きで、あらゆる質問や提案をお手伝いする準備ができています。",
    openGraph: {
      title: "お問い合わせ - 無料オンライン開発者ツール",
      description:
        "私たちのお問い合わせてください。開発者からの声を聞くことが大好きで、あらゆる質問や提案をお手伝いする準備ができています。",
      url: `${baseUrl}/ja/contact`,
      type: "website",
    },
  },
  fr: {
    title: "Contactez-nous - Outils de Développeur en Ligne Gratuits",
    description:
      "Prenez contact avec nous. Nous aimons entendre les développeurs et nous sommes là pour aider avec toute question ou suggestion.",
    openGraph: {
      title: "Contactez-nous - Outils de Développeur en Ligne Gratuits",
      description:
        "Prenez contact avec nous. Nous aimons entendre les développeurs et nous sommes là pour aider avec toute question ou suggestion.",
      url: `${baseUrl}/fr/contact`,
      type: "website",
    },
  },
  es: {
    title: "Contáctanos - Herramientas de Desarrollador Gratuitas en Línea",
    description:
      "Ponte en contacto con nosotros. Nos encanta escuchar de desarrolladores y estamos aquí para ayudar con cualquier pregunta o sugerencia.",
    openGraph: {
      title: "Contáctanos - Herramientas de Desarrollador Gratuitas en Línea",
      description:
        "Ponte en contacto con nosotros. Nos encanta escuchar de desarrolladores y estamos aquí para ayudar con cualquier pregunta o sugerencia.",
      url: `${baseUrl}/es/contact`,
      type: "website",
    },
  },
  ru: {
    title: "Свяжитесь с Нами - Бесплатные Онлайн Инструменты для Разработчиков",
    description:
      "Свяжитесь с нами. Мы любим слышать от разработчиков и готовы помочь с любыми вопросами или предложениями.",
    openGraph: {
      title:
        "Свяжитесь с Нами - Бесплатные Онлайн Инструменты для Разработчиков",
      description:
        "Свяжитесь с нами. Мы любим слышать от разработчиков и готовы помочь с любыми вопросами или предложениями.",
      url: `${baseUrl}/ru/contact`,
      type: "website",
    },
  },
  de: {
    title: "Kontaktieren Sie Uns - Kostenlose Online Entwicklertools",
    description:
      "Nehmen Sie Kontakt mit uns auf. Wir freuen uns, von Entwicklern zu hören und sind hier, um bei Fragen oder Vorschlägen zu helfen.",
    openGraph: {
      title: "Kontaktieren Sie Uns - Kostenlose Online Entwicklertools",
      description:
        "Nehmen Sie Kontakt mit uns auf. Wir freuen uns, von Entwicklern zu hören und sind hier, um bei Fragen oder Vorschlägen zu helfen.",
      url: `${baseUrl}/de/contact`,
      type: "website",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;

  const hreflangLinks = generateHreflangLinks("/contact");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: langData.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/contact`,
      languages: hreflangLinks,
    },
  };
}

export default async function ContactPageWrapper({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ContactPage lang={lang as LanguageType} />;
}
