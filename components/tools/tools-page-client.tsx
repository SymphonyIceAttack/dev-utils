"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Hash,
  Key,
  KeyRound,
  Link as LinkIcon,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
    href: "/tools/url-encoder",
    color: "text-blue-500",
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
    titleKey: "md5Generator.title",
    descriptionKey: "md5Generator.description",
    icon: Hash,
    href: "/tools/md5-generator",
    color: "text-purple-500",
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
    titleKey: "passwordGenerator.title",
    descriptionKey: "passwordGenerator.description",
    icon: KeyRound,
    href: "/tools/password-generator",
    color: "text-pink-500",
    category: "tools.category.encoding",
  },
];

const categories = [
  { key: "tools.category.all", value: "all" },
  { key: "tools.category.encoding", value: "tools.category.encoding" },
];

interface ToolsPageClientProps {
  lang: LanguageType;
}

export function ToolsPageClient({ lang }: ToolsPageClientProps) {
  const { t } = useTranslation(lang);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      t(tool.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(tool.descriptionKey).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">{t("tools.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("tools.subtitle")}</p>
      </motion.div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("tools.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={
                selectedCategory === category.value ? "default" : "outline"
              }
              onClick={() => setSelectedCategory(category.value)}
              className="text-sm"
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
              <Link href={`/${lang}${tool.href}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${tool.color}`} />
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("tools.noResults")}</p>
        </div>
      )}
    </div>
  );
}
