import type { GetServerSidePropsResult, NextPage } from "next";
import Head from "next/head";
import { useOrderStatusTabs } from "~/features/admin/hooks/useOrderStatusTabs";
import OrdersTable from "~/features/admin/OrdersTable";
import OrderStatusTabs from "~/features/admin/OrderStatusTabs";
import PendingRoasts from "~/features/admin/PendingRoasts";
import { ordersQuery, orderStatusesQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";

type Props = {
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const AdminPage: NextPage = ({ orderStatuses, orders }: Props) => {
  const { activeTabId, handleTabClick } = useOrderStatusTabs(orderStatuses);

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
            activeTabId={activeTabId}
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
          <OrdersTable activeTabId={activeTabId} orders={orders} />
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
