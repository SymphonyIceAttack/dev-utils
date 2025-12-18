"use client";

import { motion } from "framer-motion";
import { Building, Clock, HelpCircle, Mail, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LanguageType, t } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 300,
      damping: 24,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      stiffness: 300,
      damping: 24,
    },
  },
};

interface ContactPageProps {
  lang: LanguageType;
}

export function ContactPage({ lang }: ContactPageProps) {
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
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Mail className="w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("contact.heading", lang)}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("contact.subheading", lang)}
        </p>
      </motion.div>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="p-8 text-center">
              <p className="text-lg leading-relaxed">
                {t("contact.intro", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact Methods */}
        <motion.section variants={itemVariants}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {t("contact.methods.title", lang)}
            </h2>
            <p className="text-muted-foreground">
              {t("contact.methods.subtitle", lang)}
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
                  {t("contact.email.title", lang)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("contact.email.description", lang)}
                </p>
                <div className="bg-muted p-3 rounded-lg mb-4">
                  <p className="font-mono text-sm">
                    {t("contact.email.address", lang)}
                  </p>
                </div>
                <a
                  href={`mailto:${t("contact.email.address", lang)}?subject=${encodeURIComponent(`${t("contact.email.subject.prefix", lang)}${t("contact.email.subject.placeholder", lang)}`)}&body=${encodeURIComponent(t("contact.email.message.placeholder", lang))}`}
                  className="w-full"
                >
                  <Button className="w-full gap-2">
                    <Mail className="w-4 h-4" />
                    {t("contact.email.send", lang)}
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
                  {t("contact.response.title", lang)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("contact.response.content", lang)}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Business Inquiries */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Building className="w-4 h-4 text-purple-500" />
                </div>
                {t("contact.business.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("contact.business.content", lang)}
              </p>
              <p className="font-mono text-sm bg-muted p-2 rounded">
                {t("contact.business.email", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* FAQ */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-yellow-500" />
                </div>
                {t("contact.faq.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                {t("contact.faq.content", lang)}
              </p>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div
                    key={item.questionKey}
                    className="border-l-4 border-accent pl-4"
                  >
                    <h4 className="font-semibold mb-2">
                      {item.icon} {t(item.questionKey, lang)}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t(item.answerKey, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Office Hours */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                {t("contact.office.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("contact.office.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Feedback Welcome */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-green-500/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">
                {t("contact.feedback.title", lang)}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("contact.feedback.content", lang)}
              </p>
              <Link href={`/${lang}/about`}>
                <Button variant="outline" className="gap-2">
                  <Users className="w-4 h-4" />
                  {t("about.cta.button", lang)}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.section>

        {/* Thank You */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">
                {t("contact.thanks.title", lang)}
              </h3>
              <p className="text-muted-foreground">
                {t("contact.thanks.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
}
