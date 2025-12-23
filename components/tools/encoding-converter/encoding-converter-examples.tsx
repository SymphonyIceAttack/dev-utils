"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface ExampleData {
  titleKey: string;
  data: string;
  description: string;
}

interface EncodingConverterExamplesProps {
  lang: LanguageType;
  onLoadExample: (data: string) => void;
}

export function EncodingConverterExamples({
  lang,
  onLoadExample,
}: EncodingConverterExamplesProps) {
  const { t } = useTranslation(lang);

  const exampleData: ExampleData[] = [
    {
      titleKey: "encodingConverter.examples.chinese",
      data: "你好世界！Hello World!",
      description: "Mixed Chinese and English text",
    },
    {
      titleKey: "encodingConverter.examples.japanese",
      data: "こんにちは世界",
      description: "Japanese Hiragana text",
    },
    {
      titleKey: "encodingConverter.examples.mixed",
      data: "Héllo Wörld 你好 🌍",
      description: "Multilingual text with emoji",
    },
  ];

  return (
    <section className="mb-12">
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t("encodingConverter.examples")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("encodingConverter.examplesHint")} Click on any example to load
            it into the input field, or use "Quick Run" to automatically
            convert:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exampleData.map((example) => (
              <EncodingConverterExampleCard
                key={example.titleKey}
                example={example}
                onLoadExample={onLoadExample}
                t={t}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

interface EncodingConverterExampleCardProps {
  example: ExampleData;
  onLoadExample: (data: string) => void;
  t: (key: string) => string;
}

function EncodingConverterExampleCard({
  example,
  onLoadExample,
  t,
}: EncodingConverterExampleCardProps) {
  const copyToClipboard = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(example.data);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: Container div needed to allow nested buttons
    <div
      role="button"
      tabIndex={0}
      className="pixel-card p-4 space-y-3 cursor-pointer w-full text-left"
      onClick={() => onLoadExample(example.data)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onLoadExample(example.data);
        }
      }}
    >
      <div className="flex items-start justify-between">
        <h4 className="text-sm font-semibold flex-1">
          <button
            type="button"
            className="text-left w-full outline-none focus:ring-2 focus:ring-primary rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onLoadExample(example.data);
            }}
            aria-label={t(example.titleKey)}
          >
            {t(example.titleKey)}
          </button>
        </h4>
        <div className="flex gap-1 ml-2 relative z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLoadExample(example.data);
            }}
            className="pixel-btn px-3 py-1 text-xs h-7"
            title="Load Example Only"
            aria-label="Load example only"
          >
            <Sparkles className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            onKeyDown={copyToClipboard}
            className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
            title="Copy"
            aria-label="Copy example data"
          >
            <span className="sr-only">Copy</span>
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
        {example.data}
      </p>
    </div>
  );
}
