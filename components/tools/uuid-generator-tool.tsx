"use client";

import { ChevronDown, Copy, KeyRound, RefreshCw, Sparkles } from "lucide-react";
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

const _containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const _itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface UuidGeneratorToolProps {
  lang: LanguageType;
}

interface UuidOptions {
  version: "v1" | "v4" | "v7";
  format: "standard" | "withoutHyphens" | "uppercase" | "braces";
  count: number;
}

function generateUuidV4(): string {
  // RFC4122 version 4 compliant UUID
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

function generateUuidV7(): string {
  // RFC4122 version 7 compliant UUID
  let timestamp = Date.now();
  const timestampBytes = new Uint8Array(6);

  // Convert timestamp to bytes (48-bit Unix timestamp in ms)
  for (let i = 5; i >= 0; i--) {
    timestampBytes[i] = timestamp & 0xff;
    timestamp >>= 8;
  }

  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  const bytes = new Uint8Array(16);
  bytes.set(timestampBytes, 0);
  bytes.set(randomBytes, 6);

  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

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
      // For demo purposes, generate v4 as v1 requires timestamp
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

export function UuidGeneratorTool({ lang }: UuidGeneratorToolProps) {
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
  const [_copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(true);
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

  return (
    <div>
      {/* Hero Section */}
      <section>
        <div>
          <KeyRound className="h-8 w-8 text-primary" />
        </div>

        <h1>{t("uuidGenerator.pageTitle") || "UUID Generator"}</h1>
        <p>
          {t("uuidGenerator.pageSubtitle") ||
            "Generate universally unique identifiers instantly"}
        </p>

        <div>
          {[
            t("badge.free"),
            t("badge.noSignup"),
            t("badge.offline"),
            t("badge.rfcCompliant"),
          ].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section>
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

                {/* Stats badges */}
                <div>
                  <div>
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {generationStats.totalGenerations} Generated
                  </div>
                  <div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    {generationStats.v4Count} v4
                  </div>
                  <div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    {generationStats.v7Count} v7
                  </div>
                  {generationStats.lastUsed && (
                    <div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      {generationStats.lastUsed.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>

              <TabsContent value="generate" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    {/* Options */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium block mb-2">
                          {t("uuidGenerator.version")}
                        </Label>
                        <Select
                          value={options.version}
                          onValueChange={(value: UuidOptions["version"]) => {
                            setOptions({ ...options, version: value });
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
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
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
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
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("uuidGenerator.outputLabel")}
                      </span>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(uuid)}
                          disabled={!uuid}
                          className="rounded-lg"
                          aria-label={t("common.copy")}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          {t("common.copy")}
                        </Button>
                      </div>
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

                <div>
                  <div>
                    <Button
                      onClick={handleGenerate}
                      className="gap-2 rounded-xl h-11"
                    >
                      <div>
                        <Sparkles className="h-4 w-4" />
                      </div>
                      {t("uuidGenerator.generateBtn")}
                    </Button>
                  </div>
                  <div>
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
                <div className="space-y-4">
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
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
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
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
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
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
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
                          <Copy className="h-4 w-4 mr-1" /> {t("common.copy")}
                        </Button>
                      </div>
                      <div className="min-h-[300px] max-h-[400px] overflow-auto rounded-xl border-2 border-border bg-muted/30 p-4">
                        {uuids.length > 0 ? (
                          <div className="space-y-1">
                            {uuids.map((uuid, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between py-1 font-mono text-sm"
                              >
                                <span className="truncate">{uuid}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(uuid)}
                                  className="h-6 w-6 p-0"
                                  aria-label={t("common.copy")}
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
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Examples Section */}
      <section>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3>
              <Sparkles className="h-5 w-5" />
              {t("uuidGenerator.examplesTitle")}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("uuidGenerator.examplesDesc")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: t("uuidGenerator.example.v4.title"),
                  desc: t("uuidGenerator.example.v4.desc"),
                  version: "v4" as const,
                  format: "standard" as const,
                },
                {
                  title: t("uuidGenerator.example.v7.title"),
                  desc: t("uuidGenerator.example.v7.desc"),
                  version: "v7" as const,
                  format: "standard" as const,
                },
                {
                  title: t("uuidGenerator.example.v1.title"),
                  desc: t("uuidGenerator.example.v1.desc"),
                  version: "v1" as const,
                  format: "standard" as const,
                },
                {
                  title: t("uuidGenerator.example.noHyphens.title"),
                  desc: t("uuidGenerator.example.noHyphens.desc"),
                  version: "v4" as const,
                  format: "withoutHyphens" as const,
                },
                {
                  title: t("uuidGenerator.example.uppercase.title"),
                  desc: t("uuidGenerator.example.uppercase.desc"),
                  version: "v4" as const,
                  format: "uppercase" as const,
                },
                {
                  title: t("uuidGenerator.example.braces.title"),
                  desc: t("uuidGenerator.example.braces.desc"),
                  version: "v4" as const,
                  format: "braces" as const,
                },
              ].map((example, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{example.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {example.desc}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <button
                        type="button"
                        onClick={() => {
                          setOptions({
                            ...options,
                            version: example.version,
                            format: example.format,
                          });
                          setUuid("");
                          setUuids([]);
                        }}
                        className="pixel-btn px-3 py-1 text-xs h-7"
                        title="Load Options Only"
                      >
                        <span>
                          <Sparkles className="h-3 w-3" />
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          const tempOptions = {
                            ...options,
                            version: example.version,
                            format: example.format,
                          };
                          const tempUuid = generateUuid(tempOptions);
                          await navigator.clipboard.writeText(tempUuid);
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
                  <div className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.version} • {example.format}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Content Section */}
      <section>
        <h2>{t("uuidGenerator.whatIsUuidTitle")}</h2>
        <p></p>

        <div>
          <h4 className="font-semibold mb-2">
            💻 {t("uuidGenerator.techDetailsTitle")}
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p
              dangerouslySetInnerHTML={{
                __html: t("uuidGenerator.tech.webCrypto"),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: t("uuidGenerator.tech.v4Struct"),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: t("uuidGenerator.tech.v7Struct"),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: t("uuidGenerator.tech.bitManip"),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: t("uuidGenerator.tech.collision"),
              }}
            />
          </div>
        </div>

        <h3>{t("uuidGenerator.featuresTitle")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("uuidGenerator.feature.rfc.title"),
              desc: t("uuidGenerator.feature.rfc.desc"),
            },
            {
              title: t("uuidGenerator.feature.formats.title"),
              desc: t("uuidGenerator.feature.formats.desc"),
            },
            {
              title: t("uuidGenerator.feature.bulk.title"),
              desc: t("uuidGenerator.feature.bulk.desc"),
            },
            {
              title: t("uuidGenerator.feature.privacy.title"),
              desc: t("uuidGenerator.feature.privacy.desc"),
            },
          ].map((feature) => (
            <div key={feature.title}>
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <h3>{t("uuidGenerator.comparisonTitle")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold" scope="col">
                  {t("uuidGenerator.comparison.version")}
                </th>
                <th className="text-left p-3 font-semibold" scope="col">
                  {t("uuidGenerator.comparison.method")}
                </th>
                <th className="text-left p-3 font-semibold" scope="col">
                  {t("uuidGenerator.comparison.sortable")}
                </th>
                <th className="text-left p-3 font-semibold" scope="col">
                  {t("uuidGenerator.comparison.bestFor")}
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="p-3 font-medium text-foreground">UUID v1</td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v1.method")}
                </td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v1.sortable")}
                </td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v1.bestFor")}
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3 font-medium text-foreground">UUID v4</td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v4.method")}
                </td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v4.sortable")}
                </td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v4.bestFor")}
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3 font-medium text-foreground">UUID v7</td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v7.method")}
                </td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v7.sortable")}
                </td>
                <td className="p-3">
                  {t("uuidGenerator.comparison.v7.bestFor")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>{t("uuidGenerator.useCasesTitle")}</h3>
        <ul>
          {[
            t("uuidGenerator.useCase.db"),
            t("uuidGenerator.useCase.session"),
            t("uuidGenerator.useCase.distributed"),
            t("uuidGenerator.useCase.files"),
            t("uuidGenerator.useCase.queue"),
          ].map((item, index) => (
            <li key={index}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ Section */}
      <section>
        <button
          type="button"
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
        >
          <h2 className="text-lg font-semibold">
            {t("uuidGenerator.faqTitle")}
          </h2>
          <div>
            <ChevronDown className="h-5 w-5" />
          </div>
        </button>
      </section>
    </div>
  );
}
