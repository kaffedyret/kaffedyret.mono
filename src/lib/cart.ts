import { Cart, CartItem, CartItemWithVariant } from "~/models/Cart";
import { Product } from "~/models/schema.sanity";
import { getAllVariantsFromProduct } from "./product";

export const isCartNotEmpty = (cart?: Cart): boolean =>
  cart && cart.length > 0 ? true : false;

export const addItemToCart = (item: CartItem, cart?: Cart): Cart => {
  // If cart is empty
  if (!cart || cart.length === 0) {
    return [item];
  }

  // If cart does not already include current item
  if (!cart?.map((i) => i.sku).includes(item.sku)) {
    return cart.concat([item]);
  }

  // If cart already includes current item
  return cart.map((i) => {
    if (i.sku !== item.sku) {
      return i;
    }
    return { ...i, amount: i.amount + item.amount };
  });
};

export const removeItemToCart = (item: CartItem, cart?: Cart): Cart | null => {
  // If cart is empty
  if (!cart || cart.length === 0) {
    return null;
  }

  // If cart does not already include current item
  if (!cart?.map((i) => i.sku).includes(item.sku)) {
    return cart;
  }

  // If cart already includes current item
  const updatedCart = cart.filter((i) => {
    if (i.sku !== item.sku) {
      return true;
    }
    return false;
  });

  // Return cart or null if empty
  return updatedCart.length > 0 ? updatedCart : null;
};

export const getCartItemsWithProduct = (
  cart: Cart,
  products: Product[]
): Array<CartItemWithVariant> => {
  if (!cart || cart.length === 0) return [];

  return cart.map((cartItem) => {
    const allVariants = getAllVariantsFromProduct(
      products.find((p) => p.slug.current === cartItem.slug) as Product
    );

    return {
      ...cartItem,
      variant: allVariants.find((p) => p.sku === cartItem.sku),
    };
  });
};
