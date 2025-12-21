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
      title="URL Encoding: The RFC 3986 Engineering Reference"
      description="A comprehensive analysis of Percent-Encoding (RFC 3986), reserved character sets, UTF-8 byte sequences, and common security pitfalls in URL construction."
      url={`${siteUrl}/en/blog/url-encoding-guide`}
      datePublished="2024-12-21"
      author="Engineering Team"
      image="/url-encoding-guide-pixel.jpeg"
    />
  );
}

export function Base64GuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Base64 Encoding: The Definitive Engineering Guide"
      description="A deep technical analysis of Base64 encoding algorithms, memory implications, RFC 4648 standards, and implementation best practices for engineers."
      url={`${siteUrl}/en/blog/base64-guide`}
      datePublished="2024-12-21"
      author="Engineering Team"
      image="/base64-guide-pixel.jpeg"
    />
  );
}

export function Md5GuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="MD5: A Post-Mortem and Engineering Analysis"
      description="An in-depth look at the MD5 algorithm's internal structure (Merkle-Damgård), the mathematics of collision attacks, and why it persists in non-cryptographic use cases."
      url={`${siteUrl}/en/blog/md5-guide`}
      datePublished="2024-12-21"
      author="Security Engineering"
      image="/md5-guide-pixel.jpeg"
    />
  );
}

export function UuidGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="UUIDs in Distributed Systems: The Engineering Guide"
      description="A deep technical comparison of UUID v4, v7 (RFC 9562), and ULIDs. Analysis of database indexing performance, collision probabilities, and entropy requirements."
      url={`${siteUrl}/en/blog/uuid-guide`}
      datePublished="2024-12-21"
      author="Engineering Team"
      image="/uuid-guide-pixel.jpeg"
    />
  );
}

export function PasswordGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Password Security: Entropy, Salting, and KDFs"
      description="An engineering analysis of password security mechanics: calculating entropy, preventing rainbow table attacks with salts, and slowing down GPUs with Argon2 and bcrypt."
      url={`${siteUrl}/en/blog/password-guide`}
      datePublished="2024-12-21"
      author="Security Engineering"
      image="/password-guide-pixel.jpeg"
    />
  );
}

export function EncodingGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="Character Encoding: The UTF-8 Engineering Guide"
      description="A deep dive into Unicode, UTF-8 bit layouts, Byte Order Marks (BOM), and debugging encoding corruption (mojibake) in distributed systems."
      url={`${siteUrl}/en/blog/encoding-guide`}
      datePublished="2024-12-21"
      author="Engineering Team"
      image="/encoding-guide-pixel.jpeg"
    />
  );
}

export function EncodingConverterGuideStructuredData() {
  return (
    <BlogPostStructuredData
      title="A Low-Level Guide to Text Encodings: Hex, Binary, and Base Encodings"
      description="Understanding the byte-level mechanics of text representation: how ASCII, Hex, Binary, and Base64 function as different views of the same underlying data."
      url={`${siteUrl}/en/blog/encoding-converter-guide`}
      datePublished="2024-12-21"
      author="Engineering Team"
      image="/encoding-converter-guide-pixel.jpeg"
    />
  );
}
