import { FormEvent, useState } from "react";

export const useSelectState = (
  defaultValue?: string
): [string | undefined, (e: FormEvent<HTMLSelectElement>) => void] => {
  const [state, setState] = useState<string | undefined>(defaultValue);

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    setState(e.currentTarget.value);
  };

  return [state, handleSelectChange];
};
