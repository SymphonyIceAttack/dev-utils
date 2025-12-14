"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Copy, Search, Sparkles, AlertCircle } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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

interface MatchResult {
  index: number;
  match: string;
  groups: string[];
}

export function RegexTesterTool({ lang = "en" as LanguageType }) {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [replaceResult, setReplaceResult] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("test");

  const toolSectionRef = useRef<HTMLDivElement>(null);
  const { spawnItem } = useCat();

  // Test regex pattern
  const testRegex = useCallback(() => {
    if (!pattern.trim()) {
      setMatches([]);
      setIsValid(true);
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const results: MatchResult[] = [];

      if (testText) {
        let match;
        const textToSearch = flags.includes("g") ? testText : testText.slice(0);

        if (flags.includes("g")) {
          const iterator = textToSearch.matchAll(regex);

          for (const matchData of iterator) {
            results.push({
              index: matchData.index || 0,
              match: matchData[0],
              groups: Array.from(matchData).slice(1),
            });
          }
        } else {
          const match = textToSearch.match(regex);
          if (match) {
            results.push({
              index: match.index || 0,
              match: match[0],
              groups: Array.from(match).slice(1),
            });
          }
        }
      }

      setMatches(results);
      setIsValid(true);
      setError("");

      if (results.length > 0) {
        spawnItem("sparkles");
      }
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches([]);
    }
  }, [pattern, flags, testText, spawnItem]);

  // Replace text
  const replaceInText = useCallback(() => {
    if (!pattern.trim()) {
      setReplaceResult(testText);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const result = testText.replace(regex, replaceText);
      setReplaceResult(result);
      setIsValid(true);
      setError("");

      if (result !== testText) {
        spawnItem("sparkles");
      }
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
    }
  }, [pattern, flags, testText, replaceText, spawnItem]);

  // Copy result to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, []);

  // Validate pattern on change
  const validatePattern = useCallback(
    (newPattern: string) => {
      setPattern(newPattern);
      if (!newPattern.trim()) {
        setIsValid(true);
        setError("");
        return;
      }

      try {
        new RegExp(newPattern, flags);
        setIsValid(true);
        setError("");
      } catch (err) {
        setIsValid(false);
        setError(err instanceof Error ? err.message : "Invalid regex pattern");
      }
    },
    [flags],
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
          <Search className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Regex Tester
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Test regular expressions with real-time results. Match, search, and
          replace text patterns instantly.
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
          {["Real-time", "Multiple Flavors", "Syntax Highlighting", "Free"].map(
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
                <TabsTrigger value="test" className="rounded-lg">
                  Test
                </TabsTrigger>
                <TabsTrigger value="replace" className="rounded-lg">
                  Replace
                </TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg">
                  Examples
                </TabsTrigger>
                <TabsTrigger value="flags" className="rounded-lg">
                  Flags
                </TabsTrigger>
              </TabsList>

              <TabsContent value="test" className="space-y-6">
                {/* Pattern Input */}
                <div className="space-y-2">
                  <Label htmlFor="pattern">Regular Expression Pattern</Label>
                  <div className="relative">
                    <Input
                      id="pattern"
                      value={pattern}
                      onChange={(e) => validatePattern(e.target.value)}
                      placeholder="Enter your regex pattern (e.g., \b\w+@\w+\.\w+\b)"
                      className={`font-mono ${!isValid ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {!isValid && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                {/* Test Text */}
                <div className="space-y-2">
                  <Label htmlFor="test-text">Test Text</Label>
                  <Textarea
                    id="test-text"
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="Enter text to test against the regex pattern..."
                    className="min-h-32 font-mono"
                  />
                </div>

                {/* Test Button */}
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={testRegex}
                      className="gap-2 rounded-xl h-11 px-6"
                      disabled={!isValid}
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
                      Test Regex
                    </Button>
                  </motion.div>
                </div>

                {/* Results */}
                {matches.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Matches Found ({matches.length})
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            matches.map((m) => m.match).join("\n"),
                          )
                        }
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy All
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {matches.map((match, index) => (
                        <motion.div
                          key={`${match.index}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="text-sm font-medium text-green-600">
                              Match at position {match.index}
                            </div>
                            <CodeHighlighter
                              code={match.match}
                              language="javascript"
                              className="text-sm"
                            />
                            {match.groups.length > 0 && (
                              <div className="text-xs text-muted-foreground">
                                Groups:{" "}
                                {match.groups
                                  .map((g, i) => `$${i + 1}: "${g}"`)
                                  .join(", ")}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="replace" className="space-y-6">
                {/* Pattern Input for Replace */}
                <div className="space-y-2">
                  <Label htmlFor="replace-pattern">
                    Regular Expression Pattern
                  </Label>
                  <Input
                    id="replace-pattern"
                    value={pattern}
                    onChange={(e) => validatePattern(e.target.value)}
                    placeholder="Enter your regex pattern..."
                    className={`font-mono ${!isValid ? "border-red-500 focus:border-red-500" : ""}`}
                  />
                </div>

                {/* Replacement Text */}
                <div className="space-y-2">
                  <Label htmlFor="replacement">Replacement Text</Label>
                  <Input
                    id="replacement"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    placeholder="Enter replacement text (use $1, $2 for groups)"
                    className="font-mono"
                  />
                </div>

                {/* Test Text for Replace */}
                <div className="space-y-2">
                  <Label htmlFor="replace-test-text">Test Text</Label>
                  <Textarea
                    id="replace-test-text"
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="Enter text to test replacement..."
                    className="min-h-32 font-mono"
                  />
                </div>

                {/* Replace Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={replaceInText}
                    className="gap-2 rounded-xl h-11 px-6"
                    disabled={!isValid}
                  >
                    <Search className="h-4 w-4" />
                    Replace
                  </Button>
                </div>

                {/* Replace Result */}
                {replaceResult && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Result</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(replaceResult)}
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl border">
                      <CodeHighlighter
                        code={replaceResult}
                        language="javascript"
                        className="text-sm"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="flags" className="space-y-6">
                <div className="space-y-4">
                  <Label>Regex Flags</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { key: "g", label: "Global", desc: "Find all matches" },
                      {
                        key: "i",
                        label: "Ignore Case",
                        desc: "Case insensitive",
                      },
                      {
                        key: "m",
                        label: "Multiline",
                        desc: "^ and $ match line boundaries",
                      },
                      {
                        key: "s",
                        label: "Dot All",
                        desc: "'. matches newlines",
                      },
                      { key: "u", label: "Unicode", desc: "Unicode mode" },
                      { key: "y", label: "Sticky", desc: "Sticky matching" },
                    ].map((flag) => (
                      <div
                        key={flag.key}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`flag-${flag.key}`}
                          checked={flags.includes(flag.key)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFlags((prev) => prev + flag.key);
                            } else {
                              setFlags((prev) => prev.replace(flag.key, ""));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`flag-${flag.key}`} className="text-sm">
                          {flag.key}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Current flags:</strong> {flags || "none"}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Popular Regex Patterns</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click on any example to try it out. These patterns cover common use cases in web development.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {[
                      {
                        name: "Email Validation",
                        pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b",
                        description: "Validates email addresses with standard format",
                        testText: "Contact us at info@example.com or support@company.co.uk",
                        flags: "i"
                      },
                      {
                        name: "URL Detection",
                        pattern: "https?://[^\\s]+",
                        description: "Finds HTTP and HTTPS URLs in text",
                        testText: "Visit our website at https://example.com or check http://test.org for more info",
                        flags: "gi"
                      },
                      {
                        name: "Phone Numbers (US)",
                        pattern: "\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})",
                        description: "Matches US phone number formats",
                        testText: "Call us at (555) 123-4567, 555-123-4567, or 555.123.4567",
                        flags: "g"
                      },
                      {
                        name: "IPv4 Address",
                        pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b",
                        description: "Basic IPv4 address validation",
                        testText: "Server IPs: 192.168.1.1, 10.0.0.1, 8.8.8.8",
                        flags: "g"
                      },
                      {
                        name: "HTML Tags",
                        pattern: "<[^>]+>",
                        description: "Matches HTML tags in documents",
                        testText: "<div class='container'><p>Hello World</p></div>",
                        flags: "gi"
                      },
                      {
                        name: "Credit Card Numbers",
                        pattern: "\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b",
                        description: "Basic credit card format validation",
                        testText: "Card: 1234-5678-9012-3456 or 1234 5678 9012 3456",
                        flags: "g"
                      },
                      {
                        name: "Date Format (YYYY-MM-DD)",
                        pattern: "\\d{4}-\\d{2}-\\d{2}",
                        description: "Matches ISO date format",
                        testText: "Created on 2024-12-14, due by 2024-12-31",
                        flags: "g"
                      },
                      {
                        name: "Hex Colors",
                        pattern: "#[0-9A-Fa-f]{6}\\b",
                        description: "Finds hexadecimal color codes",
                        testText: "Colors: #FF5733, #3498db, #2ecc71",
                        flags: "gi"
                      }
                    ].map((example) => (
                      <motion.div
                        key={example.name}
                        className="pixel-card p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => {
                          setPattern(example.pattern);
                          setTestText(example.testText);
                          setFlags(example.flags);
                          setActiveTab("test");
                          validatePattern(example.pattern);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">{example.name}</h4>
                            <span className="text-xs text-muted-foreground font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              /{example.pattern}/
                              {example.flags}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{example.description}</p>
                          <div className="text-xs">
                            <span className="text-muted-foreground">Test text: </span>
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                              {example.testText}
                            </code>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">💡 Pro Tips</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Use parentheses () for capturing groups</li>
                      <li>• Use square brackets [] for character classes</li>
                      <li>• Use \d for digits, \w for word characters, \s for whitespace</li>
                      <li>• Use + for one or more, * for zero or more, ? for optional</li>
                      <li>• Use flags to modify behavior: g (global), i (ignore case), m (multiline)</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      {/* Information Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* What is */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What is a Regex Tester?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                A regex tester is an essential tool for developers working with pattern
                matching and text processing. It allows you to test regular expressions
                against sample text in real-time, helping you build and debug patterns
                before implementing them in your code.
              </p>
              <p>
                Regular expressions are powerful pattern matching tools used for input
                validation, text search and replace, data extraction, and more. A good
                tester helps you understand how your patterns work and catch potential issues.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Real-time regex matching with instant feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Support for JavaScript regex syntax and flags</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Match highlighting with visual indicators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Replace functionality with live preview</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Match count and detailed results display</span>
              </li>
            </ul>
          </div>

          {/* Common Use Cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Common Use Cases</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Email and phone number validation patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Data extraction from log files and text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>URL and file path pattern matching</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Text formatting and cleanup operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Code syntax highlighting and parsing</span>
              </li>
            </ul>
          </div>

          {/* Real-World Scenarios */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Real-World Scenarios</h2>
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <strong className="text-foreground">Form Validation:</strong>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  </code>
                </div>
                <p className="text-muted-foreground">
                  <strong>Use case:</strong> User registration form validation
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <code className="text-xs font-mono">
{`// JavaScript example
function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}`}
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <strong className="text-foreground">Data Extraction:</strong>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                    /(\d{4})-(\d{2})-(\d{2})/
                  </code>
                </div>
                <p className="text-muted-foreground">
                  <strong>Use case:</strong> Extracting dates from log files
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <code className="text-xs font-mono">
{`// Extract dates from logs
const logEntry = "2024-12-14 10:30:45 ERROR connection failed";
const dateMatch = logEntry.match(/(\\d{4})-(\\d{2})-(\\d{2})/);
const date = dateMatch ? dateMatch[0] : null; // "2024-12-14"`}
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <strong className="text-foreground">Content Filtering:</strong>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                    /\[.*?\]/g
                  </code>
                </div>
                <p className="text-muted-foreground">
                  <strong>Use case:</strong> Remove markdown links from text
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <code className="text-xs font-mono">
{`// Remove markdown links
const markdown = "Visit [Google](https://google.com) for search";
const plainText = markdown.replace(/\\[.*?\\]\\(.*?\\)/g, '[link]');
// Result: "Visit [link] for search"`}
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <strong className="text-foreground">API Data Processing:</strong>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                    /"id":\s*(\d+)/
                  </code>
                </div>
                <p className="text-muted-foreground">
                  <strong>Use case:</strong> Parsing JSON response IDs
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <code className="text-xs font-mono">
{`// Extract IDs from JSON strings
const response = '{"id": 12345, "name": "Product"}';
const idMatch = response.match(/"id":\\s*(\\d+)/);
const userId = idMatch ? parseInt(idMatch[1]) : null; // 12345`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  q: "What regex flavor does this tool support?",
                  a: "This tool uses JavaScript regex syntax. It supports most common regex features including character classes, quantifiers, groups, and lookahead/lookbehind assertions.",
                },
                {
                  q: "How do I use capture groups in replacements?",
                  a: "Use $1, $2, $3, etc. in the replacement text to reference captured groups. For example, with the pattern '(\\w+)\\s+(\\w+)', use '$2, $1' to swap the order.",
                },
                {
                  q: "What do the regex flags mean?",
                  a: "g (global) finds all matches, i (ignore case) makes it case-insensitive, m (multiline) makes ^ and $ match line boundaries, s (dot all) makes . match newlines, u (unicode) enables Unicode mode, and y (sticky) enables sticky matching.",
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
