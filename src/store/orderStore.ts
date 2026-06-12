import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "./cartStore";
import type { CustomerInfo } from "./cartStore";

type OrderStore = {
  orderId: string;

  customerInfo: CustomerInfo | null;

  items: CartItem[];

  subtotal: number;

saveOrder: (
  orderId: string,
  customerInfo: CustomerInfo,
  items: CartItem[],
  subtotal: number
) => void;

  clearOrder: () => void;
};

export const useOrderStore =
  create<OrderStore>()(
    persist(
      (set) => ({
        orderId: "",

        customerInfo: null,

        items: [],

        subtotal: 0,

saveOrder: (
  orderId,
  customerInfo,
  items,
  subtotal
) =>
  set({
    orderId,
    customerInfo,
    items,
    subtotal,
  }),

        clearOrder: () =>
          set({
            orderId: "",
            customerInfo: null,
            items: [],
            subtotal: 0,
          }),
      }),
      {
        name: "axion-order",
      }
    )
  );