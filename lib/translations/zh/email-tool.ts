export const emailTool = {
  "emailTool.title": "电子邮件工具",
  "emailTool.description": "使用我们的免费在线工具提取和验证电子邮件地址",
  "emailTool.pageTitle": "电子邮件工具",
  "emailTool.pageSubtitle": "快速提取和验证电子邮件地址",
  "emailTool.extractorTab": "提取邮件",
  "emailTool.verifierTab": "验证邮件",
  "emailTool.extractInputLabel": "输入文本",
  "emailTool.extractButton": "提取邮件",
  "emailTool.extractPlaceholder": "粘贴或输入包含电子邮件地址的文本...",
  "emailTool.verifyInputLabel": "邮件地址",
  "emailTool.verifyButton": "验证",
  "emailTool.verifyPlaceholder": "输入要验证的电子邮件地址...",
  "emailTool.extractedEmailsLabel": "提取的邮件 ({count})",
  "emailTool.emailsFound": "已找到",
  "emailTool.validEmails": "有效",
  "emailTool.noEmailsFound": "文本中未找到电子邮件地址",
  "emailTool.valid": "有效",
  "emailTool.invalid": "无效",
  "emailTool.syntaxCheck": "语法检查",
  "emailTool.clear": "清除",
  "emailTool.extractorError": "提取过程中发生错误",
  "emailTool.verifierError": "验证过程中发生错误",
  "emailTool.regenerate": "重新验证",
  "emailTool.swap": "交换",
  "emailTool.totalExtractions": "提取次数",
  "emailTool.extracted": "已提取",
  "emailTool.found": "已找到",
  "emailTool.verified": "已验证",

  // Options
  "emailTool.options.deduplicate": "去重",
  "emailTool.options.includeInvalid": "包含无效邮件",
  "emailTool.options.caseSensitive": "区分大小写",

  // Examples
  "emailTool.examplesTitle": "示例文本",
  "emailTool.extractExamplesTitle": "提取示例",
  "emailTool.verifyExamplesTitle": "验证示例",
  "emailTool.examplesDesc": "尝试这些示例以了解工具的工作方式：",
  "emailTool.example.contactForm.title": "联系表单",
  "emailTool.example.contactForm.desc": "带有邮件的示例联系表单",
  "emailTool.example.newsletter.title": "通讯",
  "emailTool.example.newsletter.desc": "通讯订阅者列表",
  "emailTool.example.business.title": "商务",
  "emailTool.example.business.desc": "商务联系邮件",
  "emailTool.example.valid.title": "有效邮件",
  "emailTool.example.valid.desc": "标准有效邮件格式",
  "emailTool.example.invalid.title": "无效邮件",
  "emailTool.example.invalid.desc": "缺少 @ 符号和域名",
  "emailTool.example.businessEmail.title": "商务邮件",
  "emailTool.example.businessEmail.desc": "组织电子邮件地址",

  // SEO Content
  "emailTool.seoTitle": "关于邮件工具",
  "emailTool.seo.description": `<p>我们的<strong>电子邮件工具</strong>是一个全面的解决方案，用于处理任何文本内容中的电子邮件地址。无论您需要<strong>从文档、日志或网页中提取</strong>电子邮件，还是<strong>验证</strong>特定电子邮件地址的格式，我们的工具都能提供快速准确的结果。</p>
    <p>此工具对于营销人员、研究人员、开发人员以及任何处理包含电子邮件地址的大量文本数据的人都至关重要。</p>`,

  // Technical Details
  "emailTool.techDetailsTitle": "技术实现详情",
  "emailTool.tech.rfc":
    "<strong>符合 RFC 5322 标准：</strong>我们的邮件验证器遵循 RFC 5322 标准的电子邮件地址格式验证，确保准确的语法检查。",
  "emailTool.tech.regex":
    "<strong>正则表达式：</strong>使用模式 <code className='bg-background px-1 rounded'>^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$</code> 进行精确的邮件验证。",
  "emailTool.tech.local":
    "<strong>本地处理：</strong>所有操作都在您的浏览器中执行。数据不会发送到任何服务器。",

  // Features
  "emailTool.featuresTitle": "主要功能",
  "emailTool.feature.extraction.title": "邮件提取",
  "emailTool.feature.extraction.desc":
    "自动从任何文本内容中查找和提取所有电子邮件地址。",
  "emailTool.feature.verification.title": "格式验证",
  "emailTool.feature.verification.desc":
    "检查电子邮件地址是否符合正确的 RFC 5322 格式。",
  "emailTool.feature.privacy.title": "100% 私密",
  "emailTool.feature.privacy.desc":
    "所有处理都在您的浏览器本地进行。您的数据永远不会离开您的设备。",
  "emailTool.feature.bulk.title": "批量处理",
  "emailTool.feature.bulk.desc": "一次单击即可提取或验证数百封电子邮件。",

  // Use Cases
  "emailTool.useCasesTitle": "常见使用场景",
  "emailTool.useCase.marketing": "为营销活动建立邮件列表",
  "emailTool.useCase.recruitment": "从简历和申请中提取候选人邮件",
  "emailTool.useCase.research": "从公共来源收集联系信息",
  "emailTool.useCase.cleanup": "清理和验证邮件数据库",
  "emailTool.useCase.validation": "在发送通信之前验证邮件格式",

  // Limitations
  "emailTool.limitationsTitle": "邮件验证无法做什么",
  "emailTool.limitations.format":
    "<strong>仅检查格式：</strong>验证仅检查邮件语法，不检查邮箱是否实际存在。",
  "emailTool.limitations.existence":
    "<strong>不检查存在性：</strong>我们无法验证电子邮件地址是否活跃或可以接收消息。",
  "emailTool.limitations.deliverability":
    "<strong>不检查可送达性：</strong>此工具不测试电子邮件是否可以送达该地址。",

  // Guide - Extraction
  "emailTool.guide.extract.title": "如何提取邮件",
  "emailTool.guide.extract.step1.title": "粘贴文本",
  "emailTool.guide.extract.step1.desc":
    "复制包含电子邮件地址的任何文本并将其粘贴到输入区域。",
  "emailTool.guide.extract.step2.title": "选择选项",
  "emailTool.guide.extract.step2.desc":
    "选择是否删除重复项以及包含或排除无效邮件。",
  "emailTool.guide.extract.step3.title": "点击提取",
  "emailTool.guide.extract.step3.desc":
    "按「提取邮件」按钮查找文本中的所有电子邮件地址。",
  "emailTool.guide.extract.step4.title": "复制结果",
  "emailTool.guide.extract.step4.desc":
    "复制单个邮件或使用「全部复制」保存完整列表。",

  // Guide - Verification
  "emailTool.guide.verify.title": "如何验证邮件",
  "emailTool.guide.verify.step1.title": "输入邮件",
  "emailTool.guide.verify.step1.desc": "在验证输入栏中键入或粘贴电子邮件地址。",
  "emailTool.guide.verify.step2.title": "点击验证",
  "emailTool.guide.verify.step2.desc": "按「验证」按钮检查邮件格式。",
  "emailTool.guide.verify.step3.title": "查看结果",
  "emailTool.guide.verify.step3.desc":
    "根据 RFC 5322 标准查看邮件是否有效或无效。",

  // Scenarios
  "emailTool.scenarios.title": "实际应用场景",
  "emailTool.scenarios.newsletter.title": "建立新闻通讯订阅者列表",
  "emailTool.scenarios.newsletter.desc":
    "从新闻通讯订阅者文本中提取电子邮件地址以创建干净的邮件列表。",
  "emailTool.scenarios.newsletter.input": "输入：",
  "emailTool.scenarios.newsletter.result":
    "结果：快速识别所有有效的电子邮件地址用于您的营销活动。",

  "emailTool.scenarios.contact.title": "验证联系表单提交",
  "emailTool.scenarios.contact.desc":
    "检查联系表单提交中的电子邮件地址格式是否有效。",
  "emailTool.scenarios.contact.input": "输入：",
  "emailTool.scenarios.contact.result":
    "结果：在处理表单提交之前过滤掉无效的邮件。",

  "emailTool.scenarios.dedupe.title": "删除重复邮件",
  "emailTool.scenarios.dedupe.desc":
    "通过删除重复条目来清理邮件列表（默认不区分大小写）。",
  "emailTool.scenarios.dedupe.input": "输入（5个包含变体的条目）：",
  "emailTool.scenarios.dedupe.result":
    "结果：减少到2封唯一邮件，节省空间并防止重复。",

  // Tips
  "emailTool.tipsTitle": "专业提示",
  "emailTool.tip.extraction":
    "为获得最佳结果，使用「去重」获取唯一的邮件列表。",
  "emailTool.tip.verification":
    "邮件验证仅检查格式。要确认送达，请发送测试邮件。",
  "emailTool.tip.privacy": "所有处理都是本地的 - 您的数据永远不会离开浏览器。",
  "emailTool.tip.validation":
    "将提取与「包含无效邮件」结合使用，以查看列表中的所有潜在问题。",

  // FAQ
  "emailTool.faqTitle": "常见问题",
  "emailTool.faq.q1": "这个邮件工具是什么？",
  "emailTool.faq.a1":
    "该工具结合了邮件提取和验证功能。您可以从任何文本中提取所有电子邮件地址，并验证单个电子邮件地址的格式是否正确。",
  "emailTool.faq.q2": "验证会检查邮件是否存在吗？",
  "emailTool.faq.a2":
    "邮件验证仅检查格式和语法。要确认邮件是否存在，您需要向该地址发送验证邮件。",
  "emailTool.faq.q3": "我的数据安全吗？",
  "emailTool.faq.a3":
    "是的，所有处理都在浏览器本地进行。您的数据永远不会发送到任何服务器或存储在任何地方。",
  "emailTool.faq.q4": "我可以从哪些类型的文本中提取邮件？",
  "emailTool.faq.a4":
    "您可以从任何文本内容中提取邮件 - 文档、日志、聊天消息、联系表单等。只需粘贴您的文本并点击提取。",
  "emailTool.faq.q5": "提取和验证有什么区别？",
  "emailTool.faq.a5":
    "提取会在任何文本中查找所有电子邮件地址。验证会检查特定邮件是否遵循正确的格式。使用提取来查找文档中的邮件，使用验证来验证单个地址。",
};
