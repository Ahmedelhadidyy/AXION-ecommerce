"use client";

import { useEffect } from "react";

import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";

type Product = {
  id: number | string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  subcategory?: string;
};

export default function TrackRecentlyViewed({ product }: { product: Product }) {
  const addProduct = useRecentlyViewedStore((state) => state.addProduct);

  useEffect(() => {
    addProduct(product);
  }, [product, addProduct]);

  return null;
}
