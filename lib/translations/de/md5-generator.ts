export const md5Generator = {
  "md5Generator.title": "MD5-Hash-Generator",
  "md5Generator.description":
    "Generieren Sie MD5-Hash-Werte aus Text oder Dateien für Checksums und Verifikation",
  "md5Generator.pageTitle": "MD5-Hash-Generator",
  "md5Generator.pageSubtitle":
    "Generieren Sie MD5-Hash für Textzeichenfolgen sofort",
  "md5Generator.inputLabel": "Eingabetext",
  "md5Generator.inputPlaceholder":
    "Geben Sie Text ein, um MD5-Hash zu generieren...",
  "md5Generator.outputLabel": "MD5-Hash",
  "md5Generator.outputPlaceholder": "MD5-Hash wird hier angezeigt...",
  "md5Generator.generate": "MD5 generieren",
  "md5Generator.uppercase": "Großbuchstaben",
  "md5Generator.lowercase": "Kleinbuchstaben",
  "md5Generator.bit32": "32-bit",
  "md5Generator.bit16": "16-bit (Mitte)",
  "md5Generator.examples": "Beispiele",
  "md5Generator.examplesHint": "Klicken Sie auf ein Beispiel, um es zu laden:",
  "md5Generator.examples.simpleText": "Einfacher Text",
  "md5Generator.examples.password": "Passwort-Hash",
  "md5Generator.examples.fileChecksum": "Datei-Checksum",
  "md5Generator.error.generating": "Fehler beim Generieren des MD5-Hash",

  "md5Generator.fileUpload": "Datei-Upload",
  "md5Generator.fileUpload.title": "Datei hochladen",
  "md5Generator.fileUpload.click": "Klicken Sie, um Datei hochzuladen",
  "md5Generator.fileUpload.hint": "Max 10MB • Nur Textdateien",
  "md5Generator.fileUpload.uploaded": "Hochgeladen: {name}",
  "md5Generator.mode.single": "Einzelmodus",
  "md5Generator.mode.batch": "Stapelmodus",
  "md5Generator.batchInput": "Stapeleingabe",
  "md5Generator.batchOutput": "Batch Output",
  "md5Generator.addRow": "Add Row",
  "md5Generator.copyAll": "Copy All",
  "md5Generator.batchPlaceholder":
    "Batch results will appear here...\nYour MD5 hashes\nwill be displayed here.",
  "md5Generator.exampleInputs": "Example Inputs",
  "md5Generator.loadExample": "Load Example Only",

  // SEO Content
  "md5Generator.seo.title": "Was ist MD5-Hashing? Wie wird es implementiert?",
  "md5Generator.seo.desc":
    '<strong className="text-foreground">MD5 (Message-Digest Algorithm 5)</strong> ist eine weit verbreitete kryptografische Hash-Funktion, die einen 128-Bit-(16-Byte-)Hash-Wert erzeugt, typischerweise ausgedrückt als 32-stellige Hexadezimalzahl. Unsere Implementierung verwendet reines JavaScript mit bitweisen Operationen und führt 4 Runden mit jeweils 16 Operationen auf 512-Bit-Datenblöcken durch.',

  "md5Generator.tech.title": "Technische Implementierung",
  "md5Generator.tech.coreTitle": "Kernfunktionen:",
  "md5Generator.tech.coreList1": "F(x,y,z) = (x ∧ y) ∨ (¬x ∧ z) - Runde 1",
  "md5Generator.tech.coreList2": "G(x,y,z) = (x ∧ z) ∨ (y ∧ ¬z) - Runde 2",
  "md5Generator.tech.coreList3": "H(x,y,z) = x ⊕ y ⊕ z - Runde 3",
  "md5Generator.tech.coreList4": "I(x,y,z) = y ⊕ (x ∨ ¬z) - Runde 4",
  "md5Generator.tech.stepsTitle": "Verarbeitungsschritte:",
  "md5Generator.tech.stepsList1":
    "1. Nachrichtenvorverarbeitung (Auffüllen und Längenanhängen)",
  "md5Generator.tech.stepsList2": "2. Nachricht in 512-Bit-Blöcke aufteilen",
  "md5Generator.tech.stepsList3":
    "3. Jeden Block durch 4 Runden mit jeweils 16 Operationen verarbeiten",
  "md5Generator.tech.stepsList4":
    "4. 32-Bit-Arithmetik und bitweise Operationen verwenden",
  "md5Generator.tech.stepsList5":
    "5. Ergebnisse kombinieren, um den endgültigen 128-Bit-Hash zu erzeugen",

  "md5Generator.features.title": "Hauptfunktionen",
  "md5Generator.feature.checksums.title": "Datei-Prüfsummen",
  "md5Generator.feature.checksums.desc":
    "MD5 für Dateien bis zu 10MB generieren",
  "md5Generator.feature.batch.title": "Stapelverarbeitung",
  "md5Generator.feature.batch.desc":
    "Mehrere Zeichenfolgen gleichzeitig hashen",
  "md5Generator.feature.upload.title": "Datei-Upload",
  "md5Generator.feature.upload.desc":
    "Dateien per Drag & Drop für sofortiges Hashing ablegen",
  "md5Generator.feature.privacy.title": "100% Privat",
  "md5Generator.feature.privacy.desc":
    "Alle Verarbeitungen erfolgen lokal im Browser",

  "md5Generator.useCases.title":
    "Häufige Anwendungsfälle und Verwendungsgrenzen",
  "md5Generator.useCases.item1": "Dateintegritätsprüfung und Prüfsummen",
  "md5Generator.useCases.boundary1":
    "✅ Geeignet - Perfekt zum Erkennen unbeabsichtigter Dateibeschädigungen während der Übertragung",
  "md5Generator.useCases.item2": "Datenbank-Passwortspeicherung (mit Salz)",
  "md5Generator.useCases.boundary2":
    "⚠️ Nicht empfohlen - Verwenden Sie stattdessen bcrypt, Argon2 oder scrypt",
  "md5Generator.useCases.item3": "Erzeugen eindeutiger Identifikatoren",
  "md5Generator.useCases.boundary3":
    "⚠️ Mit Vorsicht verwenden - Ziehen Sie UUID v4 für bessere Eindeutigkeitsgarantien in Betracht",
  "md5Generator.useCases.item4": "Erkennen von Duplikatdateien",
  "md5Generator.useCases.boundary4":
    "✅ Geeignet - Gut für nicht-kritische Duplikaterkennung in lokalen Systemen",
  "md5Generator.useCases.item5": "API-Signaturverifizierung",
  "md5Generator.useCases.boundary5":
    "❌ Nicht sicher - Anfällig für Kollisionsangriffe, verwenden Sie HMAC mit SHA-256",

  "md5Generator.faq.title": "Häufig Gestellte Fragen",
  "md5Generator.faq.q1":
    "Was ist der Unterschied zwischen 32-Bit und 16-Bit MD5?",
  "md5Generator.faq.a1":
    "32-Bit MD5 ist der vollständige Hash (32 Hexadezimalzeichen). 16-Bit MD5 nimmt die mittleren 16 Zeichen des vollständigen Hashs, manchmal verwendet für kürzere Prüfsummen.",
  "md5Generator.faq.q2": "Ist MD5 sicher für Passwörter?",
  "md5Generator.faq.a2":
    "MD5 allein wird aufgrund bekannter Schwachstellen nicht für das Hashing von Passwörtern empfohlen. Verwenden Sie moderne Algorithmen wie bcrypt oder Argon2 für die Passwortsicherheit.",
  "md5Generator.faq.q3":
    "Sind meine Daten sicher bei der Verwendung dieses Tools?",
  "md5Generator.faq.a3":
    "Ja, das gesamte MD5-Hashing erfolgt lokal in Ihrem Browser. Ihre Daten werden niemals an einen Server gesendet.",
};
