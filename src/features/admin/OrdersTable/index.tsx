import { useEffect, useState } from "react";
import { formatCurrencyString } from "use-shopping-cart/core";
import { PrimaryButton } from "~/components/Button";
import { Option, Select } from "~/components/Select";
import { useSelectState } from "~/components/Select/useSelectState";
import { Table, Td, Th, Tr } from "~/components/Table";
import { updateOrderStatus } from "~/lib/admin/orders";
import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";
import { useOrdersTable } from "./useOrdersTable";

type Props = {
  activeTabId: string | null;
  orders?: Order[];
  orderStatuses?: OrderStatus[];
};

const OrdersTable = ({ activeTabId, orders, orderStatuses }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { filteredOrders, selectedRows, toggleRow, resetSelectedRows } =
    useOrdersTable(activeTabId, orders);
  const [selectedStatusId, onSelectedStatusIdChange] = useSelectState(
    orderStatuses && orderStatuses.length > 1 ? orderStatuses[1]._id : undefined
  );

  useEffect(() => {
    resetSelectedRows();
  }, [activeTabId]);

  const handleMoveClick = async () => {
    if (selectedRows.length && !!selectedStatusId) {
      setLoading(true);
      await updateOrderStatus(selectedRows, selectedStatusId);
      setLoading(false);
      // Lord, forgive me for I am too weak to introduce global fetch mechanisms like SWR
      location.reload();
    }
  };

  return filteredOrders && filteredOrders.length > 0 ? (
    <div className="flex flex-col gap-4">
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
              <Tr
                onClick={() => toggleRow(order._id)}
                className="cursor-pointer"
                isSelected={selectedRows.includes(order._id)}
                key={order._id}
              >
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

      <div className="place-self-end flex gap-4">
        {orderStatuses?.length && (
          <Select
            className="rounded"
            onChange={onSelectedStatusIdChange}
            value={selectedStatusId}
          >
            {orderStatuses.map((orderStatus) => (
              <Option
                disabled={orderStatus._id === activeTabId}
                value={orderStatus._id}
                key={orderStatus._id}
              >
                {orderStatus.name}
              </Option>
            ))}
          </Select>
        )}

        <PrimaryButton
          disabled={selectedRows.length == 0}
          isLoading={isLoading}
          loadingText={`Flytter ${selectedRows.length} bestilling${
            selectedRows.length !== 1 ? "er" : ""
          }...`}
          onClick={handleMoveClick}
        >
          Flytt {selectedRows.length} bestilling
          {selectedRows.length !== 1 ? "er" : ""}
        </PrimaryButton>
      </div>
    </div>
  ) : (
    <p>Her var det tomt, gitt</p>
  );
};

export default OrdersTable;
