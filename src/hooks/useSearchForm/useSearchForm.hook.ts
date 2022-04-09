import { useState } from "react";

export const useSearchForm = (onSubmit: (strValue: string) => void) => {
  const [strUserName, setStrUserName] = useState<string>("");

  const handleChange = (objEvent: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = objEvent.target;
    setStrUserName(value);
  };

  const handleReset = () => setStrUserName("");

  const handleSubmit = (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    const strSanitisedValue = strUserName.trim();
    if (!strSanitisedValue) return;
    onSubmit(strSanitisedValue);
    handleReset();
  };

  return { strUserName, handleReset, handleChange, handleSubmit };
};

export default useSearchForm;
