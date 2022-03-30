import { positions, transitions } from "react-alert";
import { BiCheck } from "react-icons/bi";

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
      <div className="flex items-center bg-blue-100 border-2 border-blue-500 drop-shadow-xl p-4 pr-6 rounded-lg">
        {options.type === "success" && (
          <BiCheck fontSize={26} className="mr-2" />
        )}
        {message}
      </div>
    </div>
  );
}
