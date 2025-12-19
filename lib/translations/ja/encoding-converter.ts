export const encodingConverter = {
  "encodingConverter.title": "文字エンコーディングコンバーター",
  "encodingConverter.description":
    "UTF-8、GBK、ISO-8859-1などの異なる文字エンコーディング間でテキストを変換",
  "encodingConverter.pageTitle": "文字エンコーディングコンバーター",
  "encodingConverter.pageSubtitle":
    "UTF-8、GBK、その他のエンコーディング間でテキストを変換",
  "encodingConverter.inputLabel": "入力テキスト",
  "encodingConverter.inputPlaceholder": "ここにテキストを入力または貼り付け...",
  "encodingConverter.outputLabel": "変換出力",
  "encodingConverter.outputPlaceholder":
    "変換されたテキストがここに表示されます...",
  "encodingConverter.sourceEncoding": "ソースエンコーディング",
  "encodingConverter.targetEncoding": "ターゲットエンコーディング",
  "encodingConverter.convert": "変換",
  "encodingConverter.autoDetect": "自動検出",
  "encodingConverter.hexView": "Hexビュー",
  "encodingConverter.textView": "テキストビュー",
  "encodingConverter.examples": "例",
  "encodingConverter.examplesHint": "例をクリックして読み込みます:",
  "encodingConverter.examples.chinese": "中国語テキスト",
  "encodingConverter.examples.japanese": "日本語テキスト",
  "encodingConverter.examples.mixed": "混合コンテンツ",
  "encodingConverter.error.converting": "エンコーディング変換エラー",
  "encodingConverter.error.invalidInput":
    "選択したエンコーディングで無効な入力",

  // Encoding names for dropdowns
  "encodingConverter.encodings.utf8": "UTF-8",
  "encodingConverter.encodings.utf16": "UTF-16",
  "encodingConverter.encodings.ascii": "ASCII",
  "encodingConverter.encodings.iso88591": "ISO-8859-1",
  "encodingConverter.encodings.hex": "十六進数",
  "encodingConverter.encodings.binary": "二進数",
  "encodingConverter.encodings.unicodeEscape": "Unicodeエスケープ",

  // SEO Content
  "encodingConverter.seo.title":
    "文字エンコーディングとは何か？それはどのように動作しますか？",
  "encodingConverter.seo.description":
    '<strong className="text-foreground">文字エンコーディング</strong>は、文字をバイトにマッピングして保存と送信を行うシステムです。私たちの実装は、JavaScriptの組み込みTextEncoder/TextDecoder APIを使用し、十六進数、バイナリ、Unicodeエスケープフォーマット用のカスタムハンドラーを備えています。UTF-8、GBK、ISO-8859-1などの異なるエンコーディングは、文字を異なる方法で表現するため、データを誤ったエンコーディングでデコードすると「文字化け」（ぐれたテキスト）が発生可能性があります。',

  "encodingConverter.techTitle": "技術実装",
  "encodingConverter.tech.coreLogic": "コア変換ロジック：",
  "encodingConverter.tech.logic1":
    "UTF-8/UTF-16処理のためのTextEncoder/TextDecoder",
  "encodingConverter.tech.logic2":
    "適切なバイトアライメントを使用したカスタム十六進数/バイナリ変換",
  "encodingConverter.tech.logic3":
    "Unicodeエケープシーケンス解析（\\uXXXXフォーマット）",
  "encodingConverter.tech.logic4": "絵文字の代理ペア処理（0x10000-0x10FFFF）",
  "encodingConverter.tech.logic5": "エラー回復機能付き文字単位処理",

  "encodingConverter.tech.supported": "サポートされるエンコーディング：",
  "encodingConverter.tech.utf8":
    "UTF-8：文字あたり1-4バイト、ASCIIと後方互換性あり",
  "encodingConverter.tech.utf16":
    "UTF-16：文字あたり2または4バイト（BMP + 代理ペア）",
  "encodingConverter.tech.ascii":
    "ASCII：7ビットエンコーディング（0-127）、UTF-8のサブセット",
  "encodingConverter.tech.iso":
    "ISO-8859-1：西ヨーロッパ言語の8ビットエンコーディング",
  "encodingConverter.tech.hex": "十六進数：各バイトの2桁十六進数表現",
  "encodingConverter.tech.binary":
    "バイナリ：スペースで区切られた8ビットバイナリ表現",

  "encodingConverter.featuresTitle": "主要機能",
  "encodingConverter.feature.multi.title": "マルチエンコーディング",
  "encodingConverter.feature.multi.desc": "UTF-8、GBK、Latin-1などをサポート",
  "encodingConverter.feature.realtime.title": "リアルタイム変換",
  "encodingConverter.feature.realtime.desc": "入力中に即座にプレビュー",
  "encodingConverter.feature.format.title": "フォーマットサポート",
  "encodingConverter.feature.format.desc":
    "テキスト、十六進数、Base64、Unicodeフォーマット",
  "encodingConverter.feature.privacy.title": "100% プライベート",
  "encodingConverter.feature.privacy.desc": "すべての処理はブラウザ内で実行",

  "encodingConverter.useCasesTitle": "一般的な使用例と使用境界",
  "encodingConverter.useCase.garbled":
    "不正なエンコーディングによる文字化けテキストの修正",
  "encodingConverter.useCase.garbledDesc":
    "✅ 必須 - 可読テキストを復元する最も一般的な使用例",
  "encodingConverter.useCase.gbk": "レガシーGBKデータをUTF-8に変換",
  "encodingConverter.useCase.gbkDesc":
    "✅ 推奨 - UTF-8はWeb標準で、最も互換性が高い",
  "encodingConverter.useCase.debug": "文字エンコーディング問題のデバッグ",
  "encodingConverter.useCase.debugDesc":
    "✅ 完璧 - 十六進数ビューがエンコーディング問題の特定に役立",
  "encodingConverter.useCase.hex": "テキストの十六進数表現の表示",
  "encodingConverter.useCase.hexDesc":
    "✅ 有用 - デバッグとデータ分析アプリケーション向け",
  "encodingConverter.useCase.unicode": "Unicodeフォーマット間の変換",
  "encodingConverter.useCase.unicodeDesc":
    "⚠️ 文脈依存 - ターゲットシステムがフォーマットをサポートすることを確認",

  "encodingConverter.faqTitle": "よくある質問",
  "encodingConverter.faq.q1": "UTF-8とUTF-16の違いは何ですか？",
  "encodingConverter.faq.a1":
    "UTF-8は文字あたり1-4バイトを使用し、ASCIIと後方互換性があります。UTF-16は2または4バイトを使用します。UTF-8はWeb上でより一般的ですが、UTF-16はWindowsとJavaの内部で使用されます。",
  "encodingConverter.faq.q2":
    "文字化けした中国語のテキストを修正するにはどうすればよいですか？",
  "encodingConverter.faq.a2":
    "中国語の文字化けは通常、テキストがGBKでエンコーディングされたがUTF-8でデコードされた（または逆）の意味します。元のエンコーディングからUTF-8への変換を試してください。",
  "encodingConverter.faq.q3": "私のデータは安全ですか？",
  "encodingConverter.faq.a3":
    "はい、すべてのエンコーディング変換はブラウザ内でローカルに実行されます。データがサーバーに送信されることはありません。",
};
