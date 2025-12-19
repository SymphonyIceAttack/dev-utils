export const encodingConverter = {
  "encodingConverter.title": "Конвертер Кодировки Символов",
  "encodingConverter.description":
    "Преобразование текста между различными кодировками символов, такими как UTF-8, GBK, ISO-8859-1",
  "encodingConverter.pageTitle": "Конвертер Кодировки Символов",
  "encodingConverter.pageSubtitle":
    "Преобразование текста между UTF-8, GBK и другими кодировками",
  "encodingConverter.inputLabel": "Входной Текст",
  "encodingConverter.inputPlaceholder": "Введите или вставьте текст здесь...",
  "encodingConverter.outputLabel": "Преобразованный Вывод",
  "encodingConverter.outputPlaceholder":
    "Преобразованный текст появится здесь...",
  "encodingConverter.sourceEncoding": "Исходная Кодировка",
  "encodingConverter.targetEncoding": "Целевая Кодировка",
  "encodingConverter.convert": "Преобразовать",
  "encodingConverter.autoDetect": "Автоопределение",
  "encodingConverter.hexView": "Hex Вид",
  "encodingConverter.textView": "Текстовый Вид",
  "encodingConverter.examples": "Примеры",
  "encodingConverter.examplesHint": "Нажмите на пример, чтобы загрузить его:",
  "encodingConverter.examples.chinese": "Китайский Текст",
  "encodingConverter.examples.japanese": "Японский Текст",
  "encodingConverter.examples.mixed": "Смешанный Контент",
  "encodingConverter.error.converting": "Ошибка преобразования кодировки",
  "encodingConverter.error.invalidInput":
    "Неверный ввод для выбранной кодировки",

  // Encoding names for dropdowns
  "encodingConverter.encodings.utf8": "UTF-8",
  "encodingConverter.encodings.utf16": "UTF-16",
  "encodingConverter.encodings.ascii": "ASCII",
  "encodingConverter.encodings.iso88591": "ISO-8859-1",
  "encodingConverter.encodings.hex": "Шестнадцатеричный",
  "encodingConverter.encodings.binary": "Двоичный",
  "encodingConverter.encodings.unicodeEscape": "Unicode Escape",

  // SEO Content
  "encodingConverter.seo.title":
    "Что такое Кодировка Символов? Как Она Работает?",
  "encodingConverter.seo.description":
    '<strong className="text-foreground">Кодировка символов</strong> - это система, которая сопоставляет символы с байтами для хранения и передачи. Наша реализация использует встроенные API TextEncoder/TextDecoder JavaScript с пользовательскими обработчиками для шестнадцатеричных, двоичных и Unicode escape форматов. Различные кодировки, такие как UTF-8, GBK и ISO-8859-1, представляют символы по-разному, что может вызвать "mojibake" (искаженный текст), когда данные декодируются с неправильной кодировкой.',

  "encodingConverter.techTitle": "Техническая Реализация",
  "encodingConverter.tech.coreLogic": "Основная Логика Преобразования:",
  "encodingConverter.tech.logic1":
    "TextEncoder/TextDecoder для обработки UTF-8/UTF-16",
  "encodingConverter.tech.logic2":
    "Пользовательское шестнадцатеричное/двоичное преобразование с правильным выравниванием байтов",
  "encodingConverter.tech.logic3":
    "Разбор последовательностей Unicode escape (формат \\uXXXX)",
  "encodingConverter.tech.logic4":
    "Обработка суррогатных пар для эмодзи (0x10000-0x10FFFF)",
  "encodingConverter.tech.logic5":
    "Посимвольная обработка с восстановлением ошибок",

  "encodingConverter.tech.supported": "Поддерживаемые Кодировки:",
  "encodingConverter.tech.utf8":
    "UTF-8: 1-4 байта на символ, обратно совместим с ASCII",
  "encodingConverter.tech.utf16":
    "UTF-16: 2 или 4 байта на символ (BMP + суррогатные пары)",
  "encodingConverter.tech.ascii":
    "ASCII: 7-битная кодировка (0-127), подмножество UTF-8",
  "encodingConverter.tech.iso":
    "ISO-8859-1: 8-битная кодировка для западноевропейских языков",
  "encodingConverter.tech.hex":
    "Шестнадцатеричная: двузначное шестнадцатеричное представление каждого байта",
  "encodingConverter.tech.binary":
    "Двоичная: 8-битное двоичное представление, разделенное пробелами",

  "encodingConverter.featuresTitle": "Основные Возможности",
  "encodingConverter.feature.multi.title": "Множественная Кодировка",
  "encodingConverter.feature.multi.desc":
    "Поддержка UTF-8, GBK, Latin-1 и многого другого",
  "encodingConverter.feature.realtime.title":
    "Преобразование в Реальном Времени",
  "encodingConverter.feature.realtime.desc":
    "Мгновенный предварительный просмотр при вводе",
  "encodingConverter.feature.format.title": "Поддержка Форматов",
  "encodingConverter.feature.format.desc":
    "Текстовые, Шестнадцатеричные, Base64 и Unicode форматы",
  "encodingConverter.feature.privacy.title": "100% Приватность",
  "encodingConverter.feature.privacy.desc":
    "Вся обработка происходит в вашем браузере",

  "encodingConverter.useCasesTitle":
    "Распространенные Случаи Использования и Ограничения",
  "encodingConverter.useCase.garbled":
    "Исправление искаженного текста из-за неправильной кодировки",
  "encodingConverter.useCase.garbledDesc":
    "✅ Необходимо - Наиболее распространенный случай использования для восстановления читаемого текста",
  "encodingConverter.useCase.gbk":
    "Преобразование устаревших GBK данных в UTF-8",
  "encodingConverter.useCase.gbkDesc":
    "✅ Рекомендуется - UTF-8 является веб-стандартом и наиболее совместим",
  "encodingConverter.useCase.debug": "Отладка проблем кодировки символов",
  "encodingConverter.useCase.debugDesc":
    "✅ Идеально - Шестнадцатеричный вид помогает выявить проблемы кодировки",
  "encodingConverter.useCase.hex":
    "Просмотр шестнадцатеричного представления текста",
  "encodingConverter.useCase.hexDesc":
    "✅ Полезно - Приложения для отладки и анализа данных",
  "encodingConverter.useCase.unicode": "Преобразование между форматами Unicode",
  "encodingConverter.useCase.unicodeDesc":
    "⚠️ Зависит от контекста - Убедитесь, что целевая система поддерживает формат",

  "encodingConverter.faqTitle": "Часто Задаваемые Вопросы",
  "encodingConverter.faq.q1": "В чем разница между UTF-8 и UTF-16?",
  "encodingConverter.faq.a1":
    "UTF-8 использует 1-4 байта на символ и обратно совместим с ASCII. UTF-16 использует 2 или 4 байта. UTF-8 более распространен в вебе, в то время как UTF-16 используется внутри Windows и Java.",
  "encodingConverter.faq.q2": "Как исправить искаженный китайский текст?",
  "encodingConverter.faq.a2":
    "Искаженный китайский обычно означает, что текст был закодирован в GBK, но декодирован как UTF-8 (или наоборот). Попробуйте преобразовать из исходной кодировки в UTF-8.",
  "encodingConverter.faq.q3": "Безопасны ли мои данные?",
  "encodingConverter.faq.a3":
    "Да, все преобразование кодировки происходит локально в вашем браузере. Ваши данные никогда не отправляются на какой-либо сервер.",
};
