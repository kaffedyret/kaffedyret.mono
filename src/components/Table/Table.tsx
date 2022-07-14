import classNames from "classnames";
import { ReactNode } from "react";

type Props = React.TableHTMLAttributes<HTMLTableElement> & {
  children: ReactNode;
  className?: string;
};

export const Table = ({ children, className, ...rest }: Props) => (
  <table className={classNames("bg-white", className)} {...rest}>
    {children}
  </table>
);
