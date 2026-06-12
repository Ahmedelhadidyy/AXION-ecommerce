import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SizeGuide from "@/components/products/SizeGuide";
import { menProducts } from "@/data/products/men";
import { womenProducts } from "@/data/products/women";
import { equipment } from "@/data/products/equipment";
import TrackRecentlyViewed from "@/components/products/TrackRecentlyViewed";
import RecentlyViewed from "@/components/products/RecentlyViewed";
import ProductCard from "@/components/products/ProductCard";
import ProductActions from "@/components/products/ProductActions";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const allProducts = [...menProducts, ...womenProducts, ...equipment];

  const product = allProducts.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,

    description: product.shortDescription,

    openGraph: {
      title: product.name,

      description: product.shortDescription,

      images: [
        {
          url: product.image,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: product.name,

      description: product.shortDescription,

      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const allProducts = [...menProducts, ...womenProducts, ...equipment];

  const product = allProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-20">
      <TrackRecentlyViewed product={product} />
      {/* Breadcrumb */}

      <div className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/">Home</Link>

        <span>/</span>

        <Link href="/shop">Shop</Link>

        <span>/</span>

        <span className="text-white">{product.name}</span>
      </div>

      {/* Product */}

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}

        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="h-full flex items-center justify-center">
          <div className=" h-full flex flex-col items-start justify-between">
            <span className=" mb-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xl font-semibold text-primary backdrop-blur-xl ">
              {product.category}
            </span>

            <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

            <p className="mt-5 text-3xl font-bold">${product.price}</p>

            <p className="mt-8 leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <div className="mt-10 flex gap-4">
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </div>

      <SizeGuide />

      {/* Related Products */}

      <section className="mt-24">
        <h2 className="mb-10 text-3xl font-bold">Related Products</h2>

        <div
          className="
          grid
          gap-8
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          "
        >
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
      <RecentlyViewed currentProductId={product.id} />
    </main>
  );
}
