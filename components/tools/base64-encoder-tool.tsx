"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Key,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface Base64EncoderToolProps {
  lang: LanguageType;
}

interface ExampleData {
  titleKey: string;
  data: string;
}

const exampleData: ExampleData[] = [
  {
    titleKey: "base64Encoder.examples.simpleText",
    data: "Hello World!",
  },
  {
    titleKey: "base64Encoder.examples.chineseText",
    data: "你好世界！这是一个中文测试。",
  },
  {
    titleKey: "base64Encoder.examples.urlData",
    data: "https://example.com/path?param=value&other=data",
  },
  {
    titleKey: "base64Encoder.examples.jsonData",
    data: '{"name":"John Doe","email":"john@example.com","active":true}',
  },
];

export function Base64EncoderTool({ lang }: Base64EncoderToolProps) {
  const { t } = useTranslation(lang);
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
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("convert");
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [showFaq, setShowFaq] = useState(true); // 默认展开FAQ
  const [conversionStats, setConversionStats] = useState({
    totalConversions: 0,
    encodeCount: 0,
    decodeCount: 0,
    lastUsed: null as Date | null,
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const encodeBase64 = useCallback(
    (text: string) => {
      try {
        setError(null);
        const encoded = btoa(
          encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16)),
          ),
        );
        setOutput(encoded);
        // 成功编码时生成书本物品，只有在冷却时间结束后才生成
        if (text.trim() && shouldSpawnItem()) {
          spawnItem("book");
        }
      } catch {
        setError(t("base64Encoder.error.encoding"));
        setOutput("");
      }
    },
    [t, spawnItem, shouldSpawnItem],
  );

  const decodeBase64 = useCallback(
    (base64: string) => {
      try {
        setError(null);
        const trimmed = base64.replace(/\s/g, "");
        const decoded = decodeURIComponent(
          Array.prototype.map
            .call(
              atob(trimmed),
              (c: string) =>
                `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`,
            )
            .join(""),
        );
        setOutput(decoded);
        // 成功解码时生成书本物品，只有在冷却时间结束后才生成
        if (base64.trim() && shouldSpawnItem()) {
          spawnItem("book");
        }
      } catch {
        setError(t("base64Encoder.error.decoding"));
        setOutput("");
      }
    },
    [t, spawnItem, shouldSpawnItem],
  );

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    if (mode === "encode") {
      encodeBase64(input);
    } else {
      decodeBase64(input);
    }

    // 更新统计信息
    setConversionStats((prev) => ({
      totalConversions: prev.totalConversions + 1,
      encodeCount: mode === "encode" ? prev.encodeCount + 1 : prev.encodeCount,
      decodeCount: mode === "decode" ? prev.decodeCount + 1 : prev.decodeCount,
      lastUsed: new Date(),
    }));

    // Clear the needs update flag after successful conversion
    setNeedsUpdate(false);
  }, [input, mode, encodeBase64, decodeBase64]);

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
      setActiveTab("convert");

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

  const switchMode = useCallback(() => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    setOutput(input);
    setError(null);
  }, [mode, input, output]);

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
          <Key className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("base64Encoder.pageTitle")}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("base64Encoder.pageSubtitle")}
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
            t("badge.free"),
            t("badge.noSignup"),
            t("badge.offline"),
            t("badge.privacy"),
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
                <TabsTrigger value="convert" className="rounded-lg">
                  {t("common.convert")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="convert" className="space-y-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={mode === "encode" ? "default" : "outline"}
                        onClick={() => setMode("encode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.encode")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={mode === "decode" ? "default" : "outline"}
                        onClick={() => setMode("decode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.decode")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant="outline"
                        onClick={switchMode}
                        className="gap-2 rounded-xl h-11"
                      >
                        <RotateCcw className="h-4 w-4" />
                        {t("base64Encoder.swap")}
                      </Button>
                    </motion.div>
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
                      {conversionStats.totalConversions} Total
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encodes
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decodes
                    </motion.div>
                    {conversionStats.lastUsed && (
                      <motion.div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        title={`Last used: ${conversionStats.lastUsed.toLocaleString()}`}
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        {conversionStats.lastUsed.toLocaleTimeString()}
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <label
                        htmlFor="base64-input"
                        className="text-sm font-medium"
                      >
                        {mode === "encode"
                          ? t("base64Encoder.inputLabel")
                          : t("base64Encoder.inputLabelBase64")}
                      </label>
                    </div>
                    <Textarea
                      placeholder={
                        mode === "encode"
                          ? t("base64Encoder.inputPlaceholder")
                          : t("base64Encoder.inputPlaceholderBase64")
                      }
                      className="min-h-[300px] font-mono text-sm rounded-xl"
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
                          className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("common.output")}
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
                          className="rounded-lg"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.span
                                key="copied"
                                className="flex items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Check className="h-4 w-4 mr-1" />{" "}
                                {t("common.copied")}
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                className="flex items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Copy className="h-4 w-4 mr-1" />{" "}
                                {t("common.copy")}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <div
                      className={`
                      min-h-[300px] rounded-xl border-2 overflow-hidden transition-all duration-300
                      ${
                        needsUpdate
                          ? "border-amber-300 bg-amber-50/30 dark:border-amber-600/30 dark:bg-amber-950/20"
                          : "border-foreground/20 bg-muted/30"
                      }
                    `}
                    >
                      {output ? (
                        <div>
                          {needsUpdate && (
                            <div className="flex items-center gap-2 p-3 bg-amber-100/80 dark:bg-amber-900/20 border-b border-amber-300 dark:border-amber-600/30">
                              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              <span className="text-sm text-amber-800 dark:text-amber-200">
                                {t("common.needsUpdate")}
                              </span>
                            </div>
                          )}
                          <CodeHighlighter
                            code={output}
                            language="javascript"
                            className={`min-h-[300px] max-h-[400px] ${needsUpdate ? "opacity-90" : ""}`}
                          />
                        </div>
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                          {t("base64Encoder.outputPlaceholder")}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={handleConvert}
                      className="gap-2 rounded-xl h-11"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      {mode === "encode"
                        ? t("base64Encoder.encodeBtn")
                        : t("base64Encoder.decodeBtn")}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="outline"
                      className="rounded-xl bg-transparent h-11"
                      onClick={() => {
                        setInput("");
                        setOutput("");
                        setError(null);
                      }}
                    >
                      {t("common.clear")}
                    </Button>
                  </motion.div>
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
              {t("base64Encoder.examples")}
            </motion.h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("base64Encoder.examplesHint")} Click on any example to load it
              into the input field, or use "Quick Run" to automatically
              encode/decode:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {exampleData.map((example, index) => (
                <motion.div
                  key={example.titleKey}
                  className="pixel-card p-4 space-y-3 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => loadExample(example.data)}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold flex-1">
                      {t(example.titleKey)}
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
                        title="Load Example Only"
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
                        title="Copy"
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
          {t("base64Encoder.seo.title")}
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: t("base64Encoder.seo.description") }}
        />

        <motion.div
          className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50"
          variants={itemVariants}
        >
          <h4 className="font-semibold mb-2">{t("base64Encoder.seo.techImplTitle")}</h4>
          <p 
            className="text-sm text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("base64Encoder.seo.techImplDesc") }}
          />
        </motion.div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("base64Encoder.featuresTitle")}
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("base64Encoder.feature.textBinary.title"),
              desc: t("base64Encoder.feature.textBinary.desc"),
            },
            {
              title: t("base64Encoder.feature.urlSafe.title"),
              desc: t("base64Encoder.feature.urlSafe.desc"),
            },
            {
              title: t("base64Encoder.feature.fileSupport.title"),
              desc: t("base64Encoder.feature.fileSupport.desc"),
            },
            {
              title: t("base64Encoder.feature.privacy.title"),
              desc: t("base64Encoder.feature.privacy.desc"),
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
          {t("base64Encoder.useCasesTitle")}
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            t("base64Encoder.useCase.images"),
            t("base64Encoder.useCase.email"),
            t("base64Encoder.useCase.db"),
            t("base64Encoder.useCase.auth"),
            t("base64Encoder.useCase.serialization"),
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

        <motion.div
          className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50"
          variants={itemVariants}
        >
          <h4 className="font-semibold mb-2">
            💻 {t("base64Encoder.techTitle")}
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.dataUri") }} />
            <p dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.email") }} />
            <p dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.db") }} />
            <p dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.jwt") }} />
            <p dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.api") }} />
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
            {t("base64Encoder.scenarios.title")}
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
              {t("base64Encoder.scenarios.scenario1.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("base64Encoder.scenarios.scenario1.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">{t("base64Encoder.scenarios.scenario1.problem")}</div>
                <div className="mb-3">
                  {t("base64Encoder.scenarios.scenario1.problemDesc")}
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario1.solution")}
                </div>
                <div className="mb-3">
                  {t("base64Encoder.scenarios.scenario1.solutionDesc")}
                </div>
                <div className="text-green-600 text-xs">
                  &lt;img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
                  /&gt;
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("base64Encoder.scenarios.scenario1.result")}</strong>
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
              {t("base64Encoder.scenarios.scenario2.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("base64Encoder.scenarios.scenario2.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario2.credentials")}
                </div>
                <div className="mb-3 font-mono">username: password123</div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario2.encoded")}
                </div>
                <div className="mb-3 font-mono text-green-600">
                  dXNlcm5hbWU6cGFzc3dvcmQxMjM=
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario2.header")}
                </div>
                <div className="text-xs text-muted-foreground">
                  Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQxMjM=
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("base64Encoder.scenarios.scenario2.result")}</strong>
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
              {t("base64Encoder.scenarios.scenario3.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("base64Encoder.scenarios.scenario3.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario3.binary")}
                </div>
                <div className="mb-3">
                  {t("base64Encoder.scenarios.scenario3.binaryDesc")}
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario3.encoding")}
                </div>
                <div className="mb-3 font-mono text-green-600">
                  JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4K...
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario3.storage")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {
                    '{id: 1, document: "JVBERi0xLjQK...", filename: "document.pdf"}'
                  }
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("base64Encoder.scenarios.scenario3.result")}</strong>
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
            {t("base64Encoder.guide.title")}
          </motion.h3>

          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                step: "1",
                title: t("base64Encoder.guide.step1.title"),
                desc: t("base64Encoder.guide.step1.desc"),
              },
              {
                step: "2",
                title: t("base64Encoder.guide.step2.title"),
                desc: t("base64Encoder.guide.step2.desc"),
              },
              {
                step: "3",
                title: t("base64Encoder.guide.step3.title"),
                desc: t("base64Encoder.guide.step3.desc"),
              },
              {
                step: "4",
                title: t("base64Encoder.guide.step4.title"),
                desc: t("base64Encoder.guide.step4.desc"),
              },
            ].map((item) => (
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

      {/* Usage Limits & Best Practices */}
      <motion.section className="mb-12" variants={itemVariants}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-5 w-5" />
              {t("base64Encoder.limitsTitle")}
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 text-amber-600">
                  {t("base64Encoder.limits.limitations")}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      {t("base64Encoder.limits.sizeIncrease")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      {t("base64Encoder.limits.largeFiles")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      {t("base64Encoder.limits.notEncryption")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.browserMemory")}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">
                  {t("base64Encoder.limits.bestPractices")}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      {t("base64Encoder.limits.smallBinary")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.compression")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.urlSafe")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.validation")}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
                {t("base64Encoder.security.title")}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t("base64Encoder.security.desc")}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <h2 className="text-lg font-semibold">{t("base64Encoder.faqTitle")}</h2>
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
                  q: t("base64Encoder.faq.q1"),
                  a: t("base64Encoder.faq.a1"),
                },
                {
                  q: t("base64Encoder.faq.q2"),
                  a: t("base64Encoder.faq.a2"),
                },
                {
                  q: t("base64Encoder.faq.q3"),
                  a: t("base64Encoder.faq.a3"),
                },
                {
                  q: t("base64Encoder.faq.q4"),
                  a: t("base64Encoder.faq.a4"),
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
