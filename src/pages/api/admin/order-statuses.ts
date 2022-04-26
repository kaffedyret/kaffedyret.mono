import sanity from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "~/lib/sanity/config";
import { orderStatusesQuery } from "~/lib/sanity/queries";
import { Order } from "~/models/schema.sanity";

/*
 * This function fetches all order statuses.
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
    const ordersStatuses = await sanityClient.fetch<Order>(orderStatusesQuery);
    return res.status(200).json(ordersStatuses);
  } catch (error) {
    console.log("Error when fetching order statuses.", error);
    return res.status(500).json({
      message: "Error when fetching order statuses.",
      error,
    });
  }
};
