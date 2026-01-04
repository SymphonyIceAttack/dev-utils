import type { FAQPage, WebApplication, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface EmailToolStructuredDataProps {
  lang: LanguageType;
}

export function EmailToolStructuredData({
  lang,
}: EmailToolStructuredDataProps) {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/email-tool`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: getFeatureList(lang),
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaqItems(lang),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

function getToolName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Email Tool",
    zh: "邮箱工具",
    ja: "メールツール",
    fr: "Outil Email",
    es: "Herramienta de Email",
    ru: "Инструмент Email",
    de: "E-Mail-Tool",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online email tool. Extract email addresses from text and verify email validity. Secure, fast, and works offline.",
    zh: "免费的在线邮箱工具。从文本中提取邮箱地址并验证邮箱有效性。安全、快速，浏览器离线工作。",
    ja: " 無料のオンラインメールツール。テキストからメールアドレスを抽出し、メールアドレスの有効性を検証。安全でブラウザオフライン動作。",
    fr: "Outil email en ligne gratuit. Extraire les adresses email du texte et vérifier la validité des emails. Sécurisé, rapide et fonctionne hors ligne.",
    es: "Herramienta de email en línea gratis. Extraer direcciones de email del texto y verificar la validez de los emails. Seguro, rápido y funciona sin conexión.",
    ru: "Бесплатный онлайн инструмент для работы с email. Извлекайте адреса электронной почты из текста и проверяйте их действительность. Безопасно, быстро, работает офлайн.",
    de: "Kostenloses Online-E-Mail-Tool. Extrahieren Sie E-Mail-Adressen aus Text und überprüfen Sie die Gültigkeit von E-Mails. Sicher, schnell und funktioniert offline.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "Extract email addresses from text",
      "Verify email format and syntax",
      "Copy individual or all emails",
      "Works offline",
      "Real-time processing",
      "Instant results",
    ],
    zh: [
      "从文本中提取邮箱地址",
      "验证邮箱格式和语法",
      "复制单个或所有邮箱",
      "离线工作",
      "实时处理",
      "即时结果",
    ],
    ja: [
      "テキストからメールアドレスを抽出",
      "メール形式と構文を検証",
      "個々のメールまたはすべてのメールをコピー",
      "オフライン動作",
      "リアルタイム処理",
      "即時結果",
    ],
    fr: [
      "Extraire les adresses email du texte",
      "Vérifier le format et la syntaxe des emails",
      "Copier les emails individuels ou tous",
      "Fonctionne hors ligne",
      "Traitement en temps réel",
      "Résultats instantanés",
    ],
    es: [
      "Extraer direcciones de email del texto",
      "Verificar formato y sintaxis de email",
      "Copiar emails individuales o todos",
      "Funciona sin conexión",
      "Procesamiento en tiempo real",
      "Resultados instantáneos",
    ],
    ru: [
      "Извлечение адресов электронной почты из текста",
      "Проверка формата и синтаксиса электронной почты",
      "Копирование отдельных или всех писем",
      "Работает офлайн",
      "Обработка в реальном времени",
      "Мгновенные результаты",
    ],
    de: [
      "E-Mail-Adressen aus Text extrahieren",
      "E-Mail-Format und Syntax validieren",
      "Einzelne oder alle E-Mails kopieren",
      "Offline-Betrieb",
      "Echtzeit-Verarbeitung",
      "Sofortige Ergebnisse",
    ],
  };
  return features[lang] || features.en;
}

interface FaqItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
}

function getFaqItems(lang: LanguageType): FaqItem[] {
  const faqData: Record<LanguageType, FaqItem[]> = {
    en: [
      {
        "@type": "Question",
        name: "What is this email tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool combines email extraction and verification. You can extract all email addresses from any text and verify individual email addresses for valid format.",
        },
      },
      {
        "@type": "Question",
        name: "Does verification check if email exists?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email verification checks format and syntax only. To confirm an email exists, you would need to send a verification email to that address.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all processing happens locally in your browser. Your data is never sent to any server or stored anywhere.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "这是什么邮箱工具？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "此工具结合了邮箱提取和验证功能。您可以从任何文本中提取所有邮箱地址，并验证单个邮箱地址的格式是否有效。",
        },
      },
      {
        "@type": "Question",
        name: "验证会检查邮箱是否真的存在吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "邮箱验证只检查格式和语法。要确认邮箱是否存在，您需要向该地址发送验证邮件。",
        },
      },
      {
        "@type": "Question",
        name: "我的数据安全吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "是的，所有处理都在您的浏览器本地进行。您的数据永远不会发送到任何服务器或存储在任何地方。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "このメールツールは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "このツールはメール抽出と検証を組み合わせています。テキストからすべてのメールアドレスを抽出し、個々のメールアドレスの形式が有効かどうかを確認できます。",
        },
      },
      {
        "@type": "Question",
        name: "検証はメールが存在するかどうかを確認しますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "メール検証は形式と構文のみをチェックします。メールが存在するかどうかを確認するには、そのアドレスに確認メールを送信する必要があります。",
        },
      },
      {
        "@type": "Question",
        name: "データは安全ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、すべての処理はブラウザ内でローカルに行われます。データがサーバーに送信されたり、どこかに保存されたりすることは一切ありません。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce que cet outil email?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cet outil combine l'extraction et la vérification des emails. Vous pouvez extraire toutes les adresses email de n'importe quel texte et vérifier si les adresses individuelles ont un format valide.",
        },
      },
      {
        "@type": "Question",
        name: "La vérification vérifie-t-elle si l'email existe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La vérification des emails ne vérifie que le format et la syntaxe. Pour confirmer qu'un email existe, vous devez envoyer un email de vérification à cette adresse.",
        },
      },
      {
        "@type": "Question",
        name: "Mes données sont-elles sécurisées?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, tout le traitement se fait localement dans votre navigateur. Vos données ne sont jamais envoyées à un serveur ou stockées quelque part.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué es esta herramienta de email?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Esta herramienta combina extracción y verificación de email. Puedes extraer todas las direcciones de email de cualquier texto y verificar si las direcciones individuales tienen un formato válido.",
        },
      },
      {
        "@type": "Question",
        name: "¿La verificación comprueba si el email existe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La verificación de email solo verifica el formato y la sintaxis. Para confirmar si un email existe, necesitarías enviar un email de verificación a esa dirección.",
        },
      },
      {
        "@type": "Question",
        name: "¿Mis datos están seguros?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, todo el procesamiento ocurre localmente en tu navegador. Tus datos nunca se envían a ningún servidor ni se almacenan en ningún lugar.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что это за инструмент для email?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Этот инструмент объединяет извлечение и проверку email. Вы можете извлекать все адреса электронной почты из любого текста и проверять, имеют ли отдельные адреса действительный формат.",
        },
      },
      {
        "@type": "Question",
        name: "Проверяет ли это, существует ли email?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Проверка email проверяет только формат и синтаксис. Чтобы подтвердить, что email существует, вам нужно отправить письмо для подтверждения на этот адрес.",
        },
      },
      {
        "@type": "Question",
        name: "Мои данные в безопасности?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, вся обработка происходит локально в вашем браузере. Ваши данные никогда не отправляются на какой-либо сервер и не сохраняются где-либо.",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was ist dieses E-Mail-Tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dieses Tool kombiniert E-Mail-Extraktion und -Verifizierung. Sie können alle E-Mail-Adressen aus beliebigem Text extrahieren und einzelne E-Mail-Adressen auf gültiges Format überprüfen.",
        },
      },
      {
        "@type": "Question",
        name: "Prüft die Verifizierung, ob die E-Mail existiert?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die E-Mail-Verifizierung prüft nur Format und Syntax. Um zu bestätigen, dass eine E-Mail existiert, müssten Sie eine Bestätigungs-E-Mail an diese Adresse senden.",
        },
      },
      {
        "@type": "Question",
        name: "Sind meine Daten sicher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, die gesamte Verarbeitung erfolgt lokal in Ihrem Browser. Ihre Daten werden niemals an einen Server gesendet oder irgendwo gespeichert.",
        },
      },
    ],
  };
  return faqData[lang] || faqData.en;
}
