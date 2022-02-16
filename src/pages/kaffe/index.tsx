import {
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Stripe from "stripe";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { ProductGrid } from "~/components/ProductGrid";
import { productsQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import stripe from "~/lib/stripe";
import type { Product } from "~/models/schema.sanity";

interface Props {
  prices: Stripe.Price[];
  products: Product[];
}

const CoffeesPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { prices, products } = props;

  return (
    <div>
      <Head>
        <title>Våre kaffer</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem title="Våre kaffer" isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow prose lg:prose-lg xl:prose-xl">
          <h1>Våre kaffer</h1>

          <ProductGrid products={products} prices={prices} />
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<Props>
> => {
  const [products, { data: prices }] = await Promise.all([
    sanityClient.fetch<Product[]>(productsQuery),
    stripe.prices.list(),
  ]);

  return {
    props: { prices, products },
  };
};

export default CoffeesPage;
