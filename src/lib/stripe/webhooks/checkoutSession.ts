import Stripe from "stripe";
import sanityClient from "~/lib/sanity/sanityClient";
import { Order } from "~/models/Order";
import stripe from "..";
import { orderFromSession } from "../orderFromSession";

export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  try {
    const object = event.data.object as Stripe.Checkout.Session;
    const session = await stripe.checkout.sessions.retrieve(object.id, {
      expand: ["customer", "line_items"],
    });

    const order = await orderFromSession(session);
    await sanityClient.createIfNotExists<Order>(order);
  } catch (err) {
    console.log(err);
  }
};
