import classNames from "classnames";
import type { Props as ButtonProps } from "./BaseButton";
import { BaseButton } from "./BaseButton";

export function SecondaryButton(props: ButtonProps): JSX.Element {
  const { children, className, disabled, isLoading, ...rest } = props;
  const showAsDisabled = disabled || isLoading;

  return (
    <BaseButton
      className={classNames(
        "text-neutral-900 border-2 border-neutral-900",
        {
          "bg-white hover:bg-neutral-50": !showAsDisabled,
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
