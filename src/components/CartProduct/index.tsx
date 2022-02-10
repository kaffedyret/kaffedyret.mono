import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { formatPrice } from "~/lib/numbers";
import urlFor from "~/lib/sanity/urlFor";
import { CartItemWithVariant } from "~/models/Cart";

interface Props {
  cartItem: CartItemWithVariant;
}

export function CartProduct(props: Props) {
  const { cartItem } = props;
  const { variant } = cartItem;

  const handleRemoveClick = () => {
    // TODO: Remove
  };

  return variant ? (
    <div className="flex items-center gap-4 first:border-t border-b border-neutral-200">
      <div className="flex justify-center items-center not-prose py-2">
        <Image
          className="w-14 object-fill"
          src={urlFor(variant.image).width(56).url()}
          alt={variant.title}
          title={variant.title}
          width={56}
        />
      </div>

      <div className="flex-grow">
        <p>
          {cartItem.amount}x {variant.title}
        </p>
      </div>

      <div className="">
        <p>{formatPrice(variant.price * cartItem.amount)}</p>
      </div>

      <div className="">
        <button className="p-4 hover:text-red-600" onClick={handleRemoveClick}>
          <BiTrash />
        </button>
      </div>
    </div>
  ) : null;
}
