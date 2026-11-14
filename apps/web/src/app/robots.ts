// apps/web/src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hessekhub.ir";
  return {
    rules: [
      {
        userAgent: [
          "*",
          "Googlebot",
          "Google-Extended",
          "OAI-SearchBot",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot-Extended",
        ],
        allow: ["/", "/programs/", "/mashhad/", "/cafe/", "/tools/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/app/", "/panel/", "/checkout/", "/payment/", "/api/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

