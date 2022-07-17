import { SanityDocument } from "@sanity/client";
import { Order } from "~/models/schema.sanity";

/*
 * This function updates the status of multiple orders.
 */
export const updateOrderStatus = async (
  orderIds: string[],
  statusId: string
): Promise<SanityDocument<Order>> => {
  try {
    const body = new URLSearchParams();
    body.append("statusId", statusId);
    body.append("orderIds", JSON.stringify(orderIds));

    const patchedOrders = await fetch("/api/admin/orders/statuses", {
      method: "PATCH",
      body,
    }).then((res) => res.json());

    return patchedOrders;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating order statuses.");
  }
};
