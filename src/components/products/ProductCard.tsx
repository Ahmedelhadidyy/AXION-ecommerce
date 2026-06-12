"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

import QuickAddModal from "./QuickAddModal";

type ProductCardProps = {
  product: {
    subcategory?: string;
    slug: string;
    id: number | string;
    name: string;
    category: string;
    price: number;
    image: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id),
  );

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  return (
    <article
      className="
      group
      overflow-hidden
      rounded-3xl
      bg-secondary
      backdrop-blur-xl
      transition-all
      duration-500
      hover:-translate-y-2
      "
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-4/5 overflow-hidden">
          <button
            aria-label="wishlist"
            onClick={(e) => handleWishlist(e)}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-black/50
              backdrop-blur-md
              transition
              hover:scale-110
              cursor-pointer
              "
          >
            <Heart
              className={
                isInWishlist ? "fill-primary text-primary" : "text-white"
              }
              size={20}
            />
          </button>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
            "
          />
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <span
          className="
          inline-block
          rounded-full
          bg-primary/10
          px-3
          py-1
          text-xs
          font-medium
          uppercase
          text-primary
          "
        >
          {product.category}
        </span>

        <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>

        <p className="text-xl font-bold">${product.price}</p>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/shop/${product.slug}`}
            className="
            flex
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            py-3
            text-sm
            font-semibold
            transition
            hover:border-primary
            "
          >
            View Product
          </Link>

          <QuickAddModal product={product} />
        </div>
      </div>
    </article>
  );
}
