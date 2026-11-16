// apps/web/src/lib/api.ts
import { prisma } from "@hessekhub/database";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Client-side API fetch helper
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorBody.message || `خطا در ارتباط با سرور (${res.status})`);
  }

  return res.json();
}

// Server Component direct data loaders (Zero-latency ISR with Prisma)
export async function getCmsPage(slug: string) {
  try {
    return await prisma.cmsPage.findUnique({
      where: { slug },
      include: {
        seoMeta: true,
        sections: {
          where: { isVisible: true },
          orderBy: { orderIndex: "asc" },
        },
        faqs: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });
  } catch (err) {
    console.warn(`[getCmsPage] Warning: failed to load page "${slug}" from db:`, err);
    return null;
  }
}

export async function getPrograms() {
  try {
    return await prisma.programTemplate.findMany({
      where: { isActive: true },
      include: {
        coverageTiers: { where: { isActive: true }, orderBy: { basePriceToman: "desc" } },
        seoMeta: true,
      },
      orderBy: { sortOrder: "asc" },
    });
  } catch (err) {
    console.warn("[getPrograms] Warning: failed to load programs from db:", err);
    return [];
  }
}

export async function getProgramBySlug(slug: string) {
  try {
    return await prisma.programTemplate.findUnique({
      where: { slug },
      include: {
        phases: { orderBy: { orderIndex: "asc" } },
        coverageTiers: { where: { isActive: true }, orderBy: { basePriceToman: "desc" } },
        seoMeta: true,
      },
    });
  } catch (err) {
    console.warn(`[getProgramBySlug] Warning: failed to load program "${slug}" from db:`, err);
    return null;
  }
}

export async function getCafeMenuItems() {
  return prisma.cafeMenuItem.findMany({
    where: { isAvailable: true },
    orderBy: [{ categoryFa: "asc" }, { sortOrder: "asc" }],
    include: { mediaAsset: true },
  });
}

export async function getDeliveryZones() {
  return prisma.deliveryZone.findMany({
    where: { isActive: true },
    include: { city: true },
  });
}

export async function getDeliverySlots() {
  return prisma.deliverySlot.findMany({
    orderBy: { startTime: "asc" },
  });
}

export async function getProgrammaticLanding(intentSlug: string) {
  return prisma.programmaticLanding.findUnique({
    where: { intentSlug },
    include: { seoMeta: true },
  });
}

