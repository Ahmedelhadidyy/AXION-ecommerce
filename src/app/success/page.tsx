"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { useOrderStore } from "@/store/orderStore";

export default function SuccessPage() {
  const orderId = useOrderStore((state) => state.orderId);
  const customerInfo = useOrderStore((state) => state.customerInfo);
  const items = useOrderStore((state) => state.items);
  const subtotal = useOrderStore((state) => state.subtotal);
  const clearOrder = useOrderStore((state) => state.clearOrder);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // No order found state
  if (!orderId) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20">
            <Package className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="mb-3 text-3xl font-bold text-white">
            No Order Found
          </h1>

          <p className="text-white/60 mb-8">
            It looks like you do not have an active order. Start shopping to place your first order!
          </p>

          <Link
            href="/shop"
            onClick={clearOrder}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-black font-bold px-8 py-4 hover:bg-primary/70 transition duration-300 active:scale-95 w-full"
          >
            Go Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 md:py-20">
      <div className="mx-auto w-full max-w-2xl">
        {/* Success Header */}
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Order Placed Successfully!
          </h1>

          <p className="text-base md:text-lg text-white/60 max-w-md mx-auto">
            Thank you for shopping with AXION. Your order is confirmed and on its way!
          </p>
        </div>

        {/* Order Details Card */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-6 md:p-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Order Number - Highlighted */}
          <div className="mb-8 pb-8 border-b border-primary/20">
            <p className="text-white/60 text-sm mb-2">Order Number</p>
            <p className="text-2xl md:text-3xl font-bold text-primary break-all">
              {orderId}
            </p>
          </div>

          {/* Customer Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-primary/20">
            {/* First Name & Last Name */}
            <div>
              <p className="text-white/60 text-sm mb-2">Customer Name</p>
              <p className="text-white font-medium wrap-break-word">
                {customerInfo?.firstName} {customerInfo?.lastName}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-white/60 text-sm mb-2">Email Address</p>
              <p className="text-white font-medium break-all text-sm md:text-base">
                {customerInfo?.email}
              </p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-white/60 text-sm mb-2">Phone</p>
              <p className="text-white font-medium">
                {customerInfo?.phone}
              </p>
            </div>

            {/* City & Country */}
            <div>
              <p className="text-white/60 text-sm mb-2">Delivery Location</p>
              <p className="text-white font-medium">
                {customerInfo?.city}, {customerInfo?.country}
              </p>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <p className="text-white/60 text-sm mb-2">Shipping Address</p>
              <p className="text-white font-medium wrap-break-word">
                {customerInfo?.address}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Items Ordered</span>
              <span className="font-semibold text-primary text-lg">
                {totalItems}
              </span>
            </div>

            {/* Items List */}
            {items.length > 0 && (
              <div className="bg-black/30 rounded-lg p-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
                <p className="text-white/60 text-sm mb-3 font-semibold">
                  Order Items:
                </p>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-start text-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate">
                          {item.name}
                          {item.size && (
                            <span className="text-white/60"> ({item.size})</span>
                          )}
                        </p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-white/80">
                          {item.quantity}x ${item.price.toFixed(2)}
                        </p>
                        <p className="text-primary font-semibold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="border-t border-primary/20 pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total Amount</span>
              <span className="text-2xl font-bold text-primary">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 md:p-6 mb-8">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm md:text-base">
                  Order Confirmation
                </p>
                <p className="text-white/60 text-xs md:text-sm">
                  Check your email for confirmation details
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm md:text-base">
                  Expected Delivery
                </p>
                <p className="text-white/60 text-xs md:text-sm">
                  2-5 business days
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm md:text-base">
                  Track Your Order
                </p>
                <p className="text-white/60 text-xs md:text-sm">
                  Email updates will be sent as your order ships
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            onClick={clearOrder}
            className="flex-1 rounded-2xl bg-primary text-black font-bold py-4 hover:bg-primary/70 transition duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/"
                className="flex-1 rounded-2xl text-white border border-primary/30 hover:bg-primary/10 font-bold py-4 transition duration-300 active:scale-95 flex items-center justify-center gap-2"

            // className="flex-1 items-center justify-center bg-red-500 rounded-lg border border-primary/30 text-white font-bold py-4 hover:bg-primary/10 transition duration-300 active:scale-95"
          >
            Back Home
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white/40 text-xs md:text-sm mt-8">
          Questions? Contact us at support@axion.com
        </p>
      </div>
    </main>
  );
}

// ysta beraha kda hwa kan sha3'al m3aaya kwys w sa7 w zy el foll awl lma rf3t 3la github w geet a3ml deploy w 7sl el mashakel dih kolha w hwa msht3'lsh f hena eh el moshkla