"use client";

import { EncodingGuideStructuredData } from "@/components/structured-data/blog-post";

export function EncodingGuideContent() {
  return (
    <>
      <EncodingGuideStructuredData />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <h1>Character Encoding Guide: UTF-8, GBK & Beyond</h1>

          <p className="lead">
            Character encoding is fundamental to how computers represent and
            process text. Understanding different encoding systems will help you
            handle international text, fix encoding issues, and build globally
            compatible applications.
          </p>

          <h2>What is Character Encoding?</h2>
          <p>
            Character encoding is a system that maps characters (letters,
            numbers, symbols) to numerical values that computers can understand
            and process. Different encodings represent the same characters using
            different byte sequences.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3>Why Encoding Matters</h3>
            <p>Without proper encoding, you might see:</p>
            <ul>
              <li>Garbled text (æøå instead of umlauts)</li>
              <li>Question marks or boxes instead of characters</li>
              <li>Inconsistent text across different systems</li>
              <li>Data corruption during transmission</li>
            </ul>
          </div>

          <h2>Common Character Encodings</h2>

          <h3>ASCII (American Standard Code for Information Interchange)</h3>
          <ul>
            <li>
              <strong>Size:</strong> 7-bit (128 characters)
            </li>
            <li>
              <strong>Range:</strong> Basic English letters, numbers,
              punctuation
            </li>
            <li>
              <strong>Usage:</strong> Legacy systems, basic text files
            </li>
            <li>
              <strong>Limitation:</strong> No support for non-English characters
            </li>
          </ul>

          <h3>Unicode</h3>
          <ul>
            <li>
              <strong>Size:</strong> Supports up to 1,114,112 code points
            </li>
            <li>
              <strong>Range:</strong> All world languages and symbols
            </li>
            <li>
              <strong>Universal:</strong> International standard for text
              representation
            </li>
            <li>
              <strong>Code points:</strong> U+0000 to U+10FFFF
            </li>
          </ul>

          <h3>UTF-8 (Unicode Transformation Format - 8-bit)</h3>
          <ul>
            <li>
              <strong>Variable length:</strong> 1-4 bytes per character
            </li>
            <li>
              <strong>Compatibility:</strong> Backward compatible with ASCII
            </li>
            <li>
              <strong>Efficiency:</strong> Optimized for English text
            </li>
            <li>
              <strong>Web standard:</strong> Most common encoding for web
              content
            </li>
          </ul>

          <h3>UTF-16</h3>
          <ul>
            <li>
              <strong>Fixed length:</strong> 2 or 4 bytes per character
            </li>
            <li>
              <strong>Usage:</strong> JavaScript, Windows systems
            </li>
            <li>
              <strong>BOM:</strong> Often includes Byte Order Mark
            </li>
          </ul>

          <h3>GBK (Chinese Character Set)</h3>
          <ul>
            <li>
              <strong>Chinese support:</strong> Simplified Chinese characters
            </li>
            <li>
              <strong>Backward compatible:</strong> Extends GB2312
            </li>
            <li>
              <strong>Legacy:</strong> Being replaced by UTF-8
            </li>
            <li>
              <strong>Regional:</strong> Primarily used in China
            </li>
          </ul>

          <h2>Encoding Conversion Examples</h2>

          <h3>The Same Text in Different Encodings</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`Text: "Hello 世界"

UTF-8:        48 65 6C 6C 6F 20 E4 B8 96 E7 95 8C
UTF-16:       00 48 00 65 00 6C 00 6C 00 6F 00 20 4E 16 75 4C
GBK:          48 65 6C 6C 6F 20 CA C0 BD E7
ASCII only:   48 65 6C 6C 6F 20 (World lost)`}</code>
          </div>

          <h2>Handling Encoding in Different Languages</h2>

          <h3>JavaScript</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`// UTF-8 is default in modern JavaScript
const text = "Hello 世界";
const bytes = new TextEncoder().encode(text);
const decoded = new TextDecoder().decode(bytes);

// Convert between encodings (Node.js)
const iconv = require('iconv-lite');
const gbkBuffer = iconv.encode("Hello 世界", 'gbk');
const gbkText = iconv.decode(gbkBuffer, 'gbk');`}</code>
          </div>

          <h3>Python</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`# UTF-8 is default in Python 3
text = "Hello 世界"
utf8_bytes = text.encode('utf-8')
decoded = utf8_bytes.decode('utf-8')

# Convert to GBK
gbk_bytes = text.encode('gbk', errors='ignore')
gbk_text = gbk_bytes.decode('gbk')`}</code>
          </div>

          <h3>Java</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`import java.nio.charset.StandardCharsets;

String text = "Hello 世界";
byte[] utf8Bytes = text.getBytes(StandardCharsets.UTF_8);
byte[] gbkBytes = text.getBytes("GBK");

String decoded = new String(utf8Bytes, StandardCharsets.UTF_8);`}</code>
          </div>

          <h2>Common Encoding Problems and Solutions</h2>

          <h3>Problem: Garbled Text</h3>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p>
              <strong>Cause:</strong> Text encoded in one encoding, decoded in
              another
            </p>
            <p>
              <strong>Example:</strong> UTF-8 text decoded as ISO-8859-1
            </p>
            <p>
              <strong>Solution:</strong> Detect encoding and convert properly
            </p>
          </div>

          <h3>Problem: Missing Characters</h3>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p>
              <strong>Cause:</strong> Encoding doesn't support certain
              characters
            </p>
            <p>
              <strong>Example:</strong> Chinese characters in ASCII
            </p>
            <p>
              <strong>Solution:</strong> Use UTF-8 for international text
            </p>
          </div>

          <h3>Problem: File Corruption</h3>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p>
              <strong>Cause:</strong> Wrong encoding specified when
              reading/writing files
            </p>
            <p>
              <strong>Solution:</strong> Always specify encoding explicitly
            </p>
          </div>

          <h2>Encoding Detection</h2>
          <p>Methods to detect text encoding:</p>
          <ul>
            <li>
              <strong>BOM check:</strong> Look for Byte Order Marks at file
              start
            </li>
            <li>
              <strong>Statistical analysis:</strong> Analyze byte patterns for
              likely encoding
            </li>
            <li>
              <strong>Heuristic methods:</strong> Check for common encoding
              indicators
            </li>
            <li>
              <strong>Library detection:</strong> Use libraries like chardet
            </li>
          </ul>

          <h2>Best Practices</h2>
          <ol>
            <li>
              <strong>Always use UTF-8:</strong> Default choice for modern
              applications
            </li>
            <li>
              <strong>Specify encoding explicitly:</strong> Never rely on system
              defaults
            </li>
            <li>
              <strong>Handle encoding errors:</strong> Use appropriate error
              handling
            </li>
            <li>
              <strong>Validate input:</strong> Check encoding before processing
            </li>
            <li>
              <strong>Test with international text:</strong> Include various
              character sets
            </li>
            <li>
              <strong>Document encoding decisions:</strong> Make encoding choice
              clear
            </li>
          </ol>

          <h2>Encoding in Web Applications</h2>

          <h3>HTTP Headers</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`Content-Type: text/html; charset=UTF-8
Content-Encoding: gzip`}</code>
          </div>

          <h3>HTML Meta Tags</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`}</code>
          </div>

          <h3>Database Configuration</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`-- MySQL
CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- PostgreSQL  
CREATE DATABASE myapp WITH ENCODING 'UTF8';`}</code>
          </div>

          <h2>Tools and Resources</h2>
          <p>
            Use our{" "}
            <a href="/tools/encoding-converter">Character Encoding Converter</a>{" "}
            tool to convert between different encodings and fix garbled text
            issues.
          </p>

          <h2>Conclusion</h2>
          <p>
            Understanding character encoding is essential for building robust,
            international applications. By consistently using UTF-8, properly
            handling encoding conversions, and following best practices, you can
            avoid common text processing issues and create applications that
            work seamlessly across different languages and platforms.
          </p>
        </article>
      </div>
    </>
  );
}
