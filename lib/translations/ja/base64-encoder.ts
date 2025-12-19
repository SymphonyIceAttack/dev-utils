export const base64Encoder = {
  "base64Encoder.title": "Base64 エンコーダー",
  "base64Encoder.description":
    "テキストをBase64でエンコード・デコード、リアルタイム変換",
  "base64Encoder.pageTitle": "Base64 エンコーダー＆デコーダー",
  "base64Encoder.pageSubtitle":
    "テキストをBase64にエンコードまたはBase64をテキストにデコード",
  "base64Encoder.inputLabel": "入力テキスト",
  "base64Encoder.inputLabelBase64": "入力Base64",
  "base64Encoder.outputPlaceholder":
    "変換されたテキストがここに表示されます...",
  "base64Encoder.inputPlaceholder": "ここにテキストを入力してください...",
  "base64Encoder.inputPlaceholderBase64": "ここにBase64を入力してください...",
  "base64Encoder.encode": "エンコード",
  "base64Encoder.decode": "デコード",
  "base64Encoder.swap": "入れ替え",
  "base64Encoder.encodeBtn": "Base64にエンコード",
  "base64Encoder.decodeBtn": "Base64からデコード",
  "base64Encoder.examples": "例",
  "base64Encoder.examplesHint": "例をクリックしてコンバーターに読み込みます:",
  "base64Encoder.examples.simpleText": "シンプルなテキスト",
  "base64Encoder.examples.chineseText": "中国語テキスト",
  "base64Encoder.examples.urlData": "URLデータ",
  "base64Encoder.examples.jsonData": "JSONデータ",
  "base64Encoder.error.encoding": "テキストをBase64にエンコードエラー",
  "base64Encoder.error.decoding": "Base64テキストのデコードエラー",

  "base64Encoder.techTitle": "技術実装詳細",
  "base64Encoder.tech.dataUri":
    "<strong>データURIスキーム:</strong> <code>data:image/png;base64,iVBORw0KGgo...</code> - HTML/CSSに画像を直接埋め込むために使用",
  "base64Encoder.tech.email":
    "<strong>メール添付:</strong> メールシステム（SMTP）の添付ファイル用のバイナリMIMEエンコーディング",
  "base64Encoder.tech.db":
    "<strong>データベース保存:</strong> バイナリ整合性を保ちながらBLOBをTEXT列に変換",
  "base64Encoder.tech.jwt":
    "<strong>JWTトークン:</strong> API認証用のJSON Web Tokensのパayloadセクション",
  "base64Encoder.tech.api":
    "<strong>API応答:</strong> JSON API応答のための複雑なオブジェクトのシリアライズ",

  "base64Encoder.featuresTitle": "Key Features",
  "base64Encoder.feature.textBinary.title": "Text & Binary",
  "base64Encoder.feature.textBinary.desc":
    "Encode/decode both text strings and binary files",
  "base64Encoder.feature.urlSafe.title": "URL Safe",
  "base64Encoder.feature.urlSafe.desc":
    "Generate URL-safe Base64 encoding variants",
  "base64Encoder.feature.fileSupport.title": "File Support",
  "base64Encoder.feature.fileSupport.desc":
    "Upload and encode image and document files",
  "base64Encoder.feature.privacy.title": "100% Private",
  "base64Encoder.feature.privacy.desc":
    "All processing happens locally in your browser",

  "base64Encoder.useCasesTitle": "Common Use Cases",
  "base64Encoder.useCase.images": "Embedding images in HTML and CSS files",
  "base64Encoder.useCase.email":
    "Encoding data for email and text transmission",
  "base64Encoder.useCase.db": "Storing binary data in databases",
  "base64Encoder.useCase.auth": "API authentication and token handling",
  "base64Encoder.useCase.serialization":
    "Data serialization for web applications",

  "base64Encoder.limitsTitle": "Usage Limits & Best Practices",
  "base64Encoder.limits.limitations": "⚠️ Limitations",
  "base64Encoder.limits.sizeIncrease":
    "Increases data size by ~33% (4 chars per 3 bytes)",
  "base64Encoder.limits.largeFiles":
    "Not suitable for large files (use binary protocols instead)",
  "base64Encoder.limits.notEncryption":
    "Not encryption - easily reversible, don't use for sensitive data",
  "base64Encoder.limits.browserMemory":
    "Browser memory limits for very large inputs",

  "base64Encoder.limits.bestPractices": "✅ Best Practices",
  "base64Encoder.limits.smallBinary":
    "Use for small binary data (images, files < 10MB)",
  "base64Encoder.limits.compression":
    "Combine with compression (gzip) for efficiency",
  "base64Encoder.limits.urlSafe":
    "Use URL-safe Base64 (+/-) for web applications",
  "base64Encoder.limits.validation":
    "Always validate Base64 input before decoding",

  "base64Encoder.security.title": "🔒 Security Note",
  "base64Encoder.security.desc":
    "Base64 is NOT encryption. It provides no security or privacy. Only use for data format conversion, never for protecting sensitive information. For encryption, use proper cryptographic algorithms like AES.",

  // SEO Content
  "base64Encoder.seo.title": "What is Base64 Encoding?",
  "base64Encoder.seo.description":
    '<strong className="text-foreground">Base64 encoding</strong> is a binary-to-text encoding scheme that converts binary data into ASCII string format. It\'s widely used for encoding binary data that needs to be stored and transferred over media designed to deal with textual data. Our free online Base64 encoder/decoder tool handles text and binary data conversion instantly.',
  "base64Encoder.seo.techImplTitle": "🔧 Technical Implementation",
  "base64Encoder.seo.techImplDesc":
    'Our Base64 encoder uses JavaScript\'s built-in <code className="bg-background px-1 rounded">btoa()</code> and <code className="bg-background px-1 rounded">atob()</code> functions with proper Unicode handling via <code className="bg-background px-1 rounded">encodeURIComponent()</code> for international characters. The algorithm maps every 3 bytes of binary data to 4 Base64 characters using a 64-character alphabet (A-Z, a-z, 0-9, +, /) with padding (=) for incomplete byte groups.',

  "base64Encoder.seo.featuresTitle": "Key Features",
  "base64Encoder.seo.feature1.title": "Instant Conversion",
  "base64Encoder.seo.feature1.desc": "Real-time encoding and decoding",
  "base64Encoder.seo.feature2.title": "Unicode Support",
  "base64Encoder.seo.feature2.desc":
    "Handle any character including Chinese, emoji",
  "base64Encoder.seo.feature3.title": "URL Safe",
  "base64Encoder.seo.feature3.desc": "Compatible with web standards",
  "base64Encoder.seo.feature4.title": "100% Private",
  "base64Encoder.seo.feature4.desc":
    "All processing happens locally in browser",
  "base64Encoder.seo.howToUseTitle": "How to Use",
  "base64Encoder.seo.howToUse1":
    "Enter your text or Base64 data in the input field",
  "base64Encoder.seo.howToUse2":
    "Choose encode or decode mode and click the convert button",
  "base64Encoder.seo.howToUse3": "Copy the result with one click",

  "base64Encoder.faqTitle": "Frequently Asked Questions",
  "base64Encoder.faq.q1": "What is Base64 encoding?",
  "base64Encoder.faq.a1":
    "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to transmit binary data over systems that can only reliably handle text, such as email or certain web APIs.",
  "base64Encoder.faq.q2": "Is this Base64 tool free to use?",
  "base64Encoder.faq.a2":
    "Yes, this Base64 encoder and decoder is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy and security.",
  "base64Encoder.faq.q3": "Can I encode and decode Base64 offline?",
  "base64Encoder.faq.a3":
    "Yes, our Base64 tool works completely offline. All encoding and decoding happens in your browser using JavaScript, so you can use it without an internet connection.",
  "base64Encoder.faq.q4": "Is my data secure when using this tool?",
  "base64Encoder.faq.a4":
    "Absolutely. All Base64 encoding and decoding happens locally in your browser. Your data is never sent to any server or stored anywhere, ensuring complete privacy and security.",

  // Real-World Scenarios
  "base64Encoder.scenarios.title": "Real-World Scenarios",
  "base64Encoder.scenarios.scenario1.title": "Email Attachment Replacement",
  "base64Encoder.scenarios.scenario1.desc":
    "Developer needs to include a small icon in an email but wants to avoid attachment limitations.",
  "base64Encoder.scenarios.scenario1.problem": "📧 Problem:",
  "base64Encoder.scenarios.scenario1.problemDesc":
    "Email server blocks attachments or recipient has size limitations",
  "base64Encoder.scenarios.scenario1.solution": "🔧 Base64 Solution:",
  "base64Encoder.scenarios.scenario1.solutionDesc":
    "Convert small icon (logo.png) to Base64 and embed in HTML email",
  "base64Encoder.scenarios.scenario1.result":
    "Result: Email displays the icon without requiring external file attachments.",
  "base64Encoder.scenarios.scenario2.title": "API Authentication Token",
  "base64Encoder.scenarios.scenario2.desc":
    "Mobile app developer needs to encode user credentials for Basic Authentication in API requests.",
  "base64Encoder.scenarios.scenario2.credentials": "🔐 User Credentials:",
  "base64Encoder.scenarios.scenario2.encoded": "🔑 Base64 Encoded:",
  "base64Encoder.scenarios.scenario2.header": "📡 API Request Header:",
  "base64Encoder.scenarios.scenario2.result":
    "Result: Credentials are safely encoded for HTTP Basic Authentication.",
  "base64Encoder.scenarios.scenario3.title": "JSON Data with Binary Content",
  "base64Encoder.scenarios.scenario3.desc":
    "Backend developer needs to store a small PDF file in a JSON database field.",
  "base64Encoder.scenarios.scenario3.binary": "📄 Binary Data:",
  "base64Encoder.scenarios.scenario3.binaryDesc":
    "document.pdf (45 KB) - binary format not JSON-compatible",
  "base64Encoder.scenarios.scenario3.encoding": "🔄 Base64 Encoding:",
  "base64Encoder.scenarios.scenario3.storage": "💾 JSON Storage:",
  "base64Encoder.scenarios.scenario3.result":
    "Result: Binary PDF content is now stored as text in the JSON database field.",

  // Step-by-Step Guide
  "base64Encoder.guide.title": "How to Use Base64 Encoding",
  "base64Encoder.guide.step1.title": "Choose Encode or Decode",
  "base64Encoder.guide.step1.desc":
    "Select 'Encode' to convert text/binary to Base64, or 'Decode' to convert Base64 back to original format.",
  "base64Encoder.guide.step2.title": "Enter Your Data",
  "base64Encoder.guide.step2.desc":
    "Type text or upload a file (images, documents) that you want to encode or decode.",
  "base64Encoder.guide.step3.title": "Generate Result",
  "base64Encoder.guide.step3.desc":
    "Click the convert button to instantly see the Base64 encoded or decoded result.",
  "base64Encoder.guide.step4.title": "Copy & Implement",
  "base64Encoder.guide.step4.desc":
    "Copy the result for use in your applications, APIs, email templates, or data storage.",
};
