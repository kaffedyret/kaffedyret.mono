import type { GetServerSidePropsResult, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { DangerButton } from "~/components/Button";
import Loading from "~/components/Loading";
import AdminDashboard from "~/features/admin/AdminDashboard";
import Login from "~/features/admin/Login";
import { ordersQuery, orderStatusesQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import { Order } from "~/models/Order";
import { OrderStatus } from "~/models/schema.sanity";

type Props = {
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const AdminPage: NextPage = ({ orderStatuses, orders }: Props) => {
  const { data, status } = useSession();

  if (data) {
    // If there are no orderStatuses nor orders, there's probably an issue with the server connection
    if (!orderStatuses && !orders) {
      return (
        <main className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <p>Det skjedde en serverfeil.</p>
          <DangerButton onClick={() => signOut()}>Logg ut</DangerButton>
        </main>
      );
    } else {
      return <AdminDashboard orderStatuses={orderStatuses} orders={orders} />;
    }
  } else if (status === "loading") {
    return (
      <main className="flex flex-col w-full h-full justify-center items-center">
        <Loading label="Henter brukerinformasjon..." />
      </main>
    );
  } else if (status === "unauthenticated") {
    // With the change of now using Next Auth's login page, this case should never happen
    return (
      <main className="flex w-full h-full justify-center items-center">
        <Login />
      </main>
    );
  } else {
    return (
      <main className="flex flex-col gap-4 w-full h-full justify-center items-center">
        <p>En uventet feil skjedde. Logg ut og prøv på nytt.</p>
        <DangerButton onClick={() => signOut()}>Logg ut</DangerButton>
      </main>
    );
  }
};

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<Props>
> => {
  // Auth is handled by Next Auth and Next Middleware, so it's safe to fetch orders
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
