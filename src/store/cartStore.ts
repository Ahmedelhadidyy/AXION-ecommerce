import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export type CartItem = {
  id: number | string;
  name: string;
  image: string;
  price: number;
  size?: string;
  quantity: number;
};

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  country: string;
  city: string;
  address: string;
};

type CartStore = {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (
    id: number | string,
    size?: string
  ) => void;

  clearCart: () => void;

  increaseQuantity: (
    id: number | string,
    size?: string
  ) => void;

  decreaseQuantity: (
    id: number | string,
    size?: string
  ) => void;

  getSubtotal: () => number;

  getTotalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.id === item.id &&
              i.size === item.size
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id &&
                i.size === item.size
                  ? {
                      ...i,
                      quantity:
                        i.quantity +
                        item.quantity,
                    }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.id === id &&
                item.size === size
              )
          ),
        })),

      increaseQuantity: (id, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.size === size
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id, size) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id &&
              item.size === size
                ? {
                    ...item,
                    quantity:
                      item.quantity - 1,
                  }
                : item
            )
            .filter(
              (item) => item.quantity > 0
            ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );
      },
    }),
    {
      name: "axion-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);