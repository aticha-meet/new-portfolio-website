import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.url
    ? [
        { url: site.url, changeFrequency: "monthly", priority: 1 },
        {
          url: new URL("/beyond", site.url).href,
          changeFrequency: "monthly",
          priority: 0.7,
        },
      ]
    : [];
}
