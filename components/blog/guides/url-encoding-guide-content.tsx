"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { UrlEncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "URI Syntax and Percent-Encoding: An RFC 3986 Analysis",
  description:
    "A rigorous engineering analysis of URI syntax grammars, the percent-encoding mechanism, and security vulnerabilities arising from double-decoding and normalization failures.",
  author: "Engineering Research",
  date: "2024-12-21",
  readTime: "25 min",
  tags: ["Computer Science", "RFC 3986", "HTTP", "Security"],
  image: "/url-encoding-guide-pixel.jpeg",
  featured: true,
};

export function UrlEncodingGuideContent() {
  const content = `# URI Syntax and Percent-Encoding: An RFC 3986 Analysis

**Abstract**

Uniform Resource Identifiers (URIs) serve as the fundamental addressing mechanism for the World Wide Web. Because URIs must be transmitted over protocols with limited character support, and because they possess a reserved syntax for delimiting components, a mechanism is required to represent arbitrary octets within the URI structure. This mechanism, formally known as Percent-Encoding, is defined in RFC 3986. This report analyzes the formal grammar of URIs, the set theory of reserved characters, and the security implications of improper encoding normalization.

## 1. Introduction

The Internet Engineering Task Force (IETF) defines the generic syntax for URIs in **RFC 3986**. A core constraint of this syntax is that a URI is a sequence of characters from a very limited subset of the ASCII repertoire.

However, modern web applications must transmit data that falls outside this subset, including:
1.  **Unicode Characters**: Human languages (Chinese, Arabic, Emoji).
2.  **Binary Data**: Encryption keys, tokens.
3.  **Reserved Characters**: Characters that would otherwise be interpreted as delimiters (e.g., \`/\`, \`?\`, \`&\`).

Percent-encoding provides an escape mechanism, allowing any octet to be represented as a triplet of characters: a percent sign (\`%\`) followed by two hexadecimal digits.

## 2. Theoretical Framework

### 2.1 The Grammar of Reserved Sets

RFC 3986 partitions the ASCII character set into disjoint subsets. Understanding these sets is critical for correct implementation.

$$ \\text{URI} = \\text{Reserved} \\cup \\text{Unreserved} \\cup \\text{Percent-Encoded} $$

#### 2.1.1 Unreserved Characters
These characters are semantically neutral. They never have a special meaning and thus **never** require encoding.
$$ \\text{Unreserved} = \\{ \\text{ALPHA}, \\text{DIGIT}, \\text{"-"}, \\text{"."}, \\text{"_"}, \\text{"~"} \\} $$

*Note*: The inclusion of the tilde (\`~\`) is a change from the obsolete RFC 2396. Modern encoders must not encode \`~\`.

#### 2.1.2 Reserved Characters
These characters are reserved for syntactic delimiters. They are further divided into:
*   **Gen-Delims**: \`:\`, \`/\`, \`?\`, \`#\`, \`[\`, \`]\`, \`@\` (Generic component delimiters).
*   **Sub-Delims**: \`!\`, \`$\`, \`&\`, \`'\`, \`(\`, \`)\`, \`*\`, \`+\`, \`,\`, \`;\`, \`=\` (Sub-component delimiters).

If a Reserved Character is found in a URI component where it has no reserved purpose, it represents data. If it *is* used as a delimiter, it represents structure. To use a reserved character as data, it **must** be percent-encoded.

### 2.2 The Encoding Algorithm

The transformation function $E(c)$ for a character $c$ is defined as:

1.  **Serialization**: Convert $c$ into a sequence of octets $B = (b_1, b_2, ..., b_n)$ according to the UTF-8 character encoding.
2.  **Escaping**: For each octet $b_i$, output the string \`%\` followed by the uppercase hexadecimal representation of $b_i$.

**Example**: Encoding the character "ñ" (\`U+00F1\`).
1.  **UTF-8**: \`0xC3 0xB1\`
2.  **Result**: \`%C3%B1\`

## 3. Implementation Variances

A significant source of engineering error stems from the disconnect between the URI specification (RFC 3986) and the \`application/x-www-form-urlencoded\` specification (HTML Forms).

### 3.1 The Space Character Ambiguity
*   **RFC 3986**: The space character (\` \`) is unsafe. It should be encoded as \`%20\`.
*   **Form Data**: Historical precedent encodes space as \`+\`.

This dichotomy leads to decoding errors.
*   In a **Path Segment** (\`/files/...\`), a \`+\` is a valid literal character. Decoding it to a space is incorrect.
*   In a **Query String** (\`?q=...\`), a \`+\` is interpreted as a space by most web frameworks.

**Engineering Recommendation**: When generating URIs programmatically, prefer \`%20\` for spaces in all contexts. It is unambiguous and valid in both paths and query strings.

### 3.2 The JavaScript Standard Library
The ECMAScript specification provides three functions, often misused:

| Function | Scope | Encodes Reserved? | Use Case |
| :--- | :--- | :--- | :--- |
| \`escape()\` | **Obsolete** | Partial | **Do Not Use**. Incorrect Unicode handling. |
| \`encodeURI()\` | Full URI | No | Validating/Cleaning an existing full URL string. |
| \`encodeURIComponent()\` | Component | Yes | Constructing a URI from data parts (keys/values). |

Engineers must almost always use \`encodeURIComponent\` (or \`URLSearchParams\`) when inserting dynamic data into a URI template.

## 4. Security Implications

### 4.1 Double-Decoding Vulnerabilities
A common attack vector involves bypassing security filters (WAFs) by double-encoding malicious payloads.

*   **Attack**: \`%2527\`
*   **Layer 1 (WAF)**: Decodes \`%25\` to \`%\`. Output: \`%27\`. This looks harmless (alphanumeric).
*   **Layer 2 (App)**: Decodes \`%27\` to \`'\` (Single Quote).
*   **Result**: SQL Injection payload active.

**Defense Architecture**: Systems must define a strict "trust boundary". Input should be decoded exactly once at the ingress point. Any subsequent decoding should be treated as a logic error.

### 4.2 Normalization and Comparison
When comparing two URIs for equivalence (e.g., for caching or access control), they must first be normalized.
*   **Case Normalization**: The hex digits in percent-encodings are case-insensitive (\`%3a\` == \`%3A\`).
*   **Percent-Encoding Normalization**: Unreserved characters that are percent-encoded must be decoded. \`%7E\` should become \`~\`.

Failure to normalize allows attackers to bypass allow-lists. \`example.com/%7Eadmin\` might bypass a rule checking for \`example.com/~admin\`, even though they resolve to the same resource.

## 5. Conclusion

Percent-encoding is not merely a string replacement utility; it is a mechanism for type-safety within the grammar of the web. It allows the superposition of a data layer onto a structural layer.

Correct implementation requires strict adherence to RFC 3986 regarding reserved sets and a disciplined approach to decoding stages to prevent security bypasses.
`;

  const tocItems = extractTOCFromText(content);
  const showTOC = shouldShowTOC(tocItems);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <UrlEncodingGuideStructuredData />
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <motion.article
            className={`${showTOC ? "lg:w-2/3" : "max-w-4xl mx-auto"}`}
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div className="space-y-8" variants={fadeInUp}>
              {/* Article Header with Cover Image */}
              <ArticleHeader
                title={articleData.title}
                description={articleData.description}
                author={articleData.author}
                date={articleData.date}
                readTime={articleData.readTime}
                tags={articleData.tags}
                image={articleData.image}
                featured={articleData.featured}
              />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none streamdown-content">
                <StreamdownRenderer content={content} />
              </div>
            </motion.div>
          </motion.article>

          {/* Enhanced Streamdown TOC */}
          {showTOC && (
            <StreamdownTOC
              items={tocItems}
              enableAutoExtract={false}
              stickyOffset={80}
              showProgress={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
