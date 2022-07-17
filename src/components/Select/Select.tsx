import classNames from "classnames";
import { ReactNode } from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  className?: string;
};

export function Select(props: Props): JSX.Element {
  const { children, className, ...rest } = props;

  return (
    <select className={classNames("rounded", className)} {...rest}>
      {children}
    </select>
  );
}
