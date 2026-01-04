import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

// 支持的语言列表
const languages = ["en", "zh", "de", "es", "fr", "ru", "ja"];

// 工具页面列表
const tools = [
  "md5-generator",
  "base64-encoder",
  "encoding-converter",
  "password-generator",
  "uuid-generator",
  "binary-code-translator",
  "email-tool",
];

// 博客文章列表
const blogPosts = [
  "base64-guide",
  "encoding-converter-guide",
  "md5-guide",
  "password-guide",
  "url-encoding-guide",
  "uuid-guide",
  "encoding-guide",
  "binary-code-guide",
  "email-guide",
];

// 静态页面列表
const staticPages = ["about", "contact", "privacy", "terms", "disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const baseUrl = siteUrl;

  const urls: MetadataRoute.Sitemap = [];

  // 添加博客页面
  urls.push({
    url: `${baseUrl}/en/blog`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  // 添加每篇博客文章
  blogPosts.forEach((post) => {
    urls.push({
      url: `${baseUrl}/en/blog/${post}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // 添加每种语言的主页
  languages.forEach((lang) => {
    urls.push({
      url: `${baseUrl}/${lang}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    });

    // 添加语言特定的工具页面
    urls.push({
      url: `${baseUrl}/${lang}/tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // 添加每个工具页面
    tools.forEach((tool) => {
      urls.push({
        url: `${baseUrl}/${lang}/tools/${tool}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    // 添加静态页面
    staticPages.forEach((page) => {
      urls.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: currentDate,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    });
  });

  return urls;
}
