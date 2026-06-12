"use client";

import { useOrderStore } from "@/store/orderStore";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),

  lastName: z.string().min(2, "Last name is required"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(8, "Phone number is required"),

  country: z.string().min(2, "Country is required"),

  city: z.string().min(2, "City is required"),

  address: z.string().min(5, "Address is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();

  const saveOrder = useOrderStore((state) => state.saveOrder);

  const items = useCartStore((state) => state.items);

  const subtotal = useCartStore((state) => state.getSubtotal());

  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // ✅ Redirect if cart is empty - No setState!
  useEffect(() => {
    if (items.length === 0) {
      const timer = setTimeout(() => {
        router.push("/shop");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [items, router]);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      if (items.length === 0) {
        toast.error("Your cart is empty. Please add items before proceeding.");

        router.push("/shop");

        return;
      }

      const orderId = `AX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

      const response = await fetch("/api/order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          orderId,
          customerInfo: data,
          items,
          subtotal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      saveOrder(orderId, data, items, subtotal);

      clearCart();

      toast.success("Order placed successfully!");

      router.push("/success");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    }
  };

  // ✅ Show loading state if redirecting
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-32 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Cart is Empty</h2>
          <p className="text-white/70 mb-6">
            You need to add items to your cart before you can checkout.
          </p>
          <button
            aria-label="Continue Shopping"
            onClick={() => router.push("/shop")}
            className="w-full bg-primary text-black font-bold py-3 rounded-2xl hover:bg-primary/70 transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="mb-10 text-4xl font-bold text-white">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-10 lg:grid-cols-[1fr_400px]"
      >
        {/* CUSTOMER FORM */}

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Customer Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* First Name */}

            <div>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="w-full rounded-2xl border border-emerald-500/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary/70 focus:outline-none transition"
              />

              {errors.firstName && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}

            <div>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="w-full rounded-2xl border border-emerald-500/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary/70 focus:outline-none transition"
              />

              {errors.lastName && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full rounded-2xl border border-emerald-500/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary/70 focus:outline-none transition"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}

            <div>
              <input
                {...register("phone")}
                placeholder="Phone"
                className="w-full rounded-2xl border border-emerald-500/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary/70 focus:outline-none transition"
              />

              {errors.phone && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Country */}

            <div>
              <input
                {...register("country")}
                placeholder="Country"
                className="w-full rounded-2xl border border-emerald-500/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary/70 focus:outline-none transition"
              />

              {errors.country && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* City */}

            <div>
              <input
                {...register("city")}
                placeholder="City"
                className="w-full rounded-2xl border border-emerald-500/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary/70 focus:outline-none transition"
              />

              {errors.city && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Address */}

            <div className="md:col-span-2">
              <input
                {...register("address")}
                placeholder="Address"
                className="w-full rounded-2xl border border-emerald-500/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary/70 focus:outline-none transition"
              />

              {errors.address && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}

        <div className="h-fit rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">Order Summary</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent pr-2">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex justify-between text-sm text-white/80"
              >
                <span>
                  {item.name}
                  {item.quantity > 1 && ` × ${item.quantity}`}
                </span>

                <span className="font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="my-6 border-t border-emerald-500/20" />

          <div className="mb-6 flex justify-between text-lg font-bold">
            <span className="text-white">Subtotal</span>

            <span className="text-primary">${subtotal.toFixed(2)}</span>
          </div>

          <button
            aria-label="submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl cursor-pointer bg-primary text-black font-bold py-4 transition hover:bg-primary/70 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-emerald-500/40 active:scale-95"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </main>
  );
}
