import axios from "axios";
import { BiRightArrowAlt } from "react-icons/bi";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart/react";
import { Button } from "../Button";
import { CartSummaryItem } from "./CartSummaryItem";
import { CartSummaryTotal } from "./CartSummaryTotal";

export function CartSummary() {
  const { cartDetails, redirectToCheckout } = useShoppingCart();
  const cartProducts = Object.values(
    cartDetails as Record<string, CartProduct>
  );

  const handleGoToCheckoutClick = async () => {
    axios
      .post("/api/cart/checkout", cartDetails)
      .then((res) => {
        const { sessionId } = res.data;
        
        // TODO: Make this work. We're so close now!
        redirectToCheckout(sessionId);
      })
      .catch((err) => {
        console.log(err);
      });
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
