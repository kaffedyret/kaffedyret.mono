import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "~/lib/sanity/sanityClient";

/*
 * This function updates the status of multiple orders.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res
      .status(400)
      .json({ message: `${req.method} method is not allowed.` });
  }

  const {
    orderIds: orderIdsString,
    statusId,
  }: { orderIds: string; statusId: string } = req.body;

  const orderIds: string[] = JSON.parse(orderIdsString);

  if (!orderIds || orderIds.length === 0 || !statusId) {
    return res.status(400).json({ message: "Missing body." });
  }

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
