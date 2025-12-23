"use client";

import { AnimatePresence, motion } from "framer-motion";
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
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";
import { EncodingConverterExamples } from "./encoding-converter-examples";
import { EncodingConverterFaq } from "./encoding-converter-faq-ssr";
import { EncodingConverterHero } from "./encoding-converter-hero-ssr";
import { EncodingConverterRelatedTools } from "./encoding-converter-related-tools-ssr";
import { EncodingConverterSeoContent } from "./encoding-converter-seo-content-ssr";

export type EncodingType =
  | "utf-8"
  | "utf-16"
  | "ascii"
  | "iso-8859-1"
  | "hex"
  | "binary"
  | "unicode-escape";

interface ConversionResult {
  success: boolean;
  data?: string;
  error?: string;
  metadata?: {
    inputLength: number;
    outputLength: number;
    conversionTime: number;
  };
}

interface ConversionStats {
  totalConversions: number;
  encodeCount: number;
  decodeCount: number;
  lastUsed: Date | null;
  errorCount: number;
  averageConversionTime: number;
}

// Validation functions
function isValidHex(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  const cleanInput = input.replace(/\s+/g, "");
  if (cleanInput.length === 0) return false;
  return /^[0-9A-Fa-f]*$/.test(cleanInput) && cleanInput.length % 2 === 0;
}

function isValidBinary(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  const cleanInput = input.replace(/\s+/g, "");
  if (cleanInput.length === 0) return false;
  return /^[01]*$/.test(cleanInput) && cleanInput.length % 8 === 0;
}

function isValidUnicodeEscape(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  const unicodePattern = /(\\u\{[0-9A-Fa-f]+\\}|\\u[0-9A-Fa-f]{4})/g;
  return unicodePattern.test(input) || input.length === 0;
}

function validateInput(
  input: string,
  encoding: EncodingType,
): { isValid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return { isValid: false, error: "Input cannot be empty" };
  }
  switch (encoding) {
    case "hex":
      if (!isValidHex(input)) {
        return {
          isValid: false,
          error:
            "Invalid hexadecimal format. Must contain only hex digits (0-9, A-F) and have even length.",
        };
      }
      break;
    case "binary":
      if (!isValidBinary(input)) {
        return {
          isValid: false,
          error:
            "Invalid binary format. Must contain only 0s and 1s with length multiple of 8.",
        };
      }
      break;
    case "unicode-escape":
      if (!isValidUnicodeEscape(input)) {
        return {
          isValid: false,
          error:
            "Invalid Unicode escape format. Use \\uXXXX or \\u{XXXXX} notation.",
        };
      }
      break;
  }
  return { isValid: true };
}

