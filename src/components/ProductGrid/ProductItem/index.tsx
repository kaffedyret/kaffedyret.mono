import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import Stripe from "stripe";
import { formatCurrencyString } from "use-shopping-cart";
import { PrimaryButton, SecondaryButton } from "~/components/Button";
import urlFor from "~/lib/sanity/urlFor";
import { priceConfig } from "~/lib/stripe/config";
import { Product } from "~/models/schema.sanity";

interface Props {
  price?: Stripe.Price;
  product: Product;
}

const IMAGE_WIDTH = 608;
const IMAGE_HEIGHT = 608;

export function ProductItem(props: Props) {
  const { price, product } = props;
  const isAvailable = product.available;

  const ProductLinkWrapper = ({ children }: { children: any }): JSX.Element => {
    return (
      <Link href={`/kaffe/${product.slug?.current}`}>
        <a className="no-underline">{children}</a>
      </Link>
    );
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-2 pb-0 drop-shadow-sm">
      <div className="not-prose">
        <ProductLinkWrapper>
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
            layout="responsive"
          />
        </ProductLinkWrapper>
      </div>

      <div className="flex flex-col justify-start flex-grow prose p-4">
        <h3 className="!mt-0">{product.title}</h3>
        <p className="flex-grow">{product.blurb?.nb}</p>

        <div className="flex items-center justify-between flex-row md:flex-col lg:flex-row gap-4">
          {price?.unit_amount && (
            <span className="text-lg font-bold">
              {formatCurrencyString({
                value: price.unit_amount,
                ...priceConfig,
              })}
            </span>
          )}

          <ProductLinkWrapper>
            {isAvailable ? (
              <PrimaryButton
                iconRight={<BiRightArrowAlt className="scale-125" />}
              >
                Se mer
              </PrimaryButton>
            ) : (
              <SecondaryButton
                iconRight={<BiRightArrowAlt className="scale-125" />}
              >
                Utsolgt
              </SecondaryButton>
            )}
          </ProductLinkWrapper>
        </div>
      </div>
    </div>
  );
}
