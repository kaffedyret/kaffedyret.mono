import classNames from "classnames";

interface Props {
  className?: string;
}

export function Kaffedyret(props: Props) {
  return (
    <span className={classNames("font-jumble", props.className)}>
      Kaffedyret&reg;
    </span>
  );
}
