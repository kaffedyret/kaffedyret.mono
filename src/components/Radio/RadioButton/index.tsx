import { ReactNode } from "react";

interface Props {
  id: string;
  label: string | ReactNode;
  name: string;
  value: string;
}

export function RadioButton(props: Props) {
  const { id, label, name, value } = props;

  return (
    <div className="grid grid-cols-radio-button py-4 px-4 border-b last:border-b-0">
      <input
        type="radio"
        className="m-2 mr-4"
        id={id}
        name={name}
        value={value}
      ></input>

      <label htmlFor={id}>{label}</label>
    </div>
  );
}
