import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Stripe from "stripe";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { CartSummary } from "~/components/CartSummary";
import stripe from "~/lib/stripe";

interface Props {
  session?: Stripe.Checkout.Session;
  customer?: Stripe.Customer | Stripe.DeletedCustomer;
}

const OrderPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { customer, session } = props;

  const renderError = () => (
    <p>Her ser det ut som det kan ha skjedd en feil. Ta kontakt med oss.</p>
  );

  const renderDeletedCustomer = () => {
    return (
      <div>
        <h3>Tusen takk for bestillingen!</h3>
        <p>Vi gjør klar bestillingen din og gir deg beskjed når den er klar.</p>
      </div>
    );
  };

  const renderCustomer = () => {
    const verifiedCustomer = customer as Stripe.Customer;

    return (
      <div>
        <h3>Tusen takk for bestillingen, {verifiedCustomer.name}!</h3>
        <p>Vi gjør klar bestillingen din og gir deg beskjed når den er klar.</p>

        <CartSummary />
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Ordrebekreftelse</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem title="Ordrebekreftelse" isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow prose lg:prose-lg xl:prose-xl">
          <h1>Ordrebekreftelse</h1>

          {!customer || !session
            ? renderError()
            : customer?.deleted
            ? renderDeletedCustomer()
            : renderCustomer()}
        </div>
      </section>
    </div>
  );
};

type PageQueries = {
  session_id: string;
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext<PageQueries>): Promise<
  GetServerSidePropsResult<Props>
> => {
  const { session_id } = query;
  const session = await stripe.checkout.sessions.retrieve(session_id as string);

  if (typeof session.customer !== "string") {
    return {
      props: {
        session,
      },
    };
  }

  const customer = await stripe.customers.retrieve(session.customer);

  return {
    props: {
      customer,
      session,
    },
  };
};

export default OrderPage;
