import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number | string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  subcategory?: string;
};

type RecentlyViewedStore = {
  items: Product[];

  addProduct: (
    product: Product
  ) => void;
};

export const useRecentlyViewedStore =
  create<RecentlyViewedStore>()(
    persist(
      (set, get) => ({
        items: [],

        addProduct: (product) => {
          const filtered =
            get().items.filter(
              (item) =>
                item.id !== product.id
            );

          set({
            items: [
              product,
              ...filtered,
            ].slice(0, 8),
          });
        },
      }),
      {
        name: "axion-recently-viewed",
      }
    )
  );