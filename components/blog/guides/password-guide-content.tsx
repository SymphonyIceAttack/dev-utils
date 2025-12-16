"use client";

import { motion } from "framer-motion";
import { Streamdown } from "streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { PasswordGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

export function PasswordGuideContent() {
  // Comprehensive password guide content
  const content = `# Secure Password Generation: Best Practices Guide

Creating strong, secure passwords is crucial for protecting your digital assets. This comprehensive guide covers password entropy, generation methods, and modern security best practices.

## What Makes a Password Strong?

A strong password is one that is difficult for both humans and computers to guess or crack. The strength of a password is measured by its **entropy** - the amount of uncertainty or randomness it contains.

### Password Entropy Formula:
**Entropy = log₂(R^N)**

Where:
- **R** = Character set size (number of possible characters)
- **N** = Password length
- **Result** = Bits of entropy

### Example Calculation:
\`\`\`
Password: "Hello123"
- Character set: 62 (a-z, A-Z, 0-9)
- Length: 8 characters
- Entropy: log₂(62^8) ≈ 47.6 bits
\`\`\`

## Modern Password Requirements

### Minimum Standards (2024)
- **Length**: 12+ characters minimum, 16+ recommended
- **Character variety**: Mix of uppercase, lowercase, numbers, symbols
- **Unpredictability**: No dictionary words or personal information
- **Uniqueness**: Different password for each account

### High-Security Requirements
- **Length**: 20+ characters for critical accounts
- **Randomness**: Use cryptographically secure random generation
- **No patterns**: Avoid sequential characters or repeated patterns
- **Regular updates**: Change passwords periodically for critical accounts

## Character Sets and Entropy

### Character Pool Analysis
\`\`\`
Character Set Sizes:
- Lowercase (a-z):           26 characters
- Uppercase (A-Z):           26 characters  
- Numbers (0-9):             10 characters
- Common symbols (!@#$%):    10 characters
- Extended symbols:          32+ characters
- Total with all:            94+ characters
\`\`\`

### Entropy Comparison
\`\`\`
Password Strength Examples:
8 chars, lowercase only:      ~37 bits (weak)
8 chars, mixed case + numbers: ~47 bits (fair)
12 chars, all types:           ~79 bits (strong)
16 chars, all types:          ~106 bits (very strong)
20 chars, all types:          ~132 bits (excellent)
\`\`\`

## Password Generation Methods

### 1. Cryptographically Secure Random Generation (Recommended)

\`\`\`javascript
// JavaScript (Node.js)
const crypto = require('crypto');

function generateSecurePassword(length = 16) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  // Generate random bytes and map to charset
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
}
\`\`\`

\`\`\`python
import secrets
import string

def generate_secure_password(length=16):
    # Use all character types
    charset = string.ascii_letters + string.digits + "!@#$%^&*"
    
    # Generate cryptographically secure random password
    password = ''.join(secrets.choice(charset) for _ in range(length))
    return password
\`\`\`

### 2. Passphrase Generation

\`\`\`javascript
// Diceware-style passphrase generation
const wordlist = [
  'correct', 'horse', 'battery', 'staple', 'random', 'words',
  'create', 'strong', 'passphrases', 'easy', 'remember'
];

function generatePassphrase(wordCount = 4) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
  }
  return words.join('-');
}
\`\`\`

## Security Best Practices

### ✅ DO: Strong Password Practices

\`\`\`javascript
// Good practices
const bestPractices = {
  // Use long, random passwords
  length: "16+ characters",
  randomness: "Cryptographically secure",
  uniqueness: "Different for each account",
  storage: "Password manager",
  updates: "Change when compromised"
};
\`\`\`

### ❌ DON'T: Weak Password Practices

\`\`\`javascript
// Bad practices to avoid
const badPractices = {
  shortPasswords: "8 characters or less",
  dictionaryWords: "Common words or phrases", 
  personalInfo: "Names, dates, addresses",
  patterns: "Sequential or repeated characters",
  reuse: "Same password across accounts",
  storage: "Writing down or sharing"
};
\`\`\`

## Advanced Security Considerations

### Password Entropy Calculator

\`\`\`javascript
function calculateEntropy(password) {
  const charset = new Set(password);
  const charsetSize = charset.size;
  const length = password.length;
  
  // Calculate entropy in bits
  const entropy = Math.log2(Math.pow(charsetSize, length));
  
  return {
    charsetSize,
    length,
    entropy: Math.round(entropy),
    strength: getStrengthRating(entropy)
  };
}

function getStrengthRating(entropy) {
  if (entropy < 28) return "Very Weak";
  if (entropy < 36) return "Weak";
  if (entropy < 60) return "Fair";
  if (entropy < 128) return "Strong";
  return "Very Strong";
}
\`\`\`

## Common Attack Vectors

### Dictionary Attacks
**How they work:**
- Try common passwords and words
- Use variations (capitalization, numbers, symbols)
- Leverage leaked password databases

**Protection:**
- Avoid dictionary words
- Use random generation
- Implement rate limiting

### Brute Force Attacks
**How they work:**
- Try all possible character combinations
- Systematic approach based on entropy
- GPU-accelerated cracking

**Protection:**
- Increase password length
- Use complex character sets
- Implement account lockouts

## Password Storage and Management

### Hashing and Salting

\`\`\`javascript
// Secure password hashing (Node.js)
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 12; // Higher = more secure but slower
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
\`\`\`

### Password Managers

**Recommended Features:**
- Strong master password
- Cross-device synchronization
- Auto-fill capabilities
- Security breach monitoring
- Two-factor authentication

**Popular Options:**
- Bitwarden (open source)
- 1Password
- LastPass
- Dashlane

## Password Generation in Different Languages

### Java
\`\`\`java
import java.security.SecureRandom;
import java.util.Random;

public class PasswordGenerator {
    private static final String CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    private static final Random RANDOM = new SecureRandom();
    
    public static String generatePassword(int length) {
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < length; i++) {
            password.append(CHARSET.charAt(RANDOM.nextInt(CHARSET.length())));
        }
        return password.toString();
    }
}
\`\`\`

### Go
\`\`\`go
package main

import (
    "crypto/rand"
    "fmt"
    "math/big"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

func generatePassword(length int) (string, error) {
    password := make([]byte, length)
    for i := range password {
        randomIndex, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
        if err != nil {
            return "", err
        }
        password[i] = charset[randomIndex.Int64()]
    }
    return string(password), nil
}
\`\`\`

## Testing Password Strength

### Online Validation

\`\`\`javascript
// Client-side password strength checker
function validatePasswordStrength(password) {
  const checks = {
    length: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[!@#$%^&*]/.test(password),
    noDictionary: !isDictionaryWord(password),
    noSequential: !hasSequentialChars(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  const strength = getStrengthLabel(score);
  
  return { checks, score, strength };
}
\`\`\`

## Common Mistakes and Solutions

### 1. Using Predictable Patterns
**Problem:** \`Password123!\`, \`Admin2024\`

**Solution:** Use truly random generation

### 2. Reusing Passwords
**Problem:** Same password across multiple accounts

**Solution:** Unique password for every account + password manager

### 3. Poor Storage
**Problem:** Writing passwords on paper, storing in text files

**Solution:** Use encrypted password managers

### 4. Ignoring Updates
**Problem:** Never changing compromised passwords

**Solution:** Regular password audits and updates

## Tools and Resources

Use our **Password Generator** tool to create cryptographically secure passwords with customizable options. The tool generates passwords using secure random number generators and provides entropy calculations.

### Recommended Tools:
- **Password Generators**: Online and offline tools
- **Password Managers**: Bitwarden, 1Password, LastPass
- **Strength Checkers**: Online password analyzers
- **Breach Monitoring**: HaveIBeenPwned, similar services

## Conclusion

Strong password generation is fundamental to digital security. Modern best practices emphasize length, randomness, and uniqueness over complexity rules.

### Key Takeaways:
- **Length matters most**: 16+ characters recommended
- **Use random generation**: Cryptographically secure methods
- **One password per account**: Never reuse passwords
- **Use password managers**: Secure storage and generation
- **Enable 2FA**: Additional security layer

---

*This guide covers modern password generation best practices. Always stay updated with evolving security standards and threats.*`;

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
      <PasswordGuideStructuredData />
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
                          id ||
                          "learn-password-generation-security-best-practices"
                        }
                        className="text-4xl font-bold text-gray-900 dark:text-gray-100 border-b-4 border-green-500 pb-4 mb-8"
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
                    <blockquote className="border-l-4 border-green-500 pl-6 py-2 my-6 bg-green-50 dark:bg-green-950/50 rounded-r-lg">
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
