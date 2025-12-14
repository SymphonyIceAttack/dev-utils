export const hashGenerator = {
  "hashGenerator.title": "哈希生成器",
  "hashGenerator.description":
    "在线生成 MD5、SHA1、SHA256、SHA512 哈希值，实时生成",
  "hashGenerator.pageTitle": "哈希生成器",
  "hashGenerator.pageSubtitle": "使用多种算法从文本生成加密哈希值",
  "hashGenerator.inputLabel": "输入文本",
  "hashGenerator.inputPlaceholder": "在此输入您的文本以生成哈希值...",
  "hashGenerator.generateBtn": "生成哈希",
  "hashGenerator.results": "哈希结果",
  "hashGenerator.characters": "字符",
  "hashGenerator.examples": "示例",
  "hashGenerator.examplesHint": "点击示例加载到生成器：",
  "hashGenerator.examples.simpleText": "简单文本",
  "hashGenerator.examples.chineseText": "中文文本",
  "hashGenerator.examples.passwordData": "密码数据",
  "hashGenerator.examples.urlData": "URL 数据",
  "hashGenerator.error.generation": "生成哈希时出错",
  "hashGenerator.algorithms.md5": "MD5 (128位)",
  "hashGenerator.algorithms.sha1": "SHA1 (160位)",
  "hashGenerator.algorithms.sha256": "SHA256 (256位)",
  "hashGenerator.algorithms.sha512": "SHA512 (512位)",

  // SEO Content
  "hashGenerator.seo.title": "什么是哈希生成器？",
  "hashGenerator.seo.description":
    "哈希生成器是一个必备的开发者工具，使用加密哈希函数从输入文本创建固定大小的哈希值。我们的免费在线哈希生成器支持 MD5、SHA1、SHA256 和 SHA512 算法，让您可以立即生成哈希值，无需任何安装或注册。",
  "hashGenerator.seo.featuresTitle": "主要功能",
  "hashGenerator.seo.feature1.title": "多种算法",
  "hashGenerator.seo.feature1.desc": "支持 MD5、SHA1、SHA256、SHA512",
  "hashGenerator.seo.feature2.title": "实时生成",
  "hashGenerator.seo.feature2.desc": "输入时即时生成哈希值",
  "hashGenerator.seo.feature3.title": "复制到剪贴板",
  "hashGenerator.seo.feature3.desc": "一键复制生成的哈希值",
  "hashGenerator.seo.feature4.title": "100% 隐私",
  "hashGenerator.seo.feature4.desc": "所有处理在浏览器中本地进行",
  "hashGenerator.seo.howToUseTitle": "使用方法",
  "hashGenerator.seo.howToUse1": "在上方的输入框中输入您的文本",
  "hashGenerator.seo.howToUse2": "点击「生成哈希」创建所有哈希值",
  "hashGenerator.seo.howToUse3": "使用复制按钮复制任何哈希值",

  // FAQ
  "hashGenerator.faq.q1": "什么是哈希生成器？",
  "hashGenerator.faq.a1":
    "哈希生成器是一种使用加密哈希函数从输入文本创建固定大小哈希值的工具。常见的算法包括 MD5、SHA1、SHA256 和 SHA512。哈希通常用于数据完整性验证、密码存储和数字签名。",
  "hashGenerator.faq.q2": "这个哈希生成器免费吗？",
  "hashGenerator.faq.a2":
    "是的，这个哈希生成器完全免费使用。无需注册或登录。您的数据在浏览器中本地处理，以确保最大的隐私和安全。",
  "hashGenerator.faq.q3": "支持哪些哈希算法？",
  "hashGenerator.faq.a3":
    "我们的哈希生成器支持 MD5、SHA1、SHA256 和 SHA512 算法。所有生成都在您的浏览器中使用 Web Crypto API 和 crypto-js 库进行，以确保最大的安全性和兼容性。",
  "hashGenerator.faq.q4": "使用此工具时我的数据安全吗？",
  "hashGenerator.faq.a4":
    "绝对安全。所有哈希生成都在您的浏览器中本地进行。您的数据永远不会发送到任何服务器或存储在任何地方，确保完全的隐私和安全。",

  // Real-World Scenarios
  "hashGenerator.scenarios.title": "真实场景应用",
  "hashGenerator.scenarios.scenario1.title": "文件完整性验证",
  "hashGenerator.scenarios.scenario1.desc":
    "软件开发人员下载一个大文件，需要验证它在下载过程中没有被损坏。",
  "hashGenerator.scenarios.scenario1.file": "📥 下载的文件：",
  "hashGenerator.scenarios.scenario1.expected": "🔐 预期哈希 (SHA-256)：",
  "hashGenerator.scenarios.scenario1.actual": "✅ 实际生成的哈希：",
  "hashGenerator.scenarios.scenario1.result":
    "哈希匹配 - 文件是真实且未损坏的。",
  "hashGenerator.scenarios.scenario2.title": "密码存储系统",
  "hashGenerator.scenarios.scenario2.desc":
    "Web应用程序需要安全地存储用户密码，而不存储实际的密码文本。",
  "hashGenerator.scenarios.scenario2.password": "🔑 用户密码：",
  "hashGenerator.scenarios.scenario2.storage": "🗄️ 数据库存储：",
  "hashGenerator.scenarios.scenario2.login": "🔒 登录验证：",
  "hashGenerator.scenarios.scenario2.result":
    "即使数据库受到威胁，由于单向哈希，密码仍然安全。",
  "hashGenerator.scenarios.scenario3.title": "数字文档验证",
  "hashGenerator.scenarios.scenario3.desc":
    "法律文档需要证明自创建以来没有被修改过。",
  "hashGenerator.scenarios.scenario3.document": "📄 原始文档：",
  "hashGenerator.scenarios.scenario3.hash": "🔐 文档哈希 (SHA-256)：",
  "hashGenerator.scenarios.scenario3.verification": "✅ 后续验证：",
  "hashGenerator.scenarios.scenario3.result":
    "对文档的任何修改都会产生完全不同的哈希值。",

  // Step-by-Step Guide
  "hashGenerator.guide.title": "如何生成哈希",
  "hashGenerator.guide.step1.title": "选择哈希算法",
  "hashGenerator.guide.step1.desc":
    "选择合适的哈希算法（SHA-256推荐用于安全性，MD5用于兼容性）。",
  "hashGenerator.guide.step2.title": "输入您的数据",
  "hashGenerator.guide.step2.desc":
    "在输入字段中键入或粘贴您想要哈希的文本、文件内容或数据。",
  "hashGenerator.guide.step3.title": "生成哈希",
  "hashGenerator.guide.step3.desc": "点击生成以使用所选算法即时创建哈希值。",
  "hashGenerator.guide.step4.title": "复制和使用",
  "hashGenerator.guide.step4.desc":
    "复制哈希值用于您的应用程序、验证过程或安全实现。",
};
