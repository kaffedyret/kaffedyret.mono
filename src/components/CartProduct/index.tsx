import type { AxiosResponse } from "axios";
import axios from "axios";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { formatPrice } from "~/lib/numbers";
import urlFor from "~/lib/sanity/urlFor";
import { CartItem, ExtendedCartItem } from "~/models/Cart";
import { CartItemResponse } from "~/pages/api/cart/item";

interface Props {
  cartItem: ExtendedCartItem;
}

export function CartProduct(props: Props) {
  const { cartItem } = props;
  const { product, variant } = cartItem;

  const handleRemoveClick = async () => {
    const res = await axios.delete<CartItem, AxiosResponse<CartItemResponse>>(
      "/api/cart/item",
      {
        data: {
          amount: cartItem.amount,
          slug: cartItem.slug,
          sku: cartItem.sku,
        },
      }
    );

    // TODO: Add some sort of success or error state
    // TODO: Update view
  };

  return variant && product ? (
    <div className="flex items-center gap-4 first:border-t border-b border-neutral-200">
      <div className="flex justify-center items-center not-prose py-2">
        <Image
          className="w-14 object-fill"
          src={urlFor(variant.image).width(56).url()}
          alt={variant.title}
          title={variant.title}
          width={56}
          height={56}
        />
      </div>

      <div className="flex-grow">
        <p>
          {product.title} - {variant.title} ({cartItem.amount} stk.)
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
