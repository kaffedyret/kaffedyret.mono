import Stripe from "stripe";
import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";
import stripe from ".";
import { orderStatusesQuery } from "../sanity/queries";
import sanityClient from "../sanity/sanityClient";

export const orderFromSession = async (
  session: Stripe.Checkout.Session
): Promise<Order> => {
  const orderStatuses = await sanityClient.fetch<OrderStatus[]>(
    orderStatusesQuery
  );

  if (!session.shipping_rate) {
    throw new Error("Missing shipping rate.");
  }

  const customer =
    typeof session.customer === "object" ? session.customer : null;
  const customerId = customer ? customer.id : customer;
  const customerName =
    customer && !customer.deleted
      ? customer.name || customer.shipping?.name || session.shipping?.name
      : null;
  const customerEmail = customer && !customer.deleted ? customer.email : null;
  const now = new Date().toISOString();
  const shippingRateId =
    typeof session.shipping_rate === "object"
      ? session.shipping_rate.id
      : session.shipping_rate;

  const shippingRate = await stripe.shippingRates.retrieve(shippingRateId);

  return {
    _id: session.id,
    _type: "order",
    sessionId: session.id,
    customerId: customerId || undefined,
    customerName: customerName || undefined,
    customerEmail: customerEmail || undefined,
    shipping: {
      name: customerName || undefined,
      shippingRate: {
        id: shippingRate.id,
        displayName: shippingRate.display_name || undefined,
      },
      address: {
        line1: session.shipping?.address?.line1 || undefined,
        line2: session.shipping?.address?.line2 || undefined,
        postalCode: session.shipping?.address?.postal_code || undefined,
        city: session.shipping?.address?.city || undefined,
        state: session.shipping?.address?.state || undefined,
        country: session.shipping?.address?.country || undefined,
      },
    },
    status: {
      _ref: orderStatuses[0]._id,
    },
    amountSubtotal: session.amount_subtotal || 0,
    amountTotal: session.amount_total || 0,
    orderDatetime: now,
    lineItems: session.line_items
      ? session.line_items.data.map((li) => ({
          _key: li.id,
          id: li.id,
          description: li.description,
          amountTotal: li.amount_total,
          quantity: li.quantity || undefined,
        }))
      : undefined,
  };
};
