"use client";

import { motion } from "framer-motion";
import { Streamdown } from "streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { UuidGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

export function UuidGuideContent() {
  // Comprehensive UUID guide content
  const content = `# UUID Generation: A Developer's Complete Guide

UUIDs (Universally Unique Identifiers) are 128-bit identifiers that guarantee uniqueness across both time and space. This comprehensive guide covers UUID versions, generation methods, and best practices for modern applications.

## What is a UUID?

A UUID is a 128-bit identifier represented as a 36-character string (32 hexadecimal digits plus 4 hyphens). The probability of generating duplicate UUIDs is so low that it's considered practically impossible for most applications.

### Format:
\`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\`

### Example:
**Version 4:** \`123e4567-e89b-12d3-a456-426614174000\`

### Key Properties:
- **128-bit identifier**: Provides 340 undecillion possible values
- **Globally unique**: Extremely low collision probability
- **No central authority needed**: Decentralized generation
- **Standardized format**: RFC 4122 specification

## UUID Versions

### UUID v1 (Time-based)
**Based on timestamp and MAC address:**

**Characteristics:**
- **Sortable**: Lexicographically sortable by creation time
- **Predictable**: Based on timestamps
- **Privacy concern**: Reveals MAC address
- **Legacy support**: Still used in some systems

### UUID v4 (Random)
**Uses random or pseudo-random numbers:**

**Characteristics:**
- **Most popular**: Widely used in modern applications
- **Random**: No predictable patterns
- **Privacy-friendly**: No identifiable information
- **Standard recommendation**: Preferred for most use cases

### UUID v7 (Time-ordered)
**Newest standard combining time and randomness:**

**Characteristics:**
- **Sortable**: Lexicographically sortable like v1
- **Privacy-safe**: No MAC address exposure
- **Future-proof**: Designed for modern applications
- **Best of both worlds**: Time-based + random

## UUID in Different Programming Languages

### JavaScript
\`\`\`javascript
// Native browser support (UUID v4)
function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Node.js crypto module (UUID v4)
const crypto = require('crypto');
function generateUUIDv4Node() {
  return crypto.randomUUID();
}
\`\`\`

### Python
\`\`\`python
import uuid

# UUID v4 (random) - most common
uuid_v4 = uuid.uuid4()
print(uuid_v4)  # UUID('123e4567-e89b-12d3-a456-426614174000')

# UUID v1 (time-based)
uuid_v1 = uuid.uuid1()
print(uuid_v1)  # UUID('123e4567-e89b-12d3-a456-426614174000')
\`\`\`

## Common Use Cases

### Database Primary Keys
**Advantages over auto-increment:**

\`\`\`sql
-- Traditional auto-increment (vulnerable)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- UUID-based (more secure)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(100)
);
\`\`\`

**Benefits:**
- **Security**: No predictable ID enumeration
- **Merging**: Easy to merge data from different sources
- **Scalability**: No central sequence number coordination needed
- **Privacy**: Users can't guess other users' IDs

### Session Management
**Session identifiers:**

\`\`\`javascript
// Express.js session example
const express = require('express');
const crypto = require('crypto');

app.use(session({
    secret: 'your-secret-key',
    genid: function(req) {
        return crypto.randomUUID(); // Use UUID for session IDs
    }
}));
\`\`\`

## Best Practices

### 1. Choose the Right Version
**Use cases for each version:**

\`\`\`javascript
// Use v4 for most applications
const uuidV4 = crypto.randomUUID();

// Use v7 for modern time-ordered IDs
const uuidV7 = uuid.v7();
\`\`\`

### 2. Database Considerations
**Indexing and performance:**

\`\`\`sql
-- Good: Use UUID as primary key with proper indexing
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Performance Considerations

### Database Performance
**UUID v7 vs v1 vs v4:**

\`\`\`sql
-- v7 and v1 are naturally sortable
SELECT * FROM orders ORDER BY id; -- Efficient for v7 and v1
\`\`\`

### Storage Size Impact
**Storage comparison:**

| Format | Size | Use Case |
|--------|------|----------|
| VARCHAR(36) | 36 bytes | Human-readable |
| BINARY(16) | 16 bytes | Most efficient |

## Common Pitfalls

### 1. Using Wrong Version
**Problem:** Choosing v1 for privacy-sensitive applications

\`\`\`javascript
// ❌ Wrong - v1 reveals MAC address
const uuidV1 = uuid.v1(); // Can reveal system information

// ✅ Correct - use v4 for privacy
const uuidV4 = uuid.v4(); // Random, privacy-friendly
\`\`\`

### 2. Storage Inefficiency
**Problem:** Storing UUIDs as strings when binary would be more efficient

\`\`\`python
# ❌ Inefficient - 36 character string
user_id = "123e4567-e89b-12d3-a456-426614174000"

# ✅ Efficient - 16 byte binary
user_id_bytes = uuid.uuid4().bytes
\`\`\`

## Migration Strategies

### From Auto-increment to UUID
**Gradual migration approach:**

\`\`\`sql
-- Step 1: Add UUID column
ALTER TABLE users ADD COLUMN uuid_id UUID;

-- Step 2: Generate UUIDs for existing records
UPDATE users SET uuid_id = gen_random_uuid() WHERE uuid_id IS NULL;

-- Step 3: Make UUID the primary key
ALTER TABLE users DROP PRIMARY KEY;
ALTER TABLE users ADD PRIMARY KEY (uuid_id);
\`\`\`

## Tools and Resources

Use our **UUID Generator** tool to quickly generate UUIDs of different versions online. The tool supports v1, v4, and v7 generation with validation and formatting options.

### Recommended Tools:
- **UUID Generators**: Online UUID creation tools
- **Database Extensions**: PostgreSQL UUID support, MySQL UUID functions
- **Libraries**: uuid.js (JavaScript), python-uuid (Python), java.util.UUID (Java)
- **Validators**: UUID format and version validation tools

## Conclusion

UUIDs provide a robust solution for generating unique identifiers across distributed systems. Modern UUID v7 combines the benefits of time-based ordering with privacy protection, making it ideal for most new applications.

### Key Takeaways:
- **Use UUID v4** for general-purpose unique identifiers
- **Use UUID v7** for time-ordered, sortable identifiers
- **Store as BINARY(16)** for database efficiency
- **Index properly** for good query performance

---

*This guide covers UUID fundamentals and modern best practices. For legacy systems and specific requirements, always consider the trade-offs of different UUID versions.*`;

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
                        id={id || "learn-uuid-generation-a-developers-guide"}
                        className="text-4xl font-bold text-gray-900 dark:text-gray-100 border-b-4 border-purple-500 pb-4 mb-8"
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
                    <blockquote className="border-l-4 border-purple-500 pl-6 py-2 my-6 bg-purple-50 dark:bg-purple-950/50 rounded-r-lg">
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
