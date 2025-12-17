"use client";
import { lazy, Suspense } from "react";

const globalWithBoolean = globalThis as typeof globalThis & {
  boolean?: typeof Boolean;
};

if (typeof globalWithBoolean.boolean === "undefined") {
  globalWithBoolean.boolean = Boolean;
}

const Streamdown = lazy(() =>
  import("streamdown").then((mod) => ({ default: mod.Streamdown })),
);

function StreamdownFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
    </div>
  );
}

interface StreamdownRendererProps {
  content: string;
  className?: string;
  mode?: "static" | "streaming";
  customComponents?: Record<string, unknown>;
}

interface AnchorProps {
  href: string;
  children: React.ReactNode;
}

/**
 * 通用 Streamdown 渲染器组件
 * 提供统一的 Markdown 渲染配置，避免重复代码
 */
export function StreamdownRenderer({
  content,
  className = "prose prose-lg max-w-none streamdown-content",
  mode = "static",
  customComponents = {},
}: StreamdownRendererProps) {
  // 通用组件配置
  const defaultComponents = {
    h1: ({ children }: { children: React.ReactNode }) => {
      const title = typeof children === "string" ? children : "";
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return (
        <h1
          id={id || "main-title"}
          className="text-4xl font-bold text-gray-900 dark:text-gray-100 border-b-4 border-blue-500 pb-4 mb-8"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: { children: React.ReactNode }) => {
      const title = typeof children === "string" ? children : "";
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return (
        <h2
          id={id}
          className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-12 mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }: { children: React.ReactNode }) => {
      const title = typeof children === "string" ? children : "";
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return (
        <h3
          id={id}
          className="text-2xl font-medium text-gray-700 dark:text-gray-300 mt-8 mb-4"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }: { children: React.ReactNode }) => {
      const title = typeof children === "string" ? children : "";
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return (
        <h4
          id={id}
          className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-6 mb-3"
        >
          {children}
        </h4>
      );
    },
    h5: ({ children }: { children: React.ReactNode }) => {
      const title = typeof children === "string" ? children : "";
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return (
        <h5
          id={id}
          className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2"
        >
          {children}
        </h5>
      );
    },
    h6: ({ children }: { children: React.ReactNode }) => {
      const title = typeof children === "string" ? children : "";
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return (
        <h6
          id={id}
          className="text-base font-medium text-gray-700 dark:text-gray-300 mt-3 mb-2"
        >
          {children}
        </h6>
      );
    },
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-3 mb-6 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-3 mb-6 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="text-lg">{children}</li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 dark:bg-blue-950/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-gray-800 dark:text-gray-200">
        {children}
      </strong>
    ),
    a: ({ href, children }: AnchorProps) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 decoration-blue-300 dark:decoration-blue-600 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors"
      >
        {children}
      </a>
    ),
  };

  // 合并默认组件和自定义组件
  const mergedComponents = {
    ...defaultComponents,
    ...customComponents,
  } as Record<string, unknown>;

  return (
    <div className={className}>
      <Suspense fallback={<StreamdownFallback />}>
        <Streamdown
          mode={mode}
          shikiTheme={["github-light", "github-dark"]}
          components={mergedComponents}
        >
          {content}
        </Streamdown>
      </Suspense>
    </div>
  );
}
