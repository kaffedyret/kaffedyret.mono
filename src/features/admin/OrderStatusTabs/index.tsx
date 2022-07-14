import { VerticalTab } from "~/components/VerticalTab";
import { Order } from "~/models/Order";
import {  OrderStatus } from "~/models/schema.sanity";

type Props = {
  activeTabId: string | null;
  handleTabClick: (id: string) => void;
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const OrderStatusTabs = ({
  activeTabId,
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
          id={orderStatus._id}
          isActive={activeTabId == orderStatus._id}
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
