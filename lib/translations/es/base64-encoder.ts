export const base64Encoder = {
  "base64Encoder.title": "Codificador Base64",
  "base64Encoder.description":
    "Codifica y descodifica texto Base64 en línea con conversión en tiempo real",
  "base64Encoder.pageTitle": "Codificador y Descodificador Base64",
  "base64Encoder.pageSubtitle":
    "Codifica texto a Base64 o descodifica Base64 a texto",
  "base64Encoder.inputLabel": "Texto de Entrada",
  "base64Encoder.inputLabelBase64": "Base64 de Entrada",
  "base64Encoder.outputPlaceholder": "El texto convertido aparecerá aquí...",
  "base64Encoder.inputPlaceholder": "Introduce tu texto aquí...",
  "base64Encoder.inputPlaceholderBase64": "Introduce tu Base64 aquí...",
  "base64Encoder.encode": "Codificar",
  "base64Encoder.decode": "Descodificar",
  "base64Encoder.swap": "Intercambiar",
  "base64Encoder.encodeBtn": "Codificar a Base64",
  "base64Encoder.decodeBtn": "Descodificar desde Base64",
  "base64Encoder.examples": "Ejemplos",
  "base64Encoder.examplesHint":
    "Haz clic en un ejemplo para cargarlo en el convertidor:",
  "base64Encoder.examples.simpleText": "Texto Simple",
  "base64Encoder.examples.chineseText": "Texto Chino",
  "base64Encoder.examples.urlData": "Datos URL",
  "base64Encoder.examples.jsonData": "Datos JSON",
  "base64Encoder.error.encoding": "Error al codificar texto a Base64",
  "base64Encoder.error.decoding": "Error al descodificar texto Base64",

  "base64Encoder.techTitle": "Detalles de Implementación Técnica",
  "base64Encoder.tech.dataUri":
    "<strong>Esquema URI de Datos:</strong> <code>data:image/png;base64,iVBORw0KGgo...</code> - Se usa para incrustar imágenes directamente en HTML/CSS",
  "base64Encoder.tech.email":
    "<strong>Adjuntos de Email:</strong> codificación MIME binaria para adjuntos en sistemas de email (SMTP)",
  "base64Encoder.tech.db":
    "<strong>Almacenamiento en Base de Datos:</strong> Convertir BLOBs a columnas TEXT preservando la integridad binaria",
  "base64Encoder.tech.jwt":
    "<strong>Tokens JWT:</strong> Sección de payload en JSON Web Tokens para autenticación de API",
  "base64Encoder.tech.api":
    "<strong>Respuestas de API:</strong> Serializar objetos complejos para respuestas JSON de API",

  "base64Encoder.featuresTitle": "Características Principales",
  "base64Encoder.feature.textBinary.title": "Texto y Binario",
  "base64Encoder.feature.textBinary.desc":
    "Codifica/descodifica tanto cadenas de texto como archivos binarios",
  "base64Encoder.feature.urlSafe.title": "Seguro para URL",
  "base64Encoder.feature.urlSafe.desc":
    "Genera variantes de codificación Base64 seguras para URL",
  "base64Encoder.feature.fileSupport.title": "Soporte de Archivos",
  "base64Encoder.feature.fileSupport.desc":
    "Subir y codificar archivos de imagen y documentos",
  "base64Encoder.feature.privacy.title": "100% Privado",
  "base64Encoder.feature.privacy.desc":
    "Todo el procesamiento ocurre localmente en tu navegador",

  "base64Encoder.useCasesTitle": "Casos de Uso Comunes",
  "base64Encoder.useCase.images": "Incrustar imágenes en archivos HTML y CSS",
  "base64Encoder.useCase.email":
    "Codificar datos para transmisión de email y texto",
  "base64Encoder.useCase.db": "Almacenar datos binarios en bases de datos",
  "base64Encoder.useCase.auth": "Autenticación de API y manejo de tokens",
  "base64Encoder.useCase.serialization":
    "Serialización de datos para aplicaciones web",

  "base64Encoder.limitsTitle": "Límites de Uso y Mejores Prácticas",
  "base64Encoder.limits.limitations": "⚠️ Limitaciones",
  "base64Encoder.limits.sizeIncrease":
    "Aumenta el tamaño de datos en ~33% (4 caracteres por 3 bytes)",
  "base64Encoder.limits.largeFiles":
    "No es adecuado para archivos grandes (usa protocolos binarios en su lugar)",
  "base64Encoder.limits.notEncryption":
    "No es encriptación - fácilmente reversible, no lo uses para datos sensibles",
  "base64Encoder.limits.browserMemory":
    "Límites de memoria del navegador para entradas muy grandes",

  "base64Encoder.limits.bestPractices": "✅ Mejores Prácticas",
  "base64Encoder.limits.smallBinary":
    "Usa para datos binarios pequeños (imágenes, archivos < 10MB)",
  "base64Encoder.limits.compression":
    "Combina con compresión (gzip) para mayor eficiencia",
  "base64Encoder.limits.urlSafe":
    "Usa Base64 seguro para URL (+/-) para aplicaciones web",
  "base64Encoder.limits.validation":
    "Siempre valida la entrada Base64 antes de descodificar",

  "base64Encoder.security.title": "🔒 Nota de Seguridad",
  "base64Encoder.security.desc":
    "Base64 NO es encriptación. No proporciona seguridad ni privacidad. Solo úsalo para conversión de formatos de datos, nunca para proteger información sensible. Para encriptación, usa algoritmos criptográficos apropiados como AES.",

  // SEO Content
  "base64Encoder.seo.title": "¿Qué es la Codificación Base64?",
  "base64Encoder.seo.description":
    '<strong className="text-foreground">La codificación Base64</strong> es un esquema de codificación de binario a texto que convierte datos binarios a formato de cadena ASCII. Es ampliamente usado para codificar datos binarios que necesitan almacenarse y transferirse sobre medios diseñados para tratar con datos textuales. Nuestra herramienta gratuita de codificador/descodificador Base64 en línea maneja la conversión de datos textuales y binarios al instante.',
  "base64Encoder.seo.techImplTitle": "🔧 Implementación Técnica",
  "base64Encoder.seo.techImplDesc":
    'Nuestro codificador Base64 usa las funciones integradas de JavaScript <code className="bg-background px-1 rounded">btoa()</code> y <code className="bg-background px-1 rounded">atob()</code> con manejo adecuado de Unicode vía <code className="bg-background px-1 rounded">encodeURIComponent()</code> para caracteres internacionales. El algoritmo mapea cada 3 bytes de datos binarios a 4 caracteres Base64 usando un alfabeto de 64 caracteres (A-Z, a-z, 0-9, +, /) con relleno (=) para grupos de bytes incompletos.',

  "base64Encoder.seo.featuresTitle": "Características Principales",
  "base64Encoder.seo.feature1.title": "Conversión Instantánea",
  "base64Encoder.seo.feature1.desc":
    "Codificación y descodificación en tiempo real",
  "base64Encoder.seo.feature2.title": "Soporte Unicode",
  "base64Encoder.seo.feature2.desc":
    "Maneja cualquier carácter incluyendo chino, emoji",
  "base64Encoder.seo.feature3.title": "Seguro para URL",
  "base64Encoder.seo.feature3.desc": "Compatible con estándares web",
  "base64Encoder.seo.feature4.title": "100% Privado",
  "base64Encoder.seo.feature4.desc":
    "Todo el procesamiento ocurre localmente en el navegador",
  "base64Encoder.seo.howToUseTitle": "Cómo Usar",
  "base64Encoder.seo.howToUse1":
    "Introduce tu texto o datos Base64 en el campo de entrada",
  "base64Encoder.seo.howToUse2":
    "Elige el modo codificar o descodificar y haz clic en el botón convertir",
  "base64Encoder.seo.howToUse3": "Copia el resultado con un clic",

  "base64Encoder.faqTitle": "Preguntas Frecuentes",
  "base64Encoder.faq.q1": "¿Qué es la codificación Base64?",
  "base64Encoder.faq.a1":
    "Base64 es un esquema de codificación de binario a texto que representa datos binarios en formato de cadena ASCII. Es comúnmente usado para transmitir datos binarios sobre sistemas que solo pueden manejar texto de manera confiable, como email o ciertas APIs web.",
  "base64Encoder.faq.q2": "¿Es gratuita esta herramienta Base64?",
  "base64Encoder.faq.a2":
    "Sí, este codificador y descodificador Base64 es completamente gratuito de usar. No se requiere registro o inscripción. Tus datos se procesan localmente en tu navegador para máxima privacidad y seguridad.",
  "base64Encoder.faq.q3":
    "¿Puedo codificar y descodificar Base64 sin conexión?",
  "base64Encoder.faq.a3":
    "Sí, nuestra herramienta Base64 funciona completamente sin conexión. Toda la codificación y descodificación ocurre en tu navegador usando JavaScript, así que puedes usarla sin conexión a internet.",
  "base64Encoder.faq.q4": "¿Son seguros mis datos al usar esta herramienta?",
  "base64Encoder.faq.a4":
    "Absolutamente. Toda la codificación y descodificación Base64 ocurre localmente en tu navegador. Tus datos nunca se envían a ningún servidor ni se almacenan en ningún lugar, asegurando privacidad y seguridad completas.",

  // Real-World Scenarios
  "base64Encoder.scenarios.title": "Escenarios del Mundo Real",
  "base64Encoder.scenarios.scenario1.title": "Reemplazo de Adjuntos de Email",
  "base64Encoder.scenarios.scenario1.desc":
    "El desarrollador necesita incluir un ícono pequeño en un email pero quiere evitar las limitaciones de adjuntos.",
  "base64Encoder.scenarios.scenario1.problem": "📧 Problema:",
  "base64Encoder.scenarios.scenario1.problemDesc":
    "El servidor de email bloquea adjuntos o el destinatario tiene limitaciones de tamaño",
  "base64Encoder.scenarios.scenario1.solution": "🔧 Solución Base64:",
  "base64Encoder.scenarios.scenario1.solutionDesc":
    "Convertir ícono pequeño (logo.png) a Base64 e incrustar en email HTML",
  "base64Encoder.scenarios.scenario1.result":
    "Resultado: El email muestra el ícono sin requerir archivos adjuntos externos.",
  "base64Encoder.scenarios.scenario2.title": "Token de Autenticación de API",
  "base64Encoder.scenarios.scenario2.desc":
    "El desarrollador de aplicación móvil necesita codificar credenciales de usuario para Autenticación Básica en solicitudes de API.",
  "base64Encoder.scenarios.scenario2.credentials":
    "🔐 Credenciales de Usuario:",
  "base64Encoder.scenarios.scenario2.encoded": "🔑 Codificado Base64:",
  "base64Encoder.scenarios.scenario2.header": "📡 Encabezado de Solicitud API:",
  "base64Encoder.scenarios.scenario2.result":
    "Resultado: Las credenciales se codifican de manera segura para Autenticación Básica HTTP.",
  "base64Encoder.scenarios.scenario3.title": "Datos JSON con Contenido Binario",
  "base64Encoder.scenarios.scenario3.desc":
    "El desarrollador backend necesita almacenar un archivo PDF pequeño en un campo de base de datos JSON.",
  "base64Encoder.scenarios.scenario3.binary": "📄 Datos Binarios:",
  "base64Encoder.scenarios.scenario3.binaryDesc":
    "document.pdf (45 KB) - formato binario no compatible con JSON",
  "base64Encoder.scenarios.scenario3.encoding": "🔄 Codificación Base64:",
  "base64Encoder.scenarios.scenario3.storage": "💾 Almacenamiento JSON:",
  "base64Encoder.scenarios.scenario3.result":
    "Resultado: El contenido PDF binario ahora se almacena como texto en el campo de base de datos JSON.",

  // Step-by-Step Guide
  "base64Encoder.guide.title": "Cómo Usar la Codificación Base64",
  "base64Encoder.guide.step1.title": "Elegir Codificar o Descodificar",
  "base64Encoder.guide.step1.desc":
    "Selecciona 'Codificar' para convertir texto/binario a Base64, o 'Descodificar' para convertir Base64 de vuelta al formato original.",
  "base64Encoder.guide.step2.title": "Introduce Tus Datos",
  "base64Encoder.guide.step2.desc":
    "Escribe texto o sube un archivo (imágenes, documentos) que quieras codificar o descodificar.",
  "base64Encoder.guide.step3.title": "Generar Resultado",
  "base64Encoder.guide.step3.desc":
    "Haz clic en el botón convertir para ver instantáneamente el resultado codificado o descodificado en Base64.",
  "base64Encoder.guide.step4.title": "Copiar e Implementar",
  "base64Encoder.guide.step4.desc":
    "Copia el resultado para usar en tus aplicaciones, APIs, plantillas de email, o almacenamiento de datos.",
};
