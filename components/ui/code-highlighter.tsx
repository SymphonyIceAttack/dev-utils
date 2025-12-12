"use client";

import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";

interface CodeHighlighterProps {
  code: string;
  language: "json" | "url" | "javascript" | "typescript";
  className?: string;
}

export function CodeHighlighter({
  code,
  language,
  className = "",
}: CodeHighlighterProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Map our language types to Prism language names
  const prismLanguage = language === "url" ? "uri" : language;

  return (
    <Highlight
      theme={isDark ? themes.nightOwl : themes.github}
      code={code}
      language={prismLanguage}
    >
      {({
        className: highlightClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={`${highlightClassName} ${className} overflow-auto p-4 rounded-xl text-sm font-mono`}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block w-8 text-muted-foreground/50 select-none text-right mr-4">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

// Simple inline highlighter without line numbers
export function InlineCodeHighlighter({
  code,
  language,
  className = "",
}: CodeHighlighterProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const prismLanguage = language === "url" ? "uri" : language;

  return (
    <Highlight
      theme={isDark ? themes.nightOwl : themes.github}
      code={code}
      language={prismLanguage}
    >
      {({
        className: highlightClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={`${highlightClassName} ${className} overflow-auto text-sm font-mono whitespace-pre-wrap break-all`}
          style={{
            ...style,
            backgroundColor: "transparent",
            margin: 0,
            padding: 0,
          }}
        >
          {tokens.map((line, i) => (
            <span key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
              {i < tokens.length - 1 && "\n"}
            </span>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
