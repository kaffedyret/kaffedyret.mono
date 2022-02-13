import { useShoppingCart } from "use-shopping-cart/react";
import { CartSummaryLine } from "../CartSummaryLine";

export function CartSummaryTotal() {
  const { totalPrice } = useShoppingCart();

  return (
    <>
      <CartSummaryLine label="Total" price={totalPrice} isBold withBottomBorder />
    </>
  );
}
