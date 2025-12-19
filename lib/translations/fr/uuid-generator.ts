export const uuidGenerator = {
  "uuidGenerator.title": "Générateur UUID",
  "uuidGenerator.description":
    "Générez des UUIDs conformes RFC4122 (v4, v7, v1) avec des options personnalisables",
  "uuidGenerator.pageTitle": "Générateur UUID",
  "uuidGenerator.pageSubtitle":
    "Générez des identifiants uniques universels instantanément",
  "uuidGenerator.generate": "Générer UUID",
  "uuidGenerator.generateBtn": "Générer UUID",
  "uuidGenerator.regenerate": "Régénérer",
  "uuidGenerator.version": "Version",
  "uuidGenerator.format": "Format",
  "uuidGenerator.count": "Compteur",
  "uuidGenerator.outputLabel": "UUID Généré",
  "uuidGenerator.outputPlaceholder":
    "Cliquez sur générer pour créer un UUID...",
  "uuidGenerator.bulk": "Génération en Masse",
  "uuidGenerator.generateMultiple": "Générer Multiples",
  "uuidGenerator.bulkPlaceholder": "Les UUIDs générés apparaîtront ici...",
  "uuidGenerator.error.generating": "Erreur lors de la génération UUID",

  // Options
  "uuidGenerator.option.v4": "UUID v4 (Aléatoire)",
  "uuidGenerator.option.v7": "UUID v7 (Horodatage)",
  "uuidGenerator.option.v1": "UUID v1 (Basé sur le temps)",
  "uuidGenerator.option.standard": "Standard (avec tirets)",
  "uuidGenerator.option.withoutHyphens": "Sans tirets",
  "uuidGenerator.option.uppercase": "Majuscules",
  "uuidGenerator.option.braces": "Avec accolades",

  // Examples
  "uuidGenerator.examplesTitle": "UUID Examples",
  "uuidGenerator.examplesDesc":
    'Different UUID versions and formats for various use cases. Click "Quick Run" to generate, or "Copy" to copy a UUID:',
  "uuidGenerator.example.v4.title": "UUID v4 (Random)",
  "uuidGenerator.example.v4.desc": "Most common for general purposes",
  "uuidGenerator.example.v7.title": "UUID v7 (Timestamp)",
  "uuidGenerator.example.v7.desc": "Sortable by creation time",
  "uuidGenerator.example.v1.title": "UUID v1 (Time-based)",
  "uuidGenerator.example.v1.desc": "Contains timestamp info",
  "uuidGenerator.example.noHyphens.title": "UUID without hyphens",
  "uuidGenerator.example.noHyphens.desc": "Compact format for URLs",
  "uuidGenerator.example.uppercase.title": "UUID Uppercase",
  "uuidGenerator.example.uppercase.desc": "All caps format",
  "uuidGenerator.example.braces.title": "UUID with braces",
  "uuidGenerator.example.braces.desc": "Wrapped in curly braces",

  // SEO Content
  "uuidGenerator.whatIsUuidTitle": "What is UUID?",
  "uuidGenerator.whatIsUuidDesc":
    '<strong className="text-foreground">UUID (Universally Unique Identifier)</strong> is a 128-bit identifier that is guaranteed to be unique across both time and space. UUIDs are widely used in distributed systems, databases, and applications where unique identification is required without central coordination.',

  "uuidGenerator.techDetailsTitle": "Technical Implementation Details",
  "uuidGenerator.tech.webCrypto":
    '<strong>Web Crypto API:</strong> Uses <code className="bg-background px-1 rounded">crypto.getRandomValues()</code> for cryptographically secure random number generation',
  "uuidGenerator.tech.v4Struct":
    '<strong>UUID v4 Structure:</strong> <code className="bg-background px-1 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> where x is random hex, 4 indicates version, y is variant (8, 9, a, or b)',
  "uuidGenerator.tech.v7Struct":
    "<strong>UUID v7 Structure:</strong> First 48 bits are Unix timestamp in milliseconds, followed by version bits (0111), then random data with variant bits",
  "uuidGenerator.tech.bitManip":
    '<strong>Bit Manipulation:</strong> <code className="bg-background px-1 rounded">bytes[6] = (bytes[6] & 0x0f) | 0x40</code> sets version 4, <code className="bg-background px-1 rounded">bytes[8] = (bytes[8] & 0x3f) | 0x80</code> sets RFC4122 variant',
  "uuidGenerator.tech.collision":
    "<strong>Collision Probability:</strong> With 122 random bits in v4, probability of collision is ~1 in 2.71 quintillion",

  "uuidGenerator.featuresTitle": "Key Features",
  "uuidGenerator.feature.rfc.title": "RFC4122 Compliant",
  "uuidGenerator.feature.rfc.desc": "Standard UUID v1, v4, and v7 support",
  "uuidGenerator.feature.formats.title": "Multiple Formats",
  "uuidGenerator.feature.formats.desc": "Standard, uppercase, braces, and more",
  "uuidGenerator.feature.bulk.title": "Bulk Generation",
  "uuidGenerator.feature.bulk.desc": "Generate thousands of UUIDs at once",
  "uuidGenerator.feature.privacy.title": "100% Private",
  "uuidGenerator.feature.privacy.desc":
    "All processing happens in your browser",

  "uuidGenerator.comparisonTitle": "UUID Versions Comparison",
  "uuidGenerator.comparison.version": "Version",
  "uuidGenerator.comparison.method": "Generation Method",
  "uuidGenerator.comparison.sortable": "Sortable",
  "uuidGenerator.comparison.bestFor": "Best For",
  "uuidGenerator.comparison.v1.method": "Timestamp + MAC address",
  "uuidGenerator.comparison.v1.sortable": "Partial",
  "uuidGenerator.comparison.v1.bestFor": "Legacy systems (privacy concerns)",
  "uuidGenerator.comparison.v4.method": "Random (122 bits)",
  "uuidGenerator.comparison.v4.sortable": "No",
  "uuidGenerator.comparison.v4.bestFor": "General purpose, most common",
  "uuidGenerator.comparison.v7.method": "Unix timestamp + random",
  "uuidGenerator.comparison.v7.sortable": "Yes",
  "uuidGenerator.comparison.v7.bestFor": "Database PKs, time-ordered data",

  "uuidGenerator.useCasesTitle": "Common Use Cases",
  "uuidGenerator.useCase.db": "Database primary keys in distributed systems",
  "uuidGenerator.useCase.session":
    "Session identifiers and authentication tokens",
  "uuidGenerator.useCase.distributed":
    "Distributed transaction IDs across microservices",
  "uuidGenerator.useCase.files": "File and resource naming without collision",
  "uuidGenerator.useCase.queue": "Message queue deduplication keys",

  "uuidGenerator.faqTitle": "Frequently Asked Questions",
  "uuidGenerator.faq.q1": "What's the difference between UUID versions?",
  "uuidGenerator.faq.a1":
    "v4 uses random generation, v7 includes timestamp for better sorting, v1 uses MAC address and timestamp (deprecated for privacy).",
  "uuidGenerator.faq.q2": "Are UUIDs really unique?",
  "uuidGenerator.faq.a2":
    "Yes, the probability of generating duplicate UUIDs is extremely low. For v4, the chance of collision is negligible for practical purposes.",
  "uuidGenerator.faq.q3": "Can I use UUIDs as primary keys?",
  "uuidGenerator.faq.a3":
    "Absolutely! UUIDs are excellent for distributed systems where centralized ID generation isn't feasible.",
};
