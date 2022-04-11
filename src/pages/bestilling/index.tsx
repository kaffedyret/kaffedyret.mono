import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { OrderSummary } from "~/components/OrderSummary";
import { productsQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import stripe from "~/lib/stripe";
import { Product } from "~/models/schema.sanity";

interface Props {
  customer?: Stripe.Customer | Stripe.DeletedCustomer;
  lineItems?: Stripe.LineItem[];
  session?: Stripe.Checkout.Session;
  products?: Product[];
}

const OrderPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { customer, lineItems, products, session } = props;
  const { cartCount, clearCart } = useShoppingCart();

  // TODO: This doesn't return anything as the IDs from lineItems doesn't seem to match the ID of the products.
  const lineItemProducts = products?.filter((p) =>
    lineItems?.map((li) => li.price?.product).includes(p.stripeProductId)
  );

  useEffect(() => {
    if (cartCount > 0) clearCart();
  }, []);

  const renderError = () => (
    <p>Her ser det ut som det kan ha skjedd en feil. Ta kontakt med oss.</p>
  );

  const renderCustomer = () => {
    return (
      <div>
        {customer?.deleted ? (
          <h3>Tusen takk for bestillingen!</h3>
        ) : (
          <h3>Tusen takk for bestillingen, {customer?.name}!</h3>
        )}
        <p>Vi gjør klar bestillingen din og gir deg beskjed når den er klar.</p>
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

          {!customer || !session ? renderError() : renderCustomer()}

          <OrderSummary lineItems={lineItems} session={session} />
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

  const [customer, lineItems, products] = await Promise.all([
    stripe.customers.retrieve(session.customer),
    stripe.checkout.sessions.listLineItems(session_id as string, {
      limit: 100,
    }),
    sanityClient.fetch<Product[]>(productsQuery),
  ]);

  return {
    props: {
      customer,
      lineItems: lineItems?.data,
      session,
      products,
    },
  };
};

export default OrderPage;
