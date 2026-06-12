import Image from "next/image";
import Link from "next/link";

import Container from "../Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Image src="/logo1.png" alt="AXION Logo" width={40} height={40} />

              <Image src="/logo3.png" alt="AXION" width={100} height={40} />
            </div>

            <p className="max-w-xs text-white/60">
              Premium sportswear and fitness equipment built for athletes who
              demand performance, comfort, and confidence.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-lg text-primary font-bold">Quick Links</h3>

            <ul className="space-y-3 text-white/60">
              <li>
                <Link href="/" className="transition hover:text-primary">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/shop" className="transition hover:text-primary">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-primary">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}

          <div>
            <h3 className="mb-5 text-lg text-primary font-bold">Categories</h3>

            <ul className="space-y-3 text-white/60">
              <li>
                <Link
                  href="/shop?category=men"
                  className="transition hover:text-primary"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=women"
                  className="transition hover:text-primary"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=equipment"
                  className="transition hover:text-primary"
                >
                  Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-lg text-primary font-bold">Contact</h3>

            <ul className="space-y-3 text-white/60">
              <li>support@axion.com</li>

              <li>Cairo, Egypt</li>

              <li>+20 100 000 0000</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} AXION. All Rights Reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>

            <Link href="/terms-of-service" className="hover:text-primary">
              Terms Of Service
            </Link>
            <Link href="/shipping-policy" className="hover:text-primary">
              Shipping Policy
            </Link>

            <Link href="/returns" className="hover:text-primary">
              Returns & Refunds
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
