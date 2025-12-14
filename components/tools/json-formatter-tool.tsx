"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  FileJson,
  Minimize2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  analyzeJsonIssues,
  formatValidationErrors,
  type ValidationResult,
  validateJson,
} from "@/lib/json-validator";
import { type LanguageType, t } from "@/lib/translations";

interface JsonFormatterToolProps {
  lang: LanguageType;
}

const exampleJsonData = [
  {
    key: "apiResponse",
    title: "API Response",
    data: '{"status":"success","data":{"user":{"id":1,"name":"John Doe","email":"john@example.com"},"timestamp":"2024-01-15T10:30:00Z"}}',
  },
  {
    key: "configFile",
    title: "Config File",
    data: '{"name":"my-app","version":"1.0.0","dependencies":{"react":"^18.2.0","next":"^14.0.0"}}',
  },
  {
    key: "arrayData",
    title: "Array Data",
    data: '[{"id":1,"product":"Laptop","price":999},{"id":2,"product":"Phone","price":699},{"id":3,"product":"Tablet","price":449}]',
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function JsonFormatterTool({ lang }: JsonFormatterToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("format");
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [jsonIssues, setJsonIssues] = useState<string[]>([]);

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const { spawnItem } = useCat();

  useEffect(() => {
    if (!input.trim()) {
      setValidation(null);
      setJsonIssues([]);
      return;
    }

    const timer = setTimeout(() => {
      const result = validateJson(input);
      setValidation(result);

      if (!result.valid) {
        const issues = analyzeJsonIssues(input);
        setJsonIssues(issues.suggestions);
      } else {
        setJsonIssues([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  const formatJson = useCallback(() => {
    if (validation && validation.valid && validation.parsed) {
      setOutput(JSON.stringify(validation.parsed, null, 2));
      setError(null);
      spawnItem("yarn");
    } else {
      const result = validateJson(input);
      if (result.valid) {
        setOutput(JSON.stringify(result.parsed, null, 2));
        setError(null);
        spawnItem("yarn");
      } else {
        setError(formatValidationErrors(result.errors || []));
        setOutput("");
      }
    }
  }, [input, validation, spawnItem]);

  const minifyJson = useCallback(() => {
    if (validation && validation.valid && validation.parsed) {
      setOutput(JSON.stringify(validation.parsed));
      setError(null);
      spawnItem("yarn");
    } else {
      const result = validateJson(input);
      if (result.valid) {
        setOutput(JSON.stringify(result.parsed));
        setError(null);
        spawnItem("yarn");
      } else {
        setError(formatValidationErrors(result.errors || []));
        setOutput("");
      }
    }
  }, [input, validation, spawnItem]);

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
    setActiveTab("format");
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
          <FileJson className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("jsonFormatter.pageTitle", lang)}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("jsonFormatter.pageSubtitle", lang)}
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
                <TabsTrigger value="format" className="rounded-lg">
                  Format
                </TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg">
                  {t("jsonFormatter.examples", lang)}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="format" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("jsonFormatter.inputLabel", lang)}
                      </span>
                      <AnimatePresence mode="wait">
                        {input.trim() && validation && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                              validation.valid
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {validation.valid ? (
                              <>
                                <CheckCircle2 className="h-3 w-3" />
                                {t("jsonFormatter.valid", lang)}
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3" />
                                {t("jsonFormatter.invalid", lang)}
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Textarea
                      placeholder={t("jsonFormatter.placeholder", lang)}
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
                          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <pre className="whitespace-pre-wrap text-xs">
                            {error}
                          </pre>
                        </motion.div>
                      )}
                      {jsonIssues.length > 0 && !error && (
                        <motion.div
                          className="text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="font-medium mb-1">
                            {t("jsonFormatter.possibleIssues", lang)}
                          </p>
                          <ul className="list-disc list-inside text-xs space-y-1">
                            {jsonIssues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">Output</span>
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
                                <Check className="h-4 w-4 mr-1" /> Copied!
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
                                {t("jsonFormatter.copyBtn", lang)}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <div className="min-h-[300px] rounded-xl border-2 border-border bg-muted/30 overflow-hidden">
                      {output ? (
                        <CodeHighlighter
                          code={output}
                          language="json"
                          className="min-h-[300px] max-h-[400px]"
                        />
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono">
                          {t("jsonFormatter.outputPlaceholder", lang)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
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
                      onClick={formatJson}
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
                      {t("jsonFormatter.formatBtn", lang)}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="outline"
                      onClick={minifyJson}
                      className="gap-2 bg-transparent rounded-xl h-11"
                    >
                      <Minimize2 className="h-4 w-4" />
                      {t("jsonFormatter.minifyBtn", lang)}
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
                        setValidation(null);
                        setJsonIssues([]);
                      }}
                    >
                      {t("jsonFormatter.clearBtn", lang)}
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("jsonFormatter.examplesHint", lang)}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {exampleJsonData.map((example, index) => (
                    <motion.div
                      key={example.title}
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
                            {t(`jsonFormatter.examples.${example.key}`, lang)}
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
          What is JSON Formatting?
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">JSON formatting</strong> is the
          process of organizing and beautifying JavaScript Object Notation
          (JSON) data to make it more readable and easier to understand. Our
          free online JSON formatter validates, formats, and minifies JSON data
          instantly. Perfect for developers working with APIs, configuration
          files, and data exchange.
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
              title: "JSON Validation",
              desc: "Real-time validation with error highlighting",
            },
            {
              title: "Syntax Highlighting",
              desc: "Color-coded JSON for easy reading",
            },
            {
              title: "Minify & Beautify",
              desc: "Format or compress JSON as needed",
            },
            {
              title: "Error Detection",
              desc: "Find and fix JSON syntax errors instantly",
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
            "Debugging API responses and requests",
            "Formatting configuration files",
            "Validating JSON data structure",
            "Minifying JSON for production deployment",
            "Learning and teaching JSON syntax",
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
              API Response Debugging
            </h4>
            <p className="text-muted-foreground mb-4">
              Frontend developer receives a minified JSON response from an API
              and needs to debug the data structure.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  ❌ Minified Response (Hard to Read):
                </div>
                <div className="mb-3 font-mono text-xs bg-destructive/10 p-2 rounded">
                  {"{user:{id:123,name:'John',orders:[{id:1,total:99.99}]}}"}
                </div>
                <div className="text-muted-foreground mb-2">
                  ✅ Formatted Response (Easy to Debug):
                </div>
                <div className="font-mono text-xs bg-green-50 p-2 rounded">
                  {`{
  "user": {
    "id": 123,
    "name": "John",
    "orders": [
      {
        "id": 1,
        "total": 99.99
      }
    ]
  }
}`}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Developer can easily spot the nested
              structure and identify that orders is an array.
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
              Configuration File Management
            </h4>
            <p className="text-muted-foreground mb-4">
              DevOps engineer needs to review and edit a complex Docker Compose
              configuration file.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  🔧 Configuration Challenge:
                </div>
                <div className="mb-3">
                  Large Docker Compose file with multiple services, networks,
                  and volumes
                </div>
                <div className="text-muted-foreground mb-2">
                  📝 Before Formatting:
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  Unreadable one-line configuration
                </div>
                <div className="text-muted-foreground mb-2">
                  ✨ After Formatting:
                </div>
                <div className="text-xs text-green-600">
                  Proper indentation shows service hierarchy and dependencies
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Engineer can easily identify service
              relationships and spot configuration errors.
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
              Error Detection & Fixing
            </h4>
            <p className="text-muted-foreground mb-4">
              Junior developer receives invalid JSON from a colleague and needs
              to find and fix the syntax error.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  ❌ Invalid JSON:
                </div>
                <div className="mb-3 font-mono text-xs bg-destructive/10 p-2 rounded">
                  {"{name:'John',age:25,}"}
                </div>
                <div className="text-muted-foreground mb-2">
                  🔍 Error Detection:
                </div>
                <div className="mb-3 text-sm text-destructive">
                  Error: Unexpected token ',' in JSON at position 18
                </div>
                <div className="text-muted-foreground mb-2">✅ Fixed JSON:</div>
                <div className="font-mono text-xs bg-green-50 p-2 rounded">
                  {`{
  "name": "John",
  "age": 25
}`}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Tool highlights the error location and
              shows the corrected format.
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
            How to Format JSON
          </motion.h3>

          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                step: "1",
                title: "Paste Your JSON",
                desc: "Copy and paste your JSON data (formatted or minified) into the input field.",
              },
              {
                step: "2",
                title: "Validate & Format",
                desc: "The tool automatically validates syntax and formats the JSON with proper indentation.",
              },
              {
                step: "3",
                title: "Review & Edit",
                desc: "Use syntax highlighting to easily read the structure and identify any issues.",
              },
              {
                step: "4",
                title: "Copy & Use",
                desc: "Copy the formatted JSON for use in your application, documentation, or sharing with team members.",
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
                  q: "What is JSON formatting?",
                  a: "JSON formatting is the process of organizing and structuring JSON (JavaScript Object Notation) data in a readable and consistent way. It adds proper indentation, line breaks, and spacing to make the code easier to read and debug.",
                },
                {
                  q: "Why should I format JSON?",
                  a: "Formatting JSON makes it much easier to read, understand, and debug. It helps identify syntax errors, understand data structure, and makes collaboration with team members more efficient.",
                },
                {
                  q: "Does formatting change the JSON data?",
                  a: "No, formatting only changes the visual presentation by adding whitespace and indentation. The actual data content remains exactly the same and functionally identical to the original.",
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
            <h2 className="text-xl font-semibold">What is a JSON Formatter?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                A JSON formatter is a tool that takes raw, minified JSON data and transforms it into a
                human-readable format with proper indentation, line breaks, and spacing. It helps developers
                easily read, understand, and debug JSON data structures.
              </p>
              <p>
                JSON (JavaScript Object Notation) is a lightweight data interchange format widely used in
                web APIs, configuration files, and data storage. Formatting makes this data more accessible
                for development and debugging purposes.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Real-time formatting and validation as you type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Syntax error detection and highlighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Customizable indentation levels (2, 4, or 8 spaces)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Syntax highlighting for better visual organization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>One-click copy and download functionality</span>
              </li>
            </ul>
          </div>

          {/* Common Use Cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Common Use Cases</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Debugging API responses and request payloads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Reading and understanding configuration files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Validating JSON data structure before deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Preparing JSON data for documentation or sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Converting minified JSON for code reviews</span>
              </li>
            </ul>
          </div>

          {/* Real-World Scenarios */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Real-World Scenarios</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">API Development:</strong>
                <p>When debugging a REST API, formatting the JSON response helps identify data structure issues and missing fields quickly.</p>
              </div>
              <div>
                <strong className="text-foreground">Frontend Development:</strong>
                <p>Working with JSON configuration files or API data in React/Vue applications, making the data structure visible for better component development.</p>
              </div>
              <div>
                <strong className="text-foreground">Data Analysis:</strong>
                <p>Analyzing JSON log files or data exports from databases, making it easier to spot patterns and anomalies in large datasets.</p>
              </div>
              <div>
                <strong className="text-foreground">Team Collaboration:</strong>
                <p>Sharing formatted JSON data with team members during code reviews or technical discussions improves communication and reduces misunderstanding.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
