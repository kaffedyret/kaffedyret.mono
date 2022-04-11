import Image from "next/image";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { formatCurrencyString } from "use-shopping-cart";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";
import { TextButton } from "~/components/Button";
import { priceConfig } from "~/lib/stripe/config";
import { ProductCount } from "../ProductCount";

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
    <div className="grid grid-template-areas-cart-summary-item items-center gap-x-4 first:border-t border-b border-neutral-200 not-prose">
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
        <p>{cartProduct.name}</p>
      </div>

      <div style={{ gridArea: "amount" }} className="flex gap-2">
        <ProductCount cartProduct={cartProduct} />
      </div>

      <div style={{ gridArea: "price" }} className="text-right">
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
