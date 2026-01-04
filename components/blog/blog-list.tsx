"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPageStructuredData } from "@/components/structured-data/blog-page";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbNav } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 优化的图片组件
function BlogImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={400}
      height={200}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ objectFit: "cover" }}
    />
  );
}

const blogPosts = [
  {
    title: "Email Address Validation: A Complete Technical Guide",
    description:
      "Master email validation with this comprehensive guide. Learn RFC 5322 standards, regex patterns, format verification vs existence checking, and build robust email validation in any programming language.",
    date: "2025-01-04",
    author: "Engineering Research",
    tags: ["Email Validation", "RFC 5322", "Web Development", "Data Quality"],
    href: "/en/blog/email-guide",
    readTime: "15 min",
    featured: true,
    image: "/images/blog/email-guide-pixel.jpeg",
  },
  {
    title: "Binary Code: The Foundation of Digital Computing",
    description:
      "A comprehensive technical analysis of binary number systems, bitwise operations, two's complement representation, IEEE 754 floating-point formats, and practical applications in modern computing architecture.",
    date: "2024-12-21",
    author: "Engineering Research",
    tags: [
      "Computer Science",
      "Binary",
      "Digital Systems",
      "Low-Level Programming",
    ],
    href: "/en/blog/binary-code-guide",
    readTime: "28 min",
    featured: true,
    image: "/images/blog/binary-code-guide-pixel.jpeg",
  },
  {
    title: "Learn URL Encoding: The Complete Guide",
    description:
      "Master URL encoding principles, use cases, and best practices. Learn why URL encoding is essential and how to use it correctly across different programming languages.",
    date: "2024-12-15",
    author: "Dev Team",
    tags: ["URL Encoding", "Guide", "Web Dev"],
    href: "/en/blog/url-encoding-guide",
    readTime: "8 min",
    featured: true,
    image: "/images/blog/url-encoding-guide-pixel.jpeg",
  },
  {
    title: "Learn Base64 Encoding: From Basics to Advanced",
    description:
      "Explore how Base64 encoding works and its practical applications in image embedding, data transmission, and API authentication.",
    date: "2024-12-14",
    author: "Dev Team",
    tags: ["Base64", "Guide", "Encoding"],
    href: "/en/blog/base64-guide",
    readTime: "7 min",
    featured: true,
    image: "/images/blog/base64-guide-pixel.jpeg",
  },
  {
    title: "Learn MD5 Hashing: Complete Tutorial",
    description:
      "A comprehensive guide to MD5 hashing algorithm, including how it works, security considerations, and practical use cases like file verification and checksums.",
    date: "2024-12-13",
    author: "Security Team",
    tags: ["MD5", "Guide", "Cryptography"],
    href: "/en/blog/md5-guide",
    readTime: "10 min",
    featured: false,
    image: "/images/blog/md5-guide-pixel.jpeg",
  },
  {
    title: "Learn UUID Generation: A Developer's Guide",
    description:
      "Master UUID generation with this complete guide. Understand UUID versions (v1, v4, v7), best practices for database primary keys, and distributed systems.",
    date: "2024-12-12",
    author: "Dev Team",
    tags: ["UUID", "Guide", "Database"],
    href: "/en/blog/uuid-guide",
    readTime: "9 min",
    featured: false,
    image: "/images/blog/uuid-guide-pixel.jpeg",
  },
  {
    title: "Learn Password Generation: Security Best Practices",
    description:
      "Create strong, secure passwords with our comprehensive guide. Learn about password entropy, generation algorithms, and security recommendations.",
    date: "2024-12-11",
    author: "Security Team",
    tags: ["Password", "Guide", "Security"],
    href: "/en/blog/password-guide",
    readTime: "8 min",
    featured: false,
    image: "/images/blog/password-guide-pixel.jpeg",
  },
  {
    title: "Learn Character Encoding: UTF-8, GBK & Beyond",
    description:
      "Understand character encoding systems, fix garbled text issues, and convert between different encodings like UTF-8, GBK, and Unicode.",
    date: "2024-12-10",
    author: "Dev Team",
    tags: ["Encoding", "Guide", "Unicode"],
    href: "/en/blog/encoding-guide",
    readTime: "11 min",
    featured: false,
    image: "/images/blog/encoding-guide-pixel.jpeg",
  },
  {
    title: "Learn Encoding Converter: Multi-Format Tool Guide",
    description:
      "Master the encoding converter tool with support for multiple formats. Learn how to convert between Base64, URL encoding, HTML entities, and more in one powerful tool.",
    date: "2024-12-09",
    author: "Dev Team",
    tags: ["Converter", "Guide", "Encoding"],
    href: "/en/blog/encoding-converter-guide",
    readTime: "6 min",
    featured: false,
    image: "/images/blog/encoding-converter-guide-pixel.jpeg",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export function BlogList() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <>
      <BlogPageStructuredData />
      <main
        className="container mx-auto max-w-6xl px-4 py-12"
        aria-labelledby="blog-title"
      >
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { label: "Developer Guides", href: "/blog" },
            { label: "All Tutorials" },
          ]}
          className="mb-6"
        />

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
          <h1
            id="blog-title"
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            Developer Guides
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Learn to use our encoding tools with comprehensive tutorials, best
            practices, and practical examples
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
            Featured Guides
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
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
                        <BlogImage
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
            All Tutorials
          </motion.h2>
          <div className="space-y-4">
            {regularPosts.map((post) => (
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
                          <BlogImage
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
                              Read guide <ArrowRight className="h-3 w-3" />
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
      </main>
    </>
  );
}
