import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CategoryCardProps = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export default function CategoryCard({
  title,
  subtitle,
  image,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-secondary
      "
    >
      {/* Image */}

      <div className="relative h-130 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="
          transition-transform
          duration-700
          group-hover:scale-110
          "
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/50" />

        <div
          className="
          absolute
          inset-0
          bg-linear-to-t
          from-black
          via-black/30
          to-transparent
          "
        />
      </div>

      {/* Content */}

      <div
        className="
        absolute
        inset-x-0
        bottom-0
        flex
        items-end
        justify-between
        p-8
        "
      >
        <div>
          <h3
            className="
            text-3xl
            font-bold
            tracking-wide
            text-white
            "
          >
            {title}
          </h3>

          <p className="mt-2 text-white/70">{subtitle}</p>
        </div>

        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-white/10
          backdrop-blur-md
          transition-all
          duration-300
          group-hover:border-primary
          group-hover:bg-primary
          "
        >
          <ArrowRight
            size={20}
            className="
            transition-colors
            group-hover:text-black
            "
          />
        </div>
      </div>
    </Link>
  );
}
