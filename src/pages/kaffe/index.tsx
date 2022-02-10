import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { ProductGrid } from "~/components/ProductGrid";
import sanityClient from "~/lib/sanity/sanityClient";
import type { Product } from "~/models/schema.sanity";

interface Props {
  products: Product[];
}

export default function CoffeesPage(props: Props) {
  const { products } = props;

  return (
    <div>
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
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const products = await sanityClient.fetch<Product[]>(
    `*[_type == "product"] | order(order asc) { _id, title, slug, available, defaultProductVariant, blurb }`
  );

  return {
    props: { products },
  };
}
