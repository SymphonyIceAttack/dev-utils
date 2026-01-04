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

interface BlogPostData {
  title: string;
  description: string;
  author: string;
  image: string;
}

const posts: Record<string, BlogPostData> = {
  "url-encoding-guide": {
    title: "URL Encoding: The RFC 3986 Engineering Reference",
    description:
      "A comprehensive analysis of Percent-Encoding (RFC 3986), reserved character sets, UTF-8 byte sequences, and common security pitfalls in URL construction.",
    author: "Engineering Team",
    image: "/images/blog/url-encoding-guide-pixel.jpeg",
  },
  "base64-guide": {
    title: "Base64 Encoding: The Definitive Engineering Guide",
    description:
      "A deep technical analysis of Base64 encoding algorithms, memory implications, RFC 4648 standards, and implementation best practices for engineers.",
    author: "Engineering Team",
    image: "/images/blog/base64-guide-pixel.jpeg",
  },
  "md5-guide": {
    title: "MD5: A Post-Mortem and Engineering Analysis",
    description:
      "An in-depth look at the MD5 algorithm's internal structure (Merkle-Damgård), the mathematics of collision attacks, and why it persists in non-cryptographic use cases.",
    author: "Security Engineering",
    image: "/images/blog/md5-guide-pixel.jpeg",
  },
  "uuid-guide": {
    title: "UUIDs in Distributed Systems: The Engineering Guide",
    description:
      "A deep technical comparison of UUID v4, v7 (RFC 9562), and ULIDs. Analysis of database indexing performance, collision probabilities, and entropy requirements.",
    author: "Engineering Team",
    image: "/images/blog/uuid-guide-pixel.jpeg",
  },
  "password-guide": {
    title: "Password Security: Entropy, Salting, and KDFs",
    description:
      "An engineering analysis of password security mechanics: calculating entropy, preventing rainbow table attacks with salts, and slowing down GPUs with Argon2 and bcrypt.",
    author: "Security Engineering",
    image: "/images/blog/password-guide-pixel.jpeg",
  },
  "encoding-guide": {
    title: "Character Encoding: The UTF-8 Engineering Guide",
    description:
      "A deep dive into Unicode, UTF-8 bit layouts, Byte Order Marks (BOM), and debugging encoding corruption (mojibake) in distributed systems.",
    author: "Engineering Team",
    image: "/images/blog/encoding-guide-pixel.jpeg",
  },
  "encoding-converter-guide": {
    title:
      "A Low-Level Guide to Text Encodings: Hex, Binary, and Base Encodings",
    description:
      "Understanding the byte-level mechanics of text representation: how ASCII, Hex, Binary, and Base64 function as different views of the same underlying data.",
    author: "Engineering Team",
    image: "/images/blog/encoding-converter-guide-pixel.jpeg",
  },
  "binary-code-guide": {
    title: "Binary Code: The Foundation of Digital Computing",
    description:
      "A comprehensive technical analysis of binary number systems, bitwise operations, two's complement representation, IEEE 754 floating-point formats, and practical applications in computing.",
    author: "Engineering Research",
    image: "/images/blog/binary-code-guide-pixel.jpeg",
  },
  "email-guide": {
    title: "Email Address Validation: A Complete Technical Guide",
    description:
      "Master email validation with this comprehensive guide. Learn RFC 5322 standards, regex patterns, format verification vs existence checking, and how to build robust email validation.",
    author: "Engineering Research",
    image: "/images/blog/email-guide-pixel.jpeg",
  },
};

function getBlogPostData(slug: string): BlogPostData {
  return posts[slug] || posts["url-encoding-guide"];
}

export function BlogPostDataStructuredData({ slug }: { slug: string }) {
  const postData = getBlogPostData(slug);

  return (
    <BlogPostStructuredData
      title={postData.title}
      description={postData.description}
      url={`${siteUrl}/en/blog/${slug}`}
      datePublished="2024-12-21"
      author={postData.author}
      image={postData.image}
    />
  );
}

export function UrlEncodingGuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "url-encoding-guide" });
}

export function Base64GuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "base64-guide" });
}

export function Md5GuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "md5-guide" });
}

export function UuidGuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "uuid-guide" });
}

export function PasswordGuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "password-guide" });
}

export function EncodingGuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "encoding-guide" });
}

export function EncodingConverterGuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "encoding-converter-guide" });
}

export function BinaryCodeGuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "binary-code-guide" });
}

export function EmailGuideStructuredData() {
  return BlogPostDataStructuredData({ slug: "email-guide" });
}
