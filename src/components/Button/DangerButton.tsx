import classNames from "classnames";
import type { Props as ButtonProps } from "./BaseButton";
import { BaseButton } from "./BaseButton";

export function DangerButton(props: ButtonProps): JSX.Element {
  const { children, className, disabled, ...rest } = props;

  return (
    <BaseButton
      className={classNames(
        "text-white",
        {
          "bg-red-700 hover:bg-red-800 active:bg-red-900": !disabled,
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
