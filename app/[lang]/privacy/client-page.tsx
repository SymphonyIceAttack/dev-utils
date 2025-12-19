"use client";

import { motion } from "framer-motion";
import { CheckCircle, Database, Eye, Lock, Shield, Users } from "lucide-react";
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

interface PrivacyPageProps {
  lang: LanguageType;
}

export function PrivacyPage({ lang }: PrivacyPageProps) {
  return (
    <main
      className="container mx-auto max-w-4xl px-4 py-12"
      aria-labelledby="privacy-title"
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
          <Shield className="w-8 h-8" />
        </motion.div>
        <h1
          id="privacy-title"
          className="text-4xl font-bold tracking-tight mb-4"
        >
          {t("privacy.heading", lang)}
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          {t("privacy.lastUpdated", lang)}
        </p>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("privacy.intro", lang)}
        </p>
      </motion.div>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* What We Collect */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                {t("privacy.dataCollection.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("privacy.dataCollection.content", lang)}
              </p>
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  {t("privacy.dataCollection.none", lang)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* How We Use Info */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-blue-500" />
                </div>
                {t("privacy.dataUsage.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("privacy.dataUsage.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Data Sharing */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                {t("privacy.dataSharing.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("privacy.dataSharing.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Cookies */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-yellow-500" />
                </div>
                {t("privacy.cookies.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("privacy.cookies.content", lang)}
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {t("privacy.cookies.optional", lang)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Third Party */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-red-500" />
                </div>
                {t("privacy.thirdParty.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("privacy.thirdParty.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Security */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-500" />
                </div>
                {t("privacy.security.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("privacy.security.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Your Rights */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                {t("privacy.yourRights.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("privacy.yourRights.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Changes */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-blue-500" />
                </div>
                {t("privacy.changes.title", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("privacy.changes.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-green-500/10">
            <CardHeader>
              <CardTitle>{t("privacy.contact.title", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("privacy.contact.content", lang)}
              </p>
              <p className="font-mono text-sm bg-muted p-2 rounded">
                {t("privacy.contact.email", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Commitment */}
        <motion.section variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">
                {t("privacy.commitment.title", lang)}
              </h3>
              <p className="text-muted-foreground">
                {t("privacy.commitment.content", lang)}
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  );
}
