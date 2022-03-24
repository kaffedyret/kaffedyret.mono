import classNames from "classnames";
import type { Props as ButtonProps } from "./BaseButton";
import { BaseButton } from "./BaseButton";

export function SecondaryButton(props: ButtonProps): JSX.Element {
  const { children, className, disabled, ...rest } = props;

  return (
    <BaseButton
      className={classNames(
        "text-neutral-900 border-2 border-neutral-900",
        {
          "bg-white hover:bg-neutral-50": !disabled,
          "bg-neutral-300": disabled,
        },
        className
      )}
      {...rest}
    >
      {children}
    </BaseButton>
  );
}
