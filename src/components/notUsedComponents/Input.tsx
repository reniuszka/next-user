import React, { useState } from "react";
type UserData = {
  id: number;
  name: string;
  type: string;
  label: string;
  pattern?: string;
  errorMessage?: string;
  required: boolean;
  checked?: boolean;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  focused?: boolean;
};
export type validValues = {
  email: boolean;
  phone: boolean;
  checkbox: boolean;
};
const Input = (props: UserData) => {
  const [focused, setFocused] = useState(false);
  const { label, id, errorMessage, pattern, ...inputProps } = props;
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(!focused);
  };
  return (
    <div className="form__row">
      <label className={focused ? "form__pink" : "form__label"}>{label}</label>
      <input
        className="form__input"
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
      {focused && !!pattern && errorMessage && (
        // <span className={pattern.test() ? "form__error" : null}>
        //   {errorMessage}
        // </span>
        <span className="form__error">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
