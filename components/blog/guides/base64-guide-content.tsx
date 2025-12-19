"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Master Base64 Encoding: From Basics to Advanced",
  description:
    "Base64 encoding is a fundamental technique for representing binary data in ASCII text format. This comprehensive guide covers everything from basic concepts to advanced practical applications.",
  author: "Dev Team",
  date: "2024-12-14",
  readTime: "9 min",
  tags: ["Base64", "Guide", "Encoding"],
  image: "/base64-guide-pixel.jpeg",
  featured: true,
};

export function Base64GuideContent() {
  // Enhanced markdown content with better structure and examples
  const content = `# Master Base64 Encoding: From Basics to Advanced

Base64 encoding is a fundamental technique for representing binary data in ASCII text format. This comprehensive guide covers everything from basic concepts to advanced practical applications, helping you master this essential encoding scheme.

## What is Base64 Encoding?

Base64 is a **binary-to-text encoding scheme** that represents binary data in an ASCII string format. It's commonly used when there's a need to transmit binary data over systems that can only reliably handle text, such as email or HTTP protocols.

### The Core Problem

Early internet protocols were designed primarily for text-based communication. When developers needed to send binary data (images, files, encrypted data) through these text-only channels, they faced compatibility issues. Base64 solved this by encoding binary data into a format that looks like readable text.

### How It Works

Base64 groups binary data into 6-bit chunks and maps each chunk to a specific character from a 64-character alphabet:

|**Base64 Alphabet:**|
|-|
| **0-25**: A-Z (uppercase letters, 26 characters) |
| **26-51**: a-z (lowercase letters, 26 characters) |
| **52-61**: 0-9 (digits, 10 characters) |
| **62**: + (plus sign) |
| **63**: / (forward slash) |

|**Padding:**|
|-|
| The \`=\` character is used to pad the end when data isn't divisible by 3 bytes. |

### Encoding Process

\`\`\`
Input: "Man" (3 bytes = 24 bits)
       M    a    n
       01001101 01100001 01101110

Split into 6-bit groups:
       010011 010110 000101 101110
       19     22     5      46

Base64 characters:
       T     W     F      u
Output: "TWFu"
\`\`\`

## Why Use Base64?

This encoding scheme is essential for several critical use cases:

| Use Case | Description | Example |
|----------|-------------|---------|
| **📧 Email Transmission** | Email systems traditionally only support text content | Encoding email attachments |
| **🌐 API Data Transfer** | APIs often need to send binary data as text | Sending images in JSON payloads |
| **💾 Data Storage** | Some databases handle text better than binary | Storing small images in databases |
| **🔄 Cross-Platform Compatibility** | Ensures data consistency across different systems | Data exchange between services |
| **🔐 Cryptography** | Encoding encrypted data for transmission | JWT tokens, API keys |

### Real-World Statistics

\`\`\`
Base64 Size Increase Calculation:
- Original binary: N bytes
- Base64 encoded: ⌈(N × 4) / 3⌉ bytes
- Size increase: ~33%

Example:
- 1 KB image → ~1.33 KB Base64
- 100 KB file → ~133 KB Base64
- 1 MB file → ~1.33 MB Base64
\`\`\`

## Common Use Cases

### Email Attachments

Email systems use Base64 to encode binary attachments safely for email transmission. This is defined in MIME (Multipurpose Internet Mail Extensions) standards.

\`\`\`
Content-Type: image/png
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="photo.png"

iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==
\`\`\`

### Data URLs

Embed images directly in HTML/CSS using Base64 data URLs:

\`\`\`html
<!-- Inline image in HTML -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="Embedded Image">

<!-- Background image in CSS -->
.div {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0icmVkIi8+PC9zdmc+');
}
\`\`\`

### API Authentication

Basic authentication headers in APIs use Base64 encoding:

\`\`\`javascript
// Creating Basic Auth header
const username = "api_user";
const password = "secret_password";
const credentials = btoa(username + ":" + password);

const headers = {
  'Authorization': 'Basic ' + credentials
};
\`\`\`

### JSON API Responses

Many APIs embed small binary data directly in JSON responses:

\`\`\`json
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "avatar": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
  },
  "status": "success"
}
\`\`\`

## Base64 in Different Languages

### JavaScript

Basic encoding and decoding operations:

\`\`\`javascript
// Basic encoding and decoding
const encoded = btoa('Hello World');
console.log(encoded); // "SGVsbG8gV29ybGQ="

const decoded = atob('SGVsbG8gV29ybGQ=');
console.log(decoded); // "Hello World"

// Handle Unicode characters properly
function base64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode('0x' + p1)));
}

function base64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str),
    (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

// Modern approach using TextEncoder/TextDecoder (Node.js 11+)
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const text = 'Hello 世界';
const encoded = btoa(String.fromCharCode(...encoder.encode(text)));
const decoded = decoder.decode(new Uint8Array([...atob(encoded)].map(c => c.charCodeAt(0))));
\`\`\`

### Python

Python Base64 operations:

\`\`\`python
import base64

# Basic encoding and decoding
text = 'Hello World'
encoded = base64.b64encode(text.encode('utf-8')).decode('ascii')
print(encoded)  # "SGVsbG8gV29ybGQ="

decoded = base64.b64decode(encoded).decode('utf-8')
print(decoded)  # "Hello World"

# File encoding
with open('image.jpg', 'rb') as f:
    image_data = f.read()
    encoded_image = base64.b64encode(image_data).decode('ascii')

# Save to file
with open('image_base64.txt', 'w') as f:
    f.write(encoded_image)

# URL-safe Base64 encoding
url_safe = base64.urlsafe_b64encode(b'Hello World').decode('ascii')
print(url_safe)  # "SGVsbG8gV29ybGQ-"

# Custom alphabet (rarely needed)
CUSTOM_ALPHABET = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
custom_encoded = base64.b64encode(b'Hello', altchars=CUSTOM_ALPHABET)
\`\`\`

### Node.js

Node.js Buffer encoding:

\`\`\`javascript
const fs = require('fs');
const path = require('path');

// Buffer encoding
const buffer = Buffer.from('Hello World', 'utf8');
const encoded = buffer.toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf8');

// File encoding with streaming for large files
async function encodeFileToBase64(filePath) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const readStream = fs.createReadStream(filePath);

    readStream.on('data', (chunk) => chunks.push(chunk));
    readStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer.toString('base64'));
    });
    readStream.on('error', reject);
  });
}

// Async/await version
async function encodeLargeFile(filePath) {
  const buffer = await fs.promises.readFile(filePath);
  return buffer.toString('base64');
}

// URL-safe Base64
const urlSafeBuffer = Buffer.from('Hello+World/Test');
const urlSafe = urlSafeBuffer.toString('base64').replace(/\+/g, '-').replace(//g, '_');
\`\`\`

### Java

Java Base64 utilities:

\`\`\`java
import java.util.Base64;
import java.io.*;

public class Base64Example {
    public static void main(String[] args) {
        String original = "Hello World";

        // Basic encoding
        String encoded = Base64.getEncoder().encodeToString(original.getBytes());
        System.out.println(encoded); // "SGVsbG8gV29ybGQ="

        // Basic decoding
        byte[] decodedBytes = Base64.getDecoder().decode(encoded);
        String decoded = new String(decodedBytes);
        System.out.println(decoded); // "Hello World"

        // URL-safe encoding (without padding)
        String urlSafe = Base64.getUrlEncoder().withoutPadding().encodeToString(original.getBytes());
        System.out.println(urlSafe); // "SGVsbG8gV29ybGQ-"

        // MIME encoding (for email)
        Base64.Encoder mimeEncoder = Base64.getMimeEncoder();
        String mimeEncoded = mimeEncoder.encodeToString(original.getBytes());
        System.out.println(mimeEncoded);

        // File encoding
        try (InputStream inputStream = new FileInputStream("document.pdf")) {
            byte[] fileData = inputStream.readAllBytes();
            String encodedFile = Base64.getEncoder().encodeToString(fileData);
            System.out.println("File encoded successfully");
        } catch (IOException e) {
            System.err.println("Error encoding file: " + e.getMessage());
        }
    }
}
\`\`\`

### Go

Go language Base64 operations:

\`\`\`go
package main

import (
    "encoding/base64"
    "fmt"
    "io/ioutil"
)

func main() {
    original := "Hello World"

    // Basic encoding
    encoded := base64.StdEncoding.EncodeToString([]byte(original))
    fmt.Println(encoded) // "SGVsbG8gV29ybGQ="

    // URL-safe encoding
    urlSafe := base64.URLEncoding.EncodeToString([]byte(original))
    fmt.Println(urlSafe) // "SGVsbG8gV29ybGQ-"

    // Raw URL-safe (no padding)
    rawUrlSafe := base64.RawURLEncoding.EncodeToString([]byte(original))
    fmt.Println(rawUrlSafe) // "SGVsbG8gV29ybGQ-"

    // Decoding
    decoded, err := base64.StdEncoding.DecodeString(encoded)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(decoded)) // "Hello World"

    // File encoding
    data, err := ioutil.ReadFile("image.png")
    if err != nil {
        panic(err)
    }
    encodedFile := base64.StdEncoding.EncodeToString(data)

    // Writing to file
    err = ioutil.WriteFile("image_base64.txt", []byte(encodedFile), 0644)
    if err != nil {
        panic(err)
    }
}
\`\`\`

## Best Practices

When working with Base64 encoding, follow these essential guidelines:

### ✅ Do This

\`\`\`javascript
// Use for appropriate data types
const base64Data = base64Encode(imageData);

// Validate input before encoding
function safeBase64Encode(data) {
  if (!data) {
    throw new Error('Input data is required');
  }
  return Buffer.from(data).toString('base64');
}

// Handle errors gracefully
try {
  const result = base64Encode(data);
  console.log('Encoding successful');
} catch (error) {
  console.error('Encoding failed:', error.message);
}

// Use URL-safe variant for web applications
const urlSafeBase64 = base64UrlEncode(data).replace(/=/g, '');
\`\`\`

### ❌ Don't Do This

\`\`\`javascript
// Don't encode entire URLs
const badUrl = encodeURIComponent('https://example.com/path?param=value');
// Instead, encode only the parameters that need it
const goodUrl = 'https://example.com/path?data=' + encodeURIComponent(base64Data);

// Don't use for large files in HTML (impacts page load)
const largeBase64 = fs.readFileSync('large_image.png').toString('base64');
document.body.innerHTML = '<img src="data:image/png;base64,' + largeBase64 + '">';
// Instead, use regular image tags or lazy loading

// Don't confuse with encryption (Base64 is not encryption)
const secret = base64Encode('my_password'); // NOT secure!
// Use proper encryption like bcrypt, AES, etc.
\`\`\`

## Security Considerations

Understanding Base64's security implications is crucial:

| Security Aspect | Recommendation |
|-----------------|----------------|
| **❌ Not encryption** | Base64 is encoding, not encryption - anyone can decode it |
| **🔓 Completely reversible** | Base64 data can be trivially decoded |
| **🔐 Always use HTTPS** | Transmit Base64-encoded data over secure connections |
| **✅ Validate input** | Prevent malicious data injection |
| **🚫 No built-in security** | Add authentication, encryption separately |
| **⚠️ Size overhead** | ~33% size increase affects bandwidth |

### Common Security Mistakes

\`\`\`javascript
// ❌ WRONG: Storing passwords in Base64
const password = base64Encode(userPassword); // Easily decodable!

// ❌ WRONG: Sensitive data in Base64
const apiKey = base64Encode('secret_api_key_12345'); // Not secure!

// ✅ CORRECT: Use proper encryption
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(userPassword, 10);

// ✅ CORRECT: Use environment variables
const apiKey = process.env.SECRET_API_KEY; // Stored securely
\`\`\`

## URL-Safe Base64

For web applications and URLs, use the URL-safe variant which replaces problematic characters:

|**Character Replacement:**|
|-|
| Standard Base64: \`SGVsbG8gV29ybGQ=\` |
| URL-Safe Base64: \`SGVsbG8gV29ybGQ-\` |

|**Changes:**|
|-|
| \`+\` becomes \`-\` |
| \`/\` becomes \`_\` |
| Padding \`=\` may be removed or replaced |

### URL-Safe Base64 in Different Languages

\`\`\`javascript
// JavaScript URL-safe encoding
function urlSafeEncode(str) {
  return btoa(str).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=/g, '');
}

// Python URL-safe encoding
import base64
url_safe = base64.urlsafe_b64encode(b'Hello World').decode().rstrip('=')
\`\`\`

### When to Use URL-Safe Base64

- ✅ API tokens and JWTs
- ✅ URL parameters
- ✅ Cookie values
- ✅ WebSocket messages
- ❌ Email attachments (use standard Base64)
- ❌ File storage (use standard Base64)

## Performance Considerations

### Memory Usage

Base64 encoding increases data size by approximately 33%. Consider these factors:

\`\`\`
Memory Impact Calculation:
- 1 KB binary → 1.33 KB Base64
- 10 KB binary → 13.3 KB Base64
- 100 KB binary → 133 KB Base64
- 1 MB binary → 1.33 MB Base64

Large files can consume significant memory during encoding/decoding:
- Consider streaming for files > 10 MB
- Use chunked processing for very large files
- Monitor memory usage in production environments
\`\`\`

### Speed Optimization

Optimized encoding for large data files:

\`\`\`javascript
// Streaming Base64 encoding for large files
async function encodeLargeFileStreaming(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const chunkSize = 1024 * 1024; // 1 MB chunks
    let offset = 0;
    const chunks = [];

    reader.onload = (e) => {
      const chunk = e.target.result;
      chunks.push(chunk.toString('base64'));
      offset += chunkSize;

      if (offset < file.size) {
        readNextChunk();
      } else {
        resolve(chunks.join(''));
      }
    };

    reader.onerror = reject;

    function readNextChunk() {
      const slice = file.slice(offset, offset + chunkSize);
      reader.readAsArrayBuffer(slice);
    }

    readNextChunk();
  });
}

// Optimized chunk-based encoding
function encodeInChunks(data, chunkSize = 32768) {
  const result = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    result.push(Buffer.from(chunk).toString('base64'));
  }
  return result.join('');
}
\`\`\`

### Performance Comparison

\`\`\`python
import base64
import time

def benchmark_base64():
    data = b'Hello World' * 10000

    # Standard Base64
    start = time.time()
    for _ in range(1000):
        encoded = base64.b64encode(data)
    std_time = time.time() - start

    # URL-safe Base64
    start = time.time()
    for _ in range(1000):
        encoded = base64.urlsafe_b64encode(data)
    url_time = time.time() - start

    print(f"Standard Base64: {std_time:.4f}s")
    print(f"URL-safe Base64: {url_time:.4f}s")
    print(f"Difference: {(url_time/std_time - 1) * 100:.2f}%")
\`\`\`

## Common Pitfalls

### Unicode Handling

Proper Unicode handling in Base64:

\`\`\`javascript
// ❌ Wrong - breaks with Unicode
const broken = btoa('Hello 世界');
// Throws: InvalidCharacterError: String contains an invalid character

// ✅ Correct - handles Unicode
function base64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode('0x' + p1)));
}

function base64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str),
    (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

// Modern browser/Node.js solution
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function modernBase64Encode(str) {
  const bytes = encoder.encode(str);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}

function modernBase64Decode(str) {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return decoder.decode(bytes);
}
\`\`\`

### Padding Issues

Properly handle Base64 padding:

\`\`\`python
# Understanding Base64 padding
import base64

# When input length is divisible by 3, no padding needed
encoded = base64.b64encode(b'Hello')  # "SGVsbG8=" (1 padding char)
encoded = base64.b64encode(b'HelloW')  # "SGVsbG9X" (no padding)
encoded = base64.b64encode(b'HelloWo')  # "SGVsbG9Xbz0=" (2 padding chars)

# Remove padding for URLs
def base64url_encode(data):
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('ascii')

# Add padding back for decoding
def base64url_decode(data):
    pad = 4 - len(data) % 4
    if pad != 4:
        data += '=' * pad
    return base64.urlsafe_b64decode(data)
\`\`\`

### Data Corruption

Avoid these common data corruption issues:

\`\`\`javascript
// ❌ Wrong - Line breaks in Base64
const broken = \`SGVsbG8gV29ybGQ=
              SGVsbG8gV29ybGQ=\`; // Multiple lines!

// ✅ Correct - Single line Base64
const correct = 'SGVsbG8gV29ybGQ=';

// ❌ Wrong - Wrong encoding specified
const wrongEncoding = Buffer.from('Hello 世界', 'ascii').toString('base64'); // Loses data

// ✅ Correct - Use UTF-8
const correctEncoding = Buffer.from('Hello 世界', 'utf8').toString('base64');
\`\`\`

## Tools and Resources

Use our **Base64 Encoder/Decoder** tool to quickly encode and decode Base64 data online. It supports both standard and URL-safe variants with real-time processing.

### Online Tools
- **Base64 Encoder/Decoder**: Quick Base64 conversion
- **URL-Safe Base64 Generator**: For web applications
- **Base64 Image Converter**: Convert images to Base64
- **Base64 File Converter**: Convert files to Base64

### Validation and Testing
- **Base64 Validator**: Check if string is valid Base64
- **Base64 Decoder**: Decode Base64 to view original data
- **Base64 Size Calculator**: Estimate encoded size

## Conclusion

Base64 encoding is an essential tool for web developers and system administrators. Understanding when and how to use it properly will help you build more robust applications that can handle binary data safely across different platforms and protocols.

### Key Takeaways:
- ✅ Base64 is **encoding**, not encryption
- ✅ Increases data size by ~33%
- ✅ Essential for email, APIs, and data storage
- ✅ Use URL-safe variant for web applications
- ✅ Always validate input and handle errors
- ⚠️ Avoid for large inline data in HTML
- ⚠️ Never use for sensitive information

### Quick Reference:

\`\`\`
Base64 Character Set:
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/

URL-Safe Variant:
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_

Padding Character: =

Size Formula: ⌈(N × 4) / 3⌉ bytes (where N is original size)
\`\`\`

---

*This guide covers Base64 fundamentals. For advanced use cases and performance optimization, consider the specific requirements of your application.*`;

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
  );
}
