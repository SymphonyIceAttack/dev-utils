export const uuidGenerator = {
  "uuidGenerator.title": "Generador UUID",
  "uuidGenerator.description":
    "Genera UUIDs compatibles con RFC4122 (v4, v7, v1) con opciones personalizables",
  "uuidGenerator.pageTitle": "Generador UUID",
  "uuidGenerator.pageSubtitle":
    "Genera identificadores únicos universales al instante",
  "uuidGenerator.generate": "Generar UUID",
  "uuidGenerator.generateBtn": "Generar UUID",
  "uuidGenerator.regenerate": "Regenerar",
  "uuidGenerator.version": "Versión",
  "uuidGenerator.format": "Formato",
  "uuidGenerator.count": "Cantidad",
  "uuidGenerator.outputLabel": "UUID Generado",
  "uuidGenerator.outputPlaceholder":
    "Haz clic en generar para crear un UUID...",
  "uuidGenerator.bulk": "Generación Masiva",
  "uuidGenerator.generateMultiple": "Generar Múltiples",
  "uuidGenerator.bulkPlaceholder": "Los UUIDs generados aparecerán aquí...",
  "uuidGenerator.error.generating": "Error generando UUID",

  // Options
  "uuidGenerator.option.v4": "UUID v4 (Aleatorio)",
  "uuidGenerator.option.v7": "UUID v7 (Marca de tiempo)",
  "uuidGenerator.option.v1": "UUID v1 (Basado en tiempo)",
  "uuidGenerator.option.standard": "Estándar (con guiones)",
  "uuidGenerator.option.withoutHyphens": "Sin guiones",
  "uuidGenerator.option.uppercase": "Mayúsculas",
  "uuidGenerator.option.braces": "Con llaves",

  // Examples
  "uuidGenerator.examplesTitle": "Ejemplos UUID",
  "uuidGenerator.examplesDesc":
    'Diferentes versiones UUID y formatos para varios casos de uso. Haz clic en "Ejecución rápida" para generar, o "Copiar" para copiar un UUID:',
  "uuidGenerator.example.v4.title": "UUID v4 (Aleatorio)",
  "uuidGenerator.example.v4.desc": "El más común para propósitos generales",
  "uuidGenerator.example.v7.title": "UUID v7 (Marca de tiempo)",
  "uuidGenerator.example.v7.desc": "Ordenable por tiempo de creación",
  "uuidGenerator.example.v1.title": "UUID v1 (Basado en tiempo)",
  "uuidGenerator.example.v1.desc": "Contiene información de marca de tiempo",
  "uuidGenerator.example.noHyphens.title": "UUID sin guiones",
  "uuidGenerator.example.noHyphens.desc": "Formato compacto para URLs",
  "uuidGenerator.example.uppercase.title": "UUID en mayúsculas",
  "uuidGenerator.example.uppercase.desc": "Formato todo en mayúsculas",
  "uuidGenerator.example.braces.title": "UUID con llaves",
  "uuidGenerator.example.braces.desc": "Envuelto en llaves",

  // SEO Content
  "uuidGenerator.whatIsUuidTitle": "¿Qué es UUID?",
  "uuidGenerator.whatIsUuidDesc":
    '<strong className="text-foreground">UUID (Universally Unique Identifier)</strong> es un identificador de 128 bits que está garantizado como único a través del tiempo y el espacio. Los UUIDs son ampliamente utilizados en sistemas distribuidas, bases de datos y aplicaciones donde se requiere identificación única sin coordinación central.',

  "uuidGenerator.techDetailsTitle": "Detalles de implementación técnica",
  "uuidGenerator.tech.webCrypto":
    '<strong>Web Crypto API:</strong> Utiliza <code className="bg-background px-1 rounded">crypto.getRandomValues()</code> para generación criptográficamente segura de números aleatorios',
  "uuidGenerator.tech.v4Struct":
    '<strong>Estructura UUID v4:</strong> <code className="bg-background px-1 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> donde x es hex aleatorio, 4 indica versión, y es variante (8, 9, a, o b)',
  "uuidGenerator.tech.v7Struct":
    "<strong>Estructura UUID v7:</strong> Los primeros 48 bits son marca de tiempo Unix en milisegundos, seguidos por bits de versión (0111), luego datos aleatorios con bits de variante",
  "uuidGenerator.tech.bitManip":
    '<strong>Manipulación de bits:</strong> <code className="bg-background px-1 rounded">bytes[6] = (bytes[6] & 0x0f) | 0x40</code> establece versión 4, <code className="bg-background px-1 rounded">bytes[8] = (bytes[8] & 0x3f) | 0x80</code> establece variante RFC4122',
  "uuidGenerator.tech.collision":
    "<strong>Probabilidad de colisión:</strong> Con 122 bits aleatorios en v4, probabilidad de colisión es ~1 en 2.71 quintillion",

  "uuidGenerator.featuresTitle": "Características principales",
  "uuidGenerator.feature.rfc.title": "Cumple RFC4122",
  "uuidGenerator.feature.rfc.desc": "Soporte estándar UUID v1, v4 y v7",
  "uuidGenerator.feature.formats.title": "Múltiples formatos",
  "uuidGenerator.feature.formats.desc": "Estándar, mayúsculas, llaves y más",
  "uuidGenerator.feature.bulk.title": "Generación masiva",
  "uuidGenerator.feature.bulk.desc": "Genera miles de UUIDs a la vez",
  "uuidGenerator.feature.privacy.title": "100% Privado",
  "uuidGenerator.feature.privacy.desc":
    "Todo el procesamiento ocurre en tu navegador",

  "uuidGenerator.comparisonTitle": "Comparación de versiones UUID",
  "uuidGenerator.comparison.version": "Versión",
  "uuidGenerator.comparison.method": "Método de generación",
  "uuidGenerator.comparison.sortable": "Ordenable",
  "uuidGenerator.comparison.bestFor": "Mejor para",
  "uuidGenerator.comparison.v1.method": "Marca de tiempo + dirección MAC",
  "uuidGenerator.comparison.v1.sortable": "Parcial",
  "uuidGenerator.comparison.v1.bestFor":
    "Sistemas heredados (preocupaciones de privacidad)",
  "uuidGenerator.comparison.v4.method": "Aleatorio (122 bits)",
  "uuidGenerator.comparison.v4.sortable": "No",
  "uuidGenerator.comparison.v4.bestFor": "Propósito general, más común",
  "uuidGenerator.comparison.v7.method": "Marca de tiempo Unix + aleatorio",
  "uuidGenerator.comparison.v7.sortable": "Sí",
  "uuidGenerator.comparison.v7.bestFor":
    "PKs de base de datos, datos ordenados por tiempo",

  "uuidGenerator.useCasesTitle": "Casos de uso comunes",
  "uuidGenerator.useCase.db":
    "Claves primarias de base de datos en sistemas distribuidos",
  "uuidGenerator.useCase.session":
    "Identificadores de sesión y tokens de autenticación",
  "uuidGenerator.useCase.distributed":
    "IDs de transacción distribuidos a través de microservicios",
  "uuidGenerator.useCase.files": "Nombres de archivos y recursos sin colisión",
  "uuidGenerator.useCase.queue": "Claves de deduplicación de cola de mensajes",

  "uuidGenerator.faqTitle": "Preguntas frecuentes",
  "uuidGenerator.faq.q1": "¿Cuál es la diferencia entre las versiones UUID?",
  "uuidGenerator.faq.a1":
    "v4 usa generación aleatoria, v7 incluye marca de tiempo para mejor ordenación, v1 usa dirección MAC y marca de tiempo (obsoleto por privacidad).",
  "uuidGenerator.faq.q2": "¿Los UUIDs son realmente únicos?",
  "uuidGenerator.faq.a2":
    "Sí, la probabilidad de generar UUIDs duplicados es extremadamente baja. Para v4, la posibilidad de colisión es negligible para propósitos prácticos.",
  "uuidGenerator.faq.q3": "¿Puedo usar UUIDs como claves primarias?",
  "uuidGenerator.faq.a3":
    "¡Absolutamente! Los UUIDs son excelentes para sistemas distribuidas donde la generación centralizada de ID no es factible.",
};
