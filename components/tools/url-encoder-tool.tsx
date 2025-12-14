"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Link2,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCat } from "@/context/cat-context";
import { type LanguageType, t } from "@/lib/translations";

const exampleUrlData = [
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
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function UrlEncoderTool({ lang = "en" as LanguageType }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("encode");

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

  const loadExample = useCallback((data: string) => {
    setInput(data);
    setError(null);
    setActiveTab("encode");
    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  const swapInputOutput = useCallback(() => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  }, [output, mode]);

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
          <Link2 className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("urlEncoder.pageTitle", lang)}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("urlEncoder.pageSubtitle", lang)}
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

      {/* Tool Section */}
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
                <TabsTrigger value="encode" className="rounded-lg">
                  {t("urlEncoder.encodeTab", lang)}
                </TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg">
                  {t("urlEncoder.examplesTab", lang)}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-6">
                {/* Mode toggle buttons */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.button
                    onClick={() => setMode("encode")}
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Encode
                  </motion.button>
                  <motion.button
                    onClick={() => setMode("decode")}
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Decode
                  </motion.button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 items-start">
                  {/* Input area */}
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between h-8 mb-2">
                      <label
                        htmlFor="url-input"
                        className="text-sm font-medium"
                      >
                        {mode === "encode"
                          ? t("urlEncoder.inputLabel.encode", lang)
                          : t("urlEncoder.inputLabel.decode", lang)}
                      </label>
                    </div>
                    <Textarea
                      id="url-input"
                      placeholder={
                        mode === "encode"
                          ? t("urlEncoder.inputPlaceholder.encode", lang)
                          : t("urlEncoder.inputPlaceholder.decode", lang)
                      }
                      className="min-h-[220px] font-mono text-sm pixel-input resize-none rounded-xl"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-sm text-destructive p-3 bg-destructive/10 rounded-lg border-2 border-destructive/40 mt-2"
                        >
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Output area */}
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between h-8 mb-2">
                      <span className="text-sm font-medium">
                        {t("urlEncoder.outputPlaceholder", lang)}
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
                          className="h-8 text-xs rounded-full border-2 border-transparent hover:border-foreground/30 dark:hover:border-primary/30"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.span
                                key="copied"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center"
                              >
                                <Check className="h-3 w-3 mr-1" /> Copied!
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center"
                              >
                                <Copy className="h-3 w-3 mr-1" /> Copy
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <div className="min-h-[220px] rounded-xl border-2 border-foreground/20 dark:border-primary/20 bg-muted/30 overflow-hidden">
                      {output ? (
                        <CodeHighlighter
                          code={output}
                          language="url"
                          className="min-h-[220px] max-h-[300px]"
                        />
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono">
                          Result will appear here...
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={handleConvert}
                    className="pixel-btn px-5 py-2.5 h-11 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, y: 2 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.span>
                    {mode === "encode" ? "Encode URL" : "Decode URL"}
                  </motion.button>
                  <motion.button
                    onClick={swapInputOutput}
                    className="px-4 py-2.5 h-11 flex items-center gap-2 font-semibold rounded-full border-2 border-foreground/50 dark:border-primary/40 bg-transparent hover:bg-accent transition-colors disabled:opacity-50"
                    style={{ boxShadow: "2px 2px 0 0 var(--foreground)" }}
                    disabled={!output}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      animate={{ rotate: output ? [0, 180] : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </motion.span>
                    Swap & Convert
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setInput("");
                      setOutput("");
                      setError(null);
                    }}
                    className="px-4 py-2.5 h-11 flex items-center font-semibold rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear
                  </motion.button>
                </motion.div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click on an example to load it:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {exampleUrlData.map((example, index) => (
                    <motion.div
                      key={example.title}
                      className="cursor-pointer pixel-card p-4"
                      onClick={() => loadExample(example.data)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="text-sm font-semibold">{example.title}</h4>
                      <p className="text-xs font-mono text-muted-foreground truncate mt-1">
                        {example.data}
                      </p>
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
          What is URL Encoding?
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">URL encoding</strong>, also known
          as percent-encoding, is a mechanism for encoding information in a
          Uniform Resource Identifier (URI). It converts special characters into
          a format that can be transmitted over the Internet. Our free online
          URL encoder/decoder helps you convert URLs and query parameters
          instantly without any installation or signup.
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
              title: "URL Encode",
              desc: "Convert special characters to percent-encoding",
            },
            {
              title: "URL Decode",
              desc: "Restore encoded URLs to readable format",
            },
            {
              title: "Syntax Highlighting",
              desc: "Color-coded output for easy reading",
            },
            {
              title: "100% Private",
              desc: "All processing happens in your browser",
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
            "Encoding query parameters for API requests",
            "Converting non-ASCII characters in URLs",
            "Handling special characters like spaces and ampersands",
            "Debugging encoded URLs in web development",
            "Preparing data for form submissions",
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
            {t("urlEncoder.scenarios.title", lang)}
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
              {t("urlEncoder.scenarios.scenario1.title", lang)}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("urlEncoder.scenarios.scenario1.desc", lang)}
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm">
              <div className="text-muted-foreground mb-2">
                ❌ {t("urlEncoder.scenarios.scenario1.problem", lang)}
              </div>
              <div className="mb-3 text-destructive">
                https://shop.com/search?query=men's shoes & category=athletic
              </div>
              <div className="text-muted-foreground mb-2">
                ✅ {t("urlEncoder.scenarios.scenario1.solution", lang)}
              </div>
              <div className="text-green-600">
                https://shop.com/search?query=men%27s%20shoes%20%26%20category%3Dathletic
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Solution:</strong>{" "}
              {t("urlEncoder.scenarios.scenario1.result", lang)}
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
              International Character Support
            </h4>
            <p className="text-muted-foreground mb-4">
              Your web app needs to handle user searches containing Chinese,
              Japanese, or other Unicode characters.
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm">
              <div className="text-muted-foreground mb-2">
                Original Search Term:
              </div>
              <div className="mb-3">开发ツール + 在线服务</div>
              <div className="text-muted-foreground mb-2">URL Encoded:</div>
              <div className="text-green-600">
                %E5%BC%80%E5%8F%91%E3%83%84%E3%83%BC%E3%83%AB%20%2B%20%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Solution:</strong> Encode Unicode characters to ensure
              they're properly transmitted in URLs.
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
              Social Media Sharing
            </h4>
            <p className="text-muted-foreground mb-4">
              Creating shareable links for social media posts that include
              dynamic content.
            </p>
            <div className="bg-background p-4 rounded-lg border font-mono text-sm">
              <div className="text-muted-foreground mb-2">
                Dynamic Share URL:
              </div>
              <div className="mb-3">
                https://app.com/share?title=Check this out!&text=Amazing article
                about web development
              </div>
              <div className="text-muted-foreground mb-2">
                Social Media Ready:
              </div>
              <div className="text-green-600">
                https://app.com/share?title=Check%20this%20out%21&amp;text=Amazing%20article%20about%20web%20development
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Solution:</strong> Encode parameters to prevent URL
              breaking and ensure proper social media integration.
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
            How to Use URL Encoding
          </motion.h3>

          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                step: "1",
                title: "Enter Your URL or Text",
                desc: "Paste your URL or enter the text that needs encoding/decoding in the input field above.",
              },
              {
                step: "2",
                title: "Choose Encode or Decode",
                desc: "Select 'Encode' to convert special characters, or 'Decode' to convert encoded URLs back to readable format.",
              },
              {
                step: "3",
                title: "Click Convert",
                desc: "Click the convert button to instantly see the encoded or decoded result in the output field.",
              },
              {
                step: "4",
                title: "Copy and Use",
                desc: "Copy the result and use it in your web applications, API calls, or documentation.",
              },
            ].map((item, _index) => (
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
                  q: "What is URL encoding?",
                  a: "URL encoding converts characters into a format that can be transmitted over the Internet. Special characters are replaced with a '%' followed by two hexadecimal digits.",
                },
                {
                  q: "When should I use URL encoding?",
                  a: "Use URL encoding when your URL contains special characters like spaces, ampersands (&), or non-ASCII characters like Chinese or Japanese text.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes, all encoding and decoding happens entirely in your browser. Your data is never sent to any server.",
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
