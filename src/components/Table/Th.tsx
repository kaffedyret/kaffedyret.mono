import classNames from "classnames";
import { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLTableCellElement> & {
  children: ReactNode;
  className?: string;
};

export const Th = ({ children, className, ...rest }: Props) => (
  <th className={classNames("bg-slate-200 py-2 px-4 uppercase text-sm font-600", className)} {...rest}>
    {children}
  </th>
);
