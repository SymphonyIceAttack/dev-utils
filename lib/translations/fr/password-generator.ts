export const passwordGenerator = {
  "passwordGenerator.title": "Générateur de mot de passe",
  "passwordGenerator.description":
    "Générez des mots de passe aléatoires sécurisés et des clés API avec des options personnalisables",
  "passwordGenerator.pageTitle": "Générateur de mot de passe & clé",
  "passwordGenerator.pageSubtitle":
    "Générez des mots de passe aléatoires sécurisés, des clés API et des jetons",
  "passwordGenerator.outputLabel": "Mot de passe généré",
  "passwordGenerator.outputPlaceholder":
    "Cliquez sur générer pour créer un mot de passe...",
  "passwordGenerator.generate": "Générer",
  "passwordGenerator.regenerate": "Régénérer",
  "passwordGenerator.length": "Longueur",
  "passwordGenerator.options": "Options",
  "passwordGenerator.uppercase": "Majuscules (A-Z)",
  "passwordGenerator.lowercase": "Minuscules (a-z)",
  "passwordGenerator.numbers": "Chiffres (0-9)",
  "passwordGenerator.symbols": "Symboles (!@#$%...)",
  "passwordGenerator.excludeAmbiguous":
    "Exclure les caractères ambigus (0, O, l, 1, I)",
  "passwordGenerator.strength": "Force",
  "passwordGenerator.strength.weak": "Faible",
  "passwordGenerator.strength.fair": "Passable",
  "passwordGenerator.strength.good": "Bon",
  "passwordGenerator.strength.strong": "Fort",
  "passwordGenerator.strength.veryStrong": "Très fort",
  "passwordGenerator.presets": "Préréglages",
  "passwordGenerator.preset.pin": "PIN (4 chiffres)",
  "passwordGenerator.preset.simple": "Simple (8 car.)",
  "passwordGenerator.preset.secure": "Sécurisé (16 car.)",
  "passwordGenerator.preset.apiKey": "Clé API (32 car.)",
  "passwordGenerator.preset.uuid": "Style UUID",
  "passwordGenerator.bulk": "Génération en masse",
  "passwordGenerator.bulkCount": "Nombre",
  "passwordGenerator.error.generating":
    "Erreur lors de la génération du mot de passe",

  "passwordGenerator.mode.label": "Mode de génération",
  "passwordGenerator.mode.random": "Aléatoire",
  "passwordGenerator.mode.passphrase": "Phrase secrète",
  "passwordGenerator.passphrase.words": "Mots",
  "passwordGenerator.passphrase.separator": "Séparateur",
  "passwordGenerator.passphrase.separator.hyphen": "Tiret (-)",
  "passwordGenerator.passphrase.separator.underscore": "Tiret bas (_)",
  "passwordGenerator.passphrase.separator.space": "Espace",
  "passwordGenerator.passphrase.separator.period": "Point (.)",
  "passwordGenerator.passphrase.separator.none": "Aucun",
  "passwordGenerator.option.additional": "Options supplémentaires",
  "passwordGenerator.option.capitalize": "Capitaliser les mots",

  "passwordGenerator.output.generated": "Mots de passe générés",
  "passwordGenerator.output.copyAll": "Tout copier",

  "passwordGenerator.presetsTitle": "Préréglages de mot de passe",
  "passwordGenerator.presetsDesc":
    "Paramètres de mot de passe préconfigurés pour différents niveaux de sécurité. Cliquez sur « Exécution rapide » pour générer avec les paramètres prédéfinis :",
  "passwordGenerator.preset.loadOnly": "Charger le préréglage uniquement",
  "passwordGenerator.preset.chars": "car.",
  "passwordGenerator.preset.symbols": "Symboles",
  "passwordGenerator.preset.numbers": "Chiffres",
  "passwordGenerator.preset.upper": "Majuscules",

  "passwordGenerator.seo.title":
    "Pourquoi utiliser un générateur de mot de passe ? Comment ça marche ?",
  "passwordGenerator.seo.desc":
    'Des mots de passe forts et uniques sont essentiels pour la sécurité. Cet outil utilise une génération de nombres aléatoires <strong className="text-foreground">cryptographiquement sécurisée</strong> via l\'API Web Crypto (crypto.getRandomValues) pour créer des mots de passe pratiquement impossibles à deviner ou à craquer par force brute.',

  "passwordGenerator.tech.title": "Implémentation technique",
  "passwordGenerator.tech.randomTitle":
    "Génération de mot de passe aléatoire :",
  "passwordGenerator.tech.randomList1":
    "Utilise crypto.getRandomValues() pour un aléatoire cryptographiquement sécurisé",
  "passwordGenerator.tech.randomList2":
    "Construit des pools de caractères dynamiquement selon les préférences utilisateur",
  "passwordGenerator.tech.randomList3":
    "Exclusion optionnelle des caractères ambigus (0, O, 1, l, I pour une meilleure lisibilité)",
  "passwordGenerator.tech.randomList4":
    "Distribution uniforme garantit une probabilité égale pour chaque position",
  "passwordGenerator.tech.randomList5":
    "Supporte une longueur de 4 à 64 caractères avec différents types",

  "passwordGenerator.tech.passphraseTitle": "Génération de phrase secrète :",
  "passwordGenerator.tech.passphraseList1":
    "Sélection basée sur un dictionnaire de plus de 100 mots anglais courants",
  "passwordGenerator.tech.passphraseList2":
    "Chaque mot ajoute environ 6,6 bits d'entropie",
  "passwordGenerator.tech.passphraseList3":
    "Capitalisation optionnelle et ajout de chiffres/symboles",
  "passwordGenerator.tech.passphraseList4":
    "Séparateurs personnalisables (tiret, tiret bas, espace, etc.)",
  "passwordGenerator.tech.passphraseList5":
    "Nombre de mots : 3-8 mots pour différents niveaux de sécurité",

  "passwordGenerator.features.title": "Fonctionnalités clés",
  "passwordGenerator.feature.secure.title": "Cryptographiquement sécurisé",
  "passwordGenerator.feature.secure.desc":
    "Utilise l'API Web Crypto pour un vrai aléatoire",
  "passwordGenerator.feature.modes.title": "Modes multiples",
  "passwordGenerator.feature.modes.desc":
    "Mots de passe aléatoires et phrases secrètes",
  "passwordGenerator.feature.passphrase.title": "Support des phrases secrètes",
  "passwordGenerator.feature.passphrase.desc":
    "Combinaisons de mots faciles à retenir",
  "passwordGenerator.feature.bulk.title": "Génération en masse",
  "passwordGenerator.feature.bulk.desc":
    "Générez plusieurs mots de passe à la fois",

  "passwordGenerator.bestPractices.title":
    "Meilleures pratiques et limites d'utilisation",
  "passwordGenerator.bestPractices.item1":
    "Utilisez un mot de passe unique pour chaque compte",
  "passwordGenerator.bestPractices.boundary1":
    "✅ Critique - Empêche les attaques par bourrage d'identifiants",
  "passwordGenerator.bestPractices.item2":
    "Les mots de passe doivent avoir au moins 12-16 caractères",
  "passwordGenerator.bestPractices.boundary2":
    "✅ Recommandé - 16+ caractères pour les comptes importants (banque, email)",
  "passwordGenerator.bestPractices.item3":
    "Incluez majuscules, minuscules, chiffres et symboles",
  "passwordGenerator.bestPractices.boundary3":
    "✅ Important - Augmente l'entropie et résiste aux attaques par dictionnaire",
  "passwordGenerator.bestPractices.item4":
    "Stockez les mots de passe dans un gestionnaire sécurisé",
  "passwordGenerator.bestPractices.boundary4":
    "✅ Essentiel - Ne réutilisez jamais les mots de passe",
  "passwordGenerator.bestPractices.item5":
    "Activez l'authentification à deux facteurs si disponible",
  "passwordGenerator.bestPractices.boundary5":
    "✅ Fortement recommandé - Ajoute une deuxième couche de sécurité critique",

  "passwordGenerator.faq.title": "Questions fréquemment posées",
  "passwordGenerator.faq.q1": "Ce générateur de mot de passe est-il sécurisé ?",
  "passwordGenerator.faq.a1":
    "Oui ! Nous utilisons l'API Web Crypto (crypto.getRandomValues) qui fournit des nombres aléatoires cryptographiquement sécurisés. Toute la génération se fait localement dans votre navigateur.",
  "passwordGenerator.faq.q2":
    "Mes mots de passe sont-ils stockés quelque part ?",
  "passwordGenerator.faq.a2":
    "Non. Les mots de passe générés n'existent que dans votre navigateur et ne sont jamais envoyés à aucun serveur. Fermez la page et ils disparaissent.",
  "passwordGenerator.faq.q3": "Qu'est-ce qui fait un mot de passe fort ?",
  "passwordGenerator.faq.a3":
    "Un mot de passe fort est long (16+ caractères), utilise différents types de caractères, est unique à chaque compte et est aléatoire (pas basé sur des mots du dictionnaire).",
};
