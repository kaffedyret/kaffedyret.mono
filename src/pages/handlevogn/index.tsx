import {
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart/react";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { Button } from "~/components/Button";
import { CartSummaryItem } from "~/components/CartSummaryItem";
import sanityClient from "~/lib/sanity/sanityClient";
import { Product } from "~/models/schema.sanity";

interface Props {
  products: Product[];
}

const CartPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { products } = props;
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();
  const cartProducts = Object.values(
    cartDetails as Record<string, CartProduct>
  );

  return (
    <div>
      <Head>
        <title>Våre kaffer</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem title="Handlevogn" isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow prose lg:prose-lg xl:prose-xl">
          <h1>Handlevogn</h1>

          {cartProducts && cartProducts.length > 0 ? (
            cartProducts.map((i) => (
              <CartSummaryItem cartProduct={i} key={i.id} />
            ))
          ) : (
            <p>Handlevognen er tom.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<Props>
> => {
  const products = await sanityClient.fetch<Product[]>(
    `*[_type == "product"] | order(order asc) { _id, title, slug, available, defaultProductVariant, variants, blurb }`
  );

  return {
    props: { products },
  };
};

export default CartPage;
