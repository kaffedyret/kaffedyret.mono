import { ExtendedProduct } from "~/models/ExtendedProduct";
import {
  createExtendedVariantFromVariant,
  ExtendedVariant,
} from "~/models/ExtendedProductVariant";

export const getAllVariantsFromProduct = (
  product: ExtendedProduct
): ExtendedVariant[] =>
  [product.defaultProductVariant]
    .concat(product.variants || [])
    .map(createExtendedVariantFromVariant);
