import { ReactNode } from "react";

interface Props {
  id: string;
  label: string | ReactNode;
  name: string;
  required?: boolean;
  value: string;
}

export function RadioButton(props: Props) {
  const { id, label, name, value, required } = props;

  return (
    <div className="grid grid-cols-radio-button py-4 px-4 border-b last:border-b-0">
      <input
        type="radio"
        className="m-2 mr-4"
        id={id}
        name={name}
        required={required}
        value={value}
      ></input>

      <label htmlFor={id}>{label}</label>
    </div>
  );
}
