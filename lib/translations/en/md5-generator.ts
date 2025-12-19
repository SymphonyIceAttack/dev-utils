export const md5Generator = {
  "md5Generator.title": "MD5 Hash Generator",
  "md5Generator.description":
    "Generate MD5 hash values from text or files for checksums and verification",
  "md5Generator.pageTitle": "MD5 Hash Generator",
  "md5Generator.pageSubtitle": "Generate MD5 hash for text strings instantly",
  "md5Generator.inputLabel": "Input Text",
  "md5Generator.inputPlaceholder": "Enter text to generate MD5 hash...",
  "md5Generator.outputLabel": "MD5 Hash",
  "md5Generator.outputPlaceholder": "MD5 hash will appear here...",
  "md5Generator.generate": "Generate MD5",
  "md5Generator.uppercase": "Uppercase",
  "md5Generator.lowercase": "Lowercase",
  "md5Generator.bit32": "32-bit",
  "md5Generator.bit16": "16-bit (Middle)",
  "md5Generator.examples": "Examples",
  "md5Generator.examplesHint": "Click on an example to load it:",
  "md5Generator.examples.simpleText": "Simple Text",
  "md5Generator.examples.password": "Password Hash",
  "md5Generator.examples.fileChecksum": "File Checksum",
  "md5Generator.error.generating": "Error generating MD5 hash",

  "md5Generator.fileUpload": "File Upload",
  "md5Generator.fileUpload.title": "Upload File",
  "md5Generator.fileUpload.click": "Click to upload file",
  "md5Generator.fileUpload.hint": "Max 10MB • Text files only",
  "md5Generator.fileUpload.uploaded": "Uploaded: {name}",
  "md5Generator.mode.single": "Single Mode",
  "md5Generator.mode.batch": "Batch Mode",
  "md5Generator.batchInput": "Batch Input",
  "md5Generator.batchOutput": "Batch Output",
  "md5Generator.addRow": "Add Row",
  "md5Generator.copyAll": "Copy All",
  "md5Generator.batchPlaceholder":
    "Batch results will appear here...\nYour MD5 hashes\nwill be displayed here.",
  "md5Generator.exampleInputs": "Example Inputs",
  "md5Generator.loadExample": "Load Example Only",

  // SEO Content
  "md5Generator.seo.title": "What is MD5 Hashing? How is it Implemented?",
  "md5Generator.seo.desc":
    '<strong className="text-foreground">MD5 (Message-Digest Algorithm 5)</strong> is a widely used cryptographic hash function that produces a 128-bit (16-byte) hash value, typically expressed as a 32-character hexadecimal number. Our implementation uses pure JavaScript with bitwise operations, performing 4 rounds of 16 operations each on 512-bit data blocks.',

  "md5Generator.tech.title": "Technical Implementation",
  "md5Generator.tech.coreTitle": "Core Functions:",
  "md5Generator.tech.coreList1": "F(x,y,z) = (x ∧ y) ∨ (¬x ∧ z) - Round 1",
  "md5Generator.tech.coreList2": "G(x,y,z) = (x ∧ z) ∨ (y ∧ ¬z) - Round 2",
  "md5Generator.tech.coreList3": "H(x,y,z) = x ⊕ y ⊕ z - Round 3",
  "md5Generator.tech.coreList4": "I(x,y,z) = y ⊕ (x ∨ ¬z) - Round 4",
  "md5Generator.tech.stepsTitle": "Processing Steps:",
  "md5Generator.tech.stepsList1":
    "1. Message preprocessing (padding and length appending)",
  "md5Generator.tech.stepsList2": "2. Divide message into 512-bit blocks",
  "md5Generator.tech.stepsList3":
    "3. Process each block through 4 rounds of 16 operations",
  "md5Generator.tech.stepsList4":
    "4. Use 32-bit arithmetic and bitwise operations",
  "md5Generator.tech.stepsList5":
    "5. Combine results to produce final 128-bit hash",

  "md5Generator.features.title": "Key Features",
  "md5Generator.feature.checksums.title": "File Checksums",
  "md5Generator.feature.checksums.desc": "Generate MD5 for files up to 10MB",
  "md5Generator.feature.batch.title": "Batch Processing",
  "md5Generator.feature.batch.desc": "Hash multiple strings simultaneously",
  "md5Generator.feature.upload.title": "File Upload",
  "md5Generator.feature.upload.desc": "Drag & drop files for instant hashing",
  "md5Generator.feature.privacy.title": "100% Private",
  "md5Generator.feature.privacy.desc": "All processing happens in your browser",

  "md5Generator.useCases.title": "Common Use Cases & Usage Boundaries",
  "md5Generator.useCases.item1": "File integrity verification and checksums",
  "md5Generator.useCases.boundary1":
    "✅ Suitable - Perfect for detecting accidental file corruption during transmission",
  "md5Generator.useCases.item2": "Database password storage (with salt)",
  "md5Generator.useCases.boundary2":
    "⚠️ Not recommended - Use bcrypt, Argon2, or scrypt instead",
  "md5Generator.useCases.item3": "Generating unique identifiers",
  "md5Generator.useCases.boundary3":
    "⚠️ Use with caution - Consider UUID v4 for better uniqueness guarantees",
  "md5Generator.useCases.item4": "Detecting duplicate files",
  "md5Generator.useCases.boundary4":
    "✅ Suitable - Good for non-critical duplicate detection in local systems",
  "md5Generator.useCases.item5": "API signature verification",
  "md5Generator.useCases.boundary5":
    "❌ Not secure - Vulnerable to collision attacks, use HMAC with SHA-256",

  "md5Generator.faq.title": "Frequently Asked Questions",
  "md5Generator.faq.q1":
    "What is the difference between 32-bit and 16-bit MD5?",
  "md5Generator.faq.a1":
    "32-bit MD5 is the full hash (32 hex characters). 16-bit MD5 takes the middle 16 characters of the full hash, sometimes used for shorter checksums.",
  "md5Generator.faq.q2": "Is MD5 secure for passwords?",
  "md5Generator.faq.a2":
    "MD5 alone is not recommended for password hashing due to known vulnerabilities. Use modern algorithms like bcrypt or Argon2 for password security.",
  "md5Generator.faq.q3": "Is my data secure when using this tool?",
  "md5Generator.faq.a3":
    "Yes, all MD5 hashing happens locally in your browser. Your data is never sent to any server.",
};
