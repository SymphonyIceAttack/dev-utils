export const uuidGenerator = {
  "uuidGenerator.title": "Générateur UUID",
  "uuidGenerator.description":
    "Générez des UUIDs conformes RFC4122 (v4, v7, v1) avec des options personnalisables",
  "uuidGenerator.pageTitle": "Générateur UUID",
  "uuidGenerator.pageSubtitle":
    "Générez des identifiants uniques universels instantanément",
  "uuidGenerator.generate": "Générer UUID",
  "uuidGenerator.generateBtn": "Générer UUID",
  "uuidGenerator.regenerate": "Régénérer",
  "uuidGenerator.version": "Version",
  "uuidGenerator.format": "Format",
  "uuidGenerator.count": "Compteur",
  "uuidGenerator.outputLabel": "UUID Généré",
  "uuidGenerator.outputPlaceholder":
    "Cliquez sur générer pour créer un UUID...",
  "uuidGenerator.bulk": "Génération en Masse",
  "uuidGenerator.generateMultiple": "Générer Multiples",
  "uuidGenerator.bulkPlaceholder": "Les UUIDs générés apparaîtront ici...",
  "uuidGenerator.error.generating": "Erreur lors de la génération UUID",

  // Options
  "uuidGenerator.option.v4": "UUID v4 (Aléatoire)",
  "uuidGenerator.option.v7": "UUID v7 (Horodatage)",
  "uuidGenerator.option.v1": "UUID v1 (Basé sur le temps)",
  "uuidGenerator.option.standard": "Standard (avec tirets)",
  "uuidGenerator.option.withoutHyphens": "Sans tirets",
  "uuidGenerator.option.uppercase": "Majuscules",
  "uuidGenerator.option.braces": "Avec accolades",

  // Examples
  "uuidGenerator.examplesTitle": "Exemples UUID",
  "uuidGenerator.examplesDesc":
    'Différentes versions UUID et formats pour divers cas d\'utilisation. Cliquez sur "Exécution rapide" pour générer, ou "Copier" pour copier un UUID:',
  "uuidGenerator.example.v4.title": "UUID v4 (Aléatoire)",
  "uuidGenerator.example.v4.desc": "Le plus courant pour les usages généraux",
  "uuidGenerator.example.v7.title": "UUID v7 (Horodatage)",
  "uuidGenerator.example.v7.desc": "Triable par temps de création",
  "uuidGenerator.example.v1.title": "UUID v1 (Basé sur le temps)",
  "uuidGenerator.example.v1.desc": "Contient des informations d'horodatage",
  "uuidGenerator.example.noHyphens.title": "UUID sans tirets",
  "uuidGenerator.example.noHyphens.desc": "Format compact pour les URLs",
  "uuidGenerator.example.uppercase.title": "UUID en majuscules",
  "uuidGenerator.example.uppercase.desc": "Format tout en majuscules",
  "uuidGenerator.example.braces.title": "UUID avec accolades",
  "uuidGenerator.example.braces.desc": "Encadré dans des accolades",

  // SEO Content
  "uuidGenerator.whatIsUuidTitle": "Qu'est-ce qu'un UUID ?",
  "uuidGenerator.whatIsUuidDesc":
    '<strong className="text-foreground">UUID (Universally Unique Identifier)</strong> est un identifiant de 128 bits qui est garanti comme unique à travers le temps et l\'espace. Les UUIDs sont largement utilisés dans les systèmes distribués, les bases de données et les applications où une identification unique est requise sans coordination centrale.',

  "uuidGenerator.techDetailsTitle": "Détails de l'implémentation technique",
  "uuidGenerator.tech.webCrypto":
    '<strong>Web Crypto API:</strong> Utilise <code className="bg-background px-1 rounded">crypto.getRandomValues()</code> pour la génération de nombres aléatoires cryptographiquement sécurisée',
  "uuidGenerator.tech.v4Struct":
    '<strong>Structure UUID v4:</strong> <code className="bg-background px-1 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> où x est hex aléatoire, 4 indique la version, y est la variante (8, 9, a, ou b)',
  "uuidGenerator.tech.v7Struct":
    "<strong>Structure UUID v7:</strong> Les 48 premiers bits sont un horodatage Unix en millisecondes, suivis des bits de version (0111), puis des données aléatoires avec des bits de variante",
  "uuidGenerator.tech.bitManip":
    '<strong>Manipulation de bits:</strong> <code className="bg-background px-1 rounded">bytes[6] = (bytes[6] & 0x0f) | 0x40</code> définit la version 4, <code className="bg-background px-1 rounded">bytes[8] = (bytes[8] & 0x3f) | 0x80</code> définit la variante RFC4122',
  "uuidGenerator.tech.collision":
    "<strong>Probabilité de collision:</strong> Avec 122 bits aléatoires en v4, la probabilité de collision est ~1 sur 2,71 quintillion",

  "uuidGenerator.featuresTitle": "Caractéristiques principales",
  "uuidGenerator.feature.rfc.title": "Conforme RFC4122",
  "uuidGenerator.feature.rfc.desc": "Support standard UUID v1, v4 et v7",
  "uuidGenerator.feature.formats.title": "Formats multiples",
  "uuidGenerator.feature.formats.desc":
    "Standard, majuscules, accolades et plus",
  "uuidGenerator.feature.bulk.title": "Génération en masse",
  "uuidGenerator.feature.bulk.desc": "Générez des milliers d'UUIDs à la fois",
  "uuidGenerator.feature.privacy.title": "100% Privé",
  "uuidGenerator.feature.privacy.desc":
    "Tout le traitement se fait dans votre navigateur",

  "uuidGenerator.comparisonTitle": "Comparaison des versions UUID",
  "uuidGenerator.comparison.version": "Version",
  "uuidGenerator.comparison.method": "Méthode de génération",
  "uuidGenerator.comparison.sortable": "Triable",
  "uuidGenerator.comparison.bestFor": "Meilleur pour",
  "uuidGenerator.comparison.v1.method": "Horodatage + adresse MAC",
  "uuidGenerator.comparison.v1.sortable": "Partiel",
  "uuidGenerator.comparison.v1.bestFor":
    "Systèmes hérités (préoccupations de confidentialité)",
  "uuidGenerator.comparison.v4.method": "Aléatoire (122 bits)",
  "uuidGenerator.comparison.v4.sortable": "Non",
  "uuidGenerator.comparison.v4.bestFor": "Usage général, le plus courant",
  "uuidGenerator.comparison.v7.method": "Horodatage Unix + aléatoire",
  "uuidGenerator.comparison.v7.sortable": "Oui",
  "uuidGenerator.comparison.v7.bestFor":
    "Clés primaires de base de données, données ordonnées dans le temps",

  "uuidGenerator.useCasesTitle": "Cas d'utilisation courants",
  "uuidGenerator.useCase.db":
    "Clés primaires de base de données dans les systèmes distribués",
  "uuidGenerator.useCase.session":
    "Identifiants de session et jetons d'authentification",
  "uuidGenerator.useCase.distributed":
    "IDs de transaction distribués à travers les microservices",
  "uuidGenerator.useCase.files":
    "Nommage de fichiers et ressources sans collision",
  "uuidGenerator.useCase.queue":
    "Clés de déduplication de file d'attente de messages",

  "uuidGenerator.faqTitle": "Questions fréquemment posées",
  "uuidGenerator.faq.q1": "Quelle est la différence entre les versions UUID ?",
  "uuidGenerator.faq.a1":
    "v4 utilise la génération aléatoire, v7 inclut l'horodatage pour un meilleur tri, v1 utilise l'adresse MAC et l'horodatage (déprécié pour la confidentialité).",
  "uuidGenerator.faq.q2": "Les UUIDs sont-ils vraiment uniques ?",
  "uuidGenerator.faq.a2":
    "Oui, la probabilité de générer des UUIDs en double est extrêmement faible. Pour v4, la chance de collision est négligeable pour des fins pratiques.",
  "uuidGenerator.faq.q3": "Puis-je utiliser des UUIDs comme clés primaires ?",
  "uuidGenerator.faq.a3":
    "Absolument ! Les UUIDs sont excellents pour les systèmes distribués où la génération d'ID centralisée n'est pas réalisable.",
};
