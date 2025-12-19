"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Scale,
  Shield,
  XCircle,
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

interface TermsPageProps {
  lang: LanguageType;
}

export function TermsPage({ lang }: TermsPageProps) {
  const prohibitedItems = t("terms.prohibited.list", lang).split(";");

  return (
    <main
      className="container mx-auto max-w-4xl px-4 py-12"
      aria-labelledby="terms-title"
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
          <Scale className="w-8 h-8" />
        </motion.div>
        <h1 id="terms-title" className="text-4xl font-bold tracking-tight mb-4">
          {t("terms.heading", lang)}
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          {t("terms.lastUpdated", lang)}
        </p>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("terms.intro", lang)}
        </p>
      </motion.div>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Acceptance */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                </div>
                {t("terms.acceptance.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.acceptance.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Description */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-green-500" />
                </div>
                {t("terms.description.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.description.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Usage */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                </div>
                {t("terms.usage.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.usage.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Prohibited */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-red-500" />
                </div>
                {t("terms.prohibited.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("terms.prohibited.content", lang)}
              </p>
              <div className="space-y-2">
                {prohibitedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {item.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Disclaimer */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
                {t("terms.disclaimer.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.disclaimer.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Liability */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-orange-500" />
                </div>
                {t("terms.limitation.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.limitation.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Accuracy */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-blue-500" />
                </div>
                {t("terms.accuracy.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.accuracy.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Availability */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                {t("terms.availability.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.availability.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Modifications */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-500" />
                </div>
                {t("terms.modifications.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.modifications.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Termination */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-red-500" />
                </div>
                {t("terms.termination.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.termination.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Governing Law */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                  <Scale className="w-4 h-4 text-gray-500" />
                </div>
                {t("terms.governingLaw.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.governingLaw.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Severability */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-indigo-500" />
                </div>
                {t("terms.severability.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("terms.severability.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-blue-500/10">
            <CardHeader>
              <CardTitle>{t("terms.contact.title", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("terms.contact.content", lang)}
              </p>
              <p className="font-mono text-sm bg-muted p-2 rounded">
                {t("terms.contact.email", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Commitment */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">
                {t("terms.commitment.title", lang)}
              </h3>
              <p className="text-muted-foreground">
                {t("terms.commitment.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  );
}
