import classNames from "classnames";
import { formatPrice } from "~/lib/numbers";

interface Props {
  isBold?: boolean;
  label: string;
  price: number;
  withBottomBorder?: boolean;
}

export function CartSummaryLine(props: Props) {
  return (
    <div
      className={classNames("flex items-center gap-4 not-prose py-2", {
        "border-b border-neutral-200": props.withBottomBorder,
      })}
    >
      <span className="w-14" />

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
          {formatPrice(props.price)}
        </p>
      </div>

      <span className="w-12" />
    </div>
  );
}
