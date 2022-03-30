import Stripe from "stripe";
import { OrderSummaryItem } from "./OrderSummaryItem";
import { OrderSummaryTotal } from "./OrderSummaryTotal";

interface Props {
  lineItems?: Stripe.LineItem[];
  session?: Stripe.Checkout.Session;
}

export function OrderSummary({ lineItems, session }: Props) {
  return session && lineItems && lineItems.length > 0 ? (
    <div>
      {lineItems.map((li) => (
        <OrderSummaryItem lineItem={li} key={li.id} />
      ))}

      <OrderSummaryTotal amount={session.amount_total} />
    </div>
  ) : null;
}
