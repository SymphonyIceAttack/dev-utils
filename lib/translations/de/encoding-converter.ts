export const encodingConverter = {
  "encodingConverter.title": "Zeichenkodierung-Konverter",
  "encodingConverter.description":
    "Text zwischen verschiedenen Zeichenkodierungen wie UTF-8, GBK, ISO-8859-1 konvertieren",
  "encodingConverter.pageTitle": "Zeichenkodierung-Konverter",
  "encodingConverter.pageSubtitle":
    "Text zwischen UTF-8, GBK und anderen Kodierungen konvertieren",
  "encodingConverter.inputLabel": "Eingabetext",
  "encodingConverter.inputPlaceholder": "Geben oder fügen Sie hier Text ein...",
  "encodingConverter.outputLabel": "Konvertierte Ausgabe",
  "encodingConverter.outputPlaceholder":
    "Konvertierter Text wird hier angezeigt...",
  "encodingConverter.sourceEncoding": "Quellkodierung",
  "encodingConverter.targetEncoding": "Zielkodierung",
  "encodingConverter.convert": "Konvertieren",
  "encodingConverter.autoDetect": "Automatische Erkennung",
  "encodingConverter.hexView": "Hex-Ansicht",
  "encodingConverter.textView": "Text-Ansicht",
  "encodingConverter.examples": "Beispiele",
  "encodingConverter.examplesHint":
    "Klicken Sie auf ein Beispiel, um es zu laden:",
  "encodingConverter.examples.chinese": "Chinesischer Text",
  "encodingConverter.examples.japanese": "Japanischer Text",
  "encodingConverter.examples.mixed": "Gemischter Inhalt",
  "encodingConverter.error.converting":
    "Fehler beim Konvertieren der Kodierung",
  "encodingConverter.error.invalidInput":
    "Ungültige Eingabe für ausgewählte Kodierung",

  // Encoding names for dropdowns
  "encodingConverter.encodings.utf8": "UTF-8",
  "encodingConverter.encodings.utf16": "UTF-16",
  "encodingConverter.encodings.ascii": "ASCII",
  "encodingConverter.encodings.iso88591": "ISO-8859-1",
  "encodingConverter.encodings.hex": "Hexadezimal",
  "encodingConverter.encodings.binary": "Binär",
  "encodingConverter.encodings.unicodeEscape": "Unicode-Escape",

  // SEO Content
  "encodingConverter.seo.title":
    "Was ist Zeichenkodierung? Wie funktioniert sie?",
  "encodingConverter.seo.description":
    '<strong className="text-foreground">Zeichenkodierung</strong> ist ein System, das Zeichen zur Speicherung und Übertragung auf Bytes abbildet. Unsere Implementierung verwendet die integrierten TextEncoder/TextDecoder-APIs von JavaScript mit benutzerdefinierten Handlern für Hex-, Binär- und Unicode-Escape-Formate. Verschiedene Kodierungen wie UTF-8, GBK und ISO-8859-1 stellen Zeichen unterschiedlich dar, was zu "Mojibake" (verzerrtem Text) führen kann, wenn Daten mit der falschen Kodierung dekodiert werden.',

  "encodingConverter.techTitle": "Technische Implementierung",
  "encodingConverter.tech.coreLogic": "Kernkonvertierungslogik:",
  "encodingConverter.tech.logic1":
    "TextEncoder/TextDecoder für UTF-8/UTF-16-Verarbeitung",
  "encodingConverter.tech.logic2":
    "Benutzerdefinierte Hex/Binär-Konvertierung mit ordnungsgemäßer Byte-Ausrichtung",
  "encodingConverter.tech.logic3":
    "Unicode-Escape-Sequenz-Parsing (\\uXXXX-Format)",
  "encodingConverter.tech.logic4":
    "Surrogate-Pair-Behandlung für Emojis (0x10000-0x10FFFF)",
  "encodingConverter.tech.logic5":
    "Zeichen-für-Zeichen-Verarbeitung mit Fehlerwiederherstellung",

  "encodingConverter.tech.supported": "Unterstützte Kodierungen:",
  "encodingConverter.tech.utf8":
    "UTF-8: 1-4 Bytes pro Zeichen, rückwärtskompatibel mit ASCII",
  "encodingConverter.tech.utf16":
    "UTF-16: 2 oder 4 Bytes pro Zeichen (BMP + Surrogate-Pairs)",
  "encodingConverter.tech.ascii":
    "ASCII: 7-Bit-Kodierung (0-127), Untermenge von UTF-8",
  "encodingConverter.tech.iso":
    "ISO-8859-1: 8-Bit-Kodierung für westeuropäische Sprachen",
  "encodingConverter.tech.hex":
    "Hex: Zweistellige hexadezimale Darstellung jedes Bytes",
  "encodingConverter.tech.binary":
    "Binär: 8-Bit-Binärdarstellung, getrennt durch Leerzeichen",

  "encodingConverter.featuresTitle": "Hauptmerkmale",
  "encodingConverter.feature.multi.title": "Mehrfach-Kodierung",
  "encodingConverter.feature.multi.desc":
    "Unterstützung für UTF-8, GBK, Latin-1 und mehr",
  "encodingConverter.feature.realtime.title": "Echtzeit-Konvertierung",
  "encodingConverter.feature.realtime.desc":
    "Sofortige Vorschau während der Eingabe",
  "encodingConverter.feature.format.title": "Formatunterstützung",
  "encodingConverter.feature.format.desc":
    "Text-, Hex-, Base64- und Unicode-Formate",
  "encodingConverter.feature.privacy.title": "100% Privat",
  "encodingConverter.feature.privacy.desc":
    "Alle Verarbeitung erfolgt in Ihrem Browser",

  "encodingConverter.useCasesTitle": "Häufige Anwendungsfälle und Verwendung",
  "encodingConverter.useCase.garbled":
    "Behebung von verzerrtem Text durch falsche Kodierung",
  "encodingConverter.useCase.garbledDesc":
    "✅ Wesentlich - Häufigster Anwendungsfall zur Wiederherstellung lesbaren Textes",
  "encodingConverter.useCase.gbk":
    "Konvertierung von Legacy-GBK-Daten zu UTF-8",
  "encodingConverter.useCase.gbkDesc":
    "✅ Empfohlen - UTF-8 ist der Web-Standard und am kompatibelsten",
  "encodingConverter.useCase.debug": "Debugging von Zeichenkodierungsproblemen",
  "encodingConverter.useCase.debugDesc":
    "✅ Perfekt - Hex-Ansicht hilft bei der Identifizierung von Kodierungsproblemen",
  "encodingConverter.useCase.hex": "Anzeige der Hex-Darstellung von Text",
  "encodingConverter.useCase.hexDesc":
    "✅ Nützlich - Debugging- und Datenanalyse-Anwendungen",
  "encodingConverter.useCase.unicode":
    "Konvertierung zwischen Unicode-Formaten",
  "encodingConverter.useCase.unicodeDesc":
    "⚠️ Kontextabhängig - Stellen Sie sicher, dass das Zielsystem das Format unterstützt",

  "encodingConverter.faqTitle": "Häufig gestellte Fragen",
  "encodingConverter.faq.q1":
    "Was ist der Unterschied zwischen UTF-8 und UTF-16?",
  "encodingConverter.faq.a1":
    "UTF-8 verwendet 1-4 Bytes pro Zeichen und ist rückwärtskompatibel mit ASCII. UTF-16 verwendet 2 oder 4 Bytes. UTF-8 ist im Web häufiger, während UTF-16 intern von Windows und Java verwendet wird.",
  "encodingConverter.faq.q2": "Wie behebe ich verzerrten chinesischen Text?",
  "encodingConverter.faq.a2":
    "Verzerrtes Chinesisch bedeutet normalerweise, dass der Text in GBK kodiert, aber als UTF-8 dekodiert wurde (oder umgekehrt). Versuchen Sie die Konvertierung von der ursprünglichen Kodierung zu UTF-8.",
  "encodingConverter.faq.q3": "Sind meine Daten sicher?",
  "encodingConverter.faq.a3":
    "Ja, alle Kodierungskonvertierung erfolgt lokal in Ihrem Browser. Ihre Daten werden niemals an einen Server gesendet.",
};
