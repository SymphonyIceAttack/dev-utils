"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { EncodingConverterGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Data Representation: Analysis of Binary-to-Text Encoding Schemes",
  description:
    "A comparative analysis of binary serialization formats (Hex, Base64, Ascii85), examining information density, entropy, endianness, and transport efficiency.",
  author: "Engineering Research",
  date: "2024-12-21",
  readTime: "20 min",
  tags: ["Computer Science", "Serialization", "Binary", "Data Structures"],
  image: "/encoding-converter-guide-pixel.jpeg",
  featured: false,
};

export function EncodingConverterGuideContent() {
  const content = `# Data Representation: Analysis of Binary-to-Text Encoding Schemes

**Abstract**

Computer systems fundamentally operate on binary logic states. However, the transmission and visualization of this data often require transformation into higher-radix representations. This report analyzes the primary Transfer Encodings—Binary, Hexadecimal, and Base64—evaluating their information density, human readability, and suitability for various engineering contexts.

## 1. Introduction

The distinction between **Data** (Information) and **Representation** (Encoding) is central to systems engineering. A sequence of voltage states in a memory cell is the data; "0xDEADBEEF" is a representation.

We categorize encodings by their **Radix** (base):
1.  **Radix-2 (Binary)**: The physical layer.
2.  **Radix-16 (Hexadecimal)**: The systems layer.
3.  **Radix-64 (Base64)**: The transport layer.

## 2. Binary Numeral System (Radix-2)

Binary is the native language of digital logic gates.
*   **Symbol Set**: $\\{0, 1\\}$.
*   **Density**: 1 bit of information per character.
*   **Efficiency**: 12.5% (assuming 8-bit ASCII storage for '0' and '1').

### 2.1 Two's Complement
Binary representation of signed integers utilizes **Two's Complement** logic.
To represent $-5$:
1.  Take $+5$: \`00000101\`
2.  Invert bits: \`11111010\`
3.  Add 1: \`11111011\`

This property allows the ALU (Arithmetic Logic Unit) to perform subtraction using the same hardware adders used for addition.

## 3. Hexadecimal Representation (Radix-16)

Hexadecimal is the standard notation for low-level memory analysis because of its alignment with byte boundaries.
*   **Symbol Set**: $\\{0...9, A...F\\}$.
*   **Density**: 4 bits of information per character (Nibble).
*   **Alignment**: Two hex digits exactly represent one 8-bit byte.

### 3.1 Endianness
When multi-byte integers are serialized, the order of bytes determines the **Endianness**.
Consider the 32-bit value \`0x12345678\`:
*   **Big Endian (Network Order)**: \`12 34 56 78\` (MSB at lowest address).
*   **Little Endian (x86/ARM)**: \`78 56 34 12\` (LSB at lowest address).

Failure to account for endianness during serialization is a primary source of bugs in binary protocol implementation.

## 4. Comparative Efficiency Analysis

Let $N$ be the number of raw bytes. Let $S$ be the size of the encoded string.

| Encoding | Output Size Formula | Overhead | Information Density |
| :--- | :--- | :--- | :--- |
| **Binary** | $8N$ | +700% | 12.5% |
| **Hex** | $2N$ | +100% | 50.0% |
| **Base64** | $\\lceil 4N/3 \\rceil$ | +33% | 75.0% |
| **Ascii85** | $\\lceil 5N/4 \\rceil$ | +25% | 80.0% |

### 4.1 Recommendation Matrix
*   **Debugging**: Use **Hex**. It aligns perfectly with bytes.
*   **Transport (Text Protocol)**: Use **Base64**. It balances efficiency with safety.
*   **Transport (Binary Protocol)**: Use **Raw Bytes** (Protobuf/MessagePack). Avoid text encoding entirely.

## 5. Conclusion

The choice of encoding is a trade-off between **Readability** (Hex) and **Efficiency** (Base64/Binary). Engineers must understand the underlying bit-level transformations to debug issues related to Endianness, Padding, and Word Alignment in serialization protocols.
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
      <EncodingConverterGuideStructuredData />
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
