import type {
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Hero } from "~/components/Hero";
import { ProductGrid } from "~/components/ProductGrid";
import sanityClient from "~/lib/sanity/sanityClient";
import { Product } from "~/models/schema.sanity";

interface Props {
  products: Product[];
}

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { products } = props;

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

          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const products = await sanityClient.fetch<Product[]>(
    `*[_type == "product"] | order(order asc) { _id, title, slug, available, defaultProductVariant, blurb }`
  );

  return {
    props: { products },
  };
};

export default HomePage;
