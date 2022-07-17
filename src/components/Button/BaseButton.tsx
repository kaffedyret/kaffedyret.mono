import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  isLarge?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

export function BaseButton(props: Props): JSX.Element {
  const {
    children,
    className,
    disabled,
    iconLeft,
    iconRight,
    isLarge,
    isLoading,
    loadingText,
    ...rest
  } = props;

  const showAsDisabled = disabled || isLoading;

  return (
    <button
      className={classNames(
        "flex items-center gap-3 rounded-full text-white tracking-wide no-underline leading-none",
        {
          "px-6 py-3 text-md": !isLarge,
          "px-8 py-4 text-xl": isLarge,
          "drop-shadow-sm hover:drop-shadow-lg transition-all ease-in-out duration-200":
            !showAsDisabled,
          "bg-neutral-300 cursor-default": showAsDisabled,
        },
        className
      )}
      disabled={showAsDisabled}
      {...rest}
    >
      {iconLeft}
      {(isLoading && loadingText) || children}
      {iconRight}
    </button>
  );
}
