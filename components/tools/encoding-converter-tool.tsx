"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface EncodingConverterToolProps {
  lang: LanguageType;
}

const encodings = [
  { value: "utf-8", label: "UTF-8" },
  { value: "utf-16", label: "UTF-16" },
  { value: "ascii", label: "ASCII" },
  { value: "iso-8859-1", label: "ISO-8859-1 (Latin-1)" },
  { value: "hex", label: "Hex" },
  { value: "binary", label: "Binary" },
  { value: "unicode-escape", label: "Unicode Escape (\\uXXXX)" },
];

const exampleData = [
  { titleKey: "encodingConverter.examples.chinese", data: "你好世界！Hello World!" },
  { titleKey: "encodingConverter.examples.japanese", data: "こんにちは世界" },
  { titleKey: "encodingConverter.examples.mixed", data: "Héllo Wörld 你好 🌍" },
];

function textToHex(text: string): string {
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code > 0xffff) {
        // Handle surrogate pairs for emoji
        const hi = Math.floor((code - 0x10000) / 0x400) + 0xd800;
        const lo = ((code - 0x10000) % 0x400) + 0xdc00;
        return hi.toString(16).padStart(4, "0") + " " + lo.toString(16).padStart(4, "0");
      }
      return code.toString(16).padStart(code > 255 ? 4 : 2, "0");
    })
    .join(" ");
}

function hexToText(hex: string): string {
  const codes = hex.trim().split(/\s+/).map((h) => parseInt(h, 16));
  let result = "";
  for (let i = 0; i < codes.length; i++) {
    if (codes[i] >= 0xd800 && codes[i] <= 0xdbff && i + 1 < codes.length) {
      // Surrogate pair
      const hi = codes[i];
      const lo = codes[i + 1];
      if (lo >= 0xdc00 && lo <= 0xdfff) {
        result += String.fromCodePoint((hi - 0xd800) * 0x400 + (lo - 0xdc00) + 0x10000);
        i++;
        continue;
      }
    }
    result += String.fromCharCode(codes[i]);
  }
  return result;
}

