import { Building, Clock, HelpCircle, Mail, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageStructuredData } from "@/components/structured-data/contact-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteUrl } from "@/lib/config";
import {
  generateHreflangLinks,
  type LanguageType,
  supportedLocales,
  t,
} from "@/lib/translations";

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
      url: `${siteUrl}/en/contact`,
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
      url: `${siteUrl}/zh/contact`,
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
      url: `${siteUrl}/ja/contact`,
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
      url: `${siteUrl}/fr/contact`,
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
      url: `${siteUrl}/es/contact`,
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
      url: `${siteUrl}/ru/contact`,
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
      url: `${siteUrl}/de/contact`,
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
      canonical: `${siteUrl}/${lang}/contact`,
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
  const langTyped = lang as LanguageType;

  const faqItems = [
    {
      questionKey: "contact.faq.tools.title",
      answerKey: "contact.faq.tools.content",
      icon: "💰",
    },
    {
      questionKey: "contact.faq.privacy.title",
      answerKey: "contact.faq.privacy.content",
      icon: "🔒",
    },
    {
      questionKey: "contact.faq.offline.title",
      answerKey: "contact.faq.offline.content",
      icon: "🌐",
    },
    {
      questionKey: "contact.faq.api.title",
      answerKey: "contact.faq.api.content",
      icon: "🔧",
    },
  ];

  return (
    <>
      <ContactPageStructuredData lang={lang as LanguageType} />
      <main
        className="container mx-auto max-w-4xl px-4 py-12"
        aria-labelledby="contact-title"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1
            id="contact-title"
            className="text-4xl font-bold tracking-tight mb-4"
          >
            {t("contact.heading", langTyped)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subheading", langTyped)}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="p-8 text-center">
                <p className="text-lg leading-relaxed">
                  {t("contact.intro", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact Methods */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {t("contact.methods.title", langTyped)}
              </h2>
              <p className="text-muted-foreground">
                {t("contact.methods.subtitle", langTyped)}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-500" />
                    </div>
                    {t("contact.email.title", langTyped)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t("contact.email.description", langTyped)}
                  </p>
                  <div className="bg-muted p-3 rounded-lg mb-4">
                    <p className="font-mono text-sm">
                      {t("contact.email.address", langTyped)}
                    </p>
                  </div>
                  <a
                    href={`mailto:${t("contact.email.address", langTyped)}?subject=${encodeURIComponent(`${t("contact.email.subject.prefix", langTyped)}${t("contact.email.subject.placeholder", langTyped)}`)}&body=${encodeURIComponent(t("contact.email.message.placeholder", langTyped))}`}
                    className="w-full"
                  >
                    <Button className="w-full gap-2">
                      <Mail className="w-4 h-4" />
                      {t("contact.email.send", langTyped)}
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-500" />
                    </div>
                    {t("contact.response.title", langTyped)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t("contact.response.content", langTyped)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Business Inquiries */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Building className="w-4 h-4 text-purple-500" />
                  </div>
                  {t("contact.business.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("contact.business.content", langTyped)}
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {t("contact.business.email", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* FAQ */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-yellow-500" />
                  </div>
                  {t("contact.faq.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {t("contact.faq.content", langTyped)}
                </p>
                <div className="space-y-4">
                  {faqItems.map((item) => (
                    <div
                      key={item.questionKey}
                      className="border-l-4 border-accent pl-4"
                    >
                      <h4 className="font-semibold mb-2">
                        {item.icon} {t(item.questionKey, langTyped)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t(item.answerKey, langTyped)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Office Hours */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  {t("contact.office.title", langTyped)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("contact.office.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Feedback Welcome */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-green-500/10">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">
                  {t("contact.feedback.title", langTyped)}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("contact.feedback.content", langTyped)}
                </p>
                <Link href={`/${lang}/about`}>
                  <Button variant="outline" className="gap-2">
                    <Users className="w-4 h-4" />
                    {t("about.cta.button", langTyped)}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* Thank You */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">
                  {t("contact.thanks.title", langTyped)}
                </h3>
                <p className="text-muted-foreground">
                  {t("contact.thanks.content", langTyped)}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
