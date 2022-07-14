import classNames from "classnames";
import { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLTableCellElement> & {
  children: ReactNode;
  className?: string;
};

export const Td = ({ children, className, ...rest }: Props) => (
  <td className={classNames("px-4 py-2", className)} {...rest}>
    {children}
  </td>
);
