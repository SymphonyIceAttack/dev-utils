import {
  ArrowRight,
  Clock,
  Code,
  FileJson,
  FileText,
  Hash,
  KeyRound,
  Palette,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tools = [
  {
    title: "JSON Formatter",
    description:
      "Format, validate, and beautify your JSON data with syntax highlighting",
    icon: FileJson,
    href: "/tools/json-formatter",
    color: "text-yellow-500",
  },
  {
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings and files instantly",
    icon: Code,
    href: "/tools/base64",
    color: "text-blue-500",
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 and other hash values",
    icon: Hash,
    href: "/tools/hash",
    color: "text-purple-500",
  },
  {
    title: "UUID Generator",
    description: "Generate unique UUIDs v4 and v7 for your applications",
    icon: KeyRound,
    href: "/tools/uuid",
    color: "text-green-500",
  },
  {
    title: "Color Converter",
    description: "Convert between HEX, RGB, HSL and other color formats",
    icon: Palette,
    href: "/tools/color",
    color: "text-pink-500",
  },
  {
    title: "QR Code Generator",
    description: "Create QR codes for URLs, text, and contact information",
    icon: QrCode,
    href: "/tools/qrcode",
    color: "text-orange-500",
  },
  {
    title: "Markdown Preview",
    description: "Write and preview Markdown with live rendering",
    icon: FileText,
    href: "/tools/markdown",
    color: "text-cyan-500",
  },
  {
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps and human readable dates",
    icon: Clock,
    href: "/tools/timestamp",
    color: "text-red-500",
  },
];

export function ToolsSection() {
  return (
    <section className="border-t border-border bg-card/50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Popular Tools</h2>
            <p className="mt-2 text-muted-foreground">
              Explore our most used developer utilities
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/tools">
              View All Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.title} href={tool.href}>
                <Card className="group h-full transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/5">
                  <CardHeader>
                    <div
                      className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ${tool.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
