export const uuidGenerator = {
  "uuidGenerator.title": "Генератор UUID",
  "uuidGenerator.description":
    "Генерируйте UUID, соответствующие RFC4122 (v4, v7, v1), с настраиваемыми параметрами",
  "uuidGenerator.pageTitle": "Генератор UUID",
  "uuidGenerator.pageSubtitle":
    "Генерируйте универсальные уникальные идентификаторы мгновенно",
  "uuidGenerator.generate": "Генерировать UUID",
  "uuidGenerator.generateBtn": "Генерировать UUID",
  "uuidGenerator.regenerate": "Перегенерировать",
  "uuidGenerator.version": "Версия",
  "uuidGenerator.format": "Формат",
  "uuidGenerator.count": "Количество",
  "uuidGenerator.outputLabel": "Сгенерированный UUID",
  "uuidGenerator.outputPlaceholder":
    "Нажмите сгенерировать, чтобы создать UUID...",
  "uuidGenerator.bulk": "Массовая Генерация",
  "uuidGenerator.generateMultiple": "Генерировать Множественные",
  "uuidGenerator.bulkPlaceholder": "Сгенерированные UUID появятся здесь...",
  "uuidGenerator.error.generating": "Ошибка генерации UUID",

  // Options
  "uuidGenerator.option.v4": "UUID v4 (Случайный)",
  "uuidGenerator.option.v7": "UUID v7 (Временная метка)",
  "uuidGenerator.option.v1": "UUID v1 (На основе времени)",
  "uuidGenerator.option.standard": "Стандартный (с дефисами)",
  "uuidGenerator.option.withoutHyphens": "Без дефисов",
  "uuidGenerator.option.uppercase": "Заглавные буквы",
  "uuidGenerator.option.braces": "С фигурными скобками",

  // Examples
  "uuidGenerator.examplesTitle": "Примеры UUID",
  "uuidGenerator.examplesDesc":
    'Различные версии UUID и форматы для различных случаев использования. Нажмите "Быстрый запуск" для генерации или "Копировать" для копирования UUID:',
  "uuidGenerator.example.v4.title": "UUID v4 (Случайный)",
  "uuidGenerator.example.v4.desc": "Самый распространенный для общих целей",
  "uuidGenerator.example.v7.title": "UUID v7 (Временная метка)",
  "uuidGenerator.example.v7.desc": "Сортируемый по времени создания",
  "uuidGenerator.example.v1.title": "UUID v1 (На основе времени)",
  "uuidGenerator.example.v1.desc": "Содержит информацию о временной метке",
  "uuidGenerator.example.noHyphens.title": "UUID без дефисов",
  "uuidGenerator.example.noHyphens.desc": "Компактный формат для URL",
  "uuidGenerator.example.uppercase.title": "UUID заглавными буквами",
  "uuidGenerator.example.uppercase.desc": "Все заглавными буквами",
  "uuidGenerator.example.braces.title": "UUID с фигурными скобками",
  "uuidGenerator.example.braces.desc": "Обернуто в фигурные скобки",

  // SEO Content
  "uuidGenerator.whatIsUuidTitle": "Что такое UUID?",
  "uuidGenerator.whatIsUuidDesc":
    '<strong className="text-foreground">UUID (Universally Unique Identifier)</strong> - это 128-битный идентификатор, который гарантированно уникален как во времени, так и в пространстве. UUID широко используются в распределенных системах, базах данных и приложениях, где требуется уникальная идентификация без центральной координации.',

  "uuidGenerator.techDetailsTitle": "Детали технической реализации",
  "uuidGenerator.tech.webCrypto":
    '<strong>Web Crypto API:</strong> Использует <code className="bg-background px-1 rounded">crypto.getRandomValues()</code> для криптографически безопасной генерации случайных чисел',
  "uuidGenerator.tech.v4Struct":
    '<strong>Структура UUID v4:</strong> <code className="bg-background px-1 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> где x - случайный hex, 4 указывает версию, y - вариант (8, 9, a, или b)',
  "uuidGenerator.tech.v7Struct":
    "<strong>Структура UUID v7:</strong> Первые 48 бит - временная метка Unix в миллисекундах, затем биты версии (0111), затем случайные данные с битами варианта",
  "uuidGenerator.tech.bitManip":
    '<strong>Манипуляция битами:</strong> <code className="bg-background px-1 rounded">bytes[6] = (bytes[6] & 0x0f) | 0x40</code> устанавливает версию 4, <code className="bg-background px-1 rounded">bytes[8] = (bytes[8] & 0x3f) | 0x80</code> устанавливает вариант RFC4122',
  "uuidGenerator.tech.collision":
    "<strong>Вероятность коллизии:</strong> С 122 случайными битами в v4, вероятность коллизии составляет ~1 из 2,71 квинтиллиона",

  "uuidGenerator.featuresTitle": "Ключевые функции",
  "uuidGenerator.feature.rfc.title": "Соответствует RFC4122",
  "uuidGenerator.feature.rfc.desc": "Поддержка стандарта UUID v1, v4 и v7",
  "uuidGenerator.feature.formats.title": "Множественные форматы",
  "uuidGenerator.feature.formats.desc":
    "Стандартный, заглавные, скобки и другие",
  "uuidGenerator.feature.bulk.title": "Массовая генерация",
  "uuidGenerator.feature.bulk.desc": "Генерируйте тысячи UUID за раз",
  "uuidGenerator.feature.privacy.title": "100% Приватность",
  "uuidGenerator.feature.privacy.desc":
    "Вся обработка происходит в вашем браузере",

  "uuidGenerator.comparisonTitle": "Сравнение версий UUID",
  "uuidGenerator.comparison.version": "Версия",
  "uuidGenerator.comparison.method": "Метод генерации",
  "uuidGenerator.comparison.sortable": "Сортируемый",
  "uuidGenerator.comparison.bestFor": "Лучше всего для",
  "uuidGenerator.comparison.v1.method": "Временная метка + MAC адрес",
  "uuidGenerator.comparison.v1.sortable": "Частично",
  "uuidGenerator.comparison.v1.bestFor":
    "Устаревшие системы (проблемы приватности)",
  "uuidGenerator.comparison.v4.method": "Случайный (122 бита)",
  "uuidGenerator.comparison.v4.sortable": "Нет",
  "uuidGenerator.comparison.v4.bestFor": "Общие цели, наиболее распространен",
  "uuidGenerator.comparison.v7.method": "Временная метка Unix + случайный",
  "uuidGenerator.comparison.v7.sortable": "Да",
  "uuidGenerator.comparison.v7.bestFor":
    "Первичные ключи БД, данные, упорядоченные по времени",

  "uuidGenerator.useCasesTitle": "Общие случаи использования",
  "uuidGenerator.useCase.db":
    "Первичные ключи базы данных в распределенных системах",
  "uuidGenerator.useCase.session":
    "Идентификаторы сессий и токены аутентификации",
  "uuidGenerator.useCase.distributed":
    "Идентификаторы распределенных транзакций через микросервисы",
  "uuidGenerator.useCase.files": "Именование файлов и ресурсов без коллизий",
  "uuidGenerator.useCase.queue": "Ключи дедупликации очереди сообщений",

  "uuidGenerator.faqTitle": "Часто задаваемые вопросы",
  "uuidGenerator.faq.q1": "В чем разница между версиями UUID?",
  "uuidGenerator.faq.a1":
    "v4 использует случайную генерацию, v7 включает временную метку для лучшей сортировки, v1 использует MAC адрес и временную метку (устарело из-за приватности).",
  "uuidGenerator.faq.q2": "UUID действительно уникальны?",
  "uuidGenerator.faq.a2":
    "Да, вероятность генерации дубликатов UUID крайне мала. Для v4 шанс коллизии пренебрежимо мал для практических целей.",
  "uuidGenerator.faq.q3":
    "Могу ли я использовать UUID в качестве первичных ключей?",
  "uuidGenerator.faq.a3":
    "Абсолютно! UUID отлично подходят для распределенных систем, где централизованная генерация ID непрактична.",
};
