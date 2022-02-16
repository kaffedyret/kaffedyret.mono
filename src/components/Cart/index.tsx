import { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart/react";

interface Props {
  children: ReactNode;
}

export function Cart(props: Props) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
      currency="NOK"
      language="NO"
    >
      {props.children}
    </CartProvider>
  );
}
