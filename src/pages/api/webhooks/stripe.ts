import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "~/lib/stripe";
import { buffer } from "micro";
import { handleCheckoutSessionCompleted } from "~/lib/stripe/webhooks/checkoutSession";

export const config = { api: { bodyParser: false } };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ message: `${req.method} method is not allowed.` });
  }

  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

  if (!signature || !signingSecret) {
    console.log("Missing Stripe signature or signing secret");
    return res
      .status(400)
      .json({ message: "Missing Stripe signature or signing secret" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer.toString(),
      signature,
      signingSecret
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${(err as Error).message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }

  return res.status(200).json({ received: true });
};