// Conversion functions
function textToHex(text: string): ConversionResult {
  const startTime = performance.now();
  try {
    if (typeof text !== "string") {
      return { success: false, error: "Input must be a string" };
    }
    const hexArray = Array.from(text).map((char) => {
      const code = char.charCodeAt(0);
      if (code > 0xffff) {
        const hi = Math.floor((code - 0x10000) / 0x400) + 0xd800;
        const lo = ((code - 0x10000) % 0x400) + 0xdc00;
        return `${hi.toString(16).padStart(4, "0")} ${lo.toString(16).padStart(4, "0")}`;
      }
      return code.toString(16).padStart(code > 255 ? 4 : 2, "0");
    });
    const result = hexArray.join(" ");
    const conversionTime = performance.now() - startTime;
    return {
      success: true,
      data: result,
      metadata: {
        inputLength: text.length,
        outputLength: result.length,
        conversionTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `Hex conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function hexToText(hex: string): ConversionResult {
  const startTime = performance.now();
  try {
    if (typeof hex !== "string") {
      return { success: false, error: "Input must be a string" };
    }
    const validation = validateInput(hex, "hex");
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    const codes = hex
      .trim()
      .split(/\s+/)
      .map((h) => {
        const parsed = parseInt(h, 16);
        if (Number.isNaN(parsed)) {
          throw new Error(`Invalid hex value: ${h}`);
        }
        return parsed;
      });
    let result = "";
    for (let i = 0; i < codes.length; i++) {
      if (codes[i] >= 0xd800 && codes[i] <= 0xdbff && i + 1 < codes.length) {
        const hi = codes[i];
        const lo = codes[i + 1];
        if (lo >= 0xdc00 && lo <= 0xdfff) {
          result += String.fromCodePoint(
            (hi - 0xd800) * 0x400 + (lo - 0xdc00) + 0x10000,
          );
          i++;
          continue;
        }
      }
      result += String.fromCharCode(codes[i]);
    }
    const conversionTime = performance.now() - startTime;
    return {
      success: true,
      data: result,
      metadata: {
        inputLength: hex.length,
        outputLength: result.length,
        conversionTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `Hex to text conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function textToBinary(text: string): ConversionResult {
  const startTime = performance.now();
  try {
    if (typeof text !== "string") {
      return { success: false, error: "Input must be a string" };
    }
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const binaryArray = Array.from(bytes).map((byte) =>
      byte.toString(2).padStart(8, "0"),
    );
    const result = binaryArray.join(" ");
    const conversionTime = performance.now() - startTime;
    return {
      success: true,
      data: result,
      metadata: {
        inputLength: text.length,
        outputLength: result.length,
        conversionTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `Binary conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function binaryToText(binary: string): ConversionResult {
  const startTime = performance.now();
  try {
    if (typeof binary !== "string") {
      return { success: false, error: "Input must be a string" };
    }
    const validation = validateInput(binary, "binary");
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    const bytes = binary
      .trim()
      .split(/\s+/)
      .map((b) => {
        const parsed = parseInt(b, 2);
        if (Number.isNaN(parsed) || parsed < 0 || parsed > 255) {
          throw new Error(`Invalid binary byte: ${b}`);
        }
        return parsed;
      });
    const decoder = new TextDecoder();
    const result = decoder.decode(new Uint8Array(bytes));
    const conversionTime = performance.now() - startTime;
    return {
      success: true,
      data: result,
      metadata: {
        inputLength: binary.length,
        outputLength: result.length,
        conversionTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `Binary to text conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function textToUnicodeEscape(text: string): ConversionResult {
  const startTime = performance.now();
  try {
    if (typeof text !== "string") {
      return { success: false, error: "Input must be a string" };
    }
    const escapeArray = Array.from(text).map((char) => {
      const code = char.codePointAt(0);
      if (code === undefined) return "";
      if (code > 0xffff) {
        return `\\u{${code.toString(16).toUpperCase()}}`;
      }
      if (code > 127) {
        return `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
      }
      return char;
    });
    const result = escapeArray.join("");
    const conversionTime = performance.now() - startTime;
    return {
      success: true,
      data: result,
      metadata: {
        inputLength: text.length,
        outputLength: result.length,
        conversionTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `Unicode escape conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function unicodeEscapeToText(escaped: string): ConversionResult {
  const startTime = performance.now();
  try {
    if (typeof escaped !== "string") {
      return { success: false, error: "Input must be a string" };
    }
    const validation = validateInput(escaped, "unicode-escape");
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    const result = escaped.replace(
      /\\u\{([0-9A-Fa-f]+)\}|\\u([0-9A-Fa-f]{4})/g,
      (_, p1, p2) => {
        const hexValue = p1 || p2;
        const codePoint = parseInt(hexValue, 16);
        if (Number.isNaN(codePoint)) {
          throw new Error(`Invalid Unicode escape sequence: \\u${hexValue}`);
        }
        return String.fromCodePoint(codePoint);
      },
    );
    const conversionTime = performance.now() - startTime;
    return {
      success: true,
      data: result,
      metadata: {
        inputLength: escaped.length,
        outputLength: result.length,
        conversionTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `Unicode escape to text conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

interface EncodingConverterToolProps {
  lang?: LanguageType;
}

export function EncodingConverterTool({
  lang = "en" as LanguageType,
}: EncodingConverterToolProps) {
  const { t } = useTranslation(lang);

  const encodings = [
    { value: "utf-8", label: t("encodingConverter.encodings.utf8") },
    { value: "utf-16", label: t("encodingConverter.encodings.utf16") },
    { value: "ascii", label: t("encodingConverter.encodings.ascii") },
    { value: "iso-8859-1", label: t("encodingConverter.encodings.iso88591") },
    { value: "hex", label: t("encodingConverter.encodings.hex") },
    { value: "binary", label: t("encodingConverter.encodings.binary") },
    {
      value: "unicode-escape",
      label: t("encodingConverter.encodings.unicodeEscape"),
    },
  ];

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
  const [sourceEncoding, setSourceEncoding] = useState<EncodingType>("utf-8");
  const [targetEncoding, setTargetEncoding] = useState<EncodingType>("hex");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("convert");
  const [viewMode, setViewMode] = useState<"text" | "hex">("text");
  const [needsUpdate, setNeedsUpdate] = useState(false);

  const [conversionStats, setConversionStats] = useState<ConversionStats>({
    totalConversions: 0,
    encodeCount: 0,
    decodeCount: 0,
    lastUsed: null,
    errorCount: 0,
    averageConversionTime: 0,
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    const startTime = performance.now();
    setError(null);

    try {
      const validation = validateInput(input, sourceEncoding);
      if (!validation.isValid) {
        setError(validation.error || "Invalid input format");
        setOutput("");
        setConversionStats((prev) => ({
          ...prev,
          errorCount: prev.errorCount + 1,
          lastUsed: new Date(),
        }));
        return;
      }

      let text: string;
      let decodeResult: ConversionResult;

      switch (sourceEncoding) {
        case "hex":
          decodeResult = hexToText(input);
          break;
        case "binary":
          decodeResult = binaryToText(input);
          break;
        case "unicode-escape":
          decodeResult = unicodeEscapeToText(input);
          break;
        case "utf-8":
        case "utf-16":
        case "ascii":
        case "iso-8859-1":
          text = input;
          decodeResult = { success: true, data: input };
          break;
        default:
          throw new Error(`Unsupported source encoding: ${sourceEncoding}`);
      }

      if (!decodeResult.success) {
        setError(decodeResult.error || "Decoding failed");
        setOutput("");
        setConversionStats((prev) => ({
          ...prev,
          errorCount: prev.errorCount + 1,
          lastUsed: new Date(),
        }));
        return;
      }

      text = decodeResult.data || "";

      let encodeResult: ConversionResult;

      switch (targetEncoding) {
        case "hex":
          encodeResult = textToHex(text);
          break;
        case "binary":
          encodeResult = textToBinary(text);
          break;
        case "unicode-escape":
          encodeResult = textToUnicodeEscape(text);
          break;
        case "utf-8":
          encodeResult = { success: true, data: text };
          break;
        case "utf-16": {
          const utf16Array = Array.from(text).map(
            (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
          );
          encodeResult = {
            success: true,
            data: utf16Array.join(""),
            metadata: {
              inputLength: text.length,
              outputLength: utf16Array.join("").length,
              conversionTime: performance.now() - startTime,
            },
          };
          break;
        }
        case "ascii": {
          const asciiText = Array.from(text)
            .map((char) => {
              return char.charCodeAt(0) <= 127 ? char : "?";
            })
            .join("");
          encodeResult = {
            success: true,
            data: asciiText,
            metadata: {
              inputLength: text.length,
              outputLength: asciiText.length,
              conversionTime: performance.now() - startTime,
            },
          };
          break;
        }
        case "iso-8859-1": {
          const latin1Text = Array.from(text)
            .map((char) => {
              return char.charCodeAt(0) <= 255 ? char : "?";
            })
            .join("");
          encodeResult = {
            success: true,
            data: latin1Text,
            metadata: {
              inputLength: text.length,
              outputLength: latin1Text.length,
              conversionTime: performance.now() - startTime,
            },
          };
          break;
        }
        default:
          throw new Error(`Unsupported target encoding: ${targetEncoding}`);
      }

      if (!encodeResult.success) {
        setError(encodeResult.error || "Encoding failed");
        setOutput("");
        setConversionStats((prev) => ({
          ...prev,
          errorCount: prev.errorCount + 1,
          lastUsed: new Date(),
        }));
        return;
      }

      setOutput(encodeResult.data || "");

      const totalConversionTime = performance.now() - startTime;
      const isDecode = sourceEncoding !== "utf-8";
      const isEncode = targetEncoding !== "utf-8";

      setConversionStats((prev) => {
        const newStats = {
          totalConversions: prev.totalConversions + 1,
          encodeCount: isEncode ? prev.encodeCount + 1 : prev.encodeCount,
          decodeCount: isDecode ? prev.decodeCount + 1 : prev.decodeCount,
          errorCount: prev.errorCount,
          lastUsed: new Date(),
          averageConversionTime:
            prev.averageConversionTime === 0
              ? totalConversionTime
              : (prev.averageConversionTime + totalConversionTime) / 2,
        };
        return newStats;
      });

      if (shouldSpawnItem()) {
        spawnItem("yarn");
      }

      setNeedsUpdate(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown conversion error";
      setError(errorMessage);
      setOutput("");

      setConversionStats((prev) => ({
        ...prev,
        errorCount: prev.errorCount + 1,
        lastUsed: new Date(),
      }));
    }
  }, [input, sourceEncoding, targetEncoding, spawnItem, shouldSpawnItem]);

  const copyToClipboard = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn("Clipboard API not available:", error);
      setError("Failed to copy to clipboard. Please select and copy manually.");
    }
  }, [output]);

  const loadExample = useCallback(
    (data: string) => {
      setInput(data);
      setError(null);
      setActiveTab("convert");

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

  const swapEncodings = useCallback(() => {
    setSourceEncoding(targetEncoding);
    setTargetEncoding(sourceEncoding);
    setInput(output);
    setOutput("");
    setError(null);
  }, [sourceEncoding, targetEncoding, output]);

  return (
    <motion.div
      className="container mx-auto max-w-6xl px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section - SSR */}
      <EncodingConverterHero lang={lang} />

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
                  {t("encodingConverter.convert")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="convert" className="space-y-4">
                {/* Encoding selectors */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex-1 min-w-[150px]">
                    <span className="text-sm font-medium block mb-2">
                      {t("encodingConverter.sourceEncoding")}
                    </span>
                    <Select
                      value={sourceEncoding}
                      onValueChange={(value: string) =>
                        setSourceEncoding(value as EncodingType)
                      }
                      aria-label={t("encodingConverter.sourceEncoding")}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {encodings.map((enc) => (
                          <SelectItem key={enc.value} value={enc.value}>
                            {enc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-6"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapEncodings}
                      className="rounded-full"
                      aria-label={t("encodingConverter.swapEncodings")}
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                  </motion.div>

                  <div className="flex-1 min-w-[150px]">
                    <span className="text-sm font-medium block mb-2">
                      {t("encodingConverter.targetEncoding")}
                    </span>
                    <Select
                      value={targetEncoding}
                      onValueChange={(value) =>
                        setTargetEncoding(value as EncodingType)
                      }
                      aria-label={t("encodingConverter.targetEncoding")}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {encodings.map((enc) => (
                          <SelectItem key={enc.value} value={enc.value}>
                            {enc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("encodingConverter.inputLabel")}
                      </span>
                    </div>
                    <Textarea
                      placeholder={t("encodingConverter.inputPlaceholder")}
                      className="min-h-[300px] font-mono text-sm rounded-xl"
                      value={input}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setInput(newValue);
                        if (newValue !== input && output) {
                          setNeedsUpdate(true);
                        }
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
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {t("encodingConverter.outputLabel")}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            variant={viewMode === "text" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("text")}
                            className="h-6 text-xs rounded-lg"
                            aria-label={t("encodingConverter.textView")}
                          >
                            {t("encodingConverter.textView")}
                          </Button>
                          <Button
                            variant={viewMode === "hex" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("hex")}
                            className="h-6 text-xs rounded-lg"
                            aria-label={t("encodingConverter.hexView")}
                          >
                            {t("encodingConverter.hexView")}
                          </Button>
                        </div>
                      </div>
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
                          aria-label={
                            copied ? t("common.copied") : t("common.copy")
                          }
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
                              <AlertCircle className="h-4 w-4 text-amber-700 dark:text-amber-500" />
                              <span className="text-sm text-amber-800 dark:text-amber-200">
                                {t("common.needsUpdate")}
                              </span>
                            </div>
                          )}
                          <CodeHighlighter
                            code={
                              viewMode === "hex"
                                ? textToHex(output).data || ""
                                : output
                            }
                            language="javascript"
                            className={`min-h-[300px] max-h-[400px] ${needsUpdate ? "opacity-90" : ""}`}
                          />
                        </div>
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                          {t("encodingConverter.outputPlaceholder")}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-center justify-between gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        onClick={convert}
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
                        {t("encodingConverter.convert")}
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
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      title={`Total conversions: ${conversionStats.totalConversions}`}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {conversionStats.totalConversions} Converted
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encoded
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decoded
                    </motion.div>
                    {conversionStats.errorCount > 0 && (
                      <motion.div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        {conversionStats.errorCount} Errors
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      {/* Examples Section */}
      <EncodingConverterExamples lang={lang} onLoadExample={loadExample} />

      {/* SEO Content Section - SSR */}
      <EncodingConverterSeoContent lang={lang} />

      {/* FAQ Section - SSR */}
      <EncodingConverterFaq lang={lang} />

      {/* Related Tools - SSR */}
      <EncodingConverterRelatedTools
        lang={lang}
        currentTool="encoding-converter"
      />
    </motion.div>
  );
}
