"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface EmailToolExamplesProps {
  lang: LanguageType;
  onLoadExtractExample: (exampleText: string) => void;
  onLoadVerifyExample: (exampleEmail: string) => void;
}

export function EmailToolExamples({
  lang,
  onLoadExtractExample,
  onLoadVerifyExample,
}: EmailToolExamplesProps) {
  const { t } = useTranslation(lang);

  const extractExamples = [
    {
      title: t("emailTool.example.contactForm.title"),
      desc: t("emailTool.example.contactForm.desc"),
      text: `Name: John Doe
Email: john.doe@example.com
Phone: +1-555-123-4567
Message: Hello!`,
    },
    {
      title: t("emailTool.example.newsletter.title"),
      desc: t("emailTool.example.newsletter.desc"),
      text: `Weekly Newsletter Subscribers:
- alice@techstart.io
- bob@webdev.com
- charlie@designstudio.org`,
    },
    {
      title: t("emailTool.example.business.title"),
      desc: t("emailTool.example.business.desc"),
      text: `Contact us at:
info@company.com
sales@company.com
support@company.com`,
    },
  ];

  const verifyExamples = [
    {
      title: t("emailTool.example.valid.title"),
      desc: t("emailTool.example.valid.desc"),
      email: "john.doe@example.com",
      isValid: true,
    },
    {
      title: t("emailTool.example.invalid.title"),
      desc: t("emailTool.example.invalid.desc"),
      email: "notanemail",
      isValid: false,
    },
    {
      title: t("emailTool.example.businessEmail.title"),
      desc: t("emailTool.example.businessEmail.desc"),
      email: "contact@company.org",
      isValid: true,
    },
  ];

  return (
    <section className="mb-12">
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t("emailTool.examplesTitle")}
          </h2>

          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">
              {t("emailTool.extractExamplesTitle")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extractExamples.map((example, index) => (
                <div
                  key={`extract-${index}`}
                  className="pixel-card p-4 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{example.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {example.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onLoadExtractExample(example.text)}
                      className="pixel-btn px-3 py-1 text-xs h-7"
                      title="Load Example"
                    >
                      <Sparkles className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.text.substring(0, 50)}
                    {example.text.length > 50 ? "..." : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">
              {t("emailTool.verifyExamplesTitle")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verifyExamples.map((example, index) => (
                <div
                  key={`verify-${index}`}
                  className="pixel-card p-4 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{example.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {example.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onLoadVerifyExample(example.email)}
                      className="pixel-btn px-3 py-1 text-xs h-7"
                      title="Load Example"
                    >
                      <Sparkles className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.email}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      example.isValid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {example.isValid
                      ? t("emailTool.valid")
                      : t("emailTool.invalid")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
