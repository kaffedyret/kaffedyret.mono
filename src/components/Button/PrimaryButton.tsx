import classNames from "classnames";
import type { Props as ButtonProps } from "./BaseButton";
import { BaseButton } from "./BaseButton";

export function PrimaryButton(props: ButtonProps): JSX.Element {
  const { children, className, disabled, ...rest } = props;

  return (
    <BaseButton
      className={classNames(
        "text-white",
        {
          "bg-blue-500 hover:bg-blue-600 active:bg-blue-700": !disabled,
          "bg-neutral-300": disabled,
        },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </BaseButton>
  );
}
