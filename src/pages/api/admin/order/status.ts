import sanity from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "~/lib/sanity/config";

/*
 * This function updates the status of an order.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res
      .status(400)
      .json({ message: `${req.method} method is not allowed.` });
  }

  const order: { orderId: string; statusId: string } = req.body;

  if (!order.orderId) {
    return res.status(400).json({ message: "Missing body." });
  }

  const sanityClient = sanity({
    ...config,
    token:
      (req.headers["authorization"] || process.env.SANITY_RETOOL_API_TOKEN) ??
      "",
  });

  try {
    const patchedOrder = await sanityClient
      .patch(order.orderId)
      .set({ status: { _ref: order.statusId } });
    return res.status(200).json(patchedOrder);
  } catch (error) {
    console.log("Error when fetching order statuses.", error);
    return res.status(500).json({
      message: "Error when fetching order statuses.",
      error,
    });
  }
};
