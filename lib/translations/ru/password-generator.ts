export const passwordGenerator = {
  "passwordGenerator.title": "Генератор паролей",
  "passwordGenerator.description":
    "Генерируйте безопасные случайные пароли и API-ключи с настраиваемыми параметрами",
  "passwordGenerator.pageTitle": "Генератор паролей и ключей",
  "passwordGenerator.pageSubtitle":
    "Генерируйте безопасные случайные пароли, API-ключи и токены",
  "passwordGenerator.outputLabel": "Сгенерированный пароль",
  "passwordGenerator.outputPlaceholder":
    "Нажмите «Генерировать» для создания пароля...",
  "passwordGenerator.generate": "Генерировать",
  "passwordGenerator.regenerate": "Перегенерировать",
  "passwordGenerator.length": "Длина",
  "passwordGenerator.options": "Параметры",
  "passwordGenerator.uppercase": "Заглавные (A-Z)",
  "passwordGenerator.lowercase": "Строчные (a-z)",
  "passwordGenerator.numbers": "Цифры (0-9)",
  "passwordGenerator.symbols": "Символы (!@#$%...)",
  "passwordGenerator.excludeAmbiguous":
    "Исключить похожие символы (0, O, l, 1, I)",
  "passwordGenerator.strength": "Надёжность",
  "passwordGenerator.strength.weak": "Слабый",
  "passwordGenerator.strength.fair": "Средний",
  "passwordGenerator.strength.good": "Хороший",
  "passwordGenerator.strength.strong": "Сильный",
  "passwordGenerator.strength.veryStrong": "Очень сильный",
  "passwordGenerator.presets": "Шаблоны",
  "passwordGenerator.preset.pin": "PIN (4 цифры)",
  "passwordGenerator.preset.simple": "Простой (8 симв.)",
  "passwordGenerator.preset.secure": "Безопасный (16 симв.)",
  "passwordGenerator.preset.apiKey": "API-ключ (32 симв.)",
  "passwordGenerator.preset.uuid": "UUID-стиль",
  "passwordGenerator.bulk": "Массовая генерация",
  "passwordGenerator.bulkCount": "Количество",
  "passwordGenerator.error.generating": "Ошибка генерации пароля",

  "passwordGenerator.mode.label": "Режим генерации",
  "passwordGenerator.mode.random": "Случайный",
  "passwordGenerator.mode.passphrase": "Парольная фраза",
  "passwordGenerator.passphrase.words": "Слова",
  "passwordGenerator.passphrase.separator": "Разделитель",
  "passwordGenerator.passphrase.separator.hyphen": "Дефис (-)",
  "passwordGenerator.passphrase.separator.underscore":
    "Нижнее подчёркивание (_)",
  "passwordGenerator.passphrase.separator.space": "Пробел",
  "passwordGenerator.passphrase.separator.period": "Точка (.)",
  "passwordGenerator.passphrase.separator.none": "Нет",
  "passwordGenerator.option.additional": "Дополнительные параметры",
  "passwordGenerator.option.capitalize": "Заглавные буквы в словах",

  "passwordGenerator.output.generated": "Сгенерированные пароли",
  "passwordGenerator.output.copyAll": "Копировать всё",

  "passwordGenerator.presetsTitle": "Шаблоны паролей",
  "passwordGenerator.presetsDesc":
    "Предустановленные настройки паролей для разных уровней безопасности. Нажмите «Быстрый запуск» для генерации:",
  "passwordGenerator.preset.loadOnly": "Только загрузить шаблон",
  "passwordGenerator.preset.chars": "симв.",
  "passwordGenerator.preset.symbols": "Символы",
  "passwordGenerator.preset.numbers": "Цифры",
  "passwordGenerator.preset.upper": "Заглавные",

  "passwordGenerator.seo.title":
    "Зачем использовать генератор паролей? Как он работает?",
  "passwordGenerator.seo.desc":
    'Надёжные уникальные пароли необходимы для безопасности. Этот инструмент использует <strong className="text-foreground">криптографически безопасную</strong> генерацию случайных чисел через Web Crypto API (crypto.getRandomValues).',

  "passwordGenerator.tech.title": "Техническая реализация",
  "passwordGenerator.tech.randomTitle": "Генерация случайного пароля:",
  "passwordGenerator.tech.randomList1":
    "Использует crypto.getRandomValues() для криптографически безопасной случайности",
  "passwordGenerator.tech.randomList2":
    "Динамически формирует набор символов на основе предпочтений пользователя",
  "passwordGenerator.tech.randomList3":
    "Опциональное исключение похожих символов (0, O, 1, l, I для лучшей читаемости)",
  "passwordGenerator.tech.randomList4":
    "Равномерное распределение гарантирует одинаковую вероятность для каждой позиции",
  "passwordGenerator.tech.randomList5":
    "Поддерживает длину от 4 до 64 символов с различными типами",

  "passwordGenerator.tech.passphraseTitle": "Генерация парольной фразы:",
  "passwordGenerator.tech.passphraseList1":
    "Выбор на основе словаря из 100+ распространённых английских слов",
  "passwordGenerator.tech.passphraseList2":
    "Каждое слово добавляет примерно 6,6 бит энтропии",
  "passwordGenerator.tech.passphraseList3":
    "Опциональная капитализация и добавление цифр/символов",
  "passwordGenerator.tech.passphraseList4":
    "Настраиваемые разделители (дефис, подчёркивание, пробел и т.д.)",
  "passwordGenerator.tech.passphraseList5":
    "Диапазон слов: 3-8 слов для разных уровней безопасности",

  "passwordGenerator.features.title": "Ключевые функции",
  "passwordGenerator.feature.secure.title": "Криптографически безопасный",
  "passwordGenerator.feature.secure.desc":
    "Использует Web Crypto API для истинной случайности",
  "passwordGenerator.feature.modes.title": "Несколько режимов",
  "passwordGenerator.feature.modes.desc": "Случайные пароли и парольные фразы",
  "passwordGenerator.feature.passphrase.title": "Поддержка парольных фраз",
  "passwordGenerator.feature.passphrase.desc":
    "Легко запоминаемые комбинации слов",
  "passwordGenerator.feature.bulk.title": "Массовая генерация",
  "passwordGenerator.feature.bulk.desc": "Генерируйте несколько паролей сразу",

  "passwordGenerator.bestPractices.title":
    "Лучшие практики и границы использования",
  "passwordGenerator.bestPractices.item1":
    "Используйте уникальный пароль для каждой учётной записи",
  "passwordGenerator.bestPractices.boundary1":
    "✅ Критично - Предотвращает атаки credential stuffing",
  "passwordGenerator.bestPractices.item2":
    "Пароли должны быть не менее 12-16 символов",
  "passwordGenerator.bestPractices.boundary2":
    "✅ Рекомендуется - 16+ символов для важных аккаунтов (банк, почта)",
  "passwordGenerator.bestPractices.item3":
    "Включайте заглавные, строчные буквы, цифры и символы",
  "passwordGenerator.bestPractices.boundary3":
    "✅ Важно - Увеличивает энтропию и противостоит атакам по словарю",
  "passwordGenerator.bestPractices.item4":
    "Храните пароли в безопасном менеджере паролей",
  "passwordGenerator.bestPractices.boundary4":
    "✅ Необходимо - Никогда не используйте пароли повторно",
  "passwordGenerator.bestPractices.item5":
    "Включите двухфакторную аутентификацию при возможности",
  "passwordGenerator.bestPractices.boundary5":
    "✅ Настоятельно рекомендуется - Добавляет критический второй уровень защиты",

  "passwordGenerator.faq.title": "Часто задаваемые вопросы",
  "passwordGenerator.faq.q1": "Этот генератор паролей безопасен?",
  "passwordGenerator.faq.a1":
    "Да! Мы используем Web Crypto API (crypto.getRandomValues), который обеспечивает криптографически безопасные случайные числа. Вся генерация происходит локально в браузере.",
  "passwordGenerator.faq.q2": "Мои пароли где-то сохраняются?",
  "passwordGenerator.faq.a2":
    "Нет. Сгенерированные пароли существуют только в браузере и никогда не отправляются на сервер. Закройте страницу - и они исчезнут.",
  "passwordGenerator.faq.q3": "Что делает пароль надёжным?",
  "passwordGenerator.faq.a3":
    "Надёжный пароль длинный (16+ символов), использует разные типы символов, уникален для каждой учётной записи и случаен (не основан на словарных словах).",
};
