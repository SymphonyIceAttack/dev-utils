"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Copy,
  Hash,
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

interface Md5GeneratorToolProps {
  lang: LanguageType;
}

const exampleData = [
  { titleKey: "md5Generator.examples.simpleText", data: "Hello World!" },
  { titleKey: "md5Generator.examples.password", data: "MySecurePassword123" },
  {
    titleKey: "md5Generator.examples.fileChecksum",
    data: "The quick brown fox jumps over the lazy dog",
  },
];

// Simple MD5 implementation
function md5(input: string): string {
  function rotateLeft(x: number, n: number): number {
    return (x << n) | (x >>> (32 - n));
  }

  function addUnsigned(x: number, y: number): number {
    const x4 = x & 0x80000000;
    const y4 = y & 0x80000000;
    const x8 = x & 0x40000000;
    const y8 = y & 0x40000000;
    const result = (x & 0x3fffffff) + (y & 0x3fffffff);
    if (x8 & y8) return result ^ 0x80000000 ^ x4 ^ y4;
    if (x8 | y8) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x4 ^ y4;
      return result ^ 0x40000000 ^ x4 ^ y4;
    }
    return result ^ x4 ^ y4;
  }

  function f(x: number, y: number, z: number): number {
    return (x & y) | (~x & z);
  }
  function g(x: number, y: number, z: number): number {
    return (x & z) | (y & ~z);
  }
  function h(x: number, y: number, z: number): number {
    return x ^ y ^ z;
  }
  function i(x: number, y: number, z: number): number {
    return y ^ (x | ~z);
  }

  function ff(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number,
  ): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function gg(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number,
  ): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function hh(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number,
  ): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function ii(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number,
  ): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str: string): number[] {
    const lWordCount: number[] = [];
    const lMessageLength = str.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 =
      (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    for (let i = 0; i < lNumberOfWords; i++) lWordCount[i] = 0;
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      const lWordPosition = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordCount[lWordPosition] =
        lWordCount[lWordPosition] |
        (str.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    const lWordPosition = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordCount[lWordPosition] =
      lWordCount[lWordPosition] | (0x80 << lBytePosition);
    lWordCount[lNumberOfWords - 2] = lMessageLength << 3;
    lWordCount[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordCount;
  }

  function wordToHex(value: number): string {
    let result = "";
    for (let i = 0; i <= 3; i++) {
      const byte = (value >>> (i * 8)) & 255;
      result += `0${byte.toString(16)}`.slice(-2);
    }
    return result;
  }

  function utf8Encode(str: string): string {
    str = str.replace(/\r\n/g, "\n");
    let utftext = "";
    for (let n = 0; n < str.length; n++) {
      const c = str.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  const x = convertToWordArray(utf8Encode(input));
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  const S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  const S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  const S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a,
      BB = b,
      CC = c,
      DD = d;
    a = ff(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = ff(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = ff(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = ff(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = ff(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = ff(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = ff(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = ff(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = ff(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = ff(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = ff(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = ff(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = ff(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = ff(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = ff(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = ff(b, c, d, a, x[k + 15], S14, 0x49b40821);
    a = gg(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = gg(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = gg(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = gg(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = gg(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = gg(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = gg(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = gg(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = gg(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = gg(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = gg(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = gg(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = gg(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = gg(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = gg(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = gg(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
    a = hh(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = hh(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = hh(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = hh(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = hh(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = hh(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = hh(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = hh(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = hh(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = hh(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = hh(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = hh(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = hh(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = hh(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = hh(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = hh(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
    a = ii(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = ii(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = ii(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = ii(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = ii(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = ii(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = ii(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = ii(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = ii(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = ii(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = ii(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = ii(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = ii(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = ii(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = ii(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = ii(b, c, d, a, x[k + 9], S44, 0xeb86d391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return (
    wordToHex(a) +
    wordToHex(b) +
    wordToHex(c) +
    wordToHex(d)
  ).toLowerCase();
}

export function Md5GeneratorTool({ lang }: Md5GeneratorToolProps) {
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
  const [uppercase, setUppercase] = useState(false);
  const [bit16, setBit16] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [batchMode, setBatchMode] = useState(false);
  const [batchInputs, setBatchInputs] = useState<string[]>([""]);
  const [batchOutputs, setBatchOutputs] = useState<string[]>([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [showFaq, setShowFaq] = useState(true); // 默认展开FAQ
  const [generationStats, setGenerationStats] = useState({
    totalGenerations: 0,
    uppercaseCount: 0,
    bit16Count: 0,
    batchCount: 0,
    lastUsed: null as Date | null,
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const generateMd5 = useCallback(() => {
    if (batchMode) {
      // Batch mode
      const validInputs = batchInputs.filter((input) => input.trim());
      if (validInputs.length === 0) {
        setBatchOutputs([]);
        return;
      }

      const results = validInputs.map((text) => {
        let hash = md5(text);

        if (bit16) {
          hash = hash.substring(8, 24);
        }

        if (uppercase) {
          hash = hash.toUpperCase();
        }

        return hash;
      });

      setBatchOutputs(results);
    } else {
      // Single mode
      if (!input.trim()) {
        setOutput("");
        return;
      }

      let hash = md5(input);

      if (bit16) {
        hash = hash.substring(8, 24);
      }

      if (uppercase) {
        hash = hash.toUpperCase();
      }

      setOutput(hash);
    }

    if (shouldSpawnItem()) {
      spawnItem("keyboard");
    }

    // Update statistics
    setGenerationStats((prev) => ({
      totalGenerations: prev.totalGenerations + 1,
      uppercaseCount: uppercase ? prev.uppercaseCount + 1 : prev.uppercaseCount,
      bit16Count: bit16 ? prev.bit16Count + 1 : prev.bit16Count,
      batchCount: batchMode ? prev.batchCount + 1 : prev.batchCount,
      lastUsed: new Date(),
    }));

    // Clear the needs update flag after successful generation
    setNeedsUpdate(false);
  }, [
    input,
    batchMode,
    batchInputs,
    uppercase,
    bit16,
    spawnItem,
    shouldSpawnItem,
  ]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const copyToClipboardText = useCallback(async (text: string) => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const loadExample = useCallback(
    (data: string) => {
      setInput(data);
      setActiveTab("generate");

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

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        // For small files, read as text and hash the content
        if (file.size <= 10 * 1024 * 1024) {
          // 10MB limit for text processing
          const text = await file.text();
          setInput(text);
          setUploadedFileName(file.name);
          setActiveTab("generate");
        } else {
          // For larger files, we would need a different approach
          // For now, show an error message
          alert(
            "File too large for text processing. Please use a file smaller than 10MB.",
          );
        }
      } catch (error) {
        console.error("Error reading file:", error);
        alert("Error reading file. Please try again.");
      }
    },
    [],
  );

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
          <Hash className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("md5Generator.pageTitle")}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("md5Generator.pageSubtitle")}
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
            t("badge.fileChecksums"),
            t("badge.batchProcessing"),
            t("badge.fileUpload"),
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
                <TabsTrigger value="generate" className="rounded-lg">
                  {t("md5Generator.generate")}
                </TabsTrigger>
                <TabsTrigger value="file" className="rounded-lg">
                  {t("md5Generator.fileUpload")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={uppercase ? "default" : "outline"}
                        onClick={() => setUppercase(!uppercase)}
                        className="gap-2 rounded-xl h-11"
                      >
                        {t("md5Generator.uppercase")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={bit16 ? "default" : "outline"}
                        onClick={() => setBit16(!bit16)}
                        className="gap-2 rounded-xl h-11"
                      >
                        {bit16
                          ? t("md5Generator.bit16")
                          : t("md5Generator.bit32")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={batchMode ? "default" : "outline"}
                        onClick={() => {
                          setBatchMode(!batchMode);
                          if (!batchMode) {
                            setBatchInputs([""]);
                            setBatchOutputs([]);
                            setOutput("");
                          }
                        }}
                        className="gap-2 rounded-xl h-11"
                      >
                        {batchMode
                          ? t("md5Generator.mode.single")
                          : t("md5Generator.mode.batch")}
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
                      {generationStats.totalGenerations} Generated
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      {generationStats.batchCount} Batch
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {generationStats.uppercaseCount} Upper
                    </motion.div>
                    {generationStats.lastUsed && (
                      <motion.div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        title={`Last used: ${generationStats.lastUsed.toLocaleString()}`}
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        {generationStats.lastUsed.toLocaleTimeString()}
                      </motion.div>
                    )}
                  </motion.div>
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
                        {batchMode
                          ? t("md5Generator.batchInput")
                          : t("md5Generator.inputLabel")}
                      </span>
                      {batchMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setBatchInputs([...batchInputs, ""])}
                          className="rounded-lg h-7"
                        >
                          {t("md5Generator.addRow")}
                        </Button>
                      )}
                    </div>

                    {!batchMode ? (
                      <Textarea
                        placeholder={t("md5Generator.inputPlaceholder")}
                        className="min-h-[300px] font-mono text-sm rounded-xl"
                        value={input}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setInput(newValue);

                          // Mark as needing update if input changes and we have output
                          if (newValue !== input && output) {
                            setNeedsUpdate(true);
                          }
                        }}
                      />
                    ) : (
                      <div className="space-y-2 max-h-[300px] overflow-auto">
                        {batchInputs.map((batchInput, index) => (
                          <div key={index} className="flex gap-2">
                            <Textarea
                              placeholder={`Input ${index + 1}`}
                              className="font-mono text-sm rounded-xl"
                              value={batchInput}
                              onChange={(e) => {
                                const newInputs = [...batchInputs];
                                newInputs[index] = e.target.value;
                                setBatchInputs(newInputs);
                                setBatchOutputs([]); // Clear batch outputs when input changes
                              }}
                            />
                            {batchInputs.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newInputs = batchInputs.filter(
                                    (_, i) => i !== index,
                                  );
                                  setBatchInputs(newInputs);
                                }}
                                className="rounded-lg h-10 w-10 p-0"
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {batchMode
                          ? t("md5Generator.batchOutput")
                          : t("md5Generator.outputLabel")}
                      </span>
                      {batchMode && batchOutputs.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboardText(batchOutputs.join("\n"))
                          }
                          className="rounded-lg"
                        >
                          <Copy className="h-4 w-4 mr-1" />{" "}
                          {t("md5Generator.copyAll")}
                        </Button>
                      )}
                    </div>

                    {!batchMode ? (
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
                            {t("md5Generator.outputPlaceholder")}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`
                        min-h-[300px] rounded-xl border-2 overflow-hidden transition-all duration-300 p-4
                        ${
                          needsUpdate
                            ? "border-amber-300 bg-amber-50/30 dark:border-amber-600/30 dark:bg-amber-950/20"
                            : "border-foreground/20 bg-muted/30"
                        }
                      `}
                      >
                        {batchOutputs.length > 0 ? (
                          <div>
                            {needsUpdate && (
                              <div className="flex items-center gap-2 p-3 bg-amber-100/80 dark:bg-amber-900/20 border-b border-amber-300 dark:border-amber-600/30 mb-4">
                                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                <span className="text-sm text-amber-800 dark:text-amber-200">
                                  {t("common.needsUpdate")}
                                </span>
                              </div>
                            )}
                            <div className="space-y-2">
                              {batchOutputs.map((hash, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between py-1 font-mono text-sm"
                                >
                                  <span className="flex-1 mr-2">{hash}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboardText(hash)}
                                    className="h-6 w-6 p-0"
                                    aria-label={t("common.copy")}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                            {t("md5Generator.batchPlaceholder")}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={generateMd5}
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
                      {t("md5Generator.generate")}
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
                      }}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {t("common.clear")}
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="file" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={uppercase ? "default" : "outline"}
                        onClick={() => setUppercase(!uppercase)}
                        className="gap-2 rounded-xl h-11"
                      >
                        {t("md5Generator.uppercase")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={bit16 ? "default" : "outline"}
                        onClick={() => setBit16(!bit16)}
                        className="gap-2 rounded-xl h-11"
                      >
                        {bit16
                          ? t("md5Generator.bit16")
                          : t("md5Generator.bit32")}
                      </Button>
                    </motion.div>
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
                          {t("md5Generator.fileUpload.title")}
                        </span>
                      </div>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          accept=".txt,.md,.json,.csv,.xml,.html,.css,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.swift,.kt,.scala,.clj,.erl,.ex"
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">
                            {t("md5Generator.fileUpload.click")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {t("md5Generator.fileUpload.hint")}
                          </span>
                        </label>
                      </div>
                      {uploadedFileName && (
                        <p className="text-sm text-muted-foreground">
                          {t("md5Generator.fileUpload.uploaded").replace(
                            "{name}",
                            uploadedFileName,
                          )}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between h-8">
                        <span className="text-sm font-medium">
                          {t("md5Generator.outputLabel")}
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
                        min-h-[200px] rounded-xl border-2 overflow-hidden transition-all duration-300
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
                              className={`min-h-[200px] max-h-[300px] ${needsUpdate ? "opacity-90" : ""}`}
                            />
                          </div>
                        ) : (
                          <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                            {t("md5Generator.outputPlaceholder")}
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
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        onClick={generateMd5}
                        className="gap-2 rounded-xl h-11"
                        disabled={!input.trim()}
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
                        {t("md5Generator.generate")}
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
                          setUploadedFileName("");
                        }}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {t("common.clear")}
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
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
              {t("md5Generator.exampleInputs")}
            </motion.h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("md5Generator.examplesHint")}
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
                          e.stopPropagation(); // Prevent triggering parent onClick (now stretched link)
                          loadExample(example.data);
                          // Note: Do NOT auto-generate, let user manually click generate button
                        }}
                        className="pixel-btn px-3 py-1 text-xs h-7"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={t("md5Generator.loadExample")}
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
          {t("md5Generator.seo.title")}
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: t("md5Generator.seo.desc") }}
        />

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("md5Generator.tech.title")}
        </motion.h3>
        <motion.div
          className="bg-muted/30 rounded-xl p-4 mb-6"
          variants={itemVariants}
        >
          <div className="grid gap-4 text-sm">
            <div>
              <strong>{t("md5Generator.tech.coreTitle")}</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>{t("md5Generator.tech.coreList1")}</li>
                <li>{t("md5Generator.tech.coreList2")}</li>
                <li>{t("md5Generator.tech.coreList3")}</li>
                <li>{t("md5Generator.tech.coreList4")}</li>
              </ul>
            </div>
            <div>
              <strong>{t("md5Generator.tech.stepsTitle")}</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>{t("md5Generator.tech.stepsList1")}</li>
                <li>{t("md5Generator.tech.stepsList2")}</li>
                <li>{t("md5Generator.tech.stepsList3")}</li>
                <li>{t("md5Generator.tech.stepsList4")}</li>
                <li>{t("md5Generator.tech.stepsList5")}</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("md5Generator.features.title")}
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("md5Generator.feature.checksums.title"),
              desc: t("md5Generator.feature.checksums.desc"),
            },
            {
              title: t("md5Generator.feature.batch.title"),
              desc: t("md5Generator.feature.batch.desc"),
            },
            {
              title: t("md5Generator.feature.upload.title"),
              desc: t("md5Generator.feature.upload.desc"),
            },
            {
              title: t("md5Generator.feature.privacy.title"),
              desc: t("md5Generator.feature.privacy.desc"),
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
          {t("md5Generator.useCases.title")}
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            {
              case: t("md5Generator.useCases.item1"),
              boundary: t("md5Generator.useCases.boundary1"),
            },
            {
              case: t("md5Generator.useCases.item2"),
              boundary: t("md5Generator.useCases.boundary2"),
            },
            {
              case: t("md5Generator.useCases.item3"),
              boundary: t("md5Generator.useCases.boundary3"),
            },
            {
              case: t("md5Generator.useCases.item4"),
              boundary: t("md5Generator.useCases.boundary4"),
            },
            {
              case: t("md5Generator.useCases.item5"),
              boundary: t("md5Generator.useCases.boundary5"),
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
            {t("md5Generator.faq.title")}
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
                  q: t("md5Generator.faq.q1"),
                  a: t("md5Generator.faq.a1"),
                },
                {
                  q: t("md5Generator.faq.q2"),
                  a: t("md5Generator.faq.a2"),
                },
                {
                  q: t("md5Generator.faq.q3"),
                  a: t("md5Generator.faq.a3"),
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
