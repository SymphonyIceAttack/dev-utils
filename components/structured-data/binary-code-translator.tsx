"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface BinaryCodeTranslatorStructuredDataProps {
  lang: LanguageType;
}

export function BinaryCodeTranslatorStructuredData({
  lang,
}: BinaryCodeTranslatorStructuredDataProps) {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/binary-code-translator`,
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

function getToolName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Binary Code Translator",
    zh: "二进制代码转换器",
    ja: "バイナリコード翻訳者",
    fr: "Traducteur de Code Binaire",
    es: "Traductor de Código Binario",
    ru: "Переводчик двоичного кода",
    de: "Binärcode-Übersetzer",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online binary code translator. Convert text to binary and binary to text instantly. Secure, fast, and works offline in your browser.",
    zh: "免费的在线二进制代码转换器。立即将文本转换为二进制或将二进制转换为文本。安全、快速，浏览器离线工作。",
    ja: " 無料のオンラインバイナリコード翻訳者。テキストからバイナリへ、バイナリからテキストへ即座に変換。安全でブラウザオフライン動作。",
    fr: "Traducteur de code binaire en ligne gratuit. Convertissez du texte en binaire et du binaire en texte instantanément. Sécurisé, rapide et fonctionne hors ligne dans votre navigateur.",
    es: "Traductor de código binario en línea gratis. Convierte texto a binario y binario a texto instantáneamente. Seguro, rápido y funciona sin conexión en tu navegador.",
    ru: "Бесплатный онлайн переводчик двоичного кода. Мгновенно конвертируйте текст в двоичный код и наоборот. Безопасно, быстро, работает офлайн в браузере.",
    de: "Kostenloser Online-Binärcode-Übersetzer. Konvertieren Sie Text in Binär und Binär in Text sofort. Sicher, schnell und funktioniert offline in Ihrem Browser.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "Text to binary conversion",
      "Binary to text conversion",
      "Copy to clipboard",
      "Works offline",
      "Real-time conversion",
      "Instant results",
    ],
    zh: [
      "文本转二进制",
      "二进制转文本",
      "复制到剪贴板",
      "离线工作",
      "实时转换",
      "即时结果",
    ],
    ja: [
      "テキストからバイナリへ変換",
      "バイナリからテキストへ変換",
      "クリップボードにコピー",
      "オフライン動作",
      "リアルタイム変換",
      "即時結果",
    ],
    fr: [
      "Conversion texte vers binaire",
      "Conversion binaire vers texte",
      "Copier dans le presse-papiers",
      "Fonctionne hors ligne",
      "Conversion en temps réel",
      "Résultats instantanés",
    ],
    es: [
      "Conversión de texto a binario",
      "Conversión de binario a texto",
      "Copiar al portapapeles",
      "Funciona sin conexión",
      "Conversión en tiempo real",
      "Resultados instantáneos",
    ],
    ru: [
      "Преобразование текста в двоичный код",
      "Преобразование двоичного кода в текст",
      "Копировать в буфер обмена",
      "Работает офлайн",
      "Преобразование в реальном времени",
      "Мгновенные результаты",
    ],
    de: [
      "Text-zu-Binär-Konvertierung",
      "Binär-zu-Text-Konvertierung",
      "In die Zwischenablage kopieren",
      "Offline-Betrieb",
      "Echtzeit-Konvertierung",
      "Sofortige Ergebnisse",
    ],
  };
  return features[lang] || features.en;
}

interface FaqItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

function getFaqItems(lang: LanguageType): FaqItem[] {
  const faqData: Record<LanguageType, FaqItem[]> = {
    en: [
      {
        "@type": "Question",
        name: "What is binary code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Binary code is a system of representing text or computer processor instructions using the binary number system (0s and 1s). Computers use binary to process all data, making it fundamental to digital computing.",
        },
      },
      {
        "@type": "Question",
        name: "How does text to binary conversion work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each character in text is converted to its ASCII or Unicode value, which is then represented as an 8-bit binary number. For example, the letter 'A' has ASCII value 65, which is 01000001 in binary.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert binary back to text?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our binary to text converter takes groups of 8 binary digits (bytes) and converts them back to their corresponding ASCII characters. Simply paste your binary code and click convert.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "什么是二进制代码？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "二进制代码是使用二进制数字系统（0 和 1）表示文本或计算机处理器指令的系统。计算机使用二进制来处理所有数据，使其成为数字计算的基础。",
        },
      },
      {
        "@type": "Question",
        name: "文本转二进制是如何工作的？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "文本中的每个字符都会转换为其 ASCII 或 Unicode 值，然后表示为 8 位二进制数。例如，字母 'A' 的 ASCII 值是 65，在二进制中是 01000001。",
        },
      },
      {
        "@type": "Question",
        name: "可以将二进制转换回文本吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以！我们的二进制转文本转换器将每组 8 位二进制数字（字节）转换回相应的 ASCII 字符。只需粘贴您的二进制代码并点击转换。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "バイナリコードとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "バイナリコードは、バイナリ数字システム（0 と 1）を使用してテキストまたはコンピュータプロセッサの命令を表すシステムです。コンピュータはすべてのデータを処理するためにバイナリを使用するため、デジタルコンピューティングの基礎となっています。",
        },
      },
      {
        "@type": "Question",
        name: "テキストからバイナリへの変換はどのように機能しますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "テキストの各文字は、ASCII または Unicode 値に変換され、その後 8 ビットのバイナリ数字として表されます。たとえば、文字 'A' の ASCII 値は 65 で、バイナリでは 01000001 です。",
        },
      },
      {
        "@type": "Question",
        name: "バイナリをテキストに変換できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい！私たちのバイナリからテキストへの変換ツールは、8 バイドバイナリ数字（バイト）のグループを対応する ASCII 文字に変換します。バイナリコードを貼り付けて、変換をクリックするだけです。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce que le code binaire ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le code binaire est un système de représentation de texte ou d'instructions de processeur informatique utilisant le système de nombres binaires (0 et 1). Les ordinateurs utilisent le binaire pour traiter toutes les données, ce qui en fait le fondement de l'informatique numérique.",
        },
      },
      {
        "@type": "Question",
        name: "Comment fonctionne la conversion texte vers binaire ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chaque caractère de texte est converti en sa valeur ASCII ou Unicode, qui est ensuite représentée comme un nombre binaire de 8 bits. Par exemple, la lettre 'A' a la valeur ASCII 65, qui est 01000001 en binaire.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je convertir le binaire en texte ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui ! Notre convertisseur binaire vers texte prend des groupes de 8 chiffres binaires (octets) et les convertit en leurs caractères ASCII correspondants. Collez simplement votre code binaire et cliquez sur convertir.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué es el código binario?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El código binario es un sistema de representación de texto o instrucciones de procesador de computadora usando el sistema numérico binario (0s y 1s). Las computadoras usan binario para procesar todos los datos, haciéndolo fundamental para la computación digital.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo funciona la conversión de texto a binario?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cada carácter en el texto se convierte a su valor ASCII o Unicode, que luego se representa como un número binario de 8 bits. Por ejemplo, la letra 'A' tiene valor ASCII 65, que es 01000001 en binario.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo convertir binario a texto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "¡Sí! Nuestro convertidor de binario a texto toma grupos de 8 dígitos binarios (bytes) y los convierte de vuelta a sus caracteres ASCII correspondientes. Simplemente pega tu código binario y haz clic en convertir.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что такое двоичный код?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Двоичный код — это система представления текста или инструкций процессора компьютера с использованием двоичной системы счисления (0 и 1). Компьютеры используют двоичный код для обработки всех данных, что делает его основой цифровых вычислений.",
        },
      },
      {
        "@type": "Question",
        name: "Как работает преобразование текста в двоичный код?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Каждый символ в тексте преобразуется в его значение ASCII или Unicode, которое затем представляется как 8-битное двоичное число. Например, буква 'A' имеет ASCII-значение 65, что в двоичном виде равно 01000001.",
        },
      },
      {
        "@type": "Question",
        name: "Можно ли преобразовать двоичный код обратно в текст?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да! Наш преобразователь двоичного кода в текст берет группы из 8 двоичных цифр (байтов) и преобразует их обратно в соответствующие символы ASCII. Просто вставьте ваш двоичный код и нажмите «Преобразовать».",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was ist Binärcode?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Binärcode ist ein System zur Darstellung von Text oder Computerprozessoranweisungen unter Verwendung des Binärzahlensystems (0en und 1en). Computer verwenden Binärzahlen, um alle Daten zu verarbeiten, was es zur Grundlage des digitalen Rechnens macht.",
        },
      },
      {
        "@type": "Question",
        name: "Wie funktioniert die Text-zu-Binär-Konvertierung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jedes Zeichen im Text wird in seinen ASCII- oder Unicode-Wert konvertiert, der dann als 8-Bit-Binärzahl dargestellt wird. Der Buchstabe 'A' hat beispielsweise den ASCII-Wert 65, der in Binär 01000001 ist.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich Binärcode zurück in Text konvertieren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja! Unser Binär-zu-Text-Konverter nimmt Gruppen von 8 Binärziffern (Bytes) und konvertiert sie zurück in ihre entsprechenden ASCII-Zeichen. Fügen Sie einfach Ihren Binärcode ein und klicken Sie auf Konvertieren.",
        },
      },
    ],
  };

  return faqData[lang] || faqData.en;
}
