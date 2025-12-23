export const base64Encoder = {
  "base64Encoder.title": "Encodeur Base64",
  "base64Encoder.description":
    "Encoder et décoder du texte Base64 en ligne avec conversion en temps réel",
  "base64Encoder.pageTitle": "Encodeur et Décodeur Base64",
  "base64Encoder.pageSubtitle":
    "Encoder du texte en Base64 ou décoder Base64 en texte",
  "base64Encoder.inputLabel": "Texte d'Entrée",
  "base64Encoder.inputLabelBase64": "Base64 d'Entrée",
  "base64Encoder.outputPlaceholder": "Le texte converti apparaîtra ici...",
  "base64Encoder.inputPlaceholder": "Entrez votre texte ici...",
  "base64Encoder.inputPlaceholderBase64": "Entrez votre Base64 ici...",
  "base64Encoder.encode": "Encoder",
  "base64Encoder.decode": "Décoder",
  "base64Encoder.swap": "Échanger",
  "base64Encoder.encodeBtn": "Encoder en Base64",
  "base64Encoder.decodeBtn": "Décoder depuis Base64",
  "base64Encoder.examples": "Exemples",
  "base64Encoder.examplesHint":
    "Cliquez sur un exemple pour le charger dans le convertisseur:",
  "base64Encoder.examples.simpleText": "Texte Simple",
  "base64Encoder.examples.chineseText": "Texte Chinois",
  "base64Encoder.examples.urlData": "Données URL",
  "base64Encoder.examples.jsonData": "Données JSON",
  "base64Encoder.error.encoding":
    "Erreur lors de l'encodage du texte en Base64",
  "base64Encoder.error.decoding": "Erreur lors du décodage du texte Base64",

  "base64Encoder.techTitle": "Détails d'Implémentation Technique",
  "base64Encoder.tech.dataUri":
    "<strong>Schéma URI de Données:</strong> <code>data:image/png;base64,iVBORw0KGgo...</code> - Utilisé pour intégrer des images directement en HTML/CSS",
  "base64Encoder.tech.email":
    "<strong>Pièces Jointes Email:</strong> encodage MIME binaire pour les pièces jointes dans les systèmes email (SMTP)",
  "base64Encoder.tech.db":
    "<strong>Stockage Base de Données:</strong> Conversion des BLOBs en colonnes TEXT tout en préservant l'intégrité binaire",
  "base64Encoder.tech.jwt":
    "<strong>Jetons JWT:</strong> Section payload dans les JSON Web Tokens pour l'authentification API",
  "base64Encoder.tech.api":
    "<strong>Réponses API:</strong> Sérialisation d'objets complexes pour les réponses JSON API",

  "base64Encoder.featuresTitle": "Fonctionnalités Clés",
  "base64Encoder.feature.textBinary.title": "Texte et Binaire",
  "base64Encoder.feature.textBinary.desc":
    "Encoder/décoder à la fois les chaînes de texte et les fichiers binaires",
  "base64Encoder.feature.urlSafe.title": "URL Sécurisé",
  "base64Encoder.feature.urlSafe.desc":
    "Générer des variantes d'encodage Base64 sécurisées pour URL",
  "base64Encoder.feature.fileSupport.title": "Support de Fichiers",
  "base64Encoder.feature.fileSupport.desc":
    "Télécharger et encoder des fichiers d'images et documents",
  "base64Encoder.feature.privacy.title": "100% Privé",
  "base64Encoder.feature.privacy.desc":
    "Tout le traitement se fait localement dans votre navigateur",

  "base64Encoder.useCasesTitle": "Cas d'Usage Courants",
  "base64Encoder.useCase.images":
    "Intégrer des images dans les fichiers HTML et CSS",
  "base64Encoder.useCase.email":
    "Encodage de données pour la transmission email et texte",
  "base64Encoder.useCase.db":
    "Stockage de données binaires dans les bases de données",
  "base64Encoder.useCase.auth": "Authentification API et gestion de jetons",
  "base64Encoder.useCase.serialization":
    "Sérialisation de données pour applications web",

  "base64Encoder.limitsTitle": "Limites d'Usage et Meilleures Pratiques",
  "base64Encoder.limits.limitations": "⚠️ Limitations",
  "base64Encoder.limits.sizeIncrease":
    "Augmente la taille des données de ~33% (4 caractères par 3 bytes)",
  "base64Encoder.limits.largeFiles":
    "Pas adapté aux gros fichiers (utilisez des protocoles binaires à la place)",
  "base64Encoder.limits.notEncryption":
    "Pas un chiffrement - facilement réversible, ne l'utilisez pas pour des données sensibles",
  "base64Encoder.limits.browserMemory":
    "Limites de mémoire du navigateur pour de très grandes entrées",

  "base64Encoder.limits.bestPractices": "✅ Meilleures Pratiques",
  "base64Encoder.limits.smallBinary":
    "Utilisez pour de petites données binaires (images, fichiers < 10MB)",
  "base64Encoder.limits.compression":
    "Combinez avec la compression (gzip) pour l'efficacité",
  "base64Encoder.limits.urlSafe":
    "Utilisez Base64 sécurisé pour URL (+/-) pour les applications web",
  "base64Encoder.limits.validation":
    "Validez toujours l'entrée Base64 avant le décodage",

  "base64Encoder.security.title": "🔒 Note de Sécurité",
  "base64Encoder.security.desc":
    "Base64 n'est PAS un chiffrement. Il ne fournit aucune sécurité ni confidentialité. Utilisez-le uniquement pour la conversion de formats de données, jamais pour protéger des informations sensibles. Pour le chiffrement, utilisez des algorithmes cryptographiques appropriés comme AES.",

  // SEO Content
  "base64Encoder.seo.title": "Qu'est-ce que l'Encodage Base64?",
  "base64Encoder.seo.description":
    "<strong className=\"text-foreground\">L'encodage Base64</strong> est un schéma d'encodage binaire vers texte qui convertit les données binaires en format de chaîne ASCII. Il est largement utilisé pour encoder les données binaires qui doivent être stockées et transférées sur des médias conçus pour gérer des données textuelles. Notre outil encodeur/décodeur Base64 gratuit en ligne gère la conversion de données textuelles et binaires instantanément.",
  "base64Encoder.seo.techImplTitle": "🔧 Implémentation Technique",
  "base64Encoder.seo.techImplDesc":
    'Notre encodeur Base64 utilise les fonctions intégrées de JavaScript <code className="bg-background px-1 rounded">btoa()</code> et <code className="bg-background px-1 rounded">atob()</code> avec une gestion Unicode appropriée via <code className="bg-background px-1 rounded">encodeURIComponent()</code> pour les caractères internationaux. L\'algorithme mappe chaque 3 bytes de données binaires à 4 caractères Base64 en utilisant un alphabet de 64 caractères (A-Z, a-z, 0-9, +, /) avec du remplissage (=) pour les groupes de bytes incomplets.',

  "base64Encoder.seo.featuresTitle": "Fonctionnalités Clés",
  "base64Encoder.seo.feature1.title": "Conversion Instantanée",
  "base64Encoder.seo.feature1.desc": "Encodage et décodage en temps réel",
  "base64Encoder.seo.feature2.title": "Support Unicode",
  "base64Encoder.seo.feature2.desc":
    "Gère n'importe quel caractère y compris le chinois, emoji",
  "base64Encoder.seo.feature3.title": "URL Sécurisé",
  "base64Encoder.seo.feature3.desc": "Compatible avec les standards web",
  "base64Encoder.seo.feature4.title": "100% Privé",
  "base64Encoder.seo.feature4.desc":
    "Tout le traitement se fait localement dans le navigateur",
  "base64Encoder.seo.howToUseTitle": "Comment Utiliser",
  "base64Encoder.seo.howToUse1":
    "Entrez votre texte ou données Base64 dans le champ de saisie",
  "base64Encoder.seo.howToUse2":
    "Choisissez le mode encoder ou décoder et cliquez sur le bouton convertir",
  "base64Encoder.seo.howToUse3": "Copiez le résultat d'un clic",

  "base64Encoder.faqTitle": "Questions Fréquemment Posées",
  "base64Encoder.faq.q1": "Qu'est-ce que l'encodage Base64?",
  "base64Encoder.faq.a1":
    "Base64 est un schéma d'encodage binaire vers texte qui représente les données binaires en format de chaîne ASCII. Il est couramment utilisé pour transmettre des données binaires sur des systèmes qui ne peuvent gérer le texte de manière fiable, comme l'email ou certaines APIs web.",
  "base64Encoder.faq.q2": "Cet outil Base64 est-il gratuit?",
  "base64Encoder.faq.a2":
    "Oui, cet encodeur et décodeur Base64 est entièrement gratuit. Aucune inscription ou inscription requise. Vos données sont traitées localement dans votre navigateur pour une confidentialité et une sécurité maximales.",
  "base64Encoder.faq.q3": "Puis-je encoder et décoder Base64 hors ligne?",
  "base64Encoder.faq.a3":
    "Yes, our Base64 tool works completely offline. All encoding and decoding happens in your browser using JavaScript, so you can use it without an internet connection.",
  "base64Encoder.faq.q4": "Is my data secure when using this tool?",
  "base64Encoder.faq.a4":
    "Absolutely. All Base64 encoding and decoding happens locally in your browser. Your data is never sent to any server or stored anywhere, ensuring complete privacy and security.",

  // Real-World Scenarios
  "base64Encoder.scenarios.title": "Scénarios réels",
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
