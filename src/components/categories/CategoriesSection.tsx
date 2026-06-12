import Container from "../layout/Container";
import CategoryCard from "./CategoryCard";

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-24">
      <Container>
        {/* Heading */}

        <div className="mb-14 text-center">
          <span
            className="
            text-2xl
            font-semibold
            uppercase
            tracking-[0.3em]
            text-primary
            "
          >
            Collections
          </span>

          <h2
            className="
            mt-4
            text-2xl
            font-bold
            text-white
            md:text-5xl
            "
          >
            Shop By Category
          </h2>

          <p
            className="
            mx-auto
            mt-4
            max-w-2xl
            text-white/60
            "
          >
            Premium sportswear and fitness equipment designed for athletes who
            demand more.
          </p>
        </div>

        {/* Grid */}

        <div
          className="
          grid
          grid-cols-1
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
          "
        >
          <CategoryCard
            title="MEN"
            subtitle="Built For Strength"
            image="/images/men4.jpg"
            href="/shop?category=men"
          />

          <CategoryCard
            title="WOMEN"
            subtitle="Move Without Limits"
            image="/images/women4.jpg"
            href="/shop?category=women"
          />

          <CategoryCard
            title="EQUIPMENT"
            subtitle="Train Like A Pro"
            image="/images/equipment4.jpg"
            href="/shop?category=equipment"
          />
        </div>
      </Container>
    </section>
  );
}
