import Stripe from "stripe";
import { formatCurrencyString } from "use-shopping-cart";
import { priceConfig } from "~/lib/stripe/config";
import { DeliveryEstimate } from "./DeliveryEstimate";

interface Props {
  shippingRate: Stripe.ShippingRate;
}

export function ShippingRateLabel({ shippingRate }: Props) {
  return (
    <div className="grid grid-cols-shipping-rate-label">
      <span>{shippingRate.display_name}</span>
      <span className="font-bold">
        {shippingRate.fixed_amount
          ? formatCurrencyString({
              value: shippingRate.fixed_amount?.amount,
              ...priceConfig,
            })
          : "Ingen pris funnet"}
      </span>

      <div className="prose prose-sm">
        {shippingRate.delivery_estimate && (
          <DeliveryEstimate deliveryEstimate={shippingRate.delivery_estimate} />
        )}
      </div>
    </div>
  );
}
