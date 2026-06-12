export type Product = {
  id: number;
  name: string;
  slug: string;
  category: "men" | "women" | "equipment";
  subcategory: "bag" | "cap" | "dumbbells" | "exercise ball";
  price: number;
  image: string;
  sizes?: string[];
  description: string;
  featured?: boolean;
  inStock?: boolean;
};