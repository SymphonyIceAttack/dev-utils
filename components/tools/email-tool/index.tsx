"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle,
  Copy,
  Mail,
  RefreshCw,
  RotateCcw,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";
import { EmailToolExamples } from "./email-tool-examples";
import { EmailToolFaq } from "./email-tool-faq-ssr";
import { EmailToolHero } from "./email-tool-hero-ssr";
import { EmailToolRelatedTools } from "./email-tool-related-tools-ssr";
import { EmailToolSeoContent } from "./email-tool-seo-content-ssr";

interface EmailToolProps {
  lang?: LanguageType;
}

type ToolMode = "extractor" | "verifier";

interface EmailOptions {
  deduplicate: boolean;
  includeInvalid: boolean;
  caseSensitive: boolean;
}

interface ExtractionStats {
  totalExtractions: number;
  totalEmailsFound: number;
  totalVerifications: number;
  validCount: number;
  invalidCount: number;
  lastUsed: Date | null;
}

interface ExtractedEmail {
  email: string;
  domain: string;
  isValid: boolean;
}

interface VerificationResult {
  email: string;
  isValid: boolean;
  formatValid: boolean;
  details: string;
}

function extractEmails(text: string): ExtractedEmail[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex) || [];

  const seen = new Set<string>();
  const results: ExtractedEmail[] = [];

  for (const email of matches) {
    if (!seen.has(email.toLowerCase())) {
      seen.add(email.toLowerCase());
      const domain = email.split("@")[1] || "";
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      results.push({
        email,
        domain,
        isValid: emailRegex.test(email),
      });
    }
  }

  return results;
}

function verifyEmail(email: string): {
  isValid: boolean;
  formatValid: boolean;
  details: string;
} {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const formatValid = emailRegex.test(email);

  if (!formatValid) {
    return {
      isValid: false,
      formatValid: false,
      details: "Invalid email format",
    };
  }

  return {
    isValid: true,
    formatValid: true,
    details: "Valid email format",
  };
}

