import classNames from "classnames";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export function Hamburger(props: Props) {
  const stripeClasses = "w-full h-1 bg-neutral-900 rounded-full transition-all origin-center";

  return (
    <button
      className="h-12 w-12 p-2 flex flex-col justify-around items-center"
      onClick={props.onClick}
    >
      <span
        className={classNames(stripeClasses, "", {
          "-mb-8 rotate-45": props.isOpen,
        })}
      ></span>
      <span
        className={classNames(stripeClasses, {
          "opacity-0": props.isOpen,
        })}
      ></span>
      <span
        className={classNames(stripeClasses, "", {
          "-mt-8 -rotate-45": props.isOpen,
        })}
      ></span>
    </button>
  );
}
