import { NextPage } from "next";
import Head from "next/head";
import nookies from "nookies";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { cartConfig } from "~/lib/cookies";

const CartPage: NextPage = (props) => {
  // TODO: Fetch cart and products
  const { cart } = nookies.get(null, cartConfig);
  console.log(cart && JSON.parse(cart));

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
        </div>
      </section>
    </div>
  );
};

export default CartPage;
