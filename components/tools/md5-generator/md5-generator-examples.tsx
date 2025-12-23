import { Copy, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface ExampleData {
  titleKey: string;
  data: string;
}

interface Md5GeneratorExamplesProps {
  lang: LanguageType;
  onLoadExample: (data: string) => void;
}

export function Md5GeneratorExamples({
  lang,
  onLoadExample,
}: Md5GeneratorExamplesProps) {
  const { t } = useTranslation(lang);

  const exampleData: ExampleData[] = [
    { titleKey: "md5Generator.examples.simpleText", data: "Hello World!" },
    { titleKey: "md5Generator.examples.password", data: "MySecurePassword123" },
    {
      titleKey: "md5Generator.examples.fileChecksum",
      data: "The quick brown fox jumps over the lazy dog",
    },
  ];

  return (
    <section className="mb-12">
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t("md5Generator.exampleInputs")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("md5Generator.examplesHint")}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exampleData.map((example) => (
              <Md5GeneratorExampleCard
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

interface Md5GeneratorExampleCardProps {
  example: ExampleData;
  onLoadExample: (data: string) => void;
  t: (key: string) => string;
}

function Md5GeneratorExampleCard({
  example,
  onLoadExample,
  t,
}: Md5GeneratorExampleCardProps) {
  const copyToClipboard = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(example.data);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: Container div needed to allow nested buttons
    <div
      role="button"
      tabIndex={0}
      className="pixel-card p-4 space-y-3 relative group cursor-pointer"
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
            className="text-left w-full after:absolute after:inset-0 outline-none focus:ring-2 focus:ring-primary rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onLoadExample(example.data);
            }}
          >
            {t(example.titleKey)}
          </button>
        </h4>
        <div className="flex gap-1 ml-2 relative z-10">
          <button
            type="button"
            className="pixel-btn px-3 py-1 text-xs h-7"
            onClick={(e) => {
              e.stopPropagation();
              onLoadExample(example.data);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onLoadExample(example.data);
              }
            }}
            aria-label={t("md5Generator.loadExample")}
          >
            <Sparkles className="h-3 w-3" />
          </button>
          <button
            type="button"
            className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
            onClick={copyToClipboard}
            onKeyDown={copyToClipboard}
            aria-label="Copy"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      </div>
      <p className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
        {example.data}
      </p>
    </div>
  );
}
