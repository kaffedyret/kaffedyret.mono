import { positions, transitions } from "react-alert";
import { BiCheck, BiX } from "react-icons/bi";
import classnames from "classnames";

export const alertOptions = {
  timeout: 3000,
  transition: transitions.FADE,
  position: positions.TOP_CENTER,
};

export const containerStyle = {
  marginTop: 72,
};

export function AlertTemplate({ options, message }: any) {
  return (
    <div className="container-narrow flex justify-end w-screen px-0 py-2">
      <div
        className={classnames(
          "flex items-center drop-shadow-xl p-4 pr-6 rounded-lg border-2",
          {
            "bg-blue-100 border-blue-500": options.type === "success",
            "bg-red-100 border-red-500": options.type === "error",
          }
        )}
      >
        {options.type === "error" && <BiX fontSize={26} className="mr-2" />}
        {options.type === "success" && (
          <BiCheck fontSize={26} className="mr-2" />
        )}
        {message}
      </div>
    </div>
  );
}
