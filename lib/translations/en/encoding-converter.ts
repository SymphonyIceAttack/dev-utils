export const encodingConverter = {
  "encodingConverter.title": "Character Encoding Converter",
  "encodingConverter.description":
    "Convert text between different character encodings like UTF-8, GBK, ISO-8859-1",
  "encodingConverter.pageTitle": "Character Encoding Converter",
  "encodingConverter.pageSubtitle":
    "Convert text between UTF-8, GBK, and other encodings",
  "encodingConverter.inputLabel": "Input Text",
  "encodingConverter.inputPlaceholder": "Enter or paste text here...",
  "encodingConverter.outputLabel": "Converted Output",
  "encodingConverter.outputPlaceholder": "Converted text will appear here...",
  "encodingConverter.sourceEncoding": "Source Encoding",
  "encodingConverter.targetEncoding": "Target Encoding",
  "encodingConverter.convert": "Convert",
  "encodingConverter.autoDetect": "Auto Detect",
  "encodingConverter.hexView": "Hex View",
  "encodingConverter.textView": "Text View",
  "encodingConverter.examples": "Examples",
  "encodingConverter.examplesHint": "Click on an example to load it:",
  "encodingConverter.examples.chinese": "Chinese Text",
  "encodingConverter.examples.japanese": "Japanese Text",
  "encodingConverter.examples.mixed": "Mixed Content",
  "encodingConverter.error.converting": "Error converting encoding",
  "encodingConverter.error.invalidInput": "Invalid input for selected encoding",

  // Encoding names for dropdowns
  "encodingConverter.encodings.utf8": "UTF-8",
  "encodingConverter.encodings.utf16": "UTF-16",
  "encodingConverter.encodings.ascii": "ASCII",
  "encodingConverter.encodings.iso88591": "ISO-8859-1",
  "encodingConverter.encodings.hex": "Hexadecimal",
  "encodingConverter.encodings.binary": "Binary",
  "encodingConverter.encodings.unicodeEscape": "Unicode Escape",

  // SEO Content
  "encodingConverter.seo.title":
    "What is Character Encoding? How Does it Work?",
  "encodingConverter.seo.description":
    '<strong className="text-foreground">Character encoding</strong> is a system that maps characters to bytes for storage and transmission. Our implementation uses JavaScript\'s built-in TextEncoder/TextDecoder APIs with custom handlers for hex, binary, and Unicode escape formats. Different encodings like UTF-8, GBK, and ISO-8859-1 represent characters differently, which can cause "mojibake" (garbled text) when data is decoded with the wrong encoding.',

  "encodingConverter.techTitle": "Technical Implementation",
  "encodingConverter.tech.coreLogic": "Core Conversion Logic:",
  "encodingConverter.tech.logic1":
    "TextEncoder/TextDecoder for UTF-8/UTF-16 processing",
  "encodingConverter.tech.logic2":
    "Custom hex/binary conversion with proper byte alignment",
  "encodingConverter.tech.logic3":
    "Unicode escape sequence parsing (\\uXXXX format)",
  "encodingConverter.tech.logic4":
    "Surrogate pair handling for emoji (0x10000-0x10FFFF)",
  "encodingConverter.tech.logic5":
    "Character-by-character processing with error recovery",

  "encodingConverter.tech.supported": "Supported Encodings:",
  "encodingConverter.tech.utf8":
    "UTF-8: 1-4 bytes per character, backward compatible with ASCII",
  "encodingConverter.tech.utf16":
    "UTF-16: 2 or 4 bytes per character (BMP + surrogate pairs)",
  "encodingConverter.tech.ascii":
    "ASCII: 7-bit encoding (0-127), subset of UTF-8",
  "encodingConverter.tech.iso":
    "ISO-8859-1: 8-bit encoding for Western European languages",
  "encodingConverter.tech.hex":
    "Hex: Two-digit hexadecimal representation of each byte",
  "encodingConverter.tech.binary":
    "Binary: 8-bit binary representation separated by spaces",

  "encodingConverter.featuresTitle": "Key Features",
  "encodingConverter.feature.multi.title": "Multi-Encoding",
  "encodingConverter.feature.multi.desc":
    "Support for UTF-8, GBK, Latin-1 and more",
  "encodingConverter.feature.realtime.title": "Real-time Conversion",
  "encodingConverter.feature.realtime.desc": "Instant preview as you type",
  "encodingConverter.feature.format.title": "Format Support",
  "encodingConverter.feature.format.desc":
    "Text, Hex, Base64 and Unicode formats",
  "encodingConverter.feature.privacy.title": "100% Private",
  "encodingConverter.feature.privacy.desc":
    "All processing happens in your browser",

  "encodingConverter.useCasesTitle": "Common Use Cases & Usage Boundaries",
  "encodingConverter.useCase.garbled":
    "Fixing garbled text from incorrect encoding",
  "encodingConverter.useCase.garbledDesc":
    "✅ Essential - Most common use case for recovering readable text",
  "encodingConverter.useCase.gbk": "Converting legacy GBK data to UTF-8",
  "encodingConverter.useCase.gbkDesc":
    "✅ Recommended - UTF-8 is the web standard and most compatible",
  "encodingConverter.useCase.debug": "Debugging character encoding issues",
  "encodingConverter.useCase.debugDesc":
    "✅ Perfect - Hex view helps identify encoding problems",
  "encodingConverter.useCase.hex": "Viewing hex representation of text",
  "encodingConverter.useCase.hexDesc":
    "✅ Useful - Debugging and data analysis applications",
  "encodingConverter.useCase.unicode": "Converting between Unicode formats",
  "encodingConverter.useCase.unicodeDesc":
    "⚠️ Context-dependent - Ensure target system supports the format",

  "encodingConverter.faqTitle": "Frequently Asked Questions",
  "encodingConverter.faq.q1":
    "What is the difference between UTF-8 and UTF-16?",
  "encodingConverter.faq.a1":
    "UTF-8 uses 1-4 bytes per character and is backward compatible with ASCII. UTF-16 uses 2 or 4 bytes. UTF-8 is more common on the web, while UTF-16 is used internally by Windows and Java.",
  "encodingConverter.faq.q2": "How do I fix garbled Chinese text?",
  "encodingConverter.faq.a2":
    "Garbled Chinese usually means the text was encoded in GBK but decoded as UTF-8 (or vice versa). Try converting from the original encoding to UTF-8.",
  "encodingConverter.faq.q3": "Is my data secure?",
  "encodingConverter.faq.a3":
    "Yes, all encoding conversion happens locally in your browser. Your data is never sent to any server.",
};
