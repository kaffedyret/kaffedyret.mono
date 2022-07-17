import classNames from "classnames";
import type { Props as ButtonProps } from "./BaseButton";
import { BaseButton } from "./BaseButton";

export function DangerButton(props: ButtonProps): JSX.Element {
  const { children, className, disabled, isLoading, ...rest } = props;
  const showAsDisabled = disabled || isLoading;

  return (
    <BaseButton
      className={classNames(
        "text-white",
        {
          "bg-red-700 hover:bg-red-800 active:bg-red-900": !showAsDisabled,
          "bg-neutral-300": showAsDisabled,
        },
        className
      )}
      disabled={disabled}
      isLoading={isLoading}
      {...rest}
    >
      {children}
    </BaseButton>
  );
}
