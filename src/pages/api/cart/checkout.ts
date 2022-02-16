import type { NextApiRequest, NextApiResponse } from "next";
import { validateCartItems } from "use-shopping-cart/utilities/serverless";
import stripe from "~/lib/stripe";
import { getAllInventory } from "~/lib/stripe/product";

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

  const cartProducts = req.body;
  const inventory = await getAllInventory();

  let line_items;
  try {
    line_items = validateCartItems(inventory, cartProducts);
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
      success_url: process.env.STRIPE_SUCCESS_URL || "",
      cancel_url: process.env.STRIPE_CANCEL_URL || "",
      line_items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "While communicating with Stripe, we encountered an error.",
      error
    });
  }

  if (!session.url) {
    return res.status(500).json({
      message: "While communicating with Stripe, we encountered an error.",
    });
  }

  return res.status(200).json({ sessionId: session.id });
};
