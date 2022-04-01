import {
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart/react";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { CartSummary } from "~/components/CartSummary";
import { RadioButton, RadioGroup } from "~/components/Radio";
import { ShippingRateLabel } from "~/components/ShippingRateLabel";
import stripe from "~/lib/stripe";

interface Props {
  shippingRates: Stripe.ShippingRate[];
}

const CartPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { shippingRates } = props;
  const { cartCount } = useShoppingCart();
  const isCartNotEmpty = cartCount > 0;

  return (
    <div>
      <Head>
        <title>Handlevogn</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem title="Handlevogn" isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow prose lg:prose-lg xl:prose-xl">
          <h1>Handlevogn</h1>

          <CartSummary />

          {isCartNotEmpty && (
            <>
              <h2>Frakt</h2>
              <RadioGroup>
                {shippingRates.map((shippingRate) => (
                  <RadioButton
                    id={shippingRate.id}
                    label={<ShippingRateLabel shippingRate={shippingRate} />}
                    name="shippingRate"
                    value={shippingRate.id}
                    key={shippingRate.id}
                  />
                ))}
              </RadioGroup>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<Props>
> => {
  const { data } = await stripe.shippingRates.list();

  // TODO: Also sort shipping rates by price
  const shippingRates = data.filter((s) => s.active);

  return {
    props: { shippingRates: shippingRates },
  };
};

export default CartPage;
