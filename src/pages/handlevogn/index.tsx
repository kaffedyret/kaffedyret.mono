import { NextPage } from "next";
import Head from "next/head";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { CartSummary } from "~/components/CartSummary";

const CartPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Handlekurv</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem title="Handlevogn" isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow prose lg:prose-lg xl:prose-xl">
          <h1>Handlevogn</h1>

          <CartSummary />
        </div>
      </section>
    </div>
  );
};

export default CartPage;
