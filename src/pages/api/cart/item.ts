import type { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { addItemToCart, removeItemFromCart } from "~/lib/cart";
import { cartConfig } from "~/lib/cookies";
import { Cart, CartItem } from "~/models/Cart";

export type CartItemResponse = {
  message: string;
  cart?: Cart;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartItemResponse>
) {
  const { cart: cookiesCart } = parseCookies({ req });

  try {
    if (req.body) {
      if (req.method === "POST") {
        const cart = cookiesCart ? JSON.parse(cookiesCart) : undefined;
        const cartItem: CartItem = req.body;
        const updatedCart = addItemToCart(cartItem, cart);
        setCookie({ res }, "cart", JSON.stringify(updatedCart), cartConfig);
        res.status(201).json({ message: "Item added." });
      } else if (req.method === "DELETE") {
        const cart = cookiesCart ? JSON.parse(cookiesCart) : undefined;
        const cartItem: CartItem = req.body;
        const updatedCart = removeItemFromCart(cartItem, cart);

        // If there are still items in the cart
        if (updatedCart) {
          setCookie({ res }, "cart", JSON.stringify(updatedCart), cartConfig);
          res.status(201).json({ message: "Item removed." });
        }

        // If cart is empty
        destroyCookie({ res }, "cart", cartConfig);
        res.status(200).json({ message: "Item removed. Cart empty." });
      }

      // Method not supported
      res
        .status(405)
        .json({ message: `Unable to handle ${req.method} requests.` });
    }

    // Missing body
    res.status(405).json({ message: "Missing body." });
  } catch (err) {
    console.log(`Error while ${req.method}.`, err);
    destroyCookie({ res }, "cart", cartConfig);
    res.status(200).json({ message: "Error. Resetting cart." });
  }
}
