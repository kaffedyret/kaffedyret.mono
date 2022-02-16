import { useState } from "react";
import Stripe from "stripe";
import { Product, ProductVariant } from "~/models/schema.sanity";

const useVariantSelect = (
  product: Product,
  allVariants: ProductVariant[],
  prices: Stripe.Price[]
) => {
  const [currentSku, setSku] = useState<string>(
    product.defaultProductVariant.sku
  );
  const currentVariant =
    allVariants.find((v) => v.sku === currentSku) ||
    product.defaultProductVariant;
  const currentPrice = prices.find(
    (p) => p.id === currentVariant.stripePriceId
  );

  return { currentSku, setSku, currentVariant, currentPrice };
};

export default useVariantSelect;
