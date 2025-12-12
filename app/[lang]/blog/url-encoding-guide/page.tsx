"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookmarkPlus,
  Calendar,
  Clock,
  Share2,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  MobileTableOfContents,
  TableOfContents,
} from "@/components/blog/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tocHeadings = [
  { id: "what-is-url-encoding", text: "What is URL Encoding?", level: 2 },
  { id: "why-url-encoding", text: "Why Do We Need URL Encoding?", level: 2 },
  { id: "how-it-works", text: "How URL Encoding Works", level: 2 },
  {
    id: "programming-languages",
    text: "URL Encoding in Different Languages",
    level: 2,
  },
  { id: "javascript", text: "JavaScript", level: 3 },
  { id: "python", text: "Python", level: 3 },
  { id: "go", text: "Go", level: 3 },
  { id: "common-issues", text: "Common Issues & Best Practices", level: 2 },
  {
    id: "encodeuri-vs-encodeuricomponent",
    text: "encodeURI vs encodeURIComponent",
    level: 3,
  },
  { id: "conclusion", text: "Conclusion", level: 2 },
];

export default function UrlEncodingGuidePage() {
  return (
    <article className="container mx-auto max-w-7xl px-4 py-12">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="rounded-full">URL Encoding</Badge>
              <Badge variant="secondary" className="rounded-full">
                Tutorial
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Web Development
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The Complete Guide to URL Encoding
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Deep dive into URL encoding principles, use cases, and best
              practices
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Dev Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>December 10, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            className="mb-8 rounded-2xl overflow-hidden border-2 border-foreground/10 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.05)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/url-encoding-diagram-with-special-characters.jpg"
              alt="URL Encoding Guide"
              className="w-full aspect-video object-cover"
            />
          </motion.div>

          {/* Mobile TOC */}
          <MobileTableOfContents headings={tocHeadings} />

          {/* Content */}
          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 id="what-is-url-encoding">What is URL Encoding?</h2>
            <p>
              URL encoding (also known as percent-encoding) is a mechanism for
              converting special characters into a format that can be safely
              transmitted in a URL. When a URL contains spaces, Chinese
              characters, or other special characters, these characters need to
              be converted to a specific format to ensure the URL can be
              correctly parsed and transmitted.
            </p>

            <Card className="my-8 rounded-2xl">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Example</h4>
                <div className="bg-muted rounded-xl p-4 font-mono text-sm">
                  <div className="mb-2">
                    <span className="text-muted-foreground">
                      Original text:{" "}
                    </span>
                    <span className="text-accent">Hello World</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Encoded: </span>
                    <span className="text-accent">Hello%20World</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 id="why-url-encoding">Why Do We Need URL Encoding?</h2>
            <p>
              URL encoding is fundamental knowledge in web development,
              primarily solving the following problems:
            </p>
            <ul>
              <li>
                <strong>Reserved Character Conflicts</strong>: Certain
                characters in URLs (like <code>?</code>,<code>&</code>,{" "}
                <code>=</code>) have special meanings. If data contains these
                characters, it will cause parsing errors.
              </li>
              <li>
                <strong>Non-ASCII Character Support</strong>: URLs were
                originally designed to only support ASCII characters. Chinese,
                Japanese, and other characters need encoding for transmission.
              </li>
              <li>
                <strong>Space Handling</strong>: Spaces are not allowed in URLs
                and must be encoded as
                <code>%20</code> or <code>+</code>.
              </li>
            </ul>

            <h2 id="how-it-works">How URL Encoding Works</h2>
            <p>
              URL encoding converts each character that needs encoding into its
              UTF-8 byte sequence, then represents each byte in <code>%XX</code>{" "}
              format, where XX is the hexadecimal value of that byte.
            </p>

            <Card className="my-8 rounded-2xl">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">
                  Encoding Steps Example: Character "中"
                </h4>
                <ol className="space-y-2 text-sm">
                  <li>
                    1. Get UTF-8 byte sequence: <code>[0xE4, 0xB8, 0xAD]</code>
                  </li>
                  <li>
                    2. Convert to percent format: <code>%E4%B8%AD</code>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <h2 id="programming-languages">
              URL Encoding in Different Languages
            </h2>

            <h3 id="javascript">JavaScript</h3>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`// Encode entire URL component
encodeURIComponent("Hello World")
// Output: "Hello%20World"

// Decode
decodeURIComponent("Hello%20World")
// Output: "Hello World"

// Encode full URL (preserves structure characters)
encodeURI("https://example.com/path?q=hello world")
// Output: "https://example.com/path?q=hello%20world"`}</code>
                </pre>
              </CardContent>
            </Card>

            <h3 id="python">Python</h3>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`from urllib.parse import quote, unquote

# Encode
quote("Hello World")
# Output: 'Hello%20World'

# Decode
unquote("Hello%20World")
# Output: 'Hello World'

# Encode with safe characters
quote("Hello World", safe='')
# Output: 'Hello%20World'`}</code>
                </pre>
              </CardContent>
            </Card>

            <h3 id="go">Go</h3>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`import "net/url"

// Encode (note: uses + for spaces)
url.QueryEscape("Hello World")
// Output: "Hello+World"

// Decode
url.QueryUnescape("Hello+World")
// Output: "Hello World", nil

// For path encoding
url.PathEscape("Hello World")
// Output: "Hello%20World"`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="common-issues">Common Issues & Best Practices</h2>

            <h3 id="encodeuri-vs-encodeuricomponent">
              encodeURI vs encodeURIComponent
            </h3>
            <p>This is the most common point of confusion in JavaScript:</p>
            <ul>
              <li>
                <code>encodeURI()</code>: Encodes complete URLs, preserving URL
                structure characters (like <code>/</code>, <code>?</code>,{" "}
                <code>&</code>)
              </li>
              <li>
                <code>encodeURIComponent()</code>: Encodes URL components,
                encoding all special characters
              </li>
            </ul>

            <Card className="my-8 bg-accent/5 border-accent/20 rounded-2xl">
              <CardContent className="p-6">
                <h4 className="font-semibold text-accent mb-2">
                  Best Practice
                </h4>
                <p className="text-sm mb-0">
                  When building query parameters, always use{" "}
                  <code>encodeURIComponent()</code> to encode parameter values.
                  This ensures that even if values contain <code>&</code> or{" "}
                  <code>=</code>, they won't break the URL structure.
                </p>
              </CardContent>
            </Card>

            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`// Building a URL with query parameters
const baseUrl = "https://api.example.com/search";
const query = "hello & goodbye";
const category = "books/fiction";

// Correct way
const url = \`\${baseUrl}?q=\${encodeURIComponent(query)}&cat=\${encodeURIComponent(category)}\`;
// Output: "https://api.example.com/search?q=hello%20%26%20goodbye&cat=books%2Ffiction"

// Using URLSearchParams (recommended)
const params = new URLSearchParams({ q: query, cat: category });
const url = \`\${baseUrl}?\${params.toString()}\`;`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="conclusion">Conclusion</h2>
            <p>
              URL encoding is an indispensable foundation in web development.
              Understanding its principles and correct usage can help you avoid
              many common bugs, especially when handling user input and
              internationalized content.
            </p>
            <p>
              Try our{" "}
              <Link href="/" className="text-accent hover:underline">
                URL Encoder Tool
              </Link>{" "}
              now to quickly encode and decode your URLs!
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="mt-12 pt-8 border-t flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" className="rounded-full bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
          </motion.div>

          {/* Related Posts */}
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/base64-applications">
                <Card className="group hover:border-accent transition-colors rounded-2xl">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2 rounded-full">
                      Base64
                    </Badge>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      Base64 Encoding in Web Development
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Explore how Base64 encoding works and its practical
                      applications
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/blog/json-tips">
                <Card className="group hover:border-accent transition-colors rounded-2xl">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2 rounded-full">
                      JSON
                    </Badge>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      JSON Formatting: 10 Essential Tips
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Master practical techniques for JSON formatting and
                      validation
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.section>
        </div>

        <aside className="hidden lg:block w-64 shrink-0">
          <TableOfContents headings={tocHeadings} />
        </aside>
      </div>
    </article>
  );
}
