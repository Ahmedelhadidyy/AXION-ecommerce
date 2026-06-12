"use client";

import { useState } from "react";
import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "@/components/products/ProductCard";

import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  const totalPages = Math.ceil(items.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = items.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Wishlist</h1>

          <p className="mt-4 text-white/60">Your wishlist is empty.</p>

          <Link
            href="/shop"
            className="mt-8 inline-block rounded-xl bg-primary hover:bg-primary/70 px-8 py-4 font-bold text-black"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="mb-3 text-5xl font-bold">Wishlist</h1>

      <p className="mb-12 text-white/60">{items.length} saved products</p>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-2">
            {/* Previous */}

            <button
              aria-label="set page"
              onClick={() => {
                setCurrentPage(Math.max(1, currentPage - 1));

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              disabled={currentPage === 1}
              className="h-12 w-12 rounded-lg cursor-pointer border border-primary/30 bg-primary/5 flex items-center justify-center transition hover:border-primary hover:bg-primary/15 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Pages */}

            {Array.from({
              length: totalPages,
            }).map((_, index) => {
              const pageNum = index + 1;

              const isActive = currentPage === pageNum;

              const isNearby = Math.abs(currentPage - pageNum) <= 1;

              if (totalPages <= 7 || isActive || isNearby) {
                return (
                  <button
                    aria-label="set page"
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className={`
                      h-12
                      w-12
                      rounded-full
                      font-semibold
                      transition
                      flex
                      items-center
                      justify-center
                      cursor-pointer

                      ${
                        isActive
                          ? "bg-primary text-black"
                          : "border border-primary/30 bg-primary/5 text-white hover:border-primary hover:bg-primary/15"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              }

              if (
                (pageNum === 2 && currentPage > 3) ||
                (pageNum === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={pageNum} className="px-2 text-white/40">
                    ...
                  </span>
                );
              }

              return null;
            })}

            {/* Next */}

            <button
              aria-label="set page"
              onClick={() => {
                setCurrentPage(Math.min(totalPages, currentPage + 1));

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              disabled={currentPage === totalPages}
              className="h-12 w-12 rounded-lg cursor-pointer border border-primary/30 bg-primary/5 flex items-center justify-center transition hover:border-primary hover:bg-primary/15 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="text-sm text-white/60">
            Page{" "}
            <span className="font-semibold text-primary">{currentPage}</span> of{" "}
            <span className="font-semibold text-primary">{totalPages}</span> •
            Showing{" "}
            <span className="text-white">{paginatedProducts.length}</span> of{" "}
            <span className="text-white">{items.length}</span> products
          </p>
        </div>
      )}
    </main>
  );
}
