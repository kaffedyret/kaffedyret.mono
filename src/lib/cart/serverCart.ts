import { Cart } from "~/models/Cart";

export const stringifyCart = (cart: Cart): string => JSON.stringify(cart);

export const parseCartFromCookies = (cart?: string): Cart | undefined =>
  cart ? JSON.parse(cart) : undefined;
