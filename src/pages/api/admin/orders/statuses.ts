import sanity from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "~/lib/sanity/config";

/*
 * This function updates the status of multiple orders.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res
      .status(400)
      .json({ message: `${req.method} method is not allowed.` });
  }

  const orders: Array<{ orderId: string; statusId: string }> = req.body;

  if (!orders || orders.length === 0) {
    return res.status(400).json({ message: "Missing body." });
  }

  const sanityClient = sanity({
    ...config,
    token:
      (req.headers["authorization"] || process.env.SANITY_RETOOL_API_TOKEN) ??
      "",
  });

  try {
    const patchedOrders = await sanityClient.mutate(
      orders.map((order) => ({
        patch: {
          id: order.orderId,
          set: { status: { _ref: order.statusId } },
        },
      }))
    );

    return res.status(200).json(patchedOrders);
  } catch (error) {
    console.log("Error when fetching order statuses.", error);
    return res.status(500).json({
      message: "Error when fetching order statuses.",
      error,
    });
  }
};
