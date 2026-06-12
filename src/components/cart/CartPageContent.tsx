"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/store/cartStore";

export default function CartPageContent() {
  const items = useCartStore((state) => state.items);

  const subtotal = useCartStore((state) => state.getSubtotal());

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <section className="mx-auto max-w-7xl px-4 py-32">
      <h1 className="mb-10 text-4xl font-bold">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold">Your cart is empty</h2>

          <Link href="/shop" className="text-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="rounded-3xl border border-white/10 p-5"
              >
                <div className="flex gap-5">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>

                    {item.size && (
                      <p className="text-white/60">Size: {item.size}</p>
                    )}

                    <p className="mt-2 font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        aria-label="decreaseQuantity"
                        onClick={() => decreaseQuantity(item.id, item.size)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        aria-label="increaseQuantity"
                        onClick={() => increaseQuantity(item.id, item.size)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    aria-label="remove"
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-3xl border border-white/10 p-6">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <div className="mb-4 flex justify-between">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <Link href="/checkout">
              <button
                aria-label="checkout"
                className="w-full rounded-2xl bg-primary py-4 font-bold text-black"
              >
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
