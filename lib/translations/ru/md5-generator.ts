export const md5Generator = {
  "md5Generator.title": "Генератор Хеша MD5",
  "md5Generator.description":
    "Генерируйте значения хеша MD5 из текста или файлов для проверочных сумм и проверки",
  "md5Generator.pageTitle": "Генератор Хеша MD5",
  "md5Generator.pageSubtitle":
    "Генерируйте хеш MD5 для текстовых строк мгновенно",
  "md5Generator.inputLabel": "Входной Текст",
  "md5Generator.inputPlaceholder": "Введите текст для генерации хеша MD5...",
  "md5Generator.outputLabel": "Хеш MD5",
  "md5Generator.outputPlaceholder": "Хеш MD5 появится здесь...",
  "md5Generator.generate": "Генерировать MD5",
  "md5Generator.uppercase": "Заглавные",
  "md5Generator.lowercase": "Строчные",
  "md5Generator.bit32": "32-бит",
  "md5Generator.bit16": "16-бит (Средний)",
  "md5Generator.examples": "Примеры",
  "md5Generator.examplesHint": "Нажмите на пример, чтобы загрузить его:",
  "md5Generator.examples.simpleText": "Простой Текст",
  "md5Generator.examples.password": "Хеш Пароля",
  "md5Generator.examples.fileChecksum": "Проверочная Сумма Файла",
  "md5Generator.error.generating": "Ошибка генерации хеша MD5",

  "md5Generator.fileUpload": "Загрузка Файла",
  "md5Generator.fileUpload.title": "Загрузить Файл",
  "md5Generator.fileUpload.click": "Нажмите, чтобы загрузить файл",
  "md5Generator.fileUpload.hint": "Макс 10МБ • Только текстовые файлы",
  "md5Generator.fileUpload.uploaded": "Загружен: {name}",
  "md5Generator.mode.single": "Одиночный Режим",
  "md5Generator.mode.batch": "Пакетный Режим",
  "md5Generator.batchInput": "Пакетный Ввод",
  "md5Generator.batchOutput": "Batch Output",
  "md5Generator.addRow": "Add Row",
  "md5Generator.copyAll": "Copy All",
  "md5Generator.batchPlaceholder":
    "Batch results will appear here...\nYour MD5 hashes\nwill be displayed here.",
  "md5Generator.exampleInputs": "Example Inputs",
  "md5Generator.loadExample": "Load Example Only",

  // SEO Content
  "md5Generator.seo.title": "Что такое хеширование MD5? Как оно реализовано?",
  "md5Generator.seo.desc":
    '<strong className="text-foreground">MD5 (Message-Digest Algorithm 5)</strong> — это широко используемая криптографическая хеш-функция, которая создаёт 128-битное (16-байтовое) значение хеша, обычно выражаемое как 32-символьное шестнадцатеричное число. Наша реализация использует чистый JavaScript с побитовыми операциями, выполняя 4 раунда по 16 операций на каждом 512-битовом блоке данных.',

  "md5Generator.tech.title": "Техническая реализация",
  "md5Generator.tech.coreTitle": "Основные функции:",
  "md5Generator.tech.coreList1": "F(x,y,z) = (x ∧ y) ∨ (¬x ∧ z) - Раунд 1",
  "md5Generator.tech.coreList2": "G(x,y,z) = (x ∧ z) ∨ (y ∧ ¬z) - Раунд 2",
  "md5Generator.tech.coreList3": "H(x,y,z) = x ⊕ y ⊕ z - Раунд 3",
  "md5Generator.tech.coreList4": "I(x,y,z) = y ⊕ (x ∨ ¬z) - Раунд 4",
  "md5Generator.tech.stepsTitle": "Шаги обработки:",
  "md5Generator.tech.stepsList1":
    "1. Предобработка сообщения (дополнение и добавление длины)",
  "md5Generator.tech.stepsList2": "2. Разделить сообщение на 512-битовые блоки",
  "md5Generator.tech.stepsList3":
    "3. Обработать каждый блок через 4 раунда по 16 операций",
  "md5Generator.tech.stepsList4":
    "4. Использовать 32-битную арифметику и побитовые операции",
  "md5Generator.tech.stepsList5":
    "5. Объединить результаты для получения финального 128-битного хеша",

  "md5Generator.features.title": "Ключевые функции",
  "md5Generator.feature.checksums.title": "Контрольные суммы файлов",
  "md5Generator.feature.checksums.desc": "Генерируйте MD5 для файлов до 10 МБ",
  "md5Generator.feature.batch.title": "Пакетная обработка",
  "md5Generator.feature.batch.desc": "Хешируйте несколько строк одновременно",
  "md5Generator.feature.upload.title": "Загрузка файлов",
  "md5Generator.feature.upload.desc":
    "Перетаскивайте файлы для мгновенного хеширования",
  "md5Generator.feature.privacy.title": "100% конфиденциальность",
  "md5Generator.feature.privacy.desc":
    "Вся обработка происходит локально в браузере",

  "md5Generator.useCases.title":
    "Распространённые варианты использования и границы применения",
  "md5Generator.useCases.item1":
    "Проверка целостности файлов и контрольные суммы",
  "md5Generator.useCases.boundary1":
    "✅ Подходит - Идеально для обнаружения случайного повреждения файлов при передаче",
  "md5Generator.useCases.item2": "Хранение паролей в базе данных (с солью)",
  "md5Generator.useCases.boundary2":
    "⚠️ Не рекомендуется - Используйте bcrypt, Argon2 или scrypt вместо этого",
  "md5Generator.useCases.item3": "Генерация уникальных идентификаторов",
  "md5Generator.useCases.boundary3":
    "⚠️ Используйте с осторожностью - Рассмотрите UUID v4 для лучших гарантий уникальности",
  "md5Generator.useCases.item4": "Обнаружение дубликатов файлов",
  "md5Generator.useCases.boundary4":
    "✅ Подходит - Хорошо для некритичного обнаружения дубликатов в локальных системах",
  "md5Generator.useCases.item5": "Проверка подписи API",
  "md5Generator.useCases.boundary5":
    "❌ Небезопасно - Уязвимо к атакам коллизий, используйте HMAC с SHA-256",

  "md5Generator.faq.title": "Часто Задаваемые Вопросы",
  "md5Generator.faq.q1": "В чём разница между 32-битным и 16-битным MD5?",
  "md5Generator.faq.a1":
    "32-битный MD5 — это полный хеш (32 шестнадцатеричных символа). 16-битный MD5 берёт средние 16 символов полного хеша, иногда используется для более коротких контрольных сумм.",
  "md5Generator.faq.q2": "Безопасен ли MD5 для паролей?",
  "md5Generator.faq.a2":
    "MD5 сам по себе не рекомендуется для хеширования паролей из-за известных уязвимостей. Используйте современные алгоритмы, такие как bcrypt или Argon2, для безопасности паролей.",
  "md5Generator.faq.q3":
    "Безопасны ли мои данные при использовании этого инструмента?",
  "md5Generator.faq.a3":
    "Да, всё хеширование MD5 происходит локально в вашем браузере. Ваши данные никогда не отправляются на сервер.",
};
