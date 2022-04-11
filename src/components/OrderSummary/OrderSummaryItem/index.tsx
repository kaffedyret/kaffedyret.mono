import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import Stripe from "stripe";
import { formatCurrencyString } from "use-shopping-cart";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";
import { priceConfig } from "~/lib/stripe/config";

interface Props {
  lineItem: Stripe.LineItem;
}

export function OrderSummaryItem({ lineItem }: Props) {
  return lineItem ? (
    <div className="grid grid-template-areas-order-summary-item items-center gap-x-4 first:border-t border-b border-neutral-200 not-prose">
      <div style={{ gridArea: "title" }}>
        <p>{lineItem.description}</p>
      </div>

      <div className="text-right" style={{ gridArea: "amount" }}>
        <p>{lineItem.quantity} stk.</p>
      </div>

      <div style={{ gridArea: "price" }}>
        <p className="">
          {formatCurrencyString({
            value: lineItem.amount_total,
            ...priceConfig,
          })}
        </p>
      </div>
    </div>
  ) : null;
}
