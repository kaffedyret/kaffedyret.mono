import { ReactNode } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import type { Product as CartProduct } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";
import { TextButton } from "~/components/Button";

interface Props {
  cartProduct: CartProduct;
}

interface ProductCountButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const ProductCountButton = ({ children, onClick }: ProductCountButtonProps) => (
  <button className="flex h-full items-center px-2 first:border-r last:border-l bg-white hover:bg-neutral-50" onClick={onClick}>
    {children}
  </button>
);

export function ProductCount({ cartProduct }: Props) {
  const { removeItem, incrementItem, decrementItem } = useShoppingCart();

  const handleDecrementClick = () => decrementItem(cartProduct.id);
  const handleIncrementClick = () => incrementItem(cartProduct.id);

  return (
    <div className="flex place-items-center border rounded-lg overflow-hidden">
      <ProductCountButton onClick={handleDecrementClick}>
        <BiMinus />
      </ProductCountButton>

      <span className="px-2">{cartProduct.quantity}</span>

      <ProductCountButton onClick={handleIncrementClick}>
        <BiPlus />
      </ProductCountButton>
    </div>
  );
}
