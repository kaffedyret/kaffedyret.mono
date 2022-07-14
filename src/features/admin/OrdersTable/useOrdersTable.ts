import { Order } from "~/models/Order";

export const useOrdersTable = (activeTabId: string | null, orders?: Order[]) => {
  return orders?.filter((order) => order.status._id === activeTabId);
};
