import { GetStaticPropsResult, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { ProductGrid } from "~/components/ProductGrid";
import sanityClient from "~/lib/sanity/sanityClient";
import type { Product } from "~/models/schema.sanity";

interface Props {
  products: Product[];
}

const CoffeesPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { products } = props;

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

export default CoffeesPage;
