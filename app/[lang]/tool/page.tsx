"use client";

import { motion } from "framer-motion";
import { FileJson } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const allTools = [
  {
    title: "JSON Formatter",
    description:
      "Format, validate, and beautify your JSON data with syntax highlighting",
    icon: FileJson,
    href: "/tools/json-formatter",
    color: "text-yellow-500",
    category: "Data",
  },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
        <p className="text-lg text-muted-foreground">
          A collection of useful tools for developers
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={tool.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${tool.color}`} />
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
