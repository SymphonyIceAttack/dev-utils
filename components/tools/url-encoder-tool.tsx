"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Link2,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCat } from "@/context/cat-context";
import { type LanguageType, t } from "@/lib/translations";

const exampleUrlData = [
  {
    title: "Query Parameters",
    data: "name=John Doe&email=john@example.com&message=Hello World!",
  },
  {
    title: "URL with Special Chars",
    data: "https://example.com/search?q=hello world&category=开发工具",
  },
  {
    title: "API Endpoint",
    data: "https://api.example.com/users?filter=name='test'&sort=desc",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function UrlEncoderTool({ lang = "en" as LanguageType }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(true); // FAQ默认展开
  const [activeTab, setActiveTab] = useState("encode");
  const [needsUpdate, setNeedsUpdate] = useState(false);

  // 使用统计状态
  const [conversionStats, setConversionStats] = useState({
    totalConversions: 0,
    encodeCount: 0,
    decodeCount: 0,
    lastUsed: null as Date | null,
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const { spawnItem } = useCat();
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const COOLDOWN_DURATION = 3000; // 3秒冷却时间

  const shouldSpawnItem = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawnTime >= COOLDOWN_DURATION) {
      setLastSpawnTime(now);
      return true;
    }
    return false;
  }, [lastSpawnTime]);

  const encodeUrl = useCallback(() => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setError(null);
      setNeedsUpdate(false); // Clear update flag when conversion is done

      // 更新统计信息
      setConversionStats((prev) => ({
        totalConversions: prev.totalConversions + 1,
        encodeCount: prev.encodeCount + 1,
        decodeCount: prev.decodeCount,
        lastUsed: new Date(),
      }));

      // 只有在冷却时间结束后才生成物品
      if (input.trim() && shouldSpawnItem()) {
        spawnItem("fish");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encoding failed");
      setOutput("");
    }
  }, [input, spawnItem, shouldSpawnItem]);

  const decodeUrl = useCallback(() => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setError(null);
      setNeedsUpdate(false); // Clear update flag when conversion is done

      // 更新统计信息
      setConversionStats((prev) => ({
        totalConversions: prev.totalConversions + 1,
        encodeCount: prev.encodeCount,
        decodeCount: prev.decodeCount + 1,
        lastUsed: new Date(),
      }));

      // 只有在冷却时间结束后才生成物品
      if (input.trim() && shouldSpawnItem()) {
        spawnItem("fish");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid encoded string");
      setOutput("");
    }
  }, [input, spawnItem, shouldSpawnItem]);

  const handleConvert = useCallback(() => {
    if (mode === "encode") {
      encodeUrl();
    } else {
      decodeUrl();
    }
  }, [mode, encodeUrl, decodeUrl]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const loadExample = useCallback(
    (data: string) => {
      setInput(data);
      setError(null);
      setActiveTab("encode");

      // Only mark as needing update if the input is different from current input and we have existing output
      if (output && data !== input) {
        setNeedsUpdate(true);
      }

      setTimeout(() => {
        toolSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    },
    [output, input],
  );

  const swapInputOutput = useCallback(() => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  }, [output, mode]);

  return (
    <motion.div
      className="container mx-auto max-w-6xl px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="mb-10 text-center" variants={itemVariants}>
        <motion.div
          className="pixel-icon-box inline-flex items-center justify-center w-16 h-16 mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          whileHover={{
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 },
          }}
        >
          <Link2 className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("urlEncoder.pageTitle", lang)}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("urlEncoder.pageSubtitle", lang)}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
        >
          {[
            t("badge.free", lang),
            t("badge.noSignup", lang),
            t("badge.offline", lang),
            t("badge.privacy", lang),
          ].map((tag) => (
            <motion.span
              key={tag}
              className="pixel-badge"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* Tool Section */}
      <motion.section
        className="mb-12"
        variants={itemVariants}
        ref={toolSectionRef}
      >
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-4 rounded-xl">
                <TabsTrigger value="encode" className="rounded-lg">
                  {t("urlEncoder.encodeTab", lang)}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-6">
                {/* Mode toggle buttons */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.button
                      onClick={() => setMode("encode")}
                      className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all ${
                        mode === "encode"
                          ? "bg-primary text-primary-foreground border-foreground/60 dark:border-primary/50"
                          : "bg-transparent border-foreground/30 dark:border-primary/30 hover:bg-accent"
                      }`}
                      style={
                        mode === "encode"
                          ? { boxShadow: "3px 3px 0 0 var(--foreground)" }
                          : {}
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Encode
                    </motion.button>
                    <motion.button
                      onClick={() => setMode("decode")}
                      className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all ${
                        mode === "decode"
                          ? "bg-primary text-primary-foreground border-foreground/60 dark:border-primary/50"
                          : "bg-transparent border-foreground/30 dark:border-primary/30 hover:bg-accent"
                      }`}
                      style={
                        mode === "decode"
                          ? { boxShadow: "3px 3px 0 0 var(--foreground)" }
                          : {}
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Decode
                    </motion.button>
                  </div>

                  {/* Usage Analysis Tags - 右侧 */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {conversionStats.totalConversions} URLs
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encodes
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decodes
                    </motion.div>
                  </motion.div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 items-start">
                  {/* Input area */}
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between h-8 mb-2">
                      <label
                        htmlFor="url-input"
                        className="text-sm font-medium"
                      >
                        {mode === "encode"
                          ? t("urlEncoder.inputLabel.encode", lang)
                          : t("urlEncoder.inputLabel.decode", lang)}
                      </label>
                    </div>
                    <Textarea
                      id="url-input"
                      placeholder={
                        mode === "encode"
                          ? t("urlEncoder.inputPlaceholder.encode", lang)
                          : t("urlEncoder.inputPlaceholder.decode", lang)
                      }
                      className="min-h-[220px] font-mono text-sm pixel-input resize-none rounded-xl"
                      value={input}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setInput(newValue);

                        // Mark as needing update if input changes and we have output
                        if (newValue !== input && output) {
                          setNeedsUpdate(true);
                        }

                        // Clear error when input changes
                        setError(null);
                      }}
                    />
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-sm text-destructive p-3 bg-destructive/10 rounded-lg border-2 border-destructive/40 mt-2"
                        >
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Output area */}
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between h-8 mb-2">
                      <span className="text-sm font-medium">
                        {t("urlEncoder.outputPlaceholder", lang)}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          disabled={!output}
                          className="h-8 text-xs rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.span
                                key="copied"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center"
                              >
                                <Check className="h-3 w-3 mr-1" /> Copied!
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center"
                              >
                                <Copy className="h-3 w-3 mr-1" /> Copy
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
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
                      {output ? (
                        <>
                          {needsUpdate && (
                            <div className="flex items-center gap-2 p-3 mb-4 bg-amber-100/80 dark:bg-amber-900/20 border-b border-amber-300 dark:border-amber-600/30 rounded-lg">
                              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              <span className="text-sm text-amber-800 dark:text-amber-200">
                                {t("common.needsUpdate", lang)}
                              </span>
                            </div>
                          )}
                          {output}
                        </>
                      ) : (
                        <>
                          <span className="text-muted-foreground">
                            Result will appear here...
                          </span>
                          <br />
                          <span className="text-muted-foreground">
                            Your encoded/decoded URL
                          </span>
                          <br />
                          <span className="text-muted-foreground">
                            will be displayed here.
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={handleConvert}
                    className="pixel-btn px-5 py-2.5 h-11 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, y: 2 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.span>
                    {mode === "encode" ? t("urlEncoder.encodeBtn", lang) : t("urlEncoder.decodeBtn", lang)}
                  </motion.button>
                  <motion.button
                    onClick={swapInputOutput}
                    className="px-4 py-2.5 h-11 flex items-center gap-2 font-semibold rounded-full border-2 border-foreground/50 dark:border-primary/40 bg-transparent hover:bg-accent transition-colors disabled:opacity-50"
                    style={{ boxShadow: "2px 2px 0 0 var(--foreground)" }}
                    disabled={!output}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      animate={{ rotate: output ? [0, 180] : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </motion.span>
                    {t("urlEncoder.swapBtn", lang)}
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setInput("");
                      setOutput("");
                      setError(null);
                    }}
                    className="px-4 py-2.5 h-11 flex items-center font-semibold rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("urlEncoder.clearBtn", lang)}
                  </motion.button>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      {/* Examples Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="h-5 w-5" />
              {t("urlEncoder.examplesTitle", lang)}
            </motion.h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("urlEncoder.examplesDesc", lang)}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exampleUrlData.map((example, index) => (
                <motion.div
                  key={example.title}
                  className="pixel-card p-4 space-y-3 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => loadExample(example.data)}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold flex-1">
                      {example.title}
                    </h4>
                    <div className="flex gap-1 ml-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          loadExample(example.data);
                          // Note: Do NOT auto-convert, let user manually click convert button
                        }}
                        className="pixel-btn px-3 py-1 text-xs h-7"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Load Example & Convert"
                      >
                        <motion.span
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 4,
                          }}
                        >
                          <Sparkles className="h-3 w-3" />
                        </motion.span>
                      </motion.button>
                      <motion.button
                        onClick={async (e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          await navigator.clipboard.writeText(example.data);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy Example"
                      >
                        <Copy className="h-3 w-3" />
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.data}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* SEO Content Section */}
      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-xl font-bold mb-4" variants={itemVariants}>
          {t("urlEncoder.seo.title", lang)}
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">{t("urlEncoder.seo.title", lang)}</strong>
          {t("urlEncoder.seo.description", lang)}
        </motion.p>

        {/* Technical Implementation Details */}
        <motion.div
          className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
              ⚡
            </span>
            {t("urlEncoder.techDetailsTitle", lang)}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2 text-sm">
                {t("urlEncoder.techDetails.jsFunctions", lang)}
              </h4>
              <div className="bg-background p-3 rounded border font-mono text-xs space-y-2">
                <div className="text-muted-foreground">
                  {"/* Encode URL components */"}
                </div>
                <div>encodeURIComponent(input)</div>
                <div className="text-muted-foreground mt-3">
                  {"/* Decode URL components */"}
                </div>
                <div>decodeURIComponent(input)</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-sm">{t("urlEncoder.techDetails.algoDetails", lang)}</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• {t("urlEncoder.techDetails.algoList1", lang)}</li>
                <li>• {t("urlEncoder.techDetails.algoList2", lang)}</li>
                <li>• {t("urlEncoder.techDetails.algoList3", lang)}</li>
                <li>• {t("urlEncoder.techDetails.algoList4", lang)}</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("urlEncoder.seo.featuresTitle", lang)}
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("urlEncoder.seo.feature1.title", lang),
              desc: t("urlEncoder.seo.feature1.desc", lang),
            },
            {
              title: t("urlEncoder.seo.feature2.title", lang),
              desc: t("urlEncoder.seo.feature2.desc", lang),
            },
            {
              title: t("urlEncoder.seo.feature3.title", lang),
              desc: t("urlEncoder.seo.feature3.desc", lang),
            },
            {
              title: t("urlEncoder.seo.feature4.title", lang),
              desc: t("urlEncoder.seo.feature4.desc", lang),
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="pixel-card p-4"
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("urlEncoder.seo.useCasesTitle", lang)}
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            t("urlEncoder.seo.useCase1", lang),
            t("urlEncoder.seo.useCase2", lang),
            t("urlEncoder.seo.useCase3", lang),
            t("urlEncoder.seo.useCase4", lang),
            t("urlEncoder.seo.useCase5", lang),
          ].map((item, index) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 text-sm"
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="w-2 h-2 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* Usage Boundaries */}
        <motion.div
          className="mt-6 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800"
          variants={itemVariants}
        >
          <h4 className="text-sm font-semibold mb-3 text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <span className="w-5 h-5 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full flex items-center justify-center text-xs font-bold">
              !
            </span>
            {t("urlEncoder.limitationsTitle", lang)}
          </h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h5 className="font-medium text-amber-700 dark:text-amber-300 text-xs mb-2">
                ✅ {t("urlEncoder.limitations.appropriate", lang)}
              </h5>
              <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                <li>• {t("urlEncoder.limitations.appropriateList1", lang)}</li>
                <li>• {t("urlEncoder.limitations.appropriateList2", lang)}</li>
                <li>• {t("urlEncoder.limitations.appropriateList3", lang)}</li>
                <li>• {t("urlEncoder.limitations.appropriateList4", lang)}</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-amber-700 dark:text-amber-300 text-xs mb-2">
                ⚠️ {t("urlEncoder.limitations.notSuitable", lang)}
              </h5>
              <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                <li>• {t("urlEncoder.limitations.notSuitableList1", lang)}</li>
                <li>• {t("urlEncoder.limitations.notSuitableList2", lang)}</li>
                <li>• {t("urlEncoder.limitations.notSuitableList3", lang)}</li>
                <li>• {t("urlEncoder.limitations.notSuitableList4", lang)}</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Real-World Scenarios */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-xl font-bold mb-6" variants={itemVariants}>
            {t("urlEncoder.scenarios.title", lang)}
          </motion.h3>

          {/* Scenario 1 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              {t("urlEncoder.scenarios.scenario1.title", lang)}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("urlEncoder.scenarios.scenario1.desc", lang)}
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
              <div className="text-muted-foreground mb-2">
                ❌ {t("urlEncoder.scenarios.scenario1.problem", lang)}
              </div>
              <div className="mb-3 text-destructive">
                https://shop.com/search?query=men's shoes & category=athletic
              </div>
              <div className="text-muted-foreground mb-2">
                ✅ {t("urlEncoder.scenarios.scenario1.solution", lang)}
              </div>
              <div className="text-green-600">
                https://shop.com/search?query=men%27s%20shoes%20%26%20category%3Dathletic
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("urlEncoder.scenarios.scenario1.solutionLabel", lang)}</strong>{" "}
              {t("urlEncoder.scenarios.scenario1.result", lang)}
            </p>
          </motion.div>

          {/* Scenario 2 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              {t("urlEncoder.scenarios.scenario2.title", lang)}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("urlEncoder.scenarios.scenario2.desc", lang)}
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
              <div className="text-muted-foreground mb-2">
                {t("urlEncoder.scenarios.scenario2.original", lang)}
              </div>
              <div className="mb-3">开发ツール + 在线服务</div>
              <div className="text-muted-foreground mb-2">{t("urlEncoder.scenarios.scenario2.encoded", lang)}</div>
              <div className="text-green-600">
                %E5%BC%80%E5%8F%91%E3%83%84%E3%83%BC%E3%83%AB%20%2B%20%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("urlEncoder.scenarios.scenario1.solutionLabel", lang)}</strong> {t("urlEncoder.scenarios.scenario2.result", lang)}
            </p>
          </motion.div>

          {/* Scenario 3 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              {t("urlEncoder.scenarios.scenario3.title", lang)}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("urlEncoder.scenarios.scenario3.desc", lang)}
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
              <div className="text-muted-foreground mb-2">
                {t("urlEncoder.scenarios.scenario3.dynamic", lang)}
              </div>
              <div className="mb-3">
                https://app.com/share?title=Check this out!&text=Amazing article
                about web development
              </div>
              <div className="text-muted-foreground mb-2">
                {t("urlEncoder.scenarios.scenario3.ready", lang)}
              </div>
              <div className="text-green-600">
                https://app.com/share?title=Check%20this%20out%21&amp;text=Amazing%20article%20about%20web%20development
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("urlEncoder.scenarios.scenario1.solutionLabel", lang)}</strong> {t("urlEncoder.scenarios.scenario3.result", lang)}
            </p>
          </motion.div>
        </motion.section>

        {/* Step-by-Step Guide */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-xl font-bold mb-6" variants={itemVariants}>
            {t("urlEncoder.guide.title", lang)}
          </motion.h3>

          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                step: "1",
                title: t("urlEncoder.guide.step1.title", lang),
                desc: t("urlEncoder.guide.step1.desc", lang),
              },
              {
                step: "2",
                title: t("urlEncoder.guide.step2.title", lang),
                desc: t("urlEncoder.guide.step2.desc", lang),
              },
              {
                step: "3",
                title: t("urlEncoder.guide.step3.title", lang),
                desc: t("urlEncoder.guide.step3.desc", lang),
              },
              {
                step: "4",
                title: t("urlEncoder.guide.step4.title", lang),
                desc: t("urlEncoder.guide.step4.desc", lang),
              },
            ].map((item, _index) => (
              <motion.div
                key={item.step}
                className="flex items-start gap-4 p-4 bg-muted/10 rounded-lg"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <h2 className="text-lg font-semibold">{t("urlEncoder.faqTitle", lang)}</h2>
          <motion.div
            animate={{ rotate: showFaq ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showFaq && (
            <motion.div
              className="space-y-4 pt-6 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[
                {
                  q: t("urlEncoder.faq.q1", lang),
                  a: t("urlEncoder.faq.a1", lang),
                },
                {
                  q: t("urlEncoder.faq.q2", lang),
                  a: t("urlEncoder.faq.a2", lang),
                },
                {
                  q: t("urlEncoder.faq.q3", lang),
                  a: t("urlEncoder.faq.a3", lang),
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  className="pixel-card p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
}
