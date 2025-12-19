export const encodingConverter = {
  "encodingConverter.title": "Convertidor de Codificación de Caracteres",
  "encodingConverter.description":
    "Convierte texto entre diferentes codificaciones de caracteres como UTF-8, GBK, ISO-8859-1",
  "encodingConverter.pageTitle": "Convertidor de Codificación de Caracteres",
  "encodingConverter.pageSubtitle":
    "Convierte texto entre UTF-8, GBK y otras codificaciones",
  "encodingConverter.inputLabel": "Texto de Entrada",
  "encodingConverter.inputPlaceholder": "Introduce o pega texto aquí...",
  "encodingConverter.outputLabel": "Salida Convertida",
  "encodingConverter.outputPlaceholder":
    "El texto convertido aparecerá aquí...",
  "encodingConverter.sourceEncoding": "Codificación de Origen",
  "encodingConverter.targetEncoding": "Codificación de Destino",
  "encodingConverter.convert": "Convertir",
  "encodingConverter.autoDetect": "Detección Automática",
  "encodingConverter.hexView": "Vista Hex",
  "encodingConverter.textView": "Vista de Texto",
  "encodingConverter.examples": "Ejemplos",
  "encodingConverter.examplesHint": "Haz clic en un ejemplo para cargarlo:",
  "encodingConverter.examples.chinese": "Texto Chino",
  "encodingConverter.examples.japanese": "Texto Japonés",
  "encodingConverter.examples.mixed": "Contenido Mixto",
  "encodingConverter.error.converting": "Error al convertir codificación",
  "encodingConverter.error.invalidInput":
    "Entrada inválida para la codificación seleccionada",

  // Encoding names for dropdowns
  "encodingConverter.encodings.utf8": "UTF-8",
  "encodingConverter.encodings.utf16": "UTF-16",
  "encodingConverter.encodings.ascii": "ASCII",
  "encodingConverter.encodings.iso88591": "ISO-8859-1",
  "encodingConverter.encodings.hex": "Hexadecimal",
  "encodingConverter.encodings.binary": "Binario",
  "encodingConverter.encodings.unicodeEscape": "Escape Unicode",

  // SEO Content
  "encodingConverter.seo.title":
    "¿Qué es la Codificación de Caracteres? ¿Cómo Funciona?",
  "encodingConverter.seo.description":
    '<strong className="text-foreground">La codificación de caracteres</strong> es un sistema que mapea caracteres a bytes para almacenamiento y transmisión. Nuestra implementación utiliza las APIs TextEncoder/TextDecoder integradas de JavaScript con manejadores personalizados para formatos hexadecimales, binarios y de escape Unicode. Diferentes codificaciones como UTF-8, GBK e ISO-8859-1 representan caracteres de manera diferente, lo que puede causar "mojibake" (texto distorsionado) cuando los datos se decodifican con la codificación incorrecta.',

  "encodingConverter.techTitle": "Implementación Técnica",
  "encodingConverter.tech.coreLogic": "Lógica de Conversión Principal:",
  "encodingConverter.tech.logic1":
    "TextEncoder/TextDecoder para procesamiento UTF-8/UTF-16",
  "encodingConverter.tech.logic2":
    "Conversión hexadecimal/binaria personalizada con alineación de bytes adecuada",
  "encodingConverter.tech.logic3":
    "Análisis de secuencias de escape Unicode (formato \\uXXXX)",
  "encodingConverter.tech.logic4":
    "Manejo de pares surrogates para emojis (0x10000-0x10FFFF)",
  "encodingConverter.tech.logic5":
    "Procesamiento carácter por carácter con recuperación de errores",

  "encodingConverter.tech.supported": "Codificaciones Soportadas:",
  "encodingConverter.tech.utf8":
    "UTF-8: 1-4 bytes por carácter, compatible hacia atrás con ASCII",
  "encodingConverter.tech.utf16":
    "UTF-16: 2 o 4 bytes por carácter (BMP + pares surrogates)",
  "encodingConverter.tech.ascii":
    "ASCII: codificación de 7 bits (0-127), subconjunto de UTF-8",
  "encodingConverter.tech.iso":
    "ISO-8859-1: codificación de 8 bits para idiomas de Europa Occidental",
  "encodingConverter.tech.hex":
    "Hexadecimal: representación hexadecimal de dos dígitos de cada byte",
  "encodingConverter.tech.binary":
    "Binario: representación binaria de 8 bits separada por espacios",

  "encodingConverter.featuresTitle": "Características Principales",
  "encodingConverter.feature.multi.title": "Multi-Codificación",
  "encodingConverter.feature.multi.desc":
    "Soporte para UTF-8, GBK, Latin-1 y más",
  "encodingConverter.feature.realtime.title": "Conversión en Tiempo Real",
  "encodingConverter.feature.realtime.desc":
    "Vista previa instantánea mientras escribes",
  "encodingConverter.feature.format.title": "Soporte de Formato",
  "encodingConverter.feature.format.desc":
    "Formatos de Texto, Hexadecimal, Base64 y Unicode",
  "encodingConverter.feature.privacy.title": "100% Privado",
  "encodingConverter.feature.privacy.desc":
    "Todo el procesamiento ocurre en tu navegador",

  "encodingConverter.useCasesTitle": "Casos de Uso Comunes y Límites de Uso",
  "encodingConverter.useCase.garbled":
    "Arreglar texto distorsionado de codificación incorrecta",
  "encodingConverter.useCase.garbledDesc":
    "✅ Esencial - Caso de uso más común para recuperar texto legible",
  "encodingConverter.useCase.gbk": "Convertir datos GBK legacy a UTF-8",
  "encodingConverter.useCase.gbkDesc":
    "✅ Recomendado - UTF-8 es el estándar web y más compatible",
  "encodingConverter.useCase.debug":
    "Depurando problemas de codificación de caracteres",
  "encodingConverter.useCase.debugDesc":
    "✅ Perfecto - La vista hexadecimal ayuda a identificar problemas de codificación",
  "encodingConverter.useCase.hex":
    "Viendo representación hexadecimal del texto",
  "encodingConverter.useCase.hexDesc":
    "✅ Útil - Aplicaciones de depuración y análisis de datos",
  "encodingConverter.useCase.unicode": "Convirtiendo entre formatos Unicode",
  "encodingConverter.useCase.unicodeDesc":
    "⚠️ Dependiente del contexto - Asegúrate de que el sistema objetivo soporte el formato",

  "encodingConverter.faqTitle": "Preguntas Frecuentes",
  "encodingConverter.faq.q1": "¿Cuál es la diferencia entre UTF-8 y UTF-16?",
  "encodingConverter.faq.a1":
    "UTF-8 usa 1-4 bytes por carácter y es compatible hacia atrás con ASCII. UTF-16 usa 2 o 4 bytes. UTF-8 es más común en la web, mientras que UTF-16 se usa internamente por Windows y Java.",
  "encodingConverter.faq.q2": "¿Cómo arreglo texto chino distorsionado?",
  "encodingConverter.faq.a2":
    "El chino distorsionado generalmente significa que el texto fue codificado en GBK pero decodificado como UTF-8 (o viceversa). Intenta convertir desde la codificación original a UTF-8.",
  "encodingConverter.faq.q3": "¿Son seguros mis datos?",
  "encodingConverter.faq.a3":
    "Sí, toda la conversión de codificación ocurre localmente en tu navegador. Tus datos nunca se envían a ningún servidor.",
};
