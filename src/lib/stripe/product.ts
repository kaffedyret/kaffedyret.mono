import { Product as StripeProduct } from "use-shopping-cart/core";
import { Product as SanityProduct } from "~/models/schema.sanity";
import stripe from ".";
import { getAllVariantsFromProduct } from "../product";
import { productsQuery } from "../sanity/queries";
import sanityClient from "../sanity/sanityClient";
import urlFor from "../sanity/urlFor";

/**
 * This helper will fetch all products from Sanity, and prices and products from Stripe.
 * Then it will map everything over to the preferred format of Stripe.
 *
 * @returns Promise<StripeProduct[]>
 */
export const getAllInventory = async (): Promise<StripeProduct[]> => {
  const [sanityProducts, { data: stripePrices }, { data: stripeProducts }] =
    await Promise.all([
      sanityClient.fetch<SanityProduct[]>(productsQuery),
      stripe.prices.list(),
      stripe.products.list(),
    ]);
  const allVariants = sanityProducts.map(getAllVariantsFromProduct).flat();

  const inventory: Array<StripeProduct | undefined> = allVariants.map(
    (variant) => {
      const sanityProduct = sanityProducts.find((p) =>
        getAllVariantsFromProduct(p)
          .map((v) => v.sku)
          .includes(variant.sku)
      );

      if (!sanityProduct) return;

      const stripePrice = stripePrices.find(
        (p) => p.id === variant.stripePriceId
      );
      if (!stripePrice) return;

      const stripeProduct = stripeProducts.find(
        (p) => p.id === sanityProduct.stripeProductId
      );
      if (!stripeProduct) return;

      return {
        id: variant.sku,
        name: `${sanityProduct.title} - ${variant.title}`,
        price: stripePrice.unit_amount as number,
        currency: stripePrice.currency,
        image: urlFor(variant.image).width(56).height(56).url(),
        price_data: {
          currency: stripePrice.currency,
          unit_amount: stripePrice.unit_amount,
        },
      };
    }
  );

  return inventory.filter((i) => i) as StripeProduct[]; // lol TypeScript
};
