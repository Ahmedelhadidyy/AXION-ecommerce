"use client";

import Link from "next/link";
import { Menu, X, Heart, ShoppingBag, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

const navigationLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Men Collection",
    href: "/shop?category=men",
  },
  {
    name: "Women Collection",
    href: "/shop?category=women",
  },
  {
    name: "Equipment",
    href: "/shop?category=equipment",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const wishlistCount = useWishlistStore((state) => state.items.length);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const handleSearch = () => {
    sessionStorage.setItem("focusSearch", "true");
    router.push("/shop");
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        aria-label="openMenu"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer transition-colors hover:text-primary p-2"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16.25 bg-black/40 backdrop-blur-2xl z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="absolute top-16.25 left-0 right-0 bg-black/95 border-b border-primary/20 backdrop-blur-3xl z-50 max-h-[calc(100vh-65px)] overflow-y-auto animate-in fade-in dialog-scroll slide-in-from-top-2 duration-300">
          {/* Action Icons (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-4 border-b border-primary/20 px-6 py-4">
            {/* Search */}
            <button
              aria-label="search"
              onClick={handleSearch}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/15 transition text-primary"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/15 transition text-primary"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/15 transition text-primary ml-auto"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col px-6 py-6 gap-2">
            {navigationLinks.map((link) => (
              <button
                aria-label="linkName"
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="text-left rounded-lg px-4 py-3 text-lg font-medium text-white/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 active:scale-95"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-primary/20 px-6 py-6 flex flex-col gap-3">
            {/* User Account (Placeholder) */}
            <button
              aria-label="signIn"
              className="w-full rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/15 px-4 py-3 font-semibold text-white transition-all duration-300 active:scale-95"
            >
              Sign In
            </button>

            {/* CTA */}
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-lg bg-primary text-black px-4 py-3 font-bold transition-all duration-300 hover:bg-primary/70 active:scale-95 text-center"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
