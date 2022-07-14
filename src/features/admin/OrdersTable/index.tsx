import { formatCurrencyString } from "use-shopping-cart/core";
import { Table, Td, Th, Tr } from "~/components/Table";
import { Order } from "~/models/Order";
import { useOrdersTable } from "./useOrdersTable";

type Props = {
  activeTabId: string | null;
  orders?: Order[];
};

const OrdersTable = ({ activeTabId, orders }: Props) => {
  const filteredOrders = useOrdersTable(activeTabId, orders);

  return filteredOrders && filteredOrders.length > 0 ? (
    <Table className="w-full">
      <thead>
        <Tr>
          <Th>Tidspunkt</Th>
          <Th>Kundenavn</Th>
          <Th>E-post</Th>
          <Th>Produkter</Th>
          <Th>Shippingmetode</Th>
          <Th>Adresse</Th>
          <Th>Total</Th>
        </Tr>
      </thead>

      <tbody>
        {filteredOrders?.map((order) => {
          const products = (
            <>
              {order.lineItems?.map((l) => (
                <span
                  className="block"
                  key={`${order._id}-${l.id}`}
                >{`${l.quantity}x ${l.description}`}</span>
              ))}
            </>
          );
          const address = (
            <>
              <span className="block">
                {`${order.shipping.address?.line1}${
                  order.shipping.address?.line2
                    ? ` (${order.shipping.address.line2})`
                    : ""
                }`}
              </span>
              <span className="block">
                {`${order.shipping.address?.postalCode} ${order.shipping.address?.city} ${order.shipping.address?.country}`}
              </span>
            </>
          );
          return (
            <Tr key={order._id}>
              <Td>
                {Intl.DateTimeFormat("nb-NO").format(
                  new Date(order.orderDatetime)
                )}
              </Td>
              <Td>{order.customerName}</Td>
              <Td>{order.customerEmail}</Td>
              <Td>{products}</Td>
              <Td>{order.shipping.shippingRate.displayName}</Td>
              <Td>{address}</Td>
              <Td>
                {formatCurrencyString({
                  value: order.amountTotal,
                  currency: "NOK",
                })}
              </Td>
            </Tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <p>Her var det tomt, gitt</p>
  );
};

export default OrdersTable;
