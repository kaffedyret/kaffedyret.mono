import classNames from "classnames";
import { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLTableRowElement> & {
  children: ReactNode;
  className?: string;
  isSelected?: boolean;
};

export const Tr = ({ children, className, isSelected, ...rest }: Props) => (
  <tr
    className={classNames(
      "text-left border-b",
      {
        "border-b-slate-200 hover:bg-slate-50": !isSelected,
        "border-b-slate-700 bg-slate-900 hover:bg-slate-800 text-white": isSelected,
      },
      className
    )}
    {...rest}
  >
    {children}
  </tr>
);
