import { Table, Td, Th, Tr } from "~/components/Table";
import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";
import { getPendingRoasts } from "./pendingRoasts.utils";

type Props = {
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const PendingRoastsTable = ({ orderStatuses, orders }: Props) => {
  const pendingRoasts = getPendingRoasts(orders, orderStatuses);

  return (
    <div className="">
    {pendingRoasts && pendingRoasts.length > 0 ? (
        <Table className="table">
          <thead>
            <Tr>
              <Th>Navn</Th>
              <Th>Antall</Th>
            </Tr>
          </thead>

          <tbody>
            {pendingRoasts?.map((r) => {
              return (
                <Tr key={r.name}>
                  <Td>{r.name}</Td>
                  <Td>{r.quantity}</Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>Ingen ventende bestillinger</p>
      )}
    </div>
  );
};

export default PendingRoastsTable;
