import { BiRightArrowAlt } from "react-icons/bi";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart/react";
import { Button } from "../Button";
import { CartSummaryItem } from "./CartSummaryItem";
import { CartSummaryTotal } from "./CartSummaryTotal";

interface Props {
  cartProducts: CartProduct[];
}

export function CartSummary(props: Props) {
  const { cartProducts } = props;
  const { redirectToCheckout } = useShoppingCart();

  const handleGoToCheckoutClick = async () => {
    // TODO: Pass sessionId
    await redirectToCheckout();
  };

  return cartProducts && cartProducts.length > 0 ? (
    <div>
      {cartProducts.map((i) => (
        <CartSummaryItem cartProduct={i} key={i.id} />
      ))}

      <CartSummaryTotal />

      <div className="flex pt-8 justify-end">
        <Button
          iconRight={<BiRightArrowAlt className="scale-125" />}
          onClick={handleGoToCheckoutClick}
        >
          Til betaling
        </Button>
      </div>
    </div>
  ) : (
    <p>Handlevognen er tom.</p>
  );
}
