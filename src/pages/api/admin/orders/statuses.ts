import sanity from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "~/lib/sanity/config";

/*
 * This function updates the status of multiple orders.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res
      .status(400)
      .json({ message: `${req.method} method is not allowed.` });
  }

  const { orderIds, statusId }: { orderIds: string[]; statusId: string } =
    req.body;

  if (!orderIds || orderIds.length === 0 || !statusId) {
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
      orderIds.map((orderId) => ({
        patch: {
          id: orderId,
          set: { status: { _ref: statusId } },
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
