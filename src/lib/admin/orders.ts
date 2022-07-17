import { SanityDocument } from "@sanity/client";
import { Order } from "~/models/schema.sanity";
import sanityClient from "../sanity/sanityClient";

/*
 * This function updates the status of multiple orders.
 */
export const updateOrderStatus = async (
  orderIds: string[],
  statusId: string
): Promise<SanityDocument<Order>> => {
  try {
    // TODO: This doesn't work because sanityClient uses an environment variable
    // only accessible by server. And we don't want to expose it to the client.
    const patchedOrders = await sanityClient.mutate<Order>(
      orderIds.map((orderId) => ({
        patch: {
          id: orderId,
          set: { status: { _ref: statusId } },
        },
      }))
    );

    return patchedOrders;
  } catch (error) {
    throw new Error("Error updating order statuses.", {
      cause: error as Error,
    });
  }
};
