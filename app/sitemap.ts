import type { MetadataRoute } from "next";

const routes = ["", "/about", "/service", "/testimonials", "/Portfolio", "/gallery-1", "/gallery-2", "/gallery-3", "/gallery-4", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/Portfolio" ? 0.9 : 0.8,
  }));
}
