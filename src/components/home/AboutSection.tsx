import Link from "next/link";

import Container from "../layout/Container";

export default function AboutSection() {
  return (
    <section className="py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-primary font-semibold uppercase tracking-[0.3em]">
            About AXION
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold">
            Built For Athletes.
            <br />
            Designed For Everyday Performance.
          </h2>

          <p className="mt-8 text-lg text-white/60 leading-relaxed">
            At AXION, we believe performance starts with confidence.
            Every piece is designed to help you move better, train
            harder, and look sharper both inside and outside the gym.
          </p>

          <Link
            href="/about"
            className="
            mt-10
            inline-flex
            rounded-full
            bg-primary
            px-8
            py-4
            font-bold
            text-black
            transition
            hover:scale-105
          "
          >
            Learn More
          </Link>
        </div>
      </Container>
    </section>
  );
}