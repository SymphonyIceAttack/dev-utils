"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { PasswordGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Secure Password Generation: Best Practices Guide",
  description:
    "Creating strong, secure passwords is crucial for protecting your digital assets. This comprehensive guide covers password entropy, generation methods, and modern security best practices.",
  author: "Security Team",
  date: "2024-12-11",
  readTime: "10 min",
  tags: ["Password", "Guide", "Security"],
  image: "/password-guide-pixel.jpeg",
  featured: false,
};

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

Password: "Tr0ub4dor&3"
- Character set: 80 (alphanumeric + common symbols)
- Length: 11 characters
- Entropy: log₂(80^11) ≈ 70.5 bits

Password: "correct horse battery staple"
- Character set: ~30 (lowercase + space)
- Length: 28 characters
- Entropy: log₂(30^28) ≈ 138 bits
\`\`\`

## Modern Password Requirements

### Minimum Standards (2024)

| Requirement | Recommendation | Notes |
|-------------|----------------|-------|
| **Length** | 12+ characters minimum | 16+ recommended |
| **Character variety** | Mix of uppercase, lowercase, numbers, symbols | No mandatory complexity rules |
| **Unpredictability** | No dictionary words or personal information | Avoid common patterns |
| **Uniqueness** | Different password for each account | Critical for security |

### High-Security Requirements

| Requirement | Recommendation | Use Case |
|-------------|----------------|----------|
| **Length** | 20+ characters | Critical accounts |
| **Randomness** | Use cryptographically secure random generation | All passwords |
| **No patterns** | Avoid sequential characters or repeated patterns | High-security |
| **Regular updates** | Change passwords periodically for critical accounts | Administrative |

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

### Entropy Comparison Table

\`\`\`
Password Strength Examples:

Length    | Charset      | Entropy    | Time to Crack (Offline) | Rating
----------|-------------|------------|-------------------------|--------
8 chars   | lowercase   | ~37 bits   | Seconds                 | ❌ Weak
8 chars   | mixed case  | ~45 bits   | Minutes                  | ❌ Weak
8 chars   | + numbers   | ~47 bits   | Hours                    | ⚠️ Fair
12 chars  | all types   | ~79 bits   | Years                    | ✅ Strong
16 chars  | all types   | ~106 bits   | Centuries                | ✅ Strong
20 chars  | all types   | ~132 bits   | Millenia                 | ✅ Excellent
24 chars  | passphrase  | ~114 bits   | Millenia                 | ✅ Excellent
32 chars  | passphrase  | ~152 bits   | Forever                  | ✅ Perfect
\`\`\`

### Real-World Crack Time Estimates

Using modern GPU cracking rig (~100 billion guesses/second):

\`\`\`
Entropy    | Crack Time (Offline)    | Security Level
-----------|------------------------|----------------
40 bits    | < 1 second            | ❌ Critical
50 bits    | ~1 minute             | ❌ Very Weak
60 bits    | ~17 minutes           | ❌ Weak
70 bits    | ~17 hours             | ⚠️ Fair
80 bits    | ~36 days              | ✅ Strong
90 bits    | ~10 years             | ✅ Strong
100 bits   | ~1000 years           | ✅ Excellent
120 bits   | ~1 million years      | ✅ Perfect
\`\`\`

## Password Generation Methods

### 1. Cryptographically Secure Random Generation (Recommended)

\`\`\`javascript
// JavaScript (Node.js)
const crypto = require('crypto');

function generateSecurePassword(length = 16, options = {}) {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
  } = options;
  
  let charset = '';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (charset.length === 0) {
    throw new Error('At least one character type must be selected');
  }
  
  const randomBytes = crypto.randomBytes(length);
  let password = '';
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
}

// Usage
const password = generateSecurePassword(16, {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true
});
console.log(password); // e.g., "Hj7#kL2$mN9@pQ8"
\`\`\`

\`\`\`python
import secrets
import string

def generate_secure_password(length=16, uppercase=True, lowercase=True, 
                            numbers=True, symbols=True):
    charset = ''
    if uppercase:
        charset += string.ascii_uppercase
    if lowercase:
        charset += string.ascii_lowercase
    if numbers:
        charset += string.digits
    if symbols:
        charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if not charset:
        raise ValueError('At least one character type must be selected')
    
    # Generate cryptographically secure password
    password = ''.join(secrets.choice(charset) for _ in range(length))
    return password

# Usage
password = generate_secure_password(16)
print(password)  # e.g., "Hj7#kL2$mN9@pQ8"
\`\`\`

### 2. Passphrase Generation (Memorable)

Diceware-style passphrase generation using word lists:

\`\`\`javascript
// EFF Long Word List (7776 words)
// https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases

const EFF_WORDLIST = [
  'abacus', 'abdomen', 'abolish', 'abstract', 'academy', 'accent', 'accident',
  'account', 'achieve', 'acoustic', 'acquire', 'across', 'action', 'actress',
  'adapt', 'address', 'adjust', 'admit', 'adobe', 'adopt', 'advance', 'advice',
  'aerobic', 'affair', 'afford', 'afraid', 'agency', 'agent', 'agree', 'ahead',
  'aim', 'ajar', 'alarm', 'album', 'alcohol', 'alert', 'alien', 'all', 'alley',
  'allow', 'almost', 'alpha', 'alpine', 'also', 'alter', 'always', 'amateur',
  'amazing', 'amber', 'amen', 'amid', 'amiss', 'among', 'amount', 'ample', 'amuse'
  // ... (full list would have 7776 words)
];

function generatePassphrase(wordCount = 4, separator = '-') {
  const words = [];
  const randomBuffer = crypto.randomBytes(wordCount * 2); // 2 bytes per word
  
  for (let i = 0; i < wordCount; i++) {
    const wordIndex = (randomBuffer[i * 2] << 8) | randomBuffer[i * 2 + 1];
    const wordIndexMod = wordIndex % EFF_WORDLIST.length;
    words.push(EFF_WORDLIST[wordIndexMod]);
  }
  
  return words.join(separator);
}

// Usage
const passphrase = generatePassphrase(4); // "academy-across-adult-agency"
const passphrase2 = generatePassphrase(6, ' '); // "address afford agent almost alpine audio"
\`\`\`

### 3. Custom Character Set Passwords

\`\`\`python
import secrets
import string

# Custom charset for specific requirements
class PasswordGenerator:
    def __init__(self):
        self.charsets = {
            'lowercase': string.ascii_lowercase,
            'uppercase': string.ascii_uppercase,
            'digits': string.digits,
            'symbols': '!@#$%^&*()_+-=[]{}|;:,.<>?',
            'ambiguous': '0O1lI|',  # Characters to avoid
        }
    
    def generate(self, length=16, use_uppercase=True, use_lowercase=True,
                use_digits=True, use_symbols=True, exclude_ambiguous=False):
        charset = ''
        
        if use_uppercase:
            charset += self.charsets['uppercase']
        if use_lowercase:
            charset += self.charsets['lowercase']
        if use_digits:
            charset += self.charsets['digits']
        if use_symbols:
            charset += self.charsets['symbols']
        
        if exclude_ambiguous:
            charset = ''.join(c for c in charset if c not in self.charsets['ambiguous'])
        
        if not charset:
            raise ValueError('At least one character type must be selected')
        
        return ''.join(secrets.choice(charset) for _ in range(length))
    
    def generate_memorable(self, num_words=4):
        """Generate memorable passphrase with optional capitalization."""
        wordlist = self.load_wordlist()  # Load EFF wordlist
        
        words = []
        for _ in range(num_words):
            word = secrets.choice(wordlist)
            # Capitalize first letter randomly
            if secrets.randbelow(2):
                word = word.capitalize()
            words.append(word)
        
        return ' '.join(words)

# Usage
gen = PasswordGenerator()
password = gen.generate(16, exclude_ambiguous=True)  # No confusing characters
passphrase = gen.generate_memorable(5)  # "Address Almost Agent Alpine Audio"
\`\`\`

## Security Best Practices

### ✅ DO: Strong Password Practices

\`\`\`javascript
// Good practices
const bestPractices = {
  // Use long, random passwords
  length: "16+ characters",
  
  // Use cryptographically secure random generation
  randomness: "Use crypto.randomBytes() or secrets module",
  
  // Different password for each account
  uniqueness: "Password manager for storage",
  
  // Regular updates for critical accounts
  updates: "Change when compromised",
  
  // Enable two-factor authentication
  twoFactor: "Add extra security layer",
  
  // Use password manager
  manager: "Generate and store passwords securely"
};
\`\`\`

### ❌ DON'T: Weak Password Practices

\`\`\`javascript
// Bad practices to avoid
const badPractices = {
  shortPasswords: "8 characters or less",
  dictionaryWords: "Common words or phrases", 
  personalInfo: "Names, dates, addresses",
  patterns: "Sequential or repeated characters (123456, abcdef)",
  reuse: "Same password across accounts",
  storage: "Writing down or sharing",
  predictable: "Keyboard patterns (qwerty, asdfgh)",
  common: "Common passwords (password, admin, letmein)"
};
\`\`\`

### Common Passwords to Avoid

\`\`\`
Top 100 Most Common Passwords (NEVER USE):

1. 123456         21. master        41. killer       61. george
2. password       22. monkey        42. gaming       62. australia
3. 12345678       23. letmein       43. cheese       63. 666666
4. qwerty         24. dragon        44. computer     64. 7777777
5. 123456789      25. 111111        45. pizza         65. magic
6. 12345          26. bassman        46. freedom       66. shadow
7. 111111         27. shadows        47. hunter2       67. 123123
8. 1234567        28. passkey        48. whatever      68. etc.
9. sunshine       29. football       49. password1     69. 654321
10. qwerty        30. iloveyou       50. qazwsx        70. supermaster
11. princess      31. admin          51. 777777        71. 12345
12. admin         32. welcome        52. 121212        72. freedom
13. welcome       33. login          53. 000000        73. whatever
14. football      34. passw0rd       54. aaaaaa        74. password123
15. iloveyou      35. charlie        55. 123321        75. 1q2w3e4r
16. 1234567890    36. mustang        56. qwerty123    76. qwertyuiop
17. abc123456     37. password123    57. !@#$%^&*      77. asdfghjkl
18. chocolate     38. michael        58. jennifer      78. zxcvbnm
19. myshadow      39. orange         59. justin        79. 1q2w3e4r5t
20. sophie        40. access         60. daniel        80. qwerty12345
\`\`\`

## Advanced Security Considerations

### Password Entropy Calculator

\`\`\`javascript
function calculateEntropy(password) {
  const charset = new Set(password);
  const length = password.length;
  
  // Determine character set size
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
  
  // Calculate entropy in bits
  const entropy = Math.log2(Math.pow(charsetSize, length));
  
  return {
    length,
    charsetSize,
    entropy: Math.round(entropy * 100) / 100,
    strength: getStrengthRating(entropy),
    crackTime: estimateCrackTime(entropy)
  };
}

function getStrengthRating(entropy) {
  if (entropy < 28) return { label: "Very Weak", color: "red", score: 1 };
  if (entropy < 36) return { label: "Weak", color: "orange", score: 2 };
  if (entropy < 60) return { label: "Fair", color: "yellow", score: 3 };
  if (entropy < 80) return { label: "Strong", color: "green", score: 4 };
  if (entropy < 100) return { label: "Very Strong", color: "darkgreen", score: 5 };
  return { label: "Excellent", color: "green", score: 6 };
}

function estimateCrackTime(entropy) {
  // Assuming 100 billion guesses/second (modern GPU rig)
  const guessesPerSecond = 1e11;
  const totalGuesses = Math.pow(2, entropy);
  const seconds = totalGuesses / guessesPerSecond / 2; // Average case
  
  if (seconds < 1) return "Instantly";
  if (seconds < 60) return Math.round(seconds) + " seconds";
  if (seconds < 3600) return Math.round(seconds / 60) + " minutes";
  if (seconds < 86400) return Math.round(seconds / 3600) + " hours";
  if (seconds < 31536000) return Math.round(seconds / 86400) + " days";
  if (seconds < 31536000 * 100) return Math.round(seconds / 31536000) + " years";
  return "Centuries";
}

// Usage
const result = calculateEntropy("Tr0ub4dor&3");
console.log(result);
// { length: 11, charsetSize: 71, entropy: 70.5, strength: {...}, crackTime: "19 hours" }
\`\`\`

## Common Attack Vectors

### Dictionary Attacks

**How they work:**
- Try common passwords and words
- Use variations (capitalization, numbers, symbols)
- Leverage leaked password databases
- Use probabilistic context-free grammars

**Protection:**
- Avoid dictionary words
- Use random generation
- Implement rate limiting
- Use CAPTCHA after failed attempts

\`\`\`
Dictionary Attack Effectiveness:
- Top 100 passwords: < 1 second
- Top 1,000 passwords: < 1 second  
- Top 10,000 passwords: ~1 second
- Dictionary with variations: Hours to days
- Full dictionary + rules: Days to weeks
\`\`\`

### Brute Force Attacks

**How they work:**
- Try all possible character combinations
- Systematic approach based on entropy
- GPU-accelerated cracking
- Distributed computing attacks

**Protection:**
- Increase password length (exponential protection)
- Use complex character sets
- Implement account lockouts
- Use account compromise detection

\`\`\`
Brute Force Time Estimates (100 billion guesses/second):

Entropy    | Characters to Try      | Time to Crack
-----------|------------------------|------------------
30 bits    | 1 billion             | 10 seconds
40 bits    | 1 trillion            | 2 hours
50 bits    | 1 quadrillion         | 4 days
60 bits    | 1 quintillion         | 1 year
70 bits    | 1 sextillion          | 115 years
80 bits    | 1 septillion          | 11,000 years
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
    'd8578edf8458ce06fbc5bb76a58c5ca4': 'qwerty',
    '21232f297a57a5a743894a0e4a801fc3': 'admin'
}

def crack_md5(hash_value):
    return rainbow_table.get(hash_value, "Not found in rainbow table")

print(crack_md5('098f6bcd4621d373cade4e832627b4f6'))  # "test"
print(crack_md5('e99a18c428cb38d5f260853678922e03'))  # "secret"
\`\`\`

## Password Storage and Management

### Hashing and Salting

\`\`\`javascript
// Secure password hashing (Node.js with bcrypt)
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

// Usage
const password = "mySecurePassword123!";
const hashedPassword = await hashPassword(password);
const isValid = await verifyPassword(password, hashedPassword);
console.log(isValid); // true

// Argon2 (modern alternative)
const argon2 = require('argon2');

async function hashPasswordArgon2(password) {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 3,
      parallelism: 4
    });
    return hash;
  } catch (err) {
    console.error('Argon2 error:', err);
  }
}

async function verifyPasswordArgon2(password, hash) {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    return false;
  }
}
\`\`\`

### Password Managers

**Recommended Features:**

| Feature | Importance | Description |
|---------|------------|-------------|
| **Strong master password** | Required | The only password you need to remember |
| **Cross-device sync** | High | Access passwords everywhere |
| **Auto-fill** | High | Convenience without security compromise |
| **Breach monitoring** | Medium | Alert when passwords are compromised |
| **Two-factor auth** | High | Additional security layer |
| **Secure sharing** | Medium | Share credentials safely |
| **Audit log** | Low | Track password access |
| **Password generator** | High | Built-in secure generator |

**Popular Password Managers:**

| Manager | Type | Notable Features |
|---------|------|------------------|
| **Bitwarden** | Open source | Free tier, self-hosting option |
| **1Password** | Commercial | Travel mode, Watchtower |
| **LastPass** | Commercial | Free tier, auto-fill |
| **Dashlane** | Commercial | VPN included, dark web monitoring |
| **KeePassXC** | Open source | Offline, self-hosted |
| **Enpass** | Commercial | One-time purchase, offline |

### Password Manager Integration

\`\`\`javascript
// Browser Password API (limited support)
async function savePasswordToBrowser(service, username, password) {
  if (!window.PasswordCredential) {
    console.log('Password Credential API not supported');
    return false;
  }
  
  const credential = new PasswordCredential({
    id: username,
    name: username,
    password: password,
    iconURL: 'https://' + service + '/favicon.ico'
  });
  
  try {
    // Note: This requires user interaction
    return await navigator.credentials.store(credential);
  } catch (error) {
    console.error('Failed to save password:', error);
    return false;
  }
}

// Web API for password generation (modern browsers)
function generateBrowserPassword() {
  // Uses browser's built-in password generator
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  
  return password;
}
\`\`\`

## Password Generation in Different Languages

### Java

\`\`\`java
import java.security.SecureRandom;
import java.util.Random;

public class PasswordGenerator {
    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String DIGITS = "0123456789";
    private static final String SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    private static final String AMBIGUOUS = "0O1lI|";
    
    private static final SecureRandom RANDOM = new SecureRandom();
    
    public static String generatePassword(int length, boolean uppercase, 
                                         boolean lowercase, boolean digits, 
                                         boolean symbols, boolean excludeAmbiguous) {
        StringBuilder charset = new StringBuilder();
        
        if (uppercase) charset.append(UPPERCASE);
        if (lowercase) charset.append(LOWERCASE);
        if (digits) charset.append(DIGITS);
        if (symbols) charset.append(SYMBOLS);
        
        if (excludeAmbiguous) {
            StringBuilder filtered = new StringBuilder();
            for (char c : charset.toString().toCharArray()) {
                if (AMBIGUOUS.indexOf(c) == -1) {
                    filtered.append(c);
                }
            }
            charset = filtered;
        }
        
        if (charset.length() == 0) {
            throw new IllegalArgumentException("At least one character type must be selected");
        }
        
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(charset.charAt(RANDOM.nextInt(charset.length())));
        }
        
        return password.toString();
    }
    
    public static String generatePassphrase(int wordCount, boolean capitalize) {
        String[] wordlist = {
            "abacus", "abdomen", "abolish", "abstract", "academy", "accent", "accident",
            "account", "achieve", "acoustic", "acquire", "across", "action", "actress",
            "adapt", "address", "adjust", "admit", "adobe", "adopt", "advance", "advice"
            // ... full EFF wordlist would have 7776 words
        };
        
        StringBuilder passphrase = new StringBuilder();
        for (int i = 0; i < wordCount; i++) {
            String word = wordlist[RANDOM.nextInt(wordlist.length)];
            if (capitalize && RANDOM.nextBoolean()) {
                word = word.substring(0, 1).toUpperCase() + word.substring(1);
            }
            if (i > 0) passphrase.append(" ");
            passphrase.append(word);
        }
        
        return passphrase.toString();
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
    "strings"
)

const (
    lowercase = "abcdefghijklmnopqrstuvwxyz"
    uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    digits    = "0123456789"
    symbols   = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    ambiguous = "0O1lI|"
)

func generatePassword(length int, uppercase, lowercase, digits, symbols, excludeAmbiguous bool) (string, error) {
    charset := ""
    
    if uppercase {
        charset += uppercase
    }
    if lowercase {
        charset += lowercase
    }
    if digits {
        charset += digits
    }
    if symbols {
        charset += symbols
    }
    
    if excludeAmbiguous {
        filtered := ""
        for _, c := range charset {
            if !strings.ContainsRune(ambiguous, c) {
                filtered += string(c)
            }
        }
        charset = filtered
    }
    
    if charset == "" {
        return "", fmt.Errorf("at least one character type must be selected")
    }
    
    charsetLen := big.NewInt(int64(len(charset)))
    password := make([]byte, length)
    
    for i := range password {
        randomIndex, err := rand.Int(rand.Reader, charsetLen)
        if err != nil {
            return "", err
        }
        password[i] = charset[randomIndex.Int64()]
    }
    
    return string(password), nil
}

func main() {
    // Generate a strong password
    password, err := generatePassword(16, true, true, true, true, true)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Generated password:", password)
    
    // Generate a passphrase
    passphrase, err := generatePassphrase(4, true)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Generated passphrase:", passphrase)
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
    symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
    noDictionary: !isCommonPassword(password),
    noSequential: !hasSequentialChars(password),
    noRepeated: !hasRepeatedChars(password),
    noKeyboardPatterns: !hasKeyboardPatterns(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  const strength = getStrengthLabel(score);
  
  return { 
    checks, 
    score, 
    strength,
    entropy: calculateEntropy(password)
  };
}

function isCommonPassword(password) {
  const common = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'monkey', 'letmein', 'dragon', '111111', 'baseball',
    'iloveyou', 'trustno1', 'sunshine', 'master', 'welcome',
    'shadow', 'ashley', 'football', 'jesus', 'michael'
  ];
  return common.includes(password.toLowerCase());
}

function hasSequentialChars(password) {
  const sequences = '0123456789abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < password.length - 2; i++) {
    const seq = password.toLowerCase().substring(i, i + 3);
    if (sequences.includes(seq) || sequences.split('').reverse().join('').includes(seq)) {
      return true;
    }
  }
  return false;
}

function hasRepeatedChars(password) {
  const regex = new RegExp('(.)\\1\\1'); // Same character 3 times in a row
  return regex.test(password);
}

function hasKeyboardPatterns(password) {
  const patterns = ['qwerty', 'asdfgh', 'zxcvbn', '1234qwer', 'qwer1234'];
  return patterns.some(p => password.toLowerCase().includes(p));
}

function getStrengthLabel(score) {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong', 'Excellent'];
  return labels[Math.min(score, labels.length - 1)];
}
\`\`\`

### API Integration

\`\`\`javascript
// Check password against breach database (HaveIBeenPwned API)
// WARNING: This sends partial hash, not the actual password

async function checkPasswordBreach(password) {
  // SHA-1 hash the password
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(function(b) {
    return b.toString(16).padStart(2, '0');
  }).join('').toUpperCase();
  
  // Send first 5 characters to HIBP API
  const prefix = hashHex.substring(0, 5);
  const suffix = hashHex.substring(5);
  
  try {
    var response = await fetch('https://api.pwnedpasswords.com/range/' + prefix);
    var text = await response.text();
    
    // Parse response
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var parts = lines[i].split(':');
      if (parts[0].trim() === suffix) {
        return { pwned: true, count: parseInt(parts[1].trim()) };
      }
    }
    
    return { pwned: false, count: 0 };
  } catch (error) {
    console.error('Error checking password:', error);
    return { error: true };
  }
}

// Usage
checkPasswordBreach('password123').then(function(result) {
  if (result.pwned) {
    console.log('⚠️ This password has been seen ' + result.count + ' times in data breaches!');
  } else {
    console.log('✓ Password not found in known breaches');
  }
});
\`\`\`

## Common Mistakes and Solutions

### 1. Using Predictable Patterns

**Problem:** \`Password123!\`, \`Admin2024\`

**Solution:** Use truly random generation

\`\`\`javascript
// ❌ Wrong - predictable patterns
const weakPassword = 'Password' + year + '!'; // Admin2024!

// ✅ Correct - cryptographically random
const strongPassword = generateSecurePassword(16);
\`\`\`

### 2. Reusing Passwords

**Problem:** Same password across multiple accounts

**Solution:** Unique password for every account + password manager

\`\`\`javascript
// ❌ Wrong - password reuse
const passwords = {
  gmail: 'MySecretPass123!',
  facebook: 'MySecretPass123!',  // Same!
  twitter: 'MySecretPass123!'    // Same!
};

// ✅ Correct - unique passwords
const passwords = {
  gmail: generateSecurePassword(16),
  facebook: generateSecurePassword(16),
  twitter: generateSecurePassword(16)
};

// Store in password manager, not in code!
\`\`\`

### 3. Poor Storage

**Problem:** Writing passwords on paper, storing in text files

**Solution:** Use encrypted password managers

\`\`\`javascript
// ❌ Wrong - insecure storage
const passwords = {
  email: 'MyPassword123',
  bank: 'BankPassword456'
};
// Storing in plain text file, notes, or code

// ✅ Correct - password manager
// Use Bitwarden, 1Password, LastPass, etc.
// Never store passwords in plain text
\`\`\`

### 4. Ignoring Updates

**Problem:** Never changing compromised passwords

**Solution:** Regular password audits and updates

\`\`\`python
# Password audit script
import hashlib

def audit_passwords(passwords, breach_api):
    """Audit passwords against breach database."""
    issues = []
    
    for service, password in passwords.items():
        # Check for weak password
        if len(password) < 12:
            issues.append(f"{service}: Password too short")
        
        # Check for common patterns
        if password.isdigit():
            issues.append(f"{service}: Only numbers")
        
        # Check breach database (pseudocode)
        if breach_api.is_pwned(password):
            issues.append(f"{service}: Password found in data breach!")
    
    return issues

# Regular audit
def schedule_audit(passwords):
    """Run password audit monthly."""
    import schedule
    import time
    
    schedule.every().month.do(lambda: print(audit_passwords(passwords)))
    while True:
        schedule.run_pending()
        time.sleep(86400)
\`\`\`

## Tools and Resources

Use our **Password Generator** tool to create cryptographically secure passwords with customizable options. The tool generates passwords using secure random number generators and provides entropy calculations.

### Recommended Tools:

| Tool | Type | Purpose |
|------|------|---------|
| **Password Generators** | Online/Offline | Create secure passwords |
| **Password Managers** | App/Extension | Store and autofill passwords |
| **Strength Checkers** | Online | Analyze password strength |
| **Breach Monitoring** | Online | Check if password is compromised |
| **Password Auditors** | Script | Audit password practices |
| **2FA Apps** | Mobile/Desktop | Two-factor authentication |

### Security Resources:

\`\`\`
Recommended Reading:
- NIST Special Publication 800-63B (Digital Identity Guidelines)
- OWASP Authentication Cheat Sheet
- EFF's Guide to Passwords (https://ssd.eff.org)
- HaveIBeenPwned (https://haveibeenpwned.com)

Tools:
- HIBP API: https://api.pwnedpasswords.com
- EFF Wordlist: https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases
- NIST SP 800-63B: https://pages.nist.gov/800-63-3/sp800-63b.html
\`\`\`

## Conclusion

Strong password generation is fundamental to digital security. Modern best practices emphasize length, randomness, and uniqueness over complexity rules.

### Key Takeaways:

- ✅ **Length matters most**: 16+ characters recommended
- ✅ **Use random generation**: Cryptographically secure methods
- ✅ **One password per account**: Never reuse passwords
- ✅ **Use password managers**: Secure storage and generation
- ✅ **Enable 2FA**: Additional security layer
- ✅ **Check for breaches**: Use HIBP to check compromised passwords
- ✅ **Passphrases are good**: Easier to remember, harder to crack

### Quick Reference:

\`\`\`
Password Strength Checklist:

✓ Length: 12+ characters (16+ recommended)
✓ Random: Use cryptographically secure random
✓ Unique: Different password for each account
✓ Stored: Password manager (not in code/notes)
✓ Updated: Change when compromised
✓ Protected: Enable 2FA on important accounts
✓ Checked: Verify against breach databases

Common Mistakes to Avoid:
✗ Using personal info (names, dates, pets)
✗ Sequential characters (123456, abcdef)
✗ Common words (password, admin, welcome)
✗ Keyboard patterns (qwerty, asdfgh)
✗ Reusing passwords across accounts
✗ Writing passwords in plain text
✗ Ignoring password breach alerts
\`\`\`

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
