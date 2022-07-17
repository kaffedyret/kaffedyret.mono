import sanity from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "~/lib/sanity/config";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { verifyUser } from "~/lib/admin/google";
import { User } from "~/models/schema.sanity";
import { userQuery } from "~/lib/sanity/queries";

/*
 * This function updates the status of multiple orders.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(400).json({ message: "Missing session." });
  }

  const verified = await verifyUser(session);
  if (!verified) {
    return res.status(400).json({ message: "User not verified." });
  }
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

  const sanityClient = sanity({
    ...config,
    token:
      (req.headers["authorization"] || process.env.SANITY_RETOOL_API_TOKEN) ??
      "",
  });

  const user = await sanityClient.fetch<User>(userQuery, {
    email: session.user?.email,
  });
  if (!user.admin) {
    return res
      .status(400)
      .json({ message: "You do not have administrative rights." });
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
