export const md5Generator = {
  "md5Generator.title": "Generador de Hash MD5",
  "md5Generator.description":
    "Genera valores hash MD5 a partir de texto o archivos para checksums y verificación",
  "md5Generator.pageTitle": "Generador de Hash MD5",
  "md5Generator.pageSubtitle":
    "Genera hash MD5 para cadenas de texto al instante",
  "md5Generator.inputLabel": "Texto de Entrada",
  "md5Generator.inputPlaceholder": "Introduce texto para generar hash MD5...",
  "md5Generator.outputLabel": "Hash MD5",
  "md5Generator.outputPlaceholder": "El hash MD5 aparecerá aquí...",
  "md5Generator.generate": "Generar MD5",
  "md5Generator.uppercase": "Mayúsculas",
  "md5Generator.lowercase": "Minúsculas",
  "md5Generator.bit32": "32-bit",
  "md5Generator.bit16": "16-bit (Medio)",
  "md5Generator.examples": "Ejemplos",
  "md5Generator.examplesHint": "Haz clic en un ejemplo para cargarlo:",
  "md5Generator.examples.simpleText": "Texto Simple",
  "md5Generator.examples.password": "Hash de Contraseña",
  "md5Generator.examples.fileChecksum": "Checksum de Archivo",
  "md5Generator.error.generating": "Error generando hash MD5",

  "md5Generator.fileUpload": "Subida de Archivo",
  "md5Generator.fileUpload.title": "Subir Archivo",
  "md5Generator.fileUpload.click": "Haz clic para subir archivo",
  "md5Generator.fileUpload.hint": "Máx 10MB • Solo archivos de texto",
  "md5Generator.fileUpload.uploaded": "Subido: {name}",
  "md5Generator.mode.single": "Modo Individual",
  "md5Generator.mode.batch": "Modo Lote",
  "md5Generator.batchInput": "Entrada de Lote",
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

  "md5Generator.faq.title": "Preguntas Frecuentes",
  "md5Generator.faq.q1":
    "¿Cuál es la diferencia entre MD5 de 32 bits y 16 bits?",
  "md5Generator.faq.a1":
    "MD5 de 32 bits es el hash completo (32 caracteres hexadecimales). MD5 de 16 bits toma los 16 caracteres intermedios del hash completo, a veces usado para checksums más cortos.",
  "md5Generator.faq.q2": "¿Es MD5 seguro para contraseñas?",
  "md5Generator.faq.a2":
    "MD5 solo no se recomienda para el almacenamiento de contraseñas debido a vulnerabilidades conocidas. Usa algoritmos modernos como bcrypt o Argon2 para la seguridad de contraseñas.",
  "md5Generator.faq.q3": "¿Mis datos están seguros al usar esta herramienta?",
  "md5Generator.faq.a3":
    "Sí, todo el proceso de hash MD5 ocurre localmente en tu navegador. Tus datos nunca se envían a ningún servidor.",
};
