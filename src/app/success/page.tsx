"use client";

import Link from "next/link";

import { useOrderStore } from "@/store/orderStore";

export default function SuccessPage() {
  const orderId = useOrderStore((state) => state.orderId);

  const customerInfo = useOrderStore((state) => state.customerInfo);

  const items = useOrderStore((state) => state.items);

  const subtotal = useOrderStore((state) => state.subtotal);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const clearOrder = useOrderStore((state) => state.clearOrder);

  if (!orderId) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">No Order Found</h1>

          <Link
            href="/shop"
            onClick={clearOrder}
            className="rounded-xl bg-primary px-6 py-3 font-bold text-black"
          >
            Go Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 p-10">
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎉</div>

          <h1 className="text-4xl font-bold">Order Placed Successfully</h1>

          <p className="mt-3 text-white/60">
            Thank you for shopping with AXION.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex justify-between">
            <span>Order Number</span>

            <span className="font-bold text-primary">{orderId}</span>
          </div>

          <div className="flex justify-between">
            <span>Customer</span>

            <span>
              {customerInfo?.firstName} {customerInfo?.lastName}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Email</span>

            <span>{customerInfo?.email}</span>
          </div>

          <div className="flex justify-between">
            <span>Items</span>

            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between">
            <span>Total</span>

            <span className="font-bold text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        <Link
          href="/shop"
          onClick={clearOrder}
          className="
          mt-8
          flex
          justify-center
          rounded-2xl
          bg-primary
          py-4
          font-bold
          text-black
          transition
          hover:bg-primary/70
        "
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
