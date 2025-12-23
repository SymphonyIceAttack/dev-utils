export const md5Generator = {
  "md5Generator.title": "MD5 ハッシュジェネレーター",
  "md5Generator.description":
    "テキストまたはファイルからMD5ハッシュ値を生成、チェックサムと検証用",
  "md5Generator.pageTitle": "MD5 ハッシュジェネレーター",
  "md5Generator.pageSubtitle": "テキスト文字列のMD5ハッシュを瞬時に生成",
  "md5Generator.inputLabel": "入力テキスト",
  "md5Generator.inputPlaceholder":
    "MD5ハッシュを生成するためのテキストを入力...",
  "md5Generator.outputLabel": "MD5 ハッシュ",
  "md5Generator.outputPlaceholder": "MD5ハッシュがここに表示されます...",
  "md5Generator.generate": "MD5を生成",
  "md5Generator.uppercase": "大文字",
  "md5Generator.lowercase": "小文字",
  "md5Generator.bit32": "32-bit",
  "md5Generator.bit16": "16-bit (中間)",
  "md5Generator.examples": "例",
  "md5Generator.examplesHint": "例をクリックして読み込みます:",
  "md5Generator.examples.simpleText": "シンプルなテキスト",
  "md5Generator.examples.password": "パスワードハッシュ",
  "md5Generator.examples.fileChecksum": "ファイルチェックサム",
  "md5Generator.error.generating": "MD5ハッシュ生成エラー",

  "md5Generator.fileUpload": "ファイルアップロード",
  "md5Generator.fileUpload.title": "ファイルをアップロード",
  "md5Generator.fileUpload.click": "クリックしてファイルをアップロード",
  "md5Generator.fileUpload.hint": "最大10MB • テキストファイルのみ",
  "md5Generator.fileUpload.uploaded": "アップロード済み: {name}",
  "md5Generator.mode.single": "シングルモード",
  "md5Generator.mode.batch": "バッチモード",
  "md5Generator.batchInput": "バッチ入力",
  "md5Generator.batchOutput": "Batch Output",
  "md5Generator.addRow": "Add Row",
  "md5Generator.copyAll": "Copy All",
  "md5Generator.batchPlaceholder":
    "Batch results will appear here...\nYour MD5 hashes\nwill be displayed here.",
  "md5Generator.exampleInputs": "Example Inputs",
  "md5Generator.loadExample": "Load Example Only",

  // SEO Content
  "md5Generator.seo.title": "MD5ハッシュとは？どのように実装されていますか？",
  "md5Generator.seo.desc":
    '<strong className="text-foreground">MD5 (Message-Digest Algorithm 5)</strong>は、128ビット（16バイト）のハッシュ値を生成する広く使用されている暗号学的ハッシュ関数で、通常は32文字の16進数で表されます。私たちの実装は純粋なJavaScriptでビット演算を使用し、512ビットデータブロックごとに4라운드、16操作ずつ実行します。',

  "md5Generator.tech.title": "技術的実装",
  "md5Generator.tech.coreTitle": "コア関数:",
  "md5Generator.tech.coreList1": "F(x,y,z) = (x ∧ y) ∨ (¬x ∧ z) - ラウンド1",
  "md5Generator.tech.coreList2": "G(x,y,z) = (x ∧ z) ∨ (y ∧ ¬z) - ラウンド2",
  "md5Generator.tech.coreList3": "H(x,y,z) = x ⊕ y ⊕ z - ラウンド3",
  "md5Generator.tech.coreList4": "I(x,y,z) = y ⊕ (x ∨ ¬z) - ラウンド4",
  "md5Generator.tech.stepsTitle": "処理ステップ:",
  "md5Generator.tech.stepsList1":
    "1. メッセージの前処理（パディングと長さの追加）",
  "md5Generator.tech.stepsList2": "2. メッセージを512ビットブロックに分割",
  "md5Generator.tech.stepsList3": "3. 各ブロックを4ラウンド、16操作ずつ処理",
  "md5Generator.tech.stepsList4": "4. 32ビット算術とビット演算を使用",
  "md5Generator.tech.stepsList5":
    "5. 結果を組み合わせて最終的な128ビットハッシュを生成",

  "md5Generator.features.title": "主な機能",
  "md5Generator.feature.checksums.title": "ファイルのチェックサム",
  "md5Generator.feature.checksums.desc": "最大10MBのファイルのMD5を生成",
  "md5Generator.feature.batch.title": "バッチ処理",
  "md5Generator.feature.batch.desc": "複数の文字列を同時にハッシュ化",
  "md5Generator.feature.upload.title": "ファイルアップロード",
  "md5Generator.feature.upload.desc":
    "ファイルをドラッグ&ドロップして即座にハッシュ化",
  "md5Generator.feature.privacy.title": "100%プライベート",
  "md5Generator.feature.privacy.desc":
    "すべての処理はブラウザ内でローカルに実行",

  "md5Generator.useCases.title": "一般的な使用例と使用の境界",
  "md5Generator.useCases.item1": "ファイルの整合性検証とチェックサム",
  "md5Generator.useCases.boundary1":
    "✅ 適しています - 転送中の偶発的なファイル破損の検出に最適",
  "md5Generator.useCases.item2": "データベースへのパスワード保存（ソルト付き）",
  "md5Generator.useCases.boundary2":
    "⚠️ 推奨されません - 代わりにbcrypt、Argon2、またはscryptを使用してください",
  "md5Generator.useCases.item3": "一意の識別子の生成",
  "md5Generator.useCases.boundary3":
    "⚠️ 注意して使用してください - より優れた一意性の保証にはUUID v4を検討してください",
  "md5Generator.useCases.item4": "重複ファイルの検出",
  "md5Generator.useCases.boundary4":
    "✅ 適しています - ローカルシステムでの重要でない重複検出に適しています",
  "md5Generator.useCases.item5": "API署名検証",
  "md5Generator.useCases.boundary5":
    "❌ 安全ではありません - 衝突攻撃に対して脆弱なので、HMAC with SHA-256を使用してください",

  "md5Generator.faq.title": "よくある質問",
  "md5Generator.faq.q1": "32ビットと16ビットのMD5の違いは何ですか？",
  "md5Generator.faq.a1":
    "32ビットMD5は完全なハッシュ（16進数の32文字）です。16ビットMD5は完全なハッシュの中央の16文字を取得します。",
  "md5Generator.faq.q2": "パスワードにMD5は安全ですか？",
  "md5Generator.faq.a2":
    "既知の脆弱性があるため、MD5 aloneはパスワードハッシュには推奨されません。パスワードセキュリティにはbcryptやArgon2などの最新のアルゴリズムを使用してください。",
  "md5Generator.faq.q3": "このツールを使用するとデータは安全ですか？",
  "md5Generator.faq.a3":
    "はい、すべてのMD5ハッシュ化はブラウザ内でローカルで行われます。あなたのデータは決してサーバーに送信されません。",
};
