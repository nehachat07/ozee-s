import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ozees.in";

  const routes = [
    "",
    "/#about",
    "/#menu",
    "/#ordering",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-return-cancellation",
    "/food-allergy",
    "/shipping-and-delivery",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
