export const urlEncoder = {
  "urlEncoder.title": "URL Encoder / Decoder",
  "urlEncoder.description": "Encode or decode URLs and query parameters",
  "urlEncoder.pageTitle": "URL Encoder / Decoder",
  "urlEncoder.pageSubtitle":
    "Encode or decode URLs and query parameters instantly",
  "urlEncoder.inputPlaceholder.encode": "Enter text or URL to encode...",
  "urlEncoder.inputPlaceholder.decode": "Enter encoded URL to decode...",
  "urlEncoder.inputLabel.encode": "Text to Encode",
  "urlEncoder.inputLabel.decode": "URL to Decode",
  "urlEncoder.outputPlaceholder": "Result will appear here...",
  "urlEncoder.encodeBtn": "Encode URL",
  "urlEncoder.decodeBtn": "Decode URL",
  "urlEncoder.swapBtn": "Swap & Convert",
  "urlEncoder.clearBtn": "Clear",
  "urlEncoder.encodeTab": "Encode/Decode",
  "urlEncoder.examplesTab": "Exemples",
  "urlEncoder.examplesHint": "Click on an example to load it:",
  "urlEncoder.examplesTitle": "Example URLs",
  "urlEncoder.examplesDesc":
    'Click on any example to load it into the input field, or use "Quick Run" to automatically convert:',
  "urlEncoder.example1.title": "Query Parameters",
  "urlEncoder.example2.title": "URL with Special Chars",
  "urlEncoder.example3.title": "API Endpoint",
  "urlEncoder.error.encode": "Encoding failed",
  "urlEncoder.error.decode": "Invalid encoded string",

  // SEO Content
  "urlEncoder.seo.title": "What is URL Encoding?",
  "urlEncoder.seo.description":
    "URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI). It converts special characters into a format that can be transmitted over the Internet. Our free online URL encoder/decoder helps you convert URLs and query parameters instantly without any installation or signup.",
  "urlEncoder.seo.featuresTitle": "Key Features",
  "urlEncoder.seo.feature1.title": "URL Encode",
  "urlEncoder.seo.feature1.desc":
    "Convert special characters to percent-encoding",
  "urlEncoder.seo.feature2.title": "URL Decode",
  "urlEncoder.seo.feature2.desc": "Restore encoded URLs to readable format",
  "urlEncoder.seo.feature3.title": "Syntax Highlighting",
  "urlEncoder.seo.feature3.desc": "Color-coded output for easy reading",
  "urlEncoder.seo.feature4.title": "100% Private",
  "urlEncoder.seo.feature4.desc": "All processing happens in your browser",
  "urlEncoder.seo.useCasesTitle": "Common Use Cases",
  "urlEncoder.seo.useCase1": "Encoding query parameters for API requests",
  "urlEncoder.seo.useCase2": "Converting non-ASCII characters in URLs",
  "urlEncoder.seo.useCase3":
    "Handling special characters like spaces and ampersands",
  "urlEncoder.seo.useCase4": "Debugging encoded URLs in web development",
  "urlEncoder.seo.useCase5": "Preparing data for form submissions",

  "urlEncoder.techDetailsTitle": "Technical Implementation",
  "urlEncoder.techDetails.jsFunctions": "JavaScript Functions",
  "urlEncoder.techDetails.algoDetails": "Algorithm Details",
  "urlEncoder.techDetails.algoList1": "Converts characters to UTF-8 bytes",
  "urlEncoder.techDetails.algoList2": "Each byte becomes %XX (hexadecimal)",
  "urlEncoder.techDetails.algoList3": "Reserved characters are encoded",
  "urlEncoder.techDetails.algoList4": "Unreserved characters remain unchanged",

  "urlEncoder.limitationsTitle": "Usage Boundaries & Limitations",
  "urlEncoder.limitations.appropriate": "Appropriate For:",
  "urlEncoder.limitations.appropriateList1": "Query parameters and form data",
  "urlEncoder.limitations.appropriateList2": "API requests and web services",
  "urlEncoder.limitations.appropriateList3":
    "URL parameters with special characters",
  "urlEncoder.limitations.appropriateList4": "Multilingual content in URLs",
  "urlEncoder.limitations.notSuitable": "Not Suitable For:",
  "urlEncoder.limitations.notSuitableList1": "Complete URL structure encoding",
  "urlEncoder.limitations.notSuitableList2": "Domain names or protocols",
  "urlEncoder.limitations.notSuitableList3":
    "Already encoded content (double encoding)",
  "urlEncoder.limitations.notSuitableList4": "HTML entity encoding",

  "urlEncoder.faqTitle": "Questions Fréquemment Posées",
  "urlEncoder.faq.q1": "Qu'est-ce que l'encodage URL?",
  "urlEncoder.faq.a1":
    "L'encodage URL convertit les caractères dans un format qui peut être transmis sur Internet. Les caractères spéciaux sont remplacés par '%' suivi de deux chiffres hexadécimaux.",
  "urlEncoder.faq.q2": "Quand dois-je utiliser l'encodage URL?",
  "urlEncoder.faq.a2":
    "Utilisez l'encodage URL lorsque votre URL contient des caractères spéciaux comme des espaces, des esperluettes (&), ou des caractères non-ASCII comme du texte chinois ou japonais.",
  "urlEncoder.faq.q3": "Mes données sont-elles sécurisées?",
  "urlEncoder.faq.a3":
    "Oui, tout l'encodage et le décodage se fait entièrement dans votre navigateur. Vos données ne sont jamais envoyées à un serveur.",

  // Real-World Scenarios
  "urlEncoder.scenarios.title": "Scénarios réels",
  "urlEncoder.scenarios.scenario1.title":
    "Construction de chaînes de requête API",
  "urlEncoder.scenarios.scenario1.desc":
    "Vous créez une fonction de recherche pour le commerce électronique et devez créer des paramètres de requête URL à partir des entrées utilisateur.",
  "urlEncoder.scenarios.scenario1.problem": "URL problématique:",
  "urlEncoder.scenarios.scenario1.solution": "URL correctement encodée:",
  "urlEncoder.scenarios.scenario1.solutionLabel": "Solution:",
  "urlEncoder.scenarios.scenario1.result":
    "Utilisez l'encodage URL pour gérer correctement les espaces, les apostrophes et les esperluettes.",
  "urlEncoder.scenarios.scenario2.title":
    "Prise en charge des caractères internationaux",
  "urlEncoder.scenarios.scenario2.desc":
    "Votre application Web doit gérer les recherches contenant des caractères chinois, japonais ou autres caractères Unicode.",
  "urlEncoder.scenarios.scenario2.original": "Terme de recherche original:",
  "urlEncoder.scenarios.scenario2.encoded": "URL encodée:",
  "urlEncoder.scenarios.scenario2.result":
    "Encodez les caractères Unicode pour garantir leur transmission correcte dans les URL.",
  "urlEncoder.scenarios.scenario3.title": "Partage sur les réseaux sociaux",
  "urlEncoder.scenarios.scenario3.desc":
    "Création de liens partageables pour les publications sur les réseaux sociaux contenant du contenu dynamique.",
  "urlEncoder.scenarios.scenario3.dynamic": "URL de partage dynamique:",
  "urlEncoder.scenarios.scenario3.ready": "Prêt pour les réseaux sociaux:",
  "urlEncoder.scenarios.scenario3.result":
    "Encodez les paramètres pour éviter la rupture des URL et assurer une intégration correcte avec les réseaux sociaux.",

  // Step-by-Step Guide
  "urlEncoder.guide.title": "Comment utiliser l'encodage URL",
  "urlEncoder.guide.step1.title": "Entrez votre URL ou texte",
  "urlEncoder.guide.step1.desc":
    "Collez votre URL ou entrez le texte qui doit être encodé/décodé dans le champ de saisie ci-dessus.",
  "urlEncoder.guide.step2.title": "Choisissez Encoder ou Décoder",
  "urlEncoder.guide.step2.desc":
    "Sélectionnez 'Encoder' pour convertir les caractères spéciaux, ou 'Décoder' pour convertir les URLs encodées zurück dans un format lisible.",
  "urlEncoder.guide.step3.title": "Cliquez sur Convertir",
  "urlEncoder.guide.step3.desc":
    "Cliquez sur le bouton convertir pour voir instantanément le résultat encodé ou décodé dans le champ de sortie.",
  "urlEncoder.guide.step4.title": "Copiez et utilisez",
  "urlEncoder.guide.step4.desc":
    "Copiez le résultat et utilisez-le dans vos applications Web, appels API ou documentation.",
};
