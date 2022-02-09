import Link from "next/link";
import { Button } from "~/components/Button";
import { formatPrice } from "~/lib/numbers";
import { ExtendedProduct } from "~/models/ExtendedProduct";
import { BiRightArrowAlt } from "react-icons/bi";
interface Props {
  product: ExtendedProduct;
}

export function ProductItem(props: Props) {
  const { product } = props;
  const isAvailable = product.available;

  const ProductLinkWrapper = ({ children }: { children: any }): JSX.Element => {
    return isAvailable ? (
      <Link href={`/kaffe/${product.slug?.current}`}>
        <a className="no-underline">{children}</a>
      </Link>
    ) : (
      children
    );
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-2 pb-0 drop-shadow-sm">
      <div className="not-prose">
        <ProductLinkWrapper>
          <img
            className="w-full h-full object-center object-cover lg:w-full lg:h-full rounded-lg"
            src={product.cardImageSrc}
            alt={product.title}
            title={product.title}
          />
        </ProductLinkWrapper>
      </div>

      <div className="flex flex-col justify-start flex-grow prose p-4">
        <h3 className="!mt-0">{product.title}</h3>
        <p className="flex-grow">{product.blurb?.nb}</p>

        <div className="flex items-center justify-between flex-row md:flex-col lg:flex-row gap-4">
          <span className="text-lg font-bold">
            {formatPrice(product.defaultProductVariant.price)}
          </span>

          <ProductLinkWrapper>
            <Button
              aria-disabled={!isAvailable}
              disabled={!isAvailable}
              iconRight={<BiRightArrowAlt className="scale-125" />}
            >
              {isAvailable ? "Se mer" : "Utsolgt"}
            </Button>
          </ProductLinkWrapper>
        </div>
      </div>
    </div>
  );
}
