import Stripe from "stripe";
import { Product } from "~/models/schema.sanity";
import { ProductItem } from "./ProductItem";

interface Props {
  prices: Stripe.Price[];
  products: Product[];
}

export function ProductGrid(props: Props) {
  const { prices, products } = props;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {products.map((p) => {
        const price = prices.find((pr) => pr.product === p.stripeProductId);
        return <ProductItem price={price} product={p} key={p._id} />;
      })}
    </div>
  );
}
