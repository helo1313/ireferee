import { Dispatch, SetStateAction } from "react";

import classes from "./input.module.scss";

type labelAlignOptions = "left" | "center" | "right" | undefined;

interface InputProps {
  name: string;
  type: "text" | "password";
  label: string;
  labelAlign?: labelAlignOptions;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: string;
}

const getLabelAlign = (type: labelAlignOptions) => {
  if (type === undefined) {
    return undefined;
  }

  switch (type) {
    case "left":
      return classes.leftAlign;
    case "center":
      return classes.centerAlign;
    case "right":
      return classes.rightAlign;
    default:
      return undefined;
  }
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={classes.inputContainer}>
      <label
        htmlFor={props.name}
        className={`${classes.label} ${getLabelAlign(props.labelAlign)}`}
      >
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
