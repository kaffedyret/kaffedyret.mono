import {
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import nookies from "nookies";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { CartProduct } from "~/components/CartProduct";
import { getExtendedCartItems } from "~/lib/cart";
import { cartConfig } from "~/lib/cookies";
import sanityClient from "~/lib/sanity/sanityClient";
import { Cart } from "~/models/Cart";
import { Product } from "~/models/schema.sanity";

interface Props {
  products: Product[];
}

const CartPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { products } = props;
  const { cart: cookiesCart } = nookies.get(null, cartConfig);
  const cart: Cart | null = cookiesCart ? JSON.parse(cookiesCart) : null;
  const extendedCartItems = cart ? getExtendedCartItems(cart, products) : null;

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

          {extendedCartItems ? (
            <div>
              {extendedCartItems.map((cartItem) => (
                <CartProduct cartItem={cartItem} key={cartItem.sku} />
              ))}
            </div>
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
