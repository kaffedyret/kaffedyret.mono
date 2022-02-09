import { ExtendedProduct } from "~/models/ExtendedProduct";
import { ProductItem } from "./ProductItem";

interface Props {
  products: ExtendedProduct[];
}

export function ProductGrid(props: Props) {
  const { products } = props;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductItem product={p} key={p._id} />
      ))}
    </div>
  );
}
