"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import SortDropdown from "@/components/ui/SortDropdown";
import { menProducts } from "@/data/products/men";
import { womenProducts } from "@/data/products/women";
import { equipment } from "@/data/products/equipment";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const shouldFocus = sessionStorage.getItem("focusSearch");

    if (shouldFocus) {
      searchInputRef.current?.focus();

      searchInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      sessionStorage.removeItem("focusSearch");
    }
  }, []);

  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  const activeCategory = searchParams.get("category")?.toLowerCase() || "all";

  const categories = ["all", "men", "women", "equipment"];

  const products = useMemo(() => {
    const allProducts = [...menProducts, ...womenProducts, ...equipment];

    let result = allProducts;

    // Category Filter
    if (activeCategory !== "all") {
      result = result.filter(
        (product) => product.category.toLowerCase() === activeCategory,
      );
    }

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case "featured":
        result = [...result].sort(
          (a, b) => Number(b.featured) - Number(a.featured),
        );
        break;

      case "newest":
        result = [...result].sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [activeCategory, search, sortBy]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-black px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <span className="text-primary text-2xl font-semibold uppercase tracking-[0.3em]">
            collections
          </span>

          <h1 className="mt-4 text-5xl md:text-6xl font-bold text-white capitalize">
            {activeCategory === "all"
              ? "Shop Everything"
              : `${activeCategory} Collection`}
          </h1>

          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Explore our premium selection of performance-driven sportswear
            designed to elevate your training.
          </p>
        </div>

        {/* Search + Sort Grid */}
        <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_280px]">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-primary/20 bg-primary/5 pl-14 pr-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:border-primary focus:bg-primary/10 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Sort Dropdown */}
          <SortDropdown
            value={sortBy}
            onChange={(value) => {
              setSortBy(value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Categories */}
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              aria-label="category"
              key={category}
              onClick={() => {
                setCurrentPage(1);
                router.push(
                  category === "all" ? "/shop" : `/shop?category=${category}`,
                );
              }}
              className={`
                rounded-full
                px-6
                py-3
                text-sm
                font-semibold
                capitalize
                transition-all
                duration-300
                cursor-pointer
                backdrop-blur-sm

                ${
                  activeCategory === category
                    ? "bg-primary text-black"
                    : "border border-primary/30 bg-primary/5 text-white hover:bg-primary/15 hover:border-primary"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-wrap justify-center gap-2">
                  {/* Previous Button */}
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
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({
                    length: totalPages,
                  }).map((_, index) => {
                    const pageNum = index + 1;
                    const isActive = currentPage === pageNum;
                    const isNearby = Math.abs(currentPage - pageNum) <= 1;

                    // Show page numbers with ellipsis for large ranges
                    if (totalPages <= 7 || isActive || isNearby) {
                      return (
                        <button
                          aria-label="set page"
                          key={index}
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
                    } else if (
                      (pageNum === 2 && currentPage > 3) ||
                      (pageNum === totalPages - 1 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={index} className="text-white/40 px-2">
                          ...
                        </span>
                      );
                    }
                  })}

                  {/* Next Button */}
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
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Page Info */}
                <p className="text-sm text-white/60">
                  Page{" "}
                  <span className="text-primary font-semibold">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="text-primary font-semibold">
                    {totalPages}
                  </span>{" "}
                  • Showing{" "}
                  <span className="text-white">{paginatedProducts.length}</span>{" "}
                  of <span className="text-white">{products.length}</span>{" "}
                  products
                </p>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="mt-20 text-center py-16">
            <h2 className="text-3xl font-bold text-white mb-3">
              No Products Found
            </h2>

            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
              We could not find any products matching your search. Try adjusting
              your filters or search terms.
            </p>

            <button
              aria-label="clear"
              onClick={() => {
                setSearch("");
                setSortBy("featured");
                setCurrentPage(1);
                router.push("/shop");
              }}
              className="inline-block bg-primary text-black font-bold px-8 py-4 rounded-lg hover:bg-primary/70 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
