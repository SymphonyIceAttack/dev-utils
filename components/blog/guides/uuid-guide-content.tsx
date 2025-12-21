"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { UuidGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Distributed Identifiers: Theoretical and Practical Analysis of UUIDs",
  description:
    "A comprehensive engineering analysis of UUID standards (RFC 4122, RFC 9562), B-Tree index fragmentation mechanics, and the trade-offs between entropy and locality in distributed systems.",
  author: "Engineering Research",
  date: "2024-12-21",
  readTime: "30 min",
  tags: ["Distributed Systems", "Database Theory", "UUID", "RFC 9562"],
  image: "/uuid-guide-pixel.jpeg",
  featured: false,
};

export function UuidGuideContent() {
  const content = `# Distributed Identifiers: Theoretical and Practical Analysis of UUIDs

**Abstract**

The generation of unique identifiers in a distributed system without central coordination is a non-trivial problem governed by the CAP theorem. Universally Unique Identifiers (UUIDs) provide a standardized 128-bit solution space. However, the random distribution of legacy UUID versions introduces severe performance penalties in clustered index databases. This report analyzes the mathematical properties of UUID collision, the write amplification caused by random insertions in B-Trees, and the architectural advantages of the new time-ordered UUID v7 standard (RFC 9562).

## 1. Introduction

In relational database theory, the ideal Primary Key is small, immutable, and sequentially monotonic. An \`AUTO_INCREMENT\` integer satisfies these properties perfectly but introduces a single point of failure (the centralized counter) that is incompatible with distributed, multi-master architectures.

UUIDs solve the coordination problem by expanding the ID space to 128 bits, allowing independent nodes to generate IDs with negligible collision probability. However, this solution introduces a new problem: **Locality**.

## 2. Information Theoretic Properties

### 2.1 The Collision Probability
A standard UUID v4 contains 122 bits of randomness (6 bits are reserved for versioning). The total state space is $2^{122} \\approx 5.3 \\times 10^{36}$.

According to the Birthday Paradox, the probability $p$ of a collision after generating $n$ keys from a space of size $H$ is approximated by:
$$ p(n) \\approx 1 - e^{-n^2/(2H)} $$

To reach a collision probability of $10^{-15}$ (effectively zero), one must generate roughly $10^{11}$ (100 billion) UUIDs.
*   **Engineering Verdict**: For all systems bounded by the physical limits of current storage technology, UUID v4 collision is a statistical impossibility.

### 2.2 The Privacy Leak of Version 1
RFC 4122 defined UUID v1, which concatenated a 60-bit timestamp with the generating node's 48-bit MAC address.
*   **Vulnerability**: An adversary collecting IDs can trivially map the network topology (MAC addresses) and determining the exact creation time of records.
*   **Status**: Deprecated for all public-facing applications.

## 3. Database Indexing Theory

The primary argument against random UUIDs (v4) is their interaction with **B-Tree Data Structures**.

### 3.1 Clustered Index Mechanics
In engines like InnoDB (MySQL), the table data is stored in the leaf nodes of the Primary Key B+ Tree.
*   **Sequential Insert**: When keys are monotonic (e.g., \`1, 2, 3\`), the database appends data to the rightmost page. When a page fills, a new one is allocated. Page fill factor approaches 100%.
*   **Random Insert (UUID v4)**: A new key may belong to *any* leaf page.
    1.  The DB must traverse the tree to find the correct page.
    2.  If the page is not in the Buffer Pool (RAM), it must be fetched from disk (Random I/O).
    3.  If the page is full, a **Page Split** occurs: roughly 50% of the records are moved to a new page.

### 3.2 Write Amplification Analysis
Random inserts cause:
*   **Low Cache Hit Ratio**: Every insert potentially requires a unique disk read.
*   **Disk Fragmentation**: Page splits result in pages that are only 50-70% full, wasting disk space.
*   **WAL Bloat**: Page splits generate massive Write Ahead Log activity.

**Benchmark**: As the dataset size exceeds available RAM, UUID v4 write performance degrades by orders of magnitude compared to sequential keys.

## 4. RFC 9562: The Modern Standard (UUID v7)

Published in May 2024, RFC 9562 standardizes **UUID v7**, designed specifically to solve the B-Tree problem.

### 4.1 Structure
*   **Bits 0-47**: Unix Timestamp in milliseconds (Big Endian).
*   **Bits 48-51**: Version (\`0111\`).
*   **Bits 52-63**: Counter/Random (to handle sub-millisecond generation).
*   **Bits 64-127**: Pseudo-random data.

### 4.2 The Locality Advantage
Because the first 48 bits are a timestamp, UUID v7s generated around the same time are numerically close.
*   **Result**: New inserts are directed to the "hot" right side of the B-Tree.
*   **Performance**: Matches sequential integers for insert speed while retaining distributed uniqueness.

## 5. System Design Implications

### 5.1 Storage Optimization
Storing a UUID as a 36-character string (\`VARCHAR(36)\`) is inefficient (36 bytes).
*   **Binary Storage**: A UUID is fundamentally 16 bytes.
*   **MySQL**: Use \`BINARY(16)\`. \`UNHEX(REPLACE(uuid, '-', ''))\` on write.
*   **PostgreSQL**: Use the native \`UUID\` type (16 bytes optimized).

### 5.2 Security Considerations
While UUID v7 solves performance, it reintroduces **predictability**.
*   The timestamp component allows an adversary to estimate the creation time and potentially guess the prefix of an ID.
*   **Constraint**: Do not use UUID v7 for "unguessable" tokens like Password Reset Links or API Keys. Use purely random UUID v4 (or 32 bytes of CSPRNG) for secrets.

## 6. Conclusion

The selection of a Primary Key strategy is a critical architectural decision with permanent performance implications.

*   **Legacy Systems**: Often stuck with Auto-Increment or UUID v4.
*   **Modern Distributed Systems**: Should standardize on **UUID v7**. It provides the operational simplicity of random IDs with the performance profile of sequential integers.

Engineers must ensure their database schemas store these identifiers as 128-bit binary values to maximize cache locality and minimize storage overhead.
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
      <UuidGuideStructuredData />
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
