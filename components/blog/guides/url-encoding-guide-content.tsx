"use client";

import { motion } from "framer-motion";
import { Streamdown } from "streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { UrlEncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

export function UrlEncodingGuideContent() {
  // Comprehensive URL encoding guide content
  const content = `# Complete Guide to URL Encoding: Best Practices

URL encoding is a fundamental technique in web development that ensures special characters, spaces, and non-ASCII text can be safely transmitted over the internet. This comprehensive guide covers everything from basic concepts to advanced implementation patterns.

## What is URL Encoding?

URL encoding (also known as percent encoding) is a mechanism that converts characters into a format that can be safely transmitted over the internet. It replaces unsafe or reserved characters with a '%' followed by two hexadecimal digits representing the character's UTF-8 byte sequence.

### The Core Problem
URLs were originally designed to handle only ASCII characters (A-Z, a-z, 0-9, and some special symbols). Modern applications need to handle:
- **International text**: Chinese, Arabic, emoji, etc.
- **Special characters**: Spaces, symbols, accents
- **Binary data**: File uploads, API payloads
- **User-generated content**: Names, comments, search queries

### How URL Encoding Works
Each character is converted to its UTF-8 byte representation, then each byte is encoded as %HH where HH is the hexadecimal value:

**Example:**
- Input: "Hello 世界"
- UTF-8 bytes: 48 65 6C 6C 6F E4 B8 96 E7 95 8C
- URL encoded: "Hello%20%E4%B8%96%E7%95%8C"

## Why URL Encoding is Essential

### 1. Safety and Security
**Prevents interpretation issues:**
- Spaces: \`search?q=hello world\` becomes \`search?q=hello%20world\`
- Special characters: \`data?param=a&b\` becomes \`data?param=a%26b\`
- Control characters: Prevents breaking URL structure

**Security benefits:**
- Prevents injection attacks through malformed URLs
- Ensures predictable URL parsing across systems
- Protects against parameter tampering

### 2. Cross-Platform Compatibility
**Browser consistency:**
- Different browsers handle special characters differently
- URL encoding ensures consistent behavior
- Prevents broken links and form submissions

**Server compatibility:**
- Backend systems expect properly encoded URLs
- API endpoints require encoded parameters
- Database queries need clean URL parameters

### 3. Standards Compliance
**RFC 3986 specification:**
- Defines the URI syntax standard
- Specifies which characters need encoding
- Ensures interoperability across systems

**Web standards:**
- W3C recommendations for URL handling
- International domain name support
- Modern Unicode handling

## Character Categories

### Reserved Characters (Must Encode)
These characters have special meanings in URLs and must be encoded when used as data:

**Structure delimiters:**
- \`?\` - Query string separator
- \`#\` - Fragment identifier
- \`/\` - Path separator
- \`;\` - Parameter separator (some contexts)

**Query parameter characters:**
- \`=\` - Key-value separator
- \`&\` - Parameter separator
- \`+\` - Space replacement (legacy)

**Special characters:**
- \`%\` - Encoding indicator
- \`:\` - Scheme separator
- \`@\` - Userinfo separator

### Unreserved Characters (No Encoding Needed)
These characters are safe to use without encoding:

**Alphanumeric:**
- **Uppercase**: A-Z (26 characters)
- **Lowercase**: a-z (26 characters)  
- **Numbers**: 0-9 (10 characters)

**Safe symbols:**
- \`-\` Hyphen
- \`_\` Underscore
- \`.\` Period/Dot
- \`~\` Tilde

### Characters Requiring Special Handling

**Space characters:**
- Regular space: \` \` → \`%20\`
- Tab: \`\\t\` → \`%09\`
- Newline: \`\\n\` → \`%0A\`

**Unicode characters:**
- Simple ASCII: Direct UTF-8 encoding
- Multi-byte: Full UTF-8 sequence encoding
- Emoji: Complex UTF-8 sequences

## URL Encoding in Different Programming Languages

### JavaScript
Modern JavaScript provides built-in encoding functions:

\`\`\`javascript
// Basic encoding
const original = "Hello World & Special!";
const encoded = encodeURIComponent(original);
console.log(encoded); // "Hello%20World%20%26%20Special%21"

// Full URL encoding
const url = \`https://example.com/search?q=\${encoded}\`;
console.log(url); // "https://example.com/search?q=Hello%20World%20%26%20Special%21"

// Decoding
const decoded = decodeURIComponent(encoded);
console.log(decoded); // "Hello World & Special!"

// URL constructor (automatic encoding)
const urlObj = new URL("https://example.com");
urlObj.searchParams.set("q", original);
console.log(urlObj.toString()); // "https://example.com?q=Hello%20World%20%26%20Special%21"

// Advanced encoding with custom function
function customEncode(str) {
  return str
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/(/g, "%28")
    .replace(/)/g, "%29");
}
\`\`\`

### Python
Python's urllib module provides comprehensive URL encoding:

\`\`\`python
import urllib.parse
from urllib.parse import quote, quote_plus, urlencode

# Basic encoding
original = "Hello World & Special!"
encoded = quote(original)
print(encoded)  # "Hello%20World%20%26%20Special%21"

# Space encoding with plus (legacy)
encoded_plus = quote_plus(original)
print(encoded_plus)  # "Hello+World+%26+Special%21"

# Query parameter encoding
params = {"q": "Hello World", "category": "tech & science"}
query_string = urlencode(params)
print(query_string)  # "q=Hello+World&category=tech+%26+science"

# Safe characters (don't encode)
encoded_safe = quote(original, safe="!@$")
print(encoded_safe)  # "Hello%20World%20%26%20Special%21"

# Decoding
decoded = unquote(encoded)
print(decoded)  # "Hello World & Special!"

# URL building
base_url = "https://example.com/search"
full_url = f"{base_url}?{query_string}"
print(full_url)  # "https://example.com/search?q=Hello+World&category=tech+%26+science"
\`\`\`

### Node.js
Node.js Buffer and URL modules for encoding:

\`\`\`javascript
const querystring = require('querystring');
const { URL } = require('url');

// Basic encoding
const original = "Hello World & Special!";
const encoded = encodeURIComponent(original);
console.log(encoded); // "Hello%20World%20%26%20Special%21"

// Query string encoding
const params = { q: "Hello World", category: "tech & science" };
const queryString = querystring.escape(original);
console.log(queryString); // "Hello%20World%20%26%20Special%21"

// URL parsing and building
const url = new URL('https://example.com/search');
url.searchParams.set('q', original);
url.searchParams.set('category', 'tech & science');
console.log(url.toString()); 
// "https://example.com/search?q=Hello%20World%20&category=tech%20%26%20science"

// Custom encoding with Buffer
function customEncode(str) {
  return Buffer.from(str, 'utf8')
    .toString('hex')
    .replace(/../g, '%$&')
    .toUpperCase();
}
console.log(customEncode("Hello 世界")); // "48656C6CE4B896E7958C"
\`\`\`

### Java
Java's URLEncoder and URI classes:

\`\`\`java
import java.net.URLEncoder;
import java.net.URLDecoder;
import java.net.URI;
import java.net.URL;
import java.io.UnsupportedEncodingException;

public class UrlEncodingExample {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String original = "Hello World & Special!";
        
        // Basic encoding (uses + for spaces)
        String encoded = URLEncoder.encode(original, "UTF-8");
        System.out.println(encoded); // "Hello+World+%26+Special%21"
        
        // Replace + with %20 for RFC 3986 compliance
        String rfc3986 = encoded.replace("+", "%20");
        System.out.println(rfc3986); // "Hello%20World%20%26%20Special%21"
        
        // Decoding
        String decoded = URLDecoder.decode(encoded, "UTF-8");
        System.out.println(decoded); // "Hello World & Special!"
        
        // URI building
        try {
            URI uri = new URI("https", "example.com", "/search", 
                "q=" + rfc3986 + "&category=tech%20%26%20science", null);
            System.out.println(uri.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        // URL with parameters
        URL url = new URL("https://example.com/search");
        System.out.println("URL protocol: " + url.getProtocol());
        System.out.println("URL host: " + url.getHost());
    }
}
\`\`\`

### PHP
PHP provides simple encoding functions:

\`\`\`php
<?php
$original = "Hello World & Special!";

// Basic encoding
$encoded = rawurlencode($original);
echo $encoded; // "Hello%20World%20%26%20Special%21"

// Space encoding with + (deprecated)
$encoded_legacy = urlencode($original);
echo $encoded_legacy; // "Hello+World+%26+Special%21"

// Query parameter encoding
$params = [
    'q' => 'Hello World',
    'category' => 'tech & science'
];
$query_string = http_build_query($params);
echo $query_string; // "q=Hello+World&category=tech+%26+science"

// Decoding
$decoded = rawurldecode($encoded);
echo $decoded; // "Hello World & Special!"

// URL building
$base_url = "https://example.com/search";
$full_url = $base_url . "?" . $query_string;
echo $full_url; // "https://example.com/search?q=Hello+World&category=tech+%26+science"

// Custom safe characters
function customEncode($str, $safe = '!@$') {
    return strtr(rawurlencode($str), ['%2F' => '/']);
}
?>
\`\`\`

## Common Use Cases and Patterns

### 1. Query Parameters
Encoding individual parameters for API calls and form submissions:

\`\`\`javascript
// Search queries
const searchTerm = "JavaScript & React";
const url = \`https://api.example.com/search?q=\${encodeURIComponent(searchTerm)}\`;

// Multiple parameters
const params = new URLSearchParams({
  query: "Hello World",
  filter: "active & verified",
  sort: "name"
});
const apiUrl = \`https://api.example.com?\${params.toString()}\`;
\`\`\`

### 2. Form Submissions
Encoding form data for POST requests:

\`\`\`html
<!-- HTML Form (automatic encoding) -->
<form action="/submit" method="post">
  <input type="text" name="name" value="John Doe">
  <input type="text" name="message" value="Hello & goodbye!">
  <button type="submit">Submit</button>
</form>

<!-- JavaScript Form Encoding -->
<script>
function encodeFormData(formData) {
  const encoded = {};
  for (const [key, value] of formData.entries()) {
    encoded[key] = encodeURIComponent(value);
  }
  return encoded;
}
</script>
\`\`\`

### 3. File Upload URLs
Encoding filenames and paths:

\`\`\`javascript
// File sharing
const filename = "report_2024.pdf";
const downloadUrl = \`https://files.example.com/download/\${encodeURIComponent(filename)}\`;

// Image URLs with parameters
const imageParams = new URLSearchParams({
  src: "photo.jpg",
  alt: "View from mountain peak 🏔️",
  size: "large"
});
const imageUrl = \`https://cdn.example.com?\${imageParams.toString()}\`;
\`\`\`

### 4. RESTful API Design
Proper URL encoding in API endpoints:

\`\`\`javascript
// User profiles with international names
const userId = "user-123";
const username = "José María García";
const profileUrl = \`/api/users/\${userId}/profile?name=\${encodeURIComponent(username)}\`;

// Category filtering
const category = "Tech & Science > Programming > JavaScript";
const filterUrl = \`/api/articles?category=\${encodeURIComponent(category)}\`;
\`\`\`

## Best Practices

### 1. Encode at the Right Time
**✅ Do this:**
\`\`\`javascript
// Encode user input before adding to URL
const userInput = getUserSearchTerm();
const encodedInput = encodeURIComponent(userInput);
const url = \`https://example.com/search?q=\${encodedInput}\`;
\`\`\`

**❌ Don't do this:**
\`\`\`javascript
// Don't encode entire URLs
const userUrl = "https://example.com/search?q=hello";
const encodedUrl = encodeURIComponent(userUrl); // WRONG!
\`\`\`

### 2. Use the Right Function
**encodeURIComponent vs encodeURI:**

\`\`\`javascript
// encodeURIComponent - for individual parameters
const param = "Hello World & More!";
const encoded = encodeURIComponent(param);
// Result: "Hello%20World%20%26%20More%21"

// encodeURI - for full URLs (preserves some characters)
const url = "https://example.com/path with spaces";
const encoded = encodeURI(url);
// Result: "https://example.com/path%20with%20spaces"
\`\`\`

### 3. Handle Unicode Properly
**JavaScript Unicode handling:**

\`\`\`javascript
// Modern approach with URLSearchParams
const params = new URLSearchParams();
params.set('message', 'Hello 世界! 🌍');
const url = \`https://api.example.com?\${params.toString()}\`;

// Manual encoding with proper Unicode support
const unicodeText = 'Hello 世界! 🌍';
const encoded = encodeURIComponent(unicodeText);
const safeUrl = \`https://example.com?msg=\${encoded}\`;
\`\`\`

### 4. Validate After Encoding
**Always test encoded URLs:**

\`\`\`javascript
function testUrlEncoding(original, encoded) {
  try {
    const url = new URL(encoded);
    const decoded = decodeURIComponent(url.searchParams.get('param'));
    return decoded === original;
  } catch (error) {
    return false;
  }
}

// Test cases
const testCases = [
  ["Hello World", "Hello%20World"],
  ["Hello & Goodbye", "Hello%20%26%20Goodbye"],
  ["世界", "%E4%B8%96%E7%95%8C"]
];

testCases.forEach(([original, expected]) => {
  const encoded = encodeURIComponent(original);
  const isCorrect = testUrlEncoding(original, encoded);
  console.log(\`\${original} -> \${encoded} (\${isCorrect ? '✓' : '✗'})\`);
});
\`\`\`

## Common Pitfalls and Solutions

### 1. Double Encoding
**Problem:** Encoding already encoded strings

\`\`\`javascript
// ❌ Wrong - double encoding
const userInput = "Hello%20World";
const doubleEncoded = encodeURIComponent(userInput);
// Result: "Hello%2520World"

// ✅ Correct - check if already encoded
function smartEncode(str) {
  // Simple check for percent encoding
  if (/%[0-9A-Fa-f]{2}/.test(str)) {
    return str; // Already encoded
  }
  return encodeURIComponent(str);
}
\`\`\`

### 2. Space Character Confusion
**Problem:** Different space encoding methods

\`\`\`javascript
// Different encodings for spaces
encodeURIComponent("hello world")     // "hello%20world"
encodeURI("hello world")              // "hello%20world"
URLSearchParams for "hello world"     // "hello%20world"

// Legacy PHP urlencode (different)
urlencode("hello world")              // "hello+world"

// Solution: Be consistent
function encodeForUrl(str) {
  return encodeURIComponent(str).replace(/%20/g, '+'); // If you need +
}
\`\`\`

### 3. Unicode Edge Cases
**Problem:** Complex Unicode characters

\`\`\`javascript
// Emoji and complex characters
const complexText = "👨‍💻 Developer 🚀";
console.log(encodeURIComponent(complexText));
// "👨%F0%9F%92%BB%20Developer%20%F0%9F%9A%80"

// Solution: Test with various character sets
const testStrings = [
  "ASCII text",
  "Español",
  "日本語",
  "العربية",
  "Emoji: 👨‍💻🚀",
  "Math: ∑∫∆∇",
  "Special: ©®™€£¥"
];

testStrings.forEach(str => {
  const encoded = encodeURIComponent(str);
  const decoded = decodeURIComponent(encoded);
  console.log(\`\${str} -> \${encoded} -> \${decoded} (\${str === decoded ? '✓' : '✗'})\`);
});
\`\`\`

### 4. Security Considerations
**Preventing URL injection:**

\`\`\`javascript
// ❌ Unsafe - potential injection
function unsafeRedirect(userUrl) {
  return \`https://example.com/redirect?url=\${userUrl}\`;
}

// ✅ Safe - validate and encode
function safeRedirect(userUrl) {
  try {
    // Validate URL
    const url = new URL(userUrl);
    
    // Only allow specific domains
    const allowedDomains = ['example.com', 'trusted.com'];
    if (!allowedDomains.includes(url.hostname)) {
      throw new Error('Domain not allowed');
    }
    
    // Encode the validated URL
    const encoded = encodeURIComponent(userUrl);
    return \`https://example.com/redirect?url=\${encoded}\`;
  } catch (error) {
    return 'https://example.com/error';
  }
}
\`\`\`

## Performance Optimization

### 1. Batch Encoding
**Efficient handling of multiple parameters:**

\`\`\`javascript
// ❌ Inefficient - multiple encode calls
function badEncoding(params) {
  const encoded = {};
  for (const [key, value] of Object.entries(params)) {
    encoded[key] = encodeURIComponent(value);
  }
  return encoded;
}

// ✅ Efficient - single pass
function goodEncoding(params) {
  const url = new URL('https://example.com');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

// Usage
const params = { name: "John", city: "New York", hobby: "coding" };
const url = goodEncoding(params);
\`\`\`

### 2. Caching Encoded Values
**Avoid re-encoding the same values:**

\`\`\`\`javascript
class URLEncoder {
  constructor() {
    this.cache = new Map();
  }
  
  encode(value) {
    if (this.cache.has(value)) {
      return this.cache.get(value);
    }
    
    const encoded = encodeURIComponent(value);
    this.cache.set(value, encoded);
    return encoded;
  }
  
  clearCache() {
    this.cache.clear();
  }
}

// Usage
const encoder = new URLEncoder();
const encoded1 = encoder.encode("Hello World");
const encoded2 = encoder.encode("Hello World"); // Uses cache
\`\`\`

## Testing and Debugging

### 1. URL Testing Tools
**Browser console testing:**

\`\`\`javascript
// Quick test function
function testUrlEncoding() {
  const tests = [
    "Hello World",
    "Special chars: !@#$%^&*()",
    "Unicode: 你好世界",
    "Emoji: 👨‍💻🚀",
    "Mixed: Hello 世界! 👋"
  ];
  
  tests.forEach(test => {
    const encoded = encodeURIComponent(test);
    const decoded = decodeURIComponent(encoded);
    const success = test === decoded;
    
    console.log(\`Input:  \${test}\`);
    console.log(\`Encoded: \${encoded}\`);
    console.log(\`Decoded: \${decoded}\`);
    console.log(\`Success: \${success ? '✓' : '✗'}\`);
    console.log('---');
  });
}

// Run tests
testUrlEncoding();
\`\`\`

### 2. Network Debugging
**Inspecting actual URL requests:**

\`\`\`javascript
// Monitor network requests
function debugUrlEncoding() {
  const original = "Hello World & Special!";
  const encoded = encodeURIComponent(original);
  const url = \`https://httpbin.org/get?q=\${encoded}\`;
  
  console.log('Original:', original);
  console.log('Encoded:', encoded);
  console.log('Full URL:', url);
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Server received:', data.args.q);
    })
    .catch(error => console.error('Error:', error));
}
\`\`\`

## Advanced Topics

### 1. RFC 3986 vs RFC 1738
**Understanding URL encoding standards:**

\`\`\`javascript
// RFC 3986 (modern standard)
const rfc3986 = {
  reserved: ":/?#[]@!$&'()*+,;=",
  unreserved: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
};

// RFC 1738 (legacy standard)
const rfc1738 = {
  reserved: "$-_.+!*'(),",
  unreserved: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"
};

// Modern encoding (RFC 3986)
function modernEncode(str) {
  return str.split('').map(char => {
    if (rfc3986.unreserved.includes(char)) {
      return char;
    }
    return encodeURIComponent(char).replace(/[!'()*~]/g, hex => 
      '%' + hex.charCodeAt(0).toString(16).toUpperCase()
    );
  }).join('');
}
\`\`\`

### 2. Percent-Encoding Variations
**Different encoding schemes:**

\`\`\`javascript
// Standard percent encoding
function percentEncode(str) {
  return str.replace(/[^A-Za-z0-9-._~]/g, char => 
    '%' + char.charCodeAt(0).toString(16).toUpperCase()
  );
}

// URL-safe encoding (removes + and _)
function urlSafeEncode(str) {
  return percentEncode(str).replace(/\+/g, '-').replace(/\//g, '_');
}

// Base64 URL-safe variant
function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
\`\`\`

## Tools and Resources

Use our **URL Encoder** tool to quickly encode and decode URLs online. It supports both modern encodeURIComponent and legacy encodeURI methods, with real-time processing and support for international characters.

### Recommended Tools:
- **Browser DevTools**: Network tab for URL inspection
- **Online Validators**: Check URL encoding correctness
- **Unicode Character Tools**: Visualize Unicode characters
- **API Testing Tools**: Test URL encoding in requests

## Conclusion

URL encoding is essential for modern web development, ensuring that URLs work reliably across different systems, browsers, and languages. Understanding when and how to encode URLs prevents common issues with special characters, ensures cross-platform compatibility, and follows web standards.

### Key Takeaways:
- **Always encode user input** before including it in URLs
- **Use the right function** - encodeURIComponent for parameters, encodeURI for full URLs
- **Test with Unicode** characters to ensure proper handling
- **Validate URLs** after encoding to ensure they're functional
- **Follow RFC 3986** standards for modern web applications

---

*This guide covers URL encoding fundamentals and advanced patterns. For specific use cases and edge cases, always test with your target browsers and servers.*`;

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
      <UrlEncodingGuideStructuredData />
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
                        id={id || "learn-url-encoding-the-complete-guide"}
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
