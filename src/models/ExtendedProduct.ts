import urlFor from "~/lib/sanity/urlFor";
import { Product } from "./schema.sanity";

export interface ExtendedProduct extends Product {
  cardImageSrc?: string;
}

export const createExtendedProductFromProduct = (
  product: Product
): ExtendedProduct => {
  let cardImageSrc;

  if (
    product.defaultProductVariant.images &&
    product.defaultProductVariant.images[0]
  ) {
    cardImageSrc = urlFor(product.defaultProductVariant.images[0]).width(320).url();
  }

  return {
    ...product,
    cardImageSrc,
  };
};
