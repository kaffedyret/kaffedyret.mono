import Stripe from "stripe";

export const filterShippingRates = (
  shippingRates: Stripe.ShippingRate[],
  cartCount: number
): Stripe.ShippingRate[] => {
  return (
    shippingRates
      // Filtering out inactive shipping rates
      .filter((s) => s.active)
      // Filtering out shipping rates with unmet conditions
      .filter((s) => {
        if (s.metadata.maxProducts) {
          return cartCount <= Number(s.metadata.maxProducts);
        } else if (s.metadata.minProducts) {
          return cartCount >= Number(s.metadata.minProducts);
        }
        return true;
      })
  );
};
