import type { NextApiRequest, NextApiResponse } from "next";
import { Cart } from "~/models/Cart";

export type CartItemResponse = {
  message: string;
  cart?: Cart;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartItemResponse>
) {
  if (req.method === "POST") {
    // Adding an item to the cart, or updating the amount
    // TODO: Return the updated cart
    res.status(200).json({ message: "Item added." });
  }
  else if (req.method === "DELETE") {
    // Removing an item to the cart
    // TODO: Return the updated cart
    res.status(200).json({ message: "Item deleted." });
  } else {
    res
      .status(405)
      .json({ message: `Unable to handle ${req.method} requests.` });
  }
}
