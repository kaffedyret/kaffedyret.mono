import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { formatCurrencyString } from "use-shopping-cart";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart/react";
import { priceConfig } from "~/lib/stripe/config";

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
    <div className="grid grid-cols-cart-summary-item sm:grid-cols-sm-cart-summary-item grid-template-areas-cart-summary-item items-center gap-x-4 first:border-t border-b border-neutral-200 not-prose">
      <div
        className="flex justify-center items-center py-2"
        style={{ gridArea: "image" }}
      >
        <Image
          className="w-14 object-fill"
          src={cartProduct.image || ""} // TODO: Find fallback image
          alt={cartProduct.name}
          title={cartProduct.name}
          width={56}
          height={56}
        />
      </div>

      <div style={{ gridArea: "title" }}>
        <p>
          {cartProduct.name} ({cartProduct.quantity} stk.)
        </p>
      </div>

      <div style={{ gridArea: "price" }}>
        <p className="">
          {formatCurrencyString({
            value: cartProduct.price * cartProduct.quantity,
            ...priceConfig,
          })}
        </p>
      </div>

      <div style={{ gridArea: "action" }}>
        <button className="p-4 hover:text-red-600" onClick={handleRemoveClick}>
          <BiTrash />
        </button>
      </div>
    </div>
  ) : null;
}
