export const uuidGenerator = {
  "uuidGenerator.title": "UUID-Generator",
  "uuidGenerator.description":
    "Generieren Sie RFC4122-konforme UUIDs (v4, v7, v1) mit anpassbaren Optionen",
  "uuidGenerator.pageTitle": "UUID-Generator",
  "uuidGenerator.pageSubtitle":
    "Generieren Sie universell eindeutige Bezeichner sofort",
  "uuidGenerator.generate": "UUID generieren",
  "uuidGenerator.generateBtn": "UUID generieren",
  "uuidGenerator.regenerate": "Neu generieren",
  "uuidGenerator.version": "Version",
  "uuidGenerator.format": "Format",
  "uuidGenerator.count": "Anzahl",
  "uuidGenerator.outputLabel": "Generierte UUID",
  "uuidGenerator.outputPlaceholder":
    "Klicken Sie auf generieren, um eine UUID zu erstellen...",
  "uuidGenerator.bulk": "Massen-Generierung",
  "uuidGenerator.generateMultiple": "Mehrere generieren",
  "uuidGenerator.bulkPlaceholder": "Generierte UUIDs werden hier angezeigt...",
  "uuidGenerator.error.generating": "Fehler beim Generieren der UUID",

  // Options
  "uuidGenerator.option.v4": "UUID v4 (Zufällig)",
  "uuidGenerator.option.v7": "UUID v7 (Zeitstempel)",
  "uuidGenerator.option.v1": "UUID v1 (Zeitbasiert)",
  "uuidGenerator.option.standard": "Standard (mit Bindestrichen)",
  "uuidGenerator.option.withoutHyphens": "Ohne Bindestriche",
  "uuidGenerator.option.uppercase": "Großbuchstaben",
  "uuidGenerator.option.braces": "Mit geschweiften Klammern",

  // Examples
  "uuidGenerator.examplesTitle": "UUID Beispiele",
  "uuidGenerator.examplesDesc":
    'Verschiedene UUID-Versionen und Formate für verschiedene Anwendungsfälle. Klicken Sie auf "Schnell ausführen" zum Generieren oder "Kopieren" zum Kopieren einer UUID:',
  "uuidGenerator.example.v4.title": "UUID v4 (Zufällig)",
  "uuidGenerator.example.v4.desc": "Am häufigsten für allgemeine Zwecke",
  "uuidGenerator.example.v7.title": "UUID v7 (Zeitstempel)",
  "uuidGenerator.example.v7.desc": "Sortierbar nach Erstellungszeit",
  "uuidGenerator.example.v1.title": "UUID v1 (Zeitbasiert)",
  "uuidGenerator.example.v1.desc": "Enthält Zeitstempel-Informationen",
  "uuidGenerator.example.noHyphens.title": "UUID ohne Bindestriche",
  "uuidGenerator.example.noHyphens.desc": "Kompaktes Format für URLs",
  "uuidGenerator.example.uppercase.title": "UUID Großbuchstaben",
  "uuidGenerator.example.uppercase.desc": "All-Caps-Format",
  "uuidGenerator.example.braces.title": "UUID mit geschweiften Klammern",
  "uuidGenerator.example.braces.desc": "In geschweiften Klammern eingewickelt",

  // SEO Content
  "uuidGenerator.whatIsUuidTitle": "Was ist UUID?",
  "uuidGenerator.whatIsUuidDesc":
    '<strong className="text-foreground">UUID (Universally Unique Identifier)</strong> ist eine 128-Bit-Kennung, die garantiert eindeutig ist, sowohl zeitlich als auch räumlich. UUIDs werden häufig in verteilten Systemen, Datenbanken und Anwendungen verwendet, wo eindeutige Identifikation ohne zentrale Koordination erforderlich ist.',

  "uuidGenerator.techDetailsTitle": "Technische Implementierungsdetails",
  "uuidGenerator.tech.webCrypto":
    '<strong>Web Crypto API:</strong> Verwendet <code className="bg-background px-1 rounded">crypto.getRandomValues()</code> für kryptographisch sichere Zufallszahlen-Generierung',
  "uuidGenerator.tech.v4Struct":
    '<strong>UUID v4 Struktur:</strong> <code className="bg-background px-1 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> wobei x zufällige Hex, 4 Version anzeigt, y ist Variante (8, 9, a, oder b)',
  "uuidGenerator.tech.v7Struct":
    "<strong>UUID v7 Struktur:</strong> Erste 48 Bits sind Unix-Zeitstempel in Millisekunden, gefolgt von Versionsbits (0111), dann zufällige Daten mit Variantbits",
  "uuidGenerator.tech.bitManip":
    '<strong>Bit-Manipulation:</strong> <code className="bg-background px-1 rounded">bytes[6] = (bytes[6] & 0x0f) | 0x40</code> setzt Version 4, <code className="bg-background px-1 rounded">bytes[8] = (bytes[8] & 0x3f) | 0x80</code> setzt RFC4122-Variante',
  "uuidGenerator.tech.collision":
    "<strong>Kollisions-Wahrscheinlichkeit:</strong> Mit 122 zufälligen Bits in v4, Wahrscheinlichkeit von Kollision ist ~1 in 2,71 Quintillion",

  "uuidGenerator.featuresTitle": "Hauptmerkmale",
  "uuidGenerator.feature.rfc.title": "RFC4122-konform",
  "uuidGenerator.feature.rfc.desc": "Standard UUID v1, v4 und v7 Unterstützung",
  "uuidGenerator.feature.formats.title": "Mehrere Formate",
  "uuidGenerator.feature.formats.desc":
    "Standard, Großbuchstaben, Klammern und mehr",
  "uuidGenerator.feature.bulk.title": "Massen-Generierung",
  "uuidGenerator.feature.bulk.desc":
    "Generieren Sie Tausende von UUIDs auf einmal",
  "uuidGenerator.feature.privacy.title": "100% Privat",
  "uuidGenerator.feature.privacy.desc":
    "Alle Verarbeitung geschieht in Ihrem Browser",

  "uuidGenerator.comparisonTitle": "UUID-Versionen-Vergleich",
  "uuidGenerator.comparison.version": "Version",
  "uuidGenerator.comparison.method": "Generierungsmethode",
  "uuidGenerator.comparison.sortable": "Sortierbar",
  "uuidGenerator.comparison.bestFor": "Am besten für",
  "uuidGenerator.comparison.v1.method": "Zeitstempel + MAC-Adresse",
  "uuidGenerator.comparison.v1.sortable": "Teilweise",
  "uuidGenerator.comparison.v1.bestFor": "Legacy-Systeme (Privacy-Bedenken)",
  "uuidGenerator.comparison.v4.method": "Zufällig (122 Bits)",
  "uuidGenerator.comparison.v4.sortable": "Nein",
  "uuidGenerator.comparison.v4.bestFor": "Allgemeine Zwecke, am häufigsten",
  "uuidGenerator.comparison.v7.method": "Unix-Zeitstempel + zufällig",
  "uuidGenerator.comparison.v7.sortable": "Ja",
  "uuidGenerator.comparison.v7.bestFor":
    "Datenbank-PKs, zeitlich geordnete Daten",

  "uuidGenerator.useCasesTitle": "Häufige Anwendungsfälle",
  "uuidGenerator.useCase.db":
    "Datenbank-Primärschlüssel in verteilten Systemen",
  "uuidGenerator.useCase.session":
    "Session-Identifikatoren und Authentifizierungs-Token",
  "uuidGenerator.useCase.distributed":
    "Verteilte Transaktions-IDs über Microservices",
  "uuidGenerator.useCase.files":
    "Dateien- und Ressourcenbenennung ohne Kollision",
  "uuidGenerator.useCase.queue": "Message-Queue-Deduplizierung-Schlüssel",

  "uuidGenerator.faqTitle": "Häufig gestellte Fragen",
  "uuidGenerator.faq.q1": "Was ist der Unterschied zwischen UUID-Versionen?",
  "uuidGenerator.faq.a1":
    "v4 verwendet zufällige Generierung, v7 enthält Zeitstempel für besseres Sortieren, v1 verwendet MAC-Adresse und Zeitstempel (für Privacy veraltet).",
  "uuidGenerator.faq.q2": "Sind UUIDs wirklich eindeutig?",
  "uuidGenerator.faq.a2":
    "Ja, die Wahrscheinlichkeit, doppelte UUIDs zu generieren, ist extrem niedrig. Für v4 ist die Kollisionswahrscheinlichkeit für praktische Zwecke vernachlässigbar.",
  "uuidGenerator.faq.q3": "Kann ich UUIDs als Primärschlüssel verwenden?",
  "uuidGenerator.faq.a3":
    "Absolut! UUIDs sind ausgezeichnet für verteilte Systeme, wo zentrale ID-Generierung nicht praktikabel ist.",
};
