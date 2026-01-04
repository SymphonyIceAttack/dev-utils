"use client";

import { motion } from "framer-motion";
import {
  Binary,
  FileText,
  Fingerprint,
  Hash,
  Key,
  KeyRound,
  Link as LinkIcon,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

const allTools = [
  {
    titleKey: "urlEncoder.title",
    descriptionKey: "urlEncoder.description",
    icon: LinkIcon,
    href: "/",
    color: "text-blue-500",
    category: "tools.category.encoding",
  },
  {
    titleKey: "binaryCodeTranslator.title",
    descriptionKey: "binaryCodeTranslator.description",
    icon: Binary,
    href: "/tools/binary-code-translator",
    color: "text-indigo-500",
    category: "tools.category.encoding",
  },
  {
    titleKey: "base64Encoder.title",
    descriptionKey: "base64Encoder.description",
    icon: Key,
    href: "/tools/base64-encoder",
    color: "text-green-500",
    category: "tools.category.encoding",
  },
  {
    titleKey: "encodingConverter.title",
    descriptionKey: "encodingConverter.description",
    icon: FileText,
    href: "/tools/encoding-converter",
    color: "text-orange-500",
    category: "tools.category.encoding",
  },
  {
    titleKey: "md5Generator.title",
    descriptionKey: "md5Generator.description",
    icon: Hash,
    href: "/tools/md5-generator",
    color: "text-purple-500",
    category: "tools.category.hashing",
  },
  {
    titleKey: "passwordGenerator.title",
    descriptionKey: "passwordGenerator.description",
    icon: KeyRound,
    href: "/tools/password-generator",
    color: "text-pink-500",
    category: "tools.category.generators",
  },
  {
    titleKey: "uuidGenerator.title",
    descriptionKey: "uuidGenerator.description",
    icon: Fingerprint,
    href: "/tools/uuid-generator",
    color: "text-cyan-500",
    category: "tools.category.generators",
  },
  {
    titleKey: "emailTool.title",
    descriptionKey: "emailTool.description",
    icon: Mail,
    href: "/tools/email-tool",
    color: "text-teal-500",
    category: "tools.category.email",
  },
];

const categories = [
  { key: "tools.category.all", value: "all" },
  { key: "tools.category.encoding", value: "tools.category.encoding" },
  { key: "tools.category.hashing", value: "tools.category.hashing" },
  { key: "tools.category.generators", value: "tools.category.generators" },
  { key: "tools.category.email", value: "tools.category.email" },
];

interface ToolsPageClientProps {
  lang: LanguageType;
}

export function ToolsPageClient({ lang }: ToolsPageClientProps) {
  const { t } = useTranslation(lang);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Performance optimization: Memoize filtered results
  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      return matchesCategory;
    });
  }, [selectedCategory, t]);

  // Performance optimization: Memoize callbacks
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8" aria-labelledby="tools-title">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 id="tools-title" className="text-4xl font-bold mb-4">
          {t("tools.title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("tools.subtitle")}</p>
      </motion.div>

      {/* Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={
                selectedCategory === category.value ? "default" : "outline"
              }
              onClick={() => handleCategoryChange(category.value)}
              className="text-sm"
              aria-pressed={selectedCategory === category.value}
            >
              {t(category.key)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${lang}${tool.href}`} aria-label={t(tool.titleKey)}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`h-6 w-6 ${tool.color}`}
                        aria-hidden="true"
                      />
                      <CardTitle className="text-lg">
                        {t(tool.titleKey)}
                      </CardTitle>
                    </div>
                    <CardDescription>{t(tool.descriptionKey)}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12" aria-live="polite">
          <p className="text-muted-foreground">{t("tools.noResults")}</p>
        </div>
      )}
    </main>
  );
}
