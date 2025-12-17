import dynamic from "next/dynamic";

// 动态导入 StreamdownRenderer，禁用 SSR
// 原因：streamdown 依赖的 mermaid/langium 使用了浏览器全局变量（如 boolean）
// 这些变量在 Cloudflare Workers 等边缘运行时环境中不存在
export const StreamdownRenderer = dynamic(
  () => import("./StreamdownRenderer").then((mod) => mod.StreamdownRenderer),
  {
    ssr: true,
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
      </div>
    ),
  },
);
