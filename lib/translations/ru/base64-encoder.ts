export const base64Encoder = {
  "base64Encoder.title": "Base64 Кодировщик",
  "base64Encoder.description":
    "Кодировать и декодировать текст Base64 онлайн с преобразованием в реальном времени",
  "base64Encoder.pageTitle": "Base64 Кодировщик и Декодировщик",
  "base64Encoder.pageSubtitle":
    "Кодировать текст в Base64 или декодировать Base64 в текст",
  "base64Encoder.inputLabel": "Входной Текст",
  "base64Encoder.inputLabelBase64": "Входной Base64",
  "base64Encoder.outputPlaceholder": "Преобразованный текст появится здесь...",
  "base64Encoder.inputPlaceholder": "Введите ваш текст здесь...",
  "base64Encoder.inputPlaceholderBase64": "Введите ваш Base64 здесь...",
  "base64Encoder.encode": "Кодировать",
  "base64Encoder.decode": "Декодировать",
  "base64Encoder.swap": "Поменять",
  "base64Encoder.encodeBtn": "Кодировать в Base64",
  "base64Encoder.decodeBtn": "Декодировать из Base64",
  "base64Encoder.examples": "Примеры",
  "base64Encoder.examplesHint":
    "Нажмите на пример, чтобы загрузить его в конвертер:",
  "base64Encoder.examples.simpleText": "Простой Текст",
  "base64Encoder.examples.chineseText": "Китайский Текст",
  "base64Encoder.examples.urlData": "URL Данные",
  "base64Encoder.examples.jsonData": "JSON Данные",
  "base64Encoder.error.encoding": "Error encoding text to Base64",
  "base64Encoder.error.decoding": "Error decoding Base64 text",

  "base64Encoder.techTitle": "Technical Implementation Details",
  "base64Encoder.tech.dataUri":
    "<strong>Data URI Scheme:</strong> <code>data:image/png;base64,iVBORw0KGgo...</code> - Used for embedding images directly in HTML/CSS",
  "base64Encoder.tech.email":
    "<strong>Email Attachments:</strong> binary MIME encoding for attachments in email systems (SMTP)",
  "base64Encoder.tech.db":
    "<strong>Database Storage:</strong> Converting BLOBs to TEXT columns while preserving binary integrity",
  "base64Encoder.tech.jwt":
    "<strong>JWT Tokens:</strong> Payload section in JSON Web Tokens for API authentication",
  "base64Encoder.tech.api":
    "<strong>API Responses:</strong> Serializing complex objects for JSON API responses",

  "base64Encoder.featuresTitle": "Key Features",
  "base64Encoder.feature.textBinary.title": "Text & Binary",
  "base64Encoder.feature.textBinary.desc":
    "Encode/decode both text strings and binary files",
  "base64Encoder.feature.urlSafe.title": "URL Safe",
  "base64Encoder.feature.urlSafe.desc":
    "Generate URL-safe Base64 encoding variants",
  "base64Encoder.feature.fileSupport.title": "File Support",
  "base64Encoder.feature.fileSupport.desc":
    "Upload and encode image and document files",
  "base64Encoder.feature.privacy.title": "100% Private",
  "base64Encoder.feature.privacy.desc":
    "All processing happens locally in your browser",

  "base64Encoder.useCasesTitle": "Common Use Cases",
  "base64Encoder.useCase.images": "Embedding images in HTML and CSS files",
  "base64Encoder.useCase.email":
    "Encoding data for email and text transmission",
  "base64Encoder.useCase.db": "Storing binary data in databases",
  "base64Encoder.useCase.auth": "API authentication and token handling",
  "base64Encoder.useCase.serialization":
    "Data serialization for web applications",

  "base64Encoder.limitsTitle": "Usage Limits & Best Practices",
  "base64Encoder.limits.limitations": "⚠️ Limitations",
  "base64Encoder.limits.sizeIncrease":
    "Increases data size by ~33% (4 chars per 3 bytes)",
  "base64Encoder.limits.largeFiles":
    "Not suitable for large files (use binary protocols instead)",
  "base64Encoder.limits.notEncryption":
    "Not encryption - easily reversible, don't use for sensitive data",
  "base64Encoder.limits.browserMemory":
    "Browser memory limits for very large inputs",

  "base64Encoder.limits.bestPractices": "✅ Best Practices",
  "base64Encoder.limits.smallBinary":
    "Use for small binary data (images, files < 10MB)",
  "base64Encoder.limits.compression":
    "Combine with compression (gzip) for efficiency",
  "base64Encoder.limits.urlSafe":
    "Use URL-safe Base64 (+/-) for web applications",
  "base64Encoder.limits.validation":
    "Always validate Base64 input before decoding",

  "base64Encoder.security.title": "🔒 Security Note",
  "base64Encoder.security.desc":
    "Base64 is NOT encryption. It provides no security or privacy. Only use for data format conversion, never for protecting sensitive information. For encryption, use proper cryptographic algorithms like AES.",

  // SEO Content
  "base64Encoder.seo.title": "Что такое кодирование Base64?",
  "base64Encoder.seo.description":
    '<strong className="text-foreground">Кодирование Base64</strong> — это схема кодирования из двоичного в текстовый формат, которая преобразует двоичные данные в строку формата ASCII. Широко используется для кодирования двоичных данных, которые необходимо хранить и передавать через среду, предназначенную для работы с текстовыми данными. Наш бесплатный онлайн-инструмент кодировщика и декодировщика Base64 мгновенно обрабатывает преобразование текста и двоичных данных.',
  "base64Encoder.seo.techImplTitle": "🔧 Техническая реализация",
  "base64Encoder.seo.techImplDesc":
    'Наш кодировщик Base64 использует встроенные функции JavaScript <code className="bg-background px-1 rounded">btoa()</code> и <code className="bg-background px-1 rounded">atob()</code> с правильной обработкой Unicode через <code className="bg-background px-1 rounded">encodeURIComponent()</code> для международных символов. Алгоритм сопоставляет каждые 3 байта двоичных данных с 4 символами Base64, используя 64-символьный алфавит (A-Z, a-z, 0-9, +, /) с дополнением (=) для неполных групп байтов.',

  "base64Encoder.seo.featuresTitle": "Ключевые функции",
  "base64Encoder.seo.feature1.title": "Мгновенное преобразование",
  "base64Encoder.seo.feature1.desc":
    "Кодирование и декодирование в реальном времени",
  "base64Encoder.seo.feature2.title": "Поддержка Unicode",
  "base64Encoder.seo.feature2.desc":
    "Поддержка любых символов, включая китайские и эмодзи",
  "base64Encoder.seo.feature3.title": "Безопасность для URL",
  "base64Encoder.seo.feature3.desc":
    "Совместимость со стандартами веб-разработки",
  "base64Encoder.seo.feature4.title": "100% конфиденциальность",
  "base64Encoder.seo.feature4.desc":
    "Вся обработка происходит локально в браузере",
  "base64Encoder.seo.howToUseTitle": "Как использовать",
  "base64Encoder.seo.howToUse1":
    "Введите ваш текст или данные Base64 в поле ввода",
  "base64Encoder.seo.howToUse2":
    "Выберите режим кодирования или декодирования и нажмите кнопку преобразования",
  "base64Encoder.seo.howToUse3": "Скопируйте результат одним кликом",

  "base64Encoder.faqTitle": "Часто Задаваемые Вопросы",
  "base64Encoder.faq.q1": "Что такое кодирование Base64?",
  "base64Encoder.faq.a1":
    "Base64 — это схема кодирования из двоичного в текстовый формат, которая представляет двоичные данные в виде строки в формате ASCII. Это обычно используется для передачи двоичных данных через системы, которые могут надежно работать только с текстом, например, электронную почту или определённые веб-API.",
  "base64Encoder.faq.q2": "Бесплатен ли этот инструмент Base64?",
  "base64Encoder.faq.a2":
    "Да, этот кодировщик и декодировщик Base64 полностью бесплатен. Регистрация не требуется. Ваши данные обрабатываются локально в вашем браузере для максимальной конфиденциальности и безопасности.",
  "base64Encoder.faq.q3": "Могу ли я кодировать и декодировать Base64 офлайн?",
  "base64Encoder.faq.a3":
    "Да, наш инструмент Base64 работает полностью офлайн. Всё кодирование и декодирование происходит в вашем браузере с использованием JavaScript, так что вы можете использовать его без подключения к Интернету.",
  "base64Encoder.faq.q4":
    "Безопасны ли мои данные при использовании этого инструмента?",
  "base64Encoder.faq.a4":
    "Абсолютно. Всё кодирование и декодирование Base64 происходит локально в вашем браузере. Ваши данные никогда не отправляются на сервер и нигде не хранятся, обеспечивая полную конфиденциальность и безопасность.",

  // Real-World Scenarios
  "base64Encoder.scenarios.title": "Реальные сценарии",
  "base64Encoder.scenarios.scenario1.title":
    "Замена вложений электронной почты",
  "base64Encoder.scenarios.scenario1.desc":
    "Разработчику нужно включить небольшую иконку в электронное письмо, но он хочет избежать ограничений вложений.",
  "base64Encoder.scenarios.scenario1.problem": "📧 Проблема:",
  "base64Encoder.scenarios.scenario1.problemDesc":
    "Почтовый сервер блокирует вложения или у получателя есть ограничения по размеру",
  "base64Encoder.scenarios.scenario1.solution": "🔧 Решение Base64:",
  "base64Encoder.scenarios.scenario1.solutionDesc":
    "Преобразуйте небольшую иконку (logo.png) в Base64 и вставьте в HTML-письмо",
  "base64Encoder.scenarios.scenario1.result":
    "Результат: Письмо отображает иконку без необходимости внешних файлов вложений.",
  "base64Encoder.scenarios.scenario2.title": "Токен аутентификации API",
  "base64Encoder.scenarios.scenario2.desc":
    "Разработчику мобильного приложения нужно закодировать учетные данные пользователя для базовой аутентификации в API-запросах.",
  "base64Encoder.scenarios.scenario2.credentials":
    "🔐 Учетные данные пользователя:",
  "base64Encoder.scenarios.scenario2.encoded": "🔑 Закодировано в Base64:",
  "base64Encoder.scenarios.scenario2.header": "📡 Заголовок API-запроса:",
  "base64Encoder.scenarios.scenario2.result":
    "Результат: Учетные данные безопасно закодированы для базовой HTTP-аутентификации.",
  "base64Encoder.scenarios.scenario3.title":
    "Данные JSON с двоичным содержимым",
  "base64Encoder.scenarios.scenario3.desc":
    "Бэкенд-разработчику нужно сохранить небольшой PDF-файл в поле базы данных JSON.",
  "base64Encoder.scenarios.scenario3.binary": "📄 Двоичные данные:",
  "base64Encoder.scenarios.scenario3.binaryDesc":
    "document.pdf (45 КБ) - двоичный формат несовместим с JSON",
  "base64Encoder.scenarios.scenario3.encoding": "🔄 Кодирование Base64:",
  "base64Encoder.scenarios.scenario3.storage": "💾 Хранение JSON:",
  "base64Encoder.scenarios.scenario3.result":
    "Результат: Двоичное содержимое PDF теперь хранится как текст в поле базы данных JSON.",

  // Step-by-Step Guide
  "base64Encoder.guide.title": "Как использовать кодирование Base64",
  "base64Encoder.guide.step1.title": "Выберите кодировать или декодировать",
  "base64Encoder.guide.step1.desc":
    "Выберите 'Кодировать' для преобразования текста/двоичных данных в Base64, или 'Декодировать' для обратного преобразования Base64 в исходный формат.",
  "base64Encoder.guide.step2.title": "Введите ваши данные",
  "base64Encoder.guide.step2.desc":
    "Введите текст или загрузите файл (изображения, документы), который вы хотите закодировать или декодировать.",
  "base64Encoder.guide.step3.title": "Создайте результат",
  "base64Encoder.guide.step3.desc":
    "Нажмите кнопку преобразования, чтобы мгновенно увидеть результат кодирования или декодирования Base64.",
  "base64Encoder.guide.step4.title": "Скопируйте и используйте",
  "base64Encoder.guide.step4.desc":
    "Скопируйте результат для использования в ваших приложениях, API, шаблонах электронной почты или хранении данных.",
};
