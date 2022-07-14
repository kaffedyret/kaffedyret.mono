import classNames from "classnames";
import { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLTableRowElement> & {
  children: ReactNode;
  className?: string;
};

export const Tr = ({ children, className, ...rest }: Props) => (
  <tr className={classNames("text-left border-b-slate-200 border-b hover:bg-slate-50", className)} {...rest}>
    {children}
  </tr>
);
