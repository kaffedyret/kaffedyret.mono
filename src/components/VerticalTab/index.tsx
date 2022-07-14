import classNames from "classnames";

type Props = {
  badge?: React.ReactNode;
  id: string;
  isActive: boolean;
  label: string;
  onClick: (label: string) => void;
};

export const VerticalTab = ({ badge, id, isActive, label, onClick }: Props) => (
  <button
    className={classNames(
      "px-6 py-2 text-left flex justify-between items-center rounded-tl rounded-bl",
      {
        "hover:bg-slate-200": !isActive,
        "bg-slate-900 text-white": isActive,
      }
    )}
    onClick={() => onClick(id)}
  >
    {label}
    {badge && (
      <span
        className={classNames(
          "p-2 rounded-full flex items-center justify-center w-6 h-6 ml-4 text-sm text-center",
          {
            "bg-slate-300": !isActive,
            "bg-white text-slate-900": isActive,
          }
        )}
      >
        {badge}
      </span>
    )}
  </button>
);
