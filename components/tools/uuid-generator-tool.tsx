"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy, Shuffle, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCat } from "@/context/cat-context";
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

export function UuidGeneratorTool({ lang = "en" as LanguageType }) {
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  const toolSectionRef = useRef<HTMLDivElement>(null);
  const { spawnItem } = useCat();

  // Generate a UUID v4 (random)
  const generateUuid = useCallback(() => {
    if (typeof window === "undefined") return "";

    // Use crypto.randomUUID() if available
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback implementation
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }

    // Set version and variant
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    // Format as UUID string
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
  }, []);

  // Generate single UUID
  const handleGenerateSingle = useCallback(() => {
    const uuid = generateUuid();
    if (uuid) {
      setGeneratedUuids((prev) => [uuid, ...prev]);

      // Generate coffee item when UUID is created
      spawnItem("coffee");
    }
  }, [generateUuid, spawnItem]);

  // Generate multiple UUIDs
  const handleGenerateMultiple = useCallback(
    (count: number) => {
      const newUuids: string[] = [];
      for (let i = 0; i < count; i++) {
        const uuid = generateUuid();
        if (uuid) {
          newUuids.push(uuid);
        }
      }

      setGeneratedUuids((prev) => [...newUuids, ...prev]);

      // Generate coffee item for batch generation
      spawnItem("coffee");
    },
    [generateUuid, spawnItem],
  );

  // Copy UUID to clipboard
  const copyToClipboard = useCallback(async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy UUID: ", err);
    }
  }, []);

  // Clear all generated UUIDs
  const clearAll = useCallback(() => {
    setGeneratedUuids([]);
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
          <Shuffle className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          UUID Generator
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Generate unique UUIDs (v4) instantly. Copy and use in your
          applications.
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
                  Generate
                </TabsTrigger>
                <TabsTrigger value="batch" className="rounded-lg">
                  Batch
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-6">
                {/* Generate Button */}
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={handleGenerateSingle}
                      className="gap-2 rounded-xl h-11 px-6"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      Generate UUID
                    </Button>
                  </motion.div>
                </div>

                {/* Generated UUIDs */}
                {generatedUuids.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Generated UUIDs ({generatedUuids.length})
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAll}
                        className="gap-2"
                      >
                        Clear All
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {generatedUuids.map((uuid, index) => (
                        <motion.div
                          key={`${uuid}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border"
                        >
                          <CodeHighlighter
                            code={uuid}
                            language="javascript"
                            className="flex-1 text-sm"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(uuid, index)}
                            className="rounded-lg"
                          >
                            <AnimatePresence mode="wait">
                              {copiedIndex === index ? (
                                <motion.span
                                  key="copied"
                                  className="flex items-center"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Copied
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="copy"
                                  className="flex items-center"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="batch" className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Generate multiple UUIDs at once
                  </p>
                  <div className="flex gap-2 justify-center">
                    {[5, 10, 20, 50].map((count) => (
                      <Button
                        key={count}
                        variant="outline"
                        onClick={() => handleGenerateMultiple(count)}
                        className="gap-2"
                      >
                        {count} UUIDs
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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
                  q: "What is UUID?",
                  a: "UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems.",
                },
                {
                  q: "What version of UUID is generated?",
                  a: "This tool generates UUID version 4, which uses random numbers for guaranteed uniqueness.",
                },
                {
                  q: "Are generated UUIDs unique?",
                  a: "UUID v4 has a very low probability of collision, making it practically unique for most applications.",
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
            <h2 className="text-xl font-semibold">What is a UUID Generator?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                A UUID (Universally Unique Identifier) generator is a tool that creates
                128-bit identifiers that are guaranteed to be unique across time and space.
                These identifiers are essential for distributed systems where uniqueness
                must be maintained without central coordination.
              </p>
              <p>
                UUIDs are widely used in software development for database keys,
                session IDs, transaction IDs, and any scenario where you need to
                ensure that identifiers won't collide.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Generate RFC 4122 compliant UUID v4 identifiers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Batch generation of multiple UUIDs at once</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>One-click copying of generated UUIDs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Multiple output formats (standard, uppercase, with/without hyphens)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Instant generation with no network requests required</span>
              </li>
            </ul>
          </div>

          {/* Common Use Cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Common Use Cases</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Database primary keys for distributed systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Session identifiers for web applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Transaction IDs for logging and debugging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>File names for temporary or cached files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>API keys and authentication tokens</span>
              </li>
            </ul>
          </div>

          {/* Real-World Scenarios */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Real-World Scenarios</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Microservices Architecture:</strong>
                <p>Generating unique order IDs across multiple services without database coordination, ensuring no conflicts in distributed transaction processing.</p>
              </div>
              <div>
                <strong className="text-foreground">E-commerce Platforms:</strong>
                <p>Creating unique user session IDs and shopping cart identifiers that persist across different servers and load balancers.</p>
              </div>
              <div>
                <strong className="text-foreground">Content Management:</strong>
                <p>Assigning unique identifiers to uploaded files, documents, and media assets that may be stored across multiple storage systems.</p>
              </div>
              <div>
                <strong className="text-foreground">API Development:</strong>
                <p>Generating correlation IDs for request tracing across multiple microservices, enabling better debugging and monitoring.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
