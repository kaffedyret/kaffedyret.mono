import type { GetServerSidePropsResult, NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { VerticalTab } from "~/components/VerticalTab";
import sanityClient from "~/lib/sanity/sanityClient";
import { ordersQuery, orderStatusesQuery } from "~/lib/sanity/queries";
import { Order, OrderStatus } from "~/models/schema.sanity";
import { formatCurrencyString } from "use-shopping-cart/core";

type Props = {
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const AdminPage: NextPage = ({ orderStatuses, orders }: Props) => {
  const [activeTab, setActiveTab] = useState<string | null>(
    orderStatuses ? orderStatuses[0].name : null
  );
  const filteredOrders = orders?.filter(
    (order) => order.status.name === activeTab
  );
  const pendingRoasts: Array<{ name: string; quantity: number }> | null =
    orders && orderStatuses
      ? Object.values(
          orders
            .filter((o) => o.status.name === orderStatuses[0].name)
            .map((o) => o.lineItems)
            .flat()
            .reduce(
              (total, o) => ({
                ...total,
                [o.description]: {
                  name: o.description,
                  quantity: total[o.description]
                    ? (total[o.description].quantity += o.quantity)
                    : o.quantity,
                },
              }),
              {}
            )
        )
      : null;

  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

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
          {orderStatuses ? (
            orderStatuses.map((orderStatus) => (
              <VerticalTab
                badge={
                  orders?.filter((o) => o.status.name === orderStatus.name)
                    .length || null
                }
                isActive={activeTab == orderStatus._id}
                label={orderStatus.name}
                onClick={handleTabClick}
                key={orderStatus._id}
              />
            ))
          ) : (
            <p>Her var det tomt, gitt</p>
          )}
        </section>

        <section
          id="pending-roasts"
          className="p-4 border-b-2"
          style={{ gridArea: "pending" }}
        >
          {pendingRoasts && pendingRoasts.length > 0 ? (
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
          )}
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
