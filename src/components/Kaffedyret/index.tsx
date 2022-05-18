import classNames from "classnames";

interface Props {
  className?: string;
  withoutReg?: boolean;
}

export function Kaffedyret(props: Props) {
  return (
    <span className={classNames("font-jumble", props.className)}>
      Kaffedyret{props.withoutReg ? "" : "®"}
    </span>
  );
}
