"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  Hash,
  RotateCcw,
  Shield,
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

interface HashGeneratorToolProps {
  lang: LanguageType;
}

interface ExampleData {
  titleKey: string;
  data: string;
}

const exampleData: ExampleData[] = [
  {
    titleKey: "hashGenerator.examples.simpleText",
    data: "Hello World!",
  },
  {
    titleKey: "hashGenerator.examples.chineseText",
    data: "你好世界！这是一个中文测试。",
  },
  {
    titleKey: "hashGenerator.examples.passwordData",
    data: "MySecurePassword123!",
  },
  {
    titleKey: "hashGenerator.examples.urlData",
    data: "https://example.com/path?param=value&other=data",
  },
];

interface HashResult {
  algorithm: string;
  hash: string;
  titleKey: string;
}

export function HashGeneratorTool({ lang }: HashGeneratorToolProps) {
  const { t } = useTranslation(lang);
  const { spawnItem } = useCat();
  const [input, setInput] = useState("");
  const [hashResults, setHashResults] = useState<HashResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  const toolSectionRef = useRef<HTMLDivElement>(null);

  // Simple hash functions implementation
  const md5 = (str: string): string => {
    const md5 = require("crypto-js/md5");
    return md5(str).toString();
  };

  const sha1 = (str: string): string => {
    const sha1 = require("crypto-js/sha1");
    return sha1(str).toString();
  };

  const sha256 = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const sha512 = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-512", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const generateHashes = useCallback(async () => {
    if (!input.trim()) {
      setHashResults([]);
      setError(null);
      return;
    }

    try {
      setError(null);
      const results: HashResult[] = [];

      // Generate MD5 (synchronous)
      results.push({
        algorithm: "MD5",
        hash: md5(input),
        titleKey: "hashGenerator.algorithms.md5",
      });

      // Generate SHA1 (synchronous)
      results.push({
        algorithm: "SHA1",
        hash: sha1(input),
        titleKey: "hashGenerator.algorithms.sha1",
      });

      // Generate SHA256 (async)
      const sha256Hash = await sha256(input);
      results.push({
        algorithm: "SHA256",
        hash: sha256Hash,
        titleKey: "hashGenerator.algorithms.sha256",
      });

      // Generate SHA512 (async)
      const sha512Hash = await sha512(input);
      results.push({
        algorithm: "SHA512",
        hash: sha512Hash,
        titleKey: "hashGenerator.algorithms.sha512",
      });

      setHashResults(results);
      // 成功生成哈希时生成键盘物品
      if (results.length > 0) {
        spawnItem("keyboard");
      }
    } catch {
      setError(t("hashGenerator.error.generation"));
      setHashResults([]);
    }
  }, [input, t, spawnItem]);

  const copyToClipboard = useCallback(
    async (text: string, algorithm: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(algorithm);
        setTimeout(() => setCopied(null), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
    [],
  );

  const loadExample = useCallback((data: string) => {
    setInput(data);
    setError(null);
    setActiveTab("generate");
    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

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
          {t("hashGenerator.pageTitle")}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("hashGenerator.pageSubtitle")}
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
          {["Free", "No Signup", "Works Offline", "Privacy First"].map(
            (tag) => (
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
            ),
          )}
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
                  {t("common.generate")}
                </TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg">
                  {t("hashGenerator.examples")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <div className="flex items-center justify-between h-8">
                    <label htmlFor="hash-input" className="text-sm font-medium">
                      {t("hashGenerator.inputLabel")}
                    </label>
                    <div className="text-xs text-muted-foreground">
                      {input.length} {t("hashGenerator.characters")}
                    </div>
                  </div>
                  <Textarea
                    placeholder={t("hashGenerator.inputPlaceholder")}
                    className="min-h-[200px] font-mono text-sm rounded-xl"
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
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
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
                      onClick={generateHashes}
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
                      {t("hashGenerator.generateBtn")}
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
                        setHashResults([]);
                        setError(null);
                      }}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {t("common.clear")}
                    </Button>
                  </motion.div>
                </motion.div>

                {hashResults.length > 0 && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  >
                    <h3 className="text-lg font-semibold">
                      {t("hashGenerator.results")}
                    </h3>
                    <div className="grid gap-3">
                      {hashResults.map((result, index) => (
                        <motion.div
                          key={result.algorithm}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          }}
                        >
                          <Card className="bg-muted/30 rounded-xl">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Shield className="h-4 w-4 text-purple-500" />
                                  <span className="font-medium text-sm">
                                    {t(result.titleKey)}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(
                                      result.hash,
                                      result.algorithm,
                                    )
                                  }
                                  className="rounded-lg h-8 px-3"
                                >
                                  <AnimatePresence mode="wait">
                                    {copied === result.algorithm ? (
                                      <motion.span
                                        key="copied"
                                        className="flex items-center text-xs"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                      >
                                        <Check className="h-3 w-3 mr-1" />
                                        {t("common.copied")}
                                      </motion.span>
                                    ) : (
                                      <motion.span
                                        key="copy"
                                        className="flex items-center text-xs"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                      >
                                        <Copy className="h-3 w-3 mr-1" />
                                        {t("common.copy")}
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </Button>
                              </div>
                              <CodeHighlighter
                                code={result.hash}
                                language="javascript"
                                className="text-xs bg-background rounded-lg"
                              />
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("hashGenerator.examplesHint")}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                  {exampleData.map((example, index) => (
                    <motion.div
                      key={example.titleKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
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
          What is Hash Generation?
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">Hash generation</strong> is the
          process of converting input data into a fixed-length string of
          characters using mathematical algorithms. Hashes are commonly used for
          data integrity verification, password storage, and digital signatures.
          Our free online hash generator supports multiple algorithms including
          MD5, SHA-1, SHA-256, and more.
        </motion.p>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          Key Features
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Multiple Algorithms",
              desc: "Support for MD5, SHA-1, SHA-256, SHA-512, and more",
            },
            {
              title: "Real-time Generation",
              desc: "Instant hash calculation as you type",
            },
            {
              title: "Batch Processing",
              desc: "Generate hashes for multiple strings at once",
            },
            {
              title: "100% Secure",
              desc: "All processing happens locally in your browser",
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
          Common Use Cases
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            "Verifying file integrity and detecting changes",
            "Storing passwords securely in databases",
            "Creating digital signatures and certificates",
            "Generating unique identifiers for data",
            "Implementing data structures like hash tables",
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

        {/* Real-World Scenarios */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-xl font-bold mb-6" variants={itemVariants}>
            Real-World Scenarios
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
              File Integrity Verification
            </h4>
            <p className="text-muted-foreground mb-4">
              Software developer downloads a large file and needs to verify it
              wasn't corrupted during download.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  📥 Downloaded File:
                </div>
                <div className="mb-3 font-mono">ubuntu-22.04.iso (2.5 GB)</div>
                <div className="text-muted-foreground mb-2">
                  🔐 Expected Hash (SHA-256):
                </div>
                <div className="mb-3 font-mono text-green-600">
                  a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
                </div>
                <div className="text-muted-foreground mb-2">
                  ✅ Actual Hash Generated:
                </div>
                <div className="font-mono text-green-600">
                  a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Hashes match - file is authentic and
              uncorrupted.
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
              Password Storage System
            </h4>
            <p className="text-muted-foreground mb-4">
              Web application needs to securely store user passwords without
              storing the actual password text.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  🔑 User Password:
                </div>
                <div className="mb-3 font-mono">MySecurePassword123!</div>
                <div className="text-muted-foreground mb-2">
                  🗄️ Database Storage:
                </div>
                <div className="mb-3 font-mono text-green-600">
                  ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
                </div>
                <div className="text-muted-foreground mb-2">
                  🔒 Login Verification:
                </div>
                <div className="text-xs text-muted-foreground">
                  Compare hash of entered password with stored hash
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Even if database is compromised,
              passwords remain secure due to one-way hashing.
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
              Digital Document Verification
            </h4>
            <p className="text-muted-foreground mb-4">
              Legal document needs to prove it hasn't been altered since
              creation.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  📄 Original Document:
                </div>
                <div className="mb-3">contract-v2.pdf (123 KB)</div>
                <div className="text-muted-foreground mb-2">
                  🔐 Document Hash (SHA-256):
                </div>
                <div className="mb-3 font-mono text-green-600">
                  7d865e959b2466918c9863afca942d0f89c6484b44bdd8d4a2d2e351530b4b3f
                </div>
                <div className="text-muted-foreground mb-2">
                  ✅ Later Verification:
                </div>
                <div className="text-xs text-muted-foreground">
                  Calculate hash of received document and compare with original
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Any modification to the document would
              produce a completely different hash value.
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
            How to Generate Hashes
          </motion.h3>

          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                step: "1",
                title: "Choose Hash Algorithm",
                desc: "Select the appropriate hash algorithm (SHA-256 recommended for security, MD5 for compatibility).",
              },
              {
                step: "2",
                title: "Enter Your Data",
                desc: "Type or paste the text, file content, or data you want to hash in the input field.",
              },
              {
                step: "3",
                title: "Generate Hash",
                desc: "Click generate to instantly create the hash value using the selected algorithm.",
              },
              {
                step: "4",
                title: "Copy & Use",
                desc: "Copy the hash value for use in your application, verification process, or security implementation.",
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
                  q: "What is a hash function?",
                  a: "A hash function is a mathematical algorithm that converts input data into a fixed-size string of characters, which appears random. It's commonly used for data integrity verification and password storage.",
                },
                {
                  q: "What are the different hash algorithms available?",
                  a: "We support multiple hash algorithms including MD5, SHA-1, SHA-256, SHA-512, and others. Each has different security levels and use cases, with SHA-256 being the most commonly recommended for security purposes.",
                },
                {
                  q: "Is it safe to hash passwords?",
                  a: "While hashing is better than storing passwords in plain text, modern applications should use specialized password hashing algorithms like bcrypt, scrypt, or Argon2, which include salt and are designed specifically for password storage.",
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

      {/* Information Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* What is */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What is a Hash Generator?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                A hash generator is a cryptographic tool that converts input data into a fixed-size string
                of characters using mathematical algorithms. The output, called a hash or digest, appears
                random and is unique to the input data.
              </p>
              <p>
                Hash functions are fundamental in computer science for data integrity verification, password
                storage, digital signatures, and blockchain technology. Different algorithms provide varying
                levels of security and performance.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Multiple hash algorithms: MD5, SHA-1, SHA-256, SHA-512, and more</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Real-time hash generation as you type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>One-click copy functionality for all generated hashes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Support for both text and file input</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Algorithm comparison for different security needs</span>
              </li>
            </ul>
          </div>

          {/* Common Use Cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Common Use Cases</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>File integrity verification and checksums</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Password hashing for user authentication systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Digital signatures and certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Data deduplication in storage systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Blockchain and cryptocurrency applications</span>
              </li>
            </ul>
          </div>

          {/* Real-World Scenarios */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Real-World Scenarios</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">File Verification:</strong>
                <p>Downloading software and verifying the integrity of files using MD5 or SHA-256 checksums to ensure they haven't been tampered with.</p>
              </div>
              <div>
                <strong className="text-foreground">Version Control:</strong>
                <p>Git uses SHA-1 hashes to identify commits and ensure data integrity in distributed version control systems.</p>
              </div>
              <div>
                <strong className="text-foreground">API Security:</strong>
                <p>Generating HMAC signatures for API authentication and verifying request integrity between client and server.</p>
              </div>
              <div>
                <strong className="text-foreground">Database Indexing:</strong>
                <p>Using hash indexes for fast data retrieval in databases and caching systems for improved performance.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
