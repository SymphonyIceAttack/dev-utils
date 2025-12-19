export const encodingConverter = {
  "encodingConverter.title": "Convertisseur d'Encodage de Caractères",
  "encodingConverter.description":
    "Convertir du texte entre différents encodages de caractères comme UTF-8, GBK, ISO-8859-1",
  "encodingConverter.pageTitle": "Convertisseur d'Encodage de Caractères",
  "encodingConverter.pageSubtitle":
    "Convertir du texte entre UTF-8, GBK et autres encodages",
  "encodingConverter.inputLabel": "Texte d'Entrée",
  "encodingConverter.inputPlaceholder": "Entrez ou collez du texte ici...",
  "encodingConverter.outputLabel": "Sortie Convertie",
  "encodingConverter.outputPlaceholder": "Le texte converti apparaîtra ici...",
  "encodingConverter.sourceEncoding": "Encodage Source",
  "encodingConverter.targetEncoding": "Encodage Cible",
  "encodingConverter.convert": "Convertir",
  "encodingConverter.autoDetect": "Détection Automatique",
  "encodingConverter.hexView": "Vue Hex",
  "encodingConverter.textView": "Vue Texte",
  "encodingConverter.examples": "Exemples",
  "encodingConverter.examplesHint": "Cliquez sur un exemple pour le charger:",
  "encodingConverter.examples.chinese": "Texte Chinois",
  "encodingConverter.examples.japanese": "Texte Japonais",
  "encodingConverter.examples.mixed": "Contenu Mixte",
  "encodingConverter.error.converting":
    "Erreur lors de la conversion d'encodage",
  "encodingConverter.error.invalidInput":
    "Entrée invalide pour l'encodage sélectionné",

  // Encoding names for dropdowns
  "encodingConverter.encodings.utf8": "UTF-8",
  "encodingConverter.encodings.utf16": "UTF-16",
  "encodingConverter.encodings.ascii": "ASCII",
  "encodingConverter.encodings.iso88591": "ISO-8859-1",
  "encodingConverter.encodings.hex": "Hexadécimal",
  "encodingConverter.encodings.binary": "Binaire",
  "encodingConverter.encodings.unicodeEscape": "Échappement Unicode",

  // SEO Content
  "encodingConverter.seo.title":
    "Qu'est-ce que l'Encodage de Caractères ? Comment ça Fonctionne ?",
  "encodingConverter.seo.description":
    '<strong className="text-foreground">L\'encodage de caractères</strong> est un système qui mappe les caractères vers des octets pour le stockage et la transmission. Notre implémentation utilise les APIs TextEncoder/TextDecoder intégrées de JavaScript avec des gestionnaires personnalisés pour les formats hexadécimal, binaire et d\'échappement Unicode. Différents encodages comme UTF-8, GBK et ISO-8859-1 représentent les caractères différemment, ce qui peut causer des "mojibakes" (texte corrompu) quand les données sont décodées avec le mauvais encodage.',

  "encodingConverter.techTitle": "Implémentation Technique",
  "encodingConverter.tech.coreLogic": "Logique de Conversion Principale :",
  "encodingConverter.tech.logic1":
    "TextEncoder/TextDecoder pour le traitement UTF-8/UTF-16",
  "encodingConverter.tech.logic2":
    "Conversion hexadécimal/binaire personnalisée avec alignement d'octets approprié",
  "encodingConverter.tech.logic3":
    "Analyse des séquences d'échappement Unicode (format \\uXXXX)",
  "encodingConverter.tech.logic4":
    "Gestion des paires surrogates pour les emojis (0x10000-0x10FFFF)",
  "encodingConverter.tech.logic5":
    "Traitement caractère par caractère avec récupération d'erreurs",

  "encodingConverter.tech.supported": "Encodages Supportés :",
  "encodingConverter.tech.utf8":
    "UTF-8 : 1-4 octets par caractère, rétrocompatible avec ASCII",
  "encodingConverter.tech.utf16":
    "UTF-16 : 2 ou 4 octets par caractère (BMP + paires surrogates)",
  "encodingConverter.tech.ascii":
    "ASCII : encodage 7 bits (0-127), sous-ensemble d'UTF-8",
  "encodingConverter.tech.iso":
    "ISO-8859-1 : encodage 8 bits pour les langues d'Europe occidentale",
  "encodingConverter.tech.hex":
    "Hexadécimal : représentation hexadécimale à deux chiffres de chaque octet",
  "encodingConverter.tech.binary":
    "Binaire : représentation binaire 8 bits séparée par des espaces",

  "encodingConverter.featuresTitle": "Caractéristiques Principales",
  "encodingConverter.feature.multi.title": "Multi-Encodage",
  "encodingConverter.feature.multi.desc":
    "Support pour UTF-8, GBK, Latin-1 et plus",
  "encodingConverter.feature.realtime.title": "Conversion en Temps Réel",
  "encodingConverter.feature.realtime.desc":
    "Aperçu instantané pendant la saisie",
  "encodingConverter.feature.format.title": "Support de Format",
  "encodingConverter.feature.format.desc":
    "Formats Texte, Hexadécimal, Base64 et Unicode",
  "encodingConverter.feature.privacy.title": "100% Privé",
  "encodingConverter.feature.privacy.desc":
    "Tout le traitement se fait dans votre navigateur",

  "encodingConverter.useCasesTitle":
    "Cas d'Usage Communs et Limites d'Utilisation",
  "encodingConverter.useCase.garbled":
    "Correction du texte corrompu dû à un encodage incorrect",
  "encodingConverter.useCase.garbledDesc":
    "✅ Essentiel - Cas d'usage le plus courant pour récupérer du texte lisible",
  "encodingConverter.useCase.gbk":
    "Conversion des données GBK legacy vers UTF-8",
  "encodingConverter.useCase.gbkDesc":
    "✅ Recommandé - UTF-8 est la norme web et la plus compatible",
  "encodingConverter.useCase.debug":
    "Débogage des problèmes d'encodage de caractères",
  "encodingConverter.useCase.debugDesc":
    "✅ Parfait - La vue hexadécimal aide à identifier les problèmes d'encodage",
  "encodingConverter.useCase.hex":
    "Visualisation de la représentation hexadécimale du texte",
  "encodingConverter.useCase.hexDesc":
    "✅ Utile - Applications de débogage et d'analyse de données",
  "encodingConverter.useCase.unicode": "Conversion entre formats Unicode",
  "encodingConverter.useCase.unicodeDesc":
    "⚠️ Dépendant du contexte - Assurez-vous que le système cible supporte le format",

  "encodingConverter.faqTitle": "Questions Fréquemment Posées",
  "encodingConverter.faq.q1":
    "Quelle est la différence entre UTF-8 et UTF-16 ?",
  "encodingConverter.faq.a1":
    "UTF-8 utilise 1-4 octets par caractère et est rétrocompatible avec ASCII. UTF-16 utilise 2 ou 4 octets. UTF-8 est plus courant sur le web, tandis qu'UTF-16 est utilisé en interne par Windows et Java.",
  "encodingConverter.faq.q2": "Comment corriger du texte chinois corrompu ?",
  "encodingConverter.faq.a2":
    "Le chinois corrompu signifie généralement que le texte a été encodé en GBK mais décodé en UTF-8 (ou vice versa). Essayez de convertir de l'encodage original vers UTF-8.",
  "encodingConverter.faq.q3": "Mes données sont-elles sécurisées ?",
  "encodingConverter.faq.a3":
    "Oui, toute la conversion d'encodage se fait localement dans votre navigateur. Vos données ne sont jamais envoyées vers un serveur.",
};
