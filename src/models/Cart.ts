import type { ProductVariant } from "./schema.sanity";

export interface CartItem {
  amount: number;
  slug: string;
  sku: ProductVariant["sku"];
}

export interface CartItemWithVariant extends CartItem {
  variant?: ProductVariant;
}

export interface Cart {
  items?: CartItem[];
}
