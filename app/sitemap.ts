import type { MetadataRoute } from "next";

const SITE_URL = "https://cozy-coffee.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/story", "/visit", "/journal", "/reserve"];
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
