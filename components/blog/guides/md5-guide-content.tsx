"use client";

import { motion } from "framer-motion";
import { Streamdown } from "streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { Md5GuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

export function Md5GuideContent() {
  // Comprehensive MD5 guide content
  const content = `# MD5 Hashing Tutorial: Complete Implementation Guide

MD5 (Message Digest Algorithm 5) is a cryptographic hash function that produces a 128-bit hash value. While no longer secure for cryptographic purposes, it remains useful for data integrity verification and basic checksums.

## What is MD5?

MD5 is a hash function that takes an input message and returns a fixed-size string of bytes, typically represented as a hexadecimal number. The output is always **32 characters long** and **128 bits** for any input.

### Key Characteristics:
- **Fixed output size**: Always produces 32-character hexadecimal string
- **Deterministic**: Same input always produces same output  
- **One-way function**: Cannot reverse the hash to get original input
- **Fast computation**: Relatively quick to calculate
- **Collision prone**: Different inputs can produce same hash

### Basic Example:
**Input:** "Hello World"  
**MD5 Hash:** \`b10a8db164e0754105b7a99be72e3fe5\`

## How MD5 Works

The MD5 algorithm processes input through these main steps:

### 1. Padding
Add padding bits to make the message length congruent to 448 mod 512:
- Always add a '1' bit followed by '0' bits
- Minimum padding is 1 bit, maximum is 512 bits
- Ensures message length is proper multiple for processing

### 2. Length Appending  
Append the original message length as a 64-bit value:
- Length is measured in bits, not bytes
- Small messages get additional padding to reach 64 bits
- Critical for the algorithm's security properties

### 3. Block Processing
Divide the padded message into 512-bit blocks:
- Each block goes through multiple rounds of processing
- Uses bitwise operations, modular arithmetic, and logical functions
- Processes blocks sequentially with internal state

### 4. Output Generation
Produce the final 128-bit (16-byte) hash value:
- Concatenate four 32-bit values from the final state
- Represented as 32 hexadecimal characters
- Always the same length regardless of input size

## MD5 in Different Programming Languages

### JavaScript (Node.js)
\`\`\`javascript
const crypto = require('crypto');

// Basic hashing
const hash = crypto.createHash('md5').update('Hello World').digest('hex');
console.log(hash); // "b10a8db164e0754105b7a99be72e3fe5"

// With different encodings
const hashUtf8 = crypto.createHash('md5').update('Hello 世界').digest('hex');
const hashBuffer = crypto.createHash('md5').update(Buffer.from('Hello')).digest('hex');

// Streaming hash for large files
const fs = require('fs');
const hashStream = crypto.createHash('md5');
const readStream = fs.createReadStream('largefile.txt');
readStream.on('data', (data) => hashStream.update(data));
readStream.on('end', () => {
  console.log(hashStream.digest('hex'));
});
\`\`\`

### Python
\`\`\`python
import hashlib

# Basic hashing
hash_object = hashlib.md5(b'Hello World')
print(hash_object.hexdigest())  # "b10a8db164e0754105b7a99be72e3fe5"

# String input (needs encoding)
hash_string = hashlib.md5('Hello World'.encode('utf-8'))
print(hash_string.hexdigest())  # "b10a8db164e0754105b7a99be72e3fe5"

# File hashing
def hash_file(filename):
    hash_md5 = hashlib.md5()
    with open(filename, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

# Unicode handling
unicode_text = "Hello 世界"
hash_unicode = hashlib.md5(unicode_text.encode('utf-8'))
print(hash_unicode.hexdigest())

# Incremental hashing
hash_incremental = hashlib.md5()
hash_incremental.update(b'Hello ')
hash_incremental.update(b'World')
print(hash_incremental.hexdigest())
\`\`\`

### Java
\`\`\`java
import java.security.MessageDigest;
import java.math.BigInteger;
import java.io.FileInputStream;
import java.io.InputStream;

public class Md5Example {
    public static void main(String[] args) throws Exception {
        String input = "Hello World";
        
        // Basic hashing
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(input.getBytes());
        BigInteger no = new BigInteger(1, messageDigest);
        System.out.println(no.toString(16)); // "b10a8db164e0754105b7a99be72e3fe5"
        
        // With custom encoding
        byte[] bytes = input.getBytes("UTF-8");
        MessageDigest md2 = MessageDigest.getInstance("MD5");
        byte[] digest = md2.digest(bytes);
        
        // Convert to hex string manually
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(String.format("%02x", b));
        }
        System.out.println(sb.toString());
        
        // File hashing
        String fileHash = hashFile("example.txt");
        System.out.println("File hash: " + fileHash);
    }
    
    public static String hashFile(String filename) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        try (InputStream is = new FileInputStream(filename)) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                md.update(buffer, 0, bytesRead);
            }
        }
        byte[] digest = md.digest();
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
\`\`\`

### PHP
\`\`\`php
<?php
// Basic hashing
$hash = md5("Hello World");
echo $hash; // "b10a8db164e0754105b7a99be72e3fe5"

// File hashing
function hashFile($filename) {
    return md5_file($filename);
}

// String and binary data
$text = "Hello World";
$binary = "\x48\x65\x6c\x6c\x6f"; // "Hello" in hex
echo md5($text);      // text hash
echo md5($binary);    // binary hash

// Incremental hashing
$context = hash_init('md5');
hash_update($context, 'Hello ');
hash_update($context, 'World');
echo hash_final($context); // Same as md5("Hello World")

// Unicode handling
$unicode = "Hello 世界";
echo md5($unicode); // Works with UTF-8 strings
?>
\`\`\`

### Go
\`\`\`go
package main

import (
    "crypto/md5"
    "encoding/hex"
    "fmt"
    "io"
    "os"
)

func main() {
    // Basic hashing
    input := "Hello World"
    hash := md5.Sum([]byte(input))
    fmt.Println(hex.EncodeToString(hash[:])) // "b10a8db164e0754105b7a99be72e3fe5"
    
    // Incremental hashing
    h := md5.New()
    io.WriteString(h, "Hello ")
    io.WriteString(h, "World")
    fmt.Println(hex.EncodeToString(h.Sum(nil)))
    
    // File hashing
    fileHash, err := hashFile("example.txt")
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("File hash:", fileHash)
    }
    
    // Different data types
    data := []byte("Hello World")
    stringHash := md5.Sum([]byte(input))
    byteHash := md5.Sum(data)
    fmt.Println(stringHash == byteHash) // true
}

func hashFile(filename string) (string, error) {
    file, err := os.Open(filename)
    if err != nil {
        return "", err
    }
    defer file.Close()
    
    h := md5.New()
    if _, err := io.Copy(h, file); err != nil {
        return "", err
    }
    
    return hex.EncodeToString(h.Sum(nil)), nil
}
\`\`\`

## Legitimate Use Cases

### File Integrity Verification
Detect corruption in downloaded files:

\`\`\`bash
# Download file with expected hash
wget https://example.com/software.zip
wget https://example.com/software.zip.md5

# Verify integrity
md5sum software.zip
# Compare with content of software.zip.md5
\`\`\`

### Data Deduplication
Quickly identify duplicate files:

\`\`\`python
import os
import hashlib

def find_duplicates(directory):
    hashes = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            with open(filepath, 'rb') as f:
                file_hash = hashlib.md5(f.read()).hexdigest()
                if file_hash in hashes:
                    print(f"Duplicate: {filepath} and {hashes[file_hash]}")
                else:
                    hashes[file_hash] = filepath
\`\`\`

### Cache Keys
Generate simple cache identifiers:

\`\`\`javascript
function generateCacheKey(data) {
  return 'cache_' + require('crypto')
    .createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex');
}

// Usage
const userData = { id: 123, name: 'John' };
const cacheKey = generateCacheKey(userData);
console.log(cacheKey); // "cache_e99a18c428cb38d5f260853678922e03"
\`\`\`

## Security Limitations

### ⚠️ Critical Security Warnings

MD5 is **cryptographically broken** and should **NEVER** be used for:

- **Password storage** - Easily cracked with rainbow tables
- **Digital signatures** - Vulnerable to collision attacks  
- **Security tokens** - Predictable and reversible
- **Authentication** - No protection against attacks

### Collision Vulnerabilities

**Birthday Attack Complexity:** 2^64 operations (theoretically possible)

**Real-world exploits:**
- **2004**: First practical collision attack demonstrated
- **2008**: Certificate collision attack created fake SSL certificates
- **2012**: Flame malware used MD5 collisions to forge Microsoft certificates

### Rainbow Tables
Pre-computed hash tables can reverse common MD5 hashes:

\`\`\`python
# Common password hashes (from rainbow tables)
rainbow_table = {
    '5d41402abc4b2a76b9719d911017c592': 'hello',
    '098f6bcd4621d373cade4e832627b4f6': 'test',
    'e99a18c428cb38d5f260853678922e03': 'secret'
}

def crack_md5(hash_value):
    return rainbow_table.get(hash_value, "Not found")

print(crack_md5('098f6bcd4621d373cade4e832627b4f6'))  # "test"
\`\`\`

## Better Alternatives

### For Password Hashing
Use algorithms specifically designed for passwords:

\`\`\`python
# bcrypt - Industry standard
import bcrypt
password = b"my_secure_password"
hashed = bcrypt.hashpw(password, bcrypt.gensalt())
print(bcrypt.checkpw(password, hashed))  # True

# Argon2 - Modern alternative
import argon2
ph = argon2.PasswordHasher()
hash = ph.hash("my_secure_password")
print(ph.verify(hash, "my_secure_password"))  # True
\`\`\`

### For General Hashing
Use cryptographically secure alternatives:

\`\`\`javascript
// SHA-256 - Widely adopted
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('Hello World').digest('hex');
// "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"

// BLAKE2 - Modern and fast
const blake = require('blakejs');
const hashBlake2 = blake.blake2bHex('Hello World');
\`\`\`

## Best Practices

### ✅ Do This:
\`\`\`javascript
// Use for file integrity only
const fileHash = crypto.createHash('md5')
  .update(fs.readFileSync('document.pdf'))
  .digest('hex');

// Compare with known good hash
if (fileHash === expectedHash) {
  console.log('File integrity verified');
}
\`\`\`

### ❌ Don't Do This:
\`\`\`javascript
// NEVER use for passwords
const passwordHash = md5(userPassword); // WRONG!

// NEVER use for security tokens  
const token = md5(userId + timestamp); // WRONG!

// NEVER assume collision resistance
if (hash1 === hash2) {
  // Files might be different!
}
\`\`\`

## Performance Considerations

### Speed Comparison
MD5 is very fast compared to secure alternatives:

\`\`\`python
import time
import hashlib

def benchmark_hash():
    data = b"Hello World" * 10000
    
    # MD5 - Very fast
    start = time.time()
    for _ in range(10000):
        hashlib.md5(data)
    md5_time = time.time() - start
    
    # SHA-256 - Slower but secure
    start = time.time()
    for _ in range(10000):
        hashlib.sha256(data)
    sha256_time = time.time() - start
    
    print(f"MD5: {md5_time:.4f}s")
    print(f"SHA-256: {sha256_time:.4f}s")
    print(f"MD5 is {sha256_time/md5_time:.1f}x faster")
\`\`\`

### Memory Usage
For large files, use streaming:

\`\`\`python
def hash_large_file(filename):
    hash_md5 = hashlib.md5()
    with open(filename, "rb") as f:
        # Process in chunks to avoid loading entire file
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()
\`\`\`

## Common Pitfalls

### 1. Unicode Handling
**Problem:** Different encodings produce different hashes

\`\`\`python
# ❌ Wrong - inconsistent encoding
text = "Hello 世界"
hash1 = hashlib.md5(text.encode('utf-8'))
hash2 = hashlib.md5(text.encode('latin1'))
print(hash1.hexdigest() != hash2.hexdigest())  # True

# ✅ Correct - always specify encoding
hash_utf8 = hashlib.md5(text.encode('utf-8'))
\`\`\`

### 2. Binary vs String Data
**Problem:** Hashing different data types

\`\`\`python
# String "Hello" vs bytes b"Hello"
string_hash = hashlib.md5("Hello".encode())
bytes_hash = hashlib.md5(b"Hello")
print(string_hash.hexdigest() == bytes_hash.hexdigest())  # True
\`\`\`

### 3. Case Sensitivity
**Problem:** Case-sensitive hashing

\`\`\`python
hash1 = hashlib.md5(b"hello")
hash2 = hashlib.md5(b"HELLO")
print(hash1.hexdigest() != hash2.hexdigest())  # True - different hashes!
\`\`\`

## Tools and Resources

Use our **MD5 Hash Generator** tool to quickly generate MD5 hashes online. Remember to use stronger algorithms like SHA-256 for security-critical applications.

### Recommended Tools:
- **Online Hash Generators**: Quick MD5 calculation
- **Hash Calculators**: Built into most operating systems
- **Cryptographic Libraries**: Built-in support in most languages
- **File Verification Tools**: For integrity checking

## Conclusion

While MD5 is no longer suitable for security applications due to collision vulnerabilities, it remains useful for:

- **Data integrity verification** - Basic corruption detection
- **File deduplication** - Identifying duplicate files
- **Non-critical checksums** - Where security isn't a concern

### Key Takeaways:
- **Never use for passwords** or security-critical applications
- **Use for file integrity** and basic checksums only
- **Choose SHA-256** for general-purpose hashing
- **Always validate** input encoding consistency
- **Stay updated** with cryptographic recommendations

---

*This guide covers MD5 fundamentals and security considerations. For production applications, always use cryptographically secure alternatives.*`;

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
            <motion.div
              className="prose prose-lg max-w-none streamdown-content"
              variants={fadeInUp}
            >
              <Streamdown
                shikiTheme={["github-light", "github-dark"]}
                components={{
                  h1: ({ children }) => {
                    const title = typeof children === "string" ? children : "";
                    const id = title
                      .toLowerCase()
                      .replace(/[^\w\s-]/gu, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim();
                    return (
                      <h1
                        id={id || "learn-md5-hashing-complete-tutorial"}
                        className="text-4xl font-bold text-gray-900 dark:text-gray-100 border-b-4 border-red-500 pb-4 mb-8"
                      >
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children }) => {
                    const title = typeof children === "string" ? children : "";
                    const id = title
                      .toLowerCase()
                      .replace(/[^\w\s-]/gu, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim();
                    return (
                      <h2
                        id={id}
                        className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-12 mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700"
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const title = typeof children === "string" ? children : "";
                    const id = title
                      .toLowerCase()
                      .replace(/[^\w\s-]/gu, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim();
                    return (
                      <h3
                        id={id}
                        className="text-2xl font-medium text-gray-700 dark:text-gray-300 mt-8 mb-4"
                      >
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ children }) => {
                    const title = typeof children === "string" ? children : "";
                    const id = title
                      .toLowerCase()
                      .replace(/[^\w\s-]/gu, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim();
                    return (
                      <h4
                        id={id}
                        className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-6 mb-3"
                      >
                        {children}
                      </h4>
                    );
                  },
                  h5: ({ children }) => {
                    const title = typeof children === "string" ? children : "";
                    const id = title
                      .toLowerCase()
                      .replace(/[^\w\s-]/gu, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim();
                    return (
                      <h5
                        id={id}
                        className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2"
                      >
                        {children}
                      </h5>
                    );
                  },
                  h6: ({ children }) => {
                    const title = typeof children === "string" ? children : "";
                    const id = title
                      .toLowerCase()
                      .replace(/[^\w\s-]/gu, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim();
                    return (
                      <h6
                        id={id}
                        className="text-base font-medium text-gray-700 dark:text-gray-300 mt-3 mb-2"
                      >
                        {children}
                      </h6>
                    );
                  },
                  p: ({ children }) => (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-3 mb-6 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-3 mb-6 ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="text-lg">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-red-500 pl-6 py-2 my-6 bg-red-50 dark:bg-red-950/50 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-800 dark:text-gray-200">
                      {children}
                    </strong>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 decoration-blue-300 dark:decoration-blue-600 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </Streamdown>
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
