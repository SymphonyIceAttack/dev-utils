export const base64Encoder = {
  "base64Encoder.title": "Base64-Kodierer",
  "base64Encoder.description":
    "Base64-Text online mit Echtzeit-Konvertierung kodieren und dekodieren",
  "base64Encoder.pageTitle": "Base64-Kodierer & -Dekodierer",
  "base64Encoder.pageSubtitle":
    "Text zu Base64 kodieren oder Base64 zu Text dekodieren",
  "base64Encoder.inputLabel": "Eingabetext",
  "base64Encoder.inputLabelBase64": "Eingabe-Base64",
  "base64Encoder.outputPlaceholder":
    "Konvertierter Text wird hier angezeigt...",
  "base64Encoder.inputPlaceholder": "Geben Sie hier Ihren Text ein...",
  "base64Encoder.inputPlaceholderBase64": "Geben Sie hier Ihre Base64 ein...",
  "base64Encoder.encode": "Kodieren",
  "base64Encoder.decode": "Dekodieren",
  "base64Encoder.swap": "Tauschen",
  "base64Encoder.encodeBtn": "Zu Base64 kodieren",
  "base64Encoder.decodeBtn": "Von Base64 dekodieren",
  "base64Encoder.examples": "Beispiele",
  "base64Encoder.examplesHint":
    "Klicken Sie auf ein Beispiel, um es in den Konverter zu laden:",
  "base64Encoder.examples.simpleText": "Einfacher Text",
  "base64Encoder.examples.chineseText": "Chinesischer Text",
  "base64Encoder.examples.urlData": "URL-Daten",
  "base64Encoder.examples.jsonData": "JSON-Daten",
  "base64Encoder.error.encoding": "Error encoding text to Base64",
  "base64Encoder.error.decoding": "Error decoding Base64 text",

  "base64Encoder.techTitle": "Technical Implementation Details",
  "base64Encoder.tech.dataUri":
    "<strong>Data URI Scheme:</strong> <code>data:image/png;base64,iVBORw0KGgo...</code> - Used for embedding images directly in HTML/CSS",
  "base64Encoder.tech.email":
    "<strong>Email Attachments:</strong> binary MIME encoding for attachments in email systems (SMTP)",
  "base64Encoder.tech.db":
    "<strong>Database Storage:</strong> Converting BLOBs to TEXT columns while preserving binary integrity",
  "base64Encoder.tech.jwt":
    "<strong>JWT Tokens:</strong> Payload section in JSON Web Tokens for API authentication",
  "base64Encoder.tech.api":
    "<strong>API Responses:</strong> Serializing complex objects for JSON API responses",

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
  "base64Encoder.seo.title": "Was ist Base64-Kodierung?",
  "base64Encoder.seo.description":
    '<strong className="text-foreground">Base64-Kodierung</strong> ist ein Binär-zu-Text-Kodierungsschema, das Binärdaten in ein ASCII-Zeichenkettenformat konvertiert. Es wird häufig verwendet, um Binärdaten zu kodieren, die über Medien gespeichert und übertragen werden müssen, die für den Umgang mit Textdaten konzipiert sind. Unser kostenloses Online-Base64-Kodierer/Dekodierer-Tool verarbeitet die Text- und Binärdatenkonvertierung sofort.',
  "base64Encoder.seo.techImplTitle": "🔧 Technische Implementierung",
  "base64Encoder.seo.techImplDesc":
    'Unser Base64-Kodierer verwendet die eingebauten JavaScript-Funktionen <code className="bg-background px-1 rounded">btoa()</code> und <code className="bg-background px-1 rounded">atob()</code> mit richtiger Unicode-Behandlung über <code className="bg-background px-1 rounded">encodeURIComponent()</code> für internationale Zeichen. Der Algorithmus ordnet jeweils 3 Bytes Binärdaten 4 Base64-Zeichen zu, unter Verwendung eines 64-Zeichen-Alphabets (A-Z, a-z, 0-9, +, /) mit Auffüllung (=) für unvollständige Byte-Gruppen.',

  "base64Encoder.seo.featuresTitle": "Hauptfunktionen",
  "base64Encoder.seo.feature1.title": "Sofortige Konvertierung",
  "base64Encoder.seo.feature1.desc": "Echtzeit-Kodierung und -Dekodierung",
  "base64Encoder.seo.feature2.title": "Unicode-Unterstützung",
  "base64Encoder.seo.feature2.desc":
    "Verarbeitet alle Zeichen, einschließlich Chinesisch und Emoji",
  "base64Encoder.seo.feature3.title": "URL-Sicher",
  "base64Encoder.seo.feature3.desc": "Kompatibel mit Web-Standards",
  "base64Encoder.seo.feature4.title": "100% Privat",
  "base64Encoder.seo.feature4.desc":
    "Alle Verarbeitungen erfolgen lokal im Browser",
  "base64Encoder.seo.howToUseTitle": "Verwendung",
  "base64Encoder.seo.howToUse1":
    "Geben Sie Ihren Text oder Base64-Daten in das Eingabefeld ein",
  "base64Encoder.seo.howToUse2":
    "Wählen Sie den Kodierungs- oder Dekodierungsmodus und klicken Sie auf die Konvertieren-Schaltfläche",
  "base64Encoder.seo.howToUse3": "Kopieren Sie das Ergebnis mit einem Klick",

  "base64Encoder.faqTitle": "Häufig Gestellte Fragen",
  "base64Encoder.faq.q1": "Was ist Base64-Kodierung?",
  "base64Encoder.faq.a1":
    "Base64 ist ein Binär-zu-Text-Kodierungsschema, das Binärdaten in einem ASCII-String-Format darstellt. Es wird häufig verwendet, um Binärdaten über Systeme zu übertragen, die zuverlässig nur Text verarbeiten können, wie E-Mail oder bestimmte Web-APIs.",
  "base64Encoder.faq.q2": "Ist dieses Base64-Tool kostenlos?",
  "base64Encoder.faq.a2":
    "Ja, dieser Base64-Kodierer und -Dekodierer ist vollständig kostenlos. Keine Anmeldung erforderlich. Ihre Daten werden lokal in Ihrem Browser für maximale Privatsphäre und Sicherheit verarbeitet.",
  "base64Encoder.faq.q3": "Kann ich Base64 offline kodieren und dekodieren?",
  "base64Encoder.faq.a3":
    "Ja, unser Base64-Tool funktioniert vollständig offline. Die gesamte Kodierung und Dekodierung erfolgt in Ihrem Browser mit JavaScript, sodass Sie es ohne Internetverbindung verwenden können.",
  "base64Encoder.faq.q4":
    "Sind meine Daten sicher bei der Verwendung dieses Tools?",
  "base64Encoder.faq.a4":
    "Absolut. Die gesamte Base64-Kodierung und -Dekodierung erfolgt lokal in Ihrem Browser. Ihre Daten werden niemals an einen Server gesendet oder irgendwo gespeichert, um vollständige Privatsphäre und Sicherheit zu gewährleisten.",

  // Real-World Scenarios
  "base64Encoder.scenarios.title": "Praktische Szenarien",
  "base64Encoder.scenarios.scenario1.title": "E-Mail-Anhang-Ersatz",
  "base64Encoder.scenarios.scenario1.desc":
    "Ein Entwickler muss ein kleines Symbol in eine E-Mail aufnehmen, möchte aber Anhangsbeschränkungen vermeiden.",
  "base64Encoder.scenarios.scenario1.problem": "📧 Problem:",
  "base64Encoder.scenarios.scenario1.problemDesc":
    "E-Mail-Server blockiert Anhänge oder Empfänger hat Größenbeschränkungen",
  "base64Encoder.scenarios.scenario1.solution": "🔧 Base64-Lösung:",
  "base64Encoder.scenarios.scenario1.solutionDesc":
    "Konvertieren Sie ein kleines Symbol (logo.png) zu Base64 und betten Sie es in eine HTML-E-Mail ein",
  "base64Encoder.scenarios.scenario1.result":
    "Ergebnis: Die E-Mail zeigt das Symbol an, ohne externe Dateianhänge zu erfordern.",
  "base64Encoder.scenarios.scenario2.title": "API-Authentifizierungstoken",
  "base64Encoder.scenarios.scenario2.desc":
    "Ein mobiler App-Entwickler muss Benutzeranmeldeinformationen für die Basisauthentifizierung in API-Anfragen kodieren.",
  "base64Encoder.scenarios.scenario2.credentials":
    "🔐 Benutzeranmeldeinformationen:",
  "base64Encoder.scenarios.scenario2.encoded": "🔑 Base64-kodiert:",
  "base64Encoder.scenarios.scenario2.header": "📡 API-Anfrage-Header:",
  "base64Encoder.scenarios.scenario2.result":
    "Ergebnis: Anmeldeinformationen werden sicher für die HTTP-Basisauthentifizierung kodiert.",
  "base64Encoder.scenarios.scenario3.title": "JSON-Daten mit binärem Inhalt",
  "base64Encoder.scenarios.scenario3.desc":
    "Ein Backend-Entwickler muss eine kleine PDF-Datei in einem JSON-Datenbankfeld speichern.",
  "base64Encoder.scenarios.scenario3.binary": "📄 Binärdaten:",
  "base64Encoder.scenarios.scenario3.binaryDesc":
    "document.pdf (45 KB) - Binärformat nicht JSON-kompatibel",
  "base64Encoder.scenarios.scenario3.encoding": "🔄 Base64-Kodierung:",
  "base64Encoder.scenarios.scenario3.storage": "💾 JSON-Speicherung:",
  "base64Encoder.scenarios.scenario3.result":
    "Ergebnis: Binärer PDF-Inhalt wird jetzt als Text im JSON-Datenbankfeld gespeichert.",

  // Step-by-Step Guide
  "base64Encoder.guide.title": "Base64-Kodierung verwenden",
  "base64Encoder.guide.step1.title": "Kodieren oder dekodieren wählen",
  "base64Encoder.guide.step1.desc":
    "Wählen Sie 'Kodieren', um Text/Binärdaten in Base64 zu konvertieren, oder 'Dekodieren', um Base64 zurück in das Originalformat zu konvertieren.",
  "base64Encoder.guide.step2.title": "Daten eingeben",
  "base64Encoder.guide.step2.desc":
    "Geben Sie Text ein oder laden Sie eine Datei (Bilder, Dokumente) hoch, die Sie kodieren oder dekodieren möchten.",
  "base64Encoder.guide.step3.title": "Ergebnis generieren",
  "base64Encoder.guide.step3.desc":
    "Klicken Sie auf die Konvertieren-Schaltfläche, um das Base64-kodierte oder -dekodierte Ergebnis sofort zu sehen.",
  "base64Encoder.guide.step4.title": "Kopieren und implementieren",
  "base64Encoder.guide.step4.desc":
    "Kopieren Sie das Ergebnis zur Verwendung in Ihren Anwendungen, APIs, E-Mail-Vorlagen oder Datenspeicherung.",
};
