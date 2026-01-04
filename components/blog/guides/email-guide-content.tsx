"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Email Address Validation: A Complete Technical Guide",
  description:
    "Master email validation with this comprehensive guide. Learn RFC 5322 standards, regex patterns, format verification vs existence checking, and how to build robust email validation in any programming language.",
  author: "Engineering Research",
  date: "2025-01-04",
  readTime: "15 min",
  tags: ["Email Validation", "RFC 5322", "Web Development", "Data Quality"],
  image: "/images/blog/email-guide-pixel.jpeg",
  featured: true,
};

export function EmailGuideContent() {
  const content = `# Email Address Validation: A Complete Technical Guide

> **TL;DR**: Email validation != email verification. Validation checks format (RFC 5322 syntax). Verification checks if the mailbox actually exists. This guide covers both, with regex patterns, implementation examples, and common pitfalls to avoid.

## 1. Introduction: The Email Address Problem

Email addresses are deceptively complex. At first glance, they seem simple—just an @ symbol with characters on both sides. But underneath that simplicity lies a surprisingly intricate specification defined in RFC 5322, with edge cases that can break your validation logic if you are not careful.

The average person might think \`test@example.com\` and \`te!st@example.com\` are equally valid. They are wrong. But so are many developers who use naive regex patterns that either:
- Accept obviously invalid addresses (like \`test@\`)
- Reject valid addresses (like \`test+tag@example.com\`)

This guide provides a rigorous, production-ready approach to email validation that balances correctness with practical constraints.

## 2. Understanding RFC 5322

### 2.1 The Official Standard

RFC 5322 (obsoleting RFC 822) defines the official syntax for internet message format, including email addresses. The standard describes two forms:

**The addr-spec form (what we typically use):**
\`local-part@domain\`

**The quoted-string form (rarely used but valid):**
\`"this is a valid local part"@domain.com\`

### 2.2 The Local Part (Before @)

The local part can contain:

- Letters: A-Z, a-z
- Numbers: 0-9
- Special: ! # $ % & ' * + - / = ? ^ _ \` { | } ~
- Dots: . (with restrictions)

**Critical rules:**
1. Dots cannot appear at the start or end
2. Dots cannot appear consecutively
3. Maximum length: 64 characters

### 2.3 The Domain Part (After @)

The domain can be:

**A registered domain:**
\`example.com\`, \`mail.server.org\`

**An IP address (bracketed):**
\`user@[192.168.1.1]\`

**Maximum total length:** 254 characters (RFC 3696 section 3)

### 2.4 Unicode and International Email

RFC 6531 introduces internationalized email addresses (SMTPUTF8), allowing Unicode characters in both local parts and domains. However, support varies widely:

- **Gmail**: Accepts Unicode in local parts
- **Most enterprise systems**: Block or strip Unicode
- **Best practice**: Validate against ASCII first

## 3. The Regex Question: Is It Possible?

### 3.1 The Short Answer

Yes, a regex can validate RFC 5322 format. But it is extremely complex, and for most applications, you do not need full compliance.

### 3.2 Production-Ready Regex Pattern

For 99% of web applications, this pattern strikes the right balance:

\`\`\`javascript
const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
\`\`\`

**What it validates:**
- Local part: Letters, numbers, dots, underscores, percent, plus, hyphen
- @ symbol presence
- Domain: Letters, numbers, dots, hyphens
- TLD: At least 2 letters

**What it rejects:**
- Spaces (never valid in RFC 5322 addr-spec)
- Consecutive dots (valid in spec, but usually indicate spam)
- IPs without explicit bracketing

### 3.3 Full RFC 5322 Regex

For maximum compliance, the RFC defines a complex pattern that handles quoted strings, IP addresses, and comments. This pattern spans over 600 characters and requires careful testing. While theoretically complete, it may have performance implications at scale.

For production systems, the simpler pattern in section 3.2 is recommended for most use cases.

## 4. Validation vs Verification: Critical Distinction

### 4.1 Validation (Format Checking)

Validation answers: "Does this email follow the correct syntax?"

It is purely algorithmic—no network requests, no external dependencies.

**What validation can detect:**
- Missing @ symbol
- Invalid characters
- Malformed domain
- Missing TLD

**What validation CANNOT detect:**
- Whether the mailbox exists
- Whether the user can receive mail

### 4.2 Verification (Existence Checking)

Verification answers: "Does this email actually exist and can receive mail?"

This requires SMTP communication with the recipient is mail server.

**The verification process:**
1. Connect to the domain is mail server (MX records)
2. Initiate SMTP conversation
3. Send \`MAIL FROM:<>\`
4. Send \`RCPT TO:<target@example.com>\`
5. Check the server response

**Server responses:**
- \`250 OK\`: Address exists (accept)
- \`550 No such user\`: Address does not exist (reject)
- Other 5xx codes: Address rejected (reject)

### 4.3 Why You Should Separate Them

| Scenario | Validation | Verification |
|----------|------------|--------------|
| User registration | Required | Consider deferring |
| Contact form | Required | Skip |
| Email marketing list | Required | Required |
| Real-time signup flow | Required | Too slow |

**Key insight**: SMTP verification can take 5-30 seconds and may trigger spam filters. Always validate format first, verify existence later or not at all for most use cases.

## 5. Implementation Examples

### 5.1 JavaScript / TypeScript

\`\`\`typescript
function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("test@")); // false
\`\`\`

### 5.2 Python

\`\`\`python
import re

def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))
\`\`\`

### 5.3 Go

The Go example uses raw strings with backticks for the regex pattern, which is idiomatic Go:

\`\`\`go
func isValidEmail(email string) bool {
    pattern := regexp.MustCompile(\`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\`)
    if !pattern.MatchString(email) {
        return false
    }
    
    _, err := mail.ParseAddress(email)
    return err == nil
}
\`\`\`

### 5.4 Edge Cases to Handle

\`\`\`typescript
function validateEmailRigorous(email: string): { valid: boolean; reason?: string } {
  if (email.length > 254) {
    return { valid: false, reason: 'Email exceeds 254 characters' };
  }
  
  const [local, domain] = email.split('@');
  
  if (!local || !domain) {
    return { valid: false, reason: 'Missing @ symbol or parts' };
  }
  
  if (local.length > 64) {
    return { valid: false, reason: 'Local part exceeds 64 characters' };
  }
  
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(email)) {
    return { valid: false, reason: 'Invalid format' };
  }
  
  if (local.includes('..')) {
    return { valid: false, reason: 'Consecutive dots in local part' };
  }
  
  if (local.startsWith('.') || local.endsWith('.')) {
    return { valid: false, reason: 'Dot at start/end of local part' };
  }
  
  return { valid: true };
}
\`\`\`

## 6. Common Pitfalls

### 6.1 Overly Strict Validation

**Anti-pattern**: Rejecting valid addresses

\`\`\`javascript
// BAD: Rejects + addresses (used for email filtering)
const badPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// BAD: Rejects subdomains
const badPattern2 = /^[^@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
\`\`\`

### 6.2 Overly Permissive Validation

**Anti-pattern**: Accepting garbage

\`\`\`javascript
// BAD: Accepts almost anything
const badPattern = /^.+$@.+$/;
\`\`\`

### 6.3 Case Sensitivity Confusion

**Fact**: Email local parts ARE case-sensitive technically, but:

- Most mail servers treat them as case-insensitive
- Gmail treats everything before + as case-insensitive
- **Best practice**: Normalize to lowercase for storage and comparison

\`\`\`javascript
function normalizeEmail(email: string): string {
  const [local, domain] = email.toLowerCase().split('@');
  return local + '@' + domain;
}
\`\`\`

## 7. Building a Production Validation Service

### 7.1 API Endpoint Design

\`\`\`typescript
interface ValidationRequest {
  email: string;
  verify?: boolean; // If true, performs SMTP verification
}

interface ValidationResponse {
  valid: boolean;
  formatValid: boolean;
  domain?: string;
  verificationResult?: 'accept' | 'reject' | 'unknown';
}
\`\`\`

### 7.2 Rate Limiting Considerations

Email validation endpoints are targets for abuse:

1. **Limit requests per IP**: 10-50 per minute
2. **Require authentication** for bulk validation
3. **Cache results**: Validated emails rarely change
4. **Monitor for patterns**: Rapid-fire requests indicate bots

## 8. Security Implications

### 8.1 Email Injection Attacks

Malicious actors may attempt header injection:

\`\`\`
user@example.com\r\nBcc: attacker@evil.com
\`\`\`

**Defense**: Always validate format before using in email headers.

### 8.2 ReDoS (Regular Expression Denial of Service)

Complex regex patterns can be exploited with specially crafted inputs:

\`\`\`javascript
// VULNERABLE to ReDoS
const vulnerable = /^([a-z]+)+@[a-z]+\.[a-z]+$/;

// SAFER: Use a simpler pattern
const safe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
\`\`\`

## 9. Conclusion

Email validation is deceptively complex. For most applications:

1. **Use the standard regex pattern** for format validation
2. **Separate validation from verification** in your architecture
3. **Normalize and lowercase** for consistent storage
4. **Handle edge cases** but do not block valid addresses
5. **Defer SMTP verification** unless absolutely required

The most robust approach combines:
- RFC-compliant format checking (with reasonable constraints)
- Length validation
- DNS/MX record checking for domain validity
- Optional SMTP verification for high-value use cases

Remember: The goal is to accept valid addresses while rejecting clearly invalid ones—not to implement perfect RFC compliance at the expense of user experience.
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
