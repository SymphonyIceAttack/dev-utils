import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/private", "/_next", "/assets", "/static"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
