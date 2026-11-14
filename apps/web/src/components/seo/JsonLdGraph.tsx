// apps/web/src/components/seo/JsonLdGraph.tsx
import React from "react";

export interface JsonLdGraphProps {
  graph?: Record<string, unknown>[];
  customSchemas?: Record<string, unknown>[];
}

export function JsonLdGraph({ graph, customSchemas }: JsonLdGraphProps) {
  const defaultOrg = {
    "@type": ["Organization", "HealthAndBeautyBusiness", "Restaurant"],
    "@id": "https://hessekhub.ir/#organization",
    name: "حس خوب | Hessekhub",
    url: "https://hessekhub.ir",
    foundingDate: "2018",
    telephone: "05137660000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mashhad",
      streetAddress: "مشهد، بلوار سجاد، خیابان بهارستان، بهارستان ۲",
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.3155,
      longitude: 59.5421,
    },
    servesCuisine: "Healthy Diet & Organic Persian/International",
    openingHours: "08:00-24:00",
  };

  const fullGraph = graph || [defaultOrg, ...(customSchemas || [])];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": fullGraph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

