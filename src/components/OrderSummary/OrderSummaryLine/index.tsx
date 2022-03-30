import classNames from "classnames";
import { formatCurrencyString } from "use-shopping-cart";
import { priceConfig } from "~/lib/stripe/config";

interface Props {
  isBold?: boolean;
  label: string;
  price: number;
  quantity?: number;
  withBottomBorder?: boolean;
}

export function OrderSummaryLine(props: Props) {
  return (
    <div
      className={classNames("flex items-center gap-4 not-prose py-2", {
        "border-b border-neutral-200": props.withBottomBorder,
      })}
    >
      <div className="flex-grow">
        <p
          className={classNames({
            "font-bold": props.isBold,
          })}
        >
          {props.label}
        </p>
      </div>

      <div className="">
        <p className={classNames({ "font-bold": props.isBold })}>
          {formatCurrencyString({
            value: props.price,
            ...priceConfig,
          })}
        </p>
      </div>
    </div>
  );
}
