import sanity from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "~/lib/sanity/config";
import { ordersQuery } from "~/lib/sanity/queries";
import { Order } from "~/models/schema.sanity";

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
    token:
      (req.headers["authorization"] || process.env.SANITY_RETOOL_API_TOKEN) ??
      "",
  });

  try {
    const orders = await sanityClient.fetch<Order>(ordersQuery);
    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error when fetching orders.", error);
    return res.status(500).json({
      message: "Error when fetching orders.",
      error,
    });
  }
};
