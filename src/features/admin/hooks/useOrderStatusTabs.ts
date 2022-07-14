import { useState } from "react";
import { OrderStatus } from "~/models/schema.sanity";

export const useOrderStatusTabs = (orderStatuses?: OrderStatus[]) => {
  const [activeTabId, setActiveTabId] = useState<string | null>(
    orderStatuses ? orderStatuses[0]._id : null
  );

  const handleTabClick = (id: string) => {
    setActiveTabId(id);
  };

  return { activeTabId, handleTabClick };
};
