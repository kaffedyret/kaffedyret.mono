import { PortableText } from "@portabletext/react";
import classNames from "classnames";
import { BlockContent } from "~/models/schema.sanity";

type Props = {
  badge?: React.ReactNode;
  isActive: boolean;
  label: string;
  onClick: (label: string) => void;
};

export const VerticalTab = ({ badge, isActive, label, onClick }: Props) => (
  <button
    className={classNames(
      "px-6 py-2 hover:bg-slate-200 text-left flex justify-between",
      {
        "bg-slate-300 hover:bg-slate-300": isActive
      }
      )}
    onClick={() => onClick(label)}
  >
    {label}
    {badge && <span className="bg-blue-300 p-2 rounded-full flex items-center justify-center w-6 h-6 ml-4">{badge}</span>}
  </button>
);
