import { useState } from "react";
import { OrderStatus } from "~/models/schema.sanity";

export const useOrderStatusTabs = (orderStatuses?: OrderStatus[]) => {
  const [activeTab, setActiveTab] = useState<string | null>(
    orderStatuses ? orderStatuses[0].name : null
  );

  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

  return { activeTab, handleTabClick };
};
