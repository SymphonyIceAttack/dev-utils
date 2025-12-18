"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { EncodingConverterGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Text Encoding Conversion: Complete Guide",
  description:
    "Encoding conversion is a fundamental skill for handling international text, data transmission, and compatibility across different systems. This comprehensive guide covers everything you need to know about converting between various text encoding formats.",
  author: "Dev Team",
  date: "2024-12-09",
  readTime: "6 min",
  tags: ["Converter", "Guide", "Encoding"],
  image: "/encoding-converter-guide-pixel.jpeg",
  featured: false,
};

export function EncodingConverterGuideContent() {
  // Comprehensive guide content for encoding conversion
  const content = `# Text Encoding Conversion: Complete Guide

Encoding conversion is a fundamental skill for handling international text, data transmission, and compatibility across different systems. This comprehensive guide covers everything you need to know about converting between various text encoding formats.

## What is Encoding Conversion?

**Encoding conversion** is the process of transforming text data from one character encoding format to another. Different encoding systems represent the same characters using different byte sequences, making conversion essential for:

- **🌍 Internationalization** - Converting between regional character sets
- **📡 Data transmission** - Ensuring compatibility across systems  
- **💾 Data storage** - Optimizing storage and retrieval
- **🔧 Debugging** - Understanding encoding issues
- **🛠 Legacy system integration** - Working with older systems

## Common Encoding Formats

### UTF-8 (Unicode Transformation Format - 8-bit)
The most widely used encoding on the web:

**Characteristics:**
- **Variable width**: 1-4 bytes per character
- **Backward compatible**: ASCII-compatible
- **Universal support**: Used by 97% of websites
- **Efficient**: Optimal for Latin scripts

**Examples:**
\`\`\`
"Hello" → 48 65 6C 6C 6F
"世界" → E4 B8 96 E7 95 8C
\`\`\`

### UTF-16 (Unicode Transformation Format - 16-bit)
Commonly used in Windows and Java:

**Characteristics:**
- **Fixed/Variable width**: 2 or 4 bytes per character
- **BOM support**: Byte Order Mark for endianness
- **Surrogate pairs**: For characters > 65535
- **Memory intensive**: More space than UTF-8

**Examples:**
\`\`\`
"Hello" → 00 48 00 65 00 6C 00 6C 00 6F
"世界" → 4E 16 75 4C
\`\`\`

### ASCII (American Standard Code for Information Interchange)
The foundation of modern character encoding:

**Characteristics:**
- **Fixed width**: 7 bits (128 characters)
- **English focus**: Basic Latin letters, numbers, punctuation
- **Universal support**: Supported everywhere
- **Limited range**: No special characters or international text

**Examples:**
\`\`\`
"Hello" → 48 65 6C 6C 6F
"世界" → Cannot represent (out of range)
\`\`\`

### ISO-8859-1 (Latin-1)
Extended ASCII for Western European languages:

**Characteristics:**
- **Fixed width**: 8 bits (256 characters)
- **Western European**: Supports accented characters
- **Legacy support**: Still used in some systems
- **Limited scope**: No Asian or other international scripts

**Examples:**
\`\`\`
"Hello" → 48 65 6C 6C 6F
"Héllo" → 48 E9 6C 6C 6F
\`\`\`

### Hexadecimal (Hex)
Representing text as hexadecimal numbers:

**Characteristics:**
- **Human-readable**: Easy to debug and document
- **Universal**: Can represent any binary data
- **Verbose**: Takes more space than binary
- **Common in**: Hashing, cryptography, debugging

**Examples:**
\`\`\`
"Hello" → 48 65 6C 6C 6F
"世界" → E4 B8 96 E7 95 8C
\`\`\`

### Binary
Representing text as binary sequences:

**Characteristics:**
- **Fundamental**: Closest to machine representation
- **Educational**: Understanding computer basics
- **Verbose**: Longest representation
- **Precise**: Exact bit representation

**Examples:**
\`\`\`
"Hello" → 01001000 01100101 01101100 01101100 01101111
"A"     → 01000001
\`\`\`

### Unicode Escape (\\uXXXX)
JavaScript-style Unicode representation:

**Characteristics:**
- **Programming friendly**: Used in JavaScript, JSON
- **Escaped format**: Safe in source code
- **Fixed format**: \\uXXXX for most characters
- **Extended format**: \\u{X} for Unicode > FFFF

**Examples:**
\`\`\`
"Hello" → \\u0048\\u0065\\u006C\\u006C\\u006F
"世界" → \\u4E16\\u754C
"🌍"   → \\u{1F30D}
\`\`\`

## Encoding Conversion in Different Languages

### JavaScript
Modern JavaScript with TextEncoder and TextDecoder:

\`\`\`javascript
// UTF-8 to Hex
const text = "Hello 世界";
const encoder = new TextEncoder();
const bytes = encoder.encode(text);
const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join(' ');
console.log(hex); // "48 65 6c 6c 6f e4 b8 96 e7 95 8c"

// Hex to UTF-8
const hexString = "48 65 6c 6c 6f e4 b8 96 e7 95 8c";
const hexBytes = hexString.split(' ').map(h => parseInt(h, 16));
const decoder = new TextDecoder();
const decoded = decoder.decode(new Uint8Array(hexBytes));
console.log(decoded); // "Hello 世界"

// UTF-8 to Binary
const binary = Array.from(bytes, byte => byte.toString(2).padStart(8, '0')).join(' ');
console.log(binary); // "01001000 01100101 01101100 01101100 01101111 11100100 10111000 10010110 11100111 10010101 10001100"

// Unicode Escape
function toUnicodeEscape(str) {
  return str.replace(/[\\s\\S]/g, char => {
    const code = char.codePointAt(0);
    if (code <= 0xFFFF) {
      return '\\\\u' + code.toString(16).padStart(4, '0').toUpperCase();
    } else {
      return '\\\\u{' + code.toString(16).toUpperCase() + '}';
    }
  });
}
console.log(toUnicodeEscape("Hello 世界 🌍")); // "Hello\\u4E16\\u754C\\u{1F30D}"
\`\`\`

### Python
Python's built-in encoding support:

\`\`\`python
import binascii
import codecs

text = "Hello 世界"

# UTF-8 to Hex
utf8_bytes = text.encode('utf-8')
hex_string = binascii.hexlify(utf8_bytes).decode('ascii')
print(hex_string)  # "48656c6ce4b896e7958c"

# Hex to UTF-8
hex_bytes = bytes.fromhex(hex_string)
decoded = hex_bytes.decode('utf-8')
print(decoded)  # "Hello 世界"

# UTF-8 to Binary
binary = ' '.join(format(byte, '08b') for byte in utf8_bytes)
print(binary)  # "01001000 01100101 01101100 01101100 01101111 11100100 10111000 10010110 11100111 10010101 10001100"

# Unicode Escape
def to_unicode_escape(text):
    escaped = []
    for char in text:
        code = ord(char)
        if code <= 0xFFFF:
            escaped.append(f'\\u{code:04X}')
        else:
            escaped.append(f'\\u{{{code:X}}}')
    return ''.join(escaped)

print(to_unicode_escape("Hello 世界 🌍"))  # "Hello\\u4E16\\u754C\\u{1F30D}"

# Using codecs for different encodings
utf16_bytes = text.encode('utf-16-le')
iso_bytes = text.encode('iso-8859-1', errors='ignore')
\`\`\`

### Node.js
Node.js Buffer and encoding utilities:

\`\`\`javascript
const text = "Hello 世界";

// UTF-8 to Hex using Buffer
const buffer = Buffer.from(text, 'utf8');
const hex = buffer.toString('hex');
console.log(hex); // "48656c6ce4b896e7958c"

// Hex to UTF-8
const hexBuffer = Buffer.from(hex, 'hex');
const decoded = hexBuffer.toString('utf8');
console.log(decoded); // "Hello 世界"

// UTF-8 to Binary
const binary = buffer.toString('binary');
console.log(binary); // Shows binary representation

// Different encodings
const utf16Buffer = Buffer.from(text, 'utf16le');
const asciiBuffer = Buffer.from(text, 'ascii'); // May lose data

// Unicode Escape
function toUnicodeEscape(str) {
  return str.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code <= 0xFFFF) {
      return '\\u' + code.toString(16).padStart(4, '0').toUpperCase();
    } else {
      return '\\u{' + code.toString(16).toUpperCase() + '}';
    }
  }).join('');
}
\`\`\`

### Java
Java's comprehensive encoding support:

\`\`\`java
import java.nio.charset.StandardCharsets;
import java.nio.charset.Charset;
import java.math.BigInteger;

public class EncodingConverter {
    public static void main(String[] args) {
        String text = "Hello 世界";
        
        // UTF-8 to Hex
        byte[] utf8Bytes = text.getBytes(StandardCharsets.UTF_8);
        StringBuilder hex = new StringBuilder();
        for (byte b : utf8Bytes) {
            hex.append(String.format("%02x", b & 0xFF));
        }
        System.out.println(hex.toString()); // "48656c6ce4b896e7958c"
        
        // Hex to UTF-8
        byte[] decodedBytes = hexToBytes(hex.toString());
        String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
        System.out.println(decoded); // "Hello 世界"
        
        // UTF-8 to Binary
        StringBuilder binary = new StringBuilder();
        for (byte b : utf8Bytes) {
            binary.append(String.format("%8s", Integer.toBinaryString(b & 0xFF)).replace(' ', '0')).append(' ');
        }
        System.out.println(binary.toString());
        
        // Different encodings
        byte[] utf16Bytes = text.getBytes(StandardCharsets.UTF_16LE);
        byte[] asciiBytes = text.getBytes(StandardCharsets.US_ASCII);
        
        // Unicode Escape
        String unicodeEscape = toUnicodeEscape(text);
        System.out.println(unicodeEscape);
    }
    
    private static byte[] hexToBytes(String hex) {
        int length = hex.length();
        byte[] data = new byte[length / 2];
        for (int i = 0; i < length; i += 2) {
            data[i / 2] = (byte) ((Character.digit(hex.charAt(i), 16) << 4)
                + Character.digit(hex.charAt(i+1), 16));
        }
        return data;
    }
    
    private static String toUnicodeEscape(String text) {
        StringBuilder escaped = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (c <= 0xFFFF) {
                escaped.append(String.format("\\u%04X", (int)c));
            } else {
                escaped.append(String.format("\\u{%X}", (int)c));
            }
        }
        return escaped.toString();
    }
}
\`\`\`

## Best Practices

### Input Validation
Always validate input before conversion:

\`\`\`javascript
function validateAndConvert(text, fromEncoding, toEncoding) {
  // Check for null/undefined
  if (!text) {
    throw new Error('Input text is required');
  }
  
  // Validate encoding formats
  const validEncodings = ['utf-8', 'utf-16', 'ascii', 'hex', 'binary', 'unicode-escape'];
  if (!validEncodings.includes(fromEncoding) || !validEncodings.includes(toEncoding)) {
    throw new Error('Invalid encoding format');
  }
  
  // Handle encoding errors gracefully
  try {
    return convertEncoding(text, fromEncoding, toEncoding);
  } catch (error) {
    throw new Error(\`Conversion failed: \${error.message}\`);
  }
}
\`\`\`

### Error Handling
Handle encoding errors properly:

\`\`\`python
def safe_convert_encoding(text, target_encoding):
    try:
        if target_encoding == 'hex':
            return text.encode('utf-8').hex()
        elif target_encoding == 'binary':
            bytes_data = text.encode('utf-8')
            return ' '.join(format(byte, '08b') for byte in bytes_data)
        # Add more conversions...
    except UnicodeEncodeError as e:
        print(f"Encoding error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
\`\`\`

### Performance Optimization
Optimize for large data:

\`\`\`javascript
// Streaming conversion for large files
async function convertLargeFile(file, targetEncoding) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const chunks = [];
    
    reader.onload = () => {
      chunks.push(reader.result);
    };
    
    reader.onloadend = () => {
      const fullText = chunks.join('');
      try {
        const converted = convertEncoding(fullText, 'utf-8', targetEncoding);
        resolve(converted);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
\`\`\`

## Common Issues and Solutions

### Character Loss During Conversion
**Problem**: Characters disappear when converting between encodings

**Solution**: Ensure target encoding supports source characters

\`\`\`javascript
// ❌ Wrong - loses non-ASCII characters
const asciiText = "Hello 世界".encode('ascii'); // "Hello "

// ✅ Correct - preserve all characters
const utf8Text = "Hello 世界".encode('utf-8'); // "Hello 世界"
\`\`\`

### Hex String Parsing Issues
**Problem**: Invalid hex strings causing parsing errors

**Solution**: Clean and validate hex input

\`\`\`python
def clean_hex_input(hex_string):
    # Remove spaces, newlines, and other separators
    cleaned = ''.join(hex_string.split())
    
    # Ensure even length
    if len(cleaned) % 2 != 0:
        cleaned = '0' + cleaned
    
    # Validate hex characters
    if not all(c in '0123456789abcdefABCDEF' for c in cleaned):
        raise ValueError("Invalid hex characters found")
    
    return cleaned
\`\`\`

### Binary String Format Issues
**Problem**: Binary strings with inconsistent formatting

**Solution**: Standardize binary input format

\`\`\`javascript
function normalizeBinaryInput(binaryString) {
  // Remove all non-binary characters
  const clean = binaryString.replace(/[^01]/g, '');
  
  // Pad to byte boundary
  const padded = clean.padEnd(Math.ceil(clean.length / 8) * 8, '0');
  
  // Split into bytes
  return padded.match(/.{1,8}/g) || [];
}
\`\`\`

## Use Cases and Applications

### Web Development
- **URL encoding**: Converting special characters for URLs
- **JSON serialization**: Ensuring proper Unicode handling
- **File uploads**: Handling international filenames
- **Database storage**: Optimizing character encoding for storage

### Data Processing
- **Log analysis**: Converting log files to readable formats
- **CSV processing**: Handling different encodings in spreadsheets
- **API responses**: Standardizing character encoding across services
- **File format conversion**: Migrating between different systems

### Security and Debugging
- **Penetration testing**: Converting payloads to different formats
- **Forensic analysis**: Analyzing encoded malware or data
- **Debugging**: Understanding character encoding issues
- **Encryption**: Preparing data for cryptographic operations

## Performance Considerations

### Memory Usage
- **UTF-8**: Most efficient for Latin scripts (1 byte per character)
- **UTF-16**: Efficient for Asian scripts (2 bytes per character)
- **Binary/Hex**: Significantly larger (8x for binary, 2x for hex)

### Processing Speed
- **Built-in functions**: Always faster than manual conversion
- **Streaming**: Better for large files
- **Batch processing**: More efficient than individual conversions

### File Size Impact
\`\`\`
Original: "Hello" (5 bytes)
UTF-8:    "Hello" (5 bytes)
UTF-16:   "Hello" (10 bytes)
Hex:      "Hello" (10 bytes)  
Binary:   "Hello" (40 bytes)
\`\`\`

## Tools and Resources

Use our **Encoding Converter** tool to quickly convert between different encoding formats online. It supports real-time conversion between UTF-8, UTF-16, ASCII, Hex, Binary, and Unicode Escape formats with error handling and validation.

## Conclusion

Understanding encoding conversion is essential for modern software development, especially when dealing with international users, legacy systems, or data exchange between different platforms. Master these techniques to build more robust and globally compatible applications.

### Key Takeaways:
- **Different encodings** serve different purposes and have unique characteristics
- **UTF-8** is the universal standard for modern applications
- **Always validate input** and handle encoding errors gracefully
- **Consider performance** when choosing encoding formats
- **Test thoroughly** with international and edge case data

---

*This guide covers encoding conversion fundamentals. For specific use cases and advanced optimization techniques, consider the requirements of your application and target platforms.*`;

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
      <EncodingConverterGuideStructuredData />
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
