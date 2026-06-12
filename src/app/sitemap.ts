import type { MetadataRoute } from "next";

import { menProducts } from "@/data/products/men";
import { womenProducts } from "@/data/products/women";
import { equipment } from "@/data/products/equipment";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = [
    ...menProducts,
    ...womenProducts,
    ...equipment,
  ];

  const productUrls = products.map(
    (product) => ({
      url: `https://your-domain.com/shop/${product.slug}`,
      lastModified: new Date(),
    })
  );

  return [
    {
      url: "https://your-domain.com",
      lastModified: new Date(),
    },

    {
      url: "https://your-domain.com/shop",
      lastModified: new Date(),
    },

    {
      url: "https://your-domain.com/about",
      lastModified: new Date(),
    },

    {
      url: "https://your-domain.com/contact",
      lastModified: new Date(),
    },

    ...productUrls,
  ];
}