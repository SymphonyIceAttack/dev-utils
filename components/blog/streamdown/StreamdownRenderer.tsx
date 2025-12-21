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
  customComponents?: Record<string, unknown>;
}

/**
 * 通用 Streamdown 渲染器组件
 * 提供统一的 Markdown 渲染配置，避免重复代码
 */
export function StreamdownRenderer({
  content,
  className = "prose prose-lg max-w-none streamdown-content",
}: StreamdownRendererProps) {
  return (
    <div className={className}>
      <Suspense fallback={<StreamdownFallback />}>
        <Streamdown shikiTheme={["github-light", "github-dark"]}>
          {content}
        </Streamdown>
      </Suspense>
    </div>
  );
}
