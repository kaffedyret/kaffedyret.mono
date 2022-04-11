import type { NextApiRequest, NextApiResponse } from "next";
import type { CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities/serverless";
import stripe from "~/lib/stripe";
import { getAllInventory } from "~/lib/stripe/product";
import { filterShippingRates } from "~/lib/stripe/shippingRate";

/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ message: `${req.method} method is not allowed.` });
  }

  if (!req.body) {
    return res.status(400).json({ message: "Missing body." });
  }

  const { cartDetails } = req.body;
  const cartCount = Object.values(cartDetails as CartDetails).reduce(
    (prev, cartDetail) => prev + cartDetail.quantity,
    0
  );

  const inventory = await getAllInventory();
  const { data } = await stripe.shippingRates.list();
  const shippingRates = filterShippingRates(data, cartCount).sort((a, b) =>
    a.fixed_amount && b.fixed_amount
      ? a.fixed_amount.amount - b.fixed_amount.amount
      : 0
  );

  let line_items;
  try {
    line_items = validateCartItems(inventory, cartDetails);
  } catch (error) {
    return res.status(422).json({
      message: "Some of the items in your cart are invalid.",
      error,
    });
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["NO"],
      },
      mode: "payment",
      success_url: process.env.STRIPE_SUCCESS_URL
        ? `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`
        : "",
      cancel_url: process.env.STRIPE_CANCEL_URL || "",
      locale: "nb",
      discounts: [], // TODO: Implement discounts
      shipping_options: shippingRates.map((s) => ({ shipping_rate: s.id })),
      line_items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "While communicating with Stripe, we encountered an error.",
      error,
    });
  }

  if (!session.url) {
    return res.status(500).json({
      message: "While communicating with Stripe, we encountered an error.",
    });
  }

  return res.status(200).json({ sessionId: session.id });
};
