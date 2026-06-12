"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Check, X } from "lucide-react";

import { tshirtGuide, shoesGuide } from "@/data/products/sizeGuideData";

type ProductActionsProps = {
  product: {
    id: number | string;
    name: string;
    image: string;
    price: number;
    category: string;
    subcategory?: string;
  };
};

type SelectedItem = {
  size: string;
  quantity: number;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [showToast, setShowToast] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const isShoe = product.subcategory?.toLowerCase() === "shoes";

  const requiresSize = product.category.toLowerCase() !== "equipment";

  const clothingSizes = tshirtGuide.map((item) => item.size);

  const shoeSizes = shoesGuide.map((item) => String(item.eu));

  const sizes = isShoe ? shoeSizes : clothingSizes;

  const handleSave = () => {
    if (requiresSize && !selectedSize) return;

    const size = selectedSize || "Default";

    setItems((prev) => {
      const exists = prev.find((i) => i.size === size);

      if (exists) {
        return prev.map((i) =>
          i.size === size
            ? {
                ...i,
                quantity,
              }
            : i,
        );
      }

      return [
        ...prev,
        {
          size,
          quantity,
        },
      ];
    });

    setSelectedSize("");
    setQuantity(1);
  };

  const handleRemove = (size: string) => {
    setItems((prev) => prev.filter((i) => i.size !== size));
  };

  const showSuccessToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    // Equipment
    if (!requiresSize) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      });

      setQuantity(1);
      showSuccessToast();
      return;
    }

    // Clothes / Shoes
    items.forEach((item) => {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: item.size,
        quantity: item.quantity,
      });
    });

    setItems([]);
    setSelectedSize("");
    setQuantity(1);
    showSuccessToast();
  };

  return (
    <div className="space-y-6 min-w-full">
      {/* ================= SIZE ================= */}

      {requiresSize && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-white text-lg">Select Size</h4>

            <a
              href="#size-guide"
              className="text-sm text-primary hover:text-primary/70 transition hover:underline"
            >
              Size Guide
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                aria-label="size"
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  h-11 min-w-11 rounded-lg border font-semibold transition
                  ${
                    selectedSize === size
                      ? "border-emerald-500 bg-primary text-black hover:bg-primary/70"
                      : "border-white/15 bg-white/5 text-white hover:border-emerald-500/50"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= QUANTITY ================= */}

      <div className="min-w-full">
        <h4 className="mb-4 font-semibold text-white text-lg">Quantity</h4>

        <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
          <button
            aria-label="decrease"
            onClick={() => setQuantity((p) => Math.max(1, p - 1))}
            className="text-2xl text-white hover:text-primary transition font-bold cursor-pointer"
          >
            −
          </button>

          <span className="font-bold text-white text-lg min-w-8 text-center">
            {quantity}
          </span>

          <button
            aria-label="increase"
            onClick={() => setQuantity((p) => p + 1)}
            className="text-2xl text-white hover:text-primary transition font-bold cursor-pointer"
          >
            +
          </button>

          {/* Save Button */}

          {requiresSize && (
            <button
              aria-label="save"
              onClick={handleSave}
              disabled={!selectedSize}
              className={`
              ml-4 px-4 py-1.5 rounded-lg font-bold transition flex items-center gap-2
              ${
                !selectedSize
                  ? "text-white/40 cursor-not-allowed"
                  : "text-primary hover:text-primary/70 hover:bg-emerald-500/10 cursor-pointer"
              }
              `}
              title="Save selection"
            >
              <Check className="w-5 h-5" />
              Save
            </button>
          )}
        </div>
      </div>

      <div className="border-t min-w-full border-white/10 pb-8" />

      {/* ================= SELECTED OPTIONS ================= */}

      {requiresSize && (
        <div className="space-y-4 pt-6 min-w-full">
          <h3 className="text-lg font-semibold text-white">
            Selected Options ({items.length})
          </h3>

          {items.length === 0 ? (
            <p className="text-center text-sm text-white/50 py-6">
              No items selected yet
            </p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto dialog-scroll scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent pr-2">
              {items.map((item) => (
                <div
                  key={item.size}
                  className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 hover:bg-emerald-500/10 transition"
                >
                  <div className="space-y-1">
                    <p className="text-white font-semibold">
                      Size: <span className="text-primary">{item.size}</span>
                    </p>

                    <p className="text-white/70 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <button
                    aria-label="close"
                    onClick={() => handleRemove(item.size)}
                    className="text-white/60 hover:text-red-400 transition p-2 rounded-2xl hover:bg-red-500/10 cursor-pointer"
                    title="Remove this option"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= ADD TO CART BUTTON ================= */}

      <div className="w-full flex items-center justify-center">
        <button
          aria-label="add to cart"
          onClick={handleAddToCart}
          disabled={requiresSize && items.length === 0}
          className={`
            w-60 rounded-2xl py-4 font-bold text-lg transition flex items-center justify-center gap-2
            ${
              requiresSize && items.length === 0
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-primary text-black hover:bg-primary/70 cursor-pointer active:scale-95"
            }
          `}
        >
          <Check className="w-5 h-5" />
          Add To Cart
        </button>
      </div>

      {/* ================= SIZE GUIDE ================= */}

      {requiresSize && (
        <div
          id="size-guide"
          className="pt-8 border-t border-white/10 space-y-4"
        >
          <h4 className="text-lg font-bold text-white">Size Guide</h4>

          <p className="text-sm text-white/70 leading-relaxed">
            XS / S / M / L / XL / XXL are standard international sizing. Shoes
            sizes are EU-based.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            <p className="text-xs text-primary font-semibold">
              💡 Tip: If between sizes, choose the larger one for a comfortable
              fit.
            </p>
          </div>
        </div>
      )}

      {/* ================= TOAST NOTIFICATION ================= */}

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg">
            <Check className="w-5 h-5" />
            Products added to cart successfully!
          </div>
        </div>
      )}
    </div>
  );
}
