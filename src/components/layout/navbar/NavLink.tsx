"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        transition-all
        duration-300
        ${isActive ? "text-primary" : "text-white/80 hover:text-primary"}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
