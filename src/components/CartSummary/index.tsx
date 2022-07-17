import axios from "axios";
import Link from "next/link";
import { BiRightArrowAlt, BiTrash } from "react-icons/bi";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart/react";
import { PrimaryButton, SecondaryButton } from "../Button";
import { CartSummaryItem } from "./CartSummaryItem";
import { CartSummaryTotal } from "./CartSummaryTotal";

export function CartSummary() {
  const { cartDetails, redirectToCheckout, clearCart } = useShoppingCart();
  const cartProducts = Object.values(
    cartDetails as Record<string, CartProduct>
  );

  const handleClearCartClick = () => {
    // TODO: Ask for confirmation
    clearCart();
  };

  const handleGoToCheckoutClick = async () => {
    axios
      .post("/api/cart/checkout", { cartDetails })
      .then((res) => {
        const { sessionId } = res.data;

        redirectToCheckout({ sessionId });
      })
      .catch((err) => {
        console.log(err)
        throw new Error("Could not go to checkout.");
      });
  };

  return cartProducts && cartProducts.length > 0 ? (
    <div>
      {cartProducts.map((i) => (
        <CartSummaryItem cartProduct={i} key={i.id} />
      ))}

      <CartSummaryTotal />

      <div className="flex flex-wrap pt-8 justify-between gap-4">
        <SecondaryButton
          iconRight={<BiTrash className="scale-125" />}
          onClick={handleClearCartClick}
        >
          Tøm handlevogn
        </SecondaryButton>

        <PrimaryButton
          iconRight={<BiRightArrowAlt className="scale-125" />}
          onClick={handleGoToCheckoutClick}
        >
          Til betaling
        </PrimaryButton>
      </div>
    </div>
  ) : (
    <div>
      <p>Her var det visst tomt.</p>

      <Link href="/kaffe" passHref>
        <PrimaryButton iconRight={<BiRightArrowAlt className="scale-125" />}>
          Se vårt utvalg
        </PrimaryButton>
      </Link>
    </div>
  );
}
