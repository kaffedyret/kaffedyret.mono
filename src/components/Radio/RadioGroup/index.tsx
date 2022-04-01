import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function RadioGroup(props: Props) {
  const { children } = props;

  return <div className="border rounded-lg">{children}</div>;
}
