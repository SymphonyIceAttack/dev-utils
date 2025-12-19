"use client";

import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Link2,
  Sparkles,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

export function UrlEncoderTool({ lang = "en" as LanguageType }) {
  const { t } = useTranslation(lang);
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

  // 示例数据使用useMemo优化
  const exampleUrlData = useMemo(
    () => [
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
    ],
    [],
  );

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
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section - 优化首屏渲染 */}
      <section className="mb-10 text-center" aria-labelledby="hero-title">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 pixel-icon-box">
          <Link2 className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          id="hero-title"
        >
          {t("urlEncoder.pageTitle")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("urlEncoder.pageSubtitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            t("badge.free"),
            t("badge.noSignup"),
            t("badge.offline"),
            t("badge.privacy"),
          ].map((tag) => (
            <span key={tag} className="pixel-badge">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Tool Section */}
      <section className="mb-12" ref={toolSectionRef}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-4 rounded-xl">
                <TabsTrigger value="encode" className="rounded-lg">
                  {t("urlEncoder.encodeTab")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-6">
                {/* Mode toggle buttons */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMode("encode")}
                      aria-pressed={mode === "encode"}
                      aria-label={
                        mode === "encode"
                          ? "Currently in encode mode"
                          : "Switch to encode mode"
                      }
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
                    >
                      Encode
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("decode")}
                      aria-pressed={mode === "decode"}
                      aria-label={
                        mode === "decode"
                          ? "Currently in decode mode"
                          : "Switch to decode mode"
                      }
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
                    >
                      Decode
                    </button>
                  </div>

                  {/* Usage Analysis Tags - 右侧 */}
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {conversionStats.totalConversions} URLs
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encodes
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decodes
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 items-start">
                  {/* Input area */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between h-8 mb-2">
                      <label
                        htmlFor="url-input"
                        className="text-sm font-medium"
                      >
                        {mode === "encode"
                          ? t("urlEncoder.inputLabel.encode")
                          : t("urlEncoder.inputLabel.decode")}
                      </label>
                    </div>
                    <Textarea
                      id="url-input"
                      placeholder={
                        mode === "encode"
                          ? t("urlEncoder.inputPlaceholder.encode")
                          : t("urlEncoder.inputPlaceholder.decode")
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
                        {t("urlEncoder.outputPlaceholder")}
                      </span>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          disabled={!output}
                          aria-label={
                            copied
                              ? "Content copied to clipboard"
                              : "Copy content to clipboard"
                          }
                          aria-live="polite"
                          className="h-8 text-xs rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
                        >
                          {copied ? (
                            <span key="copied" className="flex items-center">
                              <Check
                                className="h-3 w-3 mr-1"
                                aria-hidden="true"
                              />{" "}
                              {t("common.copied")}
                            </span>
                          ) : (
                            <span key="copy" className="flex items-center">
                              <Copy
                                className="h-3 w-3 mr-1"
                                aria-hidden="true"
                              />{" "}
                              {t("common.copy")}
                            </span>
                          )}
                        </Button>
                      </div>
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
                                {t("common.needsUpdate")}
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
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleConvert}
                    className="pixel-btn px-5 py-2.5 h-11 flex items-center gap-2"
                    aria-label={`${mode === "encode" ? "Encode" : "Decode"} the input text`}
                    aria-describedby="convert-help"
                  >
                    <span aria-hidden="true">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    {mode === "encode"
                      ? t("urlEncoder.encodeBtn")
                      : t("urlEncoder.decodeBtn")}
                  </button>
                  <span id="convert-help" className="sr-only">
                    {mode === "encode" ? "编码输入的URL" : "解码输入的URL"}
                  </span>
                  <style jsx>{`
                    .sr-only {
                      position: absolute;
                      width: 1px;
                      height: 1px;
                      padding: 0;
                      margin: -1px;
                      overflow: hidden;
                      clip: rect(0, 0, 0, 0);
                      white-space: nowrap;
                      border: 0;
                    }
                  `}</style>
                  <button
                    type="button"
                    onClick={swapInputOutput}
                    aria-label={`Swap input and output${output ? "" : " (disabled - no output available)"}`}
                    disabled={!output}
                    className="px-4 py-2.5 h-11 flex items-center gap-2 font-semibold rounded-full border-2 border-foreground/50 dark:border-primary/40 bg-transparent hover:bg-accent transition-colors disabled:opacity-50"
                    style={{ boxShadow: "2px 2px 0 0 var(--foreground)" }}
                  >
                    <span aria-hidden="true">
                      <ArrowRightLeft className="h-4 w-4" />
                    </span>
                    {t("urlEncoder.swapBtn")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInput("");
                      setOutput("");
                      setError(null);
                    }}
                    aria-label="Clear all input and output fields"
                    className="px-4 py-2.5 h-11 flex items-center font-semibold rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
                  >
                    {t("urlEncoder.clearBtn")}
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Examples Section */}
      <section className="mb-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {t("urlEncoder.examplesTitle")}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("urlEncoder.examplesDesc")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exampleUrlData.map((example, _index) => (
                <div
                  key={example.title}
                  className="pixel-card p-4 space-y-3 cursor-pointer w-full text-left"
                  onClick={() => loadExample(example.data)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      loadExample(example.data);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold flex-1">
                      {example.title}
                    </h4>
                    <div className="flex gap-1 ml-2">
                      <button
                        type="button"
                        className="pixel-btn px-3 py-1 text-xs h-7 cursor-pointer inline-flex items-center"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          loadExample(example.data);
                          // Note: Do NOT auto-convert, let user manually click convert button
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            loadExample(example.data);
                          }
                        }}
                        aria-label={`Load and convert example: ${example.title}`}
                        title="Load Example & Convert"
                      >
                        <span aria-hidden="true">
                          <Sparkles className="h-3 w-3" />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors cursor-pointer inline-flex items-center"
                        onClick={async (e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          await navigator.clipboard.writeText(example.data);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            navigator.clipboard.writeText(example.data);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        }}
                        aria-label={`Copy example data for ${example.title}`}
                        title="Copy Example"
                      >
                        <Copy className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.data}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Content Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">{t("urlEncoder.seo.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          <strong className="text-foreground">
            {t("urlEncoder.seo.title")}
          </strong>
          {t("urlEncoder.seo.description")}
        </p>

        {/* Technical Implementation Details */}
        <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
              ⚡
            </span>
            {t("urlEncoder.techDetailsTitle")}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2 text-sm">
                {t("urlEncoder.techDetails.jsFunctions")}
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
              <h4 className="font-semibold mb-2 text-sm">
                {t("urlEncoder.techDetails.algoDetails")}
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• {t("urlEncoder.techDetails.algoList1")}</li>
                <li>• {t("urlEncoder.techDetails.algoList2")}</li>
                <li>• {t("urlEncoder.techDetails.algoList3")}</li>
                <li>• {t("urlEncoder.techDetails.algoList4")}</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          {t("urlEncoder.seo.featuresTitle")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("urlEncoder.seo.feature1.title"),
              desc: t("urlEncoder.seo.feature1.desc"),
            },
            {
              title: t("urlEncoder.seo.feature2.title"),
              desc: t("urlEncoder.seo.feature2.desc"),
            },
            {
              title: t("urlEncoder.seo.feature3.title"),
              desc: t("urlEncoder.seo.feature3.desc"),
            },
            {
              title: t("urlEncoder.seo.feature4.title"),
              desc: t("urlEncoder.seo.feature4.desc"),
            },
          ].map((feature) => (
            <div key={feature.title} className="pixel-card p-4">
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          {t("urlEncoder.seo.useCasesTitle")}
        </h3>
        <ul className="text-muted-foreground space-y-2">
          {[
            t("urlEncoder.seo.useCase1"),
            t("urlEncoder.seo.useCase2"),
            t("urlEncoder.seo.useCase3"),
            t("urlEncoder.seo.useCase4"),
            t("urlEncoder.seo.useCase5"),
          ].map((item, _index) => (
            <li key={item} className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-primary rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        {/* Usage Boundaries */}
        <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
          <h4 className="text-sm font-semibold mb-3 text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <span className="w-5 h-5 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full flex items-center justify-center text-xs font-bold">
              !
            </span>
            {t("urlEncoder.limitationsTitle")}
          </h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h5 className="font-medium text-amber-700 dark:text-amber-300 text-xs mb-2">
                ✅ {t("urlEncoder.limitations.appropriate")}
              </h5>
              <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                <li>• {t("urlEncoder.limitations.appropriateList1")}</li>
                <li>• {t("urlEncoder.limitations.appropriateList2")}</li>
                <li>• {t("urlEncoder.limitations.appropriateList3")}</li>
                <li>• {t("urlEncoder.limitations.appropriateList4")}</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-amber-700 dark:text-amber-300 text-xs mb-2">
                ⚠️ {t("urlEncoder.limitations.notSuitable")}
              </h5>
              <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                <li>• {t("urlEncoder.limitations.notSuitableList1")}</li>
                <li>• {t("urlEncoder.limitations.notSuitableList2")}</li>
                <li>• {t("urlEncoder.limitations.notSuitableList3")}</li>
                <li>• {t("urlEncoder.limitations.notSuitableList4")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Scenarios */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6">
            {t("urlEncoder.scenarios.title")}
          </h3>

          {/* Scenario 1 */}
          <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              {t("urlEncoder.scenarios.scenario1.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("urlEncoder.scenarios.scenario1.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
              <div className="text-muted-foreground mb-2">
                ❌ {t("urlEncoder.scenarios.scenario1.problem")}
              </div>
              <div className="mb-3 text-destructive">
                https://shop.com/search?query=men's shoes & category=athletic
              </div>
              <div className="text-muted-foreground mb-2">
                ✅ {t("urlEncoder.scenarios.scenario1.solution")}
              </div>
              <div className="text-green-600">
                https://shop.com/search?query=men%27s%20shoes%20%26%20category%3Dathletic
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>
                {t("urlEncoder.scenarios.scenario1.solutionLabel")}
              </strong>{" "}
              {t("urlEncoder.scenarios.scenario1.result")}
            </p>
          </div>

          {/* Scenario 2 */}
          <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              {t("urlEncoder.scenarios.scenario2.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("urlEncoder.scenarios.scenario2.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
              <div className="text-muted-foreground mb-2">
                {t("urlEncoder.scenarios.scenario2.original")}
              </div>
              <div className="mb-3">开发ツール + 在线服务</div>
              <div className="text-muted-foreground mb-2">
                {t("urlEncoder.scenarios.scenario2.encoded")}
              </div>
              <div className="text-green-600">
                %E5%BC%80%E5%8F%91%E3%83%84%E3%83%BC%E3%83%AB%20%2B%20%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>
                {t("urlEncoder.scenarios.scenario1.solutionLabel")}
              </strong>{" "}
              {t("urlEncoder.scenarios.scenario2.result")}
            </p>
          </div>

          {/* Scenario 3 */}
          <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              {t("urlEncoder.scenarios.scenario3.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("urlEncoder.scenarios.scenario3.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap break-words">
              <div className="text-muted-foreground mb-2">
                {t("urlEncoder.scenarios.scenario3.dynamic")}
              </div>
              <div className="mb-3">
                https://app.com/share?title=Check this out!&text=Amazing article
                about web development
              </div>
              <div className="text-muted-foreground mb-2">
                {t("urlEncoder.scenarios.scenario3.ready")}
              </div>
              <div className="text-green-600">
                https://app.com/share?title=Check%20this%20out%21&amp;text=Amazing%20article%20about%20web%20development
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>
                {t("urlEncoder.scenarios.scenario1.solutionLabel")}
              </strong>{" "}
              {t("urlEncoder.scenarios.scenario3.result")}
            </p>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6">
            {t("urlEncoder.guide.title")}
          </h3>

          <div className="space-y-4">
            {[
              {
                step: "1",
                title: t("urlEncoder.guide.step1.title"),
                desc: t("urlEncoder.guide.step1.desc"),
              },
              {
                step: "2",
                title: t("urlEncoder.guide.step2.title"),
                desc: t("urlEncoder.guide.step2.desc"),
              },
              {
                step: "3",
                title: t("urlEncoder.guide.step3.title"),
                desc: t("urlEncoder.guide.step3.desc"),
              },
              {
                step: "4",
                title: t("urlEncoder.guide.step4.title"),
                desc: t("urlEncoder.guide.step4.desc"),
              },
            ].map((item, _index) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 bg-muted/10 rounded-lg"
              >
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <button
          type="button"
          onClick={() => setShowFaq(!showFaq)}
          aria-expanded={showFaq}
          aria-controls="faq-content"
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
        >
          <h2 className="text-lg font-semibold">{t("urlEncoder.faqTitle")}</h2>
          <div
            className={`transition-transform duration-300 ${showFaq ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <ChevronDown className="h-5 w-5" />
          </div>
        </button>

        {showFaq && (
          <section
            className="space-y-4 pt-6 overflow-hidden"
            id="faq-content"
            aria-labelledby="faq-title"
          >
            {[
              {
                q: t("urlEncoder.faq.q1"),
                a: t("urlEncoder.faq.a1"),
              },
              {
                q: t("urlEncoder.faq.q2"),
                a: t("urlEncoder.faq.a2"),
              },
              {
                q: t("urlEncoder.faq.q3"),
                a: t("urlEncoder.faq.a3"),
              },
            ].map((faq, _index) => (
              <div key={faq.q} className="pixel-card p-4">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </section>
        )}
      </section>
    </div>
  );
}
