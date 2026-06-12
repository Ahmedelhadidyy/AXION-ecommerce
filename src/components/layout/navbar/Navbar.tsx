"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

import { Search, ShoppingBag, User } from "lucide-react";

import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import CategoriesDropdown from "./CategoriesDropdown";

import Container from "../Container";
import { useRouter } from "next/navigation";
import CartDrawer from "@/components/cart/CartDrawer";

import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);

  const wishlistCount = useWishlistStore((state) => state.items.length);
  const router = useRouter();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-3xl">
      <Container>
        <div
          style={{
            height: "65px",
            padding: "0 20px",
          }}
          className="flex items-center justify-between"
        >
          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo1.png"
              alt="AXION Logo"
              width={40}
              height={40}
              priority
            />

            <Image
              src="/logo3.png"
              alt="AXION Logo"
              width={100}
              height={100}
              priority
            />
          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-4 md:flex">
            <NavLink
              href="/"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-primary"
            >
              Home
            </NavLink>

            <NavLink
              href="/shop"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-primary"
            >
              Shop
            </NavLink>

            <CategoriesDropdown className="cursor-pointer rounded-full text-lg font-medium text-white/80 transition-all duration-300 hover:bg-white/5 hover:text-primary" />

            <NavLink
              href="/about"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-primary"
            >
              About
            </NavLink>

            <NavLink
              href="/contact"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-primary"
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Side */}

          <div className="hidden items-center gap-5 md:flex">
            <button
              aria-label="search"
              onClick={() => {
                sessionStorage.setItem("focusSearch", "true");

                router.push("/shop");
              }}
              className="cursor-pointer transition-colors hover:text-primary"
            >
              <Search size={20} />
            </button>
            <Link
              href="/wishlist"
              className="relative cursor-pointer transition-colors hover:text-primary"
            >
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span
                  className="
      absolute
      -right-2
      -top-2
      flex
      h-5
      min-w-5
      items-center
      justify-center
      rounded-full
      bg-primary
      px-1
      text-[10px]
      font-bold
      text-black
      "
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              aria-label="cart"
              onClick={() => setCartOpen(true)}
              className="relative cursor-pointer transition-colors hover:text-primary"
            >
              <ShoppingBag size={20} />

              {totalItems > 0 && (
                <span
                  className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  px-1
                  text-[10px]
                  font-bold
                  text-black
                "
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              aria-label="signIn"
              className="cursor-pointer transition-colors hover:text-primary"
            >
              <User size={20} />
            </button>
          </div>

          <MobileMenu />
        </div>
      </Container>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
