"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { Md5GuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "MD5 Cryptanalysis: A Retrospective on Hash Function Design",
  description:
    "A deep cryptographic analysis of the MD5 algorithm, detailing the Merkle-Damgård construction, differential cryptanalysis vectors, collision mathematics, and modern engineering applications.",
  author: "Security Research",
  date: "2024-12-21",
  readTime: "30 min",
  tags: ["Cryptography", "Cryptanalysis", "Hash Functions", "MD5", "Security"],
  image: "/md5-guide-pixel.jpeg",
  featured: false,
};

export function Md5GuideContent() {
  const content = `# MD5 Cryptanalysis: A Retrospective on Hash Function Design

**Abstract**

The MD5 Message-Digest Algorithm, defined in RFC 1321, was once the preeminent cryptographic hash function for digital signatures and data integrity. Following the groundbreaking collision attacks by Wang et al. (2004), it was cryptographically broken. This report analyzes the internal architecture of MD5, specifically the weaknesses in its compression function that allow for differential cryptanalysis, and examines its continued utility in non-adversarial engineering contexts.

## 1. Introduction

A cryptographic hash function $H$ takes an input of arbitrary length $M$ and maps it to a fixed-length output $h$ ($H(M) = h$). Ideally, it should satisfy three properties:
1.  **Pre-image Resistance**: Given $h$, it is computationally infeasible to find $M$.
2.  **Second Pre-image Resistance**: Given $M_1$, it is infeasible to find $M_2$ such that $H(M_1) = H(M_2)$.
3.  **Collision Resistance**: It is infeasible to find *any* pair $(M_1, M_2)$ such that $H(M_1) = H(M_2)$.

MD5 fails the third property catastrophically. The theoretical effort required to find a collision ($2^{64}$) has been reduced to $2^{18}$ operations in practice—a computation that takes milliseconds on modern hardware.

## 2. The Merkle-Damgård Construction

MD5 is an iterative hash function based on the **Merkle-Damgård** paradigm.

### 2.1 Padding Scheme (RFC 1321 §3.1)
The input message is padded to ensure its length is congruent to $448 \\pmod{512}$.
1.  Append a single \`1\` bit.
2.  Append $k$ zero bits, where $k$ is the smallest non-negative solution to $L + 1 + k \\equiv 448 \\pmod{512}$.
3.  Append a 64-bit representation of the message length $L$.

**Security Implication**: This suffix-padding enables **Length Extension Attacks**. If an attacker knows $H(M)$ and $|M|$, they can compute $H(M || P || M')$ without knowing $M$. This flaw necessitated the development of HMAC.

### 2.2 Internal State
The algorithm maintains a 128-bit state divided into four 32-bit words, initialized with the following hex constants (derived from the fractional part of $\\pi$):
*   $A = \\text{0x67452301}$
*   $B = \\text{0xEFCDAB89}$
*   $C = \\text{0x98BADCFE}$
*   $D = \\text{0x10325476}$

## 3. The Compression Function

The core of MD5 processes 512-bit message blocks in four rounds of 16 operations each.

### 3.1 Step Functions
Each round uses a different non-linear function $F, G, H, I$:
*   $F(X,Y,Z) = (X \\wedge Y) \\lor (\\neg X \\wedge Z)$
*   $G(X,Y,Z) = (X \\wedge Z) \\lor (Y \\wedge \\neg Z)$
*   $H(X,Y,Z) = X \\oplus Y \\oplus Z$
*   $I(X,Y,Z) = Y \\oplus (X \\lor \\neg Z)$

### 3.2 The Operation
For each step $i$ ($0 \\le i < 64$):
$$ A = B + ((A + \\text{Func}(B,C,D) + M[k] + T[i]) \\lll s) $$
Where:
*   $M[k]$ is a 32-bit word from the message block.
*   $T[i]$ is a constant ($2^{32} \\times |\\sin(i+1)|$).
*   $\\lll s$ denotes a left bitwise rotation.

### 3.3 The Failure of Avalanche
The design of these step functions, particularly the simple modular addition, failed to provide sufficient **Avalanche Effect**. Differential cryptanalysis exploits the fact that small bit differences in the input can be controlled to cancel out differences in the internal state after a few rounds.

## 4. Cryptanalysis and Exploits

### 4.1 Chosen-Prefix Collisions
In 2007, Stevens et al. demonstrated a "Chosen-Prefix" attack. This allows an attacker to take two arbitrary prefixes $P_1$ and $P_2$ and calculate suffixes $S_1$ and $S_2$ such that:
$$ H(P_1 || S_1) = H(P_2 || S_2) $$

This is far more dangerous than a random collision because it allows targeting meaningful data structures (e.g., X.509 Certificates).

### 4.2 The Flame Malware (2012)
The most sophisticated cyberweapon in history, Flame, utilized an MD5 chosen-prefix collision to forge a Microsoft Terminal Server licensing certificate. This allowed the malware to sign its own code updates, bypassing Windows security mechanisms completely.

## 5. Engineering Applications

Despite being cryptographically broken, MD5 retains utility in non-adversarial contexts.

### 5.1 Content-Addressable Storage (CAS)
Systems like \`rsync\` use MD5 checksums to detect file changes. In this context, the threat model is "random bit flips" (corruption), not "intelligent adversary" (collision attack). MD5's speed and 128-bit size make it efficient for deduplication.

### 5.2 Consistent Hashing
In distributed databases (e.g., Cassandra, Dynamo), keys are hashed to determine partition placement. MD5 provides excellent uniform distribution of keys across the 128-bit space, ensuring balanced load. Since the input keys are usually internal identifiers, collision attacks are not a relevant vector.

## 6. Conclusion

MD5 serves as a critical case study in the lifecycle of cryptographic primitives. What was once "provably secure" became "theoretically weak" and finally "operationally broken."

For modern security engineering, MD5 is strictly deprecated. **SHA-256** or **BLAKE2** should be the default choices. However, for structural engineering tasks where cryptographic resistance is not required, MD5 remains a highly optimized, universally supported tool for data fingerprinting.
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
      <Md5GuideStructuredData />
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
