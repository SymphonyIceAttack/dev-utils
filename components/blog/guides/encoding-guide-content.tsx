"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { EncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Character Encoding Guide: UTF-8, GBK & Beyond",
  description:
    "Character encoding is fundamental to how computers represent and process text. Understanding different encoding systems will help you handle international text, fix encoding issues, and build globally compatible applications.",
  author: "Dev Team",
  date: "2024-12-10",
  readTime: "11 min",
  tags: ["Encoding", "Guide", "Unicode"],
  image: "/encoding-guide-pixel.jpeg",
  featured: false,
};

export function EncodingGuideContent() {
  // Character encoding guide content in markdown format
  const content = `# Character Encoding Guide: UTF-8, GBK & Beyond

Character encoding is fundamental to how computers represent and process text. Understanding different encoding systems will help you handle international text, fix encoding issues, and build globally compatible applications.

## What is Character Encoding?

Character encoding is a system that assigns numerical values to characters, allowing computers to represent and manipulate text. Different encoding systems support different character sets and have varying capabilities for international text.

### Why Encoding Matters
- **International text:** Support for languages beyond English
- **Data exchange:** Consistent text representation across systems
- **Web applications:** Proper display of user content
- **File handling:** Correct reading and writing of text files

## Common Character Encodings

### UTF-8 (Unicode Transformation Format - 8-bit)
- **Universal support:** Represents all Unicode characters
- **Variable width:** 1-4 bytes per character
- **ASCII compatible:** Backward compatible with ASCII
- **Web standard:** Default encoding for the web
- **Efficient:** Space-efficient for Latin text

### UTF-16 (Unicode Transformation Format - 16-bit)
- **Fixed or variable:** 2 or 4 bytes per character
- **BOM:** Often includes Byte Order Mark

### GBK (Chinese Character Set)
- **Chinese support:** Simplified Chinese characters
- **Backward compatible:** Extends GB2312
- **Legacy:** Being replaced by UTF-8
- **Regional:** Primarily used in China

## Encoding Conversion Examples

### The Same Text in Different Encodings
\`\`\`
Text: "Hello 世界"

UTF-8:        48 65 6C 6C 6F 20 E4 B8 96 E7 95 8C
UTF-16:       00 48 00 65 00 6C 00 6C 00 6F 00 20 4E 16 75 4C
GBK:          48 65 6C 6C 6F 20 CA C0 BD E7
ASCII only:   48 65 6C 6C 6F 20 (World lost)
\`\`\`

## Handling Encoding in Different Languages

### JavaScript
\`\`\`javascript
// UTF-8 is default in modern JavaScript
const text = "Hello 世界";
const bytes = new TextEncoder().encode(text);
const decoded = new TextDecoder().decode(bytes);

// Convert between encodings (Node.js)
const iconv = require('iconv-lite');
const gbkBuffer = iconv.encode("Hello 世界", 'gbk');
const gbkText = iconv.decode(gbkBuffer, 'gbk');
\`\`\`

### Python
\`\`\`python
# UTF-8 is default in Python 3
text = "Hello 世界"
utf8_bytes = text.encode('utf-8')
decoded = utf8_bytes.decode('utf-8')

# Convert to GBK
gbk_bytes = text.encode('gbk', errors='ignore')
gbk_text = gbk_bytes.decode('gbk')
\`\`\`

### Java
\`\`\`java
import java.nio.charset.StandardCharsets;

String text = "Hello 世界";
byte[] utf8Bytes = text.getBytes(StandardCharsets.UTF_8);
byte[] gbkBytes = text.getBytes("GBK");

String decoded = new String(utf8Bytes, StandardCharsets.UTF_8);
\`\`\`

## Common Encoding Problems and Solutions

### Problem: Garbled Text
**Cause:** Text encoded in one encoding, decoded in another

**Example:** UTF-8 text decoded as ISO-8859-1

**Solution:** Detect encoding and convert properly

### Problem: Missing Characters
**Cause:** Encoding doesn't support certain characters

**Example:** Chinese characters in ASCII

**Solution:** Use UTF-8 for international text

### Problem: File Corruption
**Cause:** Wrong encoding specified when reading/writing files

**Solution:** Always specify encoding explicitly

## Encoding Detection
Methods to detect text encoding:

- **BOM check:** Look for Byte Order Marks at file start
- **Statistical analysis:** Analyze byte patterns for likely encoding
- **Heuristic methods:** Check for common encoding indicators
- **Library detection:** Use libraries like chardet

## Best Practices
1. **Always use UTF-8:** Default choice for modern applications
2. **Specify encoding explicitly:** Never rely on system defaults
3. **Handle encoding errors:** Use appropriate error handling
4. **Validate input:** Check encoding before processing
5. **Test with international text:** Include various character sets
6. **Document encoding decisions:** Make encoding choice clear

## Encoding in Web Applications

### HTTP Headers
\`\`\`
Content-Type: text/html; charset=UTF-8
Content-Encoding: gzip
\`\`\`

### HTML Meta Tags
\`\`\`html
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
\`\`\`

### Database Configuration
\`\`\`sql
-- MySQL
CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- PostgreSQL  
CREATE DATABASE myapp WITH ENCODING 'UTF8';
\`\`\`

## Tools and Resources

Use our **Character Encoding Converter** tool to convert between different encodings and fix garbled text issues.

## Conclusion

Understanding character encoding is essential for building robust, international applications. By consistently using UTF-8, properly handling encoding conversions, and following best practices, you can avoid common text processing issues and create applications that work seamlessly across different languages and platforms.`;

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
