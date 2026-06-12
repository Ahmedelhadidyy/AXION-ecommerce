import Link from "next/link";

import ProductCard from "./ProductCard";
import Container from "../layout/Container";

import { menProducts, womenProducts, equipment } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = [
    ...menProducts,
    ...womenProducts,
    ...equipment,
  ].filter((product) => product.featured);

  return (
    <section className="py-24">
      <Container>
        {/* Header */}

        <div className="text-center">
          <span
            className="
            text-2xl
            font-semibold
            uppercase
            tracking-[0.3em]
            text-primary
            "
          >
            Featured Products
          </span>

          <p
            className="
            mt-4
            text-muted-foreground
            "
          >
            Explore our most popular gear and apparel.
          </p>
        </div>

        {/* Products */}

        <div
          className="
          mt-14
          grid
          grid-cols-1
          gap-8
          md:grid-cols-2
          xl:grid-cols-4
          "
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All */}

        <div className="mt-14 text-center">
          <Link href="/shop">
            <button
              aria-label="View All Products"
              className="
                    rounded-2xl
                    bg-primary
                    px-8
                    py-4
                    text-lg
                    font-semibold
                    text-black
                    transition-all
                    hover:scale-105
                    cursor-pointer
                    duration-500

                    "
            >
              View All Products
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
