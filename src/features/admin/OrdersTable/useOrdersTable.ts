import { useState } from "react";
import { Order } from "~/models/Order";

export const useOrdersTable = (
  activeTabId: string | null,
  orders?: Order[]
) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const resetSelectedRows = () => {
    setSelectedRows([]);
  };

  const handleToggleRow = (id: string): void => {
    setSelectedRows((state) =>
      state.includes(id)
        ? // If row is already selected, filter it out
          state.filter((selctedId) => selctedId !== id)
        : // If row is not selected, add it to the state
          [...state, id]
    );
  };

  const filteredOrders = orders?.filter(
    (order) => order.status._id === activeTabId
  );
  return {
    filteredOrders,
    selectedRows,
    toggleRow: handleToggleRow,
    resetSelectedRows,
  };
};
