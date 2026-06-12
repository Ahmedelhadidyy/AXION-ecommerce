"use client";

import ProductCard from "./ProductCard";

import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";

export default function RecentlyViewed({
  currentProductId,
}: {
  currentProductId: number | string;
}) {
  const products = useRecentlyViewedStore((state) => state.items);

  const filteredProducts = products.filter(
    (product) => product.id !== currentProductId,
  );

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <h2 className="mb-10 text-3xl font-bold">Recently Viewed</h2>

      <div
        className="
        grid
        gap-8
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        "
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
