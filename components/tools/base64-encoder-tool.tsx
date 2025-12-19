"use client";

import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Key,
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

interface Base64EncoderToolProps {
  lang: LanguageType;
}

interface ExampleData {
  titleKey: string;
  data: string;
}

const exampleData: ExampleData[] = [
  {
    titleKey: "base64Encoder.examples.simpleText",
    data: "Hello World!",
  },
  {
    titleKey: "base64Encoder.examples.chineseText",
    data: "你好世界！这是一个中文测试。",
  },
  {
    titleKey: "base64Encoder.examples.urlData",
    data: "https://example.com/path?param=value&other=data",
  },
  {
    titleKey: "base64Encoder.examples.jsonData",
    data: '{"name":"John Doe","email":"john@example.com","active":true}',
  },
];

export function Base64EncoderTool({ lang }: Base64EncoderToolProps) {
  const { t } = useTranslation(lang);
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

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("convert");
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [showFaq, setShowFaq] = useState(true); // 默认展开FAQ
  const [conversionStats, setConversionStats] = useState({
    totalConversions: 0,
    encodeCount: 0,
    decodeCount: 0,
    lastUsed: null as Date | null,
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const encodeBase64 = useCallback(
    (text: string) => {
      try {
        setError(null);
        const encoded = btoa(
          encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16)),
          ),
        );
        setOutput(encoded);
        // 成功编码时生成书本物品，只有在冷却时间结束后才生成
        if (text.trim() && shouldSpawnItem()) {
          spawnItem("book");
        }
      } catch {
        setError(t("base64Encoder.error.encoding"));
        setOutput("");
      }
    },
    [t, spawnItem, shouldSpawnItem],
  );

  const decodeBase64 = useCallback(
    (base64: string) => {
      try {
        setError(null);
        const trimmed = base64.replace(/\s/g, "");
        const decoded = decodeURIComponent(
          Array.prototype.map
            .call(
              atob(trimmed),
              (c: string) =>
                `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`,
            )
            .join(""),
        );
        setOutput(decoded);
        // 成功解码时生成书本物品，只有在冷却时间结束后才生成
        if (base64.trim() && shouldSpawnItem()) {
          spawnItem("book");
        }
      } catch {
        setError(t("base64Encoder.error.decoding"));
        setOutput("");
      }
    },
    [t, spawnItem, shouldSpawnItem],
  );

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    if (mode === "encode") {
      encodeBase64(input);
    } else {
      decodeBase64(input);
    }

    // 更新统计信息
    setConversionStats((prev) => ({
      totalConversions: prev.totalConversions + 1,
      encodeCount: mode === "encode" ? prev.encodeCount + 1 : prev.encodeCount,
      decodeCount: mode === "decode" ? prev.decodeCount + 1 : prev.decodeCount,
      lastUsed: new Date(),
    }));

    // Clear the needs update flag after successful conversion
    setNeedsUpdate(false);
  }, [input, mode, encodeBase64, decodeBase64]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const loadExample = useCallback(
    (data: string) => {
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
    [output, input],
  );

  const switchMode = useCallback(() => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    setOutput(input);
    setError(null);
  }, [mode, input, output]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section */}
      <section className="mb-10 text-center">
        <div className="pixel-icon-box inline-flex items-center justify-center w-16 h-16 mb-6">
          <Key className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          {t("base64Encoder.pageTitle")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("base64Encoder.pageSubtitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            t("badge.free"),
            t("badge.noSignup"),
            t("badge.offline"),
            t("badge.privacy"),
          ].map((tag) => (
            <span key={tag} className="pixel-badge">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12" ref={toolSectionRef}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-4 rounded-xl">
                <TabsTrigger value="convert" className="rounded-lg">
                  {t("common.convert")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="convert" className="space-y-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div>
                      <Button
                        variant={mode === "encode" ? "default" : "outline"}
                        onClick={() => setMode("encode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.encode")}
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant={mode === "decode" ? "default" : "outline"}
                        onClick={() => setMode("decode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.decode")}
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        onClick={switchMode}
                        className="gap-2 rounded-xl h-11"
                      >
                        <RotateCcw className="h-4 w-4" />
                        {t("base64Encoder.swap")}
                      </Button>
                    </div>
                  </div>

                  {/* Usage Analysis Tags - 右侧 */}
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {conversionStats.totalConversions} Total
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encodes
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decodes
                    </div>
                    {conversionStats.lastUsed && (
                      <div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium"
                        title={`Last used: ${conversionStats.lastUsed.toLocaleString()}`}
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        {conversionStats.lastUsed.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between h-8">
                      <label
                        htmlFor="base64-input"
                        className="text-sm font-medium"
                      >
                        {mode === "encode"
                          ? t("base64Encoder.inputLabel")
                          : t("base64Encoder.inputLabelBase64")}
                      </label>
                    </div>
                    <Textarea
                      placeholder={
                        mode === "encode"
                          ? t("base64Encoder.inputPlaceholder")
                          : t("base64Encoder.inputPlaceholderBase64")
                      }
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
                    {error && (
                      <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-xl">
                        <AlertCircle className="h-4 w-4 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("common.output")}
                      </span>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          disabled={!output}
                          className="rounded-lg"
                        >
                          {copied ? (
                            <span className="flex items-center">
                              <Check className="h-4 w-4 mr-1" />{" "}
                              {t("common.copied")}
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Copy className="h-4 w-4 mr-1" />{" "}
                              {t("common.copy")}
                            </span>
                          )}
                        </Button>
                      </div>
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
                            code={output}
                            language="javascript"
                            className={`min-h-[300px] max-h-[400px] ${needsUpdate ? "opacity-90" : ""}`}
                          />
                        </div>
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                          {t("base64Encoder.outputPlaceholder")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <Button
                      onClick={handleConvert}
                      className="gap-2 rounded-xl h-11"
                    >
                      <div>
                        <Sparkles className="h-4 w-4" />
                      </div>
                      {mode === "encode"
                        ? t("base64Encoder.encodeBtn")
                        : t("base64Encoder.decodeBtn")}
                    </Button>
                  </div>
                  <div>
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
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Examples Section */}
      <section className="mb-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {t("base64Encoder.examples")}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("base64Encoder.examplesHint")} Click on any example to load it
              into the input field, or use "Quick Run" to automatically
              encode/decode:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {exampleData.map((example) => (
                <div
                  key={example.titleKey}
                  className="pixel-card p-4 space-y-3 relative group"
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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          loadExample(example.data);
                          // Note: Do NOT auto-convert, let user manually click convert button
                        }}
                        className="pixel-btn px-3 py-1 text-xs h-7"
                        title="Load Example Only"
                      >
                        <span>
                          <Sparkles className="h-3 w-3" />
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          await navigator.clipboard.writeText(example.data);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
                        title="Copy"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.data}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Content Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">
          {t("base64Encoder.seo.title")}
        </h2>
        <p
          className="text-muted-foreground leading-relaxed mb-6"
          dangerouslySetInnerHTML={{
            __html: t("base64Encoder.seo.description"),
          }}
        />

        <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
          <h4 className="font-semibold mb-2">
            {t("base64Encoder.seo.techImplTitle")}
          </h4>
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: t("base64Encoder.seo.techImplDesc"),
            }}
          />
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          {t("base64Encoder.featuresTitle")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("base64Encoder.feature.textBinary.title"),
              desc: t("base64Encoder.feature.textBinary.desc"),
            },
            {
              title: t("base64Encoder.feature.urlSafe.title"),
              desc: t("base64Encoder.feature.urlSafe.desc"),
            },
            {
              title: t("base64Encoder.feature.fileSupport.title"),
              desc: t("base64Encoder.feature.fileSupport.desc"),
            },
            {
              title: t("base64Encoder.feature.privacy.title"),
              desc: t("base64Encoder.feature.privacy.desc"),
            },
          ].map((feature) => (
            <div key={feature.title} className="pixel-card p-4">
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          {t("base64Encoder.useCasesTitle")}
        </h3>
        <ul className="text-muted-foreground space-y-2">
          {[
            t("base64Encoder.useCase.images"),
            t("base64Encoder.useCase.email"),
            t("base64Encoder.useCase.db"),
            t("base64Encoder.useCase.auth"),
            t("base64Encoder.useCase.serialization"),
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-primary rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50">
          <h4 className="font-semibold mb-2">
            💻 {t("base64Encoder.techTitle")}
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p
              dangerouslySetInnerHTML={{
                __html: t("base64Encoder.tech.dataUri"),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: t("base64Encoder.tech.email"),
              }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.db") }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.jwt") }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: t("base64Encoder.tech.api") }}
            />
          </div>
        </div>

        {/* Real-World Scenarios */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6">
            {t("base64Encoder.scenarios.title")}
          </h3>

          {/* Scenario 1 */}
          <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              {t("base64Encoder.scenarios.scenario1.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("base64Encoder.scenarios.scenario1.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario1.problem")}
                </div>
                <div className="mb-3">
                  {t("base64Encoder.scenarios.scenario1.problemDesc")}
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario1.solution")}
                </div>
                <div className="mb-3">
                  {t("base64Encoder.scenarios.scenario1.solutionDesc")}
                </div>
                <div className="text-green-600 text-xs">
                  &lt;img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
                  /&gt;
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("base64Encoder.scenarios.scenario1.result")}</strong>
            </p>
          </div>

          {/* Scenario 2 */}
          <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              {t("base64Encoder.scenarios.scenario2.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("base64Encoder.scenarios.scenario2.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario2.credentials")}
                </div>
                <div className="mb-3 font-mono">username: password123</div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario2.encoded")}
                </div>
                <div className="mb-3 font-mono text-green-600">
                  dXNlcm5hbWU6cGFzc3dvcmQxMjM=
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario2.header")}
                </div>
                <div className="text-xs text-muted-foreground">
                  Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQxMjM=
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("base64Encoder.scenarios.scenario2.result")}</strong>
            </p>
          </div>

          {/* Scenario 3 */}
          <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              {t("base64Encoder.scenarios.scenario3.title")}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t("base64Encoder.scenarios.scenario3.desc")}
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario3.binary")}
                </div>
                <div className="mb-3">
                  {t("base64Encoder.scenarios.scenario3.binaryDesc")}
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario3.encoding")}
                </div>
                <div className="mb-3 font-mono text-green-600">
                  JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4K...
                </div>
                <div className="text-muted-foreground mb-2">
                  {t("base64Encoder.scenarios.scenario3.storage")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {
                    '{id: 1, document: "JVBERi0xLjQK...", filename: "document.pdf"}'
                  }
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>{t("base64Encoder.scenarios.scenario3.result")}</strong>
            </p>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6">
            {t("base64Encoder.guide.title")}
          </h3>

          <div className="space-y-4">
            {[
              {
                step: "1",
                title: t("base64Encoder.guide.step1.title"),
                desc: t("base64Encoder.guide.step1.desc"),
              },
              {
                step: "2",
                title: t("base64Encoder.guide.step2.title"),
                desc: t("base64Encoder.guide.step2.desc"),
              },
              {
                step: "3",
                title: t("base64Encoder.guide.step3.title"),
                desc: t("base64Encoder.guide.step3.desc"),
              },
              {
                step: "4",
                title: t("base64Encoder.guide.step4.title"),
                desc: t("base64Encoder.guide.step4.desc"),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 bg-muted/10 rounded-lg"
              >
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Usage Limits & Best Practices */}
      <section className="mb-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {t("base64Encoder.limitsTitle")}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 text-amber-600">
                  {t("base64Encoder.limits.limitations")}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.sizeIncrease")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.largeFiles")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.notEncryption")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.browserMemory")}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">
                  {t("base64Encoder.limits.bestPractices")}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.smallBinary")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.compression")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.urlSafe")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("base64Encoder.limits.validation")}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
                {t("base64Encoder.security.title")}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t("base64Encoder.security.desc")}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <button
          type="button"
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
        >
          <h2 className="text-lg font-semibold">
            {t("base64Encoder.faqTitle")}
          </h2>
          <div>
            <ChevronDown className="h-5 w-5" />
          </div>
        </button>

        {showFaq && (
          <div className="space-y-4 pt-6 overflow-hidden">
            {[
              {
                q: t("base64Encoder.faq.q1"),
                a: t("base64Encoder.faq.a1"),
              },
              {
                q: t("base64Encoder.faq.q2"),
                a: t("base64Encoder.faq.a2"),
              },
              {
                q: t("base64Encoder.faq.q3"),
                a: t("base64Encoder.faq.a3"),
              },
              {
                q: t("base64Encoder.faq.q4"),
                a: t("base64Encoder.faq.a4"),
              },
            ].map((faq) => (
              <div key={faq.q} className="pixel-card p-4">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
