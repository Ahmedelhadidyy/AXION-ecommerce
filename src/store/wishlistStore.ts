import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistProduct = {
  id: number | string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  subcategory?: string;
};

type WishlistStore = {
  items: WishlistProduct[];

  addToWishlist: (
    product: WishlistProduct
  ) => void;

  removeFromWishlist: (
    id: number | string
  ) => void;

  isInWishlist: (
    id: number | string
  ) => boolean;
};

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({
        items: [],

        addToWishlist: (product) => {
          const exists = get().items.some(
            (item) =>
              item.id === product.id
          );

          if (exists) return;

          set((state) => ({
            items: [
              ...state.items,
              product,
            ],
          }));
        },

        removeFromWishlist: (id) =>
          set((state) => ({
            items: state.items.filter(
              (item) => item.id !== id
            ),
          })),

        isInWishlist: (id) =>
          get().items.some(
            (item) => item.id === id
          ),
      }),
      {
        name: "axion-wishlist",
      }
    )
  );