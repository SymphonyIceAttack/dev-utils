export const uuidGenerator = {
  "uuidGenerator.title": "UUID ジェネレーター",
  "uuidGenerator.description":
    "RFC4122準拠のUUID（v4、v7、v1）をカスタマイズ可能なオプションで生成",
  "uuidGenerator.pageTitle": "UUID ジェネレーター",
  "uuidGenerator.pageSubtitle": "普遍的に一意な識別子を瞬時に生成",
  "uuidGenerator.generate": "UUIDを生成",
  "uuidGenerator.generateBtn": "UUIDを生成",
  "uuidGenerator.regenerate": "再生成",
  "uuidGenerator.version": "バージョン",
  "uuidGenerator.format": "形式",
  "uuidGenerator.count": "数",
  "uuidGenerator.outputLabel": "生成されたUUID",
  "uuidGenerator.outputPlaceholder": "生成をクリックしてUUIDを作成...",
  "uuidGenerator.bulk": "一括生成",
  "uuidGenerator.generateMultiple": "複数生成",
  "uuidGenerator.bulkPlaceholder": "生成されたUUIDがここに表示されます...",
  "uuidGenerator.error.generating": "UUID生成エラー",

  // Options
  "uuidGenerator.option.v4": "UUID v4 (ランダム)",
  "uuidGenerator.option.v7": "UUID v7 (タイムスタンプ)",
  "uuidGenerator.option.v1": "UUID v1 (時間ベース)",
  "uuidGenerator.option.standard": "標準（ハイフン付き）",
  "uuidGenerator.option.withoutHyphens": "ハイフンなし",
  "uuidGenerator.option.uppercase": "大文字",
  "uuidGenerator.option.braces": "中括弧付き",

  // Examples
  "uuidGenerator.examplesTitle": "UUID例",
  "uuidGenerator.examplesDesc":
    "様々な使用例のための異なるUUIDバージョンと形式。「クイック実行」をクリックして生成、または「コピー」をクリックしてUUIDをコピー:",
  "uuidGenerator.example.v4.title": "UUID v4 (ランダム)",
  "uuidGenerator.example.v4.desc": "一般的な用途で最も一般的",
  "uuidGenerator.example.v7.title": "UUID v7 (タイムスタンプ)",
  "uuidGenerator.example.v7.desc": "作成時間でソート可能",
  "uuidGenerator.example.v1.title": "UUID v1 (時間ベース)",
  "uuidGenerator.example.v1.desc": "タイムスタンプ情報が含まれる",
  "uuidGenerator.example.noHyphens.title": "ハイフンなしUUID",
  "uuidGenerator.example.noHyphens.desc": "URL用のコンパクトな形式",
  "uuidGenerator.example.uppercase.title": "大文字UUID",
  "uuidGenerator.example.uppercase.desc": "すべて大文字形式",
  "uuidGenerator.example.braces.title": "中括弧付きUUID",
  "uuidGenerator.example.braces.desc": "中括弧で囲まれた形式",

  // SEO Content
  "uuidGenerator.whatIsUuidTitle": "UUIDとは何か？",
  "uuidGenerator.whatIsUuidDesc":
    '<strong className="text-foreground">UUID (Universally Unique Identifier)</strong> は時間と空間を超えて一意であることが保証された128ビットの識別子です。UUIDは、分散システム、データベース、および中央調整なしで一意の識別が必要なアプリケーションで広く使用されています。',

  "uuidGenerator.techDetailsTitle": "技術実装の詳細",
  "uuidGenerator.tech.webCrypto":
    '<strong>Web Crypto API:</strong> 暗号化された安全な乱数生成に <code className="bg-background px-1 rounded">crypto.getRandomValues()</code> を使用',
  "uuidGenerator.tech.v4Struct":
    '<strong>UUID v4構造:</strong> <code className="bg-background px-1 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> ここでxはランダムヘックス、4はバージョンを示す、yはバリアント（8、9、a、またはb）',
  "uuidGenerator.tech.v7Struct":
    "<strong>UUID v7構造:</strong> 最初の48ビットはミリ秒単位のUnixタイムスタンプ、バージョン битов（0111）、その後バリアント битовによるランダムデータ",
  "uuidGenerator.tech.bitManip":
    '<strong>ビット操作:</strong> <code className="bg-background px-1 rounded">bytes[6] = (bytes[6] & 0x0f) | 0x40</code> バージョン4を設定、<code className="bg-background px-1 rounded">bytes[8] = (bytes[8] & 0x3f) | 0x80</code> RFC4122バリアントを設定',
  "uuidGenerator.tech.collision":
    "<strong>衝突確率:</strong> v4で122のランダムビットにより、衝突確率は約2.71 квадриリオンの1",

  "uuidGenerator.featuresTitle": "主な機能",
  "uuidGenerator.feature.rfc.title": "RFC4122準拠",
  "uuidGenerator.feature.rfc.desc": "標準UUID v1、v4、v7サポート",
  "uuidGenerator.feature.formats.title": "複数の形式",
  "uuidGenerator.feature.formats.desc": "標準、大文字、中括弧など",
  "uuidGenerator.feature.bulk.title": "一括生成",
  "uuidGenerator.feature.bulk.desc": "一度に何千ものUUIDを生成",
  "uuidGenerator.feature.privacy.title": "100% プライベート",
  "uuidGenerator.feature.privacy.desc": "すべての処理はブラウザで行われます",

  "uuidGenerator.comparisonTitle": "UUIDバージョンの比較",
  "uuidGenerator.comparison.version": "バージョン",
  "uuidGenerator.comparison.method": "生成方法",
  "uuidGenerator.comparison.sortable": "ソート可能",
  "uuidGenerator.comparison.bestFor": "最適",
  "uuidGenerator.comparison.v1.method": "タイムスタンプ + MACアドレス",
  "uuidGenerator.comparison.v1.sortable": "部分的",
  "uuidGenerator.comparison.v1.bestFor":
    "レガシーシステム（プライバシーの懸念）",
  "uuidGenerator.comparison.v4.method": "ランダム（122ビット）",
  "uuidGenerator.comparison.v4.sortable": "いいえ",
  "uuidGenerator.comparison.v4.bestFor": "一般的な用途、最も一般的",
  "uuidGenerator.comparison.v7.method": "Unixタイムスタンプ + ランダム",
  "uuidGenerator.comparison.v7.sortable": "はい",
  "uuidGenerator.comparison.v7.bestFor": "データベースPK、時間順データ",

  "uuidGenerator.useCasesTitle": "一般的な使用例",
  "uuidGenerator.useCase.db": "分散システムでのデータベース主キー",
  "uuidGenerator.useCase.session": "セッション識別子と認証トークン",
  "uuidGenerator.useCase.distributed":
    "マイクロサービス間の分散トランザクションID",
  "uuidGenerator.useCase.files": "衝突のないファイルとリソース命名",
  "uuidGenerator.useCase.queue": "メッセージキュー重複排除キー",

  "uuidGenerator.faqTitle": "よくある質問",
  "uuidGenerator.faq.q1": "UUIDバージョンの違いは何ですか？",
  "uuidGenerator.faq.a1":
    "v4はランダム生成を使用し、v7は Better Sorting のためにタイムスタンプを含み、v1はMACアドレスとタイムスタンプを使用します（プライバシー目的で非推奨）。",
  "uuidGenerator.faq.q2": "UUIDは本当に一意ですか？",
  "uuidGenerator.faq.a2":
    "はい、重複UUIDを生成する確率は極低です。v4の場合、衝突の可能性は実用的な目的で無視できます。",
  "uuidGenerator.faq.q3": "UUIDを主キーとして使用できますか？",
  "uuidGenerator.faq.a3":
    "確かに！UUIDは中央ID生成が実用的でない分散システムに最適です。",
};
