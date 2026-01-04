import {
  ArrowRight,
  Binary,
  BookOpen,
  Code,
  Hash,
  Key,
  Link2,
  Mail,
  Shuffle,
  Type,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface RelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

const toolConfig = {
  "base64-encoder": {
    icon: Key,
    titleKey: "base64Encoder.pageTitle",
    path: "/tools/base64-encoder",
  },
  "url-encoder": {
    icon: Link2,
    titleKey: "urlEncoder.pageTitle",
    path: "/",
  },
  "encoding-converter": {
    icon: Shuffle,
    titleKey: "encodingConverter.pageTitle",
    path: "/tools/encoding-converter",
  },
  "md5-generator": {
    icon: Hash,
    titleKey: "md5Generator.pageTitle",
    path: "/tools/md5-generator",
  },
  "password-generator": {
    icon: Wrench,
    titleKey: "passwordGenerator.pageTitle",
    path: "/tools/password-generator",
  },
  "uuid-generator": {
    icon: Type,
    titleKey: "uuidGenerator.pageTitle",
    path: "/tools/uuid-generator",
  },
  "binary-code-translator": {
    icon: Binary,
    titleKey: "binaryCodeTranslator.pageTitle",
    path: "/tools/binary-code-translator",
  },
  "email-tool": {
    icon: Mail,
    titleKey: "emailTool.pageTitle",
    path: "/tools/email-tool",
  },
};

const guideConfig = {
  "base64-guide": {
    icon: BookOpen,
    titleKey: "base64Encoder.seo.title",
    path: "/blog/base64-guide",
  },
  "url-encoding-guide": {
    icon: BookOpen,
    titleKey: "urlEncoder.seo.title",
    path: "/blog/url-encoding-guide",
  },
  "encoding-guide": {
    icon: BookOpen,
    titleKey: "encodingConverter.seo.title",
    path: "/blog/encoding-guide",
  },
  "encoding-converter-guide": {
    icon: BookOpen,
    titleKey: "encodingConverter.seo.title",
    path: "/blog/encoding-converter-guide",
  },
  "md5-guide": {
    icon: BookOpen,
    titleKey: "md5Generator.seo.title",
    path: "/blog/md5-guide",
  },
  "password-guide": {
    icon: BookOpen,
    titleKey: "passwordGenerator.seo.title",
    path: "/blog/password-guide",
  },
  "uuid-guide": {
    icon: BookOpen,
    titleKey: "uuidGenerator.seo.title",
    path: "/blog/uuid-guide",
  },
  "binary-code-guide": {
    icon: BookOpen,
    titleKey: "binaryCodeTranslator.seoTitle",
    path: "/blog/binary-code-guide",
  },
  "email-guide": {
    icon: BookOpen,
    titleKey: "emailTool.seoTitle",
    path: "/blog/email-guide",
  },
};

const getRecommendedTools = (currentTool: string) => {
  const toolKeys = Object.keys(toolConfig);
  const filteredTools = toolKeys.filter((tool) => tool !== currentTool);

  // Use fixed order instead of random
  const fixedOrder = [
    "base64-encoder",
    "url-encoder",
    "encoding-converter",
    "md5-generator",
    "password-generator",
    "uuid-generator",
    "binary-code-translator",
    "email-tool",
  ];
  const sortedTools = filteredTools
    .filter((tool) => fixedOrder.includes(tool))
    .sort((a, b) => fixedOrder.indexOf(a) - fixedOrder.indexOf(b));

  // Return first 2 tools
  return sortedTools.slice(0, 2);
};

const getRecommendedGuide = (currentTool: string) => {
  const guideKeys = Object.keys(guideConfig);

  // Build mapping from tool names to guide names
  const toolToGuideMap: Record<string, string> = {
    "base64-encoder": "base64-guide",
    "url-encoder": "url-encoding-guide",
    "encoding-converter": "encoding-converter-guide",
    "md5-generator": "md5-guide",
    "password-generator": "password-guide",
    "uuid-generator": "uuid-guide",
    "binary-code-translator": "binary-code-guide",
    "email-tool": "email-guide",
  };

  const currentGuideKey = toolToGuideMap[currentTool];

  // If current tool has a corresponding guide, use it
  if (
    currentGuideKey &&
    guideConfig[currentGuideKey as keyof typeof guideConfig]
  ) {
    return currentGuideKey;
  }

  // Use fixed order for guides instead of random
  const fixedGuideOrder = [
    "base64-guide",
    "url-encoding-guide",
    "encoding-guide",
    "encoding-converter-guide",
    "md5-guide",
    "password-guide",
    "uuid-guide",
    "binary-code-guide",
    "email-guide",
  ];
  const availableGuides = guideKeys.filter((guide) =>
    fixedGuideOrder.includes(guide),
  );
  const sortedGuides = availableGuides.sort(
    (a, b) => fixedGuideOrder.indexOf(a) - fixedGuideOrder.indexOf(b),
  );

  return sortedGuides[0] || guideKeys[0];
};

export function RelatedTools({ lang, currentTool }: RelatedToolsProps) {
  const { t } = useTranslation(lang);

  const recommendedToolKeys = getRecommendedTools(currentTool);
  const recommendedGuideKey = getRecommendedGuide(currentTool);

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <Code className="h-5 w-5" />
          {t("common.relatedTools")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("common.relatedToolsDesc")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recommended Tools */}
        {recommendedToolKeys.map((toolKey) => {
          const config = toolConfig[toolKey as keyof typeof toolConfig];
          if (!config) return null;

          const Icon = config.icon;
          const fullPath = `/${lang}${config.path}`;

          return (
            <Link key={toolKey} href={fullPath}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                <CardContent className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="pixel-icon-box inline-flex items-center justify-center w-12 h-12 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {t(config.titleKey)}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("common.relatedToolDesc")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}

        {/* Recommended Guide */}
        {(() => {
          const guide =
            guideConfig[recommendedGuideKey as keyof typeof guideConfig];
          if (!guide) return null;

          const GuideIcon = guide.icon;
          const guidePath = `/en${guide.path}`;

          return (
            <Link href={guidePath}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                <CardContent className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="pixel-icon-box inline-flex items-center justify-center w-12 h-12 group-hover:scale-110 transition-transform">
                      <GuideIcon className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {t(guide.titleKey)}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("common.relatedGuideDesc")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })()}
      </div>
    </section>
  );
}
