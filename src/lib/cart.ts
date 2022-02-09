import { Cart, CartItem, CartItemWithVariant } from "~/models/Cart";
import { ExtendedProduct } from "~/models/ExtendedProduct";
import { getAllVariantsFromProduct } from "./product";

export const isCartNotEmpty = (cart?: Cart): boolean =>
  cart?.items && cart.items.length > 0 ? true : false;

export const addItemToCart = (item: CartItem, cart: Cart): Cart => {
  // If cart is empty
  if (!cart) {
    return {
      items: [item],
    };
  }

  // If cart does not already include current item
  if (!cart.items?.map((i) => i.sku).includes(item.sku)) {
    return {
      items: cart.items?.concat([item]),
    };
  }

  // If cart already includes current item
  return {
    items: cart.items?.map((i) => {
      if (i.sku !== item.sku) {
        return i;
      }
      return { ...i, amount: i.amount + item.amount };
    }),
  };
};

export const getCartItemsWithProduct = (
  cart: Cart,
  products: ExtendedProduct[]
): Array<CartItemWithVariant> => {
  if (!cart?.items || cart.items.length === 0) return [];

  return cart.items.map((cartItem) => {
    const allVariants = getAllVariantsFromProduct(
      products.find((p) => p.slug.current === cartItem.slug) as ExtendedProduct
    );

    return {
      ...cartItem,
      variant: allVariants.find((p) => p.sku === cartItem.sku),
    };
  });
};
