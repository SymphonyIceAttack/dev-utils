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
import { RelatedTools } from "./related-tools";

type TranslateFn = (key: string) => string;

interface UuidGeneratorToolProps {
  lang: LanguageType;
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

// Animated Icon Component using CSS
function AnimatedIcon() {
  return (
    <div className="pixel-icon-box inline-flex items-center justify-center w-16 h-16 mb-6 animate-scale-in animate-rotate-in">
      <KeyRound className="h-8 w-8 text-primary" />
    </div>
  );
}

// UUID Output Display
function UuidOutput({
  uuid,
  placeholder,
  onCopy,
  label,
}: {
  uuid: string;
  placeholder: string;
  onCopy: () => void;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between h-8">
        <span className="text-sm font-medium">{label}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          disabled={!uuid}
          className="rounded-lg hover:scale-105 active:scale-95 transition-transform"
          aria-label="Copy"
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy
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
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}

// FAQ Accordion Component
function FaqSection({ t }: { t: TranslateFn }) {
  const [showFaq, setShowFaq] = useState(true);
  const faqs = [
    { q: t("uuidGenerator.faq.q1"), a: t("uuidGenerator.faq.a1") },
    { q: t("uuidGenerator.faq.q2"), a: t("uuidGenerator.faq.a2") },
    { q: t("uuidGenerator.faq.q3"), a: t("uuidGenerator.faq.a3") },
    { q: t("uuidGenerator.faq.q4"), a: t("uuidGenerator.faq.a4") },
    { q: t("uuidGenerator.faq.q5"), a: t("uuidGenerator.faq.a5") },
    { q: t("uuidGenerator.faq.q6"), a: t("uuidGenerator.faq.a6") },
  ];

  return (
    <section
      className="mb-12"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto" }}
    >
      <button
        type="button"
        onClick={() => setShowFaq(!showFaq)}
        className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25 cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <h2 className="text-lg font-semibold">{t("uuidGenerator.faqTitle")}</h2>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${showFaq ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showFaq ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 pt-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="pixel-card p-4 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Examples Section
function ExamplesSection({
  t,
  setOptions,
  setUuid,
  setUuids,
  options,
}: {
  t: TranslateFn;
  setOptions: (options: UuidOptions) => void;
  setUuid: (uuid: string) => void;
  setUuids: (uuids: string[]) => void;
  options: UuidOptions;
}) {
  const examples = [
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
    {
      title: t("uuidGenerator.example.dbKey.title"),
      desc: t("uuidGenerator.example.dbKey.desc"),
      version: "v7" as const,
      format: "withoutHyphens" as const,
    },
    {
      title: t("uuidGenerator.example.apiKey.title"),
      desc: t("uuidGenerator.example.apiKey.desc"),
      version: "v4" as const,
      format: "uppercase" as const,
    },
    {
      title: t("uuidGenerator.example.logging.title"),
      desc: t("uuidGenerator.example.logging.desc"),
      version: "v7" as const,
      format: "standard" as const,
    },
  ];

  const loadExample = (version: string, format: string) => {
    setOptions({
      ...options,
      version: version as UuidOptions["version"],
      format: format as UuidOptions["format"],
    });
    setUuid("");
    setUuids([]);
  };

  return (
    <section
      className="mb-12"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto" }}
    >
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 animate-fade-in">
            <Sparkles className="h-5 w-5" />
            {t("uuidGenerator.examplesTitle")}
          </h2>
          <p
            className="text-sm text-muted-foreground mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {t("uuidGenerator.examplesDesc")}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, index) => (
              <div
                key={index}
                className="pixel-card p-4 space-y-3 relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{example.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {example.desc}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2 relative z-10">
                    <button
                      type="button"
                      onClick={() =>
                        loadExample(example.version, example.format)
                      }
                      className="pixel-btn px-3 py-1 text-xs h-7 hover:scale-105 active:scale-95 transition-transform"
                      title="Load Options Only"
                    >
                      <Sparkles className="h-3 w-3 animate-spin-slow" />
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const tempUuid = generateUuid({
                          ...options,
                          version: example.version,
                          format: example.format,
                        });
                        await navigator.clipboard.writeText(tempUuid);
                      }}
                      className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors hover:scale-105 active:scale-95"
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
  );
}

// Comprehensive Technical Details Component
function TechnicalDetailsSection({ t }: { t: TranslateFn }) {
  const [expanded, setExpanded] = useState(false);

  const v4Details = [
    t("uuidGenerator.tech.v4.entropy"),
    t("uuidGenerator.tech.v4.bits"),
    t("uuidGenerator.tech.v4.random"),
    t("uuidGenerator.tech.v4.uniqueness"),
  ];

  const v7Details = [
    t("uuidGenerator.tech.v7.timestamp"),
    t("uuidGenerator.tech.v7.counter"),
    t("uuidGenerator.tech.v7.random"),
    t("uuidGenerator.tech.v7.sortable"),
  ];

  const implementationExamples = [
    {
      lang: "JavaScript",
      code: `const uuid = crypto.randomUUID();
console.log(uuid);`,
    },
    {
      lang: "Python",
      code: `import uuid
id = uuid.uuid4()
print(id)`,
    },
    {
      lang: "Go",
      code: `import "github.com/google/uuid"
id := uuid.New()
fmt.Println(id.String())`,
    },
    {
      lang: "Rust",
      code: `use uuid::Uuid;
let id = Uuid::new_v4();
println!("{}", id);`,
    },
  ];

  return (
    <section
      className="mb-12"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto" }}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25 cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <h2 className="text-lg font-semibold">
          {t("uuidGenerator.technicalDetailsTitle")}
        </h2>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-6 pt-6">
          {/* Version 4 Details */}
          <Card className="rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-cyan-500 rounded-full" />
                UUID v4 Technical Details
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {v4Details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-150"
                  >
                    <span className="w-2 h-2 bg-cyan-500/50 rounded-full mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Version 7 Details */}
          <Card className="rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full" />
                UUID v7 Technical Details
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {v7Details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-150"
                  >
                    <span className="w-2 h-2 bg-purple-500/50 rounded-full mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Implementation Examples */}
          <Card className="rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">
                {t("uuidGenerator.implementationTitle")}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {implementationExamples.map((example, index) => (
                  <div
                    key={example.lang}
                    className="bg-muted/30 rounded-lg p-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-xs font-medium mb-2 text-muted-foreground">
                      {example.lang}
                    </div>
                    <CodeHighlighter
                      code={example.code}
                      language="javascript"
                      className="text-xs"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RFC References */}
          <Card className="rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">
                {t("uuidGenerator.rfcReferencesTitle")}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="font-mono text-primary font-semibold min-w-[80px]">
                    RFC 4122
                  </span>
                  <span className="text-muted-foreground">
                    {t("uuidGenerator.rfc4122.desc")}
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="font-mono text-primary font-semibold min-w-[80px]">
                    RFC 9562
                  </span>
                  <span className="text-muted-foreground">
                    {t("uuidGenerator.rfc9562.desc")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// SEO Content Section
function SeoContentSection({ t }: { t: TranslateFn }) {
  const features = [
    {
      title: t("uuidGenerator.feature.rfc.title"),
      desc: t("uuidGenerator.feature.rfc.desc"),
      icon: "📋",
    },
    {
      title: t("uuidGenerator.feature.formats.title"),
      desc: t("uuidGenerator.feature.formats.desc"),
      icon: "🔤",
    },
    {
      title: t("uuidGenerator.feature.bulk.title"),
      desc: t("uuidGenerator.feature.bulk.desc"),
      icon: "⚡",
    },
    {
      title: t("uuidGenerator.feature.privacy.title"),
      desc: t("uuidGenerator.feature.privacy.desc"),
      icon: "🔒",
    },
    {
      title: t("uuidGenerator.feature.performance.title"),
      desc: t("uuidGenerator.feature.performance.desc"),
      icon: "🚀",
    },
    {
      title: t("uuidGenerator.feature.compatibility.title"),
      desc: t("uuidGenerator.feature.compatibility.desc"),
      icon: "🌐",
    },
  ];

  const useCases = [
    t("uuidGenerator.useCase.db"),
    t("uuidGenerator.useCase.session"),
    t("uuidGenerator.useCase.distributed"),
    t("uuidGenerator.useCase.files"),
    t("uuidGenerator.useCase.queue"),
    t("uuidGenerator.useCase.api"),
    t("uuidGenerator.useCase.logging"),
    t("uuidGenerator.useCase.cache"),
  ];

  const versionComparison = [
    {
      version: "UUID v1",
      method: t("uuidGenerator.comparison.v1.method"),
      sortable: t("uuidGenerator.comparison.v1.sortable"),
      entropy: t("uuidGenerator.comparison.v1.entropy"),
      privacy: t("uuidGenerator.comparison.v1.privacy"),
      bestFor: t("uuidGenerator.comparison.v1.bestFor"),
    },
    {
      version: "UUID v4",
      method: t("uuidGenerator.comparison.v4.method"),
      sortable: t("uuidGenerator.comparison.v4.sortable"),
      entropy: t("uuidGenerator.comparison.v4.entropy"),
      privacy: t("uuidGenerator.comparison.v4.privacy"),
      bestFor: t("uuidGenerator.comparison.v4.bestFor"),
    },
    {
      version: "UUID v7",
      method: t("uuidGenerator.comparison.v7.method"),
      sortable: t("uuidGenerator.comparison.v7.sortable"),
      entropy: t("uuidGenerator.comparison.v7.entropy"),
      privacy: t("uuidGenerator.comparison.v7.privacy"),
      bestFor: t("uuidGenerator.comparison.v7.bestFor"),
    },
  ];

  const bestPractices = [
    t("uuidGenerator.bestPractice.v7"),
    t("uuidGenerator.bestPractice.storage"),
    t("uuidGenerator.bestPractice.security"),
    t("uuidGenerator.bestPractice.validation"),
  ];

  return (
    <section
      className="mb-12"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto" }}
    >
      <h2 className="text-xl font-bold mb-4 animate-fade-in">
        {t("uuidGenerator.whatIsUuidTitle")}
      </h2>
      <p
        className="text-muted-foreground leading-relaxed mb-6 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
        dangerouslySetInnerHTML={{
          __html: t("uuidGenerator.description") || "",
        }}
      />

      {/* Core Features */}
      <h3
        className="text-lg font-semibold mt-8 mb-4 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {t("uuidGenerator.featuresTitle")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="pixel-card p-4 animate-fade-in-up hover:scale-103 hover:-translate-y-1 transition-all duration-200"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <span className="text-2xl mb-2 block">{feature.icon}</span>
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Version Comparison Table */}
      <h3
        className="text-lg font-semibold mt-8 mb-4 animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        {t("uuidGenerator.comparisonTitle")}
      </h3>
      <div
        className="overflow-x-auto animate-fade-in"
        style={{ animationDelay: "0.9s" }}
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.version")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.method")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.sortable")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.entropy")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.privacy")}
              </th>
              <th className="text-left p-3 font-semibold">
                {t("uuidGenerator.comparison.bestFor")}
              </th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {versionComparison.map((row, _index) => (
              <tr
                key={row.version}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="p-3 font-medium text-foreground">
                  {row.version}
                </td>
                <td className="p-3">{row.method}</td>
                <td className="p-3">{row.sortable}</td>
                <td className="p-3">{row.entropy}</td>
                <td className="p-3">{row.privacy}</td>
                <td className="p-3">{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h3
        className="text-lg font-semibold mt-8 mb-4 animate-fade-in"
        style={{ animationDelay: "1s" }}
      >
        {t("uuidGenerator.useCasesTitle")}
      </h3>
      <ul
        className="text-muted-foreground space-y-2 mb-8 animate-fade-in"
        style={{ animationDelay: "1.1s" }}
      >
        {useCases.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm hover:translate-x-1 transition-transform duration-150"
          >
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Best Practices */}
      <h3
        className="text-lg font-semibold mt-8 mb-4 animate-fade-in"
        style={{ animationDelay: "1.2s" }}
      >
        {t("uuidGenerator.bestPracticesTitle")}
      </h3>
      <div
        className="grid gap-3 sm:grid-cols-2 mb-8 animate-fade-in"
        style={{ animationDelay: "1.3s" }}
      >
        {bestPractices.map((practice, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <span className="text-green-500 mt-0.5">✓</span>
            <span className="text-sm">{practice}</span>
          </div>
        ))}
      </div>

      {/* Technical Details Reference */}
      <div
        className="bg-muted/30 rounded-xl p-4 mb-6 animate-fade-in"
        style={{ animationDelay: "1.4s" }}
      >
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-lg">💻</span>
          {t("uuidGenerator.techDetailsTitle")}
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
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
              __html: t("uuidGenerator.tech.collision"),
            }}
          />
        </div>
      </div>

      {/* Security Considerations */}
      <Card
        className="rounded-xl overflow-hidden mb-6 animate-fade-in"
        style={{ animationDelay: "1.5s" }}
      >
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-lg">🔐</span>
            {t("uuidGenerator.securityTitle")}
          </h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3 p-2 bg-red-500/10 rounded-lg">
              <span className="text-red-500 font-semibold">⚠️</span>
              <span>{t("uuidGenerator.security.v1Warning")}</span>
            </div>
            <div className="flex items-start gap-3 p-2 bg-yellow-500/10 rounded-lg">
              <span className="text-yellow-500 font-semibold">⚡</span>
              <span>{t("uuidGenerator.security.v7Warning")}</span>
            </div>
            <div className="flex items-start gap-3 p-2 bg-green-500/10 rounded-lg">
              <span className="text-green-500 font-semibold">✓</span>
              <span>{t("uuidGenerator.security.v4Secure")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// Generator Card Component
function GeneratorCard({
  t,
  options,
  setOptions,
  uuid,
  uuids,
  setUuid,
  setUuids,
  handleGenerate,
  handleBulkGenerate,
  copyToClipboard,
  activeTab,
  setActiveTab,
  generationStats,
}: {
  t: TranslateFn;
  options: UuidOptions;
  setOptions: (options: UuidOptions) => void;
  uuid: string;
  uuids: string[];
  setUuid: (uuid: string) => void;
  setUuids: (uuids: string[]) => void;
  handleGenerate: () => void;
  handleBulkGenerate: () => void;
  copyToClipboard: (text: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  generationStats: {
    totalGenerations: number;
    v4Count: number;
    v7Count: number;
    bulkCount: number;
    lastUsed: Date | null;
  };
}) {
  const badges = [
    {
      label: `${generationStats.totalGenerations} Generated`,
      color: "bg-primary/10 text-primary",
      dot: "bg-primary",
    },
    {
      label: `${generationStats.v4Count} v4`,
      color: "bg-cyan-500/10 text-cyan-600",
      dot: "bg-cyan-500",
    },
    {
      label: `${generationStats.v7Count} v7`,
      color: "bg-purple-500/10 text-purple-600",
      dot: "bg-purple-500",
    },
  ];

  return (
    <section
      className="mb-12 animate-fade-in-up"
      style={{ animationDelay: "0.2s" }}
    >
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
                {badges.map((badge) => (
                  <div
                    key={badge.label}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${badge.dot}`} />
                    {badge.label}
                  </div>
                ))}
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
                <div
                  className="space-y-4 animate-fade-in-left"
                  style={{ animationDelay: "0.2s" }}
                >
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

                <UuidOutput
                  uuid={uuid}
                  placeholder={t("uuidGenerator.outputPlaceholder")}
                  onCopy={() => copyToClipboard(uuid)}
                  label={t("uuidGenerator.outputLabel")}
                />
              </div>

              <div
                className="flex items-center justify-between gap-3 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    onClick={handleGenerate}
                    className="gap-2 rounded-xl h-11 hover:scale-103 active:scale-97 transition-transform"
                  >
                    <Sparkles className="h-4 w-4 animate-spin-slow" />
                    {t("uuidGenerator.generateBtn")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    disabled={!uuid}
                    className="gap-2 rounded-xl h-11 hover:scale-103 active:scale-97 transition-transform"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t("uuidGenerator.regenerate")}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div
                  className="space-y-4 animate-fade-in-left"
                  style={{ animationDelay: "0.2s" }}
                >
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
                    className="w-full rounded-xl h-11 hover:scale-103 active:scale-97 transition-transform"
                  >
                    {t("uuidGenerator.generateMultiple")}
                  </Button>
                </div>

                <div
                  className="space-y-2 animate-fade-in-right"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex items-center justify-between h-8">
                    <span className="text-sm font-medium">
                      Generated UUIDs ({uuids.length})
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(uuids.join("\n"))}
                      disabled={uuids.length === 0}
                      className="rounded-lg hover:scale-105 active:scale-95 transition-transform"
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
                              className="h-6 w-6 p-0 hover:scale-110 transition-transform"
                              aria-label="Copy"
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
  );
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

  const badges = [
    t("badge.free"),
    t("badge.noSignup"),
    t("badge.offline"),
    t("badge.rfcCompliant"),
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 animate-fade-in">
      {/* Hero Section */}
      <section className="mb-10 text-center">
        <AnimatedIcon />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 animate-fade-in-up">
          {t("uuidGenerator.pageTitle") || "UUID Generator"}
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {t("uuidGenerator.pageSubtitle") ||
            "Generate universally unique identifiers instantly"}
        </p>

        <div
          className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {badges.map((tag) => (
            <span key={tag} className="pixel-badge">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <GeneratorCard
        t={t}
        options={options}
        setOptions={setOptions}
        uuid={uuid}
        uuids={uuids}
        setUuid={setUuid}
        setUuids={setUuids}
        handleGenerate={handleGenerate}
        handleBulkGenerate={handleBulkGenerate}
        copyToClipboard={copyToClipboard}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        generationStats={generationStats}
      />

      <ExamplesSection
        t={t}
        setOptions={setOptions}
        setUuid={setUuid}
        setUuids={setUuids}
        options={options}
      />

      <SeoContentSection t={t} />

      <TechnicalDetailsSection t={t} />

      <FaqSection t={t} />

      <RelatedTools lang={lang} currentTool="uuid-generator" />
    </div>
  );
}
