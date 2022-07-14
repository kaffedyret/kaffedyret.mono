import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";

export type PendingRoast = {
  name: string;
  quantity: number;
};

export const getPendingRoasts = (
  orders?: Order[],
  orderStatuses?: OrderStatus[]
): PendingRoast[] | null =>
  orders && orderStatuses
    ? Object.values(
        orders
          // Filter out all orders that does not have status = "Ordered"
          .filter((o) => o.status.name === orderStatuses[0].name)
          // We only care about line items
          .map((o) => o.lineItems)
          // Move arrays one level up
          .flat()
          // Transform from array to object
          .reduce<Record<string, PendingRoast>>(
            (total, o) =>
              o?.description && o?.quantity
                ? {
                    ...total,
                    [o.description]: {
                      name: o.description,
                      quantity: total[o.description]
                        ? (total[o.description].quantity += o.quantity)
                        : o.quantity,
                    },
                  }
                : total,
            {}
          )
      )
    : null;
