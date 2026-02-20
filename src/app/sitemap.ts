import type { MetadataRoute } from "next";
import { guideContents } from "@/data/guide-content";
import { siteUrl, siteLastModified } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides: MetadataRoute.Sitemap = guideContents.map((guide) => ({
    url: `${siteUrl}/guide/${guide.slug}/`,
    lastModified: siteLastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...guides,
  ];
}