export function EmailTool({ lang = "en" as LanguageType }: EmailToolProps) {
  const { t } = useTranslation(lang);
  const { spawnItem } = useCat();
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const COOLDOWN_DURATION = 3000;

  const shouldSpawnItem = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawnTime >= COOLDOWN_DURATION) {
      setLastSpawnTime(now);
      return true;
    }
    return false;
  }, [lastSpawnTime]);

  const [activeTab, setActiveTab] = useState<ToolMode>("extractor");
  const [extractInput, setExtractInput] = useState("");
  const [extractedEmails, setExtractedEmails] = useState<ExtractedEmail[]>([]);
  const [verifyEmailInput, setVerifyEmailInput] = useState("");
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [emailOptions, setEmailOptions] = useState<EmailOptions>({
    deduplicate: true,
    includeInvalid: true,
    caseSensitive: false,
  });
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [extractionStats, setExtractionStats] = useState<ExtractionStats>({
    totalExtractions: 0,
    totalEmailsFound: 0,
    totalVerifications: 0,
    validCount: 0,
    invalidCount: 0,
    lastUsed: null,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const swapInputs = useCallback(() => {
    if (verificationResult) {
      setVerifyEmailInput(verificationResult.email);
      setExtractedEmails([]);
      setNeedsUpdate(true);
    }
  }, [verificationResult]);

  const extractAndValidate = useCallback(() => {
    if (!extractInput.trim()) {
      setExtractedEmails([]);
      setError(null);
      setNeedsUpdate(false);
      return;
    }

    try {
      let emails = extractEmails(extractInput);

      if (!emailOptions.includeInvalid) {
        emails = emails.filter((e) => e.isValid);
      }

      if (emailOptions.deduplicate) {
        const seen = new Set<string>();
        emails = emails.filter((e) => {
          const key = emailOptions.caseSensitive
            ? e.email
            : e.email.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }

      setExtractedEmails(emails);
      setError(null);
      setNeedsUpdate(false);

      const validEmails = emails.filter((e) => e.isValid).length;
      const invalidEmails = emails.length - validEmails;

      setExtractionStats((prev) => ({
        totalExtractions: prev.totalExtractions + 1,
        totalEmailsFound: prev.totalEmailsFound + emails.length,
        totalVerifications: prev.totalVerifications,
        validCount: prev.validCount + validEmails,
        invalidCount: prev.invalidCount + invalidEmails,
        lastUsed: new Date(),
      }));

      if (emails.length > 0 && shouldSpawnItem()) {
        spawnItem("envelope");
      }
    } catch {
      setError(t("emailTool.extractorError"));
    }
  }, [extractInput, t, spawnItem, shouldSpawnItem, emailOptions]);

  const verifyEmailAddress = useCallback(async () => {
    if (!verifyEmailInput.trim()) {
      setVerificationResult(null);
      setError(null);
      setNeedsUpdate(false);
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { isValid, formatValid, details } = verifyEmail(verifyEmailInput);
      setVerificationResult({
        email: verifyEmailInput,
        isValid,
        formatValid,
        details,
      });
      setNeedsUpdate(false);

      setExtractionStats((prev) => ({
        totalExtractions: prev.totalExtractions,
        totalEmailsFound: prev.totalEmailsFound,
        totalVerifications: prev.totalVerifications + 1,
        validCount: prev.validCount + (isValid ? 1 : 0),
        invalidCount: prev.invalidCount + (isValid ? 0 : 1),
        lastUsed: new Date(),
      }));

      if (isValid && shouldSpawnItem()) {
        spawnItem("envelope");
      }
    } catch {
      setError(t("emailTool.verifierError"));
    } finally {
      setIsVerifying(false);
    }
  }, [verifyEmailInput, t, spawnItem, shouldSpawnItem]);

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const copyAllEmails = useCallback(async () => {
    const allEmails = extractedEmails.map((e) => e.email).join("\n");
    await copyToClipboard(allEmails);
  }, [extractedEmails, copyToClipboard]);

  const clearExtract = useCallback(() => {
    setExtractInput("");
    setExtractedEmails([]);
    setError(null);
    setNeedsUpdate(false);
  }, []);

  const clearVerify = useCallback(() => {
    setVerifyEmailInput("");
    setVerificationResult(null);
    setError(null);
    setNeedsUpdate(false);
  }, []);

  const handleExtractInputChange = useCallback(
    (value: string) => {
      setExtractInput(value);
      if (value !== extractInput && extractedEmails.length > 0) {
        setNeedsUpdate(true);
      }
      setError(null);
    },
    [extractInput, extractedEmails.length],
  );

  const handleVerifyInputChange = useCallback(
    (value: string) => {
      setVerifyEmailInput(value);
      if (value !== verifyEmailInput && verificationResult) {
        setNeedsUpdate(true);
      }
      setError(null);
    },
    [verifyEmailInput, verificationResult],
  );

  const loadExtractExample = useCallback((exampleText: string) => {
    setExtractInput(exampleText);
    setExtractedEmails([]);
    setError(null);
    setActiveTab("extractor");

    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  const loadVerifyExample = useCallback((exampleEmail: string) => {
    setVerifyEmailInput(exampleEmail);
    setVerificationResult(null);
    setError(null);
    setActiveTab("verifier");

    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  return (
    <motion.div
      className="container mx-auto max-w-6xl px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <EmailToolHero lang={lang} />

      <motion.section
        className="mb-12"
        variants={itemVariants}
        ref={toolSectionRef}
      >
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as ToolMode)}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <TabsList className="rounded-xl">
                  <TabsTrigger value="extractor" className="rounded-lg gap-2">
                    <Search className="h-4 w-4" />
                    {t("emailTool.extractorTab")}
                  </TabsTrigger>
                  <TabsTrigger value="verifier" className="rounded-lg gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {t("emailTool.verifierTab")}
                  </TabsTrigger>
                </TabsList>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                    title={`${t("emailTool.totalExtractions")}: ${extractionStats.totalExtractions}`}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    {extractionStats.totalExtractions}{" "}
                    {t("emailTool.extracted")}
                  </motion.div>
                  <motion.div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {extractionStats.totalEmailsFound} {t("emailTool.found")}
                  </motion.div>
                  <motion.div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    {extractionStats.totalVerifications}{" "}
                    {t("emailTool.verified")}
                  </motion.div>
                  {extractionStats.lastUsed && (
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      {extractionStats.lastUsed.toLocaleTimeString()}
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <TabsContent value="extractor">
                <div className="space-y-4">
                  <div className="grid gap-6 lg:grid-cols-2 items-start">
                    {/* Input area */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between h-8 mb-2">
                        <Label
                          htmlFor="extract-input"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Search className="h-4 w-4" />
                          {t("emailTool.extractInputLabel")}
                        </Label>
                      </div>
                      <Textarea
                        id="extract-input"
                        value={extractInput}
                        onChange={(e) =>
                          handleExtractInputChange(e.target.value)
                        }
                        placeholder={t("emailTool.extractPlaceholder")}
                        className="min-h-[220px] font-mono text-sm pixel-input resize-none rounded-xl"
                      />
                      {error && (
                        <div className="flex items-center gap-2 text-sm text-destructive p-3 bg-destructive/10 rounded-lg border-2 border-destructive/40 mt-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>

                    {/* Output area */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between h-8 mb-2">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {t("emailTool.extractedEmailsLabel").replace(
                            "{count}",
                            String(extractedEmails.length),
                          )}
                        </span>
                        {extractedEmails.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyAllEmails}
                            className="rounded-lg h-8"
                          >
                            {copied ? (
                              <span className="flex items-center">
                                <span className="h-4 w-4 mr-1">✓</span>
                                {t("common.copied")}
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Copy className="h-4 w-4 mr-1" />
                                {t("common.copyAll")}
                              </span>
                            )}
                          </Button>
                        )}
                      </div>
                      <div
                        className={`
                        min-h-[220px] p-4 text-sm font-mono whitespace-pre-wrap break-words overflow-auto rounded-xl border-2 transition-all duration-300
                        ${
                          needsUpdate
                            ? "border-amber-300 bg-amber-50/30 dark:border-amber-600/30 dark:bg-amber-950/20"
                            : "border-foreground/20 dark:border-primary/20 bg-muted/30"
                        }
                      `}
                      >
                        {extractedEmails.length > 0 ? (
                          <>
                            {needsUpdate && (
                              <div className="flex items-center gap-2 p-3 mb-4 bg-amber-100/80 dark:bg-amber-900/20 border-b border-amber-300 dark:border-amber-600/30 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-amber-700 dark:text-amber-500" />
                                <span className="text-sm text-amber-800 dark:text-amber-200">
                                  {t("common.needsUpdate")}
                                </span>
                              </div>
                            )}
                            <div className="space-y-2">
                              {extractedEmails.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        item.isValid
                                          ? "bg-green-500"
                                          : "bg-yellow-500"
                                      }`}
                                    />
                                    <span className="font-mono text-sm break-all">
                                      {item.email}
                                    </span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(item.email)}
                                    className="rounded-lg h-8 w-8 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : extractInput.trim() ? (
                          <div className="text-center p-4 text-muted-foreground">
                            {t("emailTool.noEmailsFound")}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            {t("emailTool.extractedEmailsLabel").replace(
                              "{count}",
                              "0",
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-muted/30 border">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailOptions.deduplicate}
                        onChange={(e) =>
                          setEmailOptions({
                            ...emailOptions,
                            deduplicate: e.target.checked,
                          })
                        }
                        className="rounded border-foreground/30"
                      />
                      {t("emailTool.options.deduplicate")}
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailOptions.includeInvalid}
                        onChange={(e) =>
                          setEmailOptions({
                            ...emailOptions,
                            includeInvalid: e.target.checked,
                          })
                        }
                        className="rounded border-foreground/30"
                      />
                      {t("emailTool.options.includeInvalid")}
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailOptions.caseSensitive}
                        onChange={(e) =>
                          setEmailOptions({
                            ...emailOptions,
                            caseSensitive: e.target.checked,
                          })
                        }
                        className="rounded border-foreground/30"
                      />
                      {t("emailTool.options.caseSensitive")}
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      onClick={extractAndValidate}
                      className="gap-2 rounded-xl h-11"
                    >
                      <Sparkles className="h-4 w-4" />
                      {t("emailTool.extractButton")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearExtract}
                      className="gap-2 rounded-xl h-11"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t("common.clear")}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="verifier">
                <div className="space-y-4">
                  <div className="grid gap-6 lg:grid-cols-2 items-start">
                    {/* Input area */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between h-8 mb-2">
                        <Label
                          htmlFor="verify-input"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          {t("emailTool.verifyInputLabel")}
                        </Label>
                      </div>
                      <Input
                        id="verify-input"
                        type="email"
                        value={verifyEmailInput}
                        onChange={(e) =>
                          handleVerifyInputChange(e.target.value)
                        }
                        placeholder={t("emailTool.verifyPlaceholder")}
                        className="flex-1 rounded-xl"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            verifyEmailAddress();
                          }
                        }}
                      />
                      {error && (
                        <div className="flex items-center gap-2 text-sm text-destructive p-3 bg-destructive/10 rounded-lg border-2 border-destructive/40 mt-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>

                    {/* Output area */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between h-8 mb-2">
                        <span className="text-sm font-medium">
                          {t("common.result")}
                        </span>
                        {verificationResult && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(verificationResult.email)
                            }
                            className="rounded-lg h-8"
                          >
                            {copied ? (
                              <span className="flex items-center">
                                <span className="h-4 w-4 mr-1">✓</span>
                                {t("common.copied")}
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Copy className="h-4 w-4 mr-1" />
                                {t("common.copy")}
                              </span>
                            )}
                          </Button>
                        )}
                      </div>
                      <div
                        className={`
                        min-h-[100px] p-4 text-sm font-mono whitespace-pre-wrap break-words overflow-auto rounded-xl border-2 transition-all duration-300
                        ${
                          needsUpdate
                            ? "border-amber-300 bg-amber-50/30 dark:border-amber-600/30 dark:bg-amber-950/20"
                            : "border-foreground/20 dark:border-primary/20 bg-muted/30"
                        }
                      `}
                      >
                        {verificationResult ? (
                          <>
                            {needsUpdate && (
                              <div className="flex items-center gap-2 p-3 mb-4 bg-amber-100/80 dark:bg-amber-900/20 border-b border-amber-300 dark:border-amber-600/30 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-amber-700 dark:text-amber-500" />
                                <span className="text-sm text-amber-800 dark:text-amber-200">
                                  {t("common.needsUpdate")}
                                </span>
                              </div>
                            )}
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                <div
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                    verificationResult.isValid
                                      ? "bg-green-500/10 text-green-600"
                                      : "bg-red-500/10 text-red-600"
                                  }`}
                                >
                                  {verificationResult.isValid ? (
                                    <CheckCircle className="h-3 w-3" />
                                  ) : (
                                    <XCircle className="h-3 w-3" />
                                  )}
                                  {verificationResult.isValid
                                    ? t("emailTool.valid")
                                    : t("emailTool.invalid")}
                                </div>
                                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium">
                                  <AlertTriangle className="h-3 w-3" />
                                  {t("emailTool.syntaxCheck")}
                                </div>
                              </div>
                              <div
                                className={`p-4 rounded-xl border-2 ${
                                  verificationResult.isValid
                                    ? "border-green-500/30 bg-green-500/5"
                                    : "border-red-500/30 bg-red-500/5"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        verificationResult.isValid
                                          ? "bg-green-500/20"
                                          : "bg-red-500/20"
                                      }`}
                                    >
                                      {verificationResult.isValid ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                      ) : (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-mono text-sm break-all">
                                        {verificationResult.email}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {verificationResult.details}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : verifyEmailInput.trim() ? (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-muted-foreground">
                              {t("common.result")}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            {t("emailTool.verifyPlaceholder")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      onClick={verifyEmailAddress}
                      disabled={isVerifying || !verifyEmailInput.trim()}
                      className="gap-2 rounded-xl h-11"
                    >
                      {isVerifying ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      {t("emailTool.verifyButton")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={verifyEmailAddress}
                      disabled={!verificationResult}
                      className="gap-2 rounded-xl h-11"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {t("emailTool.regenerate")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearVerify}
                      className="gap-2 rounded-xl h-11"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t("common.clear")}
                    </Button>
                    {verificationResult && (
                      <Button
                        variant="outline"
                        onClick={swapInputs}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("emailTool.swap")}
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      <EmailToolExamples
        lang={lang}
        onLoadExtractExample={loadExtractExample}
        onLoadVerifyExample={loadVerifyExample}
      />

      <EmailToolSeoContent lang={lang} />

      <EmailToolFaq lang={lang} />

      <EmailToolRelatedTools lang={lang} currentTool="email-tool" />
    </motion.div>
  );
}
