"use client";

import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";
import { UuidGeneratorExamples } from "./uuid-generator-examples";
import { UuidGeneratorFaq } from "./uuid-generator-faq-ssr";
import { UuidGeneratorHero } from "./uuid-generator-hero-ssr";
import { UuidGeneratorRelatedTools } from "./uuid-generator-related-tools-ssr";
import { UuidGeneratorSeoContent } from "./uuid-generator-seo-content-ssr";

interface UuidGeneratorToolProps {
  lang?: LanguageType;
}

interface UuidOptions {
  version: "v1" | "v4" | "v7";
  format: "standard" | "withoutHyphens" | "uppercase" | "braces";
  count: number;
}

function generateUuidV4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

function generateUuidV7(): string {
  const timestamp = Date.now();
  const timestampBytes = new Uint8Array(6);

  timestampBytes[0] = (timestamp >> 40) & 0xff;
  timestampBytes[1] = (timestamp >> 32) & 0xff;
  timestampBytes[2] = (timestamp >> 24) & 0xff;
  timestampBytes[3] = (timestamp >> 16) & 0xff;
  timestampBytes[4] = (timestamp >> 8) & 0xff;
  timestampBytes[5] = timestamp & 0xff;

  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  const bytes = new Uint8Array(16);
  bytes.set(timestampBytes, 0);
  bytes.set(randomBytes, 6);

  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

function formatUuid(uuid: string, format: UuidOptions["format"]): string {
  switch (format) {
    case "withoutHyphens":
      return uuid.replace(/-/g, "");
    case "uppercase":
      return uuid.toUpperCase();
    case "braces":
      return `{${uuid}}`;
    default:
      return uuid;
  }
}

function generateUuid(options: UuidOptions): string {
  let uuid: string;

  switch (options.version) {
    case "v1":
      uuid = generateUuidV4();
      break;
    case "v4":
      uuid = generateUuidV4();
      break;
    case "v7":
      uuid = generateUuidV7();
      break;
    default:
      uuid = generateUuidV4();
  }

  return formatUuid(uuid, options.format);
}

export function UuidGeneratorTool({
  lang = "en" as LanguageType,
}: UuidGeneratorToolProps) {
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

  const [options, setOptions] = useState<UuidOptions>({
    version: "v4",
    format: "standard",
    count: 1,
  });

  const [uuid, setUuid] = useState("");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  const [generationStats, setGenerationStats] = useState({
    totalGenerations: 0,
    v4Count: 0,
    v7Count: 0,
    bulkCount: 0,
    lastUsed: null as Date | null,
  });

  const handleGenerate = useCallback(() => {
    const newUuid = generateUuid(options);
    setUuid(newUuid);
    setUuids([]);
    if (shouldSpawnItem()) {
      spawnItem("coffee");
    }
    setGenerationStats((prev) => ({
      totalGenerations: prev.totalGenerations + 1,
      v4Count: options.version === "v4" ? prev.v4Count + 1 : prev.v4Count,
      v7Count: options.version === "v7" ? prev.v7Count + 1 : prev.v7Count,
      bulkCount: prev.bulkCount,
      lastUsed: new Date(),
    }));
  }, [options, spawnItem, shouldSpawnItem]);

  const handleBulkGenerate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < options.count; i++) {
      newUuids.push(generateUuid(options));
    }
    setUuids(newUuids);
    setUuid("");
    if (shouldSpawnItem()) {
      spawnItem("coffee");
    }
    setGenerationStats((prev) => ({
      totalGenerations: prev.totalGenerations + options.count,
      v4Count:
        options.version === "v4" ? prev.v4Count + options.count : prev.v4Count,
      v7Count:
        options.version === "v7" ? prev.v7Count + options.count : prev.v7Count,
      bulkCount: prev.bulkCount + 1,
      lastUsed: new Date(),
    }));
  }, [options, spawnItem, shouldSpawnItem]);

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const loadExample = useCallback(
    (version: string, format: string) => {
      setOptions({
        ...options,
        version: version as UuidOptions["version"],
        format: format as UuidOptions["format"],
      });
      setUuid("");
      setUuids([]);
    },
    [options],
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section - SSR */}
      <UuidGeneratorHero lang={lang} />

      {/* Generator Card */}
      <section className="mb-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <TabsList className="rounded-xl">
                  <TabsTrigger value="generate" className="rounded-lg">
                    {t("uuidGenerator.generate")}
                  </TabsTrigger>
                  <TabsTrigger value="bulk" className="rounded-lg">
                    {t("uuidGenerator.bulk")}
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {generationStats.totalGenerations} Generated
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-medium">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    {generationStats.v4Count} v4
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    {generationStats.v7Count} v7
                  </div>
                  {generationStats.lastUsed && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-medium">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      {generationStats.lastUsed.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>

              <TabsContent value="generate" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium block mb-2">
                        {t("uuidGenerator.version")}
                      </Label>
                      <Select
                        value={options.version}
                        onValueChange={(value: UuidOptions["version"]) => {
                          setOptions({ ...options, version: value });
                          setUuid("");
                          setUuids([]);
                        }}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v4">
                            {t("uuidGenerator.option.v4")}
                          </SelectItem>
                          <SelectItem value="v7">
                            {t("uuidGenerator.option.v7")}
                          </SelectItem>
                          <SelectItem value="v1">
                            {t("uuidGenerator.option.v1")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium block mb-2">
                        {t("uuidGenerator.format")}
                      </Label>
                      <Select
                        value={options.format}
                        onValueChange={(value: UuidOptions["format"]) => {
                          setOptions({ ...options, format: value });
                          setUuid("");
                          setUuids([]);
                        }}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            {t("uuidGenerator.option.standard")}
                          </SelectItem>
                          <SelectItem value="withoutHyphens">
                            {t("uuidGenerator.option.withoutHyphens")}
                          </SelectItem>
                          <SelectItem value="uppercase">
                            {t("uuidGenerator.option.uppercase")}
                          </SelectItem>
                          <SelectItem value="braces">
                            {t("uuidGenerator.option.braces")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* UUID Output */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("uuidGenerator.outputLabel")}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(uuid)}
                        disabled={!uuid}
                        className="rounded-lg"
                      >
                        {copied ? (
                          <span className="flex items-center">
                            <span className="h-4 w-4 mr-1">✓</span>
                            {t("common.copied")}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Copy className="h-4 w-4 mr-1" />
                            {t("common.copy")}
                          </span>
                        )}
                      </Button>
                    </div>
                    <div className="min-h-[80px] rounded-xl border-2 border-border bg-muted/30 overflow-hidden">
                      {uuid ? (
                        <CodeHighlighter
                          code={uuid}
                          language="javascript"
                          className="min-h-[80px]"
                        />
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                          {t("uuidGenerator.outputPlaceholder")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      onClick={handleGenerate}
                      className="gap-2 rounded-xl h-11"
                    >
                      <Sparkles className="h-4 w-4" />
                      {t("uuidGenerator.generateBtn")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleGenerate}
                      disabled={!uuid}
                      className="gap-2 rounded-xl h-11"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {t("uuidGenerator.regenerate")}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bulk" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium block mb-2">
                        {t("uuidGenerator.version")}
                      </Label>
                      <Select
                        value={options.version}
                        onValueChange={(value: UuidOptions["version"]) => {
                          setOptions({ ...options, version: value });
                          setUuid("");
                          setUuids([]);
                        }}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v4">
                            {t("uuidGenerator.option.v4")}
                          </SelectItem>
                          <SelectItem value="v7">
                            {t("uuidGenerator.option.v7")}
                          </SelectItem>
                          <SelectItem value="v1">
                            {t("uuidGenerator.option.v1")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium block mb-2">
                        {t("uuidGenerator.format")}
                      </Label>
                      <Select
                        value={options.format}
                        onValueChange={(value: UuidOptions["format"]) => {
                          setOptions({ ...options, format: value });
                          setUuid("");
                          setUuids([]);
                        }}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            {t("uuidGenerator.option.standard")}
                          </SelectItem>
                          <SelectItem value="withoutHyphens">
                            {t("uuidGenerator.option.withoutHyphens")}
                          </SelectItem>
                          <SelectItem value="uppercase">
                            {t("uuidGenerator.option.uppercase")}
                          </SelectItem>
                          <SelectItem value="braces">
                            {t("uuidGenerator.option.braces")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium block mb-2">
                        {t("uuidGenerator.count")}
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        max="1000"
                        value={options.count}
                        onChange={(e) => {
                          setOptions({
                            ...options,
                            count: Math.min(
                              1000,
                              Math.max(1, parseInt(e.target.value, 10) || 1),
                            ),
                          });
                          setUuid("");
                          setUuids([]);
                        }}
                        className="rounded-xl"
                      />
                    </div>

                    <Button
                      onClick={handleBulkGenerate}
                      className="w-full rounded-xl h-11"
                    >
                      {t("uuidGenerator.generateMultiple")}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        Generated UUIDs ({uuids.length})
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(uuids.join("\n"))}
                        disabled={uuids.length === 0}
                        className="rounded-lg"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                    <div className="min-h-[300px] max-h-[400px] overflow-auto rounded-xl border-2 border-border bg-muted/30 p-4">
                      {uuids.length > 0 ? (
                        <div className="space-y-1">
                          {uuids.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-1 font-mono text-sm"
                            >
                              <span className="truncate">{item}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(item)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                          {t("uuidGenerator.bulkPlaceholder")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Examples Section */}
      <UuidGeneratorExamples lang={lang} onLoadExample={loadExample} />

      {/* SEO Content Section - SSR */}
      <UuidGeneratorSeoContent lang={lang} />

      {/* FAQ Section - SSR */}
      <UuidGeneratorFaq lang={lang} />

      {/* Related Tools - SSR */}
      <UuidGeneratorRelatedTools lang={lang} currentTool="uuid-generator" />
    </div>
  );
}
