import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";
import { getPendingRoasts } from "./pendingRoasts.utils";

type Props = {
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const PendingRoasts = ({ orderStatuses, orders }: Props) => {
  const pendingRoasts = getPendingRoasts(orders, orderStatuses);

  return pendingRoasts && pendingRoasts.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Antall</th>
        </tr>
      </thead>

      <tbody>
        {pendingRoasts?.map((r) => {
          return (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td>{r.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>Ingen ventende bestillinger</p>
  );
};

export default PendingRoasts;
