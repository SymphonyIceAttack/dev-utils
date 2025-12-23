export const md5Generator = {
  "md5Generator.title": "Générateur de Hash MD5",
  "md5Generator.description":
    "Générez des valeurs de hash MD5 à partir de texte ou de fichiers pour les checksums et la vérification",
  "md5Generator.pageTitle": "Générateur de Hash MD5",
  "md5Generator.pageSubtitle":
    "Générez un hash MD5 pour des chaînes de texte instantanément",
  "md5Generator.inputLabel": "Texte d'Entrée",
  "md5Generator.inputPlaceholder":
    "Entrez du texte pour générer un hash MD5...",
  "md5Generator.outputLabel": "Hash MD5",
  "md5Generator.outputPlaceholder": "Le hash MD5 apparaîtra ici...",
  "md5Generator.generate": "Générer MD5",
  "md5Generator.uppercase": "Majuscules",
  "md5Generator.lowercase": "Minuscules",
  "md5Generator.bit32": "32-bit",
  "md5Generator.bit16": "16-bit (Milieu)",
  "md5Generator.examples": "Exemples",
  "md5Generator.examplesHint": "Cliquez sur un exemple pour le charger:",
  "md5Generator.examples.simpleText": "Texte Simple",
  "md5Generator.examples.password": "Hash de Mot de Passe",
  "md5Generator.examples.fileChecksum": "Checksum de Fichier",
  "md5Generator.error.generating": "Erreur lors de la génération du hash MD5",

  "md5Generator.fileUpload": "Téléversement de Fichier",
  "md5Generator.fileUpload.title": "Téléverser un Fichier",
  "md5Generator.fileUpload.click": "Cliquez pour téléverser un fichier",
  "md5Generator.fileUpload.hint": "Max 10MB • Fichiers texte uniquement",
  "md5Generator.fileUpload.uploaded": "Téléversé: {name}",
  "md5Generator.mode.single": "Mode Simple",
  "md5Generator.mode.batch": "Mode Lot",
  "md5Generator.batchInput": "Entrée de Lot",
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

  "md5Generator.faq.title": "Questions Fréquemment Posées",
  "md5Generator.faq.q1": "Quelle est la différence entre MD5 32-bit et 16-bit?",
  "md5Generator.faq.a1":
    "MD5 32-bit est le hash complet (32 caractères hexadécimaux). MD5 16-bit prend les 16 caractères du milieu du hash complet, parfois utilisé pour des checksums plus courts.",
  "md5Generator.faq.q2": "MD5 est-il sécurisé pour les mots de passe?",
  "md5Generator.faq.a2":
    "MD5 seul n'est pas recommandé pour le hashage de mots de passe en raison de vulnérabilités connues. Utilisez des algorithmes modernes comme bcrypt ou Argon2 pour la sécurité des mots de passe.",
  "md5Generator.faq.q3":
    "Mes données sont-elles sécurisées lors de l'utilisation de cet outil?",
  "md5Generator.faq.a3":
    "Oui, tout le hashage MD5 se fait localement dans votre navigateur. Vos données ne sont jamais envoyées à un serveur.",
};
