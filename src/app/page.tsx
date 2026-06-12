import CategoriesSection from "@/components/categories/CategoriesSection";
import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/layout/hero/hero";
import NewsletterSection from "@/components/NewsletterSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <AboutSection />
      <NewsletterSection />
    </>
  );
}
