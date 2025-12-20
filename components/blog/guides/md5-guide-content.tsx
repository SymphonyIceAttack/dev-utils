"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { Md5GuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "MD5 Hashing Tutorial: Complete Implementation Guide",
  description:
    "MD5 (Message Digest Algorithm 5) is a cryptographic hash function that produces a 128-bit hash value. While no longer secure for cryptographic purposes, it remains useful for data integrity verification.",
  author: "Security Team",
  date: "2024-12-13",
  readTime: "12 min",
  tags: ["MD5", "Guide", "Cryptography"],
  image: "/md5-guide-pixel.jpeg",
  featured: false,
};

export function Md5GuideContent() {
  // Comprehensive MD5 guide content
  const content = `# MD5 Hashing Tutorial: Complete Implementation Guide

MD5 (Message Digest Algorithm 5) is a cryptographic hash function that produces a 128-bit hash value. While no longer secure for cryptographic purposes, it remains useful for data integrity verification and basic checksums.

## What is MD5?

MD5 is a hash function that takes an input message and returns a fixed-size string of bytes, typically represented as a hexadecimal number. The output is always **32 characters long** and **128 bits** for any input.

### Key Characteristics:

| Property | Description |
|----------|-------------|
| **Fixed output size** | Always produces 32-character hexadecimal string |
| **Deterministic** | Same input always produces same output |
| **One-way function** | Cannot reverse the hash to get original input |
| **Fast computation** | Relatively quick to calculate |
| **Collision prone** | Different inputs can produce same hash |

### Basic Example:

|**Input:** "Hello World"**|
|**MD5 Hash:** \`b10a8db164e0754105b7a99be72e3fe5\`|

### Hash Properties Demonstration

\`\`\`javascript
// Deterministic - same input always produces same hash
const hash1 = md5('Hello World'); // b10a8db164e0754105b7a99be72e3fe5
const hash2 = md5('Hello World'); // b10a8db164e0754105b7a99be72e3fe5
console.log(hash1 === hash2); // true

// Fixed size - different input lengths produce same length hash
const shortHash = md5('Hi'); // 49f68a5c8493ec2c3bf2f01e16b04738
const longHash = md5('A very long string that is much longer than the previous input');
console.log(shortHash.length); // 32
console.log(longHash.length); // 32

// Avalanche effect - small change = completely different hash
const hashA = md5('Hello World'); // b10a8db164e0754105b7a99be72e3fe5
const hashB = md5('Hello World.'); // 6e254f9eb9a9659efcafd68d8c35c1e6
console.log(hashA === hashB); // false (completely different)
\`\`\`

## How MD5 Works

The MD5 algorithm processes input through these main steps:

### 1. Padding

Add padding bits to make the message length congruent to 448 mod 512:

\`\`\`
Padding Process:
- Always add a '1' bit followed by '0' bits
- Minimum padding is 1 bit, maximum is 512 bits
- Ensures message length is proper multiple for processing

Example:
Input: "Hello" (5 bytes = 40 bits)
Padded: "Hello" + 0x80 + 0x00... (407 bits of padding)
Total: 448 bits (56 bytes)
\`\`\`

### 2. Length Appending

Append the original message length as a 64-bit value:

\`\`\`
Length Field:
- Length is measured in bits, not bytes
- Small messages get additional padding to reach 64 bits
- Critical for the algorithm's security properties

Example:
"Hello" = 5 bytes = 40 bits
Append: 0x0000000000000028 (40 in 64-bit little-endian)
\`\`\`

### 3. Block Processing

Divide the padded message into 512-bit blocks:

\`\`\`
Processing Steps:
- Each block goes through multiple rounds of processing
- Uses bitwise operations, modular arithmetic, and logical functions
- Processes blocks sequentially with internal state

Four Main Functions (per round):
- F(X,Y,Z) = (X ∧ Y) ∨ (¬X ∧ Z)
- G(X,Y,Z) = (X ∧ Z) ∨ (Y ∧ ¬Z)
- H(X,Y,Z) = X ⊕ Y ⊕ Z
- I(X,Y,Z) = Y ⊕ (X ∨ ¬Z)
\`\`\`

### 4. Output Generation

Produce the final 128-bit (16-byte) hash value:

\`\`\`
Output Process:
- Concatenate four 32-bit values from the final state
- Represented as 32 hexadecimal characters
- Always the same length regardless of input size

Example Output:
b10a8db164e0754105b7a99be72e3fe5
|_________/|_________/|_________/|________/|
     A           B           C           D
   (32 bits)   (32 bits)   (32 bits)   (32 bits)
               = 128 bits total =
\`\`\`

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

// Incremental hashing
const incrementalHash = crypto.createHash('md5');
incrementalHash.update('Hello ');
incrementalHash.update('World');
console.log(incrementalHash.digest('hex')); // Same as md5("Hello World")

// Async file hashing
async function hashFileAsync(filePath) {
  const { createHash } = await import('crypto');
  const fs = await import('fs');
  const fileBuffer = await fs.promises.readFile(filePath);
  return createHash('md5').update(fileBuffer).digest('hex');
}
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

# Streaming large files
def hash_large_file(filename, chunk_size=8192):
    hash_md5 = hashlib.md5()
    with open(filename, 'rb') as f:
        while chunk := f.read(chunk_size):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

# Thread-safe hashing
from concurrent.futures import ThreadPoolExecutor

def hash_directory(directory):
    hashes = {}
    with ThreadPoolExecutor() as executor:
        files = [os.path.join(directory, f) for f in os.listdir(directory) if os.path.isfile(f)]
        results = list(executor.map(hash_file, files))
    for file, hash_val in zip(files, results):
        hashes[file] = hash_val
    return hashes
\`\`\`

### Java

\`\`\`java
import java.security.MessageDigest;
import java.math.BigInteger;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

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
        
        // Streaming file hashing
        String streamingHash = hashFileStreaming("largefile.bin");
        System.out.println("Streaming hash: " + streamingHash);
    }
    
    public static String hashFile(String filename) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] fileData = Files.readAllBytes(Paths.get(filename));
        byte[] digest = md.digest(fileData);
        return bytesToHex(digest);
    }
    
    public static String hashFileStreaming(String filename) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        try (InputStream is = new FileInputStream(filename)) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                md.update(buffer, 0, bytesRead);
            }
        }
        byte[] digest = md.digest();
        return bytesToHex(digest);
    }
    
    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
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

// Streaming large files
function hashLargeFile($filename, $chunkSize = 8192) {
    $context = hash_init('md5');
    $handle = fopen($filename, 'rb');
    while (!feof($handle)) {
        $chunk = fread($handle, $chunkSize);
        hash_update($context, $chunk);
    }
    fclose($handle);
    return hash_final($context);
}

// Verify file integrity
function verifyFileIntegrity($filename, $expectedHash) {
    $actualHash = md5_file($filename);
    return hash_equals($expectedHash, $actualHash);
}
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
    "bytes"
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
    
    // Streaming file hashing
    streamingHash, err := hashFileStreaming("largefile.bin")
    if err != nil {
        fmt.Println("Streaming error:", err)
    } else {
        fmt.Println("Streaming hash:", streamingHash)
    }
    
    // Different data types
    data := []byte("Hello World")
    stringHash := md5.Sum([]byte(input))
    byteHash := md5.Sum(data)
    fmt.Println(stringHash == byteHash) // true
}

func hashFile(filename string) (string, error) {
    data, err := os.ReadFile(filename)
    if err != nil {
        return "", err
    }
    hash := md5.Sum(data)
    return hex.EncodeToString(hash[:]), nil
}

func hashFileStreaming(filename string) (string, error) {
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

# Automated verification script
#!/bin/bash
FILE=$1
EXPECTED=$2
ACTUAL=$(md5sum "$FILE" | cut -d' ' -f1)
if [ "$ACTUAL" = "$EXPECTED" ]; then
    echo "✓ File integrity verified"
    exit 0
else
    echo "✗ File corrupted! Expected: $EXPECTED, Got: $ACTUAL"
    exit 1
fi
\`\`\`

### Data Deduplication

Quickly identify duplicate files:

\`\`\`python
import os
import hashlib
from collections import defaultdict

def find_duplicates(directory):
    hashes = defaultdict(list)
    for root, dirs, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            with open(filepath, 'rb') as f:
                file_hash = hashlib.md5(f.read()).hexdigest()
                hashes[file_hash].append(filepath)
    
    # Print duplicates
    for hash_val, files in hashes.items():
        if len(files) > 1:
            print(f"Duplicate files (hash: {hash_val}):")
            for f in files:
                print(f"  - {f}")

# Remove duplicates (keep first)
def remove_duplicates(directory):
    seen = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            with open(filepath, 'rb') as f:
                file_hash = hashlib.md5(f.read()).hexdigest()
            
            if file_hash in seen:
                os.remove(filepath)
                print(f"Removed duplicate: {filepath}")
            else:
                seen[file_hash] = filepath
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

// Cache implementation
class SimpleCache {
  constructor() {
    this.cache = new Map();
  }
  
  get(key) {
    const hash = generateCacheKey(key);
    return this.cache.get(hash);
  }
  
  set(key, value) {
    const hash = generateCacheKey(key);
    this.cache.set(hash, value);
  }
}
\`\`\`

### Version Control

Track file changes and versions:

\`\`\`python
import hashlib
import os
from datetime import datetime

class FileVersionTracker:
    def __init__(self):
        self.versions = {}
    
    def track_file(self, filepath):
        with open(filepath, 'rb') as f:
            content = f.read()
            file_hash = hashlib.md5(content).hexdigest()
        
        if filepath in self.versions:
            prev_hash = self.versions[filepath]['hash']
            if prev_hash != file_hash:
                self.versions[filepath] = {
                    'hash': file_hash,
                    'size': len(content),
                    'modified': datetime.now(),
                    'changed': True
                }
                return True  # File changed
            return False  # No change
        else:
            self.versions[filepath] = {
                'hash': file_hash,
                'size': len(content),
                'modified': datetime.now(),
                'changed': False
            }
            return True  # New file
    
    def get_changed_files(self):
        return [f for f, v in self.versions.items() if v.get('changed', False)]
\`\`\`

## Security Limitations

### ! Critical Security Warnings

MD5 is **cryptographically broken** and should **NEVER** be used for:

| ❌ Don't Use For | Reason |
|-----------------|--------|
| **Password storage** | Easily cracked with rainbow tables |
| **Digital signatures** | Vulnerable to collision attacks |
| **Security tokens** | Predictable and reversible |
| **Authentication** | No protection against attacks |
| **SSL/TLS certificates** | Vulnerable to spoofing |
| **Software updates** | Attackers can create malicious duplicates |

### Collision Vulnerabilities

MD5 is vulnerable to collision attacks where different inputs produce the same hash:

|**Birthday Attack Complexity:** 2^64 operations (theoretically possible)|
|**Practical Attack Complexity:** Much lower with chosen-prefix attacks|

**Real-world exploits:**
- **2004**: First practical collision attack demonstrated by Wang et al.
- **2008**: Researchers created fake SSL certificates using MD5 collisions.
- **2012**: Flame malware used MD5 collisions to forge Microsoft certificates.

### Collision Demonstration

\`\`\`python
# Note: This is for educational purposes only
# Demonstrates that MD5 collisions are practical

# Known collision pair example
collision1 = bytes.fromhex(
    "4dc968ff0ee35c209572d4777b721587d36fa7b21bdc56b74a3dc0783e7b9518"
)
collision2 = bytes.fromhex(
    "4dc968ff0ee35c209572d4777b721587d36fa7b21bdc56b74a3dc0783e7b9518"
)
# Both produce the same MD5 hash but different content

print("MD5(collision1):", hashlib.md5(collision1).hexdigest())
print("MD5(collision2):", hashlib.md5(collision2).hexdigest())
# Both output: "79054025255fb1a26e4bc422aef54eb4"
\`\`\`

### Rainbow Tables

Pre-computed hash tables can reverse common MD5 hashes:

\`\`\`python
# Common password hashes (from rainbow tables)
rainbow_table = {
    '5d41402abc4b2a76b9719d911017c592': 'hello',
    '098f6bcd4621d373cade4e832627b4f6': 'test',
    'e99a18c428cb38d5f260853678922e03': 'secret',
    '25f9e794323b453885f5181f1b624d0b': '123456789',
    '827ccb0eea8a706c4c34a16891f84e7b': '12345',
}

def crack_md5(hash_value):
    return rainbow_table.get(hash_value, "Not found in rainbow table")

print(crack_md5('098f6bcd4621d373cade4e832627b4f6'))  # "test"
print(crack_md5('e99a18c428cb38d5f260853678922e03'))  # "secret"
\`\`\`

## Better Alternatives

### For Password Hashing

Use algorithms specifically designed for passwords:

\`\`\`python
# bcrypt - Industry standard
import bcrypt
password = b"my_secure_password"
hashed = bcrypt.hashpw(password, bcrypt.gensalt(rounds=12))
print(hashed)  # $2b$12$...

# Verify password
if bcrypt.checkpw(password, hashed):
    print("Password valid!")

# Argon2 - Modern alternative (recommended)
import argon2
ph = argon2.PasswordHasher(
    time_cost=3,           # Number of iterations
    memory_cost=65536,     # Memory usage in KB
    parallelism=4          # Parallel threads
)
hash = ph.hash("my_secure_password")
print(hash)  # $argon2id$...

# Verify password
try:
    ph.verify(hash, "my_secure_password")
    print("Password valid!")
except argon2.exceptions.VerifyMismatchError:
    print("Invalid password")

# scrypt - Memory-hard function
import hashlib
import secrets

def hash_password_scrypt(password, salt=None):
    if salt is None:
        salt = secrets.token_bytes(16)
    return hashlib.scrypt(
        password.encode(),
        salt=salt,
        n=16384,      # CPU/memory cost
        r=8,          # Block size
        p=1,          # Parallelization
        dklen=32      # Output length
    ), salt

password = "my_secure_password"
hashed, salt = hash_password_scrypt(password)
\`\`\`

### For General Hashing

Use cryptographically secure alternatives:

\`\`\`javascript
// SHA-256 - Widely adopted and secure
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('Hello World').digest('hex');
// "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"

// SHA-3 (Keccak) - Latest member of SHA family
const { sha3_256 } = require('sha3');
const hash3 = new sha3_256().update('Hello World').digest('hex');

// BLAKE2 - Modern and fast
const blake = require('blakejs');
const hashBlake2 = blake.blake2bHex('Hello World');

// SHA-1 (deprecated but still used in some systems)
const sha1 = crypto.createHash('sha1').update('Hello World').digest('hex');
// "0a0a9f2a6772942557ab5355d76af442f8f65e01"
\`\`\`

### Algorithm Comparison

\`\`\`
| Algorithm | Output Size | Security Level | Speed | Use Case |
|-----------|-------------|----------------|-------|----------|
| MD5       | 128 bits    | ❌ Broken      | Fast  | Checksums only |
| SHA-1     | 160 bits    | ⚠️ Weak       | Fast  | Legacy systems |
| SHA-256   | 256 bits    | ✅ Secure     | Medium| General purpose |
| SHA-512   | 512 bits    | ✅ Secure     | Slow  | High security |
| SHA-3     | 256-512 bits| ✅ Secure     | Medium| Future-proof |
| BLAKE2    | 256-512 bits| ✅ Secure     | Fast  | Performance-critical |
| bcrypt    | Variable    | ✅ Secure     | Slow  | Password hashing |
| Argon2    | Variable    | ✅ Secure     | Slow  | Password hashing |
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

// Use streaming for large files
const crypto = require('crypto');
const fs = require('fs');

function verifyLargeFile(filePath, expectedHash) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);
    
    stream.on('data', data => hash.update(data));
    stream.on('end', () => {
      const actualHash = hash.digest('hex');
      resolve(actualHash === expectedHash);
    });
    stream.on('error', reject);
  });
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
  // Files might be different! This is not safe
}

// NEVER use for digital signatures
const signature = md5(document + privateKey); // WRONG!
\`\`\`

## Performance Considerations

### Speed Comparison

MD5 is very fast compared to secure alternatives:

\`\`\`python
import time
import hashlib
import bcrypt

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
    
    # SHA-512
    start = time.time()
    for _ in range(10000):
        hashlib.sha512(data)
    sha512_time = time.time() - start
    
    # bcrypt - Intentionally slow
    password = b"Hello World" * 1000
    start = time.time()
    for _ in range(10):  # Much fewer iterations
        bcrypt.hashpw(password, bcrypt.gensalt(rounds=4))
    bcrypt_time = time.time() - start
    
    print(f"MD5:       {md5_time:.4f}s (baseline)")
    print(f"SHA-256:   {sha256_time:.4f}s ({sha256_time/md5_time:.1f}x slower)")
    print(f"SHA-512:   {sha512_time:.4f}s ({sha512_time/md5_time:.1f}x slower)")
    print(f"bcrypt:    {bcrypt_time:.4f}s ({bcrypt_time/md5_time:.1f}x slower)")
\`\`\`

### Memory Usage

For large files, use streaming:

\`\`\`python
def hash_large_file(filename, chunk_size=4096):
    hash_md5 = hashlib.md5()
    with open(filename, "rb") as f:
        # Process in chunks to avoid loading entire file
        for chunk in iter(lambda: f.read(chunk_size), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

# Memory-efficient for multi-GB files
def hash_file_efficient(filename):
    """Hash large files with minimal memory usage."""
    hash_md5 = hashlib.md5()
    file_size = os.path.getsize(filename)
    
    # Use smaller chunks for very large files
    chunk_size = min(1024 * 1024, file_size // 1000)  # Max 1MB or 0.1% of file
    
    with open(filename, 'rb') as f:
        while chunk := f.read(chunk_size):
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
print(hash1.hexdigest() != hash2.hexdigest())  # True - different hashes!

# ✅ Correct - always specify encoding
hash_utf8 = hashlib.md5(text.encode('utf-8'))

# ❌ Wrong - string vs bytes
string_hash = hashlib.md5("Hello")  # TypeError!
bytes_hash = hashlib.md5(b"Hello")  # Correct

# ✅ Correct - encode strings explicitly
def hash_string(text, encoding='utf-8'):
    if isinstance(text, str):
        text = text.encode(encoding)
    return hashlib.md5(text).hexdigest()
\`\`\`

### 2. Binary vs String Data

**Problem:** Hashing different data types

\`\`\`python
# String "Hello" vs bytes b"Hello"
string_hash = hashlib.md5("Hello".encode())
bytes_hash = hashlib.md5(b"Hello")
print(string_hash.hexdigest() == bytes_hash.hexdigest())  # True - same result

# But different content types
text_hash = hashlib.md5("Hello\n")
binary_hash = hashlib.md5(b"Hello\n")
print(text_hash.hexdigest() == binary_hash.hexdigest())  # True - same

# Hashing with vs without newline
hash_with_newline = hashlib.md5(b"Hello\n")
hash_without_newline = hashlib.md5(b"Hello")
print(hash_with_newline.hexdigest() != hash_without_newline.hexdigest())  # True - different!
\`\`\`

### 3. Case Sensitivity

**Problem:** Case-sensitive hashing

\`\`\`python
hash1 = hashlib.md5(b"hello")
hash2 = hashlib.md5(b"HELLO")
hash3 = hashlib.md5(b"Hello")
print(hash1.hexdigest() != hash2.hexdigest())  # True - different hashes!
print(hash1.hexdigest() != hash3.hexdigest())  # True - different hashes!

# This can be a security issue
password1 = "Password123"
password2 = "PASSWORD123"
if hash1 == hash2:  # Comparing hashes
    print("Same password")  # Never true with MD5
\`\`\`

### 4. Streaming vs Full Read

**Problem:** Inconsistent results if not careful

\`\`\`python
# ❌ Wrong - different chunk sizes can cause issues with some operations
def bad_streaming_hash(filename):
    hash_md5 = hashlib.md5()
    with open(filename, 'rb') as f:
        while True:
            chunk = f.read(1024)  # Fixed size
            if not chunk:
                break
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

# ✅ Correct - streaming preserves order
def good_streaming_hash(filename):
    hash_md5 = hashlib.md5()
    with open(filename, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

# ✅ Correct - same as full file hash
def verify_streaming(filename, expected_hash):
    return good_streaming_hash(filename) == expected_hash
\`\`\`

## Tools and Resources

Use our **MD5 Hash Generator** tool to quickly generate MD5 hashes online. Remember to use stronger algorithms like SHA-256 for security-critical applications.

### Recommended Tools:

| Tool | Purpose | URL |
|------|---------|-----|
| **Online Hash Generators** | Quick MD5 calculation | Various online tools |
| **Hash Calculators** | Built into most operating systems | md5sum, certutil |
| **Cryptographic Libraries** | Built-in support in most languages | crypto, hashlib |
| **File Verification Tools** | For integrity checking | Checksum utilities |
| **Rainbow Table Databases** | Research collision attacks | Online security research |

### Security Testing Tools:

\`\`\`bash
# Generate test hashes
echo -n "Hello World" | md5sum
# b10a8db164e0754105b7a99be72e3fe5

# Verify file integrity
md5sum file1.txt file2.txt
md5sum -c checksums.md5

# Check for known weak hashes
# Use tools like Hashcat for password cracking (authorized testing only)
\`\`\`

## Conclusion

While MD5 is no longer suitable for security applications due to collision vulnerabilities, it remains useful for:

| ✅ Appropriate Use Cases | Description |
|------------------------|-------------|
| **Data integrity verification** | Basic corruption detection |
| **File deduplication** | Identifying duplicate files |
| **Non-critical checksums** | Where security isn't a concern |
| **Cache keys** | Internal caching systems |
| **Version tracking** | File change detection |

### Key Takeaways:

- ✅ **Never use for passwords** or security-critical applications
- ✅ **Use for file integrity** and basic checksums only
- ✅ **Choose SHA-256** for general-purpose hashing
- ✅ **Always validate** input encoding consistency
- ✅ **Stay updated** with cryptographic recommendations
- ⚠️ **MD5 is broken** - collisions can be found in seconds
- ⚠️ **Use bcrypt/Argon2** for password storage

### Quick Reference:

\`\`\`
MD5 Specifications:
- Output: 128 bits (32 hexadecimal characters)
- Block size: 512 bits (64 bytes)
- Rounds: 64 (4 rounds × 16 operations)
- Speed: Very fast (not suitable for passwords)

Security Status: ❌ NOT SECURE
Collision Resistance: ❌ Broken
Pre-image Resistance: ⚠️ Weakened

Safe Alternatives:
- Password hashing: bcrypt, Argon2, scrypt
- General hashing: SHA-256, SHA-3, BLAKE2
\`\`\`

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
