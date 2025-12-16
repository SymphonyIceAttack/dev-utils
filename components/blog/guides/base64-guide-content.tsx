"use client";

import { motion } from "framer-motion";
import { Streamdown } from "streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { Base64GuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

export function Base64GuideContent() {
  // Enhanced markdown content with better structure and examples
  const content = `# Master Base64 Encoding: From Basics to Advanced

Base64 encoding is a fundamental technique for representing binary data in ASCII text format. This comprehensive guide covers everything from basic concepts to advanced practical applications, helping you master this essential encoding scheme.

## What is Base64 Encoding?

Base64 is a **binary-to-text encoding scheme** that represents binary data in an ASCII string format. It's commonly used when there's a need to transmit binary data over systems that can only reliably handle text, such as email or HTTP protocols.

### How It Works

Base64 groups binary data into 6-bit chunks and maps each chunk to a specific character from a 64-character alphabet:

**Base64 Alphabet:**
- **0-25**: A-Z (uppercase letters)
- **26-51**: a-z (lowercase letters)  
- **52-61**: 0-9 (digits)
- **62**: + (plus sign)
- **63**: / (forward slash)

**Padding:** The = character is used to pad the end when data isn't divisible by 3 bytes.

## Why Use Base64?

This encoding scheme is essential for several critical use cases:

1. **📧 Email Transmission** - Email systems traditionally only support text content
2. **🌐 API Data Transfer** - APIs often need to send binary data as text
3. **💾 Data Storage** - Some databases handle text better than binary
4. **🔄 Cross-Platform Compatibility** - Ensures data consistency across different systems

## Common Use Cases

### Email Attachments
Email systems use Base64 to encode binary attachments safely for email transmission.

### Data URLs
Embed images directly in HTML/CSS using Base64 data URLs.

### API Authentication
Basic authentication headers in APIs use Base64 encoding.

## Base64 in Different Languages

### JavaScript
Basic encoding and decoding operations:

\`\`\`javascript
// Encode
const encoded = btoa('Hello World');
console.log(encoded); // "SGVsbG8gV29ybGQ="

// Decode  
const decoded = atob('SGVsbG8gV29ybGQ=');
console.log(decoded); // "Hello World"

// Handle Unicode
const unicodeText = 'Hello 世界';
const encodedUnicode = btoa(unescape(encodeURIComponent(unicodeText)));
const decodedUnicode = decodeURIComponent(escape(atob(encodedUnicode)));
\`\`\`

### Python
Python Base64 operations:

\`\`\`python
import base64

# Encode
text = 'Hello World'
encoded = base64.b64encode(text.encode()).decode()
print(encoded)  # "SGVsbG8gV29ybGQ="

# Decode
decoded = base64.b64decode(encoded).decode()
print(decoded)  # "Hello World"

# With file
with open('image.jpg', 'rb') as f:
    image_data = f.read()
    encoded_image = base64.b64encode(image_data).decode()
\`\`\`

### Node.js
Node.js Buffer encoding:

\`\`\`javascript
const fs = require('fs');

// Buffer encoding
const buffer = Buffer.from('Hello World', 'utf8');
const encoded = buffer.toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf8');

// File encoding
const imageBuffer = fs.readFileSync('image.jpg');
const encodedImage = imageBuffer.toString('base64');
\`\`\`

### Java
Java Base64 utilities:

\`\`\`java
import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        // Encode
        String original = "Hello World";
        String encoded = Base64.getEncoder().encodeToString(original.getBytes());
        System.out.println(encoded); // "SGVsbG8gV29ybGQ="
        
        // Decode
        byte[] decodedBytes = Base64.getDecoder().decode(encoded);
        String decoded = new String(decodedBytes);
        System.out.println(decoded); // "Hello World"
        
        // URL-safe encoding
        String urlSafe = Base64.getUrlEncoder().withoutPadding().encodeToString(original.getBytes());
    }
}
\`\`\`

## Best Practices

When working with Base64 encoding, follow these essential guidelines:

1. **✅ Use for appropriate data types** - Text, small images, files
2. **! Consider file size implications** - Base64 increases size by ~33%
3. **🛡 Handle errors properly** - Validate input and handle encoding failures
4. **🌐 Use URL-safe variant** - For web applications, prefer base64url
5. **💾 Memory management** - Be careful with large binary files
6. **🔒 Don't confuse with encryption** - Base64 is encoding, not encryption

## Security Considerations

Understanding Base64's security implications is crucial:

- **❌ Not encryption** - Base64 is encoding, not encryption
- **🔓 Completely reversible** - Anyone can decode Base64 data
- **🔐 Always use HTTPS** - Transmit over secure connections
- **✅ Validate input** - Prevent malicious data injection
- **🚫 No built-in security** - Additional security layers required

## URL-Safe Base64

For web applications and URLs, use the URL-safe variant which replaces problematic characters:

**Standard Base64:** \`SGVsbG8gV29ybGQ=\`
**URL-Safe Base64:** \`SGVsbG8gV29ybGQ-\`

**Changes:**
- \`+\` becomes \`-\`
- \`/\` becomes \`_\`
- Padding \`=\` may be removed or replaced

\`\`\`javascript
// JavaScript URL-safe encoding
const urlSafe = btoa('Hello World').replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=/g, '');
\`\`\`

## Performance Considerations

### Memory Usage
- Base64 encoding increases data size by approximately 33%
- Large files can consume significant memory during encoding/decoding
- Consider streaming for very large files

### Speed Optimization
Optimized encoding for large data files:

\`\`\`javascript
// Optimized encoding for large data
async function encodeLargeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
\`\`\`

## Common Pitfalls

### Unicode Handling
Proper Unicode handling in Base64:

\`\`\`javascript
// ❌ Wrong - breaks with Unicode
const broken = btoa('Hello 世界');

// ✅ Correct - handles Unicode
const correct = btoa(unescape(encodeURIComponent('Hello 世界')));
const decoded = decodeURIComponent(escape(atob(correct)));
\`\`\`

### Padding Issues
Properly handle Base64 padding:

\`\`\`python
# Always handle padding correctly
encoded = base64.b64encode(b'Hello').decode()  # "SGVsbG8="
encoded_no_padding = encoded.rstrip('=')  # Remove padding for URLs
\`\`\`

## Tools and Resources

Use our **Base64 Encoder/Decoder** tool to quickly encode and decode Base64 data online. It supports both standard and URL-safe variants with real-time processing.

## Conclusion

Base64 encoding is an essential tool for web developers and system administrators. Understanding when and how to use it properly will help you build more robust applications that can handle binary data safely across different platforms and protocols.

### Key Takeaways:
- Base64 is **encoding**, not encryption
- Increases data size by ~33%
- Essential for email, APIs, and data storage
- Use URL-safe variant for web applications
- Always validate input and handle errors

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
    <>
      <Base64GuideStructuredData />
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
                        id={
                          id || "learn-base64-encoding-from-basics-to-advanced"
                        }
                        className="text-4xl font-bold text-gray-900 dark:text-gray-100 border-b-4 border-blue-500 pb-4 mb-8"
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
                    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 dark:bg-blue-950/50 rounded-r-lg">
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
