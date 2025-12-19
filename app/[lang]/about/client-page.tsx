"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Mail, Shield, Users, Zap } from "lucide-react";
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

interface AboutPageProps {
  lang: LanguageType;
}

export function AboutPage({ lang }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      titleKey: "about.values.freedom.title",
      contentKey: "about.values.freedom.content",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: Zap,
      titleKey: "about.values.quality.title",
      contentKey: "about.values.quality.content",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Shield,
      titleKey: "about.values.privacy.title",
      contentKey: "about.values.privacy.content",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Users,
      titleKey: "about.values.openness.title",
      contentKey: "about.values.openness.content",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <main
      className="container mx-auto max-w-4xl px-4 py-12"
      aria-labelledby="about-title"
    >
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
          <Users className="w-8 h-8" />
        </motion.div>
        <h1 id="about-title" className="text-4xl font-bold tracking-tight mb-4">
          {t("about.heading", lang)}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("about.subheading", lang)}
        </p>
      </motion.div>

      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-center">
                {t("about.intro", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          className="grid md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-500" />
                </div>
                {t("about.mission.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("about.mission.content", lang)}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                {t("about.vision.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("about.vision.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Values */}
        <motion.section variants={itemVariants}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {t("about.values.title", lang)}
            </h2>
            <p className="text-muted-foreground">
              {t("about.values.subtitle", lang)}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => (
              <motion.div
                key={value.titleKey}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardHeader className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${value.bgColor} mx-auto mb-2`}
                    >
                      <value.icon className={`w-6 h-6 ${value.color}`} />
                    </div>
                    <CardTitle className="text-lg">
                      {t(value.titleKey, lang)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {t(value.contentKey, lang)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Story */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {t("about.team.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-center">
                {t("about.team.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Call to Action */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-purple-500/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {t("about.cta.title", lang)}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t("about.cta.content", lang)}
              </p>
              <Link href={`/${lang}/contact`}>
                <Button size="lg" className="gap-2">
                  <Mail className="w-4 h-4" />
                  {t("about.cta.button", lang)}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  );
}
