"use client";

import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  Copy,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";
import { UrlEncoderExamples } from "./url-encoder-examples";
import { UrlEncoderFaq } from "./url-encoder-faq-ssr";
import { UrlEncoderHero } from "./url-encoder-hero-ssr";
import { UrlEncoderRelatedTools } from "./url-encoder-related-tools-ssr";
import { UrlEncoderSeoContent } from "./url-encoder-seo-content-ssr";

interface UrlEncoderToolProps {
  lang?: LanguageType;
}

export function UrlEncoderTool({
  lang = "en" as LanguageType,
}: UrlEncoderToolProps) {
  const { t } = useTranslation(lang);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section - SSR */}
      <UrlEncoderHero lang={lang} />

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
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium">
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
                              <AlertCircle className="h-4 w-4 text-amber-700 dark:text-amber-500" />
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

      {/* Examples Section - SSR */}
      <UrlEncoderExamples lang={lang} onLoadExample={loadExample} />

      {/* SEO Content Section - SSR */}
      <UrlEncoderSeoContent lang={lang} />

      {/* FAQ Section - SSR */}
      <UrlEncoderFaq lang={lang} />

      {/* Related Tools - SSR */}
      <UrlEncoderRelatedTools lang={lang} currentTool="url-encoder" />
    </div>
  );
}
