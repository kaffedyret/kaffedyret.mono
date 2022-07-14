import type { GetServerSidePropsResult, NextPage } from "next";
import Head from "next/head";
import { formatCurrencyString } from "use-shopping-cart/core";
import OrderStatusTabs from "~/features/admin/OrderStatusTabs";
import PendingRoasts from "~/features/admin/PendingRoasts";
import { useOrderStatusTabs } from "~/features/hooks/useOrderStatusTabs";
import { ordersQuery, orderStatusesQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";

type Props = {
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const AdminPage: NextPage = ({ orderStatuses, orders }: Props) => {
  const { activeTab, handleTabClick } = useOrderStatusTabs(orderStatuses);

  const filteredOrders = orders?.filter(
    (order) => order.status.name === activeTab
  );

  return (
    <div className="h-full">
      <Head>
        <title>Admin</title>
      </Head>

      <main className="h-full grid grid-template-areas-admin">
        <section
          id="order-status"
          className="bg-white flex flex-col pt-8"
          style={{ gridArea: "order-status" }}
        >
          <OrderStatusTabs
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            orderStatuses={orderStatuses}
            orders={orders}
          />
        </section>

        <section
          id="pending-roasts"
          className="p-4 border-b-2"
          style={{ gridArea: "pending" }}
        >
          <PendingRoasts orders={orders} orderStatuses={orderStatuses} />
        </section>

        <section id="orders" className="p-4" style={{ gridArea: "orders" }}>
          {filteredOrders && filteredOrders.length > 0 ? (
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
                        <p key={l.id}>{`${l.quantity}x ${l.description}`}</p>
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
                    <tr key={order.sessionId}>
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
          )}
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps = async ({}): Promise<
  GetServerSidePropsResult<Props>
> => {
  const [orderStatuses, orders] = await Promise.all([
    sanityClient.fetch<OrderStatus[]>(orderStatusesQuery),
    sanityClient.fetch<Order[]>(ordersQuery),
  ]);

  return {
    props: {
      orderStatuses,
      orders,
    },
  };
};

export default AdminPage;
