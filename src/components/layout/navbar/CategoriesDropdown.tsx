"use client";

import Link from "next/link";
import { ReactNode } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type CategoriesDropdownProps = {
  className?: string;
};

const categories = [
  {
    title: "Men Collection",
    href: "/shop?category=men",
  },
  {
    title: "Women Collection",
    href: "/shop?category=women",
  },
  {
    title: "Equipment",
    href: "/shop?category=equipment",
  },
];

export default function CategoriesDropdown({
  className = "",
}: CategoriesDropdownProps): ReactNode {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div
              style={{ width: "200px", height: "200px" }}
              className="grid items-center justify-center gap-3 p-4 rounded-2xl border-white/10 bg-black/20 backdrop-blur-xl"
            >
              {categories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  style={{
                    width: "180px",
                    height: "40px",
                    paddingLeft: "10px",
                    fontSize: "1rem",
                  }}
                  className="hover:text-primary flex items-center rounded-xl hover:bg-white/5"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
