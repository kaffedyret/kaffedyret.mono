import type {
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Stripe from "stripe";
import { Hero } from "~/components/Hero";
import { ProductGrid } from "~/components/ProductGrid";
import { productsQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import stripe from "~/lib/stripe";
import { Product } from "~/models/schema.sanity";

interface Props {
  prices: Stripe.Price[];
  products: Product[];
}

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { prices, products } = props;

  return (
    <div>
      <Head>
        <title>Kaffedyret</title>
      </Head>

      <section>
        <div className="bg-white">
          <div className="container-narrow">
            <Hero />
          </div>
        </div>

        <div className="container-narrow prose lg:prose-lg xl:prose-xl py-20">
          <h1>Våre kaffer</h1>

          <ProductGrid prices={prices} products={products} />
        </div>
      </section>
    </div>
  );
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const [products, { data: prices }] = await Promise.all([
    sanityClient.fetch<Product[]>(productsQuery),
    stripe.prices.list(),
  ]);

  return {
    props: { prices, products },
  };
};

export default HomePage;
