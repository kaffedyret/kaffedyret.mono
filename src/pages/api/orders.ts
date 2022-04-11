import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "~/models/schema.sanity";
import sanity from "@sanity/client";
import { config } from "~/lib/sanity/config";
import { ordersQuery } from "~/lib/sanity/queries";

/*
 * This function fetches all orders.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res
      .status(400)
      .json({ message: `${req.method} method is not allowed.` });
  }

  const sanityClient = sanity({
    ...config,
    token: req.headers["authorization"] ?? "",
  });

  try {
    const orders = await sanityClient.fetch<Order>(ordersQuery);
    return res.status(200).json(orders);
  } catch (err) {
    console.log("Error when fetching orders.", err);
    return res.status(403).json({ message: "You do not have permissions." });
  }
};
