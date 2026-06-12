"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartTest() {
  const items = useCartStore((state) => state.items);

  return <pre>{JSON.stringify(items, null, 2)}</pre>;
}
