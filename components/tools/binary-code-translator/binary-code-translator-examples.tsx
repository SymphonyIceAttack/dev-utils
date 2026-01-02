"use client";

import { Copy, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface BinaryCodeTranslatorExamplesProps {
  lang: LanguageType;
  onLoadExample: (
    mode: "textToBinary" | "binaryToText",
    exampleText: string,
  ) => void;
}

type ConversionMode = "textToBinary" | "binaryToText";

export function BinaryCodeTranslatorExamples({
  lang,
  onLoadExample,
}: BinaryCodeTranslatorExamplesProps) {
  const { t } = useTranslation(lang);

  const examples = [
    {
      title: t("binaryCodeTranslator.example.helloWorld.title"),
      desc: t("binaryCodeTranslator.example.helloWorld.desc"),
      mode: "textToBinary" as ConversionMode,
      text: "Hello World",
    },
    {
      title: t("binaryCodeTranslator.example.kitty.title"),
      desc: t("binaryCodeTranslator.example.kitty.desc"),
      mode: "textToBinary" as ConversionMode,
      text: "Kitty",
    },
    {
      title: t("binaryCodeTranslator.example.binaryHello.title"),
      desc: t("binaryCodeTranslator.example.binaryHello.desc"),
      mode: "binaryToText" as ConversionMode,
      text: "01001000 01100101 01101100 01101100 01101111",
    },
    {
      title: t("binaryCodeTranslator.example.binaryA.title"),
      desc: t("binaryCodeTranslator.example.binaryA.desc"),
      mode: "binaryToText" as ConversionMode,
      text: "01000001",
    },
    {
      title: t("binaryCodeTranslator.example.asciiArt.title"),
      desc: t("binaryCodeTranslator.example.asciiArt.desc"),
      mode: "textToBinary" as ConversionMode,
      text: "^_^",
    },
    {
      title: t("binaryCodeTranslator.example.number.title"),
      desc: t("binaryCodeTranslator.example.number.desc"),
      mode: "binaryToText" as ConversionMode,
      text: "00110001 00110010 00110011",
    },
  ];

  return (
    <section className="mb-12">
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t("binaryCodeTranslator.examplesTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("binaryCodeTranslator.examplesDesc")}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, index) => (
              <div
                key={index}
                className="pixel-card p-4 space-y-3 relative group"
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
                      onClick={() => onLoadExample(example.mode, example.text)}
                      className="pixel-btn px-3 py-1 text-xs h-7"
                      title="Load Example"
                    >
                      <Sparkles className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (example.mode === "textToBinary") {
                          const binary = example.text
                            .split("")
                            .map((char) =>
                              char.charCodeAt(0).toString(2).padStart(8, "0"),
                            )
                            .join(" ");
                          await navigator.clipboard.writeText(binary);
                        } else {
                          await navigator.clipboard.writeText(example.text);
                        }
                      }}
                      className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
                      title="Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                  {example.mode === "textToBinary"
                    ? example.text.substring(0, 20) +
                      (example.text.length > 20 ? "..." : "")
                    : example.text.substring(0, 30) +
                      (example.text.length > 30 ? "..." : "")}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
