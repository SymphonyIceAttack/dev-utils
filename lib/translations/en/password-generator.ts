export const passwordGenerator = {
  "passwordGenerator.title": "Password Generator",
  "passwordGenerator.description":
    "Generate secure random passwords and API keys with customizable options",
  "passwordGenerator.pageTitle": "Password & Key Generator",
  "passwordGenerator.pageSubtitle":
    "Generate secure random passwords, API keys, and tokens",
  "passwordGenerator.outputLabel": "Generated Password",
  "passwordGenerator.outputPlaceholder":
    "Click generate to create a password...",
  "passwordGenerator.generate": "Generate",
  "passwordGenerator.regenerate": "Regenerate",
  "passwordGenerator.length": "Length",
  "passwordGenerator.options": "Options",
  "passwordGenerator.uppercase": "Uppercase (A-Z)",
  "passwordGenerator.lowercase": "Lowercase (a-z)",
  "passwordGenerator.numbers": "Numbers (0-9)",
  "passwordGenerator.symbols": "Symbols (!@#$%...)",
  "passwordGenerator.excludeAmbiguous": "Exclude Ambiguous (0, O, l, 1, I)",
  "passwordGenerator.strength": "Strength",
  "passwordGenerator.strength.weak": "Weak",
  "passwordGenerator.strength.fair": "Fair",
  "passwordGenerator.strength.good": "Good",
  "passwordGenerator.strength.strong": "Strong",
  "passwordGenerator.strength.veryStrong": "Very Strong",
  "passwordGenerator.presets": "Presets",
  "passwordGenerator.preset.pin": "PIN (4 digits)",
  "passwordGenerator.preset.simple": "Simple (8 chars)",
  "passwordGenerator.preset.secure": "Secure (16 chars)",
  "passwordGenerator.preset.apiKey": "API Key (32 chars)",
  "passwordGenerator.preset.uuid": "UUID-style",
  "passwordGenerator.bulk": "Bulk Generate",
  "passwordGenerator.bulkCount": "Count",
  "passwordGenerator.error.generating": "Error generating password",

  "passwordGenerator.mode.label": "Generation Mode",
  "passwordGenerator.mode.random": "Random",
  "passwordGenerator.mode.passphrase": "Passphrase",
  "passwordGenerator.passphrase.words": "Words",
  "passwordGenerator.passphrase.separator": "Separator",
  "passwordGenerator.passphrase.separator.hyphen": "Hyphen (-)",
  "passwordGenerator.passphrase.separator.underscore": "Underscore (_)",
  "passwordGenerator.passphrase.separator.space": "Space",
  "passwordGenerator.passphrase.separator.period": "Period (.)",
  "passwordGenerator.passphrase.separator.none": "None",
  "passwordGenerator.option.additional": "Additional Options",
  "passwordGenerator.option.capitalize": "Capitalize Words",

  "passwordGenerator.output.generated": "Generated Passwords",
  "passwordGenerator.output.copyAll": "Copy All",

  "passwordGenerator.presetsTitle": "Password Presets",
  "passwordGenerator.presetsDesc":
    'Pre-configured password settings for different security levels. Click "Quick Run" to generate with preset settings:',
  "passwordGenerator.preset.loadOnly": "Load Preset Only",
  "passwordGenerator.preset.chars": "chars",
  "passwordGenerator.preset.symbols": "Symbols",
  "passwordGenerator.preset.numbers": "Numbers",
  "passwordGenerator.preset.upper": "Upper",

  // SEO Content
  "passwordGenerator.seo.title":
    "Why Use a Password Generator? How Does it Work?",
  "passwordGenerator.seo.desc":
    'Strong, unique passwords are essential for security. This tool uses <strong className="text-foreground">cryptographically secure</strong> random number generation via the Web Crypto API (crypto.getRandomValues) to create passwords that are virtually impossible to guess or crack through brute force. The implementation supports both random character generation and passphrase-based methods.',

  "passwordGenerator.tech.title": "Technical Implementation",
  "passwordGenerator.tech.randomTitle": "Random Password Generation:",
  "passwordGenerator.tech.randomList1":
    "Uses crypto.getRandomValues() for cryptographically secure randomness",
  "passwordGenerator.tech.randomList2":
    "Builds character pools dynamically based on user preferences",
  "passwordGenerator.tech.randomList3":
    "Optional ambiguous character exclusion (0, O, 1, l, I for better readability)",
  "passwordGenerator.tech.randomList4":
    "Uniform distribution ensures each character position is equally likely",
  "passwordGenerator.tech.randomList5":
    "Supports length from 4 to 64 characters with various character types",

  "passwordGenerator.tech.passphraseTitle": "Passphrase Generation:",
  "passwordGenerator.tech.passphraseList1":
    "Dictionary-based selection from 100+ common English words",
  "passwordGenerator.tech.passphraseList2":
    "Each word adds approximately 6.6 bits of entropy",
  "passwordGenerator.tech.passphraseList3":
    "Optional capitalization and number/symbol addition",
  "passwordGenerator.tech.passphraseList4":
    "Customizable separators (hyphen, underscore, space, etc.)",
  "passwordGenerator.tech.passphraseList5":
    "Word count range: 3-8 words for different security levels",

  "passwordGenerator.features.title": "Key Features",
  "passwordGenerator.feature.secure.title": "Cryptographically Secure",
  "passwordGenerator.feature.secure.desc":
    "Uses Web Crypto API for true randomness",
  "passwordGenerator.feature.modes.title": "Multiple Modes",
  "passwordGenerator.feature.modes.desc": "Random passwords and passphrases",
  "passwordGenerator.feature.passphrase.title": "Passphrase Support",
  "passwordGenerator.feature.passphrase.desc":
    "Easy-to-remember word combinations",
  "passwordGenerator.feature.bulk.title": "Bulk Generation",
  "passwordGenerator.feature.bulk.desc": "Generate multiple passwords at once",

  "passwordGenerator.bestPractices.title": "Best Practices & Usage Boundaries",
  "passwordGenerator.bestPractices.item1":
    "Use a unique password for every account",
  "passwordGenerator.bestPractices.boundary1":
    "✅ Critical - Prevents credential stuffing attacks across multiple services",
  "passwordGenerator.bestPractices.item2":
    "Make passwords at least 12-16 characters long",
  "passwordGenerator.bestPractices.boundary2":
    "✅ Recommended - 16+ characters for high-value accounts (banking, email)",
  "passwordGenerator.bestPractices.item3":
    "Include uppercase, lowercase, numbers, and symbols",
  "passwordGenerator.bestPractices.boundary3":
    "✅ Important - Increases entropy and resists dictionary attacks",
  "passwordGenerator.bestPractices.item4":
    "Store passwords in a secure password manager",
  "passwordGenerator.bestPractices.boundary4":
    "✅ Essential - Never reuse passwords or write them down unsecured",
  "passwordGenerator.bestPractices.item5":
    "Enable two-factor authentication when available",
  "passwordGenerator.bestPractices.boundary5":
    "✅ Strongly recommended - Adds critical second layer of security",

  "passwordGenerator.faq.title": "Frequently Asked Questions",
  "passwordGenerator.faq.q1": "Is this password generator secure?",
  "passwordGenerator.faq.a1":
    "Yes! We use the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers. All generation happens locally in your browser.",
  "passwordGenerator.faq.q2": "Are my passwords stored anywhere?",
  "passwordGenerator.faq.a2":
    "No. Generated passwords exist only in your browser and are never sent to any server. Once you close the page, they're gone unless you save them.",
  "passwordGenerator.faq.q3": "What makes a strong password?",
  "passwordGenerator.faq.a3":
    "A strong password is long (16+ characters), uses a mix of character types, is unique to each account, and is random (not based on dictionary words or personal info).",
};
