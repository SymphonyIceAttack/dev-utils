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
  { id: "introduction", text: "Introduction", level: 2 },
  {
    id: "tip-1-stringify-formatting",
    text: "1. JSON.stringify Formatting",
    level: 2,
  },
  {
    id: "tip-2-replacer-function",
    text: "2. Filter Sensitive Data with Replacer",
    level: 2,
  },
  {
    id: "tip-3-reviver-function",
    text: "3. Handle Dates with Reviver",
    level: 2,
  },
  { id: "tip-4-validation", text: "4. Best Way to Validate JSON", level: 2 },
  {
    id: "tip-5-circular-references",
    text: "5. Handle Circular References",
    level: 2,
  },
  { id: "tip-6-deep-clone", text: "6. Simple Deep Clone Method", level: 2 },
  { id: "tip-7-common-errors", text: "7. Common JSON Errors", level: 2 },
  { id: "more-tips", text: "8-10. More Advanced Tips", level: 2 },
  { id: "conclusion", text: "Conclusion", level: 2 },
];

export default function JsonTipsPage() {
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
              <Badge className="rounded-full">JSON</Badge>
              <Badge variant="secondary" className="rounded-full">
                Tutorial
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Productivity
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              JSON Formatting: 10 Essential Tips
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Master practical techniques for JSON formatting, validation, and
              transformation
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Dev Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>December 8, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
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
              src="/json-code-formatting-colorful-brackets.jpg"
              alt="JSON Formatting Tips"
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
            <h2 id="introduction">Introduction</h2>
            <p>
              JSON (JavaScript Object Notation) is the most commonly used data
              exchange format in modern web development. Whether you're a
              frontend or backend developer, you'll frequently work with JSON
              data. This article shares 10 practical tips to help you handle
              JSON more efficiently.
            </p>

            <h2 id="tip-1-stringify-formatting">
              1. Use JSON.stringify's Third Parameter for Pretty Output
            </h2>
            <p>
              Many developers only know about <code>JSON.stringify()</code>'s
              first parameter, but it has two more very useful parameters.
            </p>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`const data = { name: "John", age: 25, skills: ["JS", "React"] };

// Compressed output
JSON.stringify(data);
// {"name":"John","age":25,"skills":["JS","React"]}

// Pretty output (2-space indent)
JSON.stringify(data, null, 2);
/*
{
  "name": "John",
  "age": 25,
  "skills": [
    "JS",
    "React"
  ]
}
*/

// Using tab indentation
JSON.stringify(data, null, "\\t");`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="tip-2-replacer-function">
              2. Use Replacer Function to Filter Sensitive Data
            </h2>
            <p>
              <code>JSON.stringify()</code>'s second parameter can be a function
              to filter or transform values.
            </p>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`const user = {
  name: "John",
  password: "secret123",
  email: "john@example.com"
};

// Filter out password field
JSON.stringify(user, (key, value) => {
  if (key === "password") return undefined;
  return value;
}, 2);
/*
{
  "name": "John",
  "email": "john@example.com"
}
*/

// Or use an array to whitelist properties
JSON.stringify(user, ["name", "email"], 2);`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="tip-3-reviver-function">
              3. Use Reviver Function to Handle Dates
            </h2>
            <p>
              JSON doesn't support date types - dates are converted to strings.
              Use reviver to automatically convert them back to Date objects
              when parsing.
            </p>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`const jsonStr = '{"created":"2024-12-08T10:30:00.000Z"}';

const data = JSON.parse(jsonStr, (key, value) => {
  // ISO date format matching
  if (typeof value === "string" && 
      /^\\d{4}-\\d{2}-\\d{2}T/.test(value)) {
    return new Date(value);
  }
  return value;
});

console.log(data.created instanceof Date); // true
console.log(data.created.toLocaleDateString()); // "12/8/2024"`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="tip-4-validation">4. Best Way to Validate JSON Format</h2>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Usage
isValidJSON('{"name": "test"}'); // true
isValidJSON('{name: "test"}');   // false (missing quotes)
isValidJSON('{"name": test}');   // false (unquoted value)

// Get parsed result or null
function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="tip-5-circular-references">
              5. Handle Circular References
            </h2>
            <p>
              Directly serializing objects with circular references will throw
              an error. Special handling is required.
            </p>
            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`function safeStringify(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  }, 2);
}

// Example with circular reference
const obj = { name: "test" };
obj.self = obj; // Circular reference

console.log(safeStringify(obj));
// { "name": "test", "self": "[Circular]" }`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="tip-6-deep-clone">6. Simple Deep Clone Method</h2>
            <Card className="my-8 bg-accent/5 border-accent/20 rounded-2xl">
              <CardContent className="p-6">
                <h4 className="font-semibold text-accent mb-2">
                  Important Notes
                </h4>
                <p className="text-sm mb-4">
                  This method is simple but has limitations: it loses functions,
                  undefined, Symbol values, and can't handle circular
                  references. For complex scenarios, use
                  <code>structuredClone()</code> or specialized libraries.
                </p>
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`// Simple deep clone
const copy = JSON.parse(JSON.stringify(original));

// Better choice (modern browsers)
const copy = structuredClone(original);

// For complex objects with functions
import { cloneDeep } from 'lodash';
const copy = cloneDeep(original);`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="tip-7-common-errors">
              7. Common JSON Errors and Solutions
            </h2>
            <div className="space-y-4 my-6">
              {[
                {
                  error: "Trailing Comma",
                  wrong: '{"a": 1,}',
                  right: '{"a": 1}',
                },
                {
                  error: "Single Quotes",
                  wrong: "{'a': 1}",
                  right: '{"a": 1}',
                },
                { error: "Unquoted Keys", wrong: "{a: 1}", right: '{"a": 1}' },
                {
                  error: "Comments",
                  wrong: '{"a": 1 // comment}',
                  right: '{"a": 1}',
                },
                {
                  error: "Undefined Values",
                  wrong: '{"a": undefined}',
                  right: '{"a": null}',
                },
              ].map((item, index) => (
                <Card key={index} className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="font-medium mb-2">{item.error}</div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-red-500/10 rounded-xl p-3">
                        <span className="text-red-500">✗ Wrong: </span>
                        <code>{item.wrong}</code>
                      </div>
                      <div className="bg-green-500/10 rounded-xl p-3">
                        <span className="text-green-500">✓ Correct: </span>
                        <code>{item.right}</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 id="more-tips">8-10. More Advanced Tips</h2>
            <ul>
              <li>
                <strong>Use JSON Schema for Data Validation</strong> - Ensure
                API responses match expected formats using libraries like Ajv or
                Zod
              </li>
              <li>
                <strong>Compress JSON to Reduce Transfer Size</strong> - Remove
                whitespace and newlines, use short key names for frequently
                transmitted data
              </li>
              <li>
                <strong>Use Streaming Parsers for Large Files</strong> - Avoid
                memory overflow issues with libraries like JSONStream or oboe.js
              </li>
            </ul>

            <Card className="my-4 rounded-2xl">
              <CardContent className="p-4">
                <pre className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <code>{`// Example: Using Zod for JSON validation
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  age: z.number().positive(),
  email: z.string().email(),
});

// Validate JSON data
const result = UserSchema.safeParse(jsonData);
if (result.success) {
  console.log('Valid:', result.data);
} else {
  console.log('Errors:', result.error.issues);
}`}</code>
                </pre>
              </CardContent>
            </Card>

            <h2 id="conclusion">Conclusion</h2>
            <p>
              Mastering these JSON techniques can make your daily development
              work more efficient. Try our{" "}
              <Link
                href="/tools/json-formatter"
                className="text-accent hover:underline"
              >
                JSON Formatter Tool
              </Link>{" "}
              now to quickly format and validate your JSON data!
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
              <Link href="/blog/url-encoding-guide">
                <Card className="group hover:border-accent transition-colors rounded-2xl">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2 rounded-full">
                      URL Encoding
                    </Badge>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      The Complete Guide to URL Encoding
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Deep dive into URL encoding principles and best practices
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/blog/hash-functions">
                <Card className="group hover:border-accent transition-colors rounded-2xl">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2 rounded-full">
                      Hash
                    </Badge>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      Understanding Hash Functions
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Comprehensive analysis of common hashing algorithms and
                      security
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
