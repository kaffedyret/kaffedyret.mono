import type { GetServerSidePropsResult, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { DangerButton } from "~/components/Button";
import Loading from "~/components/Loading";
import AdminDashboard from "~/features/admin/AdminDashboard";
import Login from "~/features/admin/Login";
import Signup from "~/features/admin/Signup";
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
    return <AdminDashboard orderStatuses={orderStatuses} orders={orders} />;
  } else if (status === "loading") {
    return (
      <main className="flex flex-col w-full h-full justify-center items-center">
        <Loading label="Henter brukerinformasjon..." />
      </main>
    );
  } else if (status === "unauthenticated") {
    return (
      <main className="flex flex-col gap-4 w-full h-full justify-center items-center">
        <div className="flex gap-32 prose">
          <Login />
          <Signup />
        </div>
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
