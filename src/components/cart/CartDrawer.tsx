"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <>
      {/* Overlay with Blur */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 backdrop-blur-md transition-all duration-300 ${
          open
            ? "opacity-100 visible bg-black/40"
            : "opacity-0 invisible bg-black/0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`
          fixed
          top-0
          right-0
          z-60
          flex
          flex-col
          h-screen
          w-full
          sm:w-96
          bg-black/95
          backdrop-blur-xl
          border-l
          border-emerald-500/20
          overflow-hidden
          transition-transform
          duration-300
          ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white">
            Cart ({items.reduce((total, item) => total + item.quantity, 0)})
          </h2>

          <button
            aria-label="close"
            onClick={onClose}
            className="text-white/60 hover:text-primary transition p-2 rounded-2xl hover:bg-white/5 cursor-pointer"
            title="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Empty Cart */}
        {items.length === 0 && (
          <div className="flex h-[70vh] items-center justify-center">
            <p className="text-white/50 text-lg">Your cart is empty</p>
          </div>
        )}

        {/* Products */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 hover:bg-emerald-500/10 transition"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative h-20 w-20 overflow-hidden rounded-lg shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">
                    {item.name}
                  </h3>

                  {item.size && (
                    <p className="text-sm text-white/60">Size: {item.size}</p>
                  )}

                  <p className="text-sm text-white/60">Qty: {item.quantity}</p>

                  <p className="mt-1 font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="mt-4 flex items-center justify-between gap-2">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-white/5 px-3 py-2">
                  <button
                    aria-label="decreaseQuantity"
                    onClick={() => decreaseQuantity(item.id, item.size)}
                    className="text-lg text-white hover:text-primary transition font-bold cursor-pointer"
                  >
                    −
                  </button>

                  <span className="font-semibold text-white min-w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    aria-label="increaseQuantity"
                    onClick={() => increaseQuantity(item.id, item.size)}
                    className="text-lg text-white hover:text-primary transition font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  aria-label="remove"
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-white/60 hover:text-red-400 transition p-2 rounded-lg hover:bg-red-500/10 cursor-pointer shrink-0"
                  title="Remove item"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-emerald-500/20 bg-black/50 p-6 backdrop-blur-sm space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-white/70">Subtotal</span>
            <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <Link href="/checkout" onClick={onClose} className="block">
            <button
              aria-label="checkout"
              className="w-full rounded-2xl bg-primary text-black font-bold py-3 hover:bg-primary/70 transition cursor-pointer active:scale-95"
            >
              Checkout
            </button>
          </Link>

          {/* Continue Shopping */}
          <button
            aria-label="shopping"
            onClick={onClose}
            className="w-full rounded-2xl border border-emerald-500/30 text-primary font-semibold py-3 hover:bg-emerald-500/10 transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
