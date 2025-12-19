"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Scale,
  Shield,
} from "lucide-react";
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

interface DisclaimerPageProps {
  lang: LanguageType;
}

export function DisclaimerPage({ lang }: DisclaimerPageProps) {
  const responsibilities = t(
    "disclaimer.userResponsibility.content",
    lang,
  ).split(";");

  return (
    <main
      className="container mx-auto max-w-4xl px-4 py-12"
      aria-labelledby="disclaimer-title"
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
          <AlertTriangle className="w-8 h-8" />
        </motion.div>
        <h1
          id="disclaimer-title"
          className="text-4xl font-bold tracking-tight mb-4"
        >
          {t("disclaimer.heading", lang)}
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          {t("disclaimer.lastUpdated", lang)}
        </p>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("disclaimer.intro", lang)}
        </p>
      </motion.div>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* General Disclaimer */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
                {t("disclaimer.general.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.general.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Accuracy */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                {t("disclaimer.accuracy.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.accuracy.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Tool Limitations */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-500" />
                </div>
                {t("disclaimer.toolLimitations.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.toolLimitations.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* No Warranty */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                {t("disclaimer.noWarranty.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.noWarranty.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* External Links */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-purple-500" />
                </div>
                {t("disclaimer.externalLinks.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.externalLinks.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* User Responsibility */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-500" />
                </div>
                {t("disclaimer.userResponsibility.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      {responsibility.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Limitation of Liability */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                {t("disclaimer.liability.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.liability.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Professional Advice */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-green-500" />
                </div>
                {t("disclaimer.professionalAdvice.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.professionalAdvice.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Updates and Changes */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Scale className="w-4 h-4 text-indigo-500" />
                </div>
                {t("disclaimer.updates.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.updates.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Severability */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                  <Scale className="w-4 h-4 text-gray-500" />
                </div>
                {t("disclaimer.severability.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.severability.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Applicable Law */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Scale className="w-4 h-4 text-purple-500" />
                </div>
                {t("disclaimer.applicableLaw.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("disclaimer.applicableLaw.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-blue-500/10">
            <CardHeader>
              <CardTitle>{t("disclaimer.contact.title", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("disclaimer.contact.content", lang)}
              </p>
              <p className="font-mono text-sm bg-muted p-2 rounded">
                {t("disclaimer.contact.email", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Commitment */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">
                {t("disclaimer.commitment.title", lang)}
              </h3>
              <p className="text-muted-foreground">
                {t("disclaimer.commitment.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  );
}
