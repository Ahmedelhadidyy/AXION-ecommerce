import Link from "next/link";

import Container from "../Container";

export default function HeroSection() {
  return (
    <section
      className="
      relative
      min-h-svh

      bg-no-repeat
      bg-position-[90%_center]
      md:bg-right
      "
      style={{
        backgroundImage: "url('/images/hero2.png')",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}

      <Container>
        <div
          style={{
            minHeight: "100vh",
          }}
          className="relative z-10 flex min-h-svh items-center"
        >
          <div className="max-w-2xl">
            {/* Badge */}

            <div
              className="
              mb-6
              inline-flex
              rounded-full
              border
              border-primary/30
              bg-primary/10
              px-4
              py-2
              text-xl
              font-semibold
              text-primary
              backdrop-blur-xl
              "
            >
              Premium Sportswear Brand
            </div>

            {/* Heading */}

            <h1
              className="
              text-5xl
              font-bold
              leading-tight
              text-white
              sm:text-6xl
              lg:text-7xl
              "
            >
              Train Hard.
              <br />
              Perform Better.
            </h1>

            {/* Description */}

            <p
              className="
              mt-6
              max-w-xl
              text-lg
              leading-relaxed
              text-white/80
              "
            >
              Premium sportswear and fitness equipment
              <br />
              built for athletes who never settle.
            </p>

            {/* CTA */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="
                rounded-xl
                bg-primary
                px-7
                py-4
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-105
                "
              >
                Shop Now
              </Link>

              <Link
                href="#categories"
                className="
                rounded-xl
                border
                border-white/20
                bg-white/5
                px-7
                py-4
                font-semibold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-primary
                hover:scale-105
                hover:text-primary

                "
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
