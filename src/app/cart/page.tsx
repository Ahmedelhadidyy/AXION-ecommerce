"use client";
import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const removeItem = useCartStore((state) => state.removeItem);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <main className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="mb-10 text-4xl font-bold">Shopping Cart</h1>

      {items.length === 0 && (
        <div className="text-center">
          <h2 className="mb-4 text-2xl">Cart is Empty</h2>

          <Link
            href="/shop"
            className="rounded-xl bg-primary px-6 py-3 text-black font-bold"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="rounded-3xl border border-white/10 p-4"
              >
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>

                    {item.size && item.size !== "Default" && (
                      <p className="text-white/60">Size: {item.size}</p>
                    )}

                    <p className="font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        aria-label="decrease"
                        onClick={() => decreaseQuantity(item.id, item.size)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        aria-label="increase"
                        onClick={() => increaseQuantity(item.id, item.size)}
                      >
                        +
                      </button>

                      <button
                        aria-label="remove item"
                        onClick={() => removeItem(item.id, item.size)}
                        className="ml-6 text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-3xl border border-white/10 p-6">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <div className="mb-4 flex justify-between">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full rounded-2xl bg-primary py-4 text-center font-bold text-black hover:bg-primary/70 cursor-pointer active:scale-95"
            >
              Proceed To Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
