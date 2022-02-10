import { Product, ProductVariant } from "~/models/schema.sanity";

export const getAllVariantsFromProduct = (product: Product): ProductVariant[] =>
  [product.defaultProductVariant].concat(product.variants || []);
