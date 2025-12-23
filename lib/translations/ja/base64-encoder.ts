export const base64Encoder = {
  "base64Encoder.title": "Base64 エンコーダー",
  "base64Encoder.description":
    "テキストをBase64でエンコード・デコード、リアルタイム変換",
  "base64Encoder.pageTitle": "Base64 エンコーダー＆デコーダー",
  "base64Encoder.pageSubtitle":
    "テキストをBase64にエンコードまたはBase64をテキストにデコード",
  "base64Encoder.inputLabel": "入力テキスト",
  "base64Encoder.inputLabelBase64": "入力Base64",
  "base64Encoder.outputPlaceholder":
    "変換されたテキストがここに表示されます...",
  "base64Encoder.inputPlaceholder": "ここにテキストを入力してください...",
  "base64Encoder.inputPlaceholderBase64": "ここにBase64を入力してください...",
  "base64Encoder.encode": "エンコード",
  "base64Encoder.decode": "デコード",
  "base64Encoder.swap": "入れ替え",
  "base64Encoder.encodeBtn": "Base64にエンコード",
  "base64Encoder.decodeBtn": "Base64からデコード",
  "base64Encoder.examples": "例",
  "base64Encoder.examplesHint": "例をクリックしてコンバーターに読み込みます:",
  "base64Encoder.examples.simpleText": "シンプルなテキスト",
  "base64Encoder.examples.chineseText": "中国語テキスト",
  "base64Encoder.examples.urlData": "URLデータ",
  "base64Encoder.examples.jsonData": "JSONデータ",
  "base64Encoder.error.encoding": "テキストをBase64にエンコードエラー",
  "base64Encoder.error.decoding": "Base64テキストのデコードエラー",

  "base64Encoder.techTitle": "技術実装詳細",
  "base64Encoder.tech.dataUri":
    "<strong>データURIスキーム:</strong> <code>data:image/png;base64,iVBORw0KGgo...</code> - HTML/CSSに画像を直接埋め込むために使用",
  "base64Encoder.tech.email":
    "<strong>メール添付:</strong> メールシステム（SMTP）の添付ファイル用のバイナリMIMEエンコーディング",
  "base64Encoder.tech.db":
    "<strong>データベース保存:</strong> バイナリ整合性を保ちながらBLOBをTEXT列に変換",
  "base64Encoder.tech.jwt":
    "<strong>JWTトークン:</strong> API認証用のJSON Web Tokensのパayloadセクション",
  "base64Encoder.tech.api":
    "<strong>API応答:</strong> JSON API応答のための複雑なオブジェクトのシリアライズ",

  "base64Encoder.featuresTitle": "Key Features",
  "base64Encoder.feature.textBinary.title": "Text & Binary",
  "base64Encoder.feature.textBinary.desc":
    "Encode/decode both text strings and binary files",
  "base64Encoder.feature.urlSafe.title": "URL Safe",
  "base64Encoder.feature.urlSafe.desc":
    "Generate URL-safe Base64 encoding variants",
  "base64Encoder.feature.fileSupport.title": "File Support",
  "base64Encoder.feature.fileSupport.desc":
    "Upload and encode image and document files",
  "base64Encoder.feature.privacy.title": "100% Private",
  "base64Encoder.feature.privacy.desc":
    "All processing happens locally in your browser",

  "base64Encoder.useCasesTitle": "Common Use Cases",
  "base64Encoder.useCase.images": "Embedding images in HTML and CSS files",
  "base64Encoder.useCase.email":
    "Encoding data for email and text transmission",
  "base64Encoder.useCase.db": "Storing binary data in databases",
  "base64Encoder.useCase.auth": "API authentication and token handling",
  "base64Encoder.useCase.serialization":
    "Data serialization for web applications",

  "base64Encoder.limitsTitle": "Usage Limits & Best Practices",
  "base64Encoder.limits.limitations": "⚠️ Limitations",
  "base64Encoder.limits.sizeIncrease":
    "Increases data size by ~33% (4 chars per 3 bytes)",
  "base64Encoder.limits.largeFiles":
    "Not suitable for large files (use binary protocols instead)",
  "base64Encoder.limits.notEncryption":
    "Not encryption - easily reversible, don't use for sensitive data",
  "base64Encoder.limits.browserMemory":
    "Browser memory limits for very large inputs",

  "base64Encoder.limits.bestPractices": "✅ Best Practices",
  "base64Encoder.limits.smallBinary":
    "Use for small binary data (images, files < 10MB)",
  "base64Encoder.limits.compression":
    "Combine with compression (gzip) for efficiency",
  "base64Encoder.limits.urlSafe":
    "Use URL-safe Base64 (+/-) for web applications",
  "base64Encoder.limits.validation":
    "Always validate Base64 input before decoding",

  "base64Encoder.security.title": "🔒 Security Note",
  "base64Encoder.security.desc":
    "Base64 is NOT encryption. It provides no security or privacy. Only use for data format conversion, never for protecting sensitive information. For encryption, use proper cryptographic algorithms like AES.",

  // SEO Content
  "base64Encoder.seo.title": "Base64エンコードとは何ですか？",
  "base64Encoder.seo.description":
    '<strong className="text-foreground">Base64エンコード</strong>は、バイナリデータをASCII文字列形式に変換するバイナリからテキストへのエンコーディングスキームです。テキストデータを処理するように設計されたメディアで保存および転送する必要があるバイナリデータのエンコードに広く使用されています。私たちの無料オンラインBase64エンコーダー/デコーダーツールは、テキストとバイナリデータの変換を即座に処理します。',
  "base64Encoder.seo.techImplTitle": "🔧 技術的実装",
  "base64Encoder.seo.techImplDesc":
    '私たちのBase64エンコーダーは、国际文字のために<code className="bg-background px-1 rounded">encodeURIComponent()</code>経由で適切なUnicode処理を行い、JavaScriptの組み込み<code className="bg-background px-1 rounded">btoa()</code>と<code className="bg-background px-1 rounded">atob()</code>関数を使用しています。アルゴリズムは、3バイトのバイナリデータを4つのBase64文字にマッピングし、64文字のアルファベット（A-Z、a-z、0-9、+、/）と不完全なバイトグループの埋め込み（=）を使用します。',

  "base64Encoder.seo.featuresTitle": "主な機能",
  "base64Encoder.seo.feature1.title": "即座に変換",
  "base64Encoder.seo.feature1.desc": "リアルタイムのエンコードとデコード",
  "base64Encoder.seo.feature2.title": "Unicode対応",
  "base64Encoder.seo.feature2.desc": "中国語、絵文字を含むあらゆる文字を処理",
  "base64Encoder.seo.feature3.title": "URLセーフ",
  "base64Encoder.seo.feature3.desc": "Web標準に準拠",
  "base64Encoder.seo.feature4.title": "100%プライベート",
  "base64Encoder.seo.feature4.desc": "すべての処理はブラウザ内でローカルに実行",
  "base64Encoder.seo.howToUseTitle": "使用方法",
  "base64Encoder.seo.howToUse1":
    "入力フィールドにテキストまたはBase64データを入力してください",
  "base64Encoder.seo.howToUse2":
    "エンコードまたはデコードモードを選択し、変換ボタンをクリックしてください",
  "base64Encoder.seo.howToUse3": "ワンクリックで結果をコピー",

  "base64Encoder.faqTitle": "よくある質問",
  "base64Encoder.faq.q1": "Base64エンコードとは何ですか？",
  "base64Encoder.faq.a1":
    "Base64は、バイナリデータをASCII文字列形式で表すバイナリからテキストへのエンコーディングスキームです。メールや特定のWeb APIなど、テキストのみを確実に処理できるシステムでバイナリデータを送信するために一般的に使用されます。",
  "base64Encoder.faq.q2": "このBase64ツールは無料で使えますか？",
  "base64Encoder.faq.a2":
    "はい、このBase64エンコーダーとデコーダーは完全に無料で使用できます。サインアップや登録は必要ありません。データはプライバシーとセキュリティを最大にするためにブラウザ内で処理されます。",
  "base64Encoder.faq.q3":
    "Base64をオフラインでエンコードおよびデコードできますか？",
  "base64Encoder.faq.a3":
    "はい、私たちのBase64ツールは完全にオフラインで動作します。すべてのエンコードとデコードはJavaScriptを使用してブラウザ内で行われるため、インターネット接続なしで使用できます。",
  "base64Encoder.faq.q4": "このツールを使用するとデータは安全ですか？",
  "base64Encoder.faq.a4":
    "確かに、すべてのBase64エンコードとデコードはブラウザ内でローカルで行われます。データはサーバーにもどこにも送信されず、保存されず、完全なプライバシーとセキュリティが確保されます。",

  // Real-World Scenarios
  "base64Encoder.scenarios.title": "実際のシナリオ",
  "base64Encoder.scenarios.scenario1.title": "メール添付ファイルの代替",
  "base64Encoder.scenarios.scenario1.desc":
    "開発者はメールに小さなアイコンを含める必要がありますが、添付ファイルの制限を回避したいと考えています。",
  "base64Encoder.scenarios.scenario1.problem": "📧 問題:",
  "base64Encoder.scenarios.scenario1.problemDesc":
    "メールサーバーが添付ファイルをブロックするか、受信者にサイズ制限があります",
  "base64Encoder.scenarios.scenario1.solution": "🔧 Base64解決策:",
  "base64Encoder.scenarios.scenario1.solutionDesc":
    "小さなアイコン（logo.png）をBase64に変換してHTMLメールに埋め込みます",
  "base64Encoder.scenarios.scenario1.result":
    "結果: メールは外部のファイル附件を必要とせずにアイコンを表示します。",
  "base64Encoder.scenarios.scenario2.title": "API認証トークン",
  "base64Encoder.scenarios.scenario2.desc":
    "モバイルアプリ開発者は、APIリクエストでの基本認証用にユーザー資格情報をエンコードする必要があります。",
  "base64Encoder.scenarios.scenario2.credentials": "🔐 ユーザー資格情報:",
  "base64Encoder.scenarios.scenario2.encoded": "🔑 Base64エンコード後:",
  "base64Encoder.scenarios.scenario2.header": "📡 APIリクエストヘッダー:",
  "base64Encoder.scenarios.scenario2.result":
    "結果: 資格情報はHTTP基本認証用に安全にエンコードされます。",
  "base64Encoder.scenarios.scenario3.title":
    "バイナリコンテンツを含むJSONデータ",
  "base64Encoder.scenarios.scenario3.desc":
    "バックエンド開発者は、JSONデータベースフィールドに小さなPDFファイルを保存する必要があります。",
  "base64Encoder.scenarios.scenario3.binary": "📄 バイナリデータ:",
  "base64Encoder.scenarios.scenario3.binaryDesc":
    "document.pdf（45KB）- JSON互換でないバイナリ形式",
  "base64Encoder.scenarios.scenario3.encoding": "🔄 Base64エンコード:",
  "base64Encoder.scenarios.scenario3.storage": "💾 JSONストレージ:",
  "base64Encoder.scenarios.scenario3.result":
    "結果: バイナリのPDFコンテンツがJSONデータベースフィールドにテキストとして保存されるようになりました。",

  // Step-by-Step Guide
  "base64Encoder.guide.title": "Base64エンコードの使用方法",
  "base64Encoder.guide.step1.title": "エンコードまたはデコードを選択",
  "base64Encoder.guide.step1.desc":
    "テキスト/バイナリをBase64に変換するには「エンコード」、Base64を元の形式に戻すには「デコード」を選択します。",
  "base64Encoder.guide.step2.title": "データを入力",
  "base64Encoder.guide.step2.desc":
    "エンコードまたはデコードしたいテキストを入力するか、画像やドキュメントなどのファイルをアップロードします。",
  "base64Encoder.guide.step3.title": "結果を生成",
  "base64Encoder.guide.step3.desc":
    "変換ボタンをクリックすると、Base64エンコードまたはデコードされた結果が即座に表示されます。",
  "base64Encoder.guide.step4.title": "コピーして実装",
  "base64Encoder.guide.step4.desc":
    "結果をコピーして、アプリケーション、API、メールテンプレート、またはデータストレージに使用してください。",
};
