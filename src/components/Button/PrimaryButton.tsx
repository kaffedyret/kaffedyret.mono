import classNames from "classnames";
import type { Props as ButtonProps } from "./BaseButton";
import { BaseButton } from "./BaseButton";

export function PrimaryButton(props: ButtonProps): JSX.Element {
  const { children, className, disabled, isLoading, ...rest } = props;
  const showAsDisabled = disabled || isLoading;

  return (
    <BaseButton
      className={classNames(
        "text-white",
        {
          "bg-blue-500 hover:bg-blue-600 active:bg-blue-700": !showAsDisabled,
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
