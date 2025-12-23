"use client";

import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  Copy,
  RotateCcw,
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
import { Base64EncoderExamples } from "./base64-encoder-examples";
import { Base64EncoderFaq } from "./base64-encoder-faq-ssr";
import { Base64EncoderHero } from "./base64-encoder-hero-ssr";
import { Base64EncoderRelatedTools } from "./base64-encoder-related-tools-ssr";
import { Base64EncoderSeoContent } from "./base64-encoder-seo-content-ssr";

interface Base64EncoderToolProps {
  lang?: LanguageType;
}

export function Base64EncoderTool({
  lang = "en" as LanguageType,
}: Base64EncoderToolProps) {
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
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section - SSR */}
      <Base64EncoderHero lang={lang} />

      <section className="mb-12" ref={toolSectionRef}>
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
                    <div>
                      <Button
                        variant={mode === "encode" ? "default" : "outline"}
                        onClick={() => setMode("encode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.encode")}
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant={mode === "decode" ? "default" : "outline"}
                        onClick={() => setMode("decode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.decode")}
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        onClick={switchMode}
                        className="gap-2 rounded-xl h-11"
                      >
                        <RotateCcw className="h-4 w-4" />
                        {t("base64Encoder.swap")}
                      </Button>
                    </div>
                  </div>

                  {/* Usage Analysis Tags - 右侧 */}
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {conversionStats.totalConversions} Total
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encodes
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decodes
                    </div>
                    {conversionStats.lastUsed && (
                      <div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-medium"
                        title={`Last used: ${conversionStats.lastUsed.toLocaleString()}`}
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        {conversionStats.lastUsed.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 items-start">
                  {/* Input area */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between h-8 mb-2">
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
                      id="base64-input"
                      placeholder={
                        mode === "encode"
                          ? t("base64Encoder.inputPlaceholder")
                          : t("base64Encoder.inputPlaceholderBase64")
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
                        {t("common.output")}
                      </span>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          disabled={!output}
                          className="h-8 text-xs rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
                        >
                          {copied ? (
                            <span className="flex items-center">
                              <Check
                                className="h-3 w-3 mr-1"
                                aria-hidden="true"
                              />{" "}
                              {t("common.copied")}
                            </span>
                          ) : (
                            <span className="flex items-center">
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
                        <span className="text-muted-foreground">
                          {t("base64Encoder.outputPlaceholder")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <Button
                      onClick={handleConvert}
                      className="gap-2 rounded-xl h-11"
                    >
                      <div>
                        <Sparkles className="h-4 w-4" />
                      </div>
                      {mode === "encode"
                        ? t("base64Encoder.encodeBtn")
                        : t("base64Encoder.decodeBtn")}
                    </Button>
                  </div>
                  <div>
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
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Examples Section */}
      <Base64EncoderExamples lang={lang} onLoadExample={loadExample} />

      {/* SEO Content Section - SSR */}
      <Base64EncoderSeoContent lang={lang} />

      {/* FAQ Section - SSR */}
      <Base64EncoderFaq lang={lang} />

      {/* Related Tools - SSR */}
      <Base64EncoderRelatedTools lang={lang} currentTool="base64-encoder" />
    </div>
  );
}
