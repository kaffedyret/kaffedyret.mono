import type {
  GetServerSidePropsResult,
  NextPage,
  GetServerSidePropsContext,
} from "next";
import { unstable_getServerSession } from "next-auth/next";
import { signOut, useSession } from "next-auth/react";
import { DangerButton } from "~/components/Button";
import Loading from "~/components/Loading";
import AdminDashboard from "~/features/admin/AdminDashboard";
import Login from "~/features/admin/Login";
import Signup from "~/features/admin/Signup";
import {
  ordersQuery,
  orderStatusesQuery,
  userQuery,
} from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import { Order } from "~/models/Order";
import { OrderStatus, User } from "~/models/schema.sanity";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

type Props = {
  orderStatuses?: OrderStatus[];
  orders?: Order[];
};

const AdminPage: NextPage = ({ orderStatuses, orders }: Props) => {
  const { data, status } = useSession();

  if (data) {
    // If there are no orderStatuses nor orders, there's either an issue with the server connection
    // or the logged in user is not an admin
    if (!orderStatuses && !orders) {
      return (
        <main className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <p>Du er ikke administrator.</p>
          <DangerButton onClick={() => signOut()}>Logg ut</DangerButton>
        </main>
      );
    }
    // If we have data, orderStatuses, and orders we can expect the user to be an admin
    else {
      return <AdminDashboard orderStatuses={orderStatuses} orders={orders} />;
    }
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

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const session = await unstable_getServerSession(req, res, authOptions);

  // If we're missing session or email from the logged in user,
  // there's either no user or something's wonky
  if (!session || !session.user?.email) {
    return {
      props: {},
    };
  }

  const user = await sanityClient.fetch<User>(userQuery, {
    email: session.user.email,
  });

  // We must make sure the user has admin toggled in the database
  if (!user.admin) {
    return {
      props: {},
    };
  }

  // Then it's safe to fetch orders
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
