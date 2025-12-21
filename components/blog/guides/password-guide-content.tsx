"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { PasswordGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Password Security: Information Theory and Key Derivation",
  description:
    "A rigorous information-theoretic analysis of password security, examining entropy thresholds, the failure of complexity rules (NIST SP 800-63B), and the memory-hardness properties of the Argon2 KDF.",
  author: "Security Research",
  date: "2024-12-21",
  readTime: "25 min",
  tags: ["Cryptography", "Argon2", "Information Theory", "NIST"],
  image: "/password-guide-pixel.jpeg",
  featured: false,
};

export function PasswordGuideContent() {
  const content = `# Password Security: Information Theory and Key Derivation

**Abstract**

The security of user authentication relies on two pillars: the information-theoretic strength of the secret (Entropy) and the computational cost required to attack it (Work Factor). For decades, industry standards emphasized "complexity" rules that paradoxically reduced system security by encouraging predictable patterns. This report analyzes the mathematical basis of password strength, the paradigm shift introduced by NIST SP 800-63B, and the cryptographic primitives (Argon2, Bcrypt) required to defend against GPU-accelerated cracking.

## 1. Introduction

Authentication is a proof of identity. The "Shared Secret" (Password) remains the most common form of proof despite its vulnerabilities. The security model assumes that an attacker who compromises the storage backend (the password hash database) must perform computationally expensive work to recover the plaintext secrets.

The arms race between defenders (using Key Derivation Functions) and attackers (using ASIC/GPU clusters) is defined by the Time-Memory Trade-Off (TMTO). Modern defense relies not just on CPU hardness, but on **Memory Hardness** to neutralize the parallel processing advantage of adversarial hardware.

## 2. Entropy and Search Space Analysis

### 2.1 Shannon Entropy
The strength of a password is defined by its entropy $H$, measured in bits. It represents the unpredictability of the secret.
$$ H = L \\cdot \\log_2(N) $$
Where $L$ is the length and $N$ is the size of the character repertoire.

### 2.2 The Complexity Fallacy
Traditional policies enforced complexity: "Must contain Uppercase, Lowercase, Digit, Symbol."
*   **Intent**: Increase $N$.
*   **Result**: Users choose predictable patterns like \`Password1!\`.
    *   $L=10$.
    *   The "randomness" is concentrated in the suffix (\`1!\`).
    *   Effective Entropy is extremely low because the prefix \`Password\` is fixed.

Contrast this with a **Passphrase**: "correct horse battery staple" (XKCD 936).
*   **Mechanism**: Selecting 4 words from a dictionary of 2048 words.
*   **Entropy**: $4 \\cdot \\log_2(2048) = 4 \\cdot 11 = 44$ bits (per word choice). Wait, this calculation assumes words are chosen uniformly at random.
*   **Character Entropy**: $28 \\text{ chars} \\cdot \\log_2(27) \\approx 133 \\text{ bits}$.

**Conclusion**: Length ($L$) contributes linearly to entropy, but since it is an exponent in the search space calculation ($N^L$), increasing length is exponentially more effective than increasing character set complexity.

## 3. Cryptographic Primitives: The Evolution of KDFs

Storing passwords requires a **Key Derivation Function (KDF)**, not a simple Message Digest.

### 3.1 The Failure of General-Purpose Hashes
Algorithms like SHA-256 and MD5 are designed for throughput. They can process gigabytes of data per second.
*   **Attack Vector**: A single NVIDIA RTX 4090 can calculate billions of SHA-256 hashes per second.
*   **Defense**: None. They are unfit for purpose.

### 3.2 PBKDF2 (CPU Hardness)
**Password-Based Key Derivation Function 2** iterates a hash function (HMAC-SHA256) $c$ times.
*   **Defense**: Increases the cost of verification linearly.
*   **Weakness**: It is not memory-hard. GPUs, which have thousands of cores, can parallelize PBKDF2 attacks trivially.

### 3.3 Bcrypt (Instruction Hardness)
Based on the Blowfish cipher setup. It requires 4KB of internal state (S-boxes) that changes constantly.
*   **Defense**: The frequent random memory accesses disrupt the pipeline of simple GPUs.
*   **Weakness**: FPGAs can implement the Blowfish logic efficiently.

### 3.4 Argon2 (Memory Hardness)
The winner of the 2015 Password Hashing Competition and the current IETF recommendation (RFC 9106).
*   **Mechanism**: Argon2 fills a large memory buffer (e.g., 64MB) with pseudo-random data. Generating the hash requires accessing this memory in a specific, non-linear order.
*   **Defense**: GPUs have high compute but limited high-speed memory per core. Forcing an attacker to dedicate 64MB of RAM per guess drastically reduces the number of parallel threads they can run.
*   **Modes**:
    *   **Argon2d**: Data-dependent access (vulnerable to side-channels, good for crypto-currencies).
    *   **Argon2i**: Data-independent access (resists side-channels).
    *   **Argon2id**: Hybrid (Recommended for password storage).

## 4. Threat Modeling: The Offline Attack

### 4.1 Rainbow Tables
A Time-Memory Trade-Off attack where the attacker pre-computes hashes for all possible passwords.
*   **Defense**: **Salting**. Appending a unique, random 16-byte nonce to every password before hashing.
*   **Result**: The attacker cannot reuse a table. They must attack each user's hash individually.

### 4.2 Credential Stuffing
Attackers use valid username/password pairs dumped from a compromised site (Site A) to attack Site B.
*   **Defense**: **k-Anonymity Breach Detection**.
*   During registration, the server should hash the password (SHA-1), send the first 5 chars to a trusted oracle (e.g., HaveIBeenPwned), and check if the hash suffix appears in the returned list of known breaches.

## 5. Conclusion

Password security is no longer about arbitrary complexity rules. It is an engineering discipline centered on **Entropy Management** (enforcing length) and **Cost imposition** (using memory-hard KDFs like Argon2id).

Engineers must perform parameter tuning on their KDFs to ensure the verification time (~500ms) is acceptable for legitimate users while being cost-prohibitive for massive parallel attacks.
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
      <PasswordGuideStructuredData />
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
