import type { Product, ProductVariant } from "./schema.sanity";

export interface CartItem {
  amount: number;
  slug: string;
  sku: ProductVariant["sku"];
}

export interface ExtendedCartItem extends CartItem {
  product?: Product;
  variant?: ProductVariant;
}

export type Cart = CartItem[];
