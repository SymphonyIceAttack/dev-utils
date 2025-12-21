"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { EncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Unicode and UTF-8: The Architecture of Text Serialization",
  description:
    "A deep technical analysis of the Unicode Standard, the UTF-8 variable-width encoding scheme, bitwise layouts, Normalization Forms (NFC/NFD), and database implementation strategies.",
  author: "Engineering Research",
  date: "2024-12-21",
  readTime: "25 min",
  tags: ["Computer Science", "Unicode", "UTF-8", "I18n", "Database"],
  image: "/encoding-guide-pixel.jpeg",
  featured: false,
};

export function EncodingGuideContent() {
  const content = `# Unicode and UTF-8: The Architecture of Text Serialization

**Abstract**

The serialization of human language into binary data is one of the most complex problems in computer science. Early solutions (ASCII, ISO-8859) were fragmented and insufficient for global communication. The **Unicode Standard** unified the character space, and **UTF-8** provided a robust, backward-compatible transport layer. This report analyzes the architecture of Unicode Planes, the bitwise logic of UTF-8, the legacy burden of UTF-16 surrogate pairs, and the engineering best practices for preventing data corruption (Mojibake).

## 1. Introduction: The Character-Glyph Model

To process text correctly, we must decouple three distinct concepts:
1.  **Abstract Character**: The platonic ideal of a letter (e.g., "The Latin Capital A").
2.  **Glyph**: The visual representation (font rendering).
3.  **Code Point**: The unique integer assigned to the character by the Unicode Consortium (e.g., \`U+0041\`).
4.  **Encoding**: The algorithm to map the Code Point to a sequence of bits (e.g., \`0x41\`).

Errors occur when engineers conflate these layers, particularly assuming that 1 Character = 1 Byte.

## 2. Unicode Architecture

### 2.1 The Code Space
Unicode defines a code space of integers from $0$ to $10FFFF_{16}$ ($1,114,111$). This space is divided into **17 Planes** of $65,536$ characters each.

*   **Plane 0: Basic Multilingual Plane (BMP)**
    *   Range: \`U+0000\` to \`U+FFFF\`.
    *   Contains virtually all modern scripts (Latin, Cyrillic, Greek, CJK, Arabic).
*   **Plane 1: Supplementary Multilingual Plane (SMP)**
    *   Range: \`U+10000\` to \`U+1FFFF\`.
    *   Contains Emoji, historic scripts, and musical symbols.

### 2.2 Normalization Forms
A single visual character can often be represented by multiple Code Point sequences.
*   **Canonical Equivalence**: "é" can be \`U+00E9\` (composed) or \`U+0065\` + \`U+0301\` (decomposed).
*   **NFC (Normalization Form C)**: Prefers composed characters. Recommended for W3C and storage.
*   **NFD (Normalization Form D)**: Decomposes everything. Useful for search/sorting (ignoring accents).

**Engineering Risk**: Comparing strings without normalization leads to logic errors where visually identical strings compare as \`false\`.

## 3. UTF-8 Encoding Scheme

UTF-8 is a **variable-width encoding**. It uses 1 to 4 bytes to represent a Code Point. It was designed by Ken Thompson and Rob Pike to be self-synchronizing and ASCII-compatible.

### 3.1 Bit Layout
The number of bytes is determined by the leading bits of the first byte.

| Bytes | Code Point Range | Bit Pattern |
| :--- | :--- | :--- |
| 1 | \`U+0000\` - \`U+007F\` | \`0xxxxxxx\` |
| 2 | \`U+0080\` - \`U+07FF\` | \`110xxxxx 10xxxxxx\` |
| 3 | \`U+0800\` - \`U+FFFF\` | \`1110xxxx 10xxxxxx 10xxxxxx\` |
| 4 | \`U+10000\` - \`U+10FFFF\` | \`11110xxx 10xxxxxx 10xxxxxx 10xxxxxx\` |

### 3.2 Architectural Advantages
1.  **Backward Compatibility**: Any valid ASCII file is automatically a valid UTF-8 file.
2.  **No Endianness**: UTF-8 is a byte stream. It does not require a Byte Order Mark (BOM).
3.  **Self-Synchronization**: Leading bytes (\`11...\`) and Continuation bytes (\`10...\`) are disjoint. If a stream is corrupted or you seek to a random offset, you can identify the start of the next character immediately.

## 4. The Legacy of UTF-16

Java and JavaScript use UTF-16 for internal string representation. This creates a "Surrogate Pair" problem.
*   Characters in the BMP fit in 1 unit (16 bits).
*   Characters in Astral Planes (Emoji) require 2 units (32 bits).

**The Bug**:
\`\`\`javascript
"💩".length // Returns 2
\`\`\`
This abstraction leak means naive string operations (substring, length) can split a character in half, resulting in invalid "lone surrogates."

## 5. Database Engineering

### 5.1 The MySQL Trap
MySQL's original \`utf8\` charset was a non-standard implementation that only supported up to 3 bytes (the BMP). It cannot store Emojis (\`U+1F...\`).
*   **Impact**: Inserting an Emoji truncates the string or throws an error.
*   **Solution**: Engineers must strictly use \`utf8mb4\` (UTF-8 max bytes 4) for full compliance.

### 5.2 Storage Optimization
While UTF-8 is space-efficient for Latin text (1 byte), it is less efficient for East Asian scripts (3 bytes) compared to UTF-16 (2 bytes). However, the complexity cost of managing mixed encodings usually outweighs the storage savings.

## 6. Conclusion

The "UTF-8 Everywhere" manifesto is the consensus of the modern engineering community. By standardizing on UTF-8 for storage, transmission, and source code, systems eliminate the complexity of transcoding and the risk of Mojibake. Engineers must, however, remain vigilant about Normalization forms and the limitations of legacy string libraries in managed runtimes.
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
      <EncodingGuideStructuredData />
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
