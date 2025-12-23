"use client";

import { Copy, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface UuidGeneratorExamplesProps {
  lang: LanguageType;
  onLoadExample: (version: string, format: string) => void;
}

export function UuidGeneratorExamples({
  lang,
  onLoadExample,
}: UuidGeneratorExamplesProps) {
  const { t } = useTranslation(lang);

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
  ];

  return (
    <section className="mb-12">
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t("uuidGenerator.examplesTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("uuidGenerator.examplesDesc")}
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
                      onClick={() =>
                        onLoadExample(example.version, example.format)
                      }
                      className="pixel-btn px-3 py-1 text-xs h-7"
                      title="Load Options Only"
                    >
                      <Sparkles className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const tempUuid = generateExampleUuid(
                          example.version,
                          example.format,
                        );
                        await navigator.clipboard.writeText(tempUuid);
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
  );
}

function generateExampleUuid(version: string, format: string): string {
  let uuid: string;

  if (version === "v7") {
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
    uuid = `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
  } else {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
    uuid = `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
  }

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
