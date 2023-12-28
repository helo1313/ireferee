import { Dispatch, SetStateAction } from "react";

import classes from "./input.module.scss";

interface InputProps {
  name: string;
  type: "text" | "password";
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={classes.inputContainer}>
      <label htmlFor={props.name} className={classes.label}>
        {props.label}
      </label>
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(event.target.value)
        }
        className={classes.input}
      />
      <label className={classes.errorLabel}>{props.error}</label>
    </div>
  );
};

export default Input;
