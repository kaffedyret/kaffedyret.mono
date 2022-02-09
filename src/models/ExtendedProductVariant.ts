import urlFor from "~/lib/sanity/urlFor";
import { ProductVariant } from "./schema.sanity";

export interface ExtendedVariant extends ProductVariant {
  cartImageSrc?: string;
}

export const createExtendedVariantFromVariant = (
  variant: ProductVariant
): ExtendedVariant => {
  let cartImageSrc;

  if (variant.images && variant.images[0]) {
    cartImageSrc = urlFor(variant.images[0]).width(320).url();
  }

  return {
    ...variant,
    cartImageSrc,
  };
};
