// apps/web/src/app/sitemap.ts
import { MetadataRoute } from "next";
import { prisma } from "@hessekhub/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hessekhub.ir";

  const [programs, landings] = await Promise.all([
    prisma.programTemplate.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.programmaticLanding.findMany({ where: { isPublished: true }, select: { intentSlug: true, updatedAt: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/programs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/cafe`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/cafe/menu`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/tools/calorie-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${baseUrl}/programs/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const landingRoutes: MetadataRoute.Sitemap = landings.map((l) => ({
    url: `${baseUrl}/mashhad/${l.intentSlug}`,
    lastModified: l.updatedAt,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...programRoutes, ...landingRoutes];
}

