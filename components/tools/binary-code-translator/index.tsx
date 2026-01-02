"use client";

import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";
import { BinaryCodeTranslatorExamples } from "./binary-code-translator-examples";
import { BinaryCodeTranslatorFaq } from "./binary-code-translator-faq-ssr";
import { BinaryCodeTranslatorHero } from "./binary-code-translator-hero-ssr";
import { BinaryCodeTranslatorRelatedTools } from "./binary-code-translator-related-tools-ssr";
import { BinaryCodeTranslatorSeoContent } from "./binary-code-translator-seo-content-ssr";

interface BinaryCodeTranslatorToolProps {
  lang?: LanguageType;
}

type ConversionMode = "textToBinary" | "binaryToText";

function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code.toString(2).padStart(8, "0");
    })
    .join(" ");
}

function binaryToText(binary: string): string {
  const cleanedBinary = binary.replace(/\s+/g, "");
  if (!/^[01]+$/.test(cleanedBinary)) {
    return "";
  }

  const chars: string[] = [];
  for (let i = 0; i < cleanedBinary.length; i += 8) {
    const byte = cleanedBinary.slice(i, i + 8);
    if (byte.length === 8) {
      const code = parseInt(byte, 2);
      chars.push(String.fromCharCode(code));
    }
  }
  return chars.join("");
}

export function BinaryCodeTranslatorTool({
  lang = "en" as LanguageType,
}: BinaryCodeTranslatorToolProps) {
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

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ConversionMode>("textToBinary");
  const [error, setError] = useState<string | null>(null);
  const [conversionStats, setConversionStats] = useState({
    totalConversions: 0,
    textToBinaryCount: 0,
    binaryToTextCount: 0,
    lastUsed: null as Date | null,
  });

  const handleTextToBinary = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const binary = textToBinary(input);
      setOutput(binary);
      setError(null);
      if (shouldSpawnItem()) {
        spawnItem("binary");
      }
      setConversionStats((prev) => ({
        totalConversions: prev.totalConversions + 1,
        textToBinaryCount: prev.textToBinaryCount + 1,
        binaryToTextCount: prev.binaryToTextCount,
        lastUsed: new Date(),
      }));
    } catch {
      setError(t("binaryCodeTranslator.error"));
    }
  }, [input, t, spawnItem, shouldSpawnItem]);

  const handleBinaryToText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const text = binaryToText(input);
      if (text === "") {
        setError(t("binaryCodeTranslator.invalidBinary"));
        setOutput("");
      } else {
        setOutput(text);
        setError(null);
        if (shouldSpawnItem()) {
          spawnItem("binary");
        }
        setConversionStats((prev) => ({
          totalConversions: prev.totalConversions + 1,
          textToBinaryCount: prev.textToBinaryCount,
          binaryToTextCount: prev.binaryToTextCount + 1,
          lastUsed: new Date(),
        }));
      }
    } catch {
      setError(t("binaryCodeTranslator.error"));
    }
  }, [input, t, spawnItem, shouldSpawnItem]);

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const swapContent = useCallback(() => {
    if (output) {
      setInput(output);
      setOutput("");
      setError(null);
      if (activeTab === "textToBinary") {
        setActiveTab("binaryToText");
      } else {
        setActiveTab("textToBinary");
      }
    }
  }, [output, activeTab]);

  const loadExample = useCallback(
    (mode: ConversionMode, exampleText: string) => {
      setInput(exampleText);
      setOutput("");
      setError(null);
      setActiveTab(mode);
    },
    [],
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <BinaryCodeTranslatorHero lang={lang} />

      <section className="mb-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as ConversionMode)}
              className="w-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <TabsList className="rounded-xl">
                  <TabsTrigger value="textToBinary" className="rounded-lg">
                    {t("binaryCodeTranslator.textToBinary")}
                  </TabsTrigger>
                  <TabsTrigger value="binaryToText" className="rounded-lg">
                    {t("binaryCodeTranslator.binaryToText")}
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {conversionStats.totalConversions}{" "}
                    {t("binaryCodeTranslator.converted")}
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-medium">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    {conversionStats.textToBinaryCount}{" "}
                    {t("binaryCodeTranslator.textToBinaryShort")}
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    {conversionStats.binaryToTextCount}{" "}
                    {t("binaryCodeTranslator.binaryToTextShort")}
                  </div>
                  {conversionStats.lastUsed && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-medium">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      {conversionStats.lastUsed.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">
                      {activeTab === "textToBinary"
                        ? t("binaryCodeTranslator.inputText")
                        : t("binaryCodeTranslator.inputBinary")}
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={swapContent}
                        disabled={!output}
                        className="rounded-lg text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        {t("binaryCodeTranslator.swap")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="rounded-lg text-xs"
                      >
                        {t("binaryCodeTranslator.clear")}
                      </Button>
                    </div>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      activeTab === "textToBinary"
                        ? t("binaryCodeTranslator.textPlaceholder")
                        : t("binaryCodeTranslator.binaryPlaceholder")
                    }
                    className="w-full min-h-[120px] p-4 rounded-xl border-2 border-border bg-muted/30 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={
                      activeTab === "textToBinary"
                        ? handleTextToBinary
                        : handleBinaryToText
                    }
                    className="gap-2 rounded-xl h-11"
                  >
                    <Sparkles className="h-4 w-4" />
                    {activeTab === "textToBinary"
                      ? t("binaryCodeTranslator.convertToBinary")
                      : t("binaryCodeTranslator.convertToText")}
                  </Button>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">
                      {activeTab === "textToBinary"
                        ? t("binaryCodeTranslator.outputBinary")
                        : t("binaryCodeTranslator.outputText")}
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(output)}
                      disabled={!output}
                      className="rounded-lg"
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
                  </div>
                  <div className="min-h-[120px] rounded-xl border-2 border-border bg-muted/30 overflow-hidden">
                    {output ? (
                      <CodeHighlighter
                        code={output}
                        language="javascript"
                        className="min-h-[120px] p-4"
                      />
                    ) : (
                      <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                        {t("binaryCodeTranslator.outputPlaceholder")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <BinaryCodeTranslatorExamples lang={lang} onLoadExample={loadExample} />

      <BinaryCodeTranslatorSeoContent lang={lang} />

      <BinaryCodeTranslatorFaq lang={lang} />

      <BinaryCodeTranslatorRelatedTools
        lang={lang}
        currentTool="binary-code-translator"
      />
    </div>
  );
}