function textToBinary(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary: string): string {
  const bytes = binary.trim().split(/\s+/).map((b) => parseInt(b, 2));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

function textToUnicodeEscape(text: string): string {
  return Array.from(text)
    .map((char) => {
      const code = char.codePointAt(0);
      if (code === undefined) return "";
      if (code > 0xffff) {
        return `\\u{${code.toString(16).toUpperCase()}}`;
      }
      if (code > 127) {
        return `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
      }
      return char;
    })
    .join("");
}

function unicodeEscapeToText(escaped: string): string {
  return escaped.replace(/\\u\{([0-9A-Fa-f]+)\}|\\u([0-9A-Fa-f]{4})/g, (_, p1, p2) => {
    return String.fromCodePoint(parseInt(p1 || p2, 16));
  });
}

export function EncodingConverterTool({ lang }: EncodingConverterToolProps) {
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
  const [sourceEncoding, setSourceEncoding] = useState("utf-8");
  const [targetEncoding, setTargetEncoding] = useState("hex");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("convert");
  const [viewMode, setViewMode] = useState<"text" | "hex">("text");

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      setError(null);
      let text = input;

      // First decode from source encoding to text
      if (sourceEncoding === "hex") {
        text = hexToText(input);
      } else if (sourceEncoding === "binary") {
        text = binaryToText(input);
      } else if (sourceEncoding === "unicode-escape") {
        text = unicodeEscapeToText(input);
      }

      // Then encode to target encoding
      let result = "";
      if (targetEncoding === "hex") {
        result = textToHex(text);
      } else if (targetEncoding === "binary") {
        result = textToBinary(text);
      } else if (targetEncoding === "unicode-escape") {
        result = textToUnicodeEscape(text);
      } else if (targetEncoding === "utf-8") {
        result = text;
      } else if (targetEncoding === "utf-16") {
        result = Array.from(text)
          .map((char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`)
          .join("");
      } else if (targetEncoding === "ascii") {
        // biome-ignore lint/suspicious/noControlCharactersInRegex: intentional ASCII range check
        result = text.replace(/[^\x00-\x7F]/g, "?");
      } else if (targetEncoding === "iso-8859-1") {
        // biome-ignore lint/suspicious/noControlCharactersInRegex: intentional Latin-1 range check
        result = text.replace(/[^\x00-\xFF]/g, "?");
      } else {
        result = text;
      }

      setOutput(result);

      if (shouldSpawnItem()) {
        spawnItem("book");
      }
    } catch {
      setError(t("encodingConverter.error.converting"));
      setOutput("");
    }
  }, [input, sourceEncoding, targetEncoding, t, spawnItem, shouldSpawnItem]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const loadExample = useCallback((data: string) => {
    setInput(data);
    setError(null);
    setActiveTab("convert");
    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  const swapEncodings = useCallback(() => {
    setSourceEncoding(targetEncoding);
    setTargetEncoding(sourceEncoding);
    setInput(output);
    setOutput("");
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
          {["Free", "No Signup", "Works Offline", "Privacy First"].map((tag) => (
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 rounded-xl">
                <TabsTrigger value="convert" className="rounded-lg">
                  {t("encodingConverter.convert")}
                </TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg">
                  {t("encodingConverter.examples")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="convert" className="space-y-4">
                {/* Encoding selectors */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex-1 min-w-[150px]">
                    <span className="text-sm font-medium block mb-2">
                      {t("encodingConverter.sourceEncoding")}
                    </span>
                    <Select value={sourceEncoding} onValueChange={setSourceEncoding}>
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
                    <Select value={targetEncoding} onValueChange={setTargetEncoding}>
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
                      onChange={(e) => setInput(e.target.value)}
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
                                <Check className="h-4 w-4 mr-1" /> {t("common.copied")}
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                className="flex items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Copy className="h-4 w-4 mr-1" /> {t("common.copy")}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <div className="min-h-[300px] rounded-xl border-2 border-border bg-muted/30 overflow-hidden">
                      {output ? (
                        <CodeHighlighter
                          code={viewMode === "hex" ? textToHex(output) : output}
                          language="javascript"
                          className="min-h-[300px] max-h-[400px]"
                        />
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono">
                          {t("encodingConverter.outputPlaceholder")}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button onClick={convert} className="gap-2 rounded-xl h-11">
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
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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

              <TabsContent value="examples" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("encodingConverter.examplesHint")}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {exampleData.map((example, index) => (
                    <motion.div
                      key={example.titleKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer hover:border-accent transition-colors rounded-xl"
                        onClick={() => loadExample(example.data)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">
                            {t(example.titleKey)}
                          </CardTitle>
                          <CardDescription className="text-xs font-mono truncate">
                            {example.data}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
          What is Character Encoding?
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">Character encoding</strong> is a system
          that maps characters to bytes for storage and transmission. Different
          encodings like UTF-8, GBK, and ISO-8859-1 represent characters differently,
          which can cause "mojibake" (garbled text) when data is decoded with the
          wrong encoding.
        </motion.p>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          Common Use Cases
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            "Fixing garbled text from incorrect encoding",
            "Converting legacy GBK data to UTF-8",
            "Debugging character encoding issues",
            "Viewing hex representation of text",
            "Converting between Unicode formats",
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
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
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
                  q: "What is the difference between UTF-8 and UTF-16?",
                  a: "UTF-8 uses 1-4 bytes per character and is backward compatible with ASCII. UTF-16 uses 2 or 4 bytes. UTF-8 is more common on the web, while UTF-16 is used internally by Windows and Java.",
                },
                {
                  q: "How do I fix garbled Chinese text?",
                  a: "Garbled Chinese usually means the text was encoded in GBK but decoded as UTF-8 (or vice versa). Try converting from the original encoding to UTF-8.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes, all encoding conversion happens locally in your browser. Your data is never sent to any server.",
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
