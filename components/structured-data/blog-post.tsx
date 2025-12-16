"use client";

import type { BlogPosting, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  author: string;
  image?: string;
}

export function BlogPostStructuredData({
  title,
  description,
  url,
  datePublished,
  author,
  image,
}: BlogPostStructuredDataProps) {
  const blogPostSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "KittyEncode",
      url: siteUrl,
    },
    url,
    image: image ? `${siteUrl}${image}` : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(blogPostSchema),
      }}
    />
  );
}

export function UrlEncodingGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Complete Guide to URL Encoding: Best Practices"
      description="Master URL encoding principles, use cases, and best practices. Learn why URL encoding is essential and how to use it correctly across different programming languages."
      url={`${siteUrl}/en/blog/url-encoding-guide`}
      datePublished="2024-12-15"
      author="Dev Team"
      image="/url-encoding-tutorial.jpg"
    />
  );
}

export function Base64GuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Master Base64 Encoding: From Basics to Advanced"
      description="Explore how Base64 encoding works and its practical applications in image embedding, data transmission, and API authentication."
      url={`${siteUrl}/en/blog/base64-guide`}
      datePublished="2024-12-14"
      author="Dev Team"
      image="/base64-encoding-web.jpg"
    />
  );
}

export function Md5GuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="MD5 Hashing Tutorial: Complete Implementation Guide"
      description="A comprehensive guide to MD5 hashing algorithm, including how it works, security considerations, and practical use cases like file verification and checksums."
      url={`${siteUrl}/en/blog/md5-guide`}
      datePublished="2024-12-13"
      author="Security Team"
      image="/hash-functions-security.jpg"
    />
  );
}

export function UuidGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="UUID Generation: A Developer's Complete Guide"
      description="Master UUID generation with this complete guide. Understand UUID versions (v1, v4, v7), best practices for database primary keys, and distributed systems."
      url={`${siteUrl}/en/blog/uuid-guide`}
      datePublished="2024-12-12"
      author="Dev Team"
      image="/uuid-database-primary-key.jpg"
    />
  );
}

export function PasswordGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Secure Password Generation: Best Practices Guide"
      description="Create strong, secure passwords with our comprehensive guide. Learn about password entropy, generation algorithms, and security recommendations."
      url={`${siteUrl}/en/blog/password-guide`}
      datePublished="2024-12-11"
      author="Security Team"
      image="/password-security-guide.jpg"
    />
  );
}

export function EncodingGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Character Encoding Guide: UTF-8, GBK & Beyond"
      description="Understand character encoding systems, fix garbled text issues, and convert between different encodings like UTF-8, GBK, and Unicode."
      url={`${siteUrl}/en/blog/encoding-guide`}
      datePublished="2024-12-10"
      author="Dev Team"
      image="/character-encoding-guide.jpg"
    />
  );
}

export function EncodingConverterGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Text Encoding Conversion: Complete Guide"
      description="Master text encoding conversion between UTF-8, UTF-16, ASCII, Hex, Binary, and Unicode Escape formats. Essential guide for handling international text and data encoding."
      url={`${siteUrl}/en/blog/encoding-converter-guide`}
      datePublished="2024-12-16"
      author="Dev Team"
      image="/encoding-conversion-guide.jpg"
    />
  );
}
