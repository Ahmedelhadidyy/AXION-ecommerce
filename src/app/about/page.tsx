import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}

      <section className="px-6 py-32 text-center">
        <span className="text-primary text-2xl font-semibold uppercase tracking-[0.3em]">
          About AXION
        </span>

        {/* Hero Image */}

        <div className="relative mx-auto mt-10 w-full max-w-7xl overflow-hidden rounded-[32px]">
          <Image
            src="/images/about1.jpg"
            alt="AXION Athlete"
            width={1920}
            height={1080}
            priority
            className="
              h-auto
              w-full
              rounded-[32px]
              object-contain
            "
          />
        </div>

        <h1 className="mt-12 text-5xl font-bold md:text-7xl">
          Premium Sportswear
          <br />
          Built For Performance.
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-white/60">
          Engineered for athletes. Designed for confidence. Created to push
          limits.
        </p>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-md text-primary/50 font-bold">
          The goal is not to be better than others.
          <br />
          The goal is to be better than yesterday.
        </p>
      </div>

      {/* Story */}

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="text-center">
          <span className="text-primary uppercase tracking-[0.3em] font-semibold">
            Our Story
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold">
            More Than Sportswear.
            <br />A Mindset.
          </h2>
        </div>

        <div className="mt-14 space-y-8 text-lg leading-relaxed text-white/70">
          <p>
            AXION started from a simple belief: greatness is built through
            consistency.
          </p>

          <p>
            Every athlete knows the feeling. The early mornings. The extra rep
            when nobody is watching. The discipline to keep moving forward, even
            when motivation disappears.
          </p>

          <p>
            We realized that performance is not only about physical strength. It
            is about mindset. It is about showing up every day and doing the
            work.
          </p>

          <p>
            That is why AXION was created. Not just to make sportswear, but to
            create products that support the people who refuse to settle for
            average.
          </p>

          <p>
            Every fabric, every fit, and every detail is designed with one
            purpose: helping athletes move better, train harder, and feel
            confident in every step of their journey.
          </p>

          <p>
            Whether you are stepping into the gym for the first time or chasing
            your next personal best, AXION stands for progress, discipline, and
            relentless self-improvement.
          </p>

          <p className="text-xl font-semibold text-white">
            Because success is not given. It is earned.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-md text-primary/50 font-bold">
          Greatness is built through consistency.
        </p>
      </div>

      {/* Mission */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold">Performance</h3>

            <p className="mt-4 text-white/60">
              Products engineered for movement.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold">Comfort</h3>

            <p className="mt-4 text-white/60">
              Premium materials for everyday wear.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold">Confidence</h3>

            <p className="mt-4 text-white/60">Look good. Train harder.</p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-md text-primary/50 font-bold">
          Progress, discipline, and relentless self-improvement.
        </p>
      </div>

      {/* Banner */}

      <section className="relative overflow-hidden">
        <Image
          src="/images/about2.jpg"
          alt="Train Hard Stay Ready"
          width={1920}
          height={1080}
          className="
            h-auto
            w-full
            object-cover
          "
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-center text-5xl font-bold md:text-7xl">
            Train Hard.
            <br />
            Stay Ready.
          </h2>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-[32px] border border-white/10 bg-white/3 p-10 md:p-14">
          <span className="text-primary uppercase tracking-[0.3em] font-semibold">
            Our Mission
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Built For Those Who Never Stop Improving.
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-white/70">
            AXION exists for people who understand that growth is a lifelong
            process.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            We are inspired by athletes, creators, entrepreneurs, and everyday
            individuals who push beyond their limits.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Our mission is to create premium sportswear that performs under
            pressure while carrying a message bigger than fitness itself: become
            stronger than you were yesterday.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            The journey never ends. Neither do we.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-md text-primary/50 font-bold">
          Success is not given.
          <br />
          It is earned.
        </p>
      </div>
      {/* CTA */}

      <section className="px-6 py-28 text-center">
        <h2 className="text-5xl font-bold">
          Ready To Upgrade
          <br />
          Your Training Gear?
        </h2>

        <Link
          href="/shop"
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
            hover:bg-primary/80
          "
        >
          Shop Collection
        </Link>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-md text-primary/50 font-bold">
          The journey never ends.
          <br />
          Neither do we.
        </p>
      </div>
    </main>
  );
}
