export const md5Generator = {
  "md5Generator.title": "MD5 哈希生成器",
  "md5Generator.description": "从文本或文件生成 MD5 哈希值，用于校验和验证",
  "md5Generator.pageTitle": "MD5 哈希生成器",
  "md5Generator.pageSubtitle": "即时生成文本字符串的 MD5 哈希值",
  "md5Generator.inputLabel": "输入文本",
  "md5Generator.inputPlaceholder": "输入要生成 MD5 哈希的文本...",
  "md5Generator.outputLabel": "MD5 哈希",
  "md5Generator.outputPlaceholder": "MD5 哈希将显示在此处...",
  "md5Generator.generate": "生成 MD5",
  "md5Generator.uppercase": "大写",
  "md5Generator.lowercase": "小写",
  "md5Generator.bit32": "32位",
  "md5Generator.bit16": "16位（中间）",
  "md5Generator.examples": "示例",
  "md5Generator.examplesHint": "点击示例加载：",
  "md5Generator.examples.simpleText": "简单文本",
  "md5Generator.examples.password": "密码哈希",
  "md5Generator.examples.fileChecksum": "文件校验",
  "md5Generator.error.generating": "生成 MD5 哈希时出错",

  "md5Generator.fileUpload": "文件上传",
  "md5Generator.fileUpload.title": "上传文件",
  "md5Generator.fileUpload.click": "点击上传文件",
  "md5Generator.fileUpload.hint": "最大 10MB • 仅支持文本文件",
  "md5Generator.fileUpload.uploaded": "已上传: {name}",
  "md5Generator.mode.single": "单个模式",
  "md5Generator.mode.batch": "批量模式",
  "md5Generator.batchInput": "批量输入",
  "md5Generator.batchOutput": "批量输出",
  "md5Generator.addRow": "添加行",
  "md5Generator.copyAll": "复制全部",
  "md5Generator.batchPlaceholder":
    "批量结果将显示在此处...\n您的 MD5 哈希值\n将在此显示。",
  "md5Generator.exampleInputs": "示例输入",
  "md5Generator.loadExample": "仅加载示例",

  "md5Generator.seo.title": "什么是 MD5 哈希？如何实现？",
  "md5Generator.seo.desc":
    '<strong className="text-foreground">MD5（消息摘要算法 5）</strong>是一种广泛使用的加密哈希函数，产生 128 位（16 字节）的哈希值，通常表示为 32 个十六进制字符。我们的实现使用纯 JavaScript 和位运算，对 512 位数据块执行 4 轮、每轮 16 次操作。',

  "md5Generator.tech.title": "技术实现",
  "md5Generator.tech.coreTitle": "核心函数：",
  "md5Generator.tech.coreList1": "F(x,y,z) = (x ∧ y) ∨ (¬x ∧ z) - 第 1 轮",
  "md5Generator.tech.coreList2": "G(x,y,z) = (x ∧ z) ∨ (y ∧ ¬z) - 第 2 轮",
  "md5Generator.tech.coreList3": "H(x,y,z) = x ⊕ y ⊕ z - 第 3 轮",
  "md5Generator.tech.coreList4": "I(x,y,z) = y ⊕ (x ∨ ¬z) - 第 4 轮",
  "md5Generator.tech.stepsTitle": "处理步骤：",
  "md5Generator.tech.stepsList1": "1. 消息预处理（填充和长度追加）",
  "md5Generator.tech.stepsList2": "2. 将消息分成 512 位块",
  "md5Generator.tech.stepsList3": "3. 对每个块进行 4 轮、每轮 16 次操作",
  "md5Generator.tech.stepsList4": "4. 使用 32 位算术和位运算",
  "md5Generator.tech.stepsList5": "5. 组合结果产生最终的 128 位哈希",

  "md5Generator.features.title": "主要功能",
  "md5Generator.feature.checksums.title": "文件校验",
  "md5Generator.feature.checksums.desc": "为最大 10MB 的文件生成 MD5",
  "md5Generator.feature.batch.title": "批量处理",
  "md5Generator.feature.batch.desc": "同时哈希多个字符串",
  "md5Generator.feature.upload.title": "文件上传",
  "md5Generator.feature.upload.desc": "拖放文件即时哈希",
  "md5Generator.feature.privacy.title": "100% 隐私",
  "md5Generator.feature.privacy.desc": "所有处理都在浏览器中进行",

  "md5Generator.useCases.title": "常见用例和使用边界",
  "md5Generator.useCases.item1": "文件完整性验证和校验",
  "md5Generator.useCases.boundary1":
    "✅ 适合 - 非常适合检测传输过程中的意外文件损坏",
  "md5Generator.useCases.item2": "数据库密码存储（加盐）",
  "md5Generator.useCases.boundary2":
    "⚠️ 不推荐 - 请改用 bcrypt、Argon2 或 scrypt",
  "md5Generator.useCases.item3": "生成唯一标识符",
  "md5Generator.useCases.boundary3":
    "⚠️ 谨慎使用 - 考虑使用 UUID v4 以获得更好的唯一性保证",
  "md5Generator.useCases.item4": "检测重复文件",
  "md5Generator.useCases.boundary4":
    "✅ 适合 - 适用于本地系统中的非关键重复检测",
  "md5Generator.useCases.item5": "API 签名验证",
  "md5Generator.useCases.boundary5":
    "❌ 不安全 - 易受碰撞攻击，请使用 HMAC 配合 SHA-256",

  "md5Generator.faq.title": "常见问题",
  "md5Generator.faq.q1": "32 位和 16 位 MD5 有什么区别？",
  "md5Generator.faq.a1":
    "32 位 MD5 是完整哈希（32 个十六进制字符）。16 位 MD5 取完整哈希的中间 16 个字符，有时用于较短的校验和。",
  "md5Generator.faq.q2": "MD5 对密码安全吗？",
  "md5Generator.faq.a2":
    "由于已知漏洞，不建议单独使用 MD5 进行密码哈希。请使用 bcrypt 或 Argon2 等现代算法来保护密码安全。",
  "md5Generator.faq.q3": "使用此工具时我的数据安全吗？",
  "md5Generator.faq.a3":
    "是的，所有 MD5 哈希都在浏览器中本地进行。您的数据永远不会发送到任何服务器。",
};
