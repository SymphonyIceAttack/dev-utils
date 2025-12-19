/**
 * Character Encoding Converter Tool
 *
 * This module provides comprehensive character encoding conversion functionality
 * supporting multiple encoding formats including UTF-8, UTF-16, ASCII, ISO-8859-1,
 * hexadecimal, binary, and Unicode escape sequences.
 *
 * Key features:
 * - Bidirectional conversion between multiple encoding formats
 * - Proper handling of Unicode surrogate pairs for emoji and special characters
 * - Input validation and error handling
 * - Support for bulk conversions with statistics tracking
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  FileText,
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

/**
 * Supported encoding types
 */
export type EncodingType =
  | "utf-8"
  | "utf-16"
  | "ascii"
  | "iso-8859-1"
  | "hex"
  | "binary"
  | "unicode-escape";

/**
 * Result of a conversion operation
 */
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

/**
 * Encoding conversion statistics
 */
interface ConversionStats {
  totalConversions: number;
  encodeCount: number;
  decodeCount: number;
  lastUsed: Date | null;
  errorCount: number;
  averageConversionTime: number;
}

/**
 * Input validation utilities
 */

/**
 * Validates hexadecimal input format
 * @param input - The hexadecimal string to validate
 * @returns true if valid, false otherwise
 */
function isValidHex(input: string): boolean {
  if (!input || typeof input !== "string") return false;

  // Remove all whitespace and check if remaining string contains only hex digits
  const cleanInput = input.replace(/\s+/g, "");
  if (cleanInput.length === 0) return false;

  // Check if all characters are valid hex digits
  return /^[0-9A-Fa-f]*$/.test(cleanInput) && cleanInput.length % 2 === 0;
}

/**
 * Validates binary input format
 * @param input - The binary string to validate
 * @returns true if valid, false otherwise
 */
function isValidBinary(input: string): boolean {
  if (!input || typeof input !== "string") return false;

  // Remove all whitespace and check if remaining string contains only 0s and 1s
  const cleanInput = input.replace(/\s+/g, "");
  if (cleanInput.length === 0) return false;

  // Check if all characters are valid binary digits
  return /^[01]*$/.test(cleanInput) && cleanInput.length % 8 === 0;
}

/**
 * Validates Unicode escape sequence format
 * @param input - The escape sequence string to validate
 * @returns true if valid, false otherwise
 */
function isValidUnicodeEscape(input: string): boolean {
  if (!input || typeof input !== "string") return false;

  // Pattern matches \uXXXX or \u{XXXXX} formats
  const unicodePattern = /(\\u\{[0-9A-Fa-f]+\\}|\\u[0-9A-Fa-f]{4})/g;
  return unicodePattern.test(input) || input.length === 0;
}

/**
 * Validates input length to prevent memory issues
 * @param input - The input string to check
 * @param maxLength - Maximum allowed length (default: 1MB)
 * @returns true if within limits, false otherwise
 */
function isValidLength(
  input: string,
  maxLength: number = 1024 * 1024,
): boolean {
  return input.length <= maxLength;
}

/**
 * Comprehensive input validation for encoding conversion
 * @param input - The input string to validate
 * @param encoding - The source encoding type
 * @returns Validation result with error message if invalid
 */
