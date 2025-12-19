export const passwordGenerator = {
  "passwordGenerator.title": "密码生成器",
  "passwordGenerator.description":
    "生成安全的随机密码和 API 密钥，支持自定义选项",
  "passwordGenerator.pageTitle": "密码 & 密钥生成器",
  "passwordGenerator.pageSubtitle": "生成安全的随机密码、API 密钥和令牌",
  "passwordGenerator.outputLabel": "生成的密码",
  "passwordGenerator.outputPlaceholder": "点击生成按钮创建密码...",
  "passwordGenerator.generate": "生成",
  "passwordGenerator.regenerate": "重新生成",
  "passwordGenerator.length": "长度",
  "passwordGenerator.options": "选项",
  "passwordGenerator.uppercase": "大写字母 (A-Z)",
  "passwordGenerator.lowercase": "小写字母 (a-z)",
  "passwordGenerator.numbers": "数字 (0-9)",
  "passwordGenerator.symbols": "符号 (!@#$%...)",
  "passwordGenerator.excludeAmbiguous": "排除易混淆字符 (0, O, l, 1, I)",
  "passwordGenerator.strength": "强度",
  "passwordGenerator.strength.weak": "弱",
  "passwordGenerator.strength.fair": "一般",
  "passwordGenerator.strength.good": "良好",
  "passwordGenerator.strength.strong": "强",
  "passwordGenerator.strength.veryStrong": "非常强",
  "passwordGenerator.presets": "预设",
  "passwordGenerator.preset.pin": "PIN（4位数字）",
  "passwordGenerator.preset.simple": "简单（8字符）",
  "passwordGenerator.preset.secure": "安全（16字符）",
  "passwordGenerator.preset.apiKey": "API 密钥（32字符）",
  "passwordGenerator.preset.uuid": "UUID 格式",
  "passwordGenerator.bulk": "批量生成",
  "passwordGenerator.bulkCount": "数量",
  "passwordGenerator.error.generating": "生成密码时出错",

  "passwordGenerator.mode.label": "生成模式",
  "passwordGenerator.mode.random": "随机",
  "passwordGenerator.mode.passphrase": "助记词",
  "passwordGenerator.passphrase.words": "单词数",
  "passwordGenerator.passphrase.separator": "分隔符",
  "passwordGenerator.passphrase.separator.hyphen": "连字符 (-)",
  "passwordGenerator.passphrase.separator.underscore": "下划线 (_)",
  "passwordGenerator.passphrase.separator.space": "空格",
  "passwordGenerator.passphrase.separator.period": "句点 (.)",
  "passwordGenerator.passphrase.separator.none": "无",
  "passwordGenerator.option.additional": "附加选项",
  "passwordGenerator.option.capitalize": "首字母大写",

  "passwordGenerator.output.generated": "已生成的密码",
  "passwordGenerator.output.copyAll": "复制全部",

  "passwordGenerator.presetsTitle": "密码预设",
  "passwordGenerator.presetsDesc":
    "为不同安全级别预配置的密码设置。点击「快速运行」使用预设设置生成：",
  "passwordGenerator.preset.loadOnly": "仅加载预设",
  "passwordGenerator.preset.chars": "字符",
  "passwordGenerator.preset.symbols": "符号",
  "passwordGenerator.preset.numbers": "数字",
  "passwordGenerator.preset.upper": "大写",

  "passwordGenerator.seo.title": "为什么使用密码生成器？它是如何工作的？",
  "passwordGenerator.seo.desc":
    '强大且唯一的密码对于安全至关重要。该工具使用 <strong className="text-foreground">加密安全</strong> 的随机数生成（通过 Web Crypto API 的 crypto.getRandomValues）来创建几乎无法猜测或通过暴力破解的密码。实现支持随机字符生成和基于助记词的方法。',

  "passwordGenerator.tech.title": "技术实现",
  "passwordGenerator.tech.randomTitle": "随机密码生成：",
  "passwordGenerator.tech.randomList1":
    "使用 crypto.getRandomValues() 获取加密安全的随机性",
  "passwordGenerator.tech.randomList2": "根据用户偏好动态构建字符池",
  "passwordGenerator.tech.randomList3":
    "可选排除易混淆字符（0、O、1、l、I 以提高可读性）",
  "passwordGenerator.tech.randomList4": "均匀分布确保每个字符位置的可能性相等",
  "passwordGenerator.tech.randomList5":
    "支持 4 到 64 个字符的长度，包含多种字符类型",

  "passwordGenerator.tech.passphraseTitle": "助记词生成：",
  "passwordGenerator.tech.passphraseList1":
    "从 100 多个常用英语单词中进行字典选择",
  "passwordGenerator.tech.passphraseList2": "每个单词增加约 6.6 位熵",
  "passwordGenerator.tech.passphraseList3": "可选大写和添加数字/符号",
  "passwordGenerator.tech.passphraseList4":
    "可自定义分隔符（连字符、下划线、空格等）",
  "passwordGenerator.tech.passphraseList5":
    "单词数范围：3-8 个单词，适用于不同安全级别",

  "passwordGenerator.features.title": "主要功能",
  "passwordGenerator.feature.secure.title": "加密安全",
  "passwordGenerator.feature.secure.desc":
    "使用 Web Crypto API 获取真正的随机性",
  "passwordGenerator.feature.modes.title": "多种模式",
  "passwordGenerator.feature.modes.desc": "随机密码和助记词",
  "passwordGenerator.feature.passphrase.title": "助记词支持",
  "passwordGenerator.feature.passphrase.desc": "易于记忆的单词组合",
  "passwordGenerator.feature.bulk.title": "批量生成",
  "passwordGenerator.feature.bulk.desc": "一次生成多个密码",

  "passwordGenerator.bestPractices.title": "最佳实践与使用边界",
  "passwordGenerator.bestPractices.item1": "为每个账户使用唯一的密码",
  "passwordGenerator.bestPractices.boundary1":
    "✅ 关键 - 防止跨多个服务的凭证填充攻击",
  "passwordGenerator.bestPractices.item2": "密码长度至少 12-16 个字符",
  "passwordGenerator.bestPractices.boundary2":
    "✅ 推荐 - 高价值账户（银行、邮箱）使用 16 个以上字符",
  "passwordGenerator.bestPractices.item3": "包含大写、小写、数字和符号",
  "passwordGenerator.bestPractices.boundary3": "✅ 重要 - 增加熵并抵御字典攻击",
  "passwordGenerator.bestPractices.item4": "将密码存储在安全的密码管理器中",
  "passwordGenerator.bestPractices.boundary4":
    "✅ 必要 - 切勿重复使用密码或以不安全的方式记录",
  "passwordGenerator.bestPractices.item5": "在可用时启用双因素认证",
  "passwordGenerator.bestPractices.boundary5":
    "✅ 强烈推荐 - 添加关键的第二层安全保护",

  "passwordGenerator.faq.title": "常见问题",
  "passwordGenerator.faq.q1": "这个密码生成器安全吗？",
  "passwordGenerator.faq.a1":
    "是的！我们使用 Web Crypto API（crypto.getRandomValues）提供加密安全的随机数。所有生成都在您的浏览器本地进行。",
  "passwordGenerator.faq.q2": "我的密码会被存储在任何地方吗？",
  "passwordGenerator.faq.a2":
    "不会。生成的密码仅存在于您的浏览器中，永远不会发送到任何服务器。一旦您关闭页面，除非您保存，否则它们将消失。",
  "passwordGenerator.faq.q3": "什么样的密码才是强密码？",
  "passwordGenerator.faq.a3":
    "强密码是长（16 个以上字符）、使用多种字符类型、对每个账户唯一、随机的（不基于字典词或个人信息）。",
};
