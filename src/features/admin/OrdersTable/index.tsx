import { formatCurrencyString } from "use-shopping-cart/core";
import { Order } from "~/models/Order";
import { useOrdersTable } from "./useOrdersTable";

type Props = {
  activeTabId: string | null;
  orders?: Order[];
};

const OrdersTable = ({ activeTabId, orders }: Props) => {
  const filteredOrders = useOrdersTable(activeTabId, orders);

  return filteredOrders && filteredOrders.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Tidspunkt</th>
          <th>Kundenavn</th>
          <th>E-post</th>
          <th>Produkter</th>
          <th>Shippingmetode</th>
          <th>Adresse</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        {filteredOrders?.map((order) => {
          const products = (
            <>
              {order.lineItems?.map((l) => (
                <p
                  key={`${order._id}-${l.id}`}
                >{`${l.quantity}x ${l.description}`}</p>
              ))}
            </>
          );
          const address = (
            <>
              <p>
                {`${order.shipping.address?.line1}${
                  order.shipping.address?.line2
                    ? ` (${order.shipping.address.line2})`
                    : ""
                }`}
              </p>
              <p>
                {`${order.shipping.address?.postalCode} ${order.shipping.address?.city} ${order.shipping.address?.country}`}
              </p>
            </>
          );
          return (
            <tr key={order._id}>
              <td>
                {Intl.DateTimeFormat("nb-NO").format(
                  new Date(order.orderDatetime)
                )}
              </td>
              <td>{order.customerName}</td>
              <td>{order.customerEmail}</td>
              <td>{products}</td>
              <td>{order.shipping.shippingRate.displayName}</td>
              <td>{address}</td>
              <td>
                {formatCurrencyString({
                  value: order.amountTotal,
                  currency: "NOK",
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>Her var det tomt, gitt</p>
  );
};

export default OrdersTable;
