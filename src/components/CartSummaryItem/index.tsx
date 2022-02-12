import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { formatPrice } from "~/lib/numbers";
import { useShoppingCart } from "use-shopping-cart/react";

interface Props {
  cartProduct: CartProduct;
}

export function CartSummaryItem(props: Props) {
  const { cartProduct } = props;
  const { removeItem } = useShoppingCart();

  const handleRemoveClick = async () => {
    removeItem(cartProduct.id);
  };

  return cartProduct ? (
    <div className="flex items-center gap-4 first:border-t border-b border-neutral-200">
      <div className="flex justify-center items-center not-prose py-2">
        <Image
          className="w-14 object-fill"
          src={cartProduct.image || ""} // TODO: Find fallback image
          alt={cartProduct.name}
          title={cartProduct.name}
          width={56}
          height={56}
        />
      </div>

      <div className="flex-grow">
        <p>
          {cartProduct.name} ({cartProduct.quantity} stk.)
        </p>
      </div>

      <div className="">
        <p>{formatPrice(cartProduct.price * cartProduct.quantity)}</p>
      </div>

      <div className="">
        <button className="p-4 hover:text-red-600" onClick={handleRemoveClick}>
          <BiTrash />
        </button>
      </div>
    </div>
  ) : null;
}
