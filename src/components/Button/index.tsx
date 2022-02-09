import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  isLarge?: boolean;
}

export function Button(props: Props): JSX.Element {
  const { children, className, iconLeft, iconRight, isLarge, ...rest } = props;

  return (
    <button
      className={classNames(
        "flex items-center gap-2 rounded-full text-white tracking-wide no-underline leading-none",
        {
          "px-6 py-3 text-md": !isLarge,
          "px-8 py-4 text-xl": isLarge,
          "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 drop-shadow-sm hover:drop-shadow-lg transition-all ease-in-out duration-200":
            !props.disabled,
          "bg-neutral-300": props.disabled,
        },
        className
      )}
      {...rest}
    >
      {iconLeft}
      {props.children}
      {iconRight}
    </button>
  );
}