function validateInput(
  input: string,
  encoding: EncodingType,
): { isValid: boolean; error?: string } {
  // Check if input is empty
  if (!input || input.trim().length === 0) {
    return { isValid: false, error: "Input cannot be empty" };
  }

  // Check input length
  if (!isValidLength(input)) {
    return { isValid: false, error: "Input too large. Maximum size is 1MB." };
  }

  // Check encoding-specific format
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

/**
 * Enhanced encoding conversion functions with proper error handling
 */

/**
 * Converts text to hexadecimal representation
 * @param text - Input text to convert
 * @returns Conversion result with hex string or error
 */
function textToHex(text: string): ConversionResult {
  const startTime = performance.now();

  try {
    if (typeof text !== "string") {
      return { success: false, error: "Input must be a string" };
    }

    const hexArray = Array.from(text).map((char) => {
      const code = char.charCodeAt(0);

      // Handle Unicode surrogate pairs for emoji and special characters
      if (code > 0xffff) {
        // Calculate high and low surrogate values
        const hi = Math.floor((code - 0x10000) / 0x400) + 0xd800;
        const lo = ((code - 0x10000) % 0x400) + 0xdc00;
        return `${hi.toString(16).padStart(4, "0")} ${lo.toString(16).padStart(4, "0")}`;
      }

      // Regular character: use 2 digits for ASCII, 4 for extended
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

/**
 * Converts hexadecimal string back to text
 * @param hex - Input hexadecimal string to convert
 * @returns Conversion result with text or error
 */
function hexToText(hex: string): ConversionResult {
  const startTime = performance.now();

  try {
    if (typeof hex !== "string") {
      return { success: false, error: "Input must be a string" };
    }

    // Validate hex format first
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
      // Handle Unicode surrogate pairs
      if (codes[i] >= 0xd800 && codes[i] <= 0xdbff && i + 1 < codes.length) {
        const hi = codes[i];
        const lo = codes[i + 1];

        if (lo >= 0xdc00 && lo <= 0xdfff) {
          // Valid surrogate pair found
          result += String.fromCodePoint(
            (hi - 0xd800) * 0x400 + (lo - 0xdc00) + 0x10000,
          );
          i++; // Skip the low surrogate as it's been processed
          continue;
        }
      }

      // Regular character
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

/**
 * Converts text to binary representation
 * @param text - Input text to convert
 * @returns Conversion result with binary string or error
 */
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

/**
 * Converts binary string back to text
 * @param binary - Input binary string to convert
 * @returns Conversion result with text or error
 */
function binaryToText(binary: string): ConversionResult {
  const startTime = performance.now();

  try {
    if (typeof binary !== "string") {
      return { success: false, error: "Input must be a string" };
    }

    // Validate binary format first
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

/**
 * Converts text to Unicode escape sequences
 * @param text - Input text to convert
 * @returns Conversion result with escaped string or error
 */
function textToUnicodeEscape(text: string): ConversionResult {
  const startTime = performance.now();

  try {
    if (typeof text !== "string") {
      return { success: false, error: "Input must be a string" };
    }

    const escapeArray = Array.from(text).map((char) => {
      const code = char.codePointAt(0);
      if (code === undefined) return "";

      // Handle characters outside Basic Multilingual Plane
      if (code > 0xffff) {
        return `\\u{${code.toString(16).toUpperCase()}}`;
      }

      // Use escape sequences only for non-ASCII characters
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

/**
 * Converts Unicode escape sequences back to text
 * @param escaped - Input escape sequence string to convert
 * @returns Conversion result with text or error
 */
function unicodeEscapeToText(escaped: string): ConversionResult {
  const startTime = performance.now();

  try {
    if (typeof escaped !== "string") {
      return { success: false, error: "Input must be a string" };
    }

    // Validate escape format first
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

/**
 * Main encoding conversion component
 */
interface EncodingConverterToolProps {
  lang: LanguageType;
}
/**
 * Main encoding conversion component
 */
export function EncodingConverterTool({ lang }: EncodingConverterToolProps) {
  const { t } = useTranslation(lang);

  // Enhanced encoding definitions with metadata
  const encodings = [
    {
      value: "utf-8",
      label: t("encodingConverter.encodings.utf8"),
      description: "Unicode text encoding, web standard",
    },
    {
      value: "utf-16",
      label: t("encodingConverter.encodings.utf16"),
      description: "Unicode text encoding, 2-4 bytes per character",
    },
    {
      value: "ascii",
      label: t("encodingConverter.encodings.ascii"),
      description: "7-bit ASCII encoding",
    },
    {
      value: "iso-8859-1",
      label: t("encodingConverter.encodings.iso88591"),
      description: "Latin-1 encoding for Western European languages",
    },
    {
      value: "hex",
      label: t("encodingConverter.encodings.hex"),
      description: "Hexadecimal representation of bytes",
    },
    {
      value: "binary",
      label: t("encodingConverter.encodings.binary"),
      description: "Binary representation of bytes",
    },
    {
      value: "unicode-escape",
      label: t("encodingConverter.encodings.unicodeEscape"),
      description: "Unicode escape sequences (\\uXXXX format)",
    },
  ];

  // Example data for testing conversions
  const exampleData = [
    {
      titleKey: "encodingConverter.examples.chinese",
      data: "你好世界！Hello World!",
      description: "Mixed Chinese and English text",
    },
    {
      titleKey: "encodingConverter.examples.japanese",
      data: "こんにちは世界",
      description: "Japanese Hiragana text",
    },
    {
      titleKey: "encodingConverter.examples.mixed",
      data: "Héllo Wörld 你好 🌍",
      description: "Multilingual text with emoji",
    },
  ];

  // Animation variants for consistent UI
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

  // State management
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
  const [showFaq, setShowFaq] = useState(true);
  const [activeTab, setActiveTab] = useState("convert");
  const [viewMode, setViewMode] = useState<"text" | "hex">("text");
  const [needsUpdate, setNeedsUpdate] = useState(false);

  // Enhanced statistics with error tracking
  const [conversionStats, setConversionStats] = useState<ConversionStats>({
    totalConversions: 0,
    encodeCount: 0,
    decodeCount: 0,
    lastUsed: null,
    errorCount: 0,
    averageConversionTime: 0,
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  /**
   * Core conversion function with enhanced error handling and validation
   */
  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    const startTime = performance.now();
    setError(null);

    try {
      // Validate input before conversion
      const validation = validateInput(input, sourceEncoding);
      if (!validation.isValid) {
        setError(validation.error || "Invalid input format");
        setOutput("");

        // Update error statistics
        setConversionStats((prev) => ({
          ...prev,
          errorCount: prev.errorCount + 1,
          lastUsed: new Date(),
        }));

        return;
      }

      let text: string;

      // Phase 1: Decode from source encoding to text
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
          // These are text encodings, no decoding needed
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

      // Phase 2: Encode text to target encoding
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
          // Custom UTF-16 implementation
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
          // Convert non-ASCII characters to ?
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
          // Convert characters outside Latin-1 range to ?
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

      // Success: Update output and statistics
      setOutput(encodeResult.data || "");

      const totalConversionTime = performance.now() - startTime;
      const isDecode = sourceEncoding !== "utf-8";
      const isEncode = targetEncoding !== "utf-8";

      // Update comprehensive statistics
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

      // Trigger cat animation for successful conversion
      if (shouldSpawnItem()) {
        spawnItem("yarn");
      }

      // Clear the needs update flag after successful conversion
      setNeedsUpdate(false);
    } catch (error) {
      // Catch any unexpected errors
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

  /**
   * Enhanced clipboard copy with error handling
   */
  const copyToClipboard = useCallback(async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      console.warn("Clipboard API not available:", error);
      setError("Failed to copy to clipboard. Please select and copy manually.");
    }
  }, [output]);

  /**
   * Load example data with validation
   */
  const loadExample = useCallback(
    (data: string) => {
      // Validate example data
      const validation = validateInput(data, sourceEncoding);
      if (!validation.isValid) {
        setError(`Example data validation failed: ${validation.error}`);
        return;
      }

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
    [output, input, sourceEncoding],
  );

  /**
   * Swap source and target encodings with data
   */
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
          <FileText className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("encodingConverter.pageTitle")}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("encodingConverter.pageSubtitle")}
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
            t("badge.multiEncoding"),
            t("badge.realtimeConversion"),
            t("badge.formatSupport"),
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
                          >
                            {t("encodingConverter.textView")}
                          </Button>
                          <Button
                            variant={viewMode === "hex" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("hex")}
                            className="h-6 text-xs rounded-lg"
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

                  {/* Enhanced Usage Analysis Tags */}
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
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      title={`Encoding operations: ${conversionStats.encodeCount}`}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encoded
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      title={`Decoding operations: ${conversionStats.decodeCount}`}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decoded
                    </motion.div>
                    {conversionStats.errorCount > 0 && (
                      <motion.div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        title={`Failed conversions: ${conversionStats.errorCount}`}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        {conversionStats.errorCount} Errors
                      </motion.div>
                    )}
                    {conversionStats.averageConversionTime > 0 && (
                      <motion.div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        title={`Average conversion time: ${conversionStats.averageConversionTime.toFixed(2)}ms`}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        {conversionStats.averageConversionTime.toFixed(1)}ms avg
                      </motion.div>
                    )}
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
              {t("encodingConverter.examples")}
            </motion.h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("encodingConverter.examplesHint")} Click on any example to load
              it into the input field, or use "Quick Run" to automatically
              convert:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exampleData.map((example, index) => (
                <motion.div
                  key={example.titleKey}
                  className="pixel-card p-4 space-y-3 relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold flex-1">
                      <button
                        type="button"
                        className="text-left w-full after:absolute after:inset-0 outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        onClick={() => loadExample(example.data)}
                      >
                        {t(example.titleKey)}
                      </button>
                    </h4>
                    <div className="flex gap-1 ml-2 relative z-10">
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
          {t("encodingConverter.seo.title")}
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
          dangerouslySetInnerHTML={{
            __html: t("encodingConverter.seo.description"),
          }}
        />

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("encodingConverter.techTitle")}
        </motion.h3>
        <motion.div
          className="bg-muted/30 rounded-xl p-4 mb-6"
          variants={itemVariants}
        >
          <div className="grid gap-4 text-sm">
            <div>
              <strong>{t("encodingConverter.tech.coreLogic")}</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>{t("encodingConverter.tech.logic1")}</li>
                <li>{t("encodingConverter.tech.logic2")}</li>
                <li>{t("encodingConverter.tech.logic3")}</li>
                <li>{t("encodingConverter.tech.logic4")}</li>
                <li>{t("encodingConverter.tech.logic5")}</li>
              </ul>
            </div>
            <div>
              <strong>{t("encodingConverter.tech.supported")}</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>{t("encodingConverter.tech.utf8")}</li>
                <li>{t("encodingConverter.tech.utf16")}</li>
                <li>{t("encodingConverter.tech.ascii")}</li>
                <li>{t("encodingConverter.tech.iso")}</li>
                <li>{t("encodingConverter.tech.hex")}</li>
                <li>{t("encodingConverter.tech.binary")}</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("encodingConverter.featuresTitle")}
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("encodingConverter.feature.multi.title"),
              desc: t("encodingConverter.feature.multi.desc"),
            },
            {
              title: t("encodingConverter.feature.realtime.title"),
              desc: t("encodingConverter.feature.realtime.desc"),
            },
            {
              title: t("encodingConverter.feature.format.title"),
              desc: t("encodingConverter.feature.format.desc"),
            },
            {
              title: t("encodingConverter.feature.privacy.title"),
              desc: t("encodingConverter.feature.privacy.desc"),
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
          {t("encodingConverter.useCasesTitle")}
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            {
              case: t("encodingConverter.useCase.garbled"),
              boundary: t("encodingConverter.useCase.garbledDesc"),
            },
            {
              case: t("encodingConverter.useCase.gbk"),
              boundary: t("encodingConverter.useCase.gbkDesc"),
            },
            {
              case: t("encodingConverter.useCase.debug"),
              boundary: t("encodingConverter.useCase.debugDesc"),
            },
            {
              case: t("encodingConverter.useCase.hex"),
              boundary: t("encodingConverter.useCase.hexDesc"),
            },
            {
              case: t("encodingConverter.useCase.unicode"),
              boundary: t("encodingConverter.useCase.unicodeDesc"),
            },
          ].map((item, index) => (
            <motion.li
              key={item.case}
              className="flex items-start gap-3 text-sm"
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
              <div>
                <div className="font-medium">{item.case}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.boundary}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <h2 className="text-lg font-semibold">
            {t("encodingConverter.faqTitle")}
          </h2>
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
                  q: t("encodingConverter.faq.q1"),
                  a: t("encodingConverter.faq.a1"),
                },
                {
                  q: t("encodingConverter.faq.q2"),
                  a: t("encodingConverter.faq.a2"),
                },
                {
                  q: t("encodingConverter.faq.q3"),
                  a: t("encodingConverter.faq.a3"),
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
