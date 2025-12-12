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
import { Badge } from "@/components/ui/badge";
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
import {
  analyzeJsonIssues,
  formatValidationErrors,
  type ValidationResult,
  validateJson,
} from "@/lib/json-validator";

const exampleJsonData = [
  {
    title: "API Response",
    data: '{"status":"success","data":{"user":{"id":1,"name":"John Doe","email":"john@example.com"},"timestamp":"2024-01-15T10:30:00Z"}}',
  },
  {
    title: "Config File",
    data: '{"name":"my-app","version":"1.0.0","dependencies":{"react":"^18.2.0","next":"^14.0.0"}}',
  },
  {
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
    },
  }),
};

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("format");
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [jsonIssues, setJsonIssues] = useState<string[]>([]);

  const toolSectionRef = useRef<HTMLDivElement>(null);

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
    } else {
      const result = validateJson(input);
      if (result.valid) {
        setOutput(JSON.stringify(result.parsed, null, 2));
        setError(null);
      } else {
        setError(formatValidationErrors(result.errors || []));
        setOutput("");
      }
    }
  }, [input, validation]);

  const minifyJson = useCallback(() => {
    if (validation && validation.valid && validation.parsed) {
      setOutput(JSON.stringify(validation.parsed));
      setError(null);
    } else {
      const result = validateJson(input);
      if (result.valid) {
        setOutput(JSON.stringify(result.parsed));
        setError(null);
      } else {
        setError(formatValidationErrors(result.errors || []));
        setOutput("");
      }
    }
  }, [input, validation]);

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

  const badges = ["Free", "No Signup", "Works Offline", "Privacy First"];

  return (
    <motion.div
      className="container mx-auto max-w-6xl px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <FileJson className="h-6 w-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              JSON Formatter & Validator
            </h1>
            <p className="text-muted-foreground">
              Format, validate and beautify your JSON data instantly
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              <Badge variant="secondary" className="rounded-full">
                {badge}
              </Badge>
            </motion.div>
          ))}
        </div>
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
                  Examples
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
                      <label
                        htmlFor="json-input"
                        className="text-sm font-medium"
                      >
                        Input JSON
                      </label>
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
                                Valid JSON
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3" />
                                Invalid JSON
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Textarea
                      placeholder='{"key": "value"}'
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
                          <p className="font-medium mb-1">Possible issues:</p>
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
                                <Copy className="h-4 w-4 mr-1" /> Copy
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
                          Formatted JSON will appear here...
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
                      Format JSON
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
                      Minify
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
                      Clear
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click on an example to load it into the formatter:
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
                            {example.title}
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

      <motion.section
        className="mb-12 prose prose-neutral dark:prose-invert max-w-none"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-4">What is JSON Formatter?</h2>
        <p className="text-muted-foreground leading-relaxed">
          A <strong>JSON formatter</strong> is an essential developer tool that
          transforms raw, minified JSON data into a human-readable format with
          proper indentation and syntax highlighting. Our free online JSON
          formatter helps you validate, beautify, and debug JSON data quickly
          without any installation or signup.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">Key Features</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 not-prose">
          {[
            {
              title: "Format & Beautify",
              desc: "Add proper indentation and line breaks",
            },
            {
              title: "Zod Validation",
              desc: "Real-time schema validation with helpful hints",
            },
            {
              title: "Syntax Highlighting",
              desc: "Color-coded output for easy reading",
            },
            {
              title: "100% Private",
              desc: "Data processed locally in browser",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-muted/30 rounded-xl h-full">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">How to Use</h3>
        <ol className="text-muted-foreground space-y-2">
          <li>
            <strong>1.</strong> Paste your JSON data into the input field
          </li>
          <li>
            <strong>2.</strong> Click {"Format JSON"} to beautify or {"Minify"}{" "}
            to compress
          </li>
          <li>
            <strong>3.</strong> Copy the result with one click
          </li>
        </ol>
      </motion.section>

      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t rounded-xl px-2 hover:bg-muted/30 transition-colors"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.99 }}
        >
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
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
              className="space-y-4 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {[
                {
                  q: "What is a JSON formatter?",
                  a: "A JSON formatter is a tool that takes raw JSON data and formats it with proper indentation and syntax highlighting, making it easier to read and debug.",
                },
                {
                  q: "Is this JSON formatter free to use?",
                  a: "Yes, this JSON formatter is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy.",
                },
                {
                  q: "Does this tool validate JSON?",
                  a: "Yes, our JSON formatter uses Zod schema validation to automatically validate your JSON and highlights any syntax errors with detailed error messages and helpful hints to fix issues quickly.",
                },
                {
                  q: "Is my data secure?",
                  a: "Absolutely. All JSON processing happens locally in your browser. Your data is never sent to any server, ensuring complete privacy and security.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
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
                      <h3 className="font-medium mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
}
