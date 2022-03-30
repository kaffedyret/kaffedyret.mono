import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { SyntheticEvent } from "react";
import { BiPlus } from "react-icons/bi";
import Stripe from "stripe";
import { formatCurrencyString } from "use-shopping-cart";
import { useShoppingCart } from "use-shopping-cart/react";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { PrimaryButton } from "~/components/Button";
import { TextBlock } from "~/components/TextBlock";
import useVariantSelect from "~/lib/hooks/useVariantSelect";
import { getAllVariantsFromProduct } from "~/lib/product";
import { productQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import urlFor from "~/lib/sanity/urlFor";
import stripe from "~/lib/stripe";
import { priceConfig } from "~/lib/stripe/config";
import { Product, ProductVariant } from "~/models/schema.sanity";

interface Props {
  allVariants: ProductVariant[];
  prices: Stripe.Price[];
  product: Product;
  stripeProduct: Stripe.Product;
}

interface FormProps {
  amount: { value: string };
  sku: { value: string };
}

const IMAGE_WIDTH = 608;
const IMAGE_HEIGHT = 608;

const CoffeePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { allVariants, prices, product, stripeProduct } = props;
  const { currentSku, currentVariant, currentPrice, setSku } = useVariantSelect(
    product,
    allVariants,
    prices
  );

  const isAvailable = product.available;
  const { addItem } = useShoppingCart();

  const handleVariantChange = (e: any) => {
    setSku(e.target.value);
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormProps;
    const amount = Number(target.amount.value);

    if (!isAvailable || !currentPrice) {
      // TODO: Show error
      return;
    }

    addItem(
      {
        id: currentSku,
        name: `${product.title} - ${currentVariant.title}`,
        price: currentPrice.unit_amount as number,
        currency: currentPrice.currency,
        image: urlFor(currentVariant.image).width(56).height(56).url(),
        price_data: currentPrice,
        product_data: stripeProduct,
      },
      { count: amount }
    );
  };

  return (
    <div>
      <Head>
        <title>{product.title}</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem href="/kaffe" title="Våre kaffer" />
        <BreadcrumbItem title={product.title} isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow grid grid-cols-1 md:grid-cols-2 gap-10">
          <Image
            className="w-full h-full object-center object-cover lg:w-full lg:h-full rounded-lg"
            src={urlFor(product.defaultProductVariant.image)
              .width(IMAGE_WIDTH)
              .height(IMAGE_HEIGHT)
              .url()}
            alt={product.title}
            title={product.title}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
          />

          <div>
            <article className="prose lg:prose-lg xl:prose-xl">
              <h1>{product.title}</h1>
              <p className="font-bold">{product.blurb?.nb}</p>
              {product.body?.nb && <TextBlock>{product.body.nb}</TextBlock>}
            </article>

            <form method="post" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 grid-rows-4 xs:grid-cols-2 sm:grid-rows-2 gap-4 pt-10">
                <p className="xs:col-span-2 text-3xl font-bold">
                  {currentPrice?.unit_amount
                    ? formatCurrencyString({
                        value: currentPrice.unit_amount,
                        ...priceConfig,
                      })
                    : "Ingen priser funnet"}
                </p>

                <input name="amount" type="number" defaultValue={1} />

                <select name="sku" onChange={handleVariantChange}>
                  <option value={product.defaultProductVariant.sku}>
                    {product.defaultProductVariant.title}
                  </option>

                  {product.variants?.map((v) => (
                    <option value={v.sku} key={v._key}>
                      {v.title}
                    </option>
                  ))}
                </select>

                <div className="flex xs:col-span-2">
                  <PrimaryButton
                    iconRight={
                      isAvailable ? <BiPlus className="scale-125" /> : undefined
                    }
                    type="submit"
                    disabled={!isAvailable || !currentPrice?.unit_amount}
                    aria-disabled={!isAvailable || !currentPrice?.unit_amount}
                  >
                    {isAvailable ? "Legg i handlevogn" : "Utsolgt"}
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

type PageParams = {
  slug: string;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<PageParams>): Promise<
  GetServerSidePropsResult<Props>
> => {
  const { slug } = params!;
  const [product] = await sanityClient.fetch<Product[]>(productQuery, { slug });

  // TODO: Redirect if no products were found

  const allVariants = getAllVariantsFromProduct(product);

  const [{ data: prices }, stripeProduct] = await Promise.all([
    stripe.prices.list({
      product: product.stripeProductId,
    }),
    stripe.products.retrieve(product.stripeProductId),
  ]);

  // TODO: Redirect if no prices or Stripe products were found

  return {
    props: {
      allVariants,
      prices,
      product,
      stripeProduct,
    },
  };
};

export default CoffeePage;
