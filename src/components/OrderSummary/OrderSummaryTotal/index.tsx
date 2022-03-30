import { OrderSummaryLine } from "../OrderSummaryLine";

interface Props {
  amount?: number | null;
  quantity?: number | null;
}

export function OrderSummaryTotal({ amount, quantity }: Props) {
  return (
    <>
      <OrderSummaryLine
        label="Total"
        price={amount || 0}
        isBold
        withBottomBorder
      />
    </>
  );
}
