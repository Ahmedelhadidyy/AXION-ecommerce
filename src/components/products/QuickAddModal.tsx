"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Check, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type QuickAddModalProps = {
  product: {
    id: string | number;
    name: string;
    image: string;
    price: number;
    category: string;
    sizes?: string[];
  };
};

type SelectedItem = {
  size: string;
  quantity: number;
};

export default function QuickAddModal({ product }: QuickAddModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [showToast, setShowToast] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const isEquipment = product.category.toLowerCase() === "equipment";
  const hasSizes = !isEquipment;

  const handleSave = () => {
    if (hasSizes && !selectedSize) return;

    const size = selectedSize || "Default";

    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.size === size);

      if (exists) {
        return prev.map((item) =>
          item.size === size
            ? {
                ...item,
                quantity,
              }
            : item,
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
    setSelectedItems((prev) => prev.filter((item) => item.size !== size));
  };

  const showSuccessToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    // Equipment products
    if (isEquipment) {
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

    // Products with sizes
    selectedItems.forEach((item) => {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: item.size,
        quantity: item.quantity,
      });
    });

    setSelectedItems([]);
    setSelectedSize("");
    setQuantity(1);
    showSuccessToast();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 font-semibold text-primary transition hover:bg-emerald-500/20 cursor-pointer">
          Quick Add
        </button>
      </DialogTrigger>

      <DialogContent
        style={{ padding: "30px 10px 30px 20px" }}
        className="max-w-4xl rounded-[32px] border border-white/10 bg-black/90 backdrop-blur-3xl dialog-scroll"
      >
        <DialogTitle className="text-white">{product.name}</DialogTitle>

        <DialogDescription className="text-white/60">
          Choose size and quantity
        </DialogDescription>

        <div className="grid md:grid-cols-2 gap-10 min-w-full">
          {/* Image */}
          <div
            className="relative aspect-square overflow-hidden rounded-3xl"
            style={{ margin: "20px 15px" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-6 min-w-full">
            {/* Product Info */}
            <div className="pt-4">
              <h2 className="text-3xl text-center font-bold text-white">
                {product.name}
              </h2>
              <p className="mt-2 text-2xl text-center font-bold text-primary">
                ${product.price}
              </p>
            </div>

            {/* Sizes */}
            {hasSizes && (
              <div>
                <h3 className="mb-4 text-center text-lg font-semibold text-white">
                  Select Size
                </h3>

                <div className="flex flex-wrap justify-center gap-3">
                  {product.sizes?.map((size) => (
                    <button
                      aria-label="size"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 min-w-14 rounded-lg border font-semibold transition cursor-pointer
                      ${
                        selectedSize === size
                          ? "border-emerald-500 bg-primary text-black hover:primary/70"
                          : "border-white/15 bg-white/5 text-white hover:border-emerald-500/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="min-w-full">
              <h4 className="mb-4 font-semibold text-white text-lg">
                Quantity
              </h4>

              <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                <button
                  aria-label="decrease"
                  onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                  className="text-2xl text-white hover:text-primary/70 transition font-bold cursor-pointer"
                >
                  −
                </button>

                <span className="font-bold text-white text-lg min-w-8 text-center">
                  {quantity}
                </span>

                <button
                  aria-label="increase"
                  onClick={() => setQuantity((p) => p + 1)}
                  className="text-2xl text-white hover:text-primary/70 transition font-bold cursor-pointer"
                >
                  +
                </button>

                {/* Save Button */}
                {hasSizes && (
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

            {/* Selected Options */}
            {hasSizes && (
              <div className="space-y-4 pt-6 min-w-full">
                <h3 className="text-lg font-semibold text-white">
                  Selected Options ({selectedItems.length})
                </h3>

                {selectedItems.length === 0 ? (
                  <p className="text-center text-sm text-white/50 py-6">
                    No items selected yet
                  </p>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto dialog-scroll scrollbar-thin pr-2">
                    {selectedItems.map((item) => (
                      <div
                        key={item.size}
                        className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 hover:bg-emerald-500/10 transition"
                      >
                        <div className="space-y-1">
                          <p className="text-white font-semibold">
                            Size:{" "}
                            <span className="text-primary">{item.size}</span>
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

            {/* Add to Cart Button */}
            <div className="w-full flex items-center justify-center">
              <button
                aria-label="add to cart"
                onClick={handleAddToCart}
                disabled={hasSizes && selectedItems.length === 0}
                className={`
                w-60 rounded-2xl py-4 font-bold text-lg transition flex items-center justify-center gap-2
                ${
                  hasSizes && selectedItems.length === 0
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-primary text-black hover:bg-primary/70 cursor-pointer active:scale-95"
                }
                `}
              >
                <Check className="w-5 h-5" />
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-primary text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg">
              <Check className="w-5 h-5" />
              Products added to cart successfully!
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
