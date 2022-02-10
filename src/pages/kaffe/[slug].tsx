import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { Button } from "~/components/Button";
import { TextBlock } from "~/components/TextBlock";
import { formatPrice } from "~/lib/numbers";
import { getAllVariantsFromProduct } from "~/lib/product";
import sanityClient from "~/lib/sanity/sanityClient";
import urlFor from "~/lib/sanity/urlFor";
import { ExtendedVariant } from "~/models/ExtendedProductVariant";
import { Product } from "~/models/schema.sanity";

interface Props {
  product: Product;
  allVariants: ExtendedVariant[];
  slug: string;
}

const CoffeePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { allVariants, slug, product } = props;
  const [currentSku, setSku] = useState<string | undefined>(
    product.defaultProductVariant.sku
  );
  const currentVariant = allVariants.find((v) => v.sku === currentSku);
  const currentPrice = currentVariant?.price;
  const imageWidth = 608;
  const imageHeight = 608;

  const handleVariantChange = (e: any) => {
    setSku(e.target.value);
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
            src={urlFor(product.defaultProductVariant.images[0])
              .width(imageWidth)
              .height(imageHeight)
              .url()}
            alt={product.title}
            title={product.title}
            width={imageWidth}
            height={imageHeight}
          />
          <div>
            <article className="prose lg:prose-lg xl:prose-xl">
              <h1>{product.title}</h1>
              <p className="font-bold">{product.blurb?.nb}</p>
              {product.body?.nb && <TextBlock>{product.body.nb}</TextBlock>}
            </article>

            <form method="post">
              <div className="grid grid-cols-1 grid-rows-4 xs:grid-cols-2 sm:grid-rows-2 gap-4 pt-10">
                <p className="sm:col-span-2 text-3xl font-bold">
                  {formatPrice(currentPrice)}
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

                <div className="flex">
                  <Button
                    iconRight={<BiPlus className="scale-125" />}
                    type="submit"
                  >
                    Kjøp
                  </Button>
                </div>
              </div>

              <input hidden name="slug" value={slug} />
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

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<PageParams>
> => {
  const products = await sanityClient.fetch<Product[]>(
    `*[_type == "product"] | order(order asc) { _id, slug }`
  );

  return {
    paths: products.map((p) => ({ params: { slug: p.slug.current } })),
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<Props>> => {
  const { slug } = params!;

  const [product] = await sanityClient.fetch<Product[]>(
    `*[_type == "product" && slug.current == $slug] | order(order asc) { _id, title, body, slug, available, defaultProductVariant, variants, blurb }`,
    { slug }
  );
  const allVariants = getAllVariantsFromProduct(product);

  return {
    props: {
      allVariants,
      slug,
      product,
    },
  };
};

export default CoffeePage;
