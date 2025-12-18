export const base64Encoder = {
  "base64Encoder.title": "Base64 编码器",
  "base64Encoder.description": "在线编码解码 Base64 文本，实时转换",
  "base64Encoder.pageTitle": "Base64 编码解码器",
  "base64Encoder.pageSubtitle": "将文本编码为 Base64 或将 Base64 解码为文本",
  "base64Encoder.inputLabel": "输入文本",
  "base64Encoder.inputLabelBase64": "输入 Base64",
  "base64Encoder.outputPlaceholder": "转换后的文本将显示在这里...",
  "base64Encoder.inputPlaceholder": "在此输入您的文本...",
  "base64Encoder.inputPlaceholderBase64": "在此输入您的 Base64...",
  "base64Encoder.encode": "编码",
  "base64Encoder.decode": "解码",
  "base64Encoder.swap": "交换",
  "base64Encoder.encodeBtn": "编码为 Base64",
  "base64Encoder.decodeBtn": "从 Base64 解码",
  "base64Encoder.examples": "示例",
  "base64Encoder.examplesHint": "点击示例加载到转换器：",
  "base64Encoder.examples.simpleText": "简单文本",
  "base64Encoder.examples.chineseText": "中文文本",
  "base64Encoder.examples.urlData": "URL 数据",
  "base64Encoder.examples.jsonData": "JSON 数据",
  "base64Encoder.error.encoding": "编码文本为 Base64 时出错",
  "base64Encoder.error.decoding": "解码 Base64 文本时出错",

  "base64Encoder.techTitle": "技术实现细节",
  "base64Encoder.tech.dataUri": "<strong>Data URI 方案：</strong> <code>data:image/png;base64,iVBORw0KGgo...</code> - 用于在 HTML/CSS 中直接嵌入图像",
  "base64Encoder.tech.email": "<strong>电子邮件附件：</strong> 邮件系统 (SMTP) 中附件的二进制 MIME 编码",
  "base64Encoder.tech.db": "<strong>数据库存储：</strong> 将 BLOB 转换为 TEXT 列，同时保持二进制完整性",
  "base64Encoder.tech.jwt": "<strong>JWT 令牌：</strong> API 认证中 JSON Web 令牌的负载部分",
  "base64Encoder.tech.api": "<strong>API 响应：</strong> 为 JSON API 响应序列化复杂对象",

  "base64Encoder.featuresTitle": "主要功能",
  "base64Encoder.feature.textBinary.title": "文本和二进制",
  "base64Encoder.feature.textBinary.desc": "编码/解码文本字符串和二进制文件",
  "base64Encoder.feature.urlSafe.title": "URL 安全",
  "base64Encoder.feature.urlSafe.desc": "生成 URL 安全的 Base64 编码变体",
  "base64Encoder.feature.fileSupport.title": "文件支持",
  "base64Encoder.feature.fileSupport.desc": "上传并编码图像和文档文件",
  "base64Encoder.feature.privacy.title": "100% 隐私",
  "base64Encoder.feature.privacy.desc": "所有处理都在浏览器中本地进行",

  "base64Encoder.useCasesTitle": "常见用例",
  "base64Encoder.useCase.images": "在 HTML 和 CSS 文件中嵌入图像",
  "base64Encoder.useCase.email": "为电子邮件和文本传输编码数据",
  "base64Encoder.useCase.db": "在数据库中存储二进制数据",
  "base64Encoder.useCase.auth": "API 认证和令牌处理",
  "base64Encoder.useCase.serialization": "Web 应用程序的数据序列化",

  "base64Encoder.limitsTitle": "使用限制和最佳实践",
  "base64Encoder.limits.limitations": "⚠️ 限制",
  "base64Encoder.limits.sizeIncrease": "数据大小增加约 33%（每 3 字节产生 4 个字符）",
  "base64Encoder.limits.largeFiles": "不适合大文件（请改用二进制协议）",
  "base64Encoder.limits.notEncryption": "不是加密 - 容易逆向，不要用于敏感数据",
  "base64Encoder.limits.browserMemory": "非常大的输入受浏览器内存限制",
  
  "base64Encoder.limits.bestPractices": "✅ 最佳实践",
  "base64Encoder.limits.smallBinary": "用于小型二进制数据（图像、< 10MB 的文件）",
  "base64Encoder.limits.compression": "与压缩（gzip）结合使用以提高效率",
  "base64Encoder.limits.urlSafe": "Web 应用程序使用 URL 安全的 Base64（+/-）",
  "base64Encoder.limits.validation": "解码前始终验证 Base64 输入",

  "base64Encoder.security.title": "🔒 安全提示",
  "base64Encoder.security.desc": "Base64 不是加密。它不提供任何安全性或隐私保护。仅用于数据格式转换，绝不用于保护敏感信息。如需加密，请使用 AES 等正规加密算法。",

  // SEO Content
  "base64Encoder.seo.title": "什么是 Base64 编码？",
  "base64Encoder.seo.description":
    "Base64 编码是一种将二进制数据转换为 ASCII 文本格式的方法。它广泛应用于 Web 开发、电子邮件传输和数据存储领域。我们的免费在线 Base64 编码解码器让您可以立即在文本和 Base64 之间转换，无需任何安装或注册。",
  "base64Encoder.seo.featuresTitle": "主要功能",
  "base64Encoder.seo.feature1.title": "即时转换",
  "base64Encoder.seo.feature1.desc": "实时编码和解码",
  "base64Encoder.seo.feature2.title": "Unicode 支持",
  "base64Encoder.seo.feature2.desc": "支持任何字符，包括中文、表情符号",
  "base64Encoder.seo.feature3.title": "URL 安全",
  "base64Encoder.seo.feature3.desc": "符合 Web 标准",
  "base64Encoder.seo.feature4.title": "100% 隐私",
  "base64Encoder.seo.feature4.desc": "所有处理在浏览器中本地进行",
  "base64Encoder.seo.howToUseTitle": "使用方法",
  "base64Encoder.seo.howToUse1": "在输入框中输入您的文本或 Base64 数据",
  "base64Encoder.seo.howToUse2": "选择编码或解码模式并点击转换按钮",
  "base64Encoder.seo.howToUse3": "一键复制结果",
  "base64Encoder.seo.techImplTitle": "🔧 技术实现",
  "base64Encoder.seo.techImplDesc": "我们的 Base64 编码器使用 JavaScript 内置的 <code className=\"bg-background px-1 rounded\">btoa()</code> 和 <code className=\"bg-background px-1 rounded\">atob()</code> 函数，通过 <code className=\"bg-background px-1 rounded\">encodeURIComponent()</code> 正确处理 Unicode 国际字符。该算法使用 64 字符字母表（A-Z、a-z、0-9、+、/）将每 3 个字节的二进制数据映射为 4 个 Base64 字符，并用（=）填充不完整的字节组。",

  "base64Encoder.faqTitle": "常见问题",
  "base64Encoder.faq.q1": "什么是 Base64 编码？",
  "base64Encoder.faq.a1":
    "Base64 是一种二进制到文本的编码方案，将二进制数据表示为 ASCII 字符串格式。它常用于在只能可靠处理文本的系统（如电子邮件或某些 Web API）中传输二进制数据。",
  "base64Encoder.faq.q2": "这个 Base64 工具免费吗？",
  "base64Encoder.faq.a2":
    "是的，这个 Base64 编码解码器完全免费使用。无需注册或登录。您的数据在浏览器中本地处理，以确保最大的隐私和安全。",
  "base64Encoder.faq.q3": "我可以离线编码和解码 Base64 吗？",
  "base64Encoder.faq.a3":
    "是的，我们的 Base64 工具完全离线工作。所有编码和解码都在您的浏览器中使用 JavaScript 进行，因此您可以在没有互联网连接的情况下使用它。",
  "base64Encoder.faq.q4": "使用此工具时我的数据安全吗？",
  "base64Encoder.faq.a4":
    "绝对安全。所有 Base64 编码和解码都在您的浏览器中本地进行。您的数据永远不会发送到任何服务器或存储在任何地方，确保完全的隐私和安全。",

  // Real-World Scenarios
  "base64Encoder.scenarios.title": "实际应用场景",
  "base64Encoder.scenarios.scenario1.title": "电子邮件附件替代",
  "base64Encoder.scenarios.scenario1.desc":
    "开发者需要在电子邮件中包含一个小图标，但希望避免附件限制。",
  "base64Encoder.scenarios.scenario1.problem": "📧 问题：",
  "base64Encoder.scenarios.scenario1.problemDesc": "邮件服务器阻止附件或收件人有大小限制",
  "base64Encoder.scenarios.scenario1.solution": "🔧 Base64 解决方案：",
  "base64Encoder.scenarios.scenario1.solutionDesc": "将小图标（logo.png）转换为 Base64 并嵌入 HTML 邮件中",
  "base64Encoder.scenarios.scenario1.result":
    "电子邮件显示图标而无需外部文件附件。",
  "base64Encoder.scenarios.scenario2.title": "API 认证令牌",
  "base64Encoder.scenarios.scenario2.desc":
    "移动应用开发者需要为 API 请求中的基本认证编码用户凭据。",
  "base64Encoder.scenarios.scenario2.credentials": "🔐 用户凭据：",
  "base64Encoder.scenarios.scenario2.encoded": "🔑 Base64 编码：",
  "base64Encoder.scenarios.scenario2.header": "📡 API 请求头：",
  "base64Encoder.scenarios.scenario2.result":
    "凭据被安全地编码用于 HTTP 基本认证。",
  "base64Encoder.scenarios.scenario3.title": "包含二进制内容的 JSON 数据",
  "base64Encoder.scenarios.scenario3.desc":
    "后端开发者需要将一个小 PDF 文件存储在 JSON 数据库字段中。",
  "base64Encoder.scenarios.scenario3.binary": "📄 二进制数据：",
  "base64Encoder.scenarios.scenario3.binaryDesc": "document.pdf (45 KB) - 二进制格式不兼容 JSON",
  "base64Encoder.scenarios.scenario3.encoding": "🔄 Base64 编码：",
  "base64Encoder.scenarios.scenario3.storage": "💾 JSON 存储：",
  "base64Encoder.scenarios.scenario3.result":
    "二进制 PDF 内容现在作为文本存储在 JSON 数据库字段中。",

  // Step-by-Step Guide
  "base64Encoder.guide.title": "如何使用 Base64 编码",
  "base64Encoder.guide.step1.title": "选择编码或解码",
  "base64Encoder.guide.step1.desc":
    "选择'编码'将文本/二进制转换为 Base64，或'解码'将 Base64 转换回原始格式。",
  "base64Encoder.guide.step2.title": "输入您的数据",
  "base64Encoder.guide.step2.desc":
    "输入文本或上传文件（图像、文档）您想要编码或解码。",
  "base64Encoder.guide.step3.title": "生成结果",
  "base64Encoder.guide.step3.desc":
    "点击转换按钮立即查看 Base64 编码或解码的结果。",
  "base64Encoder.guide.step4.title": "复制和使用",
  "base64Encoder.guide.step4.desc":
    "复制结果用于您的应用程序、API、电子邮件模板或数据存储。",
};
