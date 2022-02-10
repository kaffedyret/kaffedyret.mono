import { parseCookies, setCookie } from "nookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { Cart } from "~/models/Cart";

export type CartResponse = {
  cart?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartResponse>
) {
  const { cart } = parseCookies({ req });

  if (req.method === "GET") {
    // Adding an item to the cart, or updating the amount
    // TODO: Return the updated cart
    res.status(200).json({ cart });
  } else {
    res.status(405).json({});
  }
}
