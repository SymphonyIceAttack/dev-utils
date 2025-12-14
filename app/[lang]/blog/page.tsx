"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const blogPosts = [
  {
    title: "The Complete Guide to URL Encoding",
    description:
      "Deep dive into URL encoding principles, use cases, and best practices. Learn why URL encoding is essential and how to use it correctly across different programming languages.",
    date: "2024-12-10",
    author: "Dev Team",
    tags: ["URL Encoding", "Tutorial", "Web Dev"],
    href: "/blog/url-encoding-guide",
    readTime: "8 min",
    featured: true,
    image: "/url-encoding-tutorial.jpg",
  },
  {
    title: "JSON Formatting: 10 Essential Tips",
    description:
      "Master practical techniques for JSON formatting, validation, and transformation to boost your development efficiency. Includes common error handling and performance tips.",
    date: "2024-12-08",
    author: "Dev Team",
    tags: ["JSON", "Tutorial", "Productivity"],
    href: "/blog/json-tips",
    readTime: "6 min",
    featured: true,
    image: "/json-formatting-tips.jpg",
  },
  {
    title: "Base64 Encoding in Web Development",
    description:
      "Explore how Base64 encoding works and its practical applications in image embedding, data transmission, and API authentication.",
    date: "2024-12-05",
    author: "Security Team",
    tags: ["Base64", "Encoding", "Security"],
    href: "/blog/base64-applications",
    readTime: "7 min",
    featured: false,
    image: "/base64-encoding-web.jpg",
  },
  {
    title: "Understanding Hash Functions: MD5, SHA-1 to SHA-256",
    description:
      "A comprehensive analysis of common hashing algorithms, security comparisons, and proper usage in password storage and file verification.",
    date: "2024-12-01",
    author: "Security Team",
    tags: ["Hash", "Security", "Cryptography"],
    href: "/blog/hash-functions",
    readTime: "10 min",
    featured: false,
    image: "/hash-functions-security.jpg",
  },
  {
    title: "Regular Expressions from Zero to Hero",
    description:
      "Learn regular expressions in an easy-to-understand way, including common patterns, practical examples, and online testing techniques.",
    date: "2024-11-28",
    author: "Dev Team",
    tags: ["Regex", "Tutorial", "Beginner"],
    href: "/blog/regex-guide",
    readTime: "12 min",
    featured: false,
    image: "/regex-tutorial-beginner.jpg",
  },
  {
    title: "UUID vs Auto-Increment: Choosing Your Primary Key",
    description:
      "Compare the pros and cons of UUID and auto-increment IDs, analyzing distributed systems, database performance, and security factors.",
    date: "2024-11-25",
    author: "Dev Team",
    tags: ["UUID", "Database", "Architecture"],
    href: "/blog/uuid-vs-auto-increment",
    readTime: "9 min",
    featured: false,
    image: "/uuid-database-primary-key.jpg",
  },
  {
    title: "Developer Toolkit: 10x Productivity Secrets",
    description:
      "A curated collection of developer tools that streamline your workflow from code editing to deployment.",
    date: "2024-11-20",
    author: "Dev Team",
    tags: ["Tools", "Productivity", "Recommendations"],
    href: "/blog/developer-toolkit",
    readTime: "5 min",
    featured: false,
    image: "/developer-tools-productivity.jpg",
  },
  {
    title: "Why Privacy Matters for Developers",
    description:
      "Discussing privacy concerns with online tools, why we insist on local data processing, and how to protect sensitive information.",
    date: "2024-11-15",
    author: "Security Team",
    tags: ["Privacy", "Security", "Philosophy"],
    href: "/blog/privacy-matters",
    readTime: "6 min",
    featured: false,
    image: "/privacy-security-developer.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 300,
      damping: 24,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "KittyEncode Developer Blog",
            description: "Development tips, tutorials, and tool guides",
            url: "https://devtools.app/blog",
            publisher: {
              "@type": "Organization",
              name: "KittyEncode",
              url: "https://devtools.app",
            },
          }),
        }}
      />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Developer Blog
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Development tips, tool tutorials, and best practices to help you
            become a more efficient developer
          </p>
        </motion.div>

        {/* Featured Posts */}
        <motion.section
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-xl font-semibold mb-6 flex items-center gap-2"
            variants={cardVariants}
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            Featured Articles
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, _index) => (
              <motion.div key={post.href} variants={cardVariants}>
                <Link href={post.href}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Card className="group h-full transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-accent text-accent-foreground rounded-full">
                            Featured
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs rounded-full"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-xl group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 line-clamp-2">
                          {post.description}
                        </CardDescription>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* All Posts */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-xl font-semibold mb-6 flex items-center gap-2"
            variants={cardVariants}
          >
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            All Articles
          </motion.h2>
          <div className="space-y-4">
            {regularPosts.map((post, _index) => (
              <motion.div key={post.href} variants={cardVariants}>
                <Link href={post.href}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Card className="group transition-all hover:border-accent hover:shadow-md rounded-2xl overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-32 md:h-auto bg-muted relative overflow-hidden shrink-0">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 p-4 md:p-6">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs rounded-full"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="font-semibold text-lg group-hover:text-accent transition-colors mb-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {post.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </div>
                            </div>
                            <motion.div
                              className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                              initial={{ x: -10 }}
                              whileHover={{ x: 0 }}
                            >
                              Read more <ArrowRight className="h-3 w-3" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  );
}
