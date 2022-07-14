import { VerticalTab } from "~/components/VerticalTab";
import { Order } from "~/models/Order";
import {  OrderStatus } from "~/models/schema.sanity";

type Props = {
  activeTab: string | null;
  handleTabClick: (label: string) => void;
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const OrderStatusTabs = ({
  activeTab,
  handleTabClick,
  orderStatuses,
  orders,
}: Props) => {
  return orderStatuses ? (
    <>
      {orderStatuses.map((orderStatus) => (
        <VerticalTab
          badge={
            orders?.filter((o) => o.status.name === orderStatus.name).length ||
            null
          }
          isActive={activeTab == orderStatus._id}
          label={orderStatus.name}
          onClick={handleTabClick}
          key={orderStatus._id}
        />
      ))}
    </>
  ) : (
    <p>Her var det tomt, gitt</p>
  );
};

export default OrderStatusTabs;